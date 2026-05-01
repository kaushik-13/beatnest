# Project Architecture & Implementation Details

## Overview

This is a full-stack music streaming application that mimics Spotify's core functionality. The architecture follows a clean separation of concerns with a Node.js/Express backend and a React/Vite frontend.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Port 3000)               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Components:                                           │  │
│  │ - Sidebar (Navigation)                               │  │
│  │ - Player (Audio Controls)                            │  │
│  │ - SongCard (Display)                                 │  │
│  │ - CategoryCard (Categories)                          │  │
│  │ - AuthModal (Login/Signup)                           │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Context API (State Management):                      │  │
│  │ - AuthContext (User & Auth)                          │  │
│  │ - MusicContext (Songs & Categories)                  │  │
│  │ - PlayerContext (Playback State)                     │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Storage:                                              │  │
│  │ - localStorage (User Token, Favorites, Recently)     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↕ HTTP/Axios
┌─────────────────────────────────────────────────────────────┐
│                   Express Backend (Port 5000)               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Routes & Controllers:                                │  │
│  │ - /api/auth (register, login)                        │  │
│  │ - /api/songs (browse, search, categories)            │  │
│  │ - /api/playlists (CRUD operations)                   │  │
│  │ - /api/user (profile, subscription, favorites)       │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Middleware:                                           │  │
│  │ - JWT Verification (verifyToken)                     │  │
│  │ - CORS Handling                                       │  │
│  │ - Body Parsing                                        │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Data Layer (JSON Files):                              │  │
│  │ - songs.json (12 songs across 6 categories)          │  │
│  │ - users.json (registered users)                       │  │
│  │ - playlists.json (user playlists)                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow
```
User Input (Email, Password)
    ↓
Frontend AuthModal
    ↓
Axios API Call (register/login)
    ↓
Backend Controller
    ↓
Hash/Compare Password (bcryptjs)
    ↓
Generate JWT Token
    ↓
Store in localStorage
    ↓
Set Authorization Header
    ↓
Subsequent API Calls
```

### Music Playback Flow
```
Click Song Card
    ↓
PlayerContext.playSong()
    ↓
Create Audio Element
    ↓
Set audioUrl & play()
    ↓
Update currentTime & duration
    ↓
Display in Player Component
    ↓
Handle Play/Pause/Seek
    ↓
Add to Recently Played
```

### Search & Filter Flow
```
User Input (Search Query)
    ↓
MusicContext.searchSongsFunc()
    ↓
Axios API Call
    ↓
Backend Filter Logic
    ↓
Return Filtered Results
    ↓
Update filteredSongs State
    ↓
Re-render Song Grid
```

## Component Tree

```
App
├── Sidebar
│   ├── Navigation Links
│   └── Categories
├── Header
│   ├── Nav Buttons (Home, Search, Library)
│   ├── Dark Mode Toggle
│   └── Auth Section
├── MainContent (based on currentPage)
│   ├── Home
│   │   ├── Featured Section
│   │   ├── CategoryCard[] (6 items)
│   │   └── SongCard[] (Popular Tracks)
│   ├── Search
│   │   ├── Search Input
│   │   └── SongCard[] (Results)
│   ├── Library
│   │   ├── User Profile
│   │   ├── Tabs (Favorites, Playlists)
│   │   ├── SongCard[] (Favorites)
│   │   └── Playlist Manager
│   └── Category
│       └── SongCard[] (Category Songs)
├── Player
│   ├── Song Info
│   ├── Progress Bar
│   ├── Control Buttons
│   └── Volume Control
└── AuthModal (conditional)
    ├── Login Form
    └── Signup Form
```

## State Management

### AuthContext
```javascript
{
  user: {
    id: number,
    name: string,
    email: string,
    subscription: 'free' | 'premium'
  },
  token: string | null,
  isAuthenticated: boolean,
  loading: boolean,
  error: string | null,
  functions: [register, login, logout, getProfile]
}
```

### MusicContext
```javascript
{
  songs: Song[],
  categories: string[],
  filteredSongs: Song[],
  currentCategory: string,
  searchQuery: string,
  loading: boolean,
  error: string | null,
  functions: [fetchSongs, fetchCategories, fetchSongsByCategory, searchSongsFunc]
}
```

