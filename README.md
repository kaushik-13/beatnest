# 🎵 BeatNest

A modern, full-featured music streaming web application built with the MERN stack, featuring authentication, music player, categories, subscriptions, and playlists.

## 🎯 Features

### Core Features
- ✅ **User Authentication** - JWT-based register/login system
- ✅ **Music Player** - Play, pause, next, previous with seek bar
- ✅ **Volume Control** - Adjustable volume with mute toggle
- ✅ **6 Music Categories** - Retro, Romantic, Workout, Chill, Party, Focus
- ✅ **Search Functionality** - Search songs by name, artist, or category
- ✅ **Favorites System** - Like/favorite your songs
- ✅ **Playlists** - Create and manage custom playlists
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Dark Mode** - Beautiful dark theme (always on by default)
- ✅ **Subscription System** - Free and Premium plans
- ✅ **Recently Played** - Track your listening history
- ✅ **Keyboard Shortcuts** - Space to play/pause
- ✅ **Persistent State** - Uses localStorage for player state

### UI/UX Enhancements
- Loading spinners
- Smooth animations and transitions
- Spotify-inspired layout with sidebar
- Beautiful gradient backgrounds
- Hover effects and visual feedback
- Mobile-friendly navigation

## 📋 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **JSON Files** - Data persistence (can be upgraded to MongoDB)

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Context API** - State management

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your configuration:**
   ```
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   ```

5. **Start the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Or production mode
   npm start
   ```

The backend will run at `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your configuration:**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will run at `http://localhost:3000`

## 📁 Project Structure

```
project2/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js      # Auth logic
│   │   │   ├── songController.js      # Song operations
│   │   │   ├── playlistController.js  # Playlist operations
│   │   │   └── userController.js      # User profile
│   │   ├── routes/
│   │   │   ├── authRoutes.js          # Auth endpoints
│   │   │   ├── songRoutes.js          # Song endpoints
│   │   │   ├── playlistRoutes.js      # Playlist endpoints
│   │   │   └── userRoutes.js          # User endpoints
│   │   ├── middleware/
│   │   │   └── auth.js                # JWT authentication
│   │   ├── data/
│   │   │   ├── songs.json             # Song database
│   │   │   ├── users.json             # User database
│   │   │   └── playlists.json         # Playlist database
│   │   ├── utils.js                   # Utility functions
│   │   └── index.js                   # Main server file
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js              # API configuration
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # Auth context
│   │   │   ├── MusicContext.jsx       # Music context
│   │   │   └── PlayerContext.jsx      # Player context
│   │   ├── components/
│   │   │   ├── Sidebar.jsx            # Navigation sidebar
│   │   │   ├── Player.jsx             # Music player controls
│   │   │   ├── SongCard.jsx           # Song display card
│   │   │   ├── CategoryCard.jsx       # Category display
│   │   │   ├── AuthModal.jsx          # Login/signup modal
│   │   │   └── LoadingSpinner.jsx     # Loading indicator
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Home page
│   │   │   ├── Search.jsx             # Search page
│   │   │   ├── Library.jsx            # Library/favorites
│   │   │   └── Category.jsx           # Category view
│   │   ├── hooks/
│   │   │   └── useContexts.js         # Custom hooks
│   │   ├── App.jsx                    # Main app component
│   │   ├── main.jsx                   # Entry point
│   │   └── index.css                  # Tailwind CSS
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Songs
- `GET /api/songs` - Get all songs
- `GET /api/songs/search?query=string` - Search songs
- `GET /api/songs/categories` - Get all categories
- `GET /api/songs/category/:category` - Get songs by category

### Playlists (Protected)
- `GET /api/playlists` - Get user's playlists
- `POST /api/playlists/create` - Create new playlist
- `POST /api/playlists/add-song` - Add song to playlist
- `POST /api/playlists/remove-song` - Remove song from playlist
- `DELETE /api/playlists/:id` - Delete playlist

### User (Protected)
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/subscription` - Update subscription
- `GET /api/user/favorites` - Get favorite songs
- `POST /api/user/favorites/add` - Add to favorites
- `POST /api/user/favorites/remove` - Remove from favorites

