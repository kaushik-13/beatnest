import React, { useState } from 'react';
import { useMusic, usePlayer } from '../hooks/useContexts';
import SongCard from '../components/SongCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Search = () => {
  const { filteredSongs, searchSongsFunc, loading } = useMusic();
  const { playSong, isFavorite, toggleFavorite } = usePlayer();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    searchSongsFunc(query);
  };

  const handlePlaySong = (song) => {
    playSong(song, filteredSongs);
  };

  return (
    <main className="flex-1 overflow-y-auto px-4 pb-36 pt-6 xl:px-6">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-spotify-textSecondary">Explore</p>
        <h1 className="text-3xl font-black">Search music</h1>
      </div>

      <div className="glass-panel mb-8 rounded-2xl p-3">
        <input
          type="text"
          placeholder="Search songs, artists, or categories..."
          value={searchInput}
          onChange={handleSearch}
          className="w-full rounded-xl bg-spotify-black/50 px-5 py-4 text-white placeholder:text-spotify-textSecondary focus:outline-none focus:ring-2 focus:ring-spotify-darkGreen"
        />
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
          <p className="text-lg text-spotify-textSecondary">
            {searchInput ? 'No results found' : 'Start searching for your favorite music'}
          </p>
        </div>
      )}
    </main>
  );
};

export default Search;
