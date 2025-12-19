import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface NotableProjectsProps {
  isDark: boolean;
}

const NotableProjects = ({ isDark }: NotableProjectsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  const projects = [
    {
      title: "Spectrum Sports Platform",
      description: "A community-first sports platform designed to give fans an unfiltered space to connect, debate, and engage — all in real time. It combines social interaction with live commentary, fan-driven content, and reputation-based rewards to create the ultimate digital arena for sports enthusiasts",
      status: "In Progress",
      statusColor: "bg-yellow-500 text-black",
      techStack: ["React", "TypeScript", "Python", "TensorFlow", "Tailwind CSS"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      title: "FishyLottery",
      description: "ScoutIQ uses computer vision + basic biomechanics analysis to analyze short video clips of athletes and generate insights about their performance, technique, and potential — just from smartphone-recorded footage.",
      status: "In Progress",
      statusColor: "bg-yellow-500 text-black",
      techStack: ["Next.js", "PostgreSQL", "Prisma", "Chart.js", "Stripe API"],
      demoUrl: "#",
      codeUrl: "#"
    },
    
  ];

  return (
    <section id="projects" className={`py-24 px-6 ${
      isDark 
        ? 'bg-gradient-to-b from-dark-800 to-black' 
        : 'bg-gradient-to-b from-gray-50 to-white'
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
            isDark ? 'from-white to-gray-400' : 'from-black to-gray-600'
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
            Notable Projects
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
            Original work showcasing innovation, technical depth, and real-world impact
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

export default NotableProjects;