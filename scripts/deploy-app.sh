#!/bin/bash
# =============================================================================
# App Deployment Script
# =============================================================================
#
# Run this on your server after initial setup to deploy or redeploy the app.
# Can be run manually or called by GitHub Actions.
#
# Usage: 
#   First deploy:  ./scripts/deploy-app.sh --first-run
#   Updates:       ./scripts/deploy-app.sh
#
# =============================================================================

set -e

APP_DIR="/var/www/app"
FIRST_RUN=false

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --first-run) FIRST_RUN=true ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

echo ""
echo "=========================================="
echo "  🚀 Deploying App"
echo "=========================================="
echo ""

cd "$APP_DIR"

# Pull latest changes
echo "▶ Pulling latest changes..."
git pull origin main

# Install dependencies
echo "▶ Installing dependencies..."
npm install

# Run database migrations (production)
if [ "$FIRST_RUN" = true ]; then
    echo "▶ Setting up database (first run)..."
    npm run db:push:prod
    npm run db:seed:prod
else
    echo "▶ Running database migrations..."
    npm run db:push:prod
fi

# Build the app
echo "▶ Building app..."
npm run build:prod

# Restart with PM2
echo "▶ Restarting app with PM2..."
if [ "$FIRST_RUN" = true ]; then
    pm2 start ecosystem.config.js
    pm2 save
    pm2 startup
else
    pm2 reload ecosystem.config.js
fi

echo ""
echo "=========================================="
echo "  ✅ Deployment complete!"
echo "=========================================="
echo ""
pm2 status
echo ""

