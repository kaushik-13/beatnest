import React from 'react';

const SongCard = ({ song, onPlay, isFavorite, onToggleFavorite }) => {
  return (
    <article className="group glass-panel cursor-pointer overflow-hidden rounded-2xl p-3 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09]">
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img
          src={song.coverImage}
          alt={song.title}
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay(song);
          }}
          aria-label={`Play ${song.title}`}
          className="absolute bottom-3 right-3 grid h-12 min-w-12 place-items-center rounded-full bg-spotify-darkGreen px-3 text-sm font-black text-spotify-black opacity-0 shadow-xl shadow-black/30 transition group-hover:opacity-100"
        >
          Play
        </button>
      </div>
      <h3 className="truncate font-bold">{song.title}</h3>
      <p className="truncate text-sm text-spotify-textSecondary">{song.artist}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-spotify-textSecondary">{song.category}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(song);
          }}
          aria-label="Toggle favorite"
          className={`grid h-9 w-9 place-items-center rounded-full text-sm font-black transition ${
            isFavorite(song.id) ? 'bg-spotify-coral text-white' : 'bg-white/10 text-spotify-textSecondary hover:text-white'
          }`}
        >
          {isFavorite(song.id) ? 'F' : '+'}
        </button>
      </div>
    </article>
  );
};

export default SongCard;
