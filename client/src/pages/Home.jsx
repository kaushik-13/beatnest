import React from 'react';
import { useMusic, usePlayer } from '../hooks/useContexts';
import SongCard from '../components/SongCard';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = ({ navigateToCategory }) => {
  const { filteredSongs, categories, loading } = useMusic();
  const { playSong, isFavorite, toggleFavorite } = usePlayer();

  const handlePlaySong = (song) => {
    playSong(song, filteredSongs);
  };

  return (
    <main className="flex-1 overflow-y-auto px-4 pb-36 pt-5 xl:px-6">
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-spotify-panel">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1400')] bg-cover bg-center opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-spotify-black via-spotify-black/80 to-transparent" />
        <div className="relative grid min-h-[320px] content-end p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-spotify-darkGreen">BeatNest music player</p>
            <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-5xl">Feel every playlist in high definition.</h1>
            <p className="mt-4 max-w-xl text-sm text-spotify-textSecondary sm:text-base">Browse moods, discover popular tracks, and keep your favorite songs close in a cleaner listening space.</p>
            <button
              onClick={() => filteredSongs[0] && handlePlaySong(filteredSongs[0])}
              className="mt-6 rounded-full bg-spotify-darkGreen px-6 py-3 font-black text-spotify-black shadow-xl shadow-spotify-darkGreen/20 transition hover:bg-white"
            >
              Start listening
            </button>
          </div>
          <div className="mt-8 hidden rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur lg:block">
            <p className="text-sm font-bold text-spotify-textSecondary">Featured queue</p>
            <div className="mt-4 space-y-3">
              {filteredSongs.slice(0, 3).map((song, index) => (
                <button
                  key={song.id}
                  onClick={() => handlePlaySong(song)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-black/25 p-3 text-left transition hover:bg-white/10"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm font-bold">{index + 1}</span>
                  <img src={song.coverImage} alt={song.title} className="h-12 w-12 rounded-xl object-cover" />
                  <span className="min-w-0">
                    <span className="block truncate font-bold">{song.title}</span>
                    <span className="block truncate text-sm text-spotify-textSecondary">{song.artist}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mb-10">
        <div className="mb-4">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-spotify-textSecondary">Browse</p>
            <h2 className="text-xl font-black">Choose your mood</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category} category={category} onClick={() => navigateToCategory(category)} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-spotify-textSecondary">Trending</p>
            <h2 className="text-xl font-black">Popular tracks</h2>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredSongs.slice(0, 8).map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onPlay={handlePlaySong}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
