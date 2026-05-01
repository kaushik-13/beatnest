import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar, currentPage, onNavigate, onCategory }) => {
  const menu = [
    { id: 'home', label: 'Home', icon: 'H' },
    { id: 'search', label: 'Search', icon: 'S' },
    { id: 'library', label: 'Library', icon: 'L' },
  ];
  const categories = ['Retro', 'Romantic', 'Workout', 'Chill', 'Party', 'Focus'];

  return (
    <aside className={`fixed left-0 top-0 z-50 h-screen w-72 transform overflow-y-auto border-r border-white/10 bg-spotify-ink/95 shadow-2xl shadow-black/30 backdrop-blur-xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="flex min-h-full flex-col p-5">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-[18px] bg-gradient-to-br from-spotify-darkGreen via-spotify-cyan to-spotify-amber shadow-xl shadow-spotify-darkGreen/25">
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_28%),linear-gradient(135deg,transparent,rgba(0,0,0,0.22))]" />
              <span className="relative flex h-7 w-7 items-end justify-center gap-1">
                <span className="h-3 w-1.5 rounded-full bg-spotify-black" />
                <span className="h-6 w-1.5 rounded-full bg-spotify-black" />
                <span className="h-4 w-1.5 rounded-full bg-spotify-black" />
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-spotify-black" />
              </span>
            </div>
            <div>
              <span className="block text-xl font-black tracking-tight">BeatNest</span>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-spotify-textSecondary">Studio</span>
            </div>
          </div>
          <button onClick={toggleSidebar} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 md:hidden">
            x
          </button>
        </div>

        <nav className="space-y-2">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-full px-3 py-3 text-left font-semibold transition duration-300 ${
                currentPage === item.id
                  ? 'bg-white/[0.08] text-white shadow-[0_0_28px_rgba(49,233,129,0.16)]'
                  : 'text-spotify-textSecondary hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              {currentPage === item.id && (
                <>
                  <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-spotify-darkGreen shadow-[0_0_18px_rgba(49,233,129,0.8)]" />
                  <span className="absolute inset-0 bg-gradient-to-r from-spotify-darkGreen/20 via-spotify-cyan/10 to-transparent" />
                </>
              )}
              <span className={`grid h-8 w-8 place-items-center rounded-xl text-sm transition ${
                currentPage === item.id
                  ? 'bg-spotify-darkGreen text-spotify-black shadow-lg shadow-spotify-darkGreen/20'
                  : 'bg-spotify-black/40 group-hover:bg-white/10'
              }`}>
                {item.icon}
              </span>
              <span className="relative">{item.label}</span>
              {currentPage === item.id && (
                <span className="relative ml-auto h-2 w-2 rounded-full bg-spotify-darkGreen shadow-[0_0_12px_rgba(49,233,129,0.9)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-spotify-textSecondary">Moods</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategory(category)}
                className="rounded-xl bg-white/5 px-3 py-2 text-left text-sm font-semibold text-spotify-textSecondary transition hover:bg-spotify-darkGreen hover:text-spotify-black"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-auto overflow-hidden rounded-3xl border border-white/10 bg-spotify-panel p-4 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-gradient-to-br from-spotify-darkGreen/30 via-spotify-cyan/15 to-spotify-coral/20" />
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-white/20 bg-white/10" />
          <div className="absolute bottom-3 right-4 flex h-12 items-end gap-1 opacity-70">
            <span className="h-5 w-1.5 rounded-full bg-spotify-darkGreen" />
            <span className="h-9 w-1.5 rounded-full bg-spotify-cyan" />
            <span className="h-7 w-1.5 rounded-full bg-spotify-amber" />
            <span className="h-11 w-1.5 rounded-full bg-spotify-coral" />
            <span className="h-6 w-1.5 rounded-full bg-white" />
          </div>
          <div className="relative">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              Now trending
            </span>
            <p className="mt-3 text-lg font-black leading-tight text-white">Daily Pulse</p>
            <p className="mt-1 max-w-[11rem] text-sm font-semibold leading-snug text-spotify-textSecondary">
              Fresh mixes, cleaner beats, sharper vibes.
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-2/3 rounded-full bg-spotify-darkGreen shadow-[0_0_14px_rgba(49,233,129,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
