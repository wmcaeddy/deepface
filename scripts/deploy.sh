#!/bin/bash

# Ensure script is run from project root
cd "$(dirname "$0")/.."

echo "Starting deployment to Railway..."

# Check for Railway CLI
if ! command -v railway &> /dev/null; then
    echo "Error: Railway CLI is not installed."
    echo "Install via: npm i -g @railway/cli"
    exit 1
fi

# Deploy
echo "Executing 'railway up'..."
railway up --detach

if [ $? -eq 0 ]; then
    echo "Deployment triggered successfully!"
    echo "Monitor status with: railway status"
else
    echo "Deployment command failed."
    exit 1
fi
