import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';
import { PlayerProvider } from './context/PlayerContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <MusicProvider>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </MusicProvider>
    </AuthProvider>
  </React.StrictMode>,
);
