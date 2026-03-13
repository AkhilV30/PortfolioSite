import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AboutProps {
  isDark: boolean;
}

const STATS = [
  { label: 'University', value: 'Alberta' },
  { label: 'Specializing', value: 'AI & Math' },
  { label: 'Outside of CS', value: 'Sports' },
];

const About = ({ isDark }: AboutProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section
      id="about"
      className={`py-28 px-6 relative overflow-hidden ${
        isDark ? 'bg-zinc-950' : 'bg-zinc-50'
      }`}
    >
      {/* Dot grid — consistent with Hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? `radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)`
            : `radial-gradient(circle, rgba(0,0,0,0.09) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* Ambient orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%', left: '60%',
          width: 500, height: 500,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`text-xs font-semibold tracking-[0.22em] uppercase mb-5 ${
            isDark ? 'text-zinc-500' : 'text-zinc-400'
          }`}
        >
          About
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-10 leading-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          }}
        >
          Building at the intersection<br />
          <span
            style={{
              background: isDark
                ? 'linear-gradient(90deg, #a1a1aa, #e4e4e7)'
                : 'linear-gradient(90deg, #3f3f46, #18181b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            of tech and curiosity.
          </span>
        </motion.h2>

        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-2xl border p-8 md:p-10 ${
            isDark
              ? 'bg-zinc-900/40 border-zinc-700/40 backdrop-blur-md'
              : 'bg-white/70 border-zinc-200/80 backdrop-blur-md shadow-sm'
          }`}
        >
          {/* Body text */}
          <div
            className={`space-y-5 text-base md:text-lg leading-[1.85] mb-10 ${
              isDark ? 'text-zinc-300' : 'text-zinc-600'
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            <p>
              I'm{' '}
              <span
                className={`font-medium ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Akhil Vishnubhotla
              </span>
              , a CS student specializing in AI and Mathematics at the University of Alberta.
              I'm focused on building products and solutions that are genuinely meaningful and
              technically sound.
            </p>
            <p>
              I enjoy learning new things, improving quickly, and working toward making a real
              impact through what I build. Outside of academics, I watch and play multiple sports.
            </p>
          </div>

          {/* Divider */}
          <div className={`h-px mb-8 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />

          {/* Stats row */}
          <div className="flex flex-wrap gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className={`text-[10px] font-semibold tracking-[0.18em] uppercase mb-1 ${
                    isDark ? 'text-zinc-600' : 'text-zinc-400'
                  }`}
                >
                  {stat.label}
                </p>
                <p
                  className={`text-sm font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
