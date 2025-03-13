import { useEffect, useRef , useState} from 'react';
import { useNavigate } from "react-router-dom";
import { introCanvas } from '../utils/introCanvas';
import OrbButton  from '../utils/OrbButton';
import PageTransition from "../utils/pageTransition";

function HomePage() {
    const canvasRef = useRef(null);
    const [showText, setShowText] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
  
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      const cleanup = introCanvas(canvasRef);
  
      const timer = setTimeout(() => {
        setShowText(true);
      }, 2000);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (typeof cleanup === 'function') {
          cleanup();
        }
        clearTimeout(timer);
      };
    }, []);
  
    return (
      <PageTransition>
        <div className="App">
          {/* Container for the canvas */}
          <div className="canvas-container">
            <canvas id="threejscanvas" ref={canvasRef} />
            
            {/* Overlay text */}
              <div className="absolute top-[42%] left-[8%] text-white flex flex-col items-center">
                <div className={`animated-text ${showText ? 'show' : ''} flex flex-col items-center`}>
                <h1 className='text-[5rem]'>Wrik Steven Sen</h1>
                <h3 className='text-[2rem]'>Software Engineer</h3>
                <div className="flex justify-center">
                  <img src="/profile_pic.jpg" alt="Wrik Steven Sen" className={`profile-picture ${isScrolled ? 'show' : ''}`} />
                </div>
                </div>
              </div>
          </div>
          <div className={`content ${isScrolled ? 'transitioned' : ''} p-12 md:pt-30 md:pb-30 lg:pt-40 lg:pb-20`}>
            <h1>Welcome to the Section Below the Canvas</h1>
            <p>This is some content below the Three.js canvas. You can scroll down to see more.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ipsum vitae lacus tincidunt, vel tincidunt nisi tincidunt.</p>
            <p>More content here...</p>
            <OrbButton onClick={() => navigate("/Experiences")} />
            <OrbButton onClick={() => navigate("/Projects")} />
            <OrbButton onClick={() => alert("Orb clicked!")} />
            <OrbButton onClick={() => alert("Orb clicked!")} />
            <OrbButton onClick={() => alert("Orb clicked!")} />
          </div>
        </div>
      </PageTransition>
    );
  }

  export default HomePage;