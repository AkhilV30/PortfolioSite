import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

export const scrollToId = (id: string) => {
  if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
  else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

// ─── Shared UI state: open case study + command palette ─────────────────────
type UIState = {
  caseSlug: string | null;
  openCase: (slug: string | null) => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
};

const UICtx = createContext<UIState | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [caseSlug, openCase] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Lock page scroll while an overlay is open
  useEffect(() => {
    const locked = caseSlug !== null || paletteOpen;
    document.documentElement.style.overflow = locked ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [caseSlug, paletteOpen]);

  return (
    <UICtx.Provider value={{ caseSlug, openCase, paletteOpen, setPaletteOpen }}>
      {children}
    </UICtx.Provider>
  );
};

export const useUI = () => {
  const ctx = useContext(UICtx);
  if (!ctx) throw new Error('useUI must be used inside UIProvider');
  return ctx;
};

// ─── Scroll reveal ───────────────────────────────────────────────────────────
export const Reveal = ({
  children, delay = 0, y = 18, className, as = 'div',
}: {
  children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'p' | 'h2' | 'li';
}) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
};

// Section eyebrow + serif heading, revealed on scroll
export const SectionHeading = ({ eyebrow, title, className = '' }: { eyebrow: string; title: ReactNode; className?: string }) => (
  <div className={className}>
    <Reveal as="p" className="text-[11px] font-semibold tracking-[0.24em] uppercase mb-5 text-zinc-500">
      {eyebrow}
    </Reveal>
    <Reveal
      as="h2"
      delay={0.08}
      className="leading-[1.05] text-zinc-100"
    >
      <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>{title}</span>
    </Reveal>
  </div>
);

// True when the device has a precise pointer (mouse/trackpad); used to skip hover effects on touch.
export const useFinePointer = () => {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setFine(mq.matches);
    const on = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return fine;
};
