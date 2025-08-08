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
      title: "VishBlogs",
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
      title: "Improved E-commerce Frontend",
      description: "Modified and optimized an existing e-commerce template with better performance, accessibility features, and modern payment integration.",
      status: "Modified",
      statusColor: "bg-purple-500 text-white",
      techStack: ["Vue.js", "Vuex", "SCSS", "Stripe", "PWA"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      title: "Enhanced Portfolio Template",
      description: "Customized and improved a portfolio template with advanced animations, better mobile responsiveness, and modern design patterns.",
      status: "Completed & Live",
      statusColor: "bg-green-500 text-black",
      techStack: ["Gatsby", "GraphQL", "Framer Motion", "Netlify CMS"],
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