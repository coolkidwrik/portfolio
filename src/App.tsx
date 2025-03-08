import { useEffect, useRef , useState} from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";

import { introCanvas } from './utils/introCanvas';
import OrbButton  from './utils/OrbButton';

function App() {
  const canvasRef = useRef(null);
  const [showText, setShowText] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to trigger transition
  const handleScroll = () => {
    if (window.scrollY > 150) { // Trigger when user scrolls past 100px
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const cleanup = introCanvas(canvasRef);
    
    // Trigger text to show after 2 seconds
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (typeof cleanup === 'function') {
        cleanup(); // Call cleanup if it's a function. Cleanup Three.js resources on unmount
      }
      clearTimeout(timer); // Cleanup timer
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* Container for the canvas */}
        <div className="canvas-container">
          <canvas id="threejscanvas" ref={canvasRef} />
          
          {/* Overlay text */}
            <div className="absolute top-[42%] left-[8%] text-white">
              <div className={`animated-text ${showText ? 'show' : ''} flex flex-col items-center`}>
                <h1 className='text-[5rem]'>Wrik Steven Sen</h1>
                <h3 className='text-[2rem]'>Software Engineer</h3>
                <div className="flex justify-center">
                  <img src="/profile_pic.jpg" alt="Wrik Steven Sen" className={`profile-picture ${isScrolled ? 'show' : ''}`} />
                </div>
              </div>
            </div>
        </div>
        <div className={`content ${isScrolled ? 'transitioned' : ''}, pb-20`}>
          <h1>Welcome to the Section Below the Canvas</h1>
          <p>This is some content below the Three.js canvas. You can scroll down to see more.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ipsum vitae lacus tincidunt, vel tincidunt nisi tincidunt.</p>
          <p>More content here...</p>
          <div className="flex justify-center items-center bg-gray-900" style={{ width: '4rem', height: '4rem' }}>
            <OrbButton onClick={() => alert("Orb clicked!")} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;