import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

// A looping, muted project clip that behaves well on a portfolio page:
// - Shows the poster image first; the clip fades in over it once it actually plays.
// - Only downloads and plays while it's on screen (IntersectionObserver), and pauses
//   when scrolled away, so three clips don't all play (and download) at once.
// - Has a pause/play button. Motion that runs longer than 5 seconds needs a way to
//   stop it (WCAG 2.2.2), and a paused clip stays paused when you scroll back.
// - Visitors with "reduce motion" turned on get just the poster, no video.

interface ProjectVideoProps {
  video: string;
  poster: string;
  /** Describes the clip for screen readers, e.g. "Travel Blog demo". */
  label: string;
  className?: string;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ProjectVideo: React.FC<ProjectVideoProps> = ({ video, poster, label, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion] = useState(prefersReducedMotion);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const userPausedRef = useRef(false); // read inside the observer without re-subscribing

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const el = videoRef.current;
    if (!container || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPausedRef.current) {
          // play() returns a promise that rejects if the browser blocks autoplay; that's fine,
          // the poster stays visible and the play button still works.
          el.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          el.pause();
        }
      },
      { threshold: 0.4 }, // "on screen" = at least 40% visible
    );
    observer.observe(container);
    return () => {
      observer.disconnect();
      el.pause();
    };
  }, [reducedMotion]);

  const togglePlayback = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      userPausedRef.current = false;
      setUserPaused(false);
      el.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      setUserPaused(true);
      el.pause();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black ${className}`}
    >
      <img
        src={poster}
        alt={`${label} (screenshot)`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {!reducedMotion && (
        <>
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            preload="none" // nothing downloads until it scrolls into view
            aria-label={label}
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              isPlaying || userPaused ? "opacity-100" : "opacity-0"
            }`}
          />
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
            className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full
                       border border-white/30 bg-black/60 p-0 text-white text-xs
                       hover:border-[#02a5c5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#02a5c5]"
          >
            {isPlaying ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" className="ml-0.5" />}
          </button>
        </>
      )}
    </div>
  );
};

export default ProjectVideo;
