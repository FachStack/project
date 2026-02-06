import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, HeartOff } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TEXTS } from '../constants';
import FloatingPolaroids from './FloatingPolaroids';

interface Page5FinalProps {
  onFinish: (answer: string, reason?: string) => void;
}

const Page5Final: React.FC<Page5FinalProps> = ({ onFinish }) => {
  const [decision, setDecision] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [showThanks, setShowThanks] = useState(false);
  const [escapeCount, setEscapeCount] = useState(0);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const handleRunaway = () => {
    if (escapeCount < 2) {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      setBtnPos({ x, y });
      setEscapeCount(prev => prev + 1);
    }
  };

  const handleDecision = (choice: string) => {
    setDecision(choice);
    if (choice !== 'Nggak dulu') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff8b94', '#ffd1dc', '#b4e1ff']
      });
      
      // Short delay before finishing to let confetti fly
      setTimeout(() => {
        onFinish(choice);
        setShowThanks(true);
      }, 800);
    }
  };

  const handleSubmitReason = () => {
    if (reason.trim()) {
      onFinish('Nggak dulu', reason);
      setShowThanks(true);
    }
  };

  if (showThanks) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: 'center', padding: '40px 20px', position: 'relative', zIndex: 10 }}
      >
        <Heart size={60} fill="#ff8b94" color="#ff8b94" style={{ marginBottom: '20px' }} />
        <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{TEXTS.final.thanks}</p>
      </motion.div>
    );
  }

  return (
    <div className="page-content" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100%' }}>
      <FloatingPolaroids />
      
      <AnimatePresence mode="wait">
        {!decision || (decision !== 'Nggak dulu' && !showThanks) ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ position: 'relative', zIndex: 10, padding: '0 10px' }}
          >
            <p style={{ fontSize: '1.15rem', whiteSpace: 'pre-line', marginBottom: '40px', fontWeight: '700', textShadow: '0 2px 4px rgba(255, 255, 255, 0.9)' }}>
              {TEXTS.final.question}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button 
                className="btn-primary" 
                onClick={() => handleDecision('Mau 💖')}
                disabled={decision === 'Mau 💖'}
              >
                {decision === 'Mau 💖' ? 'Mengirim... 💖' : 'Mau 💖'}
              </button>
              <motion.button
                animate={{ x: btnPos.x, y: btnPos.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={handleRunaway}
                onTapStart={handleRunaway}
                className="btn-outline"
                onClick={() => {
                  if (escapeCount < 2) {
                     handleRunaway();
                  } else {
                     handleDecision('Nggak dulu');
                  }
                }}
                style={{ backgroundColor: 'rgba(255,255,255,0.8)', position: 'relative' }}
              >
                Nggak dulu
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reason"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ position: 'relative', zIndex: 10, padding: '0 10px' }}
          >
            <div style={{ marginBottom: '30px' }}>
              <HeartOff size={40} color="#6b6b6b" style={{ marginBottom: '20px' }} />
              <p style={{ fontSize: '1.1rem', whiteSpace: 'pre-line', marginBottom: '20px', fontWeight: '700', textShadow: '0 2px 4px rgba(255, 255, 255, 0.9)' }}>
                {TEXTS.final.reasonsTitle}
              </p>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={TEXTS.final.placeholder}
                style={{
                  width: '100%',
                  height: '120px',
                  padding: '15px',
                  borderRadius: '15px',
                  border: '2px solid var(--pastel-pink)',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'none',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }}
              />
            </div>
            <button
              className="btn-primary"
              disabled={!reason.trim()}
              onClick={handleSubmitReason}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto', opacity: reason.trim() ? 1 : 0.5 }}
            >
              Kirim <Send size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page5Final;
