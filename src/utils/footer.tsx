import { FaGithub, FaLinkedin, FaFile } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className=" footer-gradient relative z-50 w-full bg-gradient-to-t from-[#03605a] via-[#000726] to-[#000726] text-white px-8 sm:px-8 md:px-12 lg:px-14 sm:pb-1 md:pb-2 lg:pb-4 sm:pt-18 md:pt-22 lg:pt-24 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm sm:text-base">
      
      {/* Icons */}
      <div className="flex gap-4 sm:gap-6">
        <a href="https://github.com/coolkidwrik" target="_blank" rel="noopener noreferrer" title="GitHub">
          <FaGithub className="text-2xl sm:text-3xl footer-social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/wrik-sen/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <FaLinkedin className="text-2xl sm:text-3xl footer-social-icon" />
        </a>
        <a href="https://drive.google.com/file/d/1_OxySm1I6iB7oaEEthehP60bWe8AbEZ0/view" target="_blank" rel="noopener noreferrer" title="Resume">
          <FaFile className="text-2xl sm:text-3xl footer-social-icon" />
        </a>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6 text-center sm:text-left">
        <a href="mailto:wriksen2003@gmail.com" className="flex items-center gap-2 hover:text-[#02a5c5] transition-colors footer-contact">
          <MdEmail className="text-xl sm:text-2xl footer-social-icon" /> wriksen2003@gmail.com
        </a>
        <a href="tel:+16044172072" className="flex items-center gap-2 hover:text-[#02a5c5] transition-colors footer-contact">
          <MdPhone className="text-xl sm:text-2xl footer-social-icon" /> +1 (604) 417-2072
        </a>
      </div>
    </footer>
  );
};

export default Footer;
