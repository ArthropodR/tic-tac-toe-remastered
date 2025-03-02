import React, { useState, useEffect } from 'react';
import { X, Circle, Play } from 'lucide-react';

interface HomePageProps {
  onStartGame: () => void;
}

function HomePage({ onStartGame }: HomePageProps) {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [showWinningLine, setShowWinningLine] = useState(false);

  useEffect(() => {
    // Show winning line after a delay
    const timer = setTimeout(() => {
      setShowWinningLine(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Preview grid cells
  const previewCells = [
    'x', 'o', null,
    null, 'x', null,
    'o', null, 'x'
  ];

  return (
    <div className="max-w-md w-full mx-auto text-center space-y-10 animate-fade-in">
      {/* Logo/Title */}
      <div className="flex items-center justify-center space-x-3 mb-2">
        <X className="text-amber-500" size={40} />
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-copper-500">
          Tic-Tac-Toe
        </h1>
        <Circle className="text-copper-400" size={40} />
      </div>
      
      {/* Tagline */}
      <p className="text-midnight-100 text-xl max-w-sm mx-auto">
        The classic game of X's and O's, reimagined for cozy evenings
      </p>
      
      {/* Game Preview */}
      <div className="relative mx-auto w-64 h-64 my-12">
        <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full">
          {previewCells.map((cell, index) => (
            <div 
              key={index}
              className={`bg-charcoal-800 rounded-lg shadow-md flex items-center justify-center transition-all duration-300 ${
                hoveredCell === index ? 'bg-midnight-800 scale-105 shadow-glow' : ''
              } ${
                // Highlight winning cells
                (index === 0 || index === 4 || index === 8) && cell === 'x' ? 'relative z-10' : ''
              }`}
              onMouseEnter={() => setHoveredCell(index)}
              onMouseLeave={() => setHoveredCell(null)}
            >
              {cell === 'x' && <X className={`${(index === 0 || index === 4 || index === 8) ? 'text-amber-400' : 'text-amber-500'}`} size={32} />}
              {cell === 'o' && <Circle className="text-copper-400" size={32} />}
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
        
        {/* Winning diagonal line */}
        {showWinningLine && (
          <div className="winning-line diagonal-line"></div>
        )}
      </div>
      
      {/* Start Button */}
      <button 
        onClick={onStartGame}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-charcoal-950 bg-gradient-to-r from-amber-500 to-copper-500 rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-glow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-charcoal-900 mt-6"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-400 to-copper-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        <Play className="mr-2 relative z-10" size={20} />
        <span className="relative z-10">Start Game</span>
      </button>
    </div>
  );
}

export default HomePage;