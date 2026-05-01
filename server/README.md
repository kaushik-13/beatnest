# BeatNest Backend Server

Express.js backend for the Spotify Clone music streaming application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

Or start production server:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Songs
- `GET /api/songs` - Get all songs
- `GET /api/songs/category/:category` - Get songs by category
- `GET /api/songs/search?query=string` - Search songs
- `GET /api/songs/:id` - Get single song
- `GET /api/songs/:id/audio` - Stream song audio
- `GET /api/songs/categories` - Get all categories

### Playlists (Requires authentication)
- `GET /api/playlists` - Get user playlists
- `POST /api/playlists/create` - Create playlist
- `POST /api/playlists/add-song` - Add song to playlist
- `POST /api/playlists/remove-song` - Remove song from playlist
- `DELETE /api/playlists/:playlistId` - Delete playlist

### User (Requires authentication)
- `GET /api/user/profile` - Get user profile
- `GET /api/user/favorites` - Get favorite songs
- `POST /api/user/favorites/add` - Add to favorites
- `POST /api/user/favorites/remove` - Remove from favorites
- `PUT /api/user/subscription` - Update subscription plan
