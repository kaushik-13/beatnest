import React, { useEffect, useState } from 'react';
import { useAuth, useMusic, usePlayer } from '../hooks/useContexts';
import { playlistAPI } from '../api/client';
import SongCard from '../components/SongCard';

const Library = () => {
  const { user, logout } = useAuth();
  const { songs } = useMusic();
  const { playSong, favorites, isFavorite, toggleFavorite } = usePlayer();
  const [activeTab, setActiveTab] = useState('favorites');
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoadingPlaylists(true);
      try {
        const response = await playlistAPI.getPlaylists();
        setPlaylists(response.data);
      } catch (error) {
        console.error('Failed to fetch playlists', error);
      } finally {
        setLoadingPlaylists(false);
      }
    };

    fetchPlaylists();
  }, []);

  const getPlaylistSongs = (playlist) => {
    return playlist.songs
      .map((songId) => songs.find((song) => song.id === Number(songId)))
      .filter(Boolean);
  };

  const handlePlaySong = (song) => {
    playSong(song, favorites);
  };

  const handlePlayPlaylistSong = (song, playlistSongs) => {
    playSong(song, playlistSongs);
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;
    try {
      const response = await playlistAPI.createPlaylist({
        name: newPlaylistName,
        description: 'Demo-ready playlist with starter tracks.',
      });
      setPlaylists([...playlists, response.data]);
      setNewPlaylistName('');
      setShowCreatePlaylist(false);
    } catch (error) {
      console.error('Failed to create playlist', error);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto px-4 pb-36 pt-6 xl:px-6">
      <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl bg-gradient-to-br from-white/12 to-white/[0.04] p-6 ring-1 ring-white/10 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-spotify-darkGreen">Your space</p>
          <h1 className="mt-2 text-3xl font-black">Library</h1>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <>
              <div className="text-right">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm uppercase text-spotify-textSecondary">
                  {user.subscription} Plan
                </p>
              </div>
              <button
                onClick={logout}
                className="rounded-full bg-white px-4 py-2 font-bold text-spotify-black transition hover:bg-spotify-darkGreen"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mb-8 flex gap-2 rounded-full bg-white/10 p-1">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex-1 rounded-full px-4 py-3 font-bold transition ${
            activeTab === 'favorites'
              ? 'bg-spotify-darkGreen text-spotify-black'
              : 'text-spotify-textSecondary hover:bg-white/10 hover:text-white'
          }`}
        >
          Favorites ({favorites.length})
        </button>
        <button
          onClick={() => setActiveTab('playlists')}
          className={`flex-1 rounded-full px-4 py-3 font-bold transition ${
            activeTab === 'playlists'
              ? 'bg-spotify-darkGreen text-spotify-black'
              : 'text-spotify-textSecondary hover:bg-white/10 hover:text-white'
          }`}
        >
          Playlists ({playlists.length})
        </button>
      </div>

      {activeTab === 'favorites' && (
        <div>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {favorites.map((song) => (
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
              <p className="text-lg text-spotify-textSecondary">No favorite songs yet</p>
              <p className="text-spotify-textSecondary">Add songs to your favorites to see them here</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'playlists' && (
        <div>
          <div className="mb-6">
            {!showCreatePlaylist ? (
              <button
                onClick={() => setShowCreatePlaylist(true)}
                className="rounded-full bg-spotify-darkGreen px-6 py-3 font-black text-spotify-black transition hover:bg-white"
              >
                Create playlist
              </button>
            ) : (
              <div className="glass-panel flex flex-col gap-2 rounded-2xl p-3 sm:flex-row">
                <input
                  type="text"
                  placeholder="Playlist name..."
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="flex-1 rounded-xl bg-spotify-black/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-spotify-darkGreen"
                />
                <button
                  onClick={handleCreatePlaylist}
                  className="rounded-xl bg-spotify-darkGreen px-4 py-3 font-bold text-spotify-black transition hover:bg-white"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreatePlaylist(false)}
                  className="rounded-xl bg-white/10 px-4 py-3 font-bold text-white transition hover:bg-white/15"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {loadingPlaylists ? (
            <div className="glass-panel rounded-3xl py-16 text-center text-spotify-textSecondary">Loading playlists...</div>
          ) : playlists.length > 0 ? (
            <div className="grid gap-5 xl:grid-cols-2">
              {playlists.map((playlist) => {
                const playlistSongs = getPlaylistSongs(playlist);

                return (
                  <section key={playlist.id} className="glass-panel rounded-3xl p-4 transition hover:bg-white/[0.08]">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black">{playlist.name}</h3>
                        <p className="mt-1 text-sm text-spotify-textSecondary">{playlist.description || 'Ready to play'}</p>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-spotify-textSecondary">
                        {playlistSongs.length} songs
                      </span>
                    </div>

                    <div className="space-y-2">
                      {playlistSongs.map((song, index) => (
                        <button
                          key={song.id}
                          onClick={() => handlePlayPlaylistSong(song, playlistSongs)}
                          className="flex w-full items-center gap-3 rounded-2xl bg-black/20 p-3 text-left transition hover:bg-white/10"
                        >
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-xs font-black text-spotify-textSecondary">{index + 1}</span>
                          <img src={song.coverImage} alt={song.title} className="h-12 w-12 rounded-xl object-cover" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-bold">{song.title}</span>
                            <span className="block truncate text-xs text-spotify-textSecondary">{song.artist}</span>
                          </span>
                          <span className="grid h-9 w-9 place-items-center rounded-full bg-spotify-darkGreen">
                            <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[10px] border-y-transparent border-l-spotify-black" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="glass-panel rounded-3xl py-16 text-center">
              <p className="text-lg text-spotify-textSecondary">No playlists yet</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Library;