### PlayerContext
```javascript
{
  currentSong: Song | null,
  queue: Song[],
  isPlaying: boolean,
  currentIndex: number,
  duration: number,
  currentTime: number,
  volume: number (0-1),
  isMuted: boolean,
  recentlyPlayed: Song[],
  favorites: Song[],
  functions: [playSong, playNext, playPrevious, togglePlayPause, seek, changeVolume, toggleMute, toggleFavorite, isFavorite]
}
```

## API Contract

### Song Object
```javascript
{
  id: number,
  title: string,
  artist: string,
  category: string,
  duration: number (seconds),
  coverImage: string (URL),
  audioUrl: string (URL)
}
```

### User Object
```javascript
{
  id: number,
  name: string,
  email: string,
  password: string (hashed),
  subscription: 'free' | 'premium',
  createdAt: ISO string,
  favoriteSongs: number[],
  playlists: number[]
}
```

### Playlist Object
```javascript
{
  id: number,
  userId: number,
  name: string,
  description: string,
  songs: number[],
  createdAt: ISO string
}
```

## Security Features

1. **Password Hashing** - bcryptjs for secure password storage
2. **JWT Tokens** - Stateless authentication with 7-day expiry
3. **Protected Routes** - verifyToken middleware on sensitive endpoints
4. **CORS** - Enabled for frontend origin
5. **Input Validation** - Basic validation on all endpoints

## Performance Optimizations

1. **Lazy Loading** - Songs loaded on-demand
2. **Context API** - Efficient state updates using useContext
3. **localStorage** - Persistent user data without API calls
4. **Audio Element Ref** - Single audio instance for playback
5. **Memoization** - useCallback for performance-critical functions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

1. Audio files served from external URLs (SoundHelix)
2. JSON file storage (not suitable for large-scale production)
3. In-memory state (resets on refresh without localStorage)
4. No real payment processing
5. Basic search (no advanced filters)
6. Single user per browser (no multi-device sync)

## Future Enhancements

### Short Term
- [ ] Add queue preview
- [ ] Shuffle & repeat modes
- [ ] Keyboard shortcuts (arrow keys, etc)
- [ ] Playlist editing UI
- [ ] Song duration display

### Medium Term
- [ ] MongoDB integration
- [ ] User comments/ratings
- [ ] Social sharing features
- [ ] Collaborative playlists
- [ ] User analytics

### Long Term
- [ ] Stripe payment integration
- [ ] Artist management dashboard
- [ ] Audio visualization
- [ ] Recommendation engine
- [ ] Mobile app (React Native)
- [ ] WebRTC for real-time collaboration

## Deployment Guide

### Backend (Node.js/Express)

**Option 1: Heroku**
```bash
git init
heroku login
heroku create your-app-name
git push heroku main
```

**Option 2: Railway/Render**
- Connect GitHub repo
- Set environment variables
- Deploy automatically

### Frontend (React/Vite)

**Option 1: Vercel**
```bash
npm install -g vercel
vercel
```

**Option 2: Netlify**
- Connect GitHub repo
- Set build command: `npm run build`
- Set publish directory: `dist`

## Environment Variables

### Backend (.env)
```
PORT=5000
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Testing Recommendations

1. **Unit Tests** - Jest for component/function testing
2. **Integration Tests** - Test API endpoints
3. **E2E Tests** - Playwright/Cypress for user flows
4. **Manual Testing Checklist**:
   - [ ] User registration/login
   - [ ] Song playback
   - [ ] Search functionality
   - [ ] Favorites management
   - [ ] Playlist creation
   - [ ] Responsive design
   - [ ] Dark mode toggle
   - [ ] Keyboard shortcuts

## Monitoring & Debugging

### Frontend
- React DevTools browser extension
- Network tab (DevTools) for API calls
- Console logs for state changes

### Backend
- Winston/Morgan for logging
- Express error middleware
- API response logging

---

**This architecture is scalable and can be extended with additional features as needed.**
