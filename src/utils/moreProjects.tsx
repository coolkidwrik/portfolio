import { FaGithub, FaChevronDown } from "react-icons/fa";
import { TechTags } from "./featuredProject";
import type { Project } from "../data/projects";

// The non-featured projects as a compact grid. Each tile is a native
// <details>/<summary>, so it opens and closes with a click or the keyboard,
// with no extra JavaScript, and screen readers announce it as expandable.
// `items-start` lets an opened tile grow without stretching its neighbours.

const MoreProjects: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
    {projects.map((project) => (
      <details
        key={project.id}
        className="group rounded-xl border border-white/10 bg-[#0b0f14] text-left open:border-[#02a5c5]/60 transition-colors"
      >
        <summary className="flex cursor-pointer list-none items-start justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
          <div>
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="mt-0.5 text-sm text-gray-400">{project.date}</p>
            <TechTags tech={project.tech} className="mt-2" />
          </div>
          <FaChevronDown
            aria-hidden="true"
            className="mt-1.5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
          />
        </summary>
        <div className="px-4 pb-4 text-sm text-gray-300">
          <p>{project.description}</p>
          {project.highlights && (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-[#02a5c5] hover:text-[#2cc4e2] hover:underline"
            >
              <FaGithub aria-hidden="true" /> View code
            </a>
          )}
        </div>
      </details>
    ))}
  </div>
);

export default MoreProjects;
