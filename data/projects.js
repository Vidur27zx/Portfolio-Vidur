export const homeProjectPreview = [
  {
    title: 'Financial Transaction Monitor',
    desc: 'Automated anomaly detection framework for transaction data.',
    tags: ['Python', 'SQL', 'BigQuery'],
  },
  {
    title: 'Customer Loan Behavior Analysis',
    desc: 'Cleaned & analyzed credit card spend data to identify loan acceptance drivers.',
    tags: ['Tableau', 'SQL'],
  },
  {
    title: 'Gen AI Job Application Tracker',
    desc: 'AI-powered automation tracker for job applications using n8n & GenAI.',
    tags: ['n8n', 'GenAI', 'Automation'],
  },
];

export const projectsPageCards = [
  {
    id: 'finmonitor',
    num: '01',
    title: 'Automated Financial Transaction<br>Monitoring Framework',
    rows: [
      {
        label: 'Problem',
        text: 'No automated quality gates — analysts manually reviewed records before compliance reporting, creating bottlenecks and error risk.',
      },
      {
        label: 'Approach',
        text: 'Designed rule-based anomaly detection using Python and SQL. Built exception logic to flag records violating thresholds before reaching reporting layers.',
      },
      {
        label: 'Outcome',
        text: 'Replaced manual review with automated detection — anomalies now surface before impacting downstream compliance reports.',
      },
    ],
    tags: ['Python', 'SQL', 'Rule-based Logic', 'Anomaly Detection'],
    status: { dot: 'done', text: 'Complete' },
    featured: true,
    action: { type: 'route', target: 'finmonitor', text: 'View Project Doc' },
  },
  {
    id: 'loan-analysis',
    num: '02',
    title: 'Customer Loan<br>Behavior Analysis',
    rows: [
      {
        label: 'Problem',
        text: 'Marketing team lacked clarity on which customer segments were most likely to accept personal loan offers.',
      },
      {
        label: 'Approach',
        text: 'Cleaned inconsistent credit card spend data, then ran exploratory analysis across income, education, and usage patterns using SQL and Tableau.',
      },
      {
        label: 'Outcome',
        text: 'Identified highest-value demographic segments for loan targeting, enabling more precise campaign decisions.',
      },
    ],
    tags: ['Tableau', 'SQL', 'Data Cleaning', 'EDA'],
    status: { dot: 'wip', text: 'In Progress' },
    featured: false,
  },
  {
    id: 'job-automation',
    num: '03',
    title: 'GenAI Job Application<br>Automation System',
    rows: [
      {
        label: 'Problem',
        text: 'Tracking dozens of job applications manually — statuses fell through the cracks and follow-ups were consistently missed.',
      },
      {
        label: 'Approach',
        text: 'Built an n8n automation that logs applications, updates statuses via AI parsing, and triggers follow-up reminders at the right intervals.',
      },
      {
        label: 'Outcome',
        text: 'Full application-to-follow-up automation with AI-generated insights on application patterns. Currently live for personal use.',
      },
    ],
    tags: ['n8n', 'GenAI', 'Automation', 'Workflow Design'],
    status: { dot: 'wip', text: 'In Progress' },
    featured: false,
  },
];

export const visionLabsCards = [
  {
    id: 'mesh23',
    statusDot: 'live',
    status: 'Active',
    title: 'Mesh23',
    sub: 'Freelance AI Automation Consultancy',
    desc: 'Freelancing via Mesh23 — delivering AI-driven workflow optimization for SMB clients. Combining n8n, GenAI, and process design to eliminate manual overhead and streamline operations.',
    tags: ['n8n', 'GenAI', 'Workflow Automation', 'SMB'],
    action: { type: 'link', href: 'https://mesh23-web.vercel.app/', text: 'Learn More' },
    hero: true,
  },
  {
    id: 'corpsim',
    statusDot: 'live',
    status: 'Prototype Built',
    title: 'CorpSim AI',
    sub: 'Corporate Readiness Simulation Platform',
    desc: "AI-powered corporate simulation platform — a prototype built from a product person's POV, inspired by the founder's vision for what AI-native corporate readiness training could look like. Covers the full experience: VDE, CRS scoring engine, and stakeholder simulation powered by Claude.",
    tags: ['AI / LLM', 'B2B SaaS', 'EdTech', 'Product Prototype'],
    action: { type: 'route', target: 'corpsim', text: 'View Concept Doc' },
  },
  {
    id: 'validateidea',
    statusDot: 'live',
    status: 'Prototype Built',
    title: 'Validate Your<br>Idea',
    sub: 'AI-Powered Idea Validation Platform',
    desc: "Type in your idea, select your industry and target audience — then run a deep multi-source analysis across forums, communities, and the web to surface existing competitors, identify what they're missing, and shape your differentiation before you build.",
    tags: ['AI / LLM', 'Market Research', 'Startup Tools', 'GenAI'],
    action: { type: 'route', target: 'validateidea', text: 'View Concept Doc' },
  },
  {
    id: 'hrsaas',
    statusDot: 'concept',
    status: 'Concept Phase',
    title: 'HR SaaS',
    sub: 'People Operations Platform',
    desc: 'Lightweight HR operations platform for early-stage startups — covering onboarding workflows, documentation management, and headcount planning without enterprise overhead.',
    tags: ['SaaS', 'HR Tech', 'Workflows'],
    action: { type: 'route', target: 'hrsaas', text: 'View Concept Doc' },
  },
];
