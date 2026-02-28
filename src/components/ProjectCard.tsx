import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  statusColor?: string;
  techStack: string[];
  demoUrl?: string;
  codeUrl?: string;
  index: number;
  isDark: boolean;
}

const getStatusBadgeClasses = (status: string, isDark: boolean) => {
  const s = status.trim().toLowerCase();

  if (s === "done" || s === "completed" || s === "completed & live" || s === "complete") {
    return isDark
      ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
      : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  }
  if (s === "in progress" || s === "ongoing" || s === "building") {
    return isDark
      ? "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30"
      : "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  }
  if (s === "modified" || s === "enhanced" || s === "refactor") {
    return isDark
      ? "bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/30"
      : "bg-violet-50 text-violet-700 ring-1 ring-violet-200";
  }
  return isDark
    ? "bg-zinc-500/15 text-zinc-400 ring-1 ring-zinc-500/30"
    : "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200";
};

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const LayersIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ProjectCard = ({
  title,
  description,
  status,
  statusColor,
  techStack,
  demoUrl,
  codeUrl,
  index,
  isDark,
}: ProjectCardProps) => {
  const [stackOpen, setStackOpen] = useState(false);

  const badgeClasses = statusColor ?? getStatusBadgeClasses(status, isDark);

  const btnBase =
    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 select-none";

  const btnOutline = isDark
    ? "ring-1 ring-white/[0.12] text-zinc-300 hover:bg-white/[0.08] hover:text-white"
    : "ring-1 ring-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900";

  const btnFilled = isDark
    ? "bg-white text-zinc-900 hover:bg-zinc-100"
    : "bg-zinc-900 text-white hover:bg-zinc-700";

  const btnActiveOutline = isDark
    ? "bg-white/[0.12] text-white ring-1 ring-white/20"
    : "bg-zinc-900 text-white ring-1 ring-zinc-900";

  const hasCode = codeUrl && codeUrl !== "#";
  const hasDemo = demoUrl && demoUrl !== "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
      className={`group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
        isDark
          ? "border-white/[0.08] bg-white/[0.04] hover:border-white/[0.14] hover:bg-white/[0.07] shadow-xl shadow-black/20"
          : "border-black/[0.07] bg-white hover:border-black/[0.12] hover:shadow-xl hover:shadow-black/[0.06] shadow-md shadow-black/[0.04]"
      }`}
    >
      {/* Title + status badge */}
      <div className="flex items-start justify-between gap-4">
        <h3
          className={`text-lg font-semibold leading-snug tracking-tight ${
            isDark ? "text-white" : "text-zinc-900"
          }`}
        >
          {title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${badgeClasses}`}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      <p
        className={`mt-3 text-sm leading-relaxed flex-1 ${
          isDark ? "text-zinc-400" : "text-zinc-500"
        }`}
      >
        {description}
      </p>

      {/* Hairline divider */}
      <div className={`mt-5 h-px w-full ${isDark ? "bg-white/[0.07]" : "bg-zinc-100"}`} />

      {/* Buttons row */}
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        {/* Stack toggle */}
        <button
          onClick={() => setStackOpen((v) => !v)}
          className={`${btnBase} ${stackOpen ? btnActiveOutline : btnOutline}`}
          aria-expanded={stackOpen}
        >
          <LayersIcon className="h-3.5 w-3.5" />
          Stack
          <motion.span
            animate={{ rotate: stackOpen ? 180 : 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="flex items-center"
          >
            <ChevronIcon className="h-3 w-3" />
          </motion.span>
        </button>

        {/* Code */}
        {hasCode ? (
          <a href={codeUrl} target="_blank" rel="noreferrer" className={`${btnBase} ${btnOutline}`}>
            <GitHubIcon className="h-3.5 w-3.5" />
            Code
          </a>
        ) : (
          <span className={`${btnBase} ${btnOutline} opacity-40 cursor-not-allowed`} title="Code not available yet">
            <GitHubIcon className="h-3.5 w-3.5" />
            Code
          </span>
        )}

        {/* Demo */}
        {hasDemo ? (
          <a href={demoUrl} target="_blank" rel="noreferrer" className={`${btnBase} ${btnFilled}`}>
            <ExternalLinkIcon className="h-3.5 w-3.5" />
            Demo
          </a>
        ) : (
          <span className={`${btnBase} ${btnFilled} opacity-40 cursor-not-allowed`} title="Demo not available yet">
            <ExternalLinkIcon className="h-3.5 w-3.5" />
            Demo
          </span>
        )}
      </div>

      {/* Animated stack panel */}
      <AnimatePresence initial={false}>
        {stackOpen && (
          <motion.div
            key="stack"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className={`rounded-xl p-3 ${
                isDark
                  ? "bg-white/[0.05] ring-1 ring-white/[0.08]"
                  : "bg-zinc-50 ring-1 ring-zinc-100"
              }`}
            >
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.16, delay: i * 0.045 }}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-medium tracking-wide ${
                      isDark
                        ? "bg-white/[0.08] text-zinc-300 ring-1 ring-white/[0.1]"
                        : "bg-white text-zinc-700 ring-1 ring-zinc-200"
                    }`}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard;
