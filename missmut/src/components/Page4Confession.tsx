import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { TEXTS } from '../constants';

interface Page4ConfessionProps {
  onNext: () => void;
}

const Page4Confession: React.FC<Page4ConfessionProps> = ({ onNext }) => {
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (index < TEXTS.confession.length - 1) {
      const timer = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShowButton(true);
    }
  }, [index]);

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100%', padding: '40px 20px', textAlign: 'center' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', position: 'relative', zIndex: 10 }}>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.5 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           style={{ marginBottom: '30px' }}
        >
          <Heart size={40} fill="#ff8b94" color="#ff8b94" style={{ margin: '0 auto', opacity: 0.6 }} />
        </motion.div>

        <AnimatePresence>
          {TEXTS.confession.slice(0, index + 1).map((text, i) => {
            const isHighlight = i === 0 || i === TEXTS.confession.length - 1;
            
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                style={{
                  fontSize: isHighlight ? '1.4rem' : '1.1rem',
                  fontWeight: '700',
                  color: isHighlight ? '#ff8b94' : 'var(--text-dark)',
                  textAlign: 'center',
                  margin: '10px 0',
                  lineHeight: '1.6',
                  textShadow: '0 2px 4px rgba(255, 255, 255, 0.9)',
                  opacity: i < index ? 0.6 : 1,
                  fontFamily: isHighlight ? "'Quicksand', sans-serif" : "inherit"
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ marginTop: '60px', textAlign: 'center', position: 'relative', zIndex: 10 }}
          >
            <button className="btn-primary" onClick={onNext} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto', padding: '16px 36px', fontSize: '1.1rem', borderRadius: '30px', boxShadow: '0 10px 20px rgba(255, 139, 148, 0.3)' }}>
              Ada satu pertanyaan... <Heart size={22} fill="white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page4Confession;
