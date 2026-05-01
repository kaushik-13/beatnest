import React from 'react';
import { useMusic, usePlayer } from '../hooks/useContexts';
import SongCard from '../components/SongCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Category = ({ categoryName }) => {
  const { filteredSongs, loading } = useMusic();
  const { playSong, isFavorite, toggleFavorite } = usePlayer();

  const handlePlaySong = (song) => {
    playSong(song, filteredSongs);
  };

  return (
    <main className="flex-1 overflow-y-auto px-4 pb-36 pt-6 xl:px-6">
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-white/12 to-white/[0.04] p-6 ring-1 ring-white/10">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-spotify-darkGreen">Station</p>
        <h1 className="mt-2 text-3xl font-black">{categoryName}</h1>
        <p className="mt-2 text-spotify-textSecondary">A focused collection built for this mood.</p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredSongs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onPlay={handlePlaySong}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl py-16 text-center">
          <p className="text-lg text-spotify-textSecondary">No songs in this category</p>
        </div>
      )}
    </main>
  );
};

export default Category;
