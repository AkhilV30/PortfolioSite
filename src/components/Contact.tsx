import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactProps {
  isDark: boolean;
}

const Contact = ({ isDark }: ContactProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className={`py-24 px-6 ${
      isDark 
        ? 'bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden' 
        : 'bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-white' : 'bg-black'
          }`}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl ${
            isDark ? 'bg-gray-400' : 'bg-gray-600'
          }`}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r bg-clip-text text-transparent ${
            isDark ? 'from-white via-gray-300 to-white' : 'from-black via-gray-700 to-black'
          }`}>
            Get In Touch
          </h2>
          <p className={`text-center mb-16 max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Open to feedback and collaborating ideas
          </p>
        </motion.div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`p-8 rounded-2xl border backdrop-blur-sm ${
              isDark 
                ? 'bg-gray-900/50 border-gray-700 hover:bg-gray-800/50' 
                : 'bg-white/50 border-gray-200 hover:bg-gray-50/50'
            } transition-all duration-300`}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className={`p-4 rounded-full w-fit mx-auto mb-4 ${
              isDark ? 'bg-white/10' : 'bg-black/10'
            }`}>
              <Mail className={`w-8 h-8 ${isDark ? 'text-white' : 'text-black'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 text-center ${isDark ? 'text-white' : 'text-black'}`}>
              Email
            </h3>
            <p className={`text-center text-sm break-all ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              akhil.vishnubhotla2005@gmail.com
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`p-8 rounded-2xl border backdrop-blur-sm ${
              isDark 
                ? 'bg-gray-900/50 border-gray-700 hover:bg-gray-800/50' 
                : 'bg-white/50 border-gray-200 hover:bg-gray-50/50'
            } transition-all duration-300`}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className={`p-4 rounded-full w-fit mx-auto mb-4 ${
              isDark ? 'bg-white/10' : 'bg-black/10'
            }`}>
              <Phone className={`w-8 h-8 ${isDark ? 'text-white' : 'text-black'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 text-center ${isDark ? 'text-white' : 'text-black'}`}>
              Phone
            </h3>
            <div className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="mb-1">Canada: +1 (825) 523-3824</p>
              <p>India (WhatsApp): +91 8530593824</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`p-8 rounded-2xl border backdrop-blur-sm ${
              isDark 
                ? 'bg-gray-900/50 border-gray-700 hover:bg-gray-800/50' 
                : 'bg-white/50 border-gray-200 hover:bg-gray-50/50'
            } transition-all duration-300`}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className={`p-4 rounded-full w-fit mx-auto mb-4 ${
              isDark ? 'bg-white/10' : 'bg-black/10'
            }`}>
              <MapPin className={`w-8 h-8 ${isDark ? 'text-white' : 'text-black'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 text-center ${isDark ? 'text-white' : 'text-black'}`}>
              Location
            </h3>
            <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Edmonton, AB, Canada
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;