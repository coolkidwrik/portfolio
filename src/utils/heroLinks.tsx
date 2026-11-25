import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RESUME_URL, GITHUB_URL, LINKEDIN_URL, EMAIL } from "./links";

// The call-to-action row under the name in the hero.
// Résumé is the primary (filled) action; the rest are secondary (outlined).
//
// Every link sets its own text colour for normal *and* hover states, because
// index.css has a global `a:hover { color: ... }` rule that would otherwise win.

interface HeroLinksProps {
  /** "sm" for the compact mobile overlay, "md" for tablet/desktop */
  size?: "sm" | "md";
  className?: string;
}

const HeroLinks: React.FC<HeroLinksProps> = ({ size = "md", className = "" }) => {
  const sizing =
    size === "sm"
      ? "gap-1.5 px-3 py-1.5 text-sm"
      : "gap-2 px-4 py-2 text-base";

  const base =
    `inline-flex items-center rounded-full font-medium transition-colors duration-200 ` +
    `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02a5c5] ${sizing}`;

  // Dark text on the accent colour: white on #02a5c5 is too low-contrast for small text.
  const primary = `${base} bg-[#02a5c5] text-[#00141a] hover:bg-[#2cc4e2] hover:text-[#00141a]`;
  const secondary =
    `${base} border border-white/40 bg-black/30 backdrop-blur-sm text-white ` +
    `hover:border-[#02a5c5] hover:text-[#02a5c5]`;

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
