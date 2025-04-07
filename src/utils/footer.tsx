import { FaGithub, FaLinkedin, FaFile } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="https://github.com/coolkidwrik" target="_blank" rel="noopener noreferrer" title="GitHub">
          <FaGithub className="footer-social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/wrik-sen/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <FaLinkedin className="footer-social-icon" />
        </a>
        <a href="https://drive.google.com/file/d/1_OxySm1I6iB7oaEEthehP60bWe8AbEZ0/view" target="_blank" rel="noopener noreferrer" title="Resume">
          <FaFile className="footer-social-icon" />
        </a>
      </div>

      <div className="footer-right">
        <a href="mailto:wriksen2003@gmail.com" className="footer-contact">
          <MdEmail className="footer-social-icon" /> wriksen2003@gmail.com
        </a>
        <a href="tel:+16044172072" className="footer-contact">
          <MdPhone className="footer-social-icon" /> +1 (604) 417-2072
        </a>
      </div>
    </footer>
  );
};

export default Footer;