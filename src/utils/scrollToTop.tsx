import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// React Router swaps pages without a real page load, so the browser keeps the
// old scroll position. This resets it to the top whenever the route changes.
//
// - Runs in useLayoutEffect (before the browser paints), so you never see the
//   new page flash at the old scroll position.
// - Skips "POP" navigations (the browser's Back/Forward buttons), so going back
//   leaves the browser to restore where you were, as on a normal website.
// - Only acts when the *pathname* actually changes. Same-page navigations (like
//   HomePage clearing its "scroll to About Me" state with a replace) are ignored.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const previousPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (navigationType === "POP") return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;