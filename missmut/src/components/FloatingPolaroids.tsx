import React from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../constants';

const FloatingPolaroids: React.FC = () => {
  // Use a subset of photos for decoration
  const decorativePhotos = CONFIG.photos.slice(0, 4);
  
  const positions = [
    { top: '10%', left: '-20px', rotation: '-15deg', delay: 0 },
    { top: '60%', left: '75%', rotation: '12deg', delay: 1 },
    { top: '80%', left: '10%', rotation: '-8deg', delay: 2 },
    { top: '20%', left: '70%', rotation: '10deg', delay: 1.5 },
  ];

  return (
    <div className="polaroid-bg-container">
      {decorativePhotos.map((photo, i) => (
        <motion.div
          key={i}
          className="polaroid floating"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 0.4, scale: 0.8, y: 0 }}
          transition={{ 
            duration: 1.5, 
            delay: positions[i % positions.length].delay,
            ease: "easeOut" 
          }}
          style={{
            top: positions[i % positions.length].top,
            left: positions[i % positions.length].left,
            '--rotation': positions[i % positions.length].rotation,
          } as React.CSSProperties}
        >
          <img src={photo} alt="memory" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPolaroids;
