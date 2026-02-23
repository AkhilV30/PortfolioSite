import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AboutProps {
  isDark: boolean;
}

const About = ({ isDark }: AboutProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section
      id="about"
      className={`py-24 px-6 ${
        isDark
          ? 'bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden'
          : 'bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden'
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className={`absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl ${
            isDark ? 'bg-white' : 'bg-black'
          }`}
          animate={{
            x: [0, -120, 60, 0],
            y: [0, 100, -50, 0],
            scale: [1, 1.4, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
          }}
        />
        <motion.div
          className={`absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full blur-2xl ${
            isDark ? 'bg-gray-400' : 'bg-gray-700'
          }`}
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 30, 0],
            scale: [1, 0.9, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
              isDark ? 'text-white' : 'text-black'
            }`}
            initial={{ opacity: 0, y: 40, letterSpacing: '0.1em' }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    letterSpacing: 'normal',
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            About Me
          </motion.h2>

          <div
            className={`space-y-8 text-lg md:text-xl leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            <motion.p
              initial={{ opacity: 0, y: 40, x: -20 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-center"
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] },
              }}
            >
              I'm{' '}
              <span
                className={`font-semibold ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                Akhil Vishnubhotla
              </span>
              , a CS student specializing in AI and Math at the University of
              Alberta with a strong interest in AI, data, and software. I’m
              focused on building products and solutions that are genuinely
              meaningful and technically sound.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 40, x: 20 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-center"
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] },
              }}
            >
              I enjoy learning new things, improving quickly, and working toward
              making an impact through what I work on. Outside of academics and
              coursework, I watch and play multiple sports.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;