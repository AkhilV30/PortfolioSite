import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Command } from 'lucide-react';
import { EASE, scrollToId, useUI } from '../lib/ui';

export const NAV_ITEMS = [
  { name: 'About', id: 'about' },
  { name: 'Work', id: 'projects' },
  { name: 'Expertise', id: 'expertise' },
  { name: 'Contact', id: 'contact' },
];

const Nav = () => {
  const { setPaletteOpen } = useUI();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 40));

  return (
    <motion.nav
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
        scrolled ? 'bg-zinc-950/70 backdrop-blur-xl border-zinc-800/60' : 'bg-transparent border-transparent'
      }`}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
        <button
          onClick={() => scrollToId('home')}
          aria-label="Back to top"
          className="text-sm font-bold tracking-[0.25em] text-zinc-100 hover:opacity-60 transition-opacity"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          AV
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 px-1.5 py-1 rounded-full border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command menu"
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md text-xs text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
          >
            <span className="md:hidden">Menu</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 font-sans">
              <Command className="h-3 w-3" />K
            </kbd>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
