import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { TEXTS } from '../constants';
import FloatingPolaroids from './FloatingPolaroids';

interface Page1StartProps {
  onNext: () => void;
}

const Page1Start: React.FC<Page1StartProps> = ({ onNext }) => {
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (index < TEXTS.page1.length - 1) {
      const timer = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, 2200);
      return () => clearTimeout(timer);
    } else {
      setShowButton(true);
    }
  }, [index]);

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
      <FloatingPolaroids />
      
      <div style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center', padding: '0 10px', position: 'relative', zIndex: 10 }}>
        <AnimatePresence>
          {TEXTS.page1.slice(0, index + 1).map((text, i) => {
            const isHighlight = i === TEXTS.page1.length - 1;
            
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  fontSize: isHighlight ? '1.4rem' : '1.15rem',
                  fontWeight: '700',
                  color: isHighlight ? '#ff8b94' : 'var(--text-dark)',
                  margin: '8px 0',
                  textShadow: '0 2px 4px rgba(255, 255, 255, 0.9)',
                  opacity: i < index ? 0.7 : 1, // Focus on current text
                }}
              >
                {text}
              </motion.p>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '40px', position: 'relative', zIndex: 10 }}
          >
            <button className="btn-primary" onClick={onNext} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
              Buka ceritanya <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page1Start;
