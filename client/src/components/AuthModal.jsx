import React, { useState } from 'react';
import { useAuth } from '../hooks/useContexts';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      onClose(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-md rounded-3xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-spotify-darkGreen">Account</p>
            <h2 className="mt-1 text-2xl font-black">
              {isLogin ? 'Sign in' : 'Create account'}
            </h2>
            <p className="mt-2 text-xs text-spotify-textSecondary">
              Demo: aarav@beatnest.in / manager123
            </p>
          </div>
          <button
            onClick={() => onClose(false)}
            aria-label="Close"
            className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-white/10 bg-white/10 transition hover:border-spotify-coral/60 hover:bg-spotify-coral/15"
          >
            <span className="absolute h-5 w-0.5 rotate-45 rounded-full bg-white transition group-hover:bg-spotify-coral" />
            <span className="absolute h-5 w-0.5 -rotate-45 rounded-full bg-white transition group-hover:bg-spotify-coral" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-bold text-spotify-textSecondary">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl bg-spotify-black/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-spotify-darkGreen"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-bold text-spotify-textSecondary">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="aarav@beatnest.in"
              className="w-full rounded-xl bg-spotify-black/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-spotify-darkGreen"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-spotify-textSecondary">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="manager123"
              className="w-full rounded-xl bg-spotify-black/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-spotify-darkGreen"
              required
            />
          </div>

          {error && <p className="rounded-xl bg-spotify-coral/10 px-3 py-2 text-sm font-semibold text-spotify-coral">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-spotify-darkGreen py-3 font-black text-spotify-black transition hover:bg-white disabled:opacity-50"
          >
            {loading ? 'Loading...' : isLogin ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-2 text-sm text-spotify-textSecondary">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-spotify-darkGreen hover:underline"
          >
            {isLogin ? 'Create one' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
