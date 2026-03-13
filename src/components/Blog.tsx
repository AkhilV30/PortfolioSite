import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlogProps {
  isDark: boolean;
}

const TOPICS = ['Sports', 'Technology', 'AI', 'General'];

const Blog = ({ isDark }: BlogProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section
      id="blog"
      className={`py-28 px-6 relative overflow-hidden ${
        isDark ? 'bg-zinc-900' : 'bg-white'
      }`}
    >
      {/* Ambient orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', right: '15%',
          width: 480, height: 480,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
          filter: 'blur(64px)',
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
          Blog
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
          Thoughts &{' '}
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
            Perspectives.
          </span>
        </motion.h2>

        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-2xl border p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8 ${
            isDark
              ? 'bg-zinc-800/40 border-zinc-700/40 backdrop-blur-md'
              : 'bg-zinc-50/80 border-zinc-200/80 backdrop-blur-md shadow-sm'
          }`}
        >
          {/* Left — icon + description */}
          <div className="flex-1">
            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5 ${
                isDark
                  ? 'bg-zinc-800 border border-zinc-700'
                  : 'bg-white border border-zinc-200 shadow-sm'
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-5 h-5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>

            <p
              className={`text-base md:text-lg leading-[1.8] ${
                isDark ? 'text-zinc-300' : 'text-zinc-600'
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              My takes on sports, tech, AI, and the occasional observation about the world.
              Short reads, sharp opinions.
            </p>
          </div>

          {/* Divider */}
          <div
            className={`hidden md:block w-px self-stretch ${
              isDark ? 'bg-zinc-700/60' : 'bg-zinc-200'
            }`}
          />
          <div className={`md:hidden h-px ${isDark ? 'bg-zinc-700/60' : 'bg-zinc-200'}`} />

          {/* Right — topics + link */}
          <div className="flex-shrink-0">
            <p
              className={`text-[10px] font-semibold tracking-[0.2em] uppercase mb-4 ${
                isDark ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              Topics
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {TOPICS.map((topic, i) => (
                <motion.span
                  key={topic}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                  className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
                    isDark
                      ? 'bg-zinc-800 border border-zinc-700 text-zinc-400'
                      : 'bg-white border border-zinc-200 text-zinc-500 shadow-sm'
                  }`}
                >
                  {topic}
                </motion.span>
              ))}
            </div>

            {/* Subtle link */}
            <a
              href="#"
              className={`inline-flex items-center gap-2 text-sm font-medium tracking-wide group transition-all duration-200 ${
                isDark
                  ? 'text-zinc-500 hover:text-zinc-200'
                  : 'text-zinc-400 hover:text-zinc-800'
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Read posts
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M3 13L13 3M13 3H6M13 3v7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
