import React, { useState, useEffect } from 'react';
import { X, Circle, Play, Moon } from 'lucide-react';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal-950 via-midnight-900 to-charcoal-900 flex items-center justify-center">
        <div className="animate-spin text-amber-500">
          <Circle size={40} />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-texture"></div>

      {/* Warm gradient overlay */}
      <div className="fixed inset-0 warm-gradient-overlay"></div>

      <div className="relative z-10 min-h-screen bg-gradient-to-br from-charcoal-950 via-midnight-900 to-charcoal-900 flex flex-col items-center justify-center p-4 sm:p-6">
        {currentPage === 'home' ? (
          <HomePage onStartGame={() => setCurrentPage('game')} />
        ) : (
          <GamePage onBackToHome={() => setCurrentPage('home')} />
        )}

        {/* Theme indicator */}
        <div className="absolute top-4 right-4 text-amber-500 animate-pulse-slow">
          <Moon size={24} />
        </div>

        {/* Footer */}
        <p className="text-midnight-300 text-sm mt-8 absolute bottom-4">
          © 2025 Tic-Tac-Toe. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default App;