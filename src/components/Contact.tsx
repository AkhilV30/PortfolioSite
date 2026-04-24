import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

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

const Contact = () => {
  return (
    <section id="contact" className="py-28 px-6 bg-zinc-900">
      <div className="max-w-5xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-6 text-zinc-500"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 leading-tight text-zinc-100"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          }}
        >
          Let's connect.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-base text-zinc-400"
        >
          Open to feedback, collaboration, and new ideas.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contactItems.map(({ Icon, label, lines }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
              className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 backdrop-blur-sm p-6 hover:border-zinc-600/60 transition-colors duration-200"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 bg-zinc-800 border border-zinc-700">
                <Icon className="w-4 h-4 text-zinc-300" />
              </div>

              <p className="text-xs font-semibold tracking-wider uppercase mb-2 text-zinc-500">
                {label}
              </p>

              {lines.map((line) => (
                <p key={line} className="text-sm leading-relaxed break-all text-zinc-300">
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
