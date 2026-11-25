import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import PageTransition from "../utils/pageTransition";
import Footer from "../utils/footer";
import Header from "../utils/header";
import { scrollToAboutMe } from "../utils/scrollToAboutMe";
import HeroLinks from "../utils/heroLinks";
import { FeaturedProjectCard } from "../utils/featuredProject";
import { featuredProjects } from "../data/projects";
import { usePageTitle } from "../utils/usePageTitle";

// The 3D code (Three.js, the scene, the orbs) is loaded on demand instead of being
// part of the site's main JavaScript file. The page's text and buttons render right
// away, and visitors who land on Projects or Experiences never download Three.js.
const OrbButton = lazy(() => import("../utils/OrbButton"));

// Same size as an orb, so nothing shifts while the 3D code is still loading.
const OrbPlaceholder = () => <div style={{ width: "min(20vw, 5rem)", height: "min(20vw, 5rem)" }} />;

// About Me text: a single source of truth for both the desktop and mobile layouts,
// so the two can't drift out of sync again.
const aboutMeIntro =
  "Hey! I'm Wrik—welcome to my portfolio. I'm a fifth-year Computer Science major at the University of British Columbia and currently a software engineer at the Pacific Parkinson's Research Centre.";

const aboutMeParagraphs = [
  aboutMeIntro,
  "I've had the privilege of living in three different countries, meeting incredible people, and immersing myself in diverse cultures. Each experience has shaped who I am today, constantly fueling my curiosity and drive to learn. I thrive on challenges and see them as opportunities to grow, both personally and professionally.",
  "I'm passionate about creating and building—whether it's innovative software solutions, exciting side projects, or artistic expressions. With the world undergoing rapid digital transformation, I'm eager to contribute to meaningful advancements and push the boundaries of technology.",
  "Beyond tech, I love adventure, exploration, and stepping out of my comfort zone. Whether it's hiking new trails, picking up a new language, swimming, or strumming my guitar, I'm always looking for the next thing to discover. If there's something new to learn, you'll find me there, ready to dive in.",
  "Let's connect and create something awesome!",
];

// Shorter version for small screens (same facts, fewer words).
const aboutMeMobileParagraphs = [
  aboutMeIntro,
  "I've lived in three countries, meeting incredible people and immersing myself in diverse cultures. I'm passionate about building innovative software and pushing the boundaries of technology.",
  "Beyond tech, I love adventure—hiking, swimming, learning languages, and playing guitar. Let's connect!",
];

