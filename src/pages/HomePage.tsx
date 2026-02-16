import { useEffect, useRef , useState} from 'react';
import { useNavigate } from "react-router-dom";
import { introCanvas } from '../utils/introCanvas';
import OrbButton  from '../utils/OrbButton';
import PageTransition from "../utils/pageTransition";
import Footer from "../utils/footer";
import Header from "../utils/header";

const externalLinks = [
  {
    title: "Travel Blog",
    description: "Stories, photography, and experiences from around the world.",
    url: "https://ckwrik-travel.vercel.app/"
  },
  {
    title: "Computer Graphics Shaders Demo",
    description: "Interactive web demo showcasing custom GLSL shaders built with Three.js.",
    url: "https://wrik-shaders-demo.vercel.app/"
  },
];

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
            
            {/* Mobile/tablet: only name overlay at bottom of canvas */}
            <div className="md:hidden absolute inset-x-0 bottom-8 flex flex-col items-center text-center px-4">
              <div className={`animated-text ${showText ? 'show' : ''} text-white`}>
                <h1 className='text-[2rem] sm:text-[2.5rem]'>Wrik Steven Sen</h1>
                <h3 className='text-[1.1rem] sm:text-[1.25rem] mt-1'>Software Engineer</h3>
              </div>
            </div>

            {/* Desktop: stacked at md, side-by-side at lg */}
            <div className="hidden md:flex lg:block lg:absolute lg:top-[35%] lg:left-[12%] flex-col items-center text-center lg:text-left lg:w-auto w-full px-4 lg:px-0 pt-8 lg:pt-0 text-white">
              <div className={`animated-text ${showText ? 'show' : ''} flex flex-col items-center`}>
                <h1 className='text-[2.5rem] lg:text-[4rem] flex text-white'>Wrik Steven Sen</h1>
                <h3 className='text-[1.5rem] lg:text-[1.875rem] text-white mt-2'>Software Engineer</h3>
                <div className="flex justify-center lg:justify-start w-full mt-2">
                  <img src="/profile_pic.jpg" alt="Wrik Steven Sen" className={`profile-picture ${isScrolled ? "show" : ""} w-[16rem] lg:w-[25rem] h-auto object-cover`} />
                </div>
              </div>
            </div>
            {/* About Me Text (stacked at md, side-by-side at lg) */}
            <div className={`about-me-container-responsive hidden md:block ${isScrolled ? "show" : ""}`}>
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
          <div className={`content ${isScrolled ? 'transitioned' : ''} p-6 sm:p-8 md:p-12 md:pt-20 md:pb-30 lg:pt-30 lg:pb-20`}>
            
            {/* Mobile: image and about-me shown here */}
            <div className="md:hidden flex flex-col items-center text-center mb-10">
              <img src="/profile_pic.jpg" alt="Wrik Steven Sen" className="w-[16rem] sm:w-[18rem] h-auto object-cover rounded-lg mb-6" />
              <h2 className="heading mb-3">About Me</h2>
              <p className="content-text text-sm sm:text-base leading-relaxed max-w-2xl">
                Hey! I'm Wrik—welcome to my portfolio. I'm a fourth-year Computer Science major at UBC and a software engineer at Aplicata Technologies.
                I've lived in three countries, meeting incredible people and immersing myself in diverse cultures. I'm passionate about building innovative software and pushing the boundaries of technology.
                Beyond tech, I love adventure—hiking, swimming, learning languages, and playing guitar. Let's connect!
              </p>
            </div>

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
            <div className="mt-20 w-full flex flex-col items-center">
              <h2 className="heading mb-6 text-center">Find Me Elsewhere</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
              {externalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#111] border border-gray-800 rounded-2xl p-6 
                            hover:border-blue-500 hover:shadow-lg 
                            hover:shadow-blue-500/20 
                            transition-all duration-300 
                            group"
                >
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-400 mt-2 text-sm">
                    {link.description}
                  </p>
                </a>
              ))}
            </div>
            </div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  export default HomePage;