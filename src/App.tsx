import { useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";

import { introCanvas } from './utils/introCanvas';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = introCanvas(canvasRef);
    return cleanup; // Cleanup on unmount
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* Container for the canvas */}
        <div className="canvas-container">
          <canvas id="threejscanvas" ref={canvasRef} />
          
          {/* Overlay text */}
          <div className="absolute top-[42%] left-[8%] text-white">
            <h1 className='text-[5rem]'>Wrik Steven Sen</h1>
            <h3 className='text-[2rem]'>Software Engineer</h3>
          </div>
        </div>
        <div className="content">
          <h1>Welcome to the Section Below the Canvas</h1>
          <p>This is some content below the Three.js canvas. You can scroll down to see more.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ipsum vitae lacus tincidunt, vel tincidunt nisi tincidunt.</p>
          <p>More content here...</p>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;