import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bot, BrainCircuit, Database, Layers } from 'lucide-react';
import { EASE, SectionHeading } from '../lib/ui';

const GROUPS = [
  {
    Icon: Bot,
    title: 'AI agents & LLM systems',
    line: 'Agent loops, retrieval and evaluation that hold up outside a demo.',
    skills: ['Agentic workflows', 'RAG', 'Tool use', 'Claude API', 'Embeddings', 'Evaluation'],
  },
  {
    Icon: BrainCircuit,
    title: 'Machine learning',
    line: 'From feature engineering to models that forecast and predict.',
    skills: ['PyTorch', 'TensorFlow', 'XGBoost', 'LSTMs', 'Pandas', 'MLflow'],
  },
  {
    Icon: Database,
    title: 'Data engineering',
    line: 'Pipelines and infrastructure that are repeatable and observable.',
    skills: ['PySpark', 'Kafka', 'Airflow', 'BigQuery', 'Terraform', 'GCP'],
  },
  {
    Icon: Layers,
    title: 'Product engineering',
    line: 'Shipping the full stack around the model.',
    skills: ['TypeScript', 'React', 'Next.js', 'FastAPI', 'Postgres', 'Docker'],
  },
];

const MARQUEE = [
  'Python', 'AI Agents', 'RAG', 'Machine Learning', 'Data Engineering', 'TypeScript',
  'FastAPI', 'PyTorch', 'Spark', 'Kafka', 'Next.js', 'Evaluation', 'Postgres', 'Terraform',
];

const Marquee = () => (
  <div
    className="relative mt-16 overflow-hidden border-y border-zinc-800/70 py-5"
    style={{
      maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
    }}
    aria-hidden="true"
  >
    <div className="marquee-track flex w-max gap-10">
      {[...MARQUEE, ...MARQUEE].map((t, i) => (
        <span key={i} className="flex items-center gap-10 text-sm tracking-wide text-zinc-500 whitespace-nowrap">
          {t}
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
        </span>
      ))}
    </div>
  </div>
);

const Expertise = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="expertise" className="py-24 sm:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="Expertise" title="What I work with." className="mb-14" />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-800/80">
          {GROUPS.map(({ Icon, title, line, skills }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="group bg-zinc-950 p-6 sm:p-8 hover:bg-zinc-900/60 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className="h-5 w-5 text-zinc-500 group-hover:text-indigo-300 transition-colors duration-300" strokeWidth={1.5} />
                <h3 className="text-base font-medium text-zinc-100">{title}</h3>
              </div>
              <p className="text-sm text-zinc-500 mb-5 leading-relaxed">{line}</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <span key={s} className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Marquee />
    </section>
  );
};

export default Expertise;
