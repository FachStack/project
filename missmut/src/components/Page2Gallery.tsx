import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { TEXTS } from '../constants';
import FloatingPolaroids from './FloatingPolaroids';

interface Page2GalleryProps {
  onNext: () => void;
}

const Page2Gallery: React.FC<Page2GalleryProps> = ({ onNext }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    if (textIndex < TEXTS.page2.intro.length - 1) {
      const timer = setTimeout(() => {
        setTextIndex(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowGallery(true), 1000);
    }
  }, [textIndex]);

  return (
    <div className="page-content" style={{ paddingBottom: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      {showGallery && <FloatingPolaroids />}
      
      <div style={{ padding: '20px 0', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <AnimatePresence>
          {TEXTS.page2.intro.slice(0, textIndex + 1).map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: i === 2 ? '1.5rem' : '1.1rem',
                fontWeight: '700',
                margin: '8px 0',
                color: i === 2 ? '#ff8b94' : 'var(--text-dark)',
                textShadow: '0 2px 4px rgba(255, 255, 255, 0.8)'
              }}
            >
              {text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      {showGallery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ marginTop: '40px', textAlign: 'center', position: 'relative', zIndex: 10 }}
        >
          <button className="btn-primary" onClick={onNext} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
            Ada lagi... <ChevronRight size={18} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Page2Gallery;
