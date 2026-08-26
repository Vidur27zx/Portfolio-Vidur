export const homeProjectPreview = [
  {
    title: 'Saathi',
    desc: 'A finance companion for safer money decisions and clearer personal finance.',
    tags: ['FinTech', 'Product Strategy'],
  },
  {
    title: 'Batua',
    desc: 'A safer, clearer personal finance layer for modern Indian users.',
    tags: ['FinTech', 'UX Strategy'],
  },
  {
    title: 'CorpSim AI',
    desc: 'Corporate readiness simulation platform built from a product POV.',
    tags: ['AI / LLM', 'Product Prototype'],
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
    id: 'corpsim',
    statusDot: 'building',
    status: 'Prototype Built',
    title: 'CorpSim AI',
    sub: 'Corporate Readiness Simulation Platform',
    desc: "AI-powered corporate simulation platform — a prototype built from a product person's POV, inspired by the founder's vision for what AI-native corporate readiness training could look like. Covers the full experience: VDE, CRS scoring engine, and stakeholder simulation powered by Claude.",
    tags: ['AI / LLM', 'B2B SaaS', 'EdTech', 'Product Prototype'],
    action: { type: 'route', target: 'corpsim', text: 'View Concept Doc' },
  },
  {
    id: 'validateidea',
    statusDot: 'building',
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
  {
    id: 'clinicbot',
    statusDot: 'concept',
    status: 'Concept Phase',
    title: 'ClinicBot',
    sub: 'Medication + Care Follow-Up Automation',
    desc: 'Patient reminder and follow-up automation for clinics using Telegram, Google Sheets, and n8n, with multilingual support, voice-note triage, doctor escalation, and pharmacy refill workflows.',
    tags: ['Healthcare Ops', 'n8n', 'Automation', 'Conversational AI'],
    action: { type: 'route', target: 'clinicbot', text: 'View Concept Doc' },
  },
];

const corpSimLabCard = visionLabsCards.find((card) => card.id === 'corpsim');
const automationSourceCard = projectsPageCards[0];

export const labsTabs = [
  {
    id: 'projects',
    label: 'Projects',
    cards: [
      {
        id: 'saathi',
        statusDot: 'live',
        status: 'PM Case Study',
        title: 'Saathi',
        sub: "A PM case study for SAATHI, an existing personal finance company and product.",
        desc: "This was not my product concept. It was created only for an interview conversation to show SAATHI's founder how I would approach their existing app as a PM: understanding the user journey, identifying possible feature improvements, and thinking through guidance, onboarding, and decision-support flows.",
        tags: ['Existing Company', 'PM Case Study', 'Feature Thinking', 'User Flows'],
        action: { type: 'link', href: 'https://saathi-prd.vercel.app/', text: 'View Case Study & Wireframe' },
      },
      {
        id: 'batua',
        statusDot: 'concept',
        status: 'Product Concept',
        title: 'Batua',
        sub: 'A safer, clearer personal finance layer for modern Indian users.',
        desc: 'A fintech product concept for tracking cards, balances, expenses, financial health, and money decisions across multiple accounts and instruments.',
        tags: ['FinTech', 'Personal Finance', 'UX Strategy', 'Product Design'],
        action: { type: 'link', href: 'https://batua-prd.vercel.app/', text: 'PRD Doc & Wireframe' },
      },
      {
        ...corpSimLabCard,
        hero: false,
      },
      {
        id: 'automation-flows',
        statusDot: automationSourceCard.status.dot === 'done' ? 'live' : 'building',
        status: automationSourceCard.status.text,
        title: 'Automation Pipeline / Flows Project',
        sub: automationSourceCard.title.replace(/<br>/g, ' '),
        desc: 'A compact monitoring flow for transaction data that flags anomalies and routes exceptions before reporting.',
        tags: automationSourceCard.tags,
        action: automationSourceCard.action,
      },
    ],
  },
  {
    id: 'freelance',
    label: 'Freelance',
    cards: [
      {
        id: 'iagents',
        statusDot: 'building',
        status: 'Current',
        title: 'iAgents',
        sub: 'Product Operations & Acting Product Manager',
        desc: 'Setting SOPs for a client-tailored e-commerce operating-system service, alongside product execution support and delivery learnings for a large marketplace-client engagement.',
        tags: ['Service SOPs', 'Product Operations', 'Marketplace', 'Client Work'],
      },
      {
        id: 'broadmind-technologies',
        statusDot: 'building',
        status: 'Current',
        title: 'Broadmind Technologies Pvt Ltd India',
        sub: 'Product & AI Systems Consultant',
        desc: 'Co-designing an Agency OS through GoHighLevel or a custom setup, connecting website journeys, AI agents, calls, CRM structures and automations for agency clients.',
        tags: ['Agency OS', 'AI Agents', 'GoHighLevel', 'Automations'],
      },
      {
        id: 'saathi',
        statusDot: 'concept',
        status: 'Starting Sep ’26',
        title: 'Saathi',
        sub: 'Part-time Product AI Consultant',
        desc: 'Beginning a part-time Product AI consulting engagement in September 2026, focused on AI architecture and product-feature thinking. Public detail will follow once appropriate to share.',
        tags: ['AI Architecture', 'Product Features', 'Product AI'],
      },
    ],
  },
  {
    id: 'personal',
    label: 'Personal',
    cards: [
      {
        id: 'vidur-life',
        statusDot: 'live',
        status: 'Personal Project',
        title: 'vidur.life',
        sub: 'My biggest project yet: rebuilding health and staying accountable in public.',
        desc: 'A personal digital space for making my health better, documenting the journey, and sharing progress openly so I stay consistent and accountable.',
        tags: ['Health', 'Accountability', 'Discipline', 'Personal Journey'],
        action: { type: 'link', href: 'https://www.instagram.com/vidur.life/?hl=en', text: 'View Instagram' },
      },
    ],
  },
];
