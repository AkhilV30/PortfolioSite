import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'FishyLottery',
    description:
      'FishyLottery is a Java-based event lottery application that allows users to create, manage, and participate in event-based draws. Designed with structured UML planning, backend logic in Java, and integrated APIs to handle event management and mapping functionality.',
    status: 'Done',
    techStack: ['Figma', 'UML', 'Java', 'Maps API'],
    codeUrl: 'https://github.com/CMPUT301F25static1/static1-events',
  },
  {
    title: 'NBA Analytics Platform',
    description:
      'An end-to-end sports analytics platform that predicts NBA game outcomes and over/under totals using ML models trained on historical team statistics and sportsbook odds spanning 2007–08 to present. Includes a Flask web app and CLI for daily predictions with expected value calculations.',
    status: 'Completed',
    techStack: ['Python', 'TensorFlow', 'XGBoost', 'Flask', 'SQLite', 'Pandas'],
    codeUrl: 'https://github.com/AkhilV30/NBA-Analytics-Platform',
  },
  {
    title: 'Industrial Predictive Maintenance',
    description:
      'A production-ready ML system for forecasting equipment failures in manufacturing environments, targeting a 35–45% reduction in unplanned downtime. Features Kafka-based streaming, LSTM and Random Forest models, a FastAPI inference service, real-time dashboards, and automated MLOps retraining pipelines.',
    status: 'Completed',
    techStack: ['Python', 'PyTorch', 'Kafka', 'FastAPI', 'MLflow', 'Docker', 'Airflow'],
    codeUrl: 'https://github.com/AkhilV30/industrial-predictive-maintenance',
  },
  {
    title: 'Canadian Housing Pipeline',
    description:
      'An ETL data pipeline processing Canadian housing data across 45 cities to demonstrate Apache Spark, Terraform infrastructure-as-code, and Google Cloud Platform services. Provisions GCS, Dataproc, and BigQuery resources via Terraform and runs a PySpark transformation job on the cloud.',
    status: 'Completed',
    techStack: ['Python', 'PySpark', 'Terraform', 'GCP', 'BigQuery', 'Dataproc'],
    codeUrl: 'https://github.com/AkhilV30/Canadian-Housing-Pipeline',
  },
];

const MyProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-28 px-6 bg-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6 text-zinc-500"
          >
            My Projects
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 leading-tight text-zinc-100"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            }}
          >
            Work that ships.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-sm text-zinc-400"
          >
            Projects showcasing innovation, technical depth, and real-world impact.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.22 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MyProjects;
