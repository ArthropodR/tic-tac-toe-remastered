import React, { useState, useEffect } from 'react';
import { X, Circle, RotateCcw, Home } from 'lucide-react';

interface GamePageProps {
  onBackToHome: () => void;
}

type Player = 'X' | 'O';
type CellValue = Player | null;

function GamePage({ onBackToHome }: GamePageProps) {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [winningCombination, setWinningCombination] = useState<number[] | null>(null);
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [gameStartAnimation, setGameStartAnimation] = useState(true);

  // Winning combinations
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  useEffect(() => {
    // Animate game board appearance
    const timer = setTimeout(() => {
      setGameStartAnimation(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Check for winner
  useEffect(() => {
    checkWinner();
  }, [board]);

  const handleCellClick = (index: number) => {
    // If cell is already filled or game is over, do nothing
    if (board[index] || winner) return;

    // Update the board
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Switch player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = () => {
    // Check for winning combinations
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a] as Player);
        setWinningCombination(combo);
        return;
      }
    }

    // Check for draw
    if (!board.includes(null) && !winner) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningCombination(null);
  };

  // Determine line class for winning combination
  const getWinningLineClass = () => {
    if (!winningCombination) return '';
    
    // Row wins
    if (winningCombination[0] === 0 && winningCombination[2] === 2) return 'winning-line horizontal-line-top';
    if (winningCombination[0] === 3 && winningCombination[2] === 5) return 'winning-line horizontal-line-middle';
    if (winningCombination[0] === 6 && winningCombination[2] === 8) return 'winning-line horizontal-line-bottom';
    
    // Column wins
    if (winningCombination[0] === 0 && winningCombination[2] === 6) return 'winning-line vertical-line-left';
    if (winningCombination[0] === 1 && winningCombination[2] === 7) return 'winning-line vertical-line-middle';
    if (winningCombination[0] === 2 && winningCombination[2] === 8) return 'winning-line vertical-line-right';
    
    // Diagonal wins
    if (winningCombination[0] === 0 && winningCombination[2] === 8) return 'winning-line diagonal-line-main';
    if (winningCombination[0] === 2 && winningCombination[2] === 6) return 'winning-line diagonal-line-counter';
    
    return '';
  };

  return (
    <div className={`max-w-md w-full mx-auto text-center space-y-8 ${gameStartAnimation ? 'animate-fade-in' : ''}`}>
      {/* Game Title */}
      <div className="flex items-center justify-center space-x-3 mb-2">
        <X className="text-amber-500" size={32} />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-copper-500">
          Tic-Tac-Toe
        </h1>
        <Circle className="text-copper-400" size={32} />
      </div>
      
      {/* Game Status */}
      <div className="text-midnight-100 text-xl mt-6">
        {winner ? (
          <div className="animate-fade-in">
            {winner === 'Draw' ? (
              <p>It's a draw!</p>
            ) : (
              <p>
                Player <span className={winner === 'X' ? 'text-amber-400' : 'text-copper-400'}>
                  {winner}
                </span> wins!
              </p>
            )}
          </div>
        ) : (
          <p>
            Player <span className={currentPlayer === 'X' ? 'text-amber-400' : 'text-copper-400'}>
              {currentPlayer}
            </span>'s turn
          </p>
        )}
      </div>
      
      {/* Game Board */}
      <div className="relative mx-auto w-72 h-72 my-10">
        <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full">
          {board.map((cell, index) => (
            <div 
              key={index}
              className={`bg-charcoal-800 rounded-lg shadow-md flex items-center justify-center transition-all duration-300 ${
                hoveredCell === index && !cell && !winner ? 'bg-midnight-800 scale-105 shadow-glow' : ''
              } ${
                winningCombination?.includes(index) ? 'bg-midnight-800 relative z-10' : ''
              }`}
              onClick={() => handleCellClick(index)}
              onMouseEnter={() => setHoveredCell(index)}
              onMouseLeave={() => setHoveredCell(null)}
            >
              {cell === 'X' && (
                <X 
                  className={`${winningCombination?.includes(index) ? 'text-amber-400' : 'text-amber-500'}`} 
                  size={36} 
                />
              )}
              {cell === 'O' && (
                <Circle 
                  className={`${winningCombination?.includes(index) ? 'text-copper-300' : 'text-copper-400'}`} 
                  size={36} 
                />
              )}
              {!cell && hoveredCell === index && !winner && (
                <div className={`opacity-30 ${currentPlayer === 'X' ? 'text-amber-500' : 'text-copper-400'}`}>
                  {currentPlayer === 'X' ? <X size={28} /> : <Circle size={28} />}
                </div>
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
        
        {/* Winning line */}
        {winningCombination && (
          <div className={`${getWinningLineClass()} animate-draw-line`}></div>
        )}
      </div>
      
      {/* Game Controls */}
      <div className="flex justify-center space-x-6 mt-10">
        <button 
          onClick={resetGame}
          className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-charcoal-950 bg-gradient-to-r from-amber-500 to-copper-500 rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-glow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-charcoal-900"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-400 to-copper-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <RotateCcw className="mr-2 relative z-10" size={18} />
          <span className="relative z-10">New Game</span>
        </button>
        
        <button 
          onClick={onBackToHome}
          className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium border border-midnight-600 text-midnight-100 rounded-full overflow-hidden shadow-md transition-all duration-300 hover:bg-midnight-800 hover:text-midnight-50 focus:outline-none focus:ring-2 focus:ring-midnight-500 focus:ring-offset-2 focus:ring-offset-charcoal-900"
        >
          <Home className="mr-2" size={18} />
          <span>Home</span>
        </button>
      </div>
    </div>
  );
}

export default GamePage;