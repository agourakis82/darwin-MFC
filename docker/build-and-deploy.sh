#!/bin/bash
# Darwin-MFC Build and Deploy Script
# ===================================
# Run from the docker/ directory

set -e

echo "==================================="
echo "Darwin-MFC Build and Deploy"
echo "==================================="

# Navigate to project root
cd "$(dirname "$0")/.."

# Check if out/ exists
if [ ! -d "out" ]; then
    echo "Building Next.js static export..."
    npm run build
fi

# Check build size
BUILD_SIZE=$(du -sh out | cut -f1)
echo "Build size: $BUILD_SIZE"

# Navigate to docker directory
cd docker

# Build Docker image
echo ""
echo "Building Docker image..."
docker build -t darwin-mfc:latest -f Dockerfile ..

# Check if container is running
if docker ps -q -f name=darwin-mfc | grep -q .; then
    echo "Stopping existing container..."
    docker stop darwin-mfc
    docker rm darwin-mfc
fi

# Start container
echo ""
echo "Starting container..."
docker-compose up -d

# Wait for health check
echo ""
echo "Waiting for health check..."
sleep 5

# Check status
if docker ps -q -f name=darwin-mfc -f status=running | grep -q .; then
    echo ""
    echo "==================================="
    echo "Darwin-MFC is running!"
    echo "==================================="
    echo ""
    echo "Access at: http://localhost:8080"
    echo ""
    echo "Endpoints:"
    echo "  - Portuguese: http://localhost:8080/pt/"
    echo "  - English:    http://localhost:8080/en/"
    echo "  - Spanish:    http://localhost:8080/es/"
    echo ""
    echo "View logs: docker logs -f darwin-mfc"
    echo "Stop:      docker-compose down"
else
    echo "Error: Container failed to start"
    docker logs darwin-mfc
    exit 1
fi
