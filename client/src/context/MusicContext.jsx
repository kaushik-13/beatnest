import React, { createContext, useState, useEffect, useCallback } from 'react';
import { songAPI } from '../api/client';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all songs
  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await songAPI.getAllSongs();
      setSongs(response.data);
      setFilteredSongs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch songs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await songAPI.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  }, []);

  // Fetch songs by category
  const fetchSongsByCategory = useCallback(async (category) => {
    setLoading(true);
    try {
      if (category === 'all') {
        setFilteredSongs(songs);
      } else {
        const response = await songAPI.getSongsByCategory(category);
        setFilteredSongs(response.data);
      }
      setCurrentCategory(category);
      setError(null);
    } catch (err) {
      setError('Failed to fetch songs by category');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [songs]);

  // Search songs
  const searchSongsFunc = useCallback(async (query) => {
    setSearchQuery(query);
    setLoading(true);
    try {
      if (query.trim() === '') {
        setFilteredSongs(songs);
      } else {
        const response = await songAPI.searchSongs(query);
        setFilteredSongs(response.data);
      }
      setError(null);
    } catch (err) {
      setError('Failed to search songs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [songs]);

  useEffect(() => {
    fetchSongs();
    fetchCategories();
  }, [fetchSongs, fetchCategories]);

  return (
    <MusicContext.Provider
      value={{
        songs,
        categories,
        filteredSongs,
        currentCategory,
        searchQuery,
        loading,
        error,
        fetchSongs,
        fetchCategories,
        fetchSongsByCategory,
        searchSongsFunc,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
