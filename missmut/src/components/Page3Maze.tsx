import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { TEXTS } from '../constants';

interface Page3MazeProps {
  onComplete: () => void;
}

const MAZE_GRID = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 1, 0, 1, 0],
  [1, 1, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
];

const START = { x: 0, y: 0 };
const GOAL = { x: 9, y: 9 };

const Page3Maze: React.FC<Page3MazeProps> = ({ onComplete }) => {
  const [pos, setPos] = useState(START);
  const [messageIndex, setMessageIndex] = useState(-1);
  const [visited, setVisited] = useState<string[]>([]);

  const move = useCallback((dx: number, dy: number) => {
    const newX = pos.x + dx;
    const newY = pos.y + dy;

    if (
      newX >= 0 && newX < 10 &&
      newY >= 0 && newY < 10 &&
      MAZE_GRID[newY][newX] === 0
    ) {
      setPos({ x: newX, y: newY });
      setVisited(prev => [...prev, `${newX}-${newY}`]);

      // Show messages based on progress
      const progress = newX + newY;
      if (progress > 2 && messageIndex < 0) setMessageIndex(0);
      if (progress > 6 && messageIndex < 1) setMessageIndex(1);
      if (progress > 10 && messageIndex < 2) setMessageIndex(2);
      if (progress > 14 && messageIndex < 3) setMessageIndex(3);
      if (progress > 16 && messageIndex < 4) setMessageIndex(4);

      if (newX === GOAL.x && newY === GOAL.y) {
        setTimeout(onComplete, 1500);
      }
    }
  }, [pos, messageIndex, onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') move(0, -1);
      if (e.key === 'ArrowDown') move(0, 1);
      if (e.key === 'ArrowLeft') move(-1, 0);
      if (e.key === 'ArrowRight') move(1, 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  return (
    <div className="page-content" style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#ff4d6d', fontWeight: 'bold', textShadow: '0 0 10px rgba(255, 77, 109, 0.3)' }}>Temuin "Dias" ya... 💖</h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        {TEXTS.maze.controls}
      </p>

      <div style={{ height: '60px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {messageIndex >= 0 && (
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="maze-message"
              style={{ fontSize: '1.3rem', color: '#d63384', fontWeight: '800', textShadow: '0 2px 4px rgba(255, 255, 255, 1)' }}
            >
              "{TEXTS.maze.messages[messageIndex]}"
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="maze-container">
        {MAZE_GRID.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`maze-cell ${cell === 1 ? 'maze-wall' : ''} ${x === GOAL.x && y === GOAL.y ? 'maze-goal' : ''}`}
              style={{ position: 'relative' }}
            >
              {visited.includes(`${x}-${y}`) && !(x === pos.x && y === pos.y) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#ff8b94', fontSize: '0.5rem' }}
                >
                  ❤️
                </motion.div>
              )}
              {x === pos.x && y === pos.y && (
                <motion.div layoutId="player" className="maze-player" transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                  <Heart size={20} fill="#ff8b94" color="#ff8b94" />
                </motion.div>
              )}
              {x === START.x && y === START.y && x !== pos.x && y !== pos.y && (
                <span style={{ fontSize: '0.55rem', fontWeight: 'bold' }}>Fachrul</span>
              )}
              {x === GOAL.x && y === GOAL.y && (x !== pos.x || y !== pos.y) && (
                <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Dias</span>
              )}
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', maxWidth: '180px', margin: '30px auto' }}>
        <div />
        <button onClick={() => move(0, -1)} style={{ padding: '15px' }}><ArrowUp size={20} /></button>
        <div />
        <button onClick={() => move(-1, 0)} style={{ padding: '15px' }}><ArrowLeft size={20} /></button>
        <button onClick={() => move(0, 1)} style={{ padding: '15px' }}><ArrowDown size={20} /></button>
        <button onClick={() => move(1, 0)} style={{ padding: '15px' }}><ArrowRight size={20} /></button>
      </div>
    </div>
  );
};

export default Page3Maze;
