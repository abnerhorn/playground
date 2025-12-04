#!/bin/bash
# =============================================================================
# SSH Key Setup Script
# =============================================================================
#
# Generates an SSH key pair if you don't have one, and displays the public key.
# Works on Mac, Linux, and Windows (Git Bash/WSL).
#
# Usage: npm run setup:ssh
#
# =============================================================================

set -e

echo ""
echo "=========================================="
echo "  🔑 SSH Key Setup"
echo "=========================================="
echo ""

SSH_DIR="$HOME/.ssh"
KEY_FILE="$SSH_DIR/id_ed25519"
PUB_KEY_FILE="$KEY_FILE.pub"

# Create .ssh directory if it doesn't exist
if [ ! -d "$SSH_DIR" ]; then
    echo "Creating ~/.ssh directory..."
    mkdir -p "$SSH_DIR"
    chmod 700 "$SSH_DIR"
fi

# Check if key already exists
if [ -f "$PUB_KEY_FILE" ]; then
    echo "✅ SSH key already exists!"
    echo ""
    echo "Your public key:"
    echo "----------------------------------------"
    cat "$PUB_KEY_FILE"
    echo "----------------------------------------"
    echo ""
    echo "This key is ready to use. Copy it when needed for:"
    echo "  • DigitalOcean droplet creation"
    echo "  • GitHub deploy keys"
    echo ""
else
    echo "No SSH key found. Generating one..."
    echo ""
    
    # Prompt for email (optional)
    read -p "Enter your email (or press Enter to skip): " EMAIL
    
    if [ -z "$EMAIL" ]; then
        EMAIL="deploy-key"
    fi
    
    # Generate the key
    ssh-keygen -t ed25519 -C "$EMAIL" -f "$KEY_FILE" -N ""
    
    echo ""
    echo "✅ SSH key generated successfully!"
    echo ""
    echo "Your public key:"
    echo "----------------------------------------"
    cat "$PUB_KEY_FILE"
    echo "----------------------------------------"
    echo ""
    echo "Copy this key when needed for:"
    echo "  • DigitalOcean droplet creation"
    echo "  • GitHub deploy keys"
    echo ""
fi

# Copy to clipboard if possible
if command -v pbcopy &> /dev/null; then
    cat "$PUB_KEY_FILE" | pbcopy
    echo "📋 Key copied to clipboard! (Mac)"
elif command -v xclip &> /dev/null; then
    cat "$PUB_KEY_FILE" | xclip -selection clipboard
    echo "📋 Key copied to clipboard! (Linux)"
elif command -v clip &> /dev/null; then
    cat "$PUB_KEY_FILE" | clip
    echo "📋 Key copied to clipboard! (Windows)"
fi

