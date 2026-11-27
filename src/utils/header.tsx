import { useNavigate, useLocation } from "react-router-dom";
import { scrollToAboutMe } from "./scrollToAboutMe";
import { RESUME_URL } from "./links";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutMeClick = () => {
    if (location.pathname === "/") {
      scrollToAboutMe();
    } else {
      // HomePage reads this state and scrolls once it has mounted,
      // instead of guessing with a fixed timeout.
      navigate("/", { state: { scrollToAboutMe: true } });
    }
  };

  // "Skip to main content": the first thing keyboard users reach with Tab. It's
  // invisible until focused, then jumps past the header to the page's <main>.
  // (Focusing directly, instead of a #main-content link, keeps the URL clean.)
  const skipToMain = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("main-content")?.focus();
  };

  return (
    <>
    <a
      href="#main-content"
      onClick={skipToMain}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full
                 focus:bg-[#02a5c5] focus:px-4 focus:py-2 focus:font-semibold focus:text-[#00141a] hover:text-[#00141a]"
    >
      Skip to main content
    </a>
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-3 sm:py-4 flex flex-col md:flex-row justify-center md:justify-end items-center bg-transparent text-white backdrop-blur-sm">
        <span className="mb-2 md:mb-0 md:mr-auto text-lg sm:text-xl font-semibold tracking-tight whitespace-nowrap">
          CKWrik&rsquo;s <span className="text-[#02a5c5]">Portfolio</span>
        </span>
      <nav className="flex flex-wrap justify-center md:justify-end items-center gap-3 sm:gap-6 lg:gap-8 text-[0.9375rem] sm:text-base lg:text-lg font-medium">
        <button
          onClick={handleAboutMeClick}
          className="hover:underline transition duration-300 bg-transparent"
        >
          About Me
        </button>
        <button
          onClick={() => navigate("/Experiences")}
          className="hover:underline transition duration-300 bg-transparent"
        >
          Experiences
        </button>
        <button
          onClick={() => navigate("/Projects")}
          className="hover:underline transition duration-300 bg-transparent"
        >
          Projects
        </button>
        {/* Opens the resume in a new tab. Accent colour so it stands out from the page links. */}
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Résumé (opens in new tab)"
          className="text-[#02a5c5] hover:text-[#2cc4e2] hover:underline transition duration-300
                     sm:no-underline sm:hover:no-underline sm:rounded-full sm:border sm:border-[#02a5c5] sm:bg-black/40 sm:px-3 sm:py-0.5 sm:hover:border-[#2cc4e2]"
        >
          Resume
        </a>
      </nav>
    </header>
    </>
  );
};

export default Header;
