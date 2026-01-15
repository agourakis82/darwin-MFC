#!/bin/bash
# Darwin-MFC SSL Setup Script
# Automatic SSL certificate management with Let's Encrypt

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SSL_DIR="$PROJECT_ROOT/ssl"
LETSENCRYPT_DIR="$SSL_DIR/letsencrypt"

# Environment
DOMAIN="${DOMAIN:-mfc.agourakis.med.br}"
EMAIL="${SSL_EMAIL:-admin@agourakis.med.br}"
ENVIRONMENT="${ENVIRONMENT:-production}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Help function
show_help() {
    cat << EOF
Darwin-MFC SSL Setup Script

Usage: $0 [COMMAND] [OPTIONS]

Commands:
    setup         Setup SSL certificates for the domain
    renew         Renew existing certificates
    verify        Verify certificate validity
    cleanup       Clean up old certificates
    setup-dev     Setup self-signed certificates for development
    help          Show this help message

Environment Variables:
    DOMAIN        Domain name (default: mfc.agourakis.med.br)
    SSL_EMAIL     Email for Let's Encrypt registration
    ENVIRONMENT   Environment (production|development|staging)

Examples:
    $0 setup --domain mfc.agourakis.med.br --email admin@agourakis.med.br
    $0 renew
    $0 setup-dev

Prerequisites:
    - Domain must be pointing to this server
    - Ports 80 and 443 must be accessible
    - Docker and Docker Compose must be installed
EOF
}

# Setup SSL directories
setup_ssl_directories() {
    log_info "Setting up SSL directories..."
    
    local dirs=("$SSL_DIR" "$LETSENCRYPT_DIR" "$SSL_DIR/renewal")
    for dir in "${dirs[@]}"; do
        if [ ! -d "$dir" ]; then
            mkdir -p "$dir"
            chmod 700 "$dir"
            log_info "Created directory: $dir"
        fi
    done
}

# Install certbot
install_certbot() {
    log_info "Installing certbot..."
    
    if ! command -v certbot &> /dev/null; then
        if command -v apt-get &> /dev/null; then
            sudo apt-get update
            sudo apt-get install -y certbot
        elif command -v yum &> /dev/null; then
            sudo yum install -y certbot
        elif command -v docker &> /dev/null; then
            log_info "Using Docker-based certbot"
            return 0
        else
            log_error "Cannot install certbot. Please install manually."
            exit 1
        fi
    else
        log_success "Certbot is already installed"
    fi
}

# Generate self-signed certificates for development
setup_dev_ssl() {
    log_info "Setting up self-signed certificates for development..."
    
    local ssl_cert="$SSL_DIR/dev-cert.pem"
    local ssl_key="$SSL_DIR/dev-key.pem"
    
    # Generate private key
    openssl genrsa -out "$ssl_key" 2048
    
    # Generate certificate
    openssl req -new -x509 -key "$ssl_key" -out "$ssl_cert" -days 365 \
        -subj "/C=BR/ST=SP/L=São Paulo/O=Darwin-MFC/OU=Development/CN=$DOMAIN"
    
    chmod 600 "$ssl_key"
    chmod 644 "$ssl_cert"
    
    log_success "Self-signed certificates created"
    log_info "Certificate: $ssl_cert"
    log_info "Key: $ssl_key"
    
    # Create development nginx config
    cat > "$SSL_DIR/nginx-dev.conf" << EOF
server {
    listen 443 ssl;
    server_name $DOMAIN;

    ssl_certificate $ssl_cert;
    ssl_certificate_key $ssl_key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
    
    log_success "Development SSL setup completed"
}

# Setup Let's Encrypt SSL certificates
setup_production_ssl() {
    log_info "Setting up Let's Encrypt certificates for $DOMAIN..."
    
    setup_ssl_directories
    install_certbot
    
    # Check if port 80 is accessible
    if ! curl -s http://$DOMAIN > /dev/null 2>&1; then
        log_warning "Domain $DOMAIN is not accessible on port 80"
        log_info "Make sure your domain is pointing to this server and port 80 is accessible"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "SSL setup cancelled"
            exit 0
        fi
    fi
    
    # Generate certificates using certbot
    if command -v certbot &> /dev/null && ! command -v docker &> /dev/null; then
        # Use system certbot
        sudo certbot certonly \
            --standalone \
            --email "$EMAIL" \
            --agree-tos \
            --no-eff-email \
            --domains "$DOMAIN" \
            --cert-path "$SSL_DIR/$DOMAIN.crt" \
            --key-path "$SSL_DIR/$DOMAIN.key"
    else
        # Use Docker certbot
        docker run --rm \
            -v "$SSL_DIR:/etc/letsencrypt" \
            -v "$LETSENCRYPT_DIR:/var/lib/letsencrypt" \
            certbot/certbot certonly \
            --standalone \
            --email "$EMAIL" \
            --agree-tos \
            --no-eff-email \
            --domains "$DOMAIN"
        
        # Copy certificates to expected locations
        cp "$LETSENCRYPT_DIR/live/$DOMAIN/fullchain.pem" "$SSL_DIR/$DOMAIN.crt"
        cp "$LETSENCRYPT_DIR/live/$DOMAIN/privkey.pem" "$SSL_DIR/$DOMAIN.key"
    fi
    
    # Set proper permissions
    chmod 644 "$SSL_DIR/$DOMAIN.crt"
    chmod 600 "$SSL_DIR/$DOMAIN.key"
    
    log_success "Let's Encrypt certificates created successfully"
    log_info "Certificate: $SSL_DIR/$DOMAIN.crt"
    log_info "Key: $SSL_DIR/$DOMAIN.key"
}

# Create production nginx configuration
create_nginx_config() {
    log_info "Creating production nginx configuration..."
    
    cat > "$SSL_DIR/nginx-prod.conf" << EOF
# HTTP server - redirect to HTTPS
server {
    listen 80;
    server_name $DOMAIN;
    
    # Allow Let's Encrypt challenges
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name $DOMAIN;

    # SSL certificates
    ssl_certificate $SSL_DIR/$DOMAIN.crt;
    ssl_certificate_key $SSL_DIR/$DOMAIN.key;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Main application proxy
    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }

    # API endpoints
    location /api/ {
        proxy_pass http://app:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # Rate limiting headers
        proxy_set_header X-RateLimit-Limit \$upstream_http_x_rate_limit_limit;
        proxy_set_header X-RateLimit-Remaining \$upstream_http_x_rate_limit_remaining;
        proxy_set_header X-RateLimit-Reset \$upstream_http_x_rate_limit_reset;
    }

    # Static files caching
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://app:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff";
    }

    # Health check endpoint
    location /health {
        proxy_pass http://app:3000/api/health;
        access_log off;
    }
}
EOF
    
    log_success "Production nginx configuration created"
    log_info "Configuration file: $SSL_DIR/nginx-prod.conf"
}

