import { useEffect, useRef , useState} from 'react';
import { useNavigate } from "react-router-dom";
import { introCanvas } from '../utils/introCanvas';
import OrbButton  from '../utils/OrbButton';
import PageTransition from "../utils/pageTransition";
import Footer from "../utils/footer";

function HomePage() {
    const canvasRef = useRef(null);
    const [showText, setShowText] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
  
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 140);
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
              <div className="absolute top-[35%] left-[12%] text-white flex flex-col items-center">
                <div className={`animated-text ${showText ? 'show' : ''} flex flex-col items-center`}>
                  <h1 className='title'>Wrik Steven Sen</h1>
                  <h3 className='subtitle'>Software Engineer</h3>
                  <div className="flex justify-center">
                    <img src="/profile_pic.jpg" alt="Wrik Steven Sen" className={`profile-picture ${isScrolled ? "show" : ""}`} />
                  </div>
                </div>
              </div>
              {/* About Me Text on the Right */}
              <div className={`about-me-container ${isScrolled ? "show" : ""}`}>
                <h2 className="heading">About Me</h2>
                <p className="content-text">
                Hey! I'm Wrik—welcome to my portfolio. I'm a fourth-year Computer Science major at the University of British Columbia and currently a software engineer at Aplicata Technologies. <br />
                I've had the privilege of living in three different countries, meeting incredible people, and immersing myself in diverse cultures. Each experience has shaped who I am today, constantly fueling my curiosity and drive to learn. I thrive on challenges and see them as opportunities to grow, both personally and professionally. <br />
                I’m passionate about creating and building—whether it's innovative software solutions, exciting side projects, or artistic expressions. With the world undergoing rapid digital transformation, I’m eager to contribute to meaningful advancements and push the boundaries of technology. <br />
                Beyond tech, I love adventure, exploration, and stepping out of my comfort zone. Whether it's hiking new trails, picking up a new language, swimming, or strumming my guitar, I’m always looking for the next thing to discover. If there’s something new to learn, you’ll find me there, ready to dive in. <br />
                Let’s connect and create something awesome!
                </p>
              </div>
          </div>

          {/* Content below the canvas */}
          <div className={`content ${isScrolled ? 'transitioned' : ''} p-12 md:pt-30 md:pb-30 lg:pt-40 lg:pb-20`}>
            <h1 className='heading'> Welcome to the Section Below the Canvas</h1>
            <p className='content-text'>This is some content below the Three.js canvas. You can scroll down to see more.</p>
            <OrbButton onClick={() => navigate("/Experiences")} />
            <OrbButton onClick={() => navigate("/Projects")} />
            <OrbButton onClick={() => alert("Orb clicked!")} />
            <OrbButton onClick={() => alert("Orb clicked!")} />
            <OrbButton onClick={() => alert("Orb clicked!")} />
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  export default HomePage;