import { useNavigate, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutMeClick = () => {
    if (location.pathname === "/") {
      const aboutMeSection = document.querySelector(".about-me-container");
      if (aboutMeSection) {
        aboutMeSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const aboutMeSection = document.querySelector(".about-me-container");
        if (aboutMeSection) {
          aboutMeSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 2000);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-3 sm:py-4 flex justify-center sm:justify-end items-center bg-transparent text-white backdrop-blur-sm">
      <nav className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-8 text-base sm:text-lg font-medium">
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
      </nav>
    </header>
  );
};

export default Header;
