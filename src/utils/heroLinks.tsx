import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RESUME_URL, GITHUB_URL, LINKEDIN_URL, EMAIL } from "./links";
import { primaryButton, secondaryButton, buttonSizes } from "./buttonStyles";

// The call-to-action row under the name in the hero.
// Résumé is the primary (filled) action; the rest are secondary (outlined).
// Button styles are shared with the project cards (see buttonStyles.ts).

interface HeroLinksProps {
  /** "sm" for the compact mobile overlay, "md" for tablet/desktop */
  size?: "sm" | "md";
  className?: string;
}

const HeroLinks: React.FC<HeroLinksProps> = ({ size = "md", className = "" }) => {
  const sizing = buttonSizes[size];
  const primary = `${primaryButton} ${sizing}`;
  const secondary = `${secondaryButton} ${sizing}`;

  return (
    <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 ${className}`}>
      <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={primary}>
        <FaFileAlt aria-hidden="true" /> Resume
      </a>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={secondary}>
        <FaGithub aria-hidden="true" /> GitHub
      </a>
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={secondary}>
        <FaLinkedin aria-hidden="true" /> LinkedIn
      </a>
      <a href={`mailto:${EMAIL}`} className={secondary}>
        <MdEmail aria-hidden="true" /> Email
      </a>
    </div>
  );
};

export default HeroLinks;
