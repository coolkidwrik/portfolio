import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import ProjectVideo from "./projectVideo";
import { primaryButton, secondaryButton, buttonSizes } from "./buttonStyles";
import type { Project, FeaturedInfo } from "../data/projects";

type FeaturedProjectData = Project & { featured: FeaturedInfo };

export const TechTags: React.FC<{ tech: string[]; className?: string }> = ({ tech, className = "" }) => (
  <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
    {tech.map((t) => (
      <li key={t} className="rounded-full bg-[#02a5c5]/15 px-2.5 py-0.5 text-xs font-medium text-[#8fe3f3]">
        {t}
      </li>
    ))}
  </ul>
);

const ProjectLinks: React.FC<{ project: Project; size: "sm" | "md" }> = ({ project, size }) => (
  <div className="flex flex-wrap gap-2">
    {project.liveUrl && (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        // Several cards share the visible text "Live site" / "Code", so each link's
        // accessible name includes the project, e.g. "Travel Blog: live site (opens in new tab)".
        aria-label={`${project.title}: ${(project.liveLabel ?? "Live site").toLowerCase()} (opens in new tab)`}
        className={`${primaryButton} ${buttonSizes[size]}`}
      >
        <FaExternalLinkAlt aria-hidden="true" className="text-[0.8em]" /> {project.liveLabel ?? "Live site"}
      </a>
    )}
    {project.codeUrl && (
      <a
        href={project.codeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title}: code on GitHub (opens in new tab)`}
        className={`${secondaryButton} ${buttonSizes[size]}`}
      >
        <FaGithub aria-hidden="true" /> Code
      </a>
    )}
  </div>
);

/**
 * Projects page: a large row with the clip on one side and the details on the other.
 * `reverse` puts the clip on the right (rows alternate). On small screens the clip
 * always sits on top.
 */
export const FeaturedProjectRow: React.FC<{ project: FeaturedProjectData; reverse?: boolean }> = ({ project, reverse }) => (
  <article className="grid items-center gap-6 lg:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] py-10 border-t border-white/10 first:border-t-0">
    <ProjectVideo
      video={project.featured.video}
      poster={project.featured.poster}
      label={`${project.title} demo`}
      sizes="(min-width: 1024px) 45vw, 100vw"
      className={reverse ? "lg:order-2" : ""}
    />
    <div className="text-left">
      <div className="flex items-baseline gap-3">
        <h3 className="text-2xl sm:text-3xl font-bold text-white">{project.title}</h3>
        <span className="text-sm text-gray-400">{project.date}</span>
      </div>
      <p className="mt-2 text-lg text-gray-200">{project.featured.pitch}</p>
      <TechTags tech={project.tech} className="mt-4" />
      {project.highlights && (
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-gray-300">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <ProjectLinks project={project} size="md" />
      </div>
    </div>
  </article>
);

/** Home page: a compact card (clip on top, pitch, links). */
export const FeaturedProjectCard: React.FC<{ project: FeaturedProjectData }> = ({ project }) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f14] text-left">
    <ProjectVideo
      video={project.featured.video}
      poster={project.featured.poster}
      label={`${project.title} demo`}
      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
      className="rounded-none border-0 border-b border-white/10"
    />
    <div className="flex grow flex-col p-5">
      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
      <p className="mt-2 text-sm text-gray-300 grow">{project.featured.pitch}</p>
      <TechTags tech={project.tech.slice(0, 3)} className="mt-4" />
      <div className="mt-4">
        <ProjectLinks project={project} size="sm" />
      </div>
    </div>
  </article>
);
