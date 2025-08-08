import { motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Hero from './components/Hero';
import About from './components/About';
import NotableProjects from './components/NotableProjects';
import OtherProjects from './components/OtherProjects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.div
      className={`min-h-screen font-inter transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-white text-gray-800'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero isDark={isDark} toggleTheme={toggleTheme} />
      <About isDark={isDark} />
      <NotableProjects isDark={isDark} />
      <OtherProjects isDark={isDark} />
      <Blog isDark={isDark} />
      <Contact isDark={isDark} />
      <Footer isDark={isDark} />
    </motion.div>
  );
}

export default App;