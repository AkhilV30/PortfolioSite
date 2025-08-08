import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroProps {
  isDark: boolean;
}

const TypingAnimation = ({ isDark }: { isDark: boolean }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  
  const words = ['Builder.', 'Developer.', 'Sports Enthusiast.'];
  
  useEffect(() => {
    const currentWord = words[wordIndex];
    const shouldDelete = isDeleting && displayText.length > 0;
    const shouldType = !isDeleting && displayText.length < currentWord.length;
    
    if (shouldType) {
      const timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
    
    if (shouldDelete) {
      const timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
    
    if (!isDeleting && displayText === currentWord) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
    
    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }
  }, [displayText, isDeleting, wordIndex, words]);
  
  return (
    <motion.p
      className="font-medium tracking-wide h-12 flex items-center justify-center"
      animate={{ y: [0, -2, 0] }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: [0.4, 0, 0.6, 1] 
      }}
    >
      {displayText}
      <motion.span
        className={`ml-1 ${isDark ? 'text-white' : 'text-black'}`}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        |
      </motion.span>
    </motion.p>
  );
};

const Hero = ({ isDark }: HeroProps) => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
        : 'bg-gradient-to-br from-white via-gray-50 to-white'
    }`}>
      
      {/* Navigation Menu */}
      <motion.nav
        className="fixed top-6 right-6 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className={`flex items-center gap-8 px-6 py-3 rounded-full backdrop-blur-md border ${
          isDark 
            ? 'bg-black/20 border-gray-700/50' 
            : 'bg-white/20 border-gray-300/50'
        }`}>
          {[
            { name: 'Home', id: 'home' },
            { name: 'About Me', id: 'about' },
            { name: 'Blog', id: 'blog' },
            { name: 'Contact', id: 'contact' }
          ].map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-700 hover:text-black'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.button>
          ))}
        </div>
      </motion.nav>
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark 
              ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500' 
              : 'bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300'
          }`}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl ${
            isDark 
              ? 'bg-gradient-to-r from-pink-500 via-red-500 to-orange-500' 
              : 'bg-gradient-to-r from-pink-300 via-red-300 to-orange-300'
          }`}
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 80, -40, 0],
            scale: [1, 0.9, 1.1, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={`absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-2xl ${
            isDark 
              ? 'bg-gradient-to-r from-green-500 via-teal-500 to-blue-500' 
              : 'bg-gradient-to-r from-green-300 via-teal-300 to-blue-300'
          }`}
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.3, 0.7, 1],
            rotate: [0, 270, 540],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <motion.div 
        className="text-center z-10 px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.25, 0.46, 0.45, 0.94],
          scale: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
        }}
      >
        {/* AV Logo matching the design */}
        <motion.div
          className={`w-[28rem] h-[28rem] mx-auto mb-12 flex items-center justify-center relative select-none ${
            isDark 
              ? 'text-white' 
              : 'text-black'
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {/* Simple AV Logo matching uploaded design */}
          <div 
            className="text-[14rem] font-black tracking-wider"
            style={{
              fontWeight: 900,
              fontFamily: 'serif',
            }}
          >
            AV
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 
          className={`text-4xl md:text-6xl font-bold mb-8 tracking-wide ${
            isDark ? 'text-white' : 'text-black'
          }`}
          initial={{ opacity: 0, y: 40, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: 'normal' }}
          transition={{ 
            duration: 1, 
            delay: 0.6,
            letterSpacing: { duration: 1.2, ease: [0.4, 0, 0.6, 1] },
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          Akhil Vishnubhotla
        </motion.h1>
        
        {/* Three word description with typing animation */}
        <motion.div
          className={`text-2xl md:text-3xl font-light mb-16 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.8,
            y: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
        >
          <TypingAnimation isDark={isDark} />
        </motion.div>

        {/* View My Work Button */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.button
            onClick={scrollToProjects}
            className={`group px-8 py-4 rounded-full font-medium text-lg transition-all duration-500 relative overflow-hidden ${
              isDark 
                ? 'bg-white text-black hover:bg-gray-200 border-2 border-transparent hover:border-gray-300' 
                : 'bg-black text-white hover:bg-gray-800 border-2 border-transparent hover:border-gray-700'
            }`}
            whileHover={{ 
              scale: 1.08, 
              y: -4,
              transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] }
            }}
            whileTap={{ 
              scale: 0.96,
              transition: { duration: 0.1 }
            }}
          >
            <motion.div
              className={`absolute inset-0 ${
                isDark 
                  ? 'bg-gradient-to-r from-gray-200 to-white' 
                  : 'bg-gradient-to-r from-gray-700 to-black'
              }`}
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.6, 1] }}
            />
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 1.8,
          y: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
        }}
        whileHover={{ 
          scale: 1.3,
          transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] }
        }}
        onClick={scrollToProjects}
      >
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: [0.4, 0, 0.6, 1]
          }}
        >
          <ChevronDown className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;