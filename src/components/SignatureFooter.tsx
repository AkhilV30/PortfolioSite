import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, MapPin } from 'lucide-react';
import { Reveal, useUI } from '../lib/ui';

const EMAIL = 'akhil.vishnubhotla2005@gmail.com';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/AkhilV30', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/akhil-vishnubhotla-a51379369/', Icon: Linkedin },
];

const SignatureFooter = () => {
  const { setPaletteOpen } = useUI();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-zinc-800/70 bg-zinc-950">
      <div
        className="absolute pointer-events-none left-1/2 -translate-x-1/2 bottom-[-30%] w-[900px] max-w-[160vw] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.10), transparent)', filter: 'blur(40px)' }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-24 sm:pt-32 pb-10">
        <Reveal as="p" className="text-[11px] font-semibold tracking-[0.24em] uppercase mb-6 text-zinc-500">
          Contact
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            className="text-zinc-100 leading-[1.02] mb-10 max-w-4xl"
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
          >
            Let’s build something{' '}
            <span style={{ background: 'linear-gradient(90deg, #c7d2fe, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              real.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.16} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-20">
          <a
            href={`mailto:${EMAIL}`}
            className="group relative inline-flex items-center gap-2 text-base sm:text-xl text-zinc-200 break-all"
          >
            {EMAIL}
            <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-100" />
            <span className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-zinc-400 transition-transform duration-500 group-hover:scale-x-100" />
          </a>
          <button
            onClick={copy}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-800 px-4 py-2 text-xs text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </Reveal>

        <div className="flex flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between pt-8 border-t border-zinc-800/70">
          <div className="flex items-center gap-5">
            <span className="text-2xl text-zinc-100" style={{ fontFamily: "'DM Serif Display', serif" }}>AV</span>
            <div className="text-xs leading-relaxed text-zinc-500">
              <p>Akhil Vishnubhotla · Building for real problems.</p>
              <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Edmonton, Canada · © {new Date().getFullYear()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-4 py-2 text-xs text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
              >
                <Icon className="h-3.5 w-3.5" /> {label}
              </a>
            ))}
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden md:inline-flex items-center rounded-full border border-zinc-800 px-3 py-2 text-xs text-zinc-500 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
            >
              ⌘K
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SignatureFooter;
