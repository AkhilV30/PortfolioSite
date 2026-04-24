import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const TOPICS = ['Sports', 'Technology', 'AI', 'General'];

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="blog" className="py-28 px-6 relative overflow-hidden bg-zinc-900">
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', right: '15%',
          width: 460, height: 460,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
          filter: 'blur(64px)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-semibold tracking-[0.22em] uppercase mb-5 text-zinc-500"
        >
          Blog
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 leading-tight text-zinc-100"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          }}
        >
          Thoughts &{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #a1a1aa, #e4e4e7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Perspectives.
          </span>
        </motion.h2>

        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-zinc-700/40 bg-zinc-800/40 backdrop-blur-md p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8"
        >
          {/* Left */}
          <div className="flex-1">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5 bg-zinc-800 border border-zinc-700">
              <svg
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
                className="w-5 h-5 text-zinc-400"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <p
              className="text-base md:text-lg leading-[1.8] text-zinc-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              My takes on sports, tech, AI, and the occasional observation about the world.
              Short reads, sharp opinions.
            </p>
          </div>

          <div className="hidden md:block w-px self-stretch bg-zinc-700/60" />
          <div className="md:hidden h-px bg-zinc-700/60" />

          {/* Right */}
          <div className="flex-shrink-0">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4 text-zinc-600">
              Topics
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {TOPICS.map((topic, i) => (
                <motion.span
                  key={topic}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.38 + i * 0.055 }}
                  className="px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-zinc-800 border border-zinc-700 text-zinc-400"
                >
                  {topic}
                </motion.span>
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium tracking-wide group text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Read posts
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
