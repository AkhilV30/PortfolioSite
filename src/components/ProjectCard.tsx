import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { EASE, useUI } from '../lib/ui';
import type { Project } from '../data/projects';

// Card with a cursor-following glow, border light-up and sliding arrow. Opens the case study.
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { openCase } = useUI();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className="group relative rounded-2xl"
    >
      {/* Border glow that follows the cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(165,180,252,0.45), transparent 45%)' }}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={() => openCase(project.slug)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCase(project.slug); } }}
        aria-label={`Open case study: ${project.title}`}
        className="relative h-full flex flex-col cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-950 p-6 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 transition-transform duration-300 group-hover:-translate-y-1"
      >
        {/* Inner spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.08), transparent 50%)' }}
        />

        <div className="relative flex items-start justify-between gap-4 mb-8">
          <span className="text-xs tabular-nums text-zinc-600">{String(index + 2).padStart(2, '0')}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 overflow-hidden group-hover:border-zinc-600 group-hover:text-zinc-100 transition-colors">
            <span className="relative h-4 w-4">
              <ArrowUpRight className="absolute inset-0 h-4 w-4 transition-all duration-300 group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:opacity-0" />
              <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </span>
          </span>
        </div>

        <h3 className="relative text-lg font-medium text-zinc-100 mb-2 tracking-tight">{project.title}</h3>
        <p className="relative text-sm leading-relaxed text-zinc-400 mb-6 flex-1">{project.tagline}</p>

        <div className="relative flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map(t => (
              <span key={t} className="rounded-full border border-zinc-800 px-2.5 py-0.5 text-[11px] text-zinc-500">{t}</span>
            ))}
          </div>
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              aria-label={`${project.title} on GitHub`}
              className="shrink-0 text-zinc-600 hover:text-zinc-100 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
