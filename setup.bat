@echo off
REM Spotify Clone - Setup Script for Windows
REM Run this script to automatically set up the project

echo 🎵 Spotify Clone - Automatic Setup
echo ==================================

REM Backend Setup
echo.
echo 📦 Setting up Backend...
cd server
call npm install

REM Create .env if it doesn't exist
if not exist .env (
  copy .env.example .env
  echo ✅ Created .env file in server/
)

cd ..

REM Frontend Setup
echo.
echo 📦 Setting up Frontend...
cd client
call npm install

REM Create .env if it doesn't exist
if not exist .env (
  copy .env.example .env
  echo ✅ Created .env file in client/
)

cd ..

echo.
echo ✅ Setup Complete!
echo.
echo To start the application:
echo.
echo Terminal 1 (Backend):
echo   cd server && npm run dev
echo.
echo Terminal 2 (Frontend):
echo   cd client && npm run dev
echo.
echo Then open http://localhost:3000 in your browser
echo.
echo 🎵 Happy listening!
pause
