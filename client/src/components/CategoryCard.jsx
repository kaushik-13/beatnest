import React from 'react';

const CategoryCard = ({ category, onClick }) => {
  const categoryStyles = {
    Retro: 'from-spotify-amber to-spotify-coral',
    Romantic: 'from-spotify-coral to-fuchsia-500',
    Workout: 'from-spotify-darkGreen to-emerald-700',
    Chill: 'from-spotify-cyan to-blue-700',
    Party: 'from-violet-500 to-spotify-coral',
    Focus: 'from-slate-200 to-spotify-cyan',
  };

  const categoryImages = {
    Retro: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=900&q=80',
    Romantic: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=900&q=80',
    Workout: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    Chill: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    Party: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
    Focus: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80',
  };

  return (
    <button
      onClick={onClick}
      className="group relative min-h-[132px] w-full overflow-hidden rounded-2xl bg-spotify-panel p-5 text-left text-white shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1"
      style={{ backgroundImage: `url(${categoryImages[category] || categoryImages.Chill})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/45" />
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryStyles[category] || 'from-spotify-darkGreen to-spotify-cyan'} opacity-70 mix-blend-multiply`} />
      <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-white/20 transition group-hover:scale-125" />
      <span className="relative text-xs font-black uppercase tracking-[0.22em] text-white/80">Mood</span>
      <h3 className="relative mt-3 text-xl font-black">{category}</h3>
      <p className="relative mt-1 text-sm font-semibold text-white/80">Open station</p>
    </button>
  );
};

export default CategoryCard;
