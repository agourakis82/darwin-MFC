#!/bin/bash

# Remove existing git repository
rm -rf .git

# Initialize new repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Darwin-MFC educational web application"

echo "Repository initialized successfully!"

