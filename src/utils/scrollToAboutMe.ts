// The home page renders two "About Me" blocks: one for desktop and one for
// mobile, and only one of them is visible at a time. Both carry the
// data-about-me attribute, so we scroll to whichever one is actually on screen.
export const scrollToAboutMe = () => {
  const sections = document.querySelectorAll<HTMLElement>("[data-about-me]");
  const visible = Array.from(sections).find((el) => el.offsetParent !== null);
  visible?.scrollIntoView({ behavior: "smooth" });
};
