import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  statusColor: string;
  techStack: string[];
  demoUrl?: string;
  codeUrl?: string;
  index: number;
  isDark: boolean;
}

const ProjectCard = ({ 
  title, 
  description, 
  status, 
  statusColor, 
  techStack, 
  demoUrl, 
  codeUrl, 
  index,
  isDark
}: ProjectCardProps) => {
  const [showStack, setShowStack] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl p-6 border transition-all duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 to-black border-gray-700 hover:border-gray-600' 
          : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-gray-400'
      }`}
      initial={{ opacity: 0, y: 60, scale: 0.95, rotateX: 15 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotateX: 0 
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -12,
        boxShadow: isDark 
          ? "0 25px 50px -12px rgba(255, 255, 255, 0.1)" 
          : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { 
          duration: 0.4, 
          ease: [0.4, 0, 0.6, 1] 
        }
      }}
      style={{ perspective: 1000 }}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.h3 
          className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}
          whileHover={{ 
            x: 6,
            transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] }
          }}
        >
          {title}
        </motion.h3>
        <motion.span 
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.2 }
          }}
        >
          {status}
        </motion.span>
      </div>
      
      <motion.p 
        className={`mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
        whileHover={{ 
          x: 4,
          transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] }
        }}
      >
        {description}
      </motion.p>
      
      <motion.div 
        className="flex flex-wrap gap-3 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
      >
        {demoUrl && (
          <motion.a
            href={demoUrl}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isDark 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            whileHover={{ 
              scale: 1.08, 
              y: -3,
              boxShadow: isDark 
                ? "0 10px 25px -5px rgba(255, 255, 255, 0.2)" 
                : "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] }
            }}
            whileTap={{ 
              scale: 0.96,
              transition: { duration: 0.1 }
            }}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.3 }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.div>
            Demo
          </motion.a>
        )}
        
        {codeUrl && (
          <motion.a
            href={codeUrl}
            className={`flex items-center gap-2 border px-4 py-2 rounded-lg font-medium transition-colors ${
              isDark 
                ? 'border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500' 
                : 'border-gray-400 text-black hover:bg-gray-100 hover:border-gray-500'
            }`}
            whileHover={{ 
              scale: 1.08, 
              y: -3,
              borderColor: isDark ? '#9CA3AF' : '#6B7280',
              transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] }
            }}
            whileTap={{ 
              scale: 0.96,
              transition: { duration: 0.1 }
            }}
          >
            <motion.div
              whileHover={{ rotate: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Github className="w-4 h-4" />
            </motion.div>
            Code
          </motion.a>
        )}
        
        <motion.button
          onClick={() => setShowStack(!showStack)}
          className={`flex items-center gap-2 border px-4 py-2 rounded-lg font-medium transition-colors ${
            isDark 
              ? 'border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-400' 
              : 'border-gray-500 text-gray-700 hover:bg-gray-200 hover:text-black hover:border-gray-600'
          }`}
          whileHover={{ 
            scale: 1.08, 
            y: -3,
            transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] }
          }}
          whileTap={{ 
            scale: 0.96,
            transition: { duration: 0.1 }
          }}
        >
          <motion.div
            animate={{ rotate: showStack ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.6, 1] }}
          >
            <Code className="w-4 h-4" />
          </motion.div>
          View Stack
        </motion.button>
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ 
          height: showStack ? 'auto' : 0, 
          opacity: showStack ? 1 : 0,
          y: showStack ? 0 : -10
        }}
        transition={{ 
          duration: 0.5, 
          ease: [0.4, 0, 0.6, 1],
          height: { duration: 0.4 },
          opacity: { duration: 0.3, delay: showStack ? 0.1 : 0 }
        }}
        className="overflow-hidden"
      >
        <div className={`flex flex-wrap gap-2 pt-4 border-t ${
          isDark ? 'border-gray-700' : 'border-gray-300'
        }`}>
          {techStack.map((tech, i) => (
            <motion.span 
              key={i}
              className={`px-3 py-1 rounded-full text-sm ${
                isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}
              whileHover={{ 
                scale: 1.15, 
                y: -3,
                backgroundColor: isDark ? '#374151' : '#E5E7EB',
                transition: { duration: 0.2, ease: [0.4, 0, 0.6, 1] }
              }}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={showStack ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                delay: i * 0.08,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;