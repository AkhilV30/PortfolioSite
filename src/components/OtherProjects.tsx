import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'MyBlog',
    description: `My personal blog where I share sharp takes on tech, sports, AI, and health. Each post includes a like/dislike feature, view counter, and a comment section for discussion. Clean design, quick reads, and real opinions — all in one place.`,
    status: 'Completed & Live',
    techStack: ['React', 'Weather API', 'Chart.js', 'Tailwind CSS'],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'GuessMyElo',
    description:
      "An ML-powered chess predictor that estimates a player's Elo rating based on a small sequence of opening and mid-game moves. The model analyzes move quality, positional decisions, and tactical patterns to generate a skill rating prediction.",
    status: 'Completed',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'React'],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'ASMR Physics Games',
    description:
      'A set of satisfying physics-based mini games built to feel smooth, responsive, and visually pleasing. Focused on clean motion, realistic collisions, and interactive simulations using Python game development and physics logic.',
    status: 'Completed & Live',
    techStack: ['Python', 'Pygame', 'Physics Simulation', 'Collision Detection'],
    demoUrl: '#',
    codeUrl: '#',
  },
];

const OtherProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-28 px-6 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <div className={`mb-16 h-px bg-zinc-800`} />

        <div ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6 text-zinc-500"
          >
            Other Projects
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 leading-tight text-zinc-100"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            }}
          >
            More I've built.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-sm text-zinc-400"
          >
            A selection of other projects I've worked on.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.22 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OtherProjects;
