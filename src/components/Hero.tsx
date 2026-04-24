import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';

// ─── Typing animation ────────────────────────────────────────────────────────
const TypingAnimation = () => {
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
      const t = setTimeout(() => setDisplayText(currentWord.slice(0, displayText.length - 1)), 55);
      return () => clearTimeout(t);
    }
    if (!isDeleting && displayText === currentWord) {
      const t = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setWordIndex(prev => (prev + 1) % words.length);
    }
  }, [displayText, isDeleting, wordIndex]);

  return (
    <div className="h-9 flex items-center justify-center">
      <span
        className="text-lg font-light tracking-[0.12em] text-zinc-500"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.0, repeat: Infinity }}
          className="text-zinc-600"
        >
          |
        </motion.span>
      </span>
    </div>
  );
};

// ─── Grain texture ───────────────────────────────────────────────────────────
const GrainOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-10 opacity-[0.022]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
    }}
  />
);

// ─── Dot grid ────────────────────────────────────────────────────────────────
const GridBackground = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
      backgroundSize: '44px 44px',
      maskImage: 'radial-gradient(ellipse 80% 65% at 50% 42%, black 20%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 42%, black 20%, transparent 100%)',
    }}
  />
);

// ─── Ambient orbs ────────────────────────────────────────────────────────────
const Orbs = () => (
  <>
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: '5%', left: '52%',
        width: 640, height: 640,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.11) 0%, transparent 70%)',
        filter: 'blur(64px)',
      }}
      animate={{ x: [0, -50, 0], y: [0, 38, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: '55%', left: '10%',
        width: 420, height: 420,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        filter: 'blur(72px)',
      }}
      animate={{ x: [0, 40, 0], y: [0, -26, 0] }}
      transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
    />
  </>
);

// ─── Scan line ───────────────────────────────────────────────────────────────
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 pointer-events-none z-20"
    style={{
      height: 1,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)',
    }}
    initial={{ top: '0%', opacity: 0 }}
    animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
    transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
  />
);

// ─── 3-D tilt + metallic shimmer monogram ────────────────────────────────────
const AVMonogram = () => {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 100, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 100, damping: 22 });
  const rotateX = useTransform(springY, [-1, 1], [7, -7]);
  const rotateY = useTransform(springX, [-1, 1], [-7, 7]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    rawX.set(((e.clientX - left) / width - 0.5) * 2);
    rawY.set(((e.clientY - top) / height - 0.5) * 2);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0); rawY.set(0);
  }, [rawX, rawY]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const fontStyle: React.CSSProperties = {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(7rem, 22vw, 16rem)',
    letterSpacing: '-0.04em',
    background:
      'linear-gradient(90deg, #52525b 0%, #71717a 15%, #a1a1aa 30%, #e4e4e7 44%, #ffffff 50%, #e4e4e7 56%, #a1a1aa 70%, #71717a 85%, #52525b 100%)',
    backgroundSize: '400% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <motion.div
      ref={ref}
      className="relative mb-6 select-none cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 28% at 50% 90%, rgba(99,102,241,0.13) 0%, transparent 70%)',
          filter: 'blur(22px)',
        }}
      />
      <div className="av-shimmer font-black leading-none" style={fontStyle}>
        AV
      </div>
    </motion.div>
  );
};

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border border-zinc-800 bg-zinc-900/80 text-zinc-400"
    style={{ backdropFilter: 'blur(12px)' }}
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>
    Available for opportunities
  </motion.div>
);

// ─── Magnetic CTA ─────────────────────────────────────────────────────────────
const MagneticButton = ({
  children, className, onClick,
}: {
  children: React.ReactNode; className: string; onClick?: () => void;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * 0.22);
    y.set((e.clientY - top - height / 2) * 0.22);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// ─── Scroll indicator ────────────────────────────────────────────────────────
const ScrollIndicator = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.6, duration: 0.8 }}
    onClick={onClick}
  >
    {[0, 0.55, 1.1].map((delay, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-zinc-700/50"
        style={{ width: 34, height: 34 }}
        animate={{ scale: [1, 2.0], opacity: [0.5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, delay, ease: 'easeOut' }}
      />
    ))}
    <span className="text-[10px] tracking-[0.22em] uppercase relative z-10 text-zinc-600 group-hover:text-zinc-400 transition-colors duration-200">
      Scroll
    </span>
    <motion.div
      animate={{ y: [0, 5, 0] }}
      transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
      className="relative z-10"
    >
      <ChevronDown className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors duration-200" />
    </motion.div>
  </motion.div>
);

// ─── Nav ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Blog', id: 'blog' },
  { name: 'Contact', id: 'contact' },
];

// ─── Cursor spotlight ─────────────────────────────────────────────────────────
const CursorSpotlight = () => {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0"
      style={{
        width: 700, height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)',
        translateX: '-50%',
        translateY: '-50%',
        left: x,
        top: y,
      }}
    />
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const scrollTo = (id: string) => {
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const name = 'Akhil Vishnubhotla';
  const letters = name.split('');

  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden bg-zinc-950">
      <GrainOverlay />
      <GridBackground />
      <Orbs />
      <CursorSpotlight />
      <ScanLine />

      {/* NAV */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          onClick={() => scrollTo('home')}
          className="text-sm font-bold tracking-[0.25em] uppercase text-zinc-100 transition-opacity duration-200 hover:opacity-50"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          AV
        </button>

        <div className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur-md">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-all duration-200"
            >
              {item.name}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* HERO CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-28 relative z-10">

        <StatusBadge />
        <AVMonogram />

        {/* Name — staggered letter reveal */}
        <div className="mb-4 overflow-hidden">
          <motion.h1
            className="flex flex-wrap justify-center gap-x-[0.22em] text-zinc-400"
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.85 + i * 0.026,
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.5 }}
        >
          <TypingAnimation />
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mt-8 h-px bg-zinc-800 w-0"
          animate={{ width: '5rem' }}
          transition={{ duration: 1.0, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* CTA */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticButton
            className="px-7 py-2.5 rounded-full text-sm font-medium tracking-wide border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50 transition-all duration-250"
            onClick={() => scrollTo('contact')}
          >
            Say Hello
          </MagneticButton>
        </motion.div>
      </div>

      {/* SOCIAL LINKS */}
      <motion.div
        className="absolute bottom-8 left-8 flex flex-col items-center gap-4 z-10"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="https://github.com/AkhilV30"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span className="text-[10px] tracking-[0.15em] uppercase overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-zinc-500">
            GitHub
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/akhil-vishnubhotla-a51379369/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <span className="text-[10px] tracking-[0.15em] uppercase overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-zinc-500">
            LinkedIn
          </span>
        </a>
        <div className="w-px h-10 bg-zinc-800" />
      </motion.div>

      <ScrollIndicator onClick={() => scrollTo('about')} />
    </section>
  );
};

export default Hero;
