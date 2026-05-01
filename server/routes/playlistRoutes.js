const express = require('express');
const { readData, writeData } = require('../utils/fileUtils');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Get user playlists
router.get('/', verifyToken, (req, res) => {
  try {
    const playlists = readData('playlists.json');
    const userPlaylists = playlists.filter(p => p.userId === req.user.id);
    res.json(userPlaylists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching playlists', error: error.message });
  }
});

const createPlaylist = (req, res) => {
  try {
    const { name, description = '' } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Playlist name required' });
    }

    const playlists = readData('playlists.json');
    const newPlaylist = {
      id: Date.now().toString(),
      userId: req.user.id,
      name,
      description,
      songs: [],
      createdAt: new Date().toISOString()
    };

    playlists.push(newPlaylist);
    writeData('playlists.json', playlists);

    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ message: 'Error creating playlist', error: error.message });
  }
};

// Create playlist. The client uses /create; / remains available too.
router.post('/', verifyToken, createPlaylist);
router.post('/create', verifyToken, createPlaylist);

const addSongToPlaylist = (req, res) => {
  try {
    const playlistId = req.params.playlistId || req.body.playlistId;
    const { songId } = req.body;

    if (!playlistId || !songId) {
      return res.status(400).json({ message: 'Playlist ID and song ID required' });
    }

    const playlists = readData('playlists.json');
    const playlist = playlists.find(p => p.id === playlistId && p.userId === req.user.id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    const normalizedSongId = String(songId);
    if (!playlist.songs.some(id => String(id) === normalizedSongId)) {
      playlist.songs.push(normalizedSongId);
      writeData('playlists.json', playlists);
    }

    res.json({ message: 'Song added to playlist', playlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding song', error: error.message });
  }
};

// Add song to playlist
router.post('/add-song', verifyToken, addSongToPlaylist);
router.post('/:playlistId/songs', verifyToken, addSongToPlaylist);

const removeSongFromPlaylist = (req, res) => {
  try {
    const playlistId = req.params.playlistId || req.body.playlistId;
    const songId = req.params.songId || req.body.songId;

    if (!playlistId || !songId) {
      return res.status(400).json({ message: 'Playlist ID and song ID required' });
    }

    const playlists = readData('playlists.json');
    const playlist = playlists.find(p => p.id === playlistId && p.userId === req.user.id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    playlist.songs = playlist.songs.filter(id => String(id) !== String(songId));
    writeData('playlists.json', playlists);

    res.json({ message: 'Song removed from playlist', playlist });
  } catch (error) {
    res.status(500).json({ message: 'Error removing song', error: error.message });
  }
};

// Remove song from playlist
router.post('/remove-song', verifyToken, removeSongFromPlaylist);
router.delete('/:playlistId/songs/:songId', verifyToken, removeSongFromPlaylist);

// Delete playlist
router.delete('/:playlistId', verifyToken, (req, res) => {
  try {
    const { playlistId } = req.params;

    let playlists = readData('playlists.json');
    playlists = playlists.filter(p => !(p.id === playlistId && p.userId === req.user.id));

    writeData('playlists.json', playlists);

    res.json({ message: 'Playlist deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting playlist', error: error.message });
  }
});

module.exports = router;
