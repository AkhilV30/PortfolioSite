import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowUpRight, Github, X } from 'lucide-react';
import { EASE, useUI } from '../lib/ui';
import { ALL_PROJECTS } from '../data/projects';
import { Pipeline } from './FeaturedProject';

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-zinc-500 mb-4">{children}</p>
);

const CaseStudy = () => {
  const { caseSlug, openCase } = useUI();
  const project = ALL_PROJECTS.find(p => p.slug === caseSlug) ?? null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    scrollRef.current?.scrollTo({ top: 0 });
    setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') openCase(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, openCase]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md" onClick={() => openCase(null)} />

          <motion.div
            ref={scrollRef}
            className="absolute inset-0 sm:inset-x-4 sm:top-6 sm:bottom-0 md:inset-x-10 lg:inset-x-[max(2.5rem,calc((100vw-64rem)/2))] overflow-y-auto overscroll-contain sm:rounded-t-3xl border-t sm:border border-zinc-800 bg-zinc-950"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {/* Header bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-10 h-16 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
              <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-zinc-500 truncate">Case study</p>
              <button
                ref={closeRef}
                onClick={() => openCase(null)}
                aria-label="Close case study"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-5 sm:px-10 py-12 sm:py-16 max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="text-zinc-100 leading-none mb-5"
                style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.25rem, 7vw, 4rem)' }}
              >
                {project.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
                className="text-lg sm:text-xl text-zinc-300 leading-snug mb-8"
                style={{ fontWeight: 300 }}
              >
                {project.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.26 }}
                className="flex flex-wrap gap-3 mb-14"
              >
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-zinc-100 text-zinc-900 hover:bg-white transition-colors">
                    Visit live site <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {project.codeUrl && (
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors">
                    <Github className="h-4 w-4" /> View code
                  </a>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
                className="space-y-14"
              >
                <section>
                  <Label>Overview</Label>
                  <p className="text-base leading-[1.85] text-zinc-400">{project.summary}</p>
                </section>

                <section>
                  <Label>The problem</Label>
                  <p className="text-base leading-[1.85] text-zinc-400">{project.problem}</p>
                </section>

                <section>
                  <Label>What I built</Label>
                  <ol className="space-y-4">
                    {project.built.map((b, i) => (
                      <li key={i} className="flex gap-4 text-base leading-[1.75] text-zinc-300">
                        <span className="mt-1 text-xs tabular-nums text-zinc-600 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                {project.slug === 'sourced-ai' && (
                  <section>
                    <Label>Architecture</Label>
                    <div className="-mt-6">
                      <Pipeline active />
                    </div>
                  </section>
                )}

                <section>
                  <Label>Stack</Label>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(t => (
                      <span key={t} className="rounded-full border border-zinc-800 px-3 py-1 text-sm text-zinc-400">{t}</span>
                    ))}
                  </div>
                </section>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaseStudy;
