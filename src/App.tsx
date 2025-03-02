import React, { useState, useEffect } from 'react';
import { X, Circle, Play, Moon } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [showWinningLine, setShowWinningLine] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show winning line after loading is complete
    if (!isLoading) {
      // Delay showing the winning line to ensure it's not visible before animation
      const timer = setTimeout(() => {
        setShowWinningLine(true);
      }, 800); 

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const previewCells = ['x', 'o', null, null, 'x', null, 'o', null, 'x'];

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
        <div className="max-w-md w-full mx-auto text-center space-y-8 animate-fade-in">
          {/* Logo/Title */}
          <div className="flex items-center justify-center space-x-2">
            <X className="text-amber-500" size={36} />
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-copper-500">
              Tic-Tac-Toe
            </h1>
            <Circle className="text-copper-400" size={36} />
          </div>

          {/* Tagline */}
          <p className="text-midnight-100 text-lg sm:text-xl">
            The classic game of X's and O's, reimagined.
          </p>

          {/* Game Preview */}
          <div className="relative mx-auto w-64 h-64 my-8">
            <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full">
              {previewCells.map((cell, index) => (
                <div
                  key={index}
                  className={`bg-charcoal-800 rounded-lg shadow-md flex items-center justify-center transition-all duration-300 ${
                    hoveredCell === index
                      ? 'bg-midnight-800 scale-105 shadow-glow'
                      : ''
                  } ${
                    // Highlight winning cells
                    (index === 0 || index === 4 || index === 8) && cell === 'x'
                      ? 'relative z-10'
                      : ''
                  }`}
                  onMouseEnter={() => setHoveredCell(index)}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  {cell === 'x' && (
                    <X
                      className={`${
                        index === 0 || index === 4 || index === 8
                          ? 'text-amber-400'
                          : 'text-amber-500'
                      }`}
                      size={32}
                    />
                  )}
                  {cell === 'o' && (
                    <Circle className="text-copper-400" size={32} />
                  )}
                </div>
              ))}
            </div>

            {/* Grid lines overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-midnight-700"></div>
              <div className="absolute right-1/3 top-0 bottom-0 w-0.5 bg-midnight-700"></div>
              <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-midnight-700"></div>
              <div className="absolute bottom-1/3 left-0 right-0 h-0.5 bg-midnight-700"></div>
            </div>

            {/* Winning diagonal line - Only shown when ready to animate */}
            {showWinningLine && (
              <div className="winning-line diagonal-line"></div>
            )}
          </div>

          {/* Start Button */}
          <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-charcoal-950 bg-gradient-to-r from-amber-500 to-copper-500 rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-glow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-charcoal-900">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-400 to-copper-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <Play className="mr-2 relative z-10" size={20} />
            <span className="relative z-10">Start Game</span>
          </button>

          {/* Theme indicator */}
          <div className="absolute top-4 right-4 text-amber-500 animate-pulse-slow">
            <Moon size={24} />
          </div>

          {/* Footer */}
          <p className="text-midnight-300 text-sm mt-8">
            © 2025 Tic-Tac-Toe Reimagined. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default App;