function HomePage() {
  usePageTitle();
    // introCanvas creates its own <canvas> inside this element (see introCanvas.tsx)
    const canvasHostRef = useRef<HTMLDivElement>(null);
    const [showText, setShowText] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 140);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      // Load the 3D scene module, then start it. If the page is left before it
      // finishes loading, `cancelled` stops it from starting on a dead page.
      let cleanup: (() => void) | void;
      let cancelled = false;
      import('../utils/introCanvas').then(({ introCanvas }) => {
        if (!cancelled) cleanup = introCanvas(canvasHostRef);
      });
  
      const timer = setTimeout(() => {
        setShowText(true);
      }, 2000);
  
      return () => {
        cancelled = true;
        window.removeEventListener('scroll', handleScroll);
        if (typeof cleanup === 'function') {
          cleanup();
        }
        clearTimeout(timer);
      };
    }, []);

    // Arriving from another page via the header's "About Me" link:
    // wait for the page transition to finish, then scroll to the section.
    useEffect(() => {
      if (!(location.state as { scrollToAboutMe?: boolean } | null)?.scrollToAboutMe) return;
      const timer = setTimeout(() => {
        scrollToAboutMe();
        // Clear the state so a page refresh doesn't scroll again.
        navigate(location.pathname, { replace: true, state: null });
      }, 900);
      return () => clearTimeout(timer);
    }, [location.state, location.pathname, navigate]);
  
    return (
      <PageTransition>
        <div className="App min-h-screen flex flex-col">
          {/* Container for the canvas */}
          <div className="canvas-container relative flex flex-col items-center justify-center lg:justify-start w-full grow">
            {/* `contents` = no box of its own, so the canvas lays out exactly as before */}
            <div ref={canvasHostRef} className="contents" />
            <Header />
            
            {/*
              Phones + tablets (< 1024px): name and buttons overlaid at the bottom of the
              first screen. It's sized to the first screen (h-[100svh]) rather than the
              container, because on tablets the container also holds the stacked About section.
              pointer-events-none lets touches pass through to the page; the content re-enables them.
            */}
            <div className="lg:hidden absolute inset-x-0 top-0 h-[100svh] z-[2] flex flex-col justify-end items-center text-center px-4 pb-8 pointer-events-none">
              <div className={`animated-text ${showText ? 'show' : ''} text-white pointer-events-auto`}>
                <h1 className='text-[2rem] sm:text-[2.5rem]'>Wrik Steven Sen</h1>
                <h3 className='text-[1.1rem] sm:text-[1.25rem] mt-1'>Software Engineer</h3>
                <HeroLinks size="sm" className="mt-4" />
              </div>
            </div>

            {/*
              Desktop hero.
              - md (768–1023px): photo and About Me stacked and centered below the canvas
                (the name and buttons are in the overlay above on these sizes).
              - lg (1024px+): a grid laid over the canvas (z-[1] keeps it above the canvas): name/title on the first row,
                then photo | About Me side by side. Because this is normal layout (not
                position: absolute), the columns can't overlap, and if the text needs
                more height the hero grows and pushes "More about me" down.
            */}
            <div className="hidden md:flex lg:grid w-full flex-col items-center lg:items-start text-white relative z-[1]
                            lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)] lg:gap-x-[4%] lg:gap-y-2
                            lg:pl-[12%] lg:pr-[10%] lg:pt-[35vh] lg:pb-16">
              {/* Row 1 (lg+ only): name + title + buttons, spanning both columns so the big name never wraps */}
              {/* data-about-me: the header's "About Me" link scrolls here, so the name, photo and text are all in view */}
              <div data-about-me className={`animated-text ${showText ? 'show' : ''} hidden lg:block lg:col-span-2 lg:text-left`}>
                <div className="inline-flex flex-col items-center text-center">
                  <h1 className='text-[2.5rem] lg:text-[4rem] text-white'>Wrik Steven Sen</h1>
                  <h3 className='text-[1.5rem] lg:text-[1.875rem] text-white mt-2'>Software Engineer</h3>
                  <HeroLinks className="mt-5" />
                </div>
              </div>

              {/* Row 2, left: photo. Shrinks with its column, capped at the original 25rem. */}
              {/* data-about-me here too: on tablets the name row is hidden, so "About Me" scrolls to the photo.
                  (On lg+ both are visible and the name row, being first, wins.) */}
              <img
                data-about-me
                src="/profile_pic.webp" width={800} height={887}
                alt="Wrik Steven Sen"
                className={`profile-picture ${isScrolled ? "show" : ""} w-[16rem] lg:w-full lg:max-w-[25rem] h-auto object-cover mt-10 lg:mt-0`}
              />

              {/* Row 2, right: About Me */}
              <div className={`about-me-container-responsive ${isScrolled ? "show" : ""}`}>
                <h2 className="heading">About Me</h2>
                {aboutMeParagraphs.map((text) => (
                  <p key={text} className="content-text">{text}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Content below the canvas */}
          <div className={`content ${isScrolled ? 'transitioned' : ''} p-6 sm:p-8 md:p-12 md:pt-20 md:pb-30 lg:pt-30 lg:pb-20`}>
            
            {/* Mobile: image and about-me shown here */}
            <div data-about-me className="md:hidden flex flex-col items-center text-center mb-10">
              <img src="/profile_pic.webp" width={800} height={887} alt="Wrik Steven Sen" className="w-[16rem] sm:w-[18rem] h-auto object-cover rounded-lg mb-6" />
              <h2 className="heading mb-3">About Me</h2>
              <div className="content-text text-sm sm:text-base leading-relaxed max-w-2xl space-y-2">
                {aboutMeMobileParagraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>

            <h1 className='heading'> More about me</h1>
            <p className='content-text'>Click an orb to learn more.</p>
            <div className="w-full flex justify-evenly items-start p-10">
              <div className="flex flex-col items-center text-center">
                <Suspense fallback={<OrbPlaceholder />}>
                  <OrbButton onClick={() => navigate("/Experiences")} />
                </Suspense>
                <p className="heading mt-2 max-w-[200px]">Experiences</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Suspense fallback={<OrbPlaceholder />}>
                  <OrbButton onClick={() => navigate("/Projects")} lightX={-2.5}/>
                </Suspense>
                <p className="heading mt-2 max-w-[200px]">Projects</p>
              </div>
            </div>
            {/* Featured projects: same data as the Projects page (src/data/projects.ts) */}
            <section aria-labelledby="home-featured-heading" className="mt-20 w-full flex flex-col items-center">
              <h2 id="home-featured-heading" className="heading mb-6 text-center">Featured projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
                {featuredProjects.map((project) => (
                  <FeaturedProjectCard key={project.id} project={project} />
                ))}
              </div>
              <button
                onClick={() => navigate("/Projects")}
                className="mt-8 border-0 bg-transparent text-lg font-medium text-[#02a5c5] hover:text-[#2cc4e2] hover:underline"
              >
                See all projects &rarr;
              </button>
            </section>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  export default HomePage;