#!/bin/bash
# =============================================================================
# Nginx + SSL Setup Script
# =============================================================================
#
# Run this on your server to configure nginx and SSL for your domain.
#
# Usage: ./scripts/setup-nginx.sh yourdomain.com
#
# =============================================================================

set -e

if [ -z "$1" ]; then
    echo "Usage: ./setup-nginx.sh yourdomain.com"
    echo ""
    read -p "Enter your domain: " DOMAIN
else
    DOMAIN=$1
fi

if [ -z "$DOMAIN" ]; then
    echo "Error: Domain is required"
    exit 1
fi

echo ""
echo "=========================================="
echo "  🌐 Setting up Nginx + SSL for $DOMAIN"
echo "=========================================="
echo ""

# Create nginx config
echo "▶ Creating nginx configuration..."
cat > /etc/nginx/sites-available/app << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:3000;
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

# Enable the site
echo "▶ Enabling site..."
ln -sf /etc/nginx/sites-available/app /etc/nginx/sites-enabled/

# Remove default site if it exists
rm -f /etc/nginx/sites-enabled/default

# Test nginx config
echo "▶ Testing nginx configuration..."
nginx -t

# Restart nginx
echo "▶ Restarting nginx..."
systemctl restart nginx

# Check if DNS has propagated
echo ""
echo "▶ Checking DNS for $DOMAIN..."
IP=$(dig +short $DOMAIN)
if [ -z "$IP" ]; then
    echo ""
    echo "⚠️  Warning: DNS not yet propagated for $DOMAIN"
    echo "   Wait for DNS to propagate before running SSL setup."
    echo "   Check: https://dnschecker.org/#A/$DOMAIN"
    echo ""
    echo "Run this command later to set up SSL:"
    echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
    echo ""
else
    echo "   DNS resolves to: $IP"
    echo ""
    
    # Try to get SSL certificate
    echo "▶ Setting up SSL certificate..."
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN || {
        echo ""
        echo "⚠️  SSL setup failed. This usually means DNS hasn't propagated yet."
        echo "   Wait a few minutes and run:"
        echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
        echo ""
    }
fi

echo ""
echo "=========================================="
echo "  ✅ Nginx setup complete!"
echo "=========================================="
echo ""
echo "Your app should be accessible at:"
echo "  http://$DOMAIN"
if [ -n "$IP" ]; then
    echo "  https://$DOMAIN (after SSL)"
fi
echo ""

