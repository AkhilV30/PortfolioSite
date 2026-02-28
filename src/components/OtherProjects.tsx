import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface OtherProjectsProps {
  isDark: boolean;
}

const OtherProjects = ({ isDark }: OtherProjectsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  const projects = [
    {
      title: "MyBlog",
      description: `My personal blog where I share sharp takes on tech, sports, AI, and health.
Each post includes a like/dislike feature, view counter, and a comment section for discussion.
Clean design, quick reads, and real opinions — all in one place.`,
      status: "Completed & Live",
      statusColor: "bg-green-500 text-black",
      techStack: ["React", "Weather API", "Chart.js", "Tailwind CSS"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      title: "GuessMyElo",
      description: "An ML-powered chess predictor that estimates a player's Elo rating based on a small sequence of opening and mid-game moves. The model analyzes move quality, positional decisions, and tactical patterns to generate a skill rating prediction.",
      status: "Completed",
      statusColor: "bg-green-500 text-black",
      techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "React"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      title: "ASMR Physics Games",
      description: "A set of satisfying physics-based mini games built to feel smooth, responsive, and visually pleasing. Focused on clean motion, realistic collisions, and interactive simulations using Python game development and physics logic.",
      status: "Completed & Live",
      statusColor: "bg-green-500 text-black",
      techStack: ["Python", "Pygame", "Physics Simulation", "Collision Detection"],
      demoUrl: "#",
      codeUrl: "#"
    }
  ];

  return (
    <section className={`py-24 px-6 ${
      isDark 
        ? 'bg-gradient-to-b from-black to-dark-800' 
        : 'bg-gradient-to-b from-white to-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 1, 
            ease: [0.25, 0.46, 0.45, 0.94],
            scale: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
        >
          <motion.h2 
            className={`text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r bg-clip-text text-transparent ${
            isDark ? 'from-gray-300 to-white' : 'from-gray-600 to-black'
          }`}
            initial={{ opacity: 0, y: 30, letterSpacing: '0.1em' }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0, 
              letterSpacing: 'normal' 
            } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            Other Projects
          </motion.h2>
          <motion.p 
            className={`text-center mb-16 max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            Modified and enhanced existing projects with significant improvements and customizations
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
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