# 🚀 Quick Start Guide

Get the Spotify Clone up and running in 5 minutes!

## Prerequisites
- Node.js v14+ installed
- npm installed
- Two terminal windows

## Step-by-Step Setup

### Terminal 1: Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (if not exists)
# Edit and configure if needed

# Start backend server
npm run dev
```

**Expected Output:**
```
🎵 Spotify Clone Backend running on http://localhost:5000
📡 CORS enabled for frontend development
```

### Terminal 2: Frontend Setup
```bash
# Navigate to client directory (from project root in a new terminal)
cd client

# Install dependencies
npm install

# Start frontend dev server
npm run dev
```

**Expected Output:**
```
  VITE v4.3.9  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

## 🎵 Using the Application

1. Open your browser to `http://localhost:3000`
2. Click "Login / Sign Up" to create an account
3. Browse songs by category or use search
4. Click the play button on any song to start listening
5. Use player controls at the bottom to control playback

## ✅ Default Test Credentials

You can create your own account, but here's an example of what would work:

```
Email: test@example.com
Password: password123
Name: Test User
```

(After registration, use these to login)

## 🔧 Configuration

### Backend `.env`
```
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

## 📊 Available Endpoints

```
Auth:
  POST /api/auth/register
  POST /api/auth/login

Songs:
  GET /api/songs
  GET /api/songs/search?query=string
  GET /api/songs/categories
  GET /api/songs/category/:category

Playlists (protected):
  GET /api/playlists
  POST /api/playlists/create
  POST /api/playlists/add-song
  POST /api/playlists/remove-song
  DELETE /api/playlists/:id

User (protected):
  GET /api/user/profile
  PUT /api/user/subscription
  GET /api/user/favorites
  POST /api/user/favorites/add
  POST /api/user/favorites/remove
```

## 🎵 Categories Available

- 👴 Retro
- 💕 Romantic
- 💪 Workout
- 😎 Chill
- 🎉 Party
- 🧠 Focus

## ⌨️ Keyboard Shortcuts

- **Space** - Play/Pause

## 🐛 Common Issues

### Port 5000 already in use
```bash
# Change PORT in server/.env to a different port (e.g., 5001)
# Then update VITE_API_URL in client/.env
```

### CORS Errors
- Ensure both servers are running
- Check firewall settings
- Verify port numbers in .env files

### Blank page on frontend
- Check browser console (F12) for errors
- Verify backend is running
- Clear browser cache (Ctrl+Shift+Delete)

### Module not found errors
- Run `npm install` again in the affected directory
- Delete `node_modules` folder and reinstall
- Check Node.js version (v14+)

## 📱 Testing Features

### 1. Authentication
- Register a new account
- Login with credentials
- Logout from Library page

### 2. Music Player
- Play/pause songs
- Skip forward/backward
- Adjust volume
- Seek to different positions
- Add songs to favorites (❤️ button)

### 3. Search
- Search by song title
- Search by artist name
- Search by category
- Filter results in real-time

### 4. Categories
- Browse all 6 categories
- View songs in each category
- Play any song from a category

### 5. Library
- View favorite songs
- Create new playlists
- Manage playlists (after auth)
- Switch subscription plan

## 📦 Production Build

### Frontend Build
```bash
cd client
npm run build
# Output in: client/dist
```

### Backend Deployment
```bash
cd server
NODE_ENV=production npm start
```

## 🎨 Customization

### Add More Songs
Edit `server/src/data/songs.json` and add new song objects:
```json
{
  "id": 13,
  "title": "Song Name",
  "artist": "Artist Name",
  "category": "Category",
  "duration": 200,
  "coverImage": "https://...",
  "audioUrl": "https://..."
}
```

### Change Colors
Edit `client/tailwind.config.js` and modify the color scheme in theme.extend.colors

### Change Features
- Modify components in `client/src/components/`
- Update pages in `client/src/pages/`
- Adjust context logic in `client/src/context/`
- Update API in `client/src/api/client.js`

## 🆘 Still Having Issues?

1. Check the full README.md for detailed documentation
2. Review browser console (F12) for error messages
3. Check terminal output for backend errors
4. Ensure all ports are available and in use
5. Verify Node.js and npm versions

---

**You're all set! Happy listening! 🎵**
