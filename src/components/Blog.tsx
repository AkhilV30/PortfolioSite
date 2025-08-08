import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';

interface BlogProps {
  isDark: boolean;
}

const Blog = ({ isDark }: BlogProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section id="blog" className={`py-24 px-6 ${
      isDark 
        ? 'bg-gradient-to-b from-dark-800 to-black' 
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <div className="max-w-4xl mx-auto text-center">
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
          <motion.div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-8 ${
              isDark 
                ? 'bg-gradient-to-r from-white to-gray-300' 
                : 'bg-gradient-to-r from-black to-gray-700'
            }`}
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ 
              duration: 1, 
              delay: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.15, 
              rotate: 360,
              transition: { duration: 0.8, ease: [0.4, 0, 0.6, 1] }
            }}
          >
            <BookOpen className={`w-8 h-8 ${isDark ? 'text-black' : 'text-white'}`} />
          </motion.div>
          
          <motion.h2 
            className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
            isDark ? 'from-white to-gray-300' : 'from-gray-800 to-gray-600'
          }`}
            initial={{ opacity: 0, y: 30, letterSpacing: '0.1em' }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0, 
              letterSpacing: 'normal' 
            } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            Read My Blog
          </motion.h2>
          
          <motion.p 
            className={`text-lg mb-12 max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            My thoughts on sports, tech and world affairs.
          </motion.p>
          
          <motion.a
            href="#"
            className={`group inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
              isDark 
                ? 'bg-white text-black hover:bg-gray-100 border-2 border-gray-200' 
                : 'bg-black text-white hover:bg-gray-900 border-2 border-gray-800'
            }`}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.08, 
              y: -4,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] }
            }}
            whileTap={{ 
              scale: 0.96,
              transition: { duration: 0.1 }
            }}
          >
            <span className="font-bold">Visit My Blog</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;