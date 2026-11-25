// All project content lives here. The Projects page and the home page's
// "Featured projects" section both read from this file, so they never disagree.
//
// To feature a project: give it a `featured` block (pitch + media). Featured
// projects are shown in the order of FEATURED_ORDER below.

export interface FeaturedInfo {
  /** One sentence: what it is and why it's interesting. Shown on both pages. */
  pitch: string;
  /** Looping clip in /public/media (muted, ~13 s, 1280×720). */
  video: string;
  /** Still image shown before the clip plays, and instead of it for reduced motion. */
  poster: string;
}

export interface Project {
  id: string;
  title: string;
  /** Shown as tags. */
  tech: string[];
  date: string;
  description: string;
  highlights?: string[];
  codeUrl?: string;
  liveUrl?: string;
  /** Button label for liveUrl. Defaults to "Live site". */
  liveLabel?: string;
  featured?: FeaturedInfo;
}

export const projects: Project[] = [
  {
    id: "travel-blog",
    title: "Travel Blog",
    tech: ["Next.js", "TypeScript", "Sanity CMS", "Three.js", "GeoJSON"],
    date: "2026",
    description: "Travel blog website to document my travels.",
    highlights: [
      "Developed a Next.js React frontend with TypeScript and used Sanity as a headless CMS backend.",
      "Using GeoJSON data, Three.js and React Three Fiber, developed 3D interactive globe-based page routing.",
      "Optimized for SEO by creating dynamic sitemaps and metadata.",
      "Improved FCP by maximizing SSR for all page components where possible.",
    ],
    codeUrl: "https://github.com/coolkidwrik/Travel_Blog",
    liveUrl: "https://ckwrik-travel.vercel.app/",
    featured: {
      pitch: "A full-stack travel blog you explore by spinning a 3D globe and clicking a country to open its trip.",
      video: "/media/travel.mp4",
      poster: "/media/travel-poster.webp",
    },
  },
  {
    id: "spotify-stats",
    title: "Spotify Stats",
    tech: ["Next.js", "TypeScript", "Supabase", "Spotify API", "Cron jobs"],
    date: "2026",
    description:
      "A web application that uses the Spotify API to display statistics on my listening habits and provide insights into my music preferences. The application displays various statistics, including top artists, top tracks, and listening history.",
    highlights: [
      "Set up endpoints for a cron job that collects data from the Spotify API every hour.",
      "Designed a relational database on Supabase to store data from the cron job.",
      "Developed the frontend to display data from the Spotify API and Supabase, showing current and comparative statistics.",
    ],
    codeUrl: "https://github.com/coolkidwrik/Spotify_Stats",
    liveUrl: "https://ckwrik-spotify-stats.vercel.app/",
    featured: {
      pitch: "A live dashboard of my listening habits, fed by an hourly data pipeline into a Postgres database.",
      video: "/media/spotify.mp4",
      poster: "/media/spotify-poster.webp",
    },
  },
  {
    id: "shaders",
    title: "Shaders",
    tech: ["GLSL", "Three.js", "JavaScript"],
    date: "2024",
    description: "A variety of shaders coded and applied in GLSL, run on the browser using THREE.js.",
    highlights: [
      "Developed classic shaders from scratch, like Phong/Blinn-Phong and toon (cel), and created shaders of my own design (like diamond and static).",
      "Implemented PBR and IBL for a damaged helmet object.",
    ],
    codeUrl: "https://github.com/coolkidwrik/Shaders",
    liveUrl: "https://wrik-shaders-demo.vercel.app/",
    liveLabel: "Live demo",
    featured: {
      pitch: "Hand-written GLSL shaders, from classic lighting models to physically based rendering, running in the browser.",
      video: "/media/shaders.mp4",
      poster: "/media/shaders-poster.webp",
    },
  },
  {
    id: "exoplanet-vetting",
    title: "Exoplanet Vetting Workshop",
    tech: ["Python"],
    date: "2026",
    description:
      "Code to vet exoplanet candidates from the TESS mission using the transit method. Developed as a workshop for the UBC Astronomy Club for students to learn about exoplanets, the transit method, and various vetting techniques.",
    highlights: [
      "Workshop developed in collaboration with Dr. Michelle Kunimoto, creator of the LEO-Vetter planet-vetting library, who gave a talk on exoplanet detection and vetting to pair with the coding session.",
      "Students download a TESS light curve from NASA's MAST archive and process it with lightkurve (cleaning, binning, flattening, Box Least Squares period search and phase folding), the same steps used in real transit surveys.",
      "Wrote five simulated stars (a planet, two eclipsing binaries, a starspot variable and an instrumental glitch) with batman and NumPy. Students code four vetting tests (size, odd/even depth, secondary eclipse, background), each with tiered hints, then compare their verdicts with LEO-Vetter's.",
    ],
    codeUrl: "https://github.com/UBCAstronomyClub/Exoplanet_Vetting",
  },
  {
    id: "cmb-isolation",
    title: "CMB Isolation",
    tech: ["Python"],
    date: "2026",
    description:
      "Code to simulate sky map data and isolate the Cosmic Microwave Background (CMB) signals from foreground emissions. Developed as a workshop for the UBC Astronomy Club for students to learn about CMB and component separation techniques.",
    highlights: [
      "Using physics models for dust, synchrotron and CMB emissions, generated simulated sky map data at different frequencies.",
      "Applied component separation techniques, in particular, Markov Chain Monte Carlo (MCMC) methods, to estimate best-fit parameters for generating foreground emission maps compared to the simulated data for one pixel.",
      "Used the best-fit parameters to generate foreground emission maps for all pixels using linear algebra, and subtracted these from the simulated data to isolate the CMB signal.",
      "Analyzed Markov Chain results to evaluate the effectiveness of the component separation and foreground removal process, and to understand the uncertainties in the estimated parameters and the resulting CMB maps.",
    ],
    codeUrl: "https://github.com/UBCAstronomyClub/CMB_Isolation",
  },
  {
    id: "thunderbird-south",
    title: "Thunderbird South Image Processing",
    tech: ["Python"],
    date: "2025",
    description:
      "Code to calibrate and process CCD data from UBC's Thunderbird South telescope. Developed as a workshop for the UBC Astronomy Club for students to learn about working with telescope data.",
    highlights: [
      "Used astropy and ccdproc to combine and process dark, flat, and science frames.",
      "Filtered noise from science frames using the processed calibration data to remove hot pixels, vignetting, and dust noise.",
      "Stacked data collected using different Johnson-Morgan system filters to create a color composite of the Lagoon Nebula.",
    ],
    codeUrl: "https://github.com/coolkidwrik/Thunderbird_South_Image_Processing",
  },
  {
    id: "shell",
    title: "SHELL",
    tech: ["ZSH"],
    date: "2024",
    description:
      "This repository contains various projects coded using ZSH that can be run and implemented into the UNIX command line. Here are some notable projects:",
    highlights: [
      "bfc: A compiler for a popular esoteric programming language.",
      "diary: uses openssl to create and maintain a password encrypted document that can be accessed from anywhere on the machine.",
      "todo_list: A working to-do list application with data persistence that runs on the command line.",
    ],
    codeUrl: "https://github.com/coolkidwrik/SHELL",
  },
  {
    id: "solar-system",
    title: "Solar System",
    tech: ["JavaScript", "Three.js", "GLSL"],
    date: "2024",
    description: "Using the THREE.js framework to create a 3D model of the solar system that is rendered on the browser.",
    highlights: [
      "Utilized texture mapping and shadow mapping to create planets and lighting.",
      "Computed orbital mechanics to make the planets orbit the sun.",
      "Wrote shaders in GLSL to create atmospheric glow.",
    ],
    codeUrl: "https://github.com/coolkidwrik/Solar_System",
  },
  {
    id: "snake-game",
    title: "Snake Game",
    tech: ["Rust"],
    date: "2023",
    description: "A snake game coded in Rust using the Piston game engine.",
    codeUrl: "https://github.com/coolkidwrik/Snake_Game-Rust-",
  },
  {
    id: "snasa",
    title: "SNASA",
    tech: ["PHP", "JavaScript", "SQL"],
    date: "2023",
    description:
      "A database of data on stars, planets, star systems, and astronomical entities. Worked in a team of 3 using agile process to complete the project. My contributions included:",
    highlights: [
      "Designed a Relational Database from ER model, to relational, and then SQL DDL.",
      "Normalized Schemas using BCNF to reduce redundant data storage.",
      "Implemented frontend with HTML and JavaScript, and handled Backend SQL requests with PHP.",
    ],
    codeUrl: "https://github.com/coolkidwrik/SNASA",
  },
  {
    id: "complex-numbers",
    title: "Complex Number Calculator",
    tech: ["Python"],
    date: "2023",
    description:
      "Software to perform mathematical operations on complex numbers (addition, multiplication, logarithms, exponentiation, trig, etc) and used numerical approximations for non-elementary functions (gamma, error, and zeta).",
    highlights: [
      "Used OOP concepts to create a complex number class through inheritance.",
      "Derived and programmed all complex definitions for mathematical functions from scratch.",
      "Utilized Python's unit testing module to implement automated testing for each function.",
      "Used Python's Tkinter module to create a calculator graphical user interface.",
    ],
    codeUrl: "https://github.com/coolkidwrik/Complex-Numbers",
  },
  {
    id: "swim-team-organizer",
    title: "Swim Team Organizer",
    tech: ["Java"],
    date: "2022",
    description:
      "Software to manage members of the team: add/remove members, manage captains, record swimmer statistics and swim styles. Developed to assist team coaches in management. Drawing inspiration from my old high school swim team.",
    highlights: [
      "Created both console-based and graphical user interfaces using Java Swing.",
      "Used JSON objects and arrays to implement save and load functionality for data persistence.",
      "Used comparison-based algorithms to recommend swim styles for members.",
      "Calculated and displayed team statistics, dynamically rearranging members as statistics change.",
      "Used JUnit for automated testing of the program's modules.",
    ],
    codeUrl: "https://github.com/coolkidwrik/CPSC-210-project/tree/main/project_t2f7p",
  },
  {
    id: "heart-disease-model",
    title: "Coronary Heart Disease Prediction Model",
    tech: ["R"],
    date: "2022",
    description:
      "A model that helps classify angiographic disease status in patients. The model was developed to try and predict warning signs of the disease through other characteristics in patients.",
    highlights: [
      "Analyzed data for feature selection, identifying best characteristics that correlate to angiographic disease.",
      "Trained model using the k-nearest neighbor classification. Used Cross-validation to tune value for k.",
      "Evaluated the model against held-out test data to measure its overall prediction accuracy.",
    ],
    codeUrl: "https://github.com/coolkidwrik/DSCI_project",
  },
];

/** Featured projects, in display order. */
const FEATURED_ORDER = ["travel-blog", "spotify-stats", "shaders"];

export const featuredProjects = FEATURED_ORDER.map((id) => projects.find((p) => p.id === id)).filter(
  (p): p is Project & { featured: FeaturedInfo } => !!p?.featured,
);

/** Everything else, in the order listed above (newest first). */
export const otherProjects = projects.filter((p) => !FEATURED_ORDER.includes(p.id));
