import { FaGithub, FaLinkedin, FaFile } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="https://github.com/coolkidwrik" target="_blank" rel="noopener noreferrer">
          <FaGithub className="footer-social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/wrik-sen-2b7b30212/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="footer-social-icon" />
        </a>
        <a href="/your_resume.pdf" target="_blank" rel="noopener noreferrer">
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