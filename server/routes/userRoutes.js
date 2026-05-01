const express = require('express');
const { readData, writeData } = require('../utils/fileUtils');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

const normalizeSong = (song) => ({
  ...song,
  id: Number(song.id),
  coverImage: song.coverImage || song.thumbnail,
});

// Get user profile
router.get('/profile', verifyToken, (req, res) => {
  try {
    const users = readData('users.json');
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Get user favorites
router.get('/favorites', verifyToken, (req, res) => {
  try {
    const favorites = readData('favorites.json');
    const songs = readData('songs.json');
    const userFavorites = favorites.filter(f => f.userId === req.user.id);
    const favoriteSongs = userFavorites
      .map(favorite => songs.find(song => String(song.id) === String(favorite.songId)))
      .filter(Boolean)
      .map(normalizeSong);

    res.json(favoriteSongs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
});

const addFavorite = (req, res) => {
  try {
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({ message: 'Song ID required' });
    }

    const favorites = readData('favorites.json');

    if (!favorites.find(f => f.userId === req.user.id && String(f.songId) === String(songId))) {
      favorites.push({
        userId: req.user.id,
        songId: String(songId),
        addedAt: new Date().toISOString()
      });
      writeData('favorites.json', favorites);
    }

    res.json({ message: 'Added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites', error: error.message });
  }
};

// Add to favorites
router.post('/favorites', verifyToken, addFavorite);
router.post('/favorites/add', verifyToken, addFavorite);

const removeFavorite = (req, res) => {
  try {
    const songId = req.params.songId || req.body.songId;

    if (!songId) {
      return res.status(400).json({ message: 'Song ID required' });
    }

    let favorites = readData('favorites.json');
    favorites = favorites.filter(f => !(f.userId === req.user.id && String(f.songId) === String(songId)));

    writeData('favorites.json', favorites);

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites', error: error.message });
  }
};

// Remove from favorites
router.post('/favorites/remove', verifyToken, removeFavorite);
router.delete('/favorites/:songId', verifyToken, removeFavorite);

// Update subscription
router.put('/subscription', verifyToken, (req, res) => {
  try {
    const plan = req.body.plan || req.body.subscription;

    if (!['free', 'premium'].includes(plan)) {
      return res.status(400).json({ message: 'Invalid subscription plan' });
    }

    const users = readData('users.json');
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.subscription = plan;
    writeData('users.json', users);

    res.json({ message: 'Subscription updated', subscription: plan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating subscription', error: error.message });
  }
});

module.exports = router;
