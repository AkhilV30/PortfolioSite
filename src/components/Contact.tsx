import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactProps {
  isDark: boolean;
}

const contactItems = [
  {
    Icon: Mail,
    label: 'Email',
    lines: ['akhil.vishnubhotla2005@gmail.com'],
  },
  {
    Icon: Phone,
    label: 'Phone',
    lines: ['Canada: +1 (825) 523-3824', 'India (WhatsApp): +91 8530593824'],
  },
  {
    Icon: MapPin,
    label: 'Location',
    lines: ['Edmonton, AB, Canada'],
  },
];

const Contact = ({ isDark }: ContactProps) => {
  return (
    <section
      id="contact"
      className={`py-28 px-6 ${isDark ? 'bg-zinc-900' : 'bg-white'}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`text-xs font-semibold tracking-[0.2em] uppercase mb-6 ${
            isDark ? 'text-zinc-500' : 'text-zinc-400'
          }`}
        >
          Contact
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-4 leading-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          }}
        >
          Let's connect.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-14 text-base ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}
        >
          Open to feedback, collaboration, and new ideas.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contactItems.map(({ Icon, label, lines }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              className={`rounded-xl border p-6 transition-colors duration-200 ${
                isDark
                  ? 'border-zinc-800 bg-zinc-800/50 hover:border-zinc-700'
                  : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${
                  isDark ? 'bg-zinc-700' : 'bg-zinc-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`} />
              </div>

              <p
                className={`text-xs font-semibold tracking-wider uppercase mb-2 ${
                  isDark ? 'text-zinc-500' : 'text-zinc-400'
                }`}
              >
                {label}
              </p>

              {lines.map((line) => (
                <p
                  key={line}
                  className={`text-sm leading-relaxed break-all ${
                    isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
                >
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
