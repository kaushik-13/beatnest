import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-spotify-gray border-t-spotify-darkGreen rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
