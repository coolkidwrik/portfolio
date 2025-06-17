// import { useEffect, useRef , useState} from 'react';
// import { useNavigate } from "react-router-dom";
// import { introCanvas } from '../utils/introCanvas';
// import OrbButton  from '../utils/OrbButton';
// import PageTransition from "../utils/pageTransition";
// import Footer from "../utils/footer";
// import Header from "../utils/header";

// function HomePage() {
//     const canvasRef = useRef(null);
//     const [showText, setShowText] = useState(false);
//     const [isScrolled, setIsScrolled] = useState(false);
//     const navigate = useNavigate();
  
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 140);
//     };
  
//     useEffect(() => {
//       window.addEventListener('scroll', handleScroll);
//       const cleanup = introCanvas(canvasRef);
  
//       const timer = setTimeout(() => {
//         setShowText(true);
//       }, 2000);
  
//       return () => {
//         window.removeEventListener('scroll', handleScroll);
//         if (typeof cleanup === 'function') {
//           cleanup();
//         }
//         clearTimeout(timer);
//       };
//     }, []);
  
//     return (
//       <PageTransition>
//         <div className="App">
//           {/* Container for the canvas */}
//           <div className="canvas-container">
//             <canvas id="threejscanvas" ref={canvasRef} />
//             <Header />
            
//             {/* Overlay text */}
//             <div className="absolute top-[35%] left-[12%] text-white flex flex-col items-center">
//               <div className={`animated-text ${showText ? 'show' : ''} flex flex-col items-center`}>
//                 <h1 className='title'>Wrik Steven Sen</h1>
//                 <h3 className='subtitle'>Software Engineer</h3>
//                 <div className="flex justify-center">
//                   <img src="/profile_pic.jpg" alt="Wrik Steven Sen" className={`profile-picture ${isScrolled ? "show" : ""}`} />
//                 </div>
//               </div>
//             </div>
//             {/* About Me Text on the Right */}
//             <div className={`about-me-container ${isScrolled ? "show" : ""}`}>
//               <h2 className="heading">About Me</h2>
//               <p className="content-text">
//               Hey! I'm Wrik—welcome to my portfolio. I'm a fourth-year Computer Science major at the University of British Columbia and currently a software engineer at Aplicata Technologies. <br />
//               I've had the privilege of living in three different countries, meeting incredible people, and immersing myself in diverse cultures. Each experience has shaped who I am today, constantly fueling my curiosity and drive to learn. I thrive on challenges and see them as opportunities to grow, both personally and professionally. <br />
//               I'm passionate about creating and building—whether it's innovative software solutions, exciting side projects, or artistic expressions. With the world undergoing rapid digital transformation, I'm eager to contribute to meaningful advancements and push the boundaries of technology. <br />
//               Beyond tech, I love adventure, exploration, and stepping out of my comfort zone. Whether it's hiking new trails, picking up a new language, swimming, or strumming my guitar, I'm always looking for the next thing to discover. If there's something new to learn, you'll find me there, ready to dive in. <br />
//               Let's connect and create something awesome!
//               </p>
//             </div>
//           </div>

//           {/* Content below the canvas */}
//           <div className={`content ${isScrolled ? 'transitioned' : ''} p-12 md:pt-20 md:pb-30 lg:pt-30 lg:pb-20`}>
//             <h1 className='heading'> More about me</h1>
//             <p className='content-text'>Click on the orbs to learn more about.</p>
//             <div className="w-full flex justify-evenly items-start p-10">
//               <div className="flex flex-col items-center text-center">
//                 <OrbButton onClick={() => navigate("/Experiences")} />
//                 <p className="heading mt-2 max-w-[200px]">Experiences</p>
//               </div>
//               <div className="flex flex-col items-center text-center">
//                 <OrbButton onClick={() => navigate("/Projects")} lightX={-2.5}/>
//                 <p className="heading mt-2 max-w-[200px]">Projects</p>
//               </div>
//             </div>
//           </div>
//           <Footer />
//         </div>
//       </PageTransition>
//     );
//   }

//   export default HomePage;

import { useEffect, useRef , useState} from 'react';
import { useNavigate } from "react-router-dom";
import { introCanvas } from '../utils/introCanvas';
import OrbButton  from '../utils/OrbButton';
import PageTransition from "../utils/pageTransition";
import Footer from "../utils/footer";
import Header from "../utils/header";

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
        <div className="App min-h-screen flex flex-col">
          {/* Container for the canvas */}
          <div className="canvas-container relative flex flex-col items-center justify-center w-full grow">
            <canvas id="threejscanvas" ref={canvasRef} />
            <Header />
            
            {/* Overlay text */}
            <div className="absolute top-[55%] sm:top-[35%] left-0 sm:left-[12%] w-full sm:w-auto transform sm:translate-x-0 text-white flex flex-col items-center sm:items-start text-center sm:text-left px-4">
              <div className={`animated-text ${showText ? 'show' : ''} flex flex-col items-center`}>
                <h1 className='text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] flex text-white'>Wrik Steven Sen</h1>
                <h3 className='text-[1.25rem] sm:text-[1.375rem] md:text-[1.625rem] lg:text-[1.875rem] text-white mt-2'>Software Engineer</h3>
                <div className="flex justify-center sm:justify-start w-full mt-4 sm:mt-2">
                  <img src="/profile_pic.jpg" alt="Wrik Steven Sen" className={`profile-picture ${isScrolled ? "show" : ""} w-[18rem] sm:w-[20rem] md:w-[22.5rem] lg:w-[25rem] h-auto object-cover`} />
                </div>
              </div>
            </div>
            {/* About Me Text on the Right */}
            <div className={`about-me-container ${isScrolled ? "show" : ""}`}>
              <h2 className="heading">About Me</h2>
              <p className="content-text">
              Hey! I'm Wrik—welcome to my portfolio. I'm a fourth-year Computer Science major at the University of British Columbia and currently a software engineer at Aplicata Technologies. <br />
              I've had the privilege of living in three different countries, meeting incredible people, and immersing myself in diverse cultures. Each experience has shaped who I am today, constantly fueling my curiosity and drive to learn. I thrive on challenges and see them as opportunities to grow, both personally and professionally. <br />
              I'm passionate about creating and building—whether it's innovative software solutions, exciting side projects, or artistic expressions. With the world undergoing rapid digital transformation, I'm eager to contribute to meaningful advancements and push the boundaries of technology. <br />
              Beyond tech, I love adventure, exploration, and stepping out of my comfort zone. Whether it's hiking new trails, picking up a new language, swimming, or strumming my guitar, I'm always looking for the next thing to discover. If there's something new to learn, you'll find me there, ready to dive in. <br />
              Let's connect and create something awesome!
              </p>
            </div>
          </div>

          {/* Content below the canvas */}
          <div className={`content ${isScrolled ? 'transitioned' : ''} p-12 md:pt-20 md:pb-30 lg:pt-30 lg:pb-20`}>
            <h1 className='heading'> More about me</h1>
            <p className='content-text'>Click on the orbs to learn more about.</p>
            <div className="w-full flex justify-evenly items-start p-10">
              <div className="flex flex-col items-center text-center">
                <OrbButton onClick={() => navigate("/Experiences")} />
                <p className="heading mt-2 max-w-[200px]">Experiences</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <OrbButton onClick={() => navigate("/Projects")} lightX={-2.5}/>
                <p className="heading mt-2 max-w-[200px]">Projects</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  export default HomePage;