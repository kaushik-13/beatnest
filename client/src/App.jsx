import React, { useState } from 'react';
import { useAuth, useMusic } from './hooks/useContexts';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Category from './pages/Category';
import { userAPI } from './api/client';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountMessage, setAccountMessage] = useState('');

  const { isAuthenticated, user, logout, getProfile } = useAuth();
  const { fetchSongsByCategory } = useMusic();

  const navigateToCategory = (category) => {
    setSelectedCategory(category);
    fetchSongsByCategory(category);
    setCurrentPage('category');
    setSidebarOpen(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    setAccountOpen(false);
  };

  const handleAuthClose = (success = false) => {
    setShowAuthModal(false);
    if (success) {
      setAccountOpen(true);
      setAccountMessage('Account opened successfully.');
    }
  };

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    setAccountMessage('');
    setCurrentPage('home');
  };

  const handleManagePlan = async () => {
    const nextPlan = user?.subscription === 'premium' ? 'free' : 'premium';
    try {
      await userAPI.updateSubscription({ subscription: nextPlan });
      await getProfile();
      setAccountMessage(`Plan changed to ${nextPlan}.`);
    } catch (error) {
      setAccountMessage('Could not update plan right now.');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateToCategory={navigateToCategory} />;
      case 'search':
        return <Search />;
      case 'library':
        return isAuthenticated ? (
          <Library />
        ) : (
          <AuthModal
            isOpen={true}
            onClose={(success = false) => {
              if (success) {
                setCurrentPage('library');
                setAccountOpen(true);
                setAccountMessage('Account opened successfully.');
              } else {
                setCurrentPage('home');
              }
            }}
          />
        );
      case 'category':
        return <Category categoryName={selectedCategory} />;
      default:
        return <Home navigateToCategory={navigateToCategory} />;
    }
  };

  const navItems = ['home', 'search', 'library'];

  return (
    <div className="app-surface h-screen overflow-hidden text-spotify-textPrimary">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Open menu"
        className="fixed left-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-spotify-panel/90 text-xl font-black shadow-xl backdrop-blur md:hidden"
      >
        =
      </button>

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        currentPage={currentPage}
        onNavigate={handleNavigation}
        onCategory={navigateToCategory}
      />

      <div className="flex h-screen flex-col md:ml-72">
        <header className="mx-4 mt-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-spotify-ink/80 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur xl:mx-6">
          <nav className="ml-12 flex flex-1 gap-2 overflow-x-auto md:ml-0">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                  currentPage === item
                    ? 'bg-spotify-darkGreen text-spotify-black shadow-lg shadow-spotify-darkGreen/20'
                    : 'text-spotify-textSecondary hover:bg-white/10 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <button
                  onClick={() => setAccountOpen((open) => !open)}
                  className="flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 transition hover:bg-white/15"
                  aria-label="Open account menu"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-spotify-darkGreen text-xs font-black text-spotify-black">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                  <span className="hidden text-left sm:block">
                    <span className="block max-w-28 truncate text-sm font-bold">{user.name}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-spotify-textSecondary">{user.subscription}</span>
                  </span>
                </button>

              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-spotify-black transition hover:bg-spotify-darkGreen"
              >
                Sign in
              </button>
            )}
          </div>
        </header>

        {renderPage()}
      </div>

      {accountOpen && isAuthenticated && user && (
        <>
          <button
            aria-label="Close account menu"
            onClick={() => setAccountOpen(false)}
            className="fixed inset-0 z-[70] cursor-default bg-black/35 backdrop-blur-[2px]"
          />
          <aside className="fixed right-4 top-20 z-[80] w-[calc(100vw-2rem)] max-w-sm rounded-3xl border border-white/10 bg-spotify-ink p-4 shadow-2xl shadow-black/50 md:right-6">
            <div className="rounded-2xl bg-gradient-to-br from-white/[0.10] to-white/[0.04] p-4 ring-1 ring-white/10">
              <div className="flex items-start gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-spotify-darkGreen text-base font-black text-spotify-black">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-black">{user.name}</p>
                  <p className="mt-1 truncate text-xs text-spotify-textSecondary">{user.email}</p>
                  <span className="mt-3 inline-flex rounded-full bg-spotify-darkGreen px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-spotify-black">
                    {user.subscription} plan
                  </span>
                </div>
                <button
                  onClick={() => setAccountOpen(false)}
                  aria-label="Close account menu"
                  className="group relative grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-spotify-coral/15"
                >
                  <span className="absolute h-4 w-0.5 rotate-45 rounded bg-white group-hover:bg-spotify-coral" />
                  <span className="absolute h-4 w-0.5 -rotate-45 rounded bg-white group-hover:bg-spotify-coral" />
                </button>
              </div>
              {accountMessage && (
                <p className="mt-3 rounded-xl bg-spotify-darkGreen/10 px-3 py-2 text-xs font-semibold text-spotify-darkGreen">{accountMessage}</p>
              )}
            </div>
            <div className="mt-3 space-y-2">
              <button onClick={() => handleNavigation('library')} className="w-full rounded-2xl px-4 py-3 text-left text-sm font-bold text-spotify-textSecondary transition hover:bg-white/10 hover:text-white">
                Open Library
              </button>
              <button onClick={() => handleNavigation('search')} className="w-full rounded-2xl px-4 py-3 text-left text-sm font-bold text-spotify-textSecondary transition hover:bg-white/10 hover:text-white">
                Find Music
              </button>
              <button onClick={handleManagePlan} className="w-full rounded-2xl px-4 py-3 text-left text-sm font-bold text-spotify-textSecondary transition hover:bg-white/10 hover:text-white">
                {user.subscription === 'premium' ? 'Switch to Free' : 'Upgrade Plan'}
              </button>
              <button onClick={handleLogout} className="w-full rounded-2xl px-4 py-3 text-left text-sm font-bold text-spotify-coral transition hover:bg-spotify-coral hover:text-white">
                Sign out
              </button>
            </div>
          </aside>
        </>
      )}

      <Player />

      <AuthModal isOpen={showAuthModal} onClose={handleAuthClose} />
    </div>
  );
}

export default App;
