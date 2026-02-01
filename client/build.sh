#!/bin/bash
set -e

echo "Installing dependencies..."
npm ci --verbose

echo "Building project..."
npm run build

echo "Build completed successfully!"
