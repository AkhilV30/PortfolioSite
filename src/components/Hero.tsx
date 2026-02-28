import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroProps {
  isDark: boolean;
  toggleTheme: () => void;
}

// Original typing animation with blinking cursor
const TypingAnimation = ({ isDark }: { isDark: boolean }) => {
  const words = ['Builder.', 'Developer.', 'Sports Enthusiast.'];
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const shouldType = !isDeleting && displayText.length < currentWord.length;
    const shouldDelete = isDeleting && displayText.length > 0;

    if (shouldType) {
      const t = setTimeout(() => setDisplayText(currentWord.slice(0, displayText.length + 1)), 100);
      return () => clearTimeout(t);
    }
    if (shouldDelete) {
      const t = setTimeout(() => setDisplayText(currentWord.slice(0, displayText.length - 1)), 50);
      return () => clearTimeout(t);
    }
    if (!isDeleting && displayText === currentWord) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setWordIndex(prev => (prev + 1) % words.length);
    }
  }, [displayText, isDeleting, wordIndex]);

  return (
    <div className="h-10 flex items-center justify-center">
      <span
        className={`text-xl font-light tracking-[0.1em] ${
          isDark ? 'text-zinc-400' : 'text-zinc-500'
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          className={isDark ? 'text-zinc-300' : 'text-zinc-600'}
        >
          |
        </motion.span>
      </span>
    </div>
  );
};

// SVG self-drawing underline
const DrawUnderline = ({ isDark }: { isDark: boolean }) => (
  <motion.svg
    viewBox="0 0 240 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-48 mx-auto mt-2"
    initial="hidden"
    animate="visible"
  >
    <motion.path
      d="M4 5 C60 1, 120 7, 180 3 C210 1, 228 4, 236 4"
      stroke={isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)'}
      strokeWidth="1.5"
      strokeLinecap="round"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    />
  </motion.svg>
);

// Subtle grid background
const GridBackground = ({ isDark }: { isDark: boolean }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: isDark
        ? `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`
        : `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
           linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
      backgroundSize: '72px 72px',
      maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
    }}
  />
);

// Single floating orb — restrained, slow
const Orb = ({ isDark }: { isDark: boolean }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{
      top: '20%',
      left: '60%',
      width: 480,
      height: 480,
      borderRadius: '50%',
      background: isDark
        ? 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)',
      filter: 'blur(40px)',
    }}
    animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
  />
);

// Nav items
const NAV_ITEMS = [
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Blog', id: 'blog' },
  { name: 'Contact', id: 'contact' },
];

const Hero = ({ isDark, toggleTheme }: HeroProps) => {
  const scrollTo = (id: string) => {
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Reveal name letter-by-letter
  const name = 'Akhil Vishnubhotla';
  const letters = name.split('');

  return (
    <section
      className={`min-h-screen flex flex-col relative overflow-hidden ${
        isDark ? 'bg-zinc-950' : 'bg-zinc-50'
      }`}
    >
      <GridBackground isDark={isDark} />
      <Orb isDark={isDark} />

      {/* ── NAV ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo mark */}
        <button
          onClick={() => scrollTo('home')}
          className={`text-sm font-bold tracking-[0.25em] uppercase transition-opacity hover:opacity-60 ${
            isDark ? 'text-zinc-100' : 'text-zinc-900'
          }`}
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          AV
        </button>

        {/* Pills */}
        <div
          className={`flex items-center gap-1 px-2 py-1.5 rounded-full border backdrop-blur-md ${
            isDark
              ? 'border-zinc-800 bg-zinc-900/70'
              : 'border-zinc-200 bg-white/70'
          }`}
        >
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 + i * 0.07 }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                isDark
                  ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              {item.name}
            </motion.button>
          ))}

          {/* Divider */}
          <div className={`w-px h-4 mx-1 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`} />

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.72 }}
            className={`p-1.5 rounded-full transition-all duration-200 ${
              isDark
                ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* ── HERO CONTENT ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-24">

        {/* AV Monogram */}
        <motion.div
          className="relative mb-8 select-none"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={`font-black leading-none ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(7rem, 22vw, 16rem)',
              letterSpacing: '-0.04em',
            }}
          >
            AV
          </div>

          {/* Self-drawing SVG underline */}
          <DrawUnderline isDark={isDark} />
        </motion.div>

        {/* Name — letter by letter */}
        <div className="mb-5 overflow-hidden">
          <motion.h1
            className={`flex flex-wrap justify-center gap-x-[0.22em] ${
              isDark ? 'text-zinc-300' : 'text-zinc-600'
            }`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
              fontWeight: 300,
              letterSpacing: '0.18em',
            }}
            aria-label={name}
          >
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.9 + i * 0.028,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char === ' ' ? '\u00A0' : char.toUpperCase()}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Word cycler */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className=""
        >
          <TypingAnimation isDark={isDark} />
        </motion.div>


      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        onClick={() => scrollTo('about')}
      >
        <motion.span
          className={`text-[10px] tracking-[0.2em] uppercase ${
            isDark ? 'text-zinc-600' : 'text-zinc-400'
          }`}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown
            className={`w-4 h-4 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
