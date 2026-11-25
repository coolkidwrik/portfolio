// Shared pill-button styles (hero, project cards). Each sets its own text colour
// for normal *and* hover states, because index.css has a global `a:hover` colour.

const base =
  "inline-flex items-center rounded-full font-medium transition-colors duration-200 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02a5c5]";

export const buttonSizes = {
  sm: "gap-1.5 px-3 py-1.5 text-sm",
  md: "gap-2 px-4 py-2 text-base",
};

// Dark text on the accent colour: white on #02a5c5 is too low-contrast for small text.
export const primaryButton = `${base} bg-[#02a5c5] text-[#00141a] hover:bg-[#2cc4e2] hover:text-[#00141a]`;

export const secondaryButton =
  `${base} border border-white/40 bg-black/30 backdrop-blur-sm text-white ` +
  "hover:border-[#02a5c5] hover:text-[#02a5c5]";
