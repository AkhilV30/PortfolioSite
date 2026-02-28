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
    <>
      {/* Google Fonts: DM Serif Display + DM Sans */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
        rel="stylesheet"
      />

      <motion.div
        className={`min-h-screen transition-colors duration-500 ${
          isDark
            ? 'bg-zinc-950 text-zinc-100'
            : 'bg-zinc-50 text-zinc-900'
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Hero isDark={isDark} toggleTheme={toggleTheme} />
        <About isDark={isDark} />
        <NotableProjects isDark={isDark} />
        <OtherProjects isDark={isDark} />
        <Blog isDark={isDark} />
        <Contact isDark={isDark} />
        <Footer isDark={isDark} />
      </motion.div>
    </>
  );
}

export default App;
