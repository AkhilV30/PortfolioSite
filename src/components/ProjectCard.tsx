import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  status: string;

  // Optional: keep for backwards compatibility, but you won't need it anymore.
  statusColor?: string;

  techStack: string[];
  demoUrl?: string;
  codeUrl?: string;

  index: number;
  isDark: boolean;
}

const getStatusBadgeClasses = (status: string) => {
  const s = status.trim().toLowerCase();

  // Normalize common variants
  if (
    s === "done" ||
    s === "completed" ||
    s === "completed & live" ||
    s === "complete"
  ) {
    return "bg-green-500 text-black";
  }

  if (s === "in progress" || s === "ongoing" || s === "building") {
    return "bg-yellow-500 text-black";
  }

  if (s === "modified" || s === "enhanced" || s === "refactor") {
    return "bg-purple-500 text-white";
  }

  // Fallback
  return "bg-gray-500 text-white";
};

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
  const badgeClasses = statusColor ?? getStatusBadgeClasses(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`rounded-2xl border p-6 backdrop-blur-sm transition-transform ${
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/8"
          : "border-black/10 bg-white hover:bg-black/2"
      }`}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-black"}`}>
          {title}
        </h3>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses}`}
        >
          {status}
        </span>
      </div>

      <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {techStack.map((t) => (
          <span
            key={t}
            className={`rounded-full px-3 py-1 text-xs ${
              isDark ? "bg-white/10 text-gray-200" : "bg-black/5 text-gray-800"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      {(demoUrl || codeUrl) && (
        <div className="mt-5 flex items-center gap-3">
          {demoUrl && demoUrl !== "#" && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className={`text-sm font-medium underline-offset-4 hover:underline ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Demo
            </a>
          )}
          {codeUrl && codeUrl !== "#" && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noreferrer"
              className={`text-sm font-medium underline-offset-4 hover:underline ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Code
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;