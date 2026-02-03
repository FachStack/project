import React from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../constants';

const FloatingPolaroids: React.FC = () => {
  // Use more photos for a richer vibe
  const decorativePhotos = [...CONFIG.photos].sort(() => 0.5 - Math.random()).slice(0, 6);
  
  const positions = [
    { top: '5%', left: '-30px', rotation: '-15deg', delay: 0, class: 'floating-1' },
    { top: '15%', left: '80%', rotation: '12deg', delay: 1, class: 'floating-2' },
    { top: '45%', left: '-40px', rotation: '-8deg', delay: 2, class: 'floating-3' },
    { top: '55%', left: '75%', rotation: '10deg', delay: 1.5, class: 'floating-1' },
    { top: '80%', left: '10%', rotation: '15deg', delay: 3, class: 'floating-2' },
    { top: '85%', left: '60%', rotation: '-12deg', delay: 2.5, class: 'floating-3' },
  ];

  return (
    <div className="polaroid-bg-container">
      {decorativePhotos.map((photo, i) => {
        const pos = positions[i % positions.length];
        return (
          <motion.div
            key={i}
            className={`polaroid ${pos.class}`}
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 0.35, scale: 0.75, y: 0 }}
            transition={{ 
              duration: 2, 
              delay: pos.delay,
              ease: "easeOut" 
            }}
            style={{
              top: pos.top,
              left: pos.left,
              '--rotation': pos.rotation,
            } as React.CSSProperties}
          >
            <img src={photo} alt="memory" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingPolaroids;
