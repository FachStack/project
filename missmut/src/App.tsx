import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from './constants';
import AudioPlayer from './components/AudioPlayer';
import Page0Intro from './components/Page0Intro';
import Page1Start from './components/Page1Start';
import Page2Gallery from './components/Page2Gallery';
import Page3Maze from './components/Page3Maze';
import Page4Confession from './components/Page4Confession';
import Page5Final from './components/Page5Final';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0); // Start at Page 0
  const [isPlaying, setIsPlaying] = useState(false);
  const [bgImage, setBgImage] = useState<string | null>(CONFIG.photos[0]);

  const nextPage = () => {
    const next = currentPage + 1;
    setCurrentPage(next);
    
    // Set background image for specific pages
    // Now pages are 0, 1, 2, 3 (Maze), 4 (Confession), 5 (Final)
    if (next === 0 || next === 1 || next === 2 || next === 4) {
      const randomPhoto = CONFIG.photos[Math.floor(Math.random() * CONFIG.photos.length)];
      setBgImage(randomPhoto);
    } else {
      setBgImage(null);
    }

    // Trigger music on first interaction (moving from page 0 to 1)
    if (currentPage === 0 && !isPlaying) {
      setIsPlaying(true);
    }
  };

  const handleMazeComplete = () => {
    setIsPlaying(true);
    nextPage();
  };

  const handleFinish = (answer: string, reason?: string) => {
    const timestamp = new Date().toLocaleString('id-ID');
    let message = `Jawaban dari web kamu:
Pilihan: ${answer}
Waktu: ${timestamp}`;

    if (reason) {
      message += `\nAlasan: ${reason}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.phoneNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 2000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <Page0Intro key="page0" onNext={nextPage} />;
      case 1:
        return <Page1Start key="page1" onNext={nextPage} />;
      case 2:
        return <Page2Gallery key="page2" onNext={nextPage} />;
      case 3:
        return <Page3Maze key="page3" onComplete={handleMazeComplete} />;
      case 4:
        return <Page4Confession key="page4" onNext={nextPage} />;
      case 5:
        return <Page5Final key="page5" onFinish={handleFinish} />;
      default:
        return <Page0Intro key="page0" onNext={nextPage} />;
    }
  };

  return (
    <>
      <div className="bg-image-container">
        <AnimatePresence>
          {bgImage && (
            <motion.div
              key={bgImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="bg-image-container"
            >
              <img src={bgImage} className="bg-image" alt="background" />
              <div className="bg-overlay" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="app-container" onClick={() => !isPlaying && setIsPlaying(true)}>
        <AudioPlayer 
          isPlaying={isPlaying} 
          onToggle={() => setIsPlaying(!isPlaying)} 
        />
        
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', zIndex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer style={{ textAlign: 'center', padding: '20px 0', fontSize: '0.8rem', color: 'var(--text-muted)', zIndex: 1 }}>
          Dibuat dengan ❤️ buat Dias
        </footer>
      </div>
    </>
  );
};

export default App;
