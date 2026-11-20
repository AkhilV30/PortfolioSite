import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';
import { EASE, scrollToId, useFinePointer } from '../lib/ui';

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
    <div className="h-12 md:h-14 flex items-center justify-center">
      <span
        className="text-2xl md:text-3xl font-light tracking-[0.12em] text-zinc-400"
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

// ─── Slowly shifting gradient wash ───────────────────────────────────────────
const ShiftingGradient = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none opacity-70"
    style={{
      background:
        'linear-gradient(120deg, rgba(99,102,241,0.10), rgba(9,9,11,0) 35%, rgba(16,185,129,0.06) 60%, rgba(9,9,11,0) 80%, rgba(139,92,246,0.09))',
      backgroundSize: '300% 300%',
    }}
    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
  />
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const finePointer = useFinePointer();

  const name = 'Akhil Vishnubhotla';
  const letters = name.split('');

  return (
    <section id="home" className="min-h-[100svh] flex flex-col relative overflow-hidden bg-zinc-950">
      <GrainOverlay />
      <GridBackground />
      <Orbs />
      <ShiftingGradient />
      {finePointer && <CursorSpotlight />}

      {/* HERO CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-24 relative z-10">

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

        {/* Intro */}
        <motion.p
          className="mt-8 max-w-xl text-center text-[15px] sm:text-base leading-relaxed text-zinc-400"
          style={{ fontWeight: 300 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.9, ease: EASE }}
        >
          CS student in AI and Mathematics at the University of Alberta, building AI systems
          and data products that solve real problems.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: EASE }}
        >
          <button
            onClick={() => scrollToId('projects')}
            className="group inline-flex items-center gap-2 rounded-full pl-6 pr-5 py-3 text-sm font-medium bg-zinc-100 text-zinc-900 hover:bg-white shadow-[0_0_40px_-10px_rgba(165,180,252,0.45)] transition-colors"
          >
            View work
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      {/* SOCIAL LINKS */}
      <motion.div
        className="absolute bottom-8 left-8 hidden sm:flex flex-col items-center gap-4 z-10"
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

    </section>
  );
};

export default Hero;
