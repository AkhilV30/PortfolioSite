import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Sun, Moon } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';

interface HeroProps {
  isDark: boolean;
  toggleTheme: () => void;
}

// ─── Typing animation ───────────────────────────────────────────────────────
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
        className={`text-xl font-light tracking-[0.1em] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}
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

// ─── Self-drawing underline ─────────────────────────────────────────────────
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

// ─── Grain overlay for texture ──────────────────────────────────────────────
const GrainOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-10 opacity-[0.025]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
    }}
  />
);

// ─── Subtle grid background ─────────────────────────────────────────────────
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

// ─── Animated ambient orbs ──────────────────────────────────────────────────
const Orbs = ({ isDark }: { isDark: boolean }) => (
  <>
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: '15%', left: '58%',
        width: 520, height: 520,
        borderRadius: '50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(255,255,255,0.045) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)',
        filter: 'blur(48px)',
      }}
      animate={{ x: [0, -50, 0], y: [0, 35, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: '55%', left: '20%',
        width: 340, height: 340,
        borderRadius: '50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(0,0,0,0.025) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }}
      animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
    />
  </>
);

// ─── Horizontal scan line that sweeps once on load ──────────────────────────
const ScanLine = ({ isDark }: { isDark: boolean }) => (
  <motion.div
    className="absolute left-0 right-0 pointer-events-none z-20"
    style={{
      height: 1,
      background: isDark
        ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)'
        : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
    }}
    initial={{ top: '0%', opacity: 0 }}
    animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
    transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
  />
);

// ─── 3-D tilt + glitch AV monogram ─────────────────────────────────────────
const AVMonogram = ({ isDark }: { isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glitch, setGlitch] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(springY, [-1, 1], [8, -8]);
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    rawX.set(((e.clientX - left) / width - 0.5) * 2);
    rawY.set(((e.clientY - top) / height - 0.5) * 2);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const handleMouseEnter = useCallback(() => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 400);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  const baseColor = isDark ? 'text-zinc-100' : 'text-zinc-900';
  const fontStyle: React.CSSProperties = {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(7rem, 22vw, 16rem)',
    letterSpacing: '-0.04em',
  };

  return (
    <motion.div
      ref={ref}
      className="relative mb-8 select-none cursor-default"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
    >
      {/* Ghost layers for glitch */}
      <AnimatePresence>
        {glitch && (
          <>
            <motion.div
              className={`absolute inset-0 font-black leading-none pointer-events-none ${baseColor}`}
              style={{ ...fontStyle, opacity: 0.4, color: isDark ? '#a1a1aa' : '#52525b' }}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, -6, 4, -2, 0], opacity: [0, 0.5, 0.3, 0.4, 0] }}
              transition={{ duration: 0.35, times: [0, 0.2, 0.5, 0.8, 1] }}
            >
              AV
            </motion.div>
            <motion.div
              className={`absolute inset-0 font-black leading-none pointer-events-none`}
              style={{ ...fontStyle, opacity: 0.3, color: isDark ? '#71717a' : '#a1a1aa' }}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, 5, -3, 2, 0], opacity: [0, 0.4, 0.2, 0.3, 0] }}
              transition={{ duration: 0.35, times: [0, 0.2, 0.5, 0.8, 1], delay: 0.04 }}
            >
              AV
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main AV text */}
      <div className={`font-black leading-none ${baseColor}`} style={fontStyle}>
        AV
      </div>
    </motion.div>
  );
};

// ─── Scroll indicator with ripple ───────────────────────────────────────────
const ScrollIndicator = ({ isDark, onClick }: { isDark: boolean; onClick: () => void }) => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.4 }}
    onClick={onClick}
  >
    {/* Ripple rings */}
    {[0, 0.6, 1.2].map((delay, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border"
        style={{
          width: 36, height: 36,
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        }}
        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay, ease: 'easeOut' }}
      />
    ))}

    <motion.span
      className={`text-[10px] tracking-[0.2em] uppercase relative z-10 transition-opacity group-hover:opacity-100 ${
        isDark ? 'text-zinc-600' : 'text-zinc-400'
      }`}
    >
      Scroll
    </motion.span>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      className="relative z-10"
    >
      <ChevronDown className={`w-4 h-4 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`} />
    </motion.div>
  </motion.div>
);

// ─── Nav items ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Blog', id: 'blog' },
  { name: 'Contact', id: 'contact' },
];

// ─── Cursor spotlight ────────────────────────────────────────────────────────
const CursorSpotlight = ({ isDark }: { isDark: boolean }) => {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0"
      style={{
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)'
          : 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 65%)',
        translateX: '-50%',
        translateY: '-50%',
        left: x,
        top: y,
      }}
    />
  );
};

// ─── Main Hero ───────────────────────────────────────────────────────────────
const Hero = ({ isDark, toggleTheme }: HeroProps) => {
  const scrollTo = (id: string) => {
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const name = 'Akhil Vishnubhotla';
  const letters = name.split('');

  return (
    <section
      className={`min-h-screen flex flex-col relative overflow-hidden ${
        isDark ? 'bg-zinc-950' : 'bg-zinc-50'
      }`}
    >
      <GrainOverlay />
      <GridBackground isDark={isDark} />
      <Orbs isDark={isDark} />
      <CursorSpotlight isDark={isDark} />
      <ScanLine isDark={isDark} />

      {/* ── NAV ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          onClick={() => scrollTo('home')}
          className={`text-sm font-bold tracking-[0.25em] uppercase transition-opacity hover:opacity-60 ${
            isDark ? 'text-zinc-100' : 'text-zinc-900'
          }`}
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          AV
        </button>

        <div
          className={`flex items-center gap-1 px-2 py-1.5 rounded-full border backdrop-blur-md ${
            isDark ? 'border-zinc-800 bg-zinc-900/70' : 'border-zinc-200 bg-white/70'
          }`}
        >
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 + i * 0.07 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                isDark
                  ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              {item.name}
            </motion.button>
          ))}

          <div className={`w-px h-4 mx-1 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`} />

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
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-24 relative z-10">

        {/* AV Monogram with 3D tilt + glitch */}
        <AVMonogram isDark={isDark} />

        {/* Name — letter by letter, with staggered fade-up */}
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
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.45,
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

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <TypingAnimation isDark={isDark} />
        </motion.div>

        {/* Subtle horizontal rule that draws in */}
        <motion.div
          className={`mt-10 h-px w-0 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}
          animate={{ width: '6rem' }}
          transition={{ duration: 1.0, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <ScrollIndicator isDark={isDark} onClick={() => scrollTo('about')} />
    </section>
  );
};

export default Hero;