## 🎵 Sample Music Data

The application comes with 12 sample songs across all 6 categories:

### Included Songs:
1. Blinding Lights - The Weeknd (Retro)
2. Love Story - Taylor Swift (Romantic)
3. Levitating - Dua Lipa (Party)
4. Good as Hell - Lizzo (Workout)
5. Counting Stars - OneRepublic (Chill)
6. Lo-Fi Hip Hop - Chill Beats (Focus)
7. Night Fever - Bee Gees (Retro)
8. Perfect - Ed Sheeran (Romantic)
9. Pump It Up - Endor (Party)
10. Eye of the Tiger - Survivor (Workout)
11. Sunset Dreams - Ambient Waves (Chill)
12. Deep Focus - Study Beats (Focus)

Each song includes:
- Title and Artist
- Category
- Duration
- Cover Image URL
- Audio URL

## 🎮 How to Use

### 1. Register/Login
- Click "Login / Sign Up" button in the header
- Create a new account or login with existing credentials
- Receive JWT token for authenticated requests

### 2. Browse Music
- **Home**: View categories and popular tracks
- **Search**: Search by song name, artist, or category
- **Categories**: Click any category card to view all songs in that category

### 3. Play Music
- Click the play button on any song card
- Use player controls at the bottom: play/pause, next, previous
- Adjust volume with the volume slider
- Click the heart icon to add songs to favorites

### 4. Manage Library
- Access Library from the navigation menu
- View all favorite songs
- Create custom playlists
- Switch between Free and Premium subscription

### 5. Keyboard Shortcuts
- **Space** - Play/Pause current song

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in
2. Server returns JWT token
3. Token stored in localStorage
4. Token sent with every API request in Authorization header
5. Server verifies token before returning protected resources

## 📱 Features by Subscription Plan

### Free Plan
- ✅ Listen to unlimited songs
- ✅ Create playlists
- ✅ Like/favorite songs
- ⚠️ Limited skip count (shown in UI)
- ⚠️ Ads placeholder

### Premium Plan
- ✅ All Free features
- ✅ Unlimited skips
- ✅ No ads
- ✅ Premium badge in profile

## 🎨 Color Scheme

- **Primary Black**: `#121212`
- **Dark Gray**: `#1DB954` (Spotify Green)
- **Background**: `#191414`
- **Light Gray**: `#282828`
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#B3B3B3`

## 🚀 Future Enhancements

- [ ] Integrate MongoDB for persistence
- [ ] Real payment processing (Stripe)
- [ ] Social features (follow, share playlists)
- [ ] Audio visualization
- [ ] Download songs for offline listening
- [ ] Collaborative playlists
- [ ] Artist profiles
- [ ] Recommendations engine
- [ ] Queue management
- [ ] Theme customization

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend .env

### Authentication Issues
- Verify JWT_SECRET is set in backend .env
- Clear browser localStorage if needed
- Check browser console for token errors

### Audio Playback Issues
- Verify audio URLs are accessible
- Check browser console for CORS issues
- Ensure proper MIME type for audio files

### Connection Refused
- Backend not running? Run `npm run dev` in server directory
- Frontend not running? Run `npm run dev` in client directory
- Check port 5000 and 3000 are not in use

## 📝 Development Notes

### Adding New Songs
1. Edit `/server/src/data/songs.json`
2. Add song object with required fields
3. Reload frontend to see new songs

### Modifying Categories
1. Update `getCategories()` in `/server/src/controllers/songController.js`
2. Update category filter logic
3. Restart backend

### Extending Features
- Add more controllers in `/server/src/controllers/`
- Create new routes in `/server/src/routes/`
- Add new React pages in `/client/src/pages/`
- Create new components in `/client/src/components/`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and use this project for learning purposes!

## 📞 Support

For issues or questions, check the troubleshooting section or review the code comments throughout the project.

---

**Happy Listening! 🎵**
