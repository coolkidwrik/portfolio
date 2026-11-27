import { FaGithub, FaLinkedin, FaFile } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { RESUME_URL, GITHUB_URL, LINKEDIN_URL, EMAIL, PHONE_DISPLAY, PHONE_TEL } from "./links";

const Footer = () => {
  return (
    <footer className=" footer-gradient relative z-50 w-full bg-gradient-to-t from-[#03605a] via-[#000726] to-[#000726] text-white px-8 sm:px-8 md:px-12 lg:px-14 sm:pb-1 md:pb-2 lg:pb-4 sm:pt-18 md:pt-22 lg:pt-24 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm sm:text-base">
      
      {/* Icons. Icon-only links need an aria-label so screen readers can announce them
          (the title attribute is just the hover tooltip and isn't announced reliably). */}
      <div className="flex gap-4 sm:gap-6">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub (opens in new tab)">
          <FaGithub aria-hidden="true" className="text-2xl sm:text-3xl footer-social-icon" />
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn (opens in new tab)">
          <FaLinkedin aria-hidden="true" className="text-2xl sm:text-3xl footer-social-icon" />
        </a>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" title="Résumé" aria-label="Résumé (opens in new tab)">
          <FaFile aria-hidden="true" className="text-2xl sm:text-3xl footer-social-icon" />
        </a>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6 text-center sm:text-left">
        <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-[#02a5c5] transition-colors footer-contact">
          <MdEmail aria-hidden="true" className="text-xl sm:text-2xl footer-social-icon" /> {EMAIL}
        </a>
        <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 hover:text-[#02a5c5] transition-colors footer-contact">
          <MdPhone aria-hidden="true" className="text-xl sm:text-2xl footer-social-icon" /> {PHONE_DISPLAY}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
