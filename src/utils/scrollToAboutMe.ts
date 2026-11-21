// The home page renders two "About Me" sections: one for desktop/tablet and one
// for mobile, and only one of them is visible at a time. Both mark where the
// section starts with the data-about-me attribute, so we scroll to whichever
// one is actually on screen.
//
// I don't use element.scrollIntoView() because it puts the element at the very
// top of the window, underneath the fixed header. Instead we scroll so the
// section starts just *below* the header.
const GAP_BELOW_HEADER = 16; // px of breathing room under the header

// Distance from the top of the page, ignoring CSS transforms. (The name block
// slides up 10px as it fades in, and getBoundingClientRect() would include that.)
const pageTop = (el: HTMLElement) => {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
};

export const scrollToAboutMe = () => {
  const sections = document.querySelectorAll<HTMLElement>("[data-about-me]");
  const target = Array.from(sections).find((el) => el.offsetParent !== null);
  if (!target) return;

  // Measured, not hard-coded: the header is taller on mobile (two rows).
  const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;

  window.scrollTo({
    top: Math.max(0, pageTop(target) - headerHeight - GAP_BELOW_HEADER),
    behavior: "smooth",
  });
};