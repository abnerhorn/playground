#!/bin/bash
# =============================================================================
# Cleanup Template Files
# =============================================================================
# 
# Run this after using the Launch Wizard to prepare for building your app.
# This removes template-specific files that aren't needed in your project.
#
# Usage: npm run cleanup
#
# =============================================================================

set -e

echo ""
echo "🧹 Cleaning up template files..."
echo ""

# Track what we delete
deleted=()

# Remove Storybook examples
if [ -d "stories" ]; then
  rm -rf stories/
  deleted+=("stories/")
fi

# NOTE: app/deploy/ (deploy guide) is intentionally kept!
# The DeployBanner will link to it until production is deployed.

# Remove launch wizard
if [ -d "app/launch" ]; then
  rm -rf app/launch/
  deleted+=("app/launch/")
fi

if [ -d "app/api/launch" ]; then
  rm -rf app/api/launch/
  deleted+=("app/api/launch/")
fi

# Report what was deleted
if [ ${#deleted[@]} -eq 0 ]; then
  echo "  Nothing to clean up - already clean!"
else
  for item in "${deleted[@]}"; do
    echo "  ✓ Removed $item"
  done
fi

# Remove this script (cleanup cleans itself up)
if [ -f "scripts/cleanup-template.sh" ]; then
  rm -f scripts/cleanup-template.sh
  echo "  ✓ Removed scripts/cleanup-template.sh"
fi

# Remove the cleanup npm script from package.json
# This is a bit tricky in bash, so we'll leave it for Cursor to handle

echo ""
echo "✨ Template cleaned up!"
echo ""
echo "Next steps:"
echo "  1. Build your app following plans/BUILD.md"
echo "  2. Run 'npm run dev' to start developing"
echo "  3. When ready to deploy, visit /deploy for the guide"
echo ""

