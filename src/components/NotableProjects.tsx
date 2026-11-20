import ProjectCard from './ProjectCard';
import FeaturedProject from './FeaturedProject';
import { Reveal, SectionHeading } from '../lib/ui';
import { PROJECTS } from '../data/projects';

const MyProjects = () => (
  <section id="projects" className="py-24 sm:py-32 bg-zinc-950 relative">
    <div className="max-w-6xl mx-auto px-5 sm:px-8">
      <SectionHeading eyebrow="Selected work" title="Work that ships." className="mb-14" />

      <FeaturedProject />

      <Reveal as="p" className="text-[11px] font-semibold tracking-[0.24em] uppercase mb-6 text-zinc-500">
        More projects
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default MyProjects;
