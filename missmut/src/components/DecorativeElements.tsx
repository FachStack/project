import React from 'react';
import { motion } from 'framer-motion';

const DecorativeElements: React.FC = () => {
  const hearts = Array.from({ length: 15 });
  const sparkles = Array.from({ length: 10 });

  return (
    <div className="bg-image-container">
      {/* Floating Hearts */}
      {hearts.map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          initial={{ 
            opacity: 0, 
            scale: 0.5,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100
          }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
            y: -100,
            x: (Math.random() - 0.5) * 100 + (Math.random() * window.innerWidth)
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            fontSize: `${Math.random() * 20 + 10}px`,
            pointerEvents: 'none',
            zIndex: 2,
            filter: 'blur(1px)'
          }}
        >
          {['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      {/* Twinkling Sparkles */}
      {sparkles.map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ 
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{ 
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 10,
          }}
          style={{
            position: 'absolute',
            fontSize: `${Math.random() * 10 + 5}px`,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

export default DecorativeElements;
