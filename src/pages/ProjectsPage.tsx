import PageTransition from "../utils/pageTransition";
import Header from "../utils/header";
import Footer from "../utils/footer";
import { FeaturedProjectRow } from "../utils/featuredProject";
import MoreProjects from "../utils/moreProjects";
import { featuredProjects, otherProjects } from "../data/projects";

// Project content lives in src/data/projects.ts (shared with the home page).
const ProjectsPage = () => {
  return (
    <PageTransition>
      <div className="Projects page-content overflow-x-hidden pb-20 sm:pb-24">
        <Header />

        <div className="w-full px-4 sm:px-[10%] mt-[6.5rem] md:mt-[5.5rem] lg:mt-[6rem] text-white">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h1 className="title">Projects</h1>
            <p className="content-text mt-2 max-w-2xl text-gray-300">
              Things I've built, from full-stack web apps to computer graphics and scientific computing.
            </p>
          </div>
        </div>

        <section aria-labelledby="featured-heading" className="w-full px-4 sm:px-[10%] mt-8 text-white">
          <h2 id="featured-heading" className="heading text-left">Featured</h2>
          {featuredProjects.map((project, i) => (
            <FeaturedProjectRow key={project.id} project={project} reverse={i % 2 === 1} />
          ))}
        </section>

        <section aria-labelledby="more-heading" className="w-full px-4 sm:px-[10%] mt-10 text-white">
          <h2 id="more-heading" className="heading text-left">More projects</h2>
          <p className="mb-6 text-left text-gray-400">Click a project to see details.</p>
          <MoreProjects projects={otherProjects} />
        </section>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default ProjectsPage;
