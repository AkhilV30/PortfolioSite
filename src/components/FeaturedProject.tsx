import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles, UserCheck, FileSearch } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

// The nine typed steps of the Sourced AI pipeline: model handles language, rules decide.
const PIPELINE: { name: string; kind: 'rules' | 'model' | 'agent' }[] = [
  { name: 'Red-flag screen', kind: 'rules' },
  { name: 'Parse', kind: 'model' },
  { name: 'Route', kind: 'rules' },
  { name: 'Research', kind: 'agent' },
  { name: 'Grade evidence', kind: 'rules' },
  { name: 'Grade fit', kind: 'rules' },
  { name: 'Synthesize', kind: 'model' },
  { name: 'Decide', kind: 'rules' },
  { name: 'Compose', kind: 'model' },
];

const KIND_STYLE: Record<string, string> = {
  rules: 'border-zinc-700 text-zinc-400 bg-zinc-900/70',
  model: 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10',
  agent: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
};

const HIGHLIGHTS = [
  {
    Icon: FileSearch,
    title: 'Research agent',
    body: 'Searches a curated library, PubMed and Health Canada safety alerts, and asks you back when a missing detail would change the answer.',
  },
  {
    Icon: UserCheck,
    title: 'Two grades on every claim',
    body: 'How strong the evidence is, and whether it was studied in people like you, with every mismatch named.',
  },
  {
    Icon: ShieldCheck,
    title: 'Safety as rules, not hope',
    body: 'Emergency screen before any model call, no-advice filters, fixed scope, and step-by-step run records for error attribution.',
  },
];

const STACK = ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Claude', 'Voyage AI', 'Supabase', 'pgvector'];

// ─── Animated mock answer: the two-grade claim card ─────────────────────────
const ClaimPreview = ({ active }: { active: boolean }) => (
  <div className="relative rounded-2xl border border-zinc-700/50 bg-zinc-950/80 p-5 shadow-2xl shadow-indigo-950/30">
    <div className="flex items-center gap-2 mb-4">
      <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
      <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
      <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
      <span className="ml-2 text-[10px] tracking-[0.18em] uppercase text-zinc-600">sourcedai.app</span>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
      className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 mb-4 text-sm text-zinc-300"
    >
      Does metformin cause stomach upset, and does it get better?
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.9, ease: EASE }}
      className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-4"
    >
      <p className="text-[13px] leading-relaxed text-zinc-300">
        Stomach side effects are common when starting metformin and often ease over the first weeks.
      </p>

      <div>
        <div className="flex justify-between text-[10px] tracking-[0.14em] uppercase text-zinc-500 mb-1.5">
          <span>Evidence strength</span>
          <span className="text-zinc-300">Systematic review · 6/7</span>
        </div>
        <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
            initial={{ width: 0 }}
            animate={active ? { width: `${(6 / 7) * 100}%` } : {}}
            transition={{ duration: 1.2, delay: 1.3, ease: EASE }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.35, delay: 1.9 }}
          className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/25"
        >
          Fit to you · Moderate
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 2.2 }}
          className="text-[11px] text-zinc-500"
        >
          Study ages 40–65. Yours: 60–69.
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 2.5 }}
        className="flex flex-wrap gap-1.5"
      >
        {['Diabetes Canada', 'Product monograph', 'Systematic review'].map(s => (
          <span key={s} className="rounded-md px-2 py-0.5 text-[10px] bg-zinc-800 text-zinc-400">
            {s}
          </span>
        ))}
      </motion.div>
    </motion.div>
  </div>
);

// ─── Pipeline strip with a travelling pulse ─────────────────────────────────
const Pipeline = ({ active }: { active: boolean }) => (
  <div className="relative mt-10">
    <div className="flex items-center justify-between mb-4">
      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-zinc-500">
        Nine typed steps · models handle language, rules make every decision
      </p>
      <div className="hidden sm:flex items-center gap-3 text-[10px] uppercase tracking-[0.14em] text-zinc-500">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />Rules</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />Model</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Agent</span>
      </div>
    </div>

    <div className="relative overflow-hidden py-1">
      <div className="absolute left-0 right-0 top-1/2 h-px bg-zinc-800 hidden md:block" />
      {active && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-px w-24 hidden md:block"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.9), transparent)' }}
          initial={{ left: '-10%' }}
          animate={{ left: ['-10%', '100%'] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
      )}
      <div className="relative grid grid-cols-3 md:grid-cols-9 gap-2">
        {PIPELINE.map((step, i) => (
          <motion.div
            key={step.name}
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: EASE }}
            className={`rounded-lg border px-2 py-2 text-center backdrop-blur-sm ${KIND_STYLE[step.kind]}`}
          >
            <p className="text-[9px] tracking-[0.14em] uppercase opacity-60 mb-0.5">{String(i + 1).padStart(2, '0')}</p>
            <p className="text-[11px] font-medium leading-tight">{step.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const FeaturedProject = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <div ref={ref} className="relative mb-20">
      {/* Rotating conic border glow */}
      <div className="relative rounded-3xl p-px overflow-hidden">
        <motion.div
          className="absolute -inset-[100%] pointer-events-none"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgba(99,102,241,0.55) 60deg, rgba(52,211,153,0.45) 120deg, transparent 180deg, transparent 360deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative rounded-3xl bg-zinc-950/95 p-6 md:p-10 overflow-hidden">
          {/* Ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '-20%', right: '-10%', width: 520, height: 520, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE }}
                className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[10px] font-semibold tracking-[0.18em] uppercase"
              >
                <Sparkles className="h-3 w-3" />
                Featured project · Agentic AI research agent
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
                className="leading-none mb-4"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  background: 'linear-gradient(90deg, #e4e4e7, #a5b4fc 55%, #6ee7b7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Sourced AI
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
                className="text-lg text-zinc-200 mb-4 leading-snug"
                style={{ fontWeight: 400 }}
              >
                An agentic AI research agent that shows its evidence and checks whether it fits you.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
                className="text-sm leading-[1.8] text-zinc-400 mb-8"
              >
                Sourced AI answers questions about type 2 diabetes medications from a hand-picked
                library of clinical guidelines, drug monographs and trials. Every claim carries two
                grades: how strong the evidence is, and whether that evidence was studied in people
                like you.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {HIGHLIGHTS.map(({ Icon, title, body }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.3 + i * 0.08, ease: EASE }}
                    className={`group ${i === HIGHLIGHTS.length - 1 && HIGHLIGHTS.length % 2 ? 'sm:col-span-2' : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="h-4 w-4 text-indigo-300 group-hover:text-emerald-300 transition-colors duration-200" />
                      <p className="text-sm font-medium text-zinc-100">{title}</p>
                    </div>
                    <p className="text-[13px] leading-relaxed text-zinc-500">{body}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
                className="flex flex-wrap items-center gap-3"
              >
                <motion.a
                  href="https://www.sourcedai.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-zinc-100 text-zinc-900 hover:bg-white transition-colors"
                >
                  Visit sourcedai.app
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>
                <div className="flex flex-wrap gap-1.5">
                  {STACK.map(t => (
                    <span key={t} className="rounded-md px-2 py-1 text-[11px] font-medium bg-zinc-800/80 text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24, rotate: 1.5 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              whileHover={{ y: -4 }}
            >
              <ClaimPreview active={isInView} />
            </motion.div>
          </div>

          <Pipeline active={isInView} />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
