import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';

interface OtherProjectsProps {
  isDark: boolean;
}

const OtherProjects = ({ isDark }: OtherProjectsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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

  return (
    <section
      className={`py-28 px-6 ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section rule */}
        <div className={`mb-16 h-px ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />

        {/* Header */}
        <div ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`text-xs font-semibold tracking-[0.2em] uppercase mb-6 ${
              isDark ? 'text-zinc-500' : 'text-zinc-400'
            }`}
          >
            Other Projects
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`mb-4 leading-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            }}
          >
            More I've built.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className={`mb-12 text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}
          >
            Modified and enhanced existing projects with significant improvements.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.24 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} isDark={isDark} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OtherProjects;
