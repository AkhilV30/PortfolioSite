import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';

interface OtherProjectsProps {
  isDark: boolean;
}

const OtherProjects = ({ isDark }: OtherProjectsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  const projects = [
    {
      title: 'MyBlog',
      description: `My personal blog where I share sharp takes on tech, sports, AI, and health.
Each post includes a like/dislike feature, view counter, and a comment section for discussion.
Clean design, quick reads, and real opinions — all in one place.`,
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
      className={`py-24 px-6 ${
        isDark
          ? 'bg-gradient-to-b from-black to-zinc-900'
          : 'bg-gradient-to-b from-white to-zinc-50'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
              isDark ? 'from-zinc-300 to-white' : 'from-zinc-600 to-zinc-900'
            }`}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Other Projects
          </motion.h2>

          <motion.p
            className={`max-w-xl mx-auto text-sm leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-zinc-500'
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Modified and enhanced existing projects with significant improvements and customizations
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
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
