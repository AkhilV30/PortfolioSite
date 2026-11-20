import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import MyProjects from './components/NotableProjects';
import Expertise from './components/Expertise';
import SignatureFooter from './components/SignatureFooter';
import CaseStudy from './components/CaseStudy';
import CommandPalette from './components/CommandPalette';
import { UIProvider } from './lib/ui';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <UIProvider>
        <div
          className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500/30"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <Nav />
          <main>
            <Hero />
            <About />
            <MyProjects />
            <Expertise />
          </main>
          <SignatureFooter />
          <CaseStudy />
          <CommandPalette />
        </div>
      </UIProvider>
    </MotionConfig>
  );
}

export default App;
