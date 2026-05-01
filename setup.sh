#!/bin/bash

# Spotify Clone - Setup Script
# Run this script to automatically set up the project

echo "🎵 Spotify Clone - Automatic Setup"
echo "=================================="

# Backend Setup
echo ""
echo "📦 Setting up Backend..."
cd server
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Created .env file in server/"
fi

cd ..

# Frontend Setup
echo ""
echo "📦 Setting up Frontend..."
cd client
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Created .env file in client/"
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd server && npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd client && npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo "🎵 Happy listening!"
