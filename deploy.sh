#!/bin/bash
# Deployment script untuk Vercel

echo "🚀 Starting Vercel deployment..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Install with: npm i -g vercel"
    exit 1
fi

# Check if git is clean
if [[ -n $(git status -s) ]]; then
    echo "⚠️  Uncommitted changes detected. Commit first:"
    git status
    exit 1
fi

echo "✅ Checking build locally..."
pnpm build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🚀 Deploying to Vercel..."
    vercel deploy --prod
else
    echo "❌ Build failed. Fix errors before deploying."
    exit 1
fi

echo "✅ Deployment complete!"
