#!/bin/bash

# Huly AWS Amplify Deployment Script
# This script helps you deploy the Huly application to AWS Amplify

echo "🚀 Huly AWS Amplify Deployment Script"
echo "======================================"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Huly application for AWS Amplify"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Create a new GitHub repository"
echo "2. Add your GitHub repository as remote:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo ""
echo "3. Push to GitHub:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Go to AWS Amplify Console: https://console.aws.amazon.com/amplify/"
echo "5. Click 'New app' → 'Host web app'"
echo "6. Connect your GitHub repository"
echo "7. Amplify will automatically detect the amplify.yml configuration"
echo "8. Click 'Save and deploy'"
echo ""
echo "✨ Your Huly application will be live on AWS Amplify!"
echo ""
echo "📁 Project structure ready for deployment:"
echo "   - React + TypeScript + Tailwind CSS"
echo "   - Pre-configured AWS Amplify settings"
echo "   - Production build optimized"
echo "   - Mock data for immediate testing"
echo ""
echo "🔧 For custom domain setup:"
echo "   After deployment, go to Domain management in Amplify Console"
echo ""
echo "Happy deploying! 🎉"