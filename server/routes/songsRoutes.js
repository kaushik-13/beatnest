const express = require('express');
const { readData } = require('../utils/fileUtils');

const router = express.Router();

const categoryPalettes = {
  Retro: ['#ffd166', '#ff6b7a', '#2b1b3f'],
  Romantic: ['#ff6b7a', '#f72585', '#311326'],
  Workout: ['#31e981', '#0ead69', '#082c25'],
  Chill: ['#40d9ff', '#2f80ed', '#10233f'],
  Party: ['#8b5cf6', '#ff6b7a', '#251242'],
  Focus: ['#f8fbff', '#40d9ff', '#14233a'],
};

const escapeSvgText = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const generatedCover = (song) => {
  const [start, end, shadow] = categoryPalettes[song.category] || categoryPalettes.Chill;
  const title = escapeSvgText(song.title);
  const artist = escapeSvgText(song.artist);
  const category = escapeSvgText(song.category);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${start}"/>
          <stop offset="100%" stop-color="${end}"/>
        </linearGradient>
        <radialGradient id="glow" cx="75%" cy="18%" r="70%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" rx="56" fill="url(#bg)"/>
      <rect width="600" height="600" rx="56" fill="${shadow}" opacity="0.34"/>
      <circle cx="455" cy="120" r="150" fill="url(#glow)"/>
      <circle cx="445" cy="205" r="112" fill="none" stroke="#ffffff" stroke-opacity="0.32" stroke-width="28"/>
      <circle cx="445" cy="205" r="28" fill="#ffffff" fill-opacity="0.42"/>
      <path d="M84 378c88-54 160-54 248 0s160 54 248 0v118H84z" fill="#000000" opacity="0.18"/>
      <text x="58" y="76" fill="#ffffff" fill-opacity="0.76" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="800" letter-spacing="7">${category}</text>
      <text x="58" y="438" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="900">${title}</text>
      <text x="60" y="492" fill="#ffffff" fill-opacity="0.78" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700">${artist}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}`;
};

const normalizeSong = (song) => ({
  ...song,
  id: Number(song.id),
  coverImage: song.coverImage || generatedCover(song),
});

const getSongs = () => readData('songs.json').map(normalizeSong);

// Get all songs
router.get('/', (req, res) => {
  try {
    res.json(getSongs());
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error: error.message });
  }
});

// Get all categories. Both names are supported for compatibility.
router.get(['/categories', '/categories/all'], (req, res) => {
  try {
    const categories = [...new Set(getSongs().map(song => song.category))];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// Search songs. Supports /search?query=term and /search/term.
router.get(['/search', '/search/:query'], (req, res) => {
  try {
    const query = req.query.query || req.params.query || '';
    const songs = getSongs();

    if (!query.trim()) {
      return res.json(songs);
    }

    const loweredQuery = query.toLowerCase();
    const results = songs.filter(song =>
      song.title.toLowerCase().includes(loweredQuery) ||
      song.artist.toLowerCase().includes(loweredQuery) ||
      song.category.toLowerCase().includes(loweredQuery)
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching songs', error: error.message });
  }
});

// Get songs by category
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const filteredSongs = getSongs().filter(song => song.category.toLowerCase() === category.toLowerCase());
    res.json(filteredSongs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error: error.message });
  }
});

// Stream audio by redirecting to the sample audio URL.
router.get('/:id/audio', (req, res) => {
  try {
    const { id } = req.params;
    const song = readData('songs.json').find(s => String(s.id) === String(id));

    if (!song || !song.url) {
      return res.status(404).json({ message: 'Audio not found' });
    }

    res.redirect(song.url);
  } catch (error) {
    res.status(500).json({ message: 'Error loading audio', error: error.message });
  }
});

// Get single song
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const song = getSongs().find(s => String(s.id) === String(id));

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    res.json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching song', error: error.message });
  }
});

module.exports = router;