# Renew certificates
renew_certificates() {
    log_info "Renewing SSL certificates..."
    
    if command -v certbot &> /dev/null && ! command -v docker &> /dev/null; then
        sudo certbot renew --quiet
    else
        docker run --rm \
            -v "$SSL_DIR:/etc/letsencrypt" \
            -v "$LETSENCRYPT_DIR:/var/lib/letsencrypt" \
            certbot/certbot renew --quiet
    fi
    
    # Update certificate files
    if [ -d "$LETSENCRYPT_DIR/live/$DOMAIN" ]; then
        cp "$LETSENCRYPT_DIR/live/$DOMAIN/fullchain.pem" "$SSL_DIR/$DOMAIN.crt"
        cp "$LETSENCRYPT_DIR/live/$DOMAIN/privkey.pem" "$SSL_DIR/$DOMAIN.key"
        chmod 644 "$SSL_DIR/$DOMAIN.crt"
        chmod 600 "$SSL_DIR/$DOMAIN.key"
    fi
    
    log_success "Certificate renewal completed"
}

# Verify certificate
verify_certificate() {
    log_info "Verifying SSL certificate for $DOMAIN..."
    
    local cert_file="$SSL_DIR/$DOMAIN.crt"
    
    if [ ! -f "$cert_file" ]; then
        log_error "Certificate file not found: $cert_file"
        return 1
    fi
    
    # Check certificate validity
    if openssl x509 -in "$cert_file" -text -noout | grep -q "CN = $DOMAIN"; then
        log_success "Certificate matches domain: $DOMAIN"
    else
        log_warning "Certificate domain mismatch"
    fi
    
    # Check expiration
    local expiry_date=$(openssl x509 -in "$cert_file" -enddate -noout | cut -d= -f2)
    local expiry_epoch=$(date -d "$expiry_date" +%s)
    local current_epoch=$(date +%s)
    local days_until_expiry=$(( (expiry_epoch - current_epoch) / 86400 ))
    
    if [ $days_until_expiry -gt 30 ]; then
        log_success "Certificate is valid for $days_until_expiry more days"
    elif [ $days_until_expiry -gt 0 ]; then
        log_warning "Certificate expires in $days_until_expiry days"
    else
        log_error "Certificate has expired!"
        return 1
    fi
    
    # Test HTTPS connection
    if command -v curl &> /dev/null; then
        if curl -s --max-time 10 "https://$DOMAIN" > /dev/null; then
            log_success "HTTPS connection test successful"
        else
            log_warning "HTTPS connection test failed"
        fi
    fi
}

# Cleanup old certificates
cleanup_certificates() {
    log_info "Cleaning up old certificates..."
    
    # Remove certificates older than 90 days
    find "$SSL_DIR" -name "*.crt" -mtime +90 -delete 2>/dev/null || true
    find "$SSL_DIR" -name "*.key" -mtime +90 -delete 2>/dev/null || true
    
    # Remove Let's Encrypt archives older than 30 days
    find "$LETSENCRYPT_DIR/archive" -type d -mtime +30 -exec rm -rf {} + 2>/dev/null || true
    
    log_success "Certificate cleanup completed"
}

# Main function
main() {
    local command="${1:-help}"
    
    case $command in
        setup)
            if [ "$ENVIRONMENT" = "development" ]; then
                setup_dev_ssl
            else
                setup_production_ssl
                create_nginx_config
            fi
            ;;
        renew)
            renew_certificates
            ;;
        verify)
            verify_certificate
            ;;
        cleanup)
            cleanup_certificates
            ;;
        setup-dev)
            setup_dev_ssl
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            log_error "Unknown command: $command"
            show_help
            exit 1
            ;;
    esac
}

# Set default values
ENVIRONMENT="${ENVIRONMENT:-production}"

# Run main function
main "$@"