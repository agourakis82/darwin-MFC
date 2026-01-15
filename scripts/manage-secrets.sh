#!/bin/bash
# Darwin-MFC Secrets Management Script
# Secure secrets handling for multi-environment deployment

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
VAULT_DIR="$PROJECT_ROOT/.vault"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Create vault directory if it doesn't exist
create_vault() {
    if [ ! -d "$VAULT_DIR" ]; then
        log_info "Creating secrets vault directory..."
        mkdir -p "$VAULT_DIR"
        chmod 700 "$VAULT_DIR"
        log_success "Vault directory created at $VAULT_DIR"
    fi
}

# Generate a secure random secret
generate_secret() {
    local length=${1:-64}
    openssl rand -base64 "$length" | tr -d "=+/" | cut -c1-"$length"
}

# Encrypt secrets file
encrypt_secrets() {
    local env=$1
    local input_file="$VAULT_DIR/.env.$env"
    local output_file="$VAULT_DIR/.env.$env.enc"
    
    if [ ! -f "$input_file" ]; then
        log_error "Environment file $input_file not found!"
        exit 1
    fi
    
    log_info "Encrypting secrets for environment: $env"
    openssl enc -aes-256-cbc -salt -in "$input_file" -out "$output_file" -k "${VAULT_ENCRYPTION_KEY:-default_key}"
    chmod 600 "$output_file"
    log_success "Secrets encrypted: $output_file"
}

# Decrypt secrets file
decrypt_secrets() {
    local env=$1
    local input_file="$VAULT_DIR/.env.$env.enc"
    local output_file="$VAULT_DIR/.env.$env"
    
    if [ ! -f "$input_file" ]; then
        log_error "Encrypted file $input_file not found!"
        exit 1
    fi
    
    log_info "Decrypting secrets for environment: $env"
    openssl enc -aes-256-cbc -d -in "$input_file" -out "$output_file" -k "${VAULT_ENCRYPTION_KEY:-default_key}"
    chmod 600 "$output_file"
    log_success "Secrets decrypted: $output_file"
}

# Create environment template
create_env_template() {
    local env=$1
    local template_file="$VAULT_DIR/.env.$env.template"
    
    log_info "Creating environment template for: $env"
    
    cat > "$template_file" << EOF
# Darwin-MFC $env Environment Configuration Template
# ==================================================
# Generated on $(date)

# Environment
NODE_ENV=$env
APP_ENV=$env
APP_VERSION=1.0.0-$env

# Application
APP_PORT=3000
APP_DEBUG=false
APP_LOG_LEVEL=info

# Supabase ($env)
NEXT_PUBLIC_SUPABASE_URL=https://your-$env-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-$env-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-$env-service-role-key

# API Configuration
NEXT_PUBLIC_API_URL=https://$env-api.mfc.agourakis.med.br
SUPABASE_API_URL=https://your-$env-project.supabase.co/rest/v1

# Keycloak OAuth2 ($env)
NEXT_PUBLIC_KEYCLOAK_URL=https://$env-auth.mfc.agourakis.med.br
NEXT_PUBLIC_KEYCLOAK_REALM=darwin-mfc-$env
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=darwin-mfc-web-$env

# Search Service
NEXT_PUBLIC_SEARCH_URL=https://$env-search.mfc.agourakis.med.br
NEXT_PUBLIC_SEARCH_API_KEY=$env-search-key

# Redis
REDIS_PORT=6379
REDIS_PASSWORD=$(generate_secret 32)

# Database
POSTGRES_PORT=5432
POSTGRES_DB=darwin_mfc_$env
POSTGRES_USER=darwin_$env
POSTGRES_PASSWORD=$(generate_secret 32)

# JWT Secret
JWT_SECRET=$(generate_secret 64)

# Feature Flags
NEXT_PUBLIC_ENABLE_AUTH=true
NEXT_PUBLIC_ENABLE_COMMUNITY=true
NEXT_PUBLIC_ENABLE_LEARNING=true
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_DEBUG=false

# Security
CORS_ORIGIN=https://$env.mfc.agourakis.med.br
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Secrets that should be set via environment variables
# These will be referenced as \${VAR_NAME} in the actual files:
SUPABASE_PROD_ANON_KEY=
SUPABASE_PROD_SERVICE_ROLE_KEY=
REDIS_PROD_PASSWORD=
POSTGRES_PROD_PASSWORD=
JWT_PROD_SECRET=
GRAFANA_PROD_ADMIN_USER=
GRAFANA_PROD_ADMIN_PASSWORD=
SEARCH_PROD_API_KEY=
SENTRY_DSN=
BACKUP_ENCRYPTION_KEY=
EOF
    
    chmod 600 "$template_file"
    log_success "Template created: $template_file"
}

# Rotate secrets
rotate_secrets() {
    local env=$1
    log_info "Rotating secrets for environment: $env"
    
    # This would integrate with your secrets management service
    # For now, we'll regenerate the JWT and database passwords
    log_warning "Manual secret rotation required - please update all services manually"
    log_info "Generate new secrets using: ./scripts/manage-secrets.sh generate"
}

# Generate sample secrets for development
generate_dev_secrets() {
    log_info "Generating development secrets..."
    
    cat > "$VAULT_DIR/.env.development" << EOF
# Darwin-MFC Development Environment Configuration
NODE_ENV=development
APP_ENV=development
APP_VERSION=1.0.0-dev
APP_PORT=3000
APP_DEBUG=true
APP_LOG_LEVEL=debug

# Supabase (Development)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_ANON_KEY=dev-anon-key-$(generate_secret 16)
SUPABASE_SERVICE_ROLE_KEY=dev-service-role-key-$(generate_secret 32)

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
SUPABASE_API_URL=http://localhost:8000/rest/v1

# Keycloak OAuth2 (Development)
NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
NEXT_PUBLIC_KEYCLOAK_REALM=darwin-mfc-dev
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=darwin-mfc-web-dev

# Search Service
NEXT_PUBLIC_SEARCH_URL=http://localhost:7700
NEXT_PUBLIC_SEARCH_API_KEY=dev-search-key-$(generate_secret 16)

# Redis
REDIS_PORT=6379
REDIS_PASSWORD=dev-redis-$(generate_secret 16)

# Database
POSTGRES_PORT=5432
POSTGRES_DB=darwin_mfc_dev
POSTGRES_USER=darwin_dev
POSTGRES_PASSWORD=dev-db-$(generate_secret 16)

# JWT Secret
JWT_SECRET=dev-jwt-$(generate_secret 32)

# Feature Flags
NEXT_PUBLIC_ENABLE_AUTH=true
NEXT_PUBLIC_ENABLE_COMMUNITY=true
NEXT_PUBLIC_ENABLE_LEARNING=true
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_DEBUG=true

# Monitoring
PROMETHEUS_PORT=9090
GRAFANA_PORT=3001
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=admin
LOKI_PORT=3100

# Build Configuration
BUILD_TARGET=development
NEXT_TELEMETRY_DISABLED=1
EOF
    
    chmod 600 "$VAULT_DIR/.env.development"
    log_success "Development secrets generated at $VAULT_DIR/.env.development"
}

# Validate secrets
validate_secrets() {
    local env=$1
    local secrets_file="$VAULT_DIR/.env.$env"
    
    if [ ! -f "$secrets_file" ]; then
        log_error "Secrets file not found: $secrets_file"
        return 1
    fi
    
    log_info "Validating secrets for environment: $env"
    
    # Check for required variables
    local required_vars=(
        "NEXT_PUBLIC_SUPABASE_URL"
        "NEXT_PUBLIC_SUPABASE_ANON_KEY"
        "JWT_SECRET"
        "NEXT_PUBLIC_KEYCLOAK_URL"
    )
    
    for var in "${required_vars[@]}"; do
        if ! grep -q "^$var=" "$secrets_file" || grep -q "^$var=\s*$" "$secrets_file"; then
            log_error "Required variable missing or empty: $var"
            return 1
        fi
    done
    
    log_success "All required secrets are present and non-empty"
}

# Clean up sensitive files
cleanup() {
    log_info "Cleaning up sensitive files..."
    find "$VAULT_DIR" -name "*.env" -not -name "*.enc" -delete 2>/dev/null || true
    log_success "Cleanup completed"
}

# Help function
show_help() {
    cat << EOF
Darwin-MFC Secrets Management Script

Usage: $0 [COMMAND] [ENVIRONMENT]

Commands:
    create-vault              Create the secrets vault directory
    generate-dev              Generate development secrets
    encrypt [ENV]             Encrypt environment secrets
    decrypt [ENV]             Decrypt environment secrets
    template [ENV]            Create environment template
    validate [ENV]            Validate secrets for environment
    rotate [ENV]              Rotate secrets for environment
    cleanup                   Clean up sensitive files
    help                      Show this help message

Environments:
    development, staging, production

Examples:
    $0 create-vault
    $0 generate-dev
    $0 encrypt production
    $0 validate staging

Security Notes:
- All secrets should be stored encrypted
- Never commit unencrypted secrets to version control
- Use environment variables for sensitive production values
- Regularly rotate secrets
- Use strong encryption keys for vault operations
EOF
}

# Main script logic
main() {
    create_vault
    
    case "${1:-help}" in
        "create-vault")
            log_success "Vault already created"
            ;;
        "generate-dev")
            generate_dev_secrets
            ;;
        "encrypt")
            encrypt_secrets "${2:-development}"
            ;;
        "decrypt")
            decrypt_secrets "${2:-development}"
            ;;
        "template")
            create_env_template "${2:-development}"
            ;;
        "validate")
            validate_secrets "${2:-development}"
            ;;
        "rotate")
            rotate_secrets "${2:-development}"
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|"--help"|"-h")
            show_help
            ;;
        *)
            log_error "Unknown command: ${1:-}"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"