import React, { useEffect } from 'react';
import { usePlayer } from '../hooks/useContexts';

const Player = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackError,
    isFreePlan,
    forwardSeekCount,
    skipCount,
    freeForwardSeekLimit,
    freeSkipLimit,
    togglePlayPause,
    playNext,
    playPrevious,
    seek,
    changeVolume,
    toggleMute,
    isFavorite,
    toggleFavorite,
  } = usePlayer();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [togglePlayPause]);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-spotify-ink/90 p-4 backdrop-blur-xl md:left-72">
        <div className="text-center text-sm font-semibold text-spotify-textSecondary">
          Select a song to start playing
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-spotify-ink/90 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl md:left-72">
      <div className="grid gap-3 lg:grid-cols-[1fr_1.3fr_1fr] lg:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={currentSong.coverImage}
            alt={currentSong.title}
            className="h-14 w-14 rounded-2xl object-cover shadow-lg shadow-black/30"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold">{currentSong.title}</p>
            <p className="truncate text-sm text-spotify-textSecondary">{currentSong.artist}</p>
          </div>
          <button
            onClick={() => toggleFavorite(currentSong)}
            aria-label="Toggle favorite"
            className={`grid h-10 w-10 place-items-center rounded-full text-sm font-black transition ${
              isFavorite(currentSong.id) ? 'bg-spotify-coral text-white' : 'bg-white/10 text-spotify-textSecondary hover:text-white'
            }`}
          >
            {isFavorite(currentSong.id) ? 'F' : '+'}
          </button>
        </div>

        <div>
          {playbackError && (
            <p className="mb-2 text-center text-xs font-semibold text-spotify-coral">{playbackError}</p>
          )}
          {isFreePlan && (
            <p className="mb-2 text-center text-[11px] font-semibold text-spotify-textSecondary">
              Free plan: {Math.max(0, freeSkipLimit - skipCount)} skips and {Math.max(0, freeForwardSeekLimit - forwardSeekCount)} forward seeks left this session
            </p>
          )}
          <div className="mb-2 flex items-center justify-center gap-3">
            <button
              onClick={playPrevious}
              aria-label="Previous song"
              className="group grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/15"
            >
              <span className="relative h-4 w-4">
                <span className="absolute left-0 top-0 h-4 w-0.5 rounded bg-white" />
                <span className="absolute left-1 top-0 h-0 w-0 border-y-8 border-r-8 border-y-transparent border-r-white" />
              </span>
            </button>
            <button
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause song' : 'Play song'}
              className="grid h-12 w-12 place-items-center rounded-full bg-spotify-darkGreen shadow-lg shadow-spotify-darkGreen/20 transition hover:bg-white"
            >
              {isPlaying ? (
                <span className="flex h-5 w-5 items-center justify-center gap-1">
                  <span className="h-5 w-1.5 rounded bg-spotify-black" />
                  <span className="h-5 w-1.5 rounded bg-spotify-black" />
                </span>
              ) : (
                <span className="ml-1 h-0 w-0 border-y-[10px] border-l-[15px] border-y-transparent border-l-spotify-black" />
              )}
            </button>
            <button
              onClick={playNext}
              aria-label="Next song"
              className="group grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/15"
            >
              <span className="relative h-4 w-4">
                <span className="absolute right-0 top-0 h-4 w-0.5 rounded bg-white" />
                <span className="absolute right-1 top-0 h-0 w-0 border-y-8 border-l-8 border-y-transparent border-l-white" />
              </span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-9 text-xs text-spotify-textSecondary">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => seek(parseFloat(e.target.value))}
              className="range-modern flex-1"
            />
            <span className="w-9 text-right text-xs text-spotify-textSecondary">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/15"
          >
            <span className="relative h-4 w-5">
              <span className="absolute left-0 top-1 h-2 w-1.5 rounded-sm bg-white" />
              <span className="absolute left-1.5 top-0 h-4 w-2 rounded-sm bg-white" />
              {isMuted ? (
                <span className="absolute right-0 top-0 h-4 w-0.5 rotate-45 rounded bg-spotify-coral" />
              ) : (
                <span className="absolute right-0 top-1 h-2 w-2 rounded-r-full border-r-2 border-white" />
              )}
            </span>
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="range-modern w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
