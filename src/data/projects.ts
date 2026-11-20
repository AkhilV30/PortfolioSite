export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  problem: string;
  built: string[];
  stack: string[];
  codeUrl?: string;
  liveUrl?: string;
};

export const SOURCED: Project = {
  slug: 'sourced-ai',
  title: 'Sourced AI',
  tagline: 'An agentic AI research agent that shows its evidence and checks whether it fits you.',
  summary:
    'Answers questions about type 2 diabetes medications from a hand-picked library of clinical guidelines, drug monographs and trials, with two grades on every claim.',
  problem:
    'People on medication have more questions than a short appointment can cover, and the answers they find online are confident but unsourced. A search result or a general chatbot rarely says how strong the evidence is, and never whether the study behind it included someone like them.',
  built: [
    'A nine-step typed pipeline where the model handles language and explicit rules make every decision about grades, fit and whether to answer.',
    'A research agent that plans a hybrid search, then takes up to seven actions: re-searching the library, checking who a study enrolled, querying PubMed and Health Canada safety alerts, or asking the user for a missing detail.',
    'Dual grading: evidence strength from study design on a 0–7 ladder, and personal fit from eight weighted rules comparing the user’s profile with each study’s enrolled population.',
    'Safety as rules around the model: an emergency screen before any model call, identifier scrubbing, no-advice filters and a fixed scope.',
    'Step-by-step run records and a first-repairing-prefix attribution method that replays corrected runs to find where an error started, not just where it showed up.',
  ],
  stack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Claude', 'Voyage AI', 'Supabase', 'pgvector'],
  liveUrl: 'https://www.sourcedai.app/',
};

export const PROJECTS: Project[] = [
  {
    slug: 'nba-analytics',
    title: 'NBA Analytics Platform',
    tagline: 'Game outcome and over/under predictions built on data since 2007–08.',
    summary:
      'An end-to-end sports analytics platform that predicts NBA game outcomes and totals, with a Flask web app and CLI for daily predictions and expected-value calculations.',
    problem:
      'Sportsbook lines bundle a lot of information, but it is hard to tell when a line is mispriced without a model that learns from history and an honest expected-value calculation.',
    built: [
      'Data pipeline combining historical team statistics and sportsbook odds from 2007–08 to the present.',
      'TensorFlow and XGBoost models for moneyline outcomes and over/under totals.',
      'A Flask web app and CLI that produce daily predictions with expected value for each pick.',
    ],
    stack: ['Python', 'TensorFlow', 'XGBoost', 'Flask', 'SQLite', 'Pandas'],
    codeUrl: 'https://github.com/AkhilV30/NBA-Analytics-Platform',
  },
  {
    slug: 'predictive-maintenance',
    title: 'Industrial Predictive Maintenance',
    tagline: 'Forecasting equipment failure before it stops the line.',
    summary:
      'A production-style ML system for forecasting equipment failures in manufacturing, targeting a 35–45% reduction in unplanned downtime.',
    problem:
      'Unplanned downtime is one of the most expensive events in manufacturing. Sensor data is streaming in constantly, but turning it into timely, trustworthy failure warnings needs both good models and solid infrastructure.',
    built: [
      'Kafka-based streaming ingestion of equipment sensor data.',
      'LSTM and Random Forest models for failure forecasting.',
      'A FastAPI inference service with real-time dashboards.',
      'Automated MLOps retraining pipelines with MLflow and Airflow, packaged with Docker.',
    ],
    stack: ['Python', 'PyTorch', 'Kafka', 'FastAPI', 'MLflow', 'Docker', 'Airflow'],
    codeUrl: 'https://github.com/AkhilV30/industrial-predictive-maintenance',
  },
  {
    slug: 'housing-pipeline',
    title: 'Canadian Housing Pipeline',
    tagline: 'Cloud ETL across 45 Canadian cities, provisioned as code.',
    summary:
      'An ETL pipeline processing Canadian housing data across 45 cities on Google Cloud, with every resource provisioned through Terraform.',
    problem:
      'Housing data across Canadian cities is scattered and inconsistent. Analysing it at scale needs a repeatable pipeline and infrastructure that can be rebuilt from scratch.',
    built: [
      'Terraform modules that provision GCS, Dataproc and BigQuery resources.',
      'A PySpark transformation job that cleans and standardises data across 45 cities.',
      'Loading into BigQuery for analysis.',
    ],
    stack: ['Python', 'PySpark', 'Terraform', 'GCP', 'BigQuery', 'Dataproc'],
    codeUrl: 'https://github.com/AkhilV30/Canadian-Housing-Pipeline',
  },
];

export const ALL_PROJECTS = [SOURCED, ...PROJECTS];
