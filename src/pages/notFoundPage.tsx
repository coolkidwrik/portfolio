import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PageTransition from "../utils/pageTransition";
import Header from "../utils/header";
import Footer from "../utils/footer";
import { usePageTitle } from "../utils/usePageTitle";
import { primaryButton, secondaryButton, buttonSizes } from "../utils/buttonStyles";

// Shown for any URL that doesn't match a page (see the "*" route in App.tsx),
// e.g. a mistyped or outdated link, instead of a blank screen.
//
// Because vercel.json serves index.html for every path, the server still answers
// these URLs with "200 OK". The noindex tag below tells Google not to list them
// as real pages (Google runs JavaScript, so it sees the tag).
const NotFoundPage = () => {
  usePageTitle("Page not found");
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <PageTransition>
      <div className="page-content flex flex-col">
        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          className="outline-none grow flex flex-col items-center justify-center text-center text-white px-6 pt-32 pb-24"
        >
          <p aria-hidden="true" className="text-[6rem] sm:text-[8rem] font-bold leading-none text-[#02a5c5]">
            404
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold">Page not found</h1>
          <p className="mt-4 max-w-xl text-lg text-gray-300">
            There's nothing at <code className="rounded bg-white/10 px-1.5 py-0.5 text-[#8fe3f3] break-all">{pathname}</code>.
            It may have moved, or the link might have a typo.
          </p>
          <nav aria-label="Pages on this site" className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className={`${primaryButton} ${buttonSizes.md}`}>
              Go to home page
            </Link>
            <Link to="/Projects" className={`${secondaryButton} ${buttonSizes.md}`}>
              Projects
            </Link>
            <Link to="/Experiences" className={`${secondaryButton} ${buttonSizes.md}`}>
              Experiences
            </Link>
          </nav>
        </main>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default NotFoundPage;
