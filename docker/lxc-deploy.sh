#!/bin/bash
# Darwin-MFC LXC Deployment Script for Proxmox
# =============================================
# Run this INSIDE the LXC container after creation
#
# Proxmox LXC Creation (run on Proxmox host):
#   pct create 200 local:vztmpl/debian-12-standard_12.2-1_amd64.tar.zst \
#     --hostname darwin-mfc \
#     --memory 256 \
#     --cores 1 \
#     --rootfs local-lvm:15 \
#     --net0 name=eth0,bridge=vmbr0,ip=dhcp \
#     --unprivileged 1 \
#     --features nesting=1
#   pct start 200
#
# Then copy files and run this script inside the container

set -e

echo "==================================="
echo "Darwin-MFC LXC Deployment"
echo "==================================="

# Update system
echo "Updating system..."
apt update && apt upgrade -y

# Install nginx
echo "Installing nginx..."
apt install -y nginx curl

# Create web directory
echo "Setting up web directory..."
mkdir -p /var/www/darwin-mfc

# Check if out/ directory was copied
if [ -d "/tmp/darwin-mfc-out" ]; then
    echo "Copying static files..."
    cp -r /tmp/darwin-mfc-out/* /var/www/darwin-mfc/
    rm -rf /tmp/darwin-mfc-out
elif [ -d "/var/www/darwin-mfc/pt" ]; then
    echo "Static files already in place."
else
    echo "ERROR: Static files not found!"
    echo "Please copy the 'out/' directory to /tmp/darwin-mfc-out or /var/www/darwin-mfc"
    exit 1
fi

# Set permissions
chown -R www-data:www-data /var/www/darwin-mfc
chmod -R 755 /var/www/darwin-mfc

# Install nginx configuration
echo "Configuring nginx..."
cat > /etc/nginx/sites-available/darwin-mfc << 'NGINX_CONF'
# Darwin-MFC Nginx Configuration
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;
    root /var/www/darwin-mfc;
    index index.html;

    # Root redirect to default locale (Portuguese)
    location = / {
        return 302 /pt/;
    }

    # Handle Next.js static exports with trailingSlash: true
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    # Cache static assets (1 year for hashed files)
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache images and icons (30 days)
    location ~* \.(ico|png|jpg|jpeg|gif|svg|webp)$ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # Cache fonts (1 year)
    location ~* \.(woff|woff2|ttf|otf|eot)$ {
        expires 1y;
        add_header Cache-Control "public";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Custom 404 page
    error_page 404 /404/index.html;
    location = /404/index.html {
        internal;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "OK\n";
        add_header Content-Type text/plain;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;
}
NGINX_CONF

# Enable site
ln -sf /etc/nginx/sites-available/darwin-mfc /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test configuration
echo "Testing nginx configuration..."
nginx -t

# Restart nginx
echo "Starting nginx..."
systemctl enable nginx
systemctl restart nginx

# Verify
sleep 2
if curl -s http://localhost/health | grep -q "OK"; then
    echo ""
    echo "==================================="
    echo "Darwin-MFC is running!"
    echo "==================================="
    echo ""
    IP=$(hostname -I | awk '{print $1}')
    echo "Access at: http://${IP}/"
    echo ""
    echo "Endpoints:"
    echo "  - Portuguese: http://${IP}/pt/"
    echo "  - English:    http://${IP}/en/"
    echo "  - Spanish:    http://${IP}/es/"
    echo ""
    echo "Health check: http://${IP}/health"
    echo ""
else
    echo "ERROR: Health check failed"
    systemctl status nginx
    exit 1
fi
