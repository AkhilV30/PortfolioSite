import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

const Footer = ({ isDark }: FooterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/AkhilV30",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/akhil-vishnubhotla-a51379369/",
      label: "LinkedIn"
    },
    {
      icon: Mail,
      href: "mailto:hello@example.com",
      label: "Email"
    }
  ];

  return (
    <footer className={`py-16 px-6 border-t ${
      isDark 
        ? 'bg-gradient-to-t from-dark-900 to-black border-dark-700' 
        : 'bg-gradient-to-t from-gray-100 to-white border-gray-200'
    }`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 1, 
            ease: [0.25, 0.46, 0.45, 0.94],
            scale: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
          className="text-center"
        >
          <motion.div 
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800'
                }`}
                whileHover={{ 
                  scale: 1.2, 
                  y: -6,
                  rotate: 5,
                  boxShadow: isDark 
                    ? "0 10px 25px -5px rgba(255, 255, 255, 0.1)" 
                    : "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                  transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] }
                }}
                whileTap={{ 
                  scale: 0.9,
                  transition: { duration: 0.1 }
                }}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + index * 0.1,
                  scale: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <link.icon className="w-5 h-5" />
                </motion.div>
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.8,
              y: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} Akhil Vishnubhotla. Built with purpose. Contact me on my contact number.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;