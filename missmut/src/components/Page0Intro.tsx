import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { TEXTS } from '../constants';

interface Page0IntroProps {
  onNext: () => void;
}

const Page0Intro: React.FC<Page0IntroProps> = ({ onNext }) => {
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (index < TEXTS.page0.length - 1) {
      const timer = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowButton(true);
    }
  }, [index]);

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
      <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '25px', justifyContent: 'center', padding: '0 20px' }}>
        <AnimatePresence>
          {TEXTS.page0.slice(0, index + 1).map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              style={{
                fontSize: i === 0 ? '2rem' : '1.3rem',
                fontWeight: '700',
                color: 'var(--text-dark)',
                margin: '10px 0',
                textShadow: '0 2px 4px rgba(255, 255, 255, 0.8)',
                fontStyle: 'italic'
              }}
            >
              {text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '50px' }}
          >
            <button className="btn-primary" onClick={onNext} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto', padding: '15px 30px' }}>
              Dengerin ya... <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page0Intro;
