import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';

interface NotableProjectsProps {
  isDark: boolean;
}

const NotableProjects = ({ isDark }: NotableProjectsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  const projects = [
    {
      title: 'ScoutIQ',
      description:
        'ScoutIQ is an AI-powered platform that allows athletes to upload training videos and receive intelligent performance insights. Using computer vision and machine learning, it analyzes technique, movement patterns, and biomechanics to generate actionable feedback directly from smartphone-recorded footage.',
      status: 'In Progress',
      techStack: ['JavaScript', 'TypeScript', 'Python', 'TensorFlow', 'OpenCV'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'FishyLottery',
      description:
        'FishyLottery is a Java-based event lottery application that allows users to create, manage, and participate in event-based draws. It was designed with structured UML planning, backend logic in Java, and integrated APIs to handle event management and mapping functionality.',
      status: 'Done',
      techStack: ['Figma', 'UML', 'Java', 'Maps API'],
      codeUrl: 'https://github.com/CMPUT301F25static1/static1-events',
    },
  ];

  return (
    <section
      id="projects"
      className={`py-24 px-6 ${
        isDark
          ? 'bg-gradient-to-b from-zinc-900 to-black'
          : 'bg-gradient-to-b from-zinc-50 to-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
              isDark ? 'from-white to-zinc-400' : 'from-zinc-900 to-zinc-600'
            }`}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Notable Projects
          </motion.h2>

          <motion.p
            className={`max-w-xl mx-auto text-sm leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-zinc-500'
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Work showcasing innovation, technical depth, and real-world impact
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

export default NotableProjects;
