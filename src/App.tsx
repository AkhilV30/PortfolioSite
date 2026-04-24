import { motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import NotableProjects from './components/NotableProjects';
import OtherProjects from './components/OtherProjects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <motion.div
      className="min-h-screen bg-zinc-950 text-zinc-100"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Hero />
      <About />
      <NotableProjects />
      <OtherProjects />
      <Blog />
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default App;
