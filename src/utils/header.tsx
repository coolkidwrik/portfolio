import { useNavigate, useLocation } from "react-router-dom";
import { scrollToAboutMe } from "./scrollToAboutMe";
import { RESUME_URL } from "./links.ts";

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

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row justify-center sm:justify-end items-center bg-transparent text-white backdrop-blur-sm">
        <span className="mb-2 sm:mb-0 sm:mr-auto text-lg sm:text-xl font-semibold tracking-tight whitespace-nowrap">
          CKWrik&rsquo;s <span className="text-[#02a5c5]">Portfolio</span>
        </span>
      <nav className="flex flex-wrap justify-center sm:justify-end items-center gap-3 sm:gap-8 text-[0.9375rem] sm:text-lg font-medium">
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
        {/* Opens the résumé in a new tab. Accent colour so it stands out from the page links. */}
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#02a5c5] hover:text-[#2cc4e2] hover:underline transition duration-300
                     sm:no-underline sm:hover:no-underline sm:rounded-full sm:border sm:border-[#02a5c5] sm:bg-black/40 sm:px-3 sm:py-0.5 sm:hover:border-[#2cc4e2]"
        >
          Resume
        </a>
      </nav>
    </header>
  );
};

export default Header;
