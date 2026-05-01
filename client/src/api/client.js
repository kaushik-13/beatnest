import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const songAPI = {
  getAllSongs: () => api.get('/songs'),
  searchSongs: (query) => api.get('/songs/search', { params: { query } }),
  getSongsByCategory: (category) => api.get(`/songs/category/${category}`),
  getCategories: () => api.get('/songs/categories'),
  getAudioUrl: (songId) => `${API_BASE_URL}/songs/${songId}/audio`,
};

export const playlistAPI = {
  getPlaylists: () => api.get('/playlists'),
  createPlaylist: (data) => api.post('/playlists/create', data),
  addSongToPlaylist: (data) => api.post('/playlists/add-song', data),
  removeSongFromPlaylist: (data) => api.post('/playlists/remove-song', data),
  deletePlaylist: (id) => api.delete(`/playlists/${id}`),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateSubscription: (data) => api.put('/user/subscription', data),
  addFavoriteSong: (data) => api.post('/user/favorites/add', data),
  removeFavoriteSong: (data) => api.post('/user/favorites/remove', data),
  getFavoriteSongs: () => api.get('/user/favorites'),
};

export default api;
