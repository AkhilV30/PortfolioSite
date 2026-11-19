import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, UserCheck, ShieldCheck, Activity } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const PILLARS = [
  {
    Icon: Quote,
    title: 'Grounded',
    body: 'Every claim cites the exact passages behind it. The model may only say what the sources say.',
  },
  {
    Icon: UserCheck,
    title: 'Personal',
    body: 'Evidence is checked against the person asking, because a trial in healthy 40 year olds may not apply to them.',
  },
  {
    Icon: ShieldCheck,
    title: 'Safe by construction',
    body: 'Emergencies, advice and scope are handled by rules around the model, not by hoping it behaves.',
  },
  {
    Icon: Activity,
    title: 'Measurable',
    body: 'Every run is recorded step by step, so errors can be traced to where they started and fixed.',
  },
];

// Heartbeat line that draws itself in, then keeps a soft pulse travelling along it.
const ECG_PATH =
  'M0 40 H140 L155 40 L165 18 L178 62 L190 8 L202 52 L212 40 H360 L372 40 L382 26 L394 54 L404 40 H560 L575 40 L585 18 L598 62 L610 8 L622 52 L632 40 H800';

const HeartbeatLine = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 800 70" className="w-full h-16 md:h-20" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="ecg-grad" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="rgba(99,102,241,0)" />
        <stop offset="20%" stopColor="rgba(129,140,248,0.7)" />
        <stop offset="80%" stopColor="rgba(52,211,153,0.7)" />
        <stop offset="100%" stopColor="rgba(52,211,153,0)" />
      </linearGradient>
    </defs>
    <motion.path
      d={ECG_PATH}
      fill="none"
      stroke="url(#ecg-grad)"
      strokeWidth={1.5}
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={active ? { pathLength: 1 } : {}}
      transition={{ duration: 2.2, ease: 'easeInOut' }}
    />
    {active && (
      <motion.path
        d={ECG_PATH}
        fill="none"
        stroke="#a7f3d0"
        strokeWidth={2.5}
        strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 0 6px rgba(52,211,153,0.9))' }}
        initial={{ pathLength: 0.06, pathOffset: 0, opacity: 0 }}
        animate={{ pathOffset: [0, 0.94], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'linear', delay: 2.2 }}
      />
    )}
  </svg>
);

const AgenticHealth = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="focus" className="py-28 px-6 relative overflow-hidden bg-zinc-950">
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', left: '-5%', width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-xs font-semibold tracking-[0.22em] uppercase mb-5 text-zinc-500"
        >
          Focus · Agentic AI in healthcare
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          className="mb-6 leading-tight text-zinc-100 max-w-3xl"
          style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
        >
          Building agents people can{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #a5b4fc, #6ee7b7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            trust with their health.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
          className="max-w-2xl text-base md:text-lg leading-[1.85] text-zinc-400"
          style={{ fontWeight: 300 }}
        >
          I'm most interested in agentic AI for healthcare: systems that research, reason and act on
          their own, but stay honest about what they know. In medicine a confident wrong answer is
          worse than no answer, so I build agents where the model handles language, explicit rules
          make the decisions, and abstaining is a measured feature rather than a failure.
        </motion.p>

        <div className="my-10">
          <HeartbeatLine active={isInView} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-5 hover:border-emerald-500/30 transition-colors duration-300"
            >
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700/60 bg-zinc-900 text-indigo-300 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-colors duration-300">
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-zinc-100 mb-1.5">{title}</p>
              <p className="text-[13px] leading-relaxed text-zinc-500">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgenticHealth;
