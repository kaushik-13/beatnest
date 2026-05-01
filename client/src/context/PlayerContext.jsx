import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { songAPI } from '../api/client';
import { AuthContext } from './AuthContext';

export const PlayerContext = createContext();

const FREE_FORWARD_SEEK_LIMIT = 2;
const FREE_SKIP_LIMIT = 2;

export const PlayerProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackError, setPlaybackError] = useState('');
  const [forwardSeekCount, setForwardSeekCount] = useState(0);
  const [skipCount, setSkipCount] = useState(0);
  const [recentlyPlayed, setRecentlyPlayed] = useState(
    JSON.parse(localStorage.getItem('recentlyPlayed') || '[]')
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  const audioRef = React.useRef(new Audio());
  const isFreePlan = !user || user.subscription !== 'premium';

  useEffect(() => {
    if (!isFreePlan) {
      setForwardSeekCount(0);
      setSkipCount(0);
      setPlaybackError('');
    }
  }, [isFreePlan]);

  // Initialize player
  useEffect(() => {
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleCanPlay = () => {
      setPlaybackError('');
    };

    const handleAudioError = () => {
      setIsPlaying(false);
      setPlaybackError('Audio could not be loaded. Try another song or restart the backend server.');
    };

    const handleEnded = () => {
      playNext({ countAsSkip: false });
    };

    audio.preload = 'metadata';
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleAudioError);
    audio.addEventListener('ended', handleEnded);
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleAudioError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Play song
  const playSong = useCallback((song, newQueue = null) => {
    const audio = audioRef.current;
    
    if (newQueue) {
      setQueue(newQueue);
      const index = newQueue.findIndex(s => s.id === song.id);
      setCurrentIndex(index >= 0 ? index : 0);
    }

    setCurrentSong(song);
    setPlaybackError('');
    setCurrentTime(0);
    setDuration(song.duration || 0);
    audio.src = songAPI.getAudioUrl(song.id);
    audio.load();

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
          setPlaybackError('Playback was blocked. Press the play button again.');
        });
    } else {
      setIsPlaying(true);
    }

    // Add to recently played
    addRecentlyPlayed(song);
  }, []);

  // Play next song
  const playNext = useCallback((options = {}) => {
    if (queue.length === 0) return;

    const shouldCountSkip = options.countAsSkip !== false;
    if (isFreePlan && shouldCountSkip && skipCount >= FREE_SKIP_LIMIT) {
      setPlaybackError('Free plan allows only 2 skips per session. Upgrade to Premium for unlimited skips.');
      return;
    }

    if (isFreePlan && shouldCountSkip) {
      setSkipCount(prev => prev + 1);
    }

    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentIndex(nextIndex);
    playSong(queue[nextIndex], queue);
  }, [currentIndex, isFreePlan, playSong, queue, skipCount]);

  // Play previous song
  const playPrevious = useCallback(() => {
    if (queue.length === 0) return;

    if (isFreePlan && skipCount >= FREE_SKIP_LIMIT) {
      setPlaybackError('Free plan allows only 2 skips per session. Upgrade to Premium for unlimited skips.');
      return;
    }

    if (isFreePlan) {
      setSkipCount(prev => prev + 1);
    }

    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentIndex(prevIndex);
    playSong(queue[prevIndex], queue);
  }, [currentIndex, isFreePlan, playSong, queue, skipCount]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlaybackError('');
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
            setPlaybackError('Playback was blocked. Press the play button again.');
          });
      } else {
        setIsPlaying(true);
      }
    }
  }, [isPlaying]);

  // Seek to time
  const seek = useCallback((time) => {
    const audio = audioRef.current;
    const targetTime = Math.max(0, Math.min(time, duration));
    const isForwardSeek = targetTime > audio.currentTime + 1;

    if (isFreePlan && isForwardSeek && forwardSeekCount >= FREE_FORWARD_SEEK_LIMIT) {
      setPlaybackError('Free plan allows only 2 forward seeks per session. Upgrade to Premium for unlimited seeking.');
      setCurrentTime(audio.currentTime);
      return;
    }

    if (isFreePlan && isForwardSeek) {
      setForwardSeekCount(prev => prev + 1);
    }

    audio.currentTime = targetTime;
    setCurrentTime(audio.currentTime);
    setPlaybackError('');
  }, [duration, forwardSeekCount, isFreePlan]);

  // Change volume
  const changeVolume = useCallback((newVolume) => {
    const audio = audioRef.current;
    const vol = Math.max(0, Math.min(newVolume, 1));
    setVolume(vol);
    audio.volume = vol;
    if (vol > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  // Add to recently played
  const addRecentlyPlayed = useCallback((song) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      const updated = [song, ...filtered].slice(0, 50);
      localStorage.setItem('recentlyPlayed', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Toggle favorite
  const toggleFavorite = useCallback((song) => {
    setFavorites(prev => {
      const isFavorite = prev.some(s => s.id === song.id);
      const updated = isFavorite
        ? prev.filter(s => s.id !== song.id)
        : [...prev, song];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check if song is favorite
  const isFavorite = useCallback((songId) => {
    return favorites.some(s => s.id === songId);
  }, [favorites]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        queue,
        isPlaying,
        currentIndex,
        duration,
        currentTime,
        volume,
        isMuted,
        playbackError,
        isFreePlan,
        forwardSeekCount,
        skipCount,
        freeForwardSeekLimit: FREE_FORWARD_SEEK_LIMIT,
        freeSkipLimit: FREE_SKIP_LIMIT,
        recentlyPlayed,
        favorites,
        playSong,
        playNext,
        playPrevious,
        togglePlayPause,
        seek,
        changeVolume,
        toggleMute,
        toggleFavorite,
        isFavorite,
        setQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
