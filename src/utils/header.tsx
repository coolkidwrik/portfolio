// src/components/Header.tsx
import { useNavigate, useLocation} from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutMeClick = () => {
    if (location.pathname === "/") {
      // If we're already on the Home page, scroll to the About Me section
      const aboutMeSection = document.querySelector('.about-me-container');
      if (aboutMeSection) {
        aboutMeSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to the Home page first, then scroll to About Me after loading
      navigate("/");
      setTimeout(() => {
        const aboutMeSection = document.querySelector('.about-me-container');
        if (aboutMeSection) {
          aboutMeSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 2000); // Wait for the page to load before scrolling
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-end items-center bg-transparent text-white">
      <nav className="flex gap-8 text-lg font-medium">
        <button onClick={handleAboutMeClick} className="hover:underline transition duration-300 bg-transparent">
          About Me
        </button>
        <button onClick={() => navigate("/Experiences")} className="hover:underline transition duration-300 bg-transparent">
          Experiences
        </button>
        <button onClick={() => navigate("/Projects")} className="hover:underline transition duration-300 bg-transparent">
          Projects
        </button>
      </nav>
    </header>
  );
};

export default Header;
