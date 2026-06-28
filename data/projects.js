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
    id: 'mesh23',
    statusDot: 'building',
    status: 'Prototype Built',
    title: 'Mesh23',
    sub: 'Customer Intelligence & Journey Platform',
    desc: 'Mesh23 is a customer intelligence and journey platform for D2C brands that unifies commerce, messaging, ads, and customer data into profiles, segments, and analytics. It helps teams build AI-assisted WhatsApp, Email, SMS, Web Push, and Meta audience plans, then monitor performance across clicks, conversions, coupons, and revenue.',
    tags: ['Customer Intelligence', 'D2C', 'Omnichannel', 'Analytics'],
    action: { type: 'link', href: 'https://mesh-23-codex.vercel.app/', text: 'Learn More' },
    hero: true,
  },
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
        status: 'Product Vision',
        title: 'Saathi',
        sub: 'A personal finance companion for safer decisions and clearer money habits.',
        desc: 'A finance product concept for helping users understand money choices, organize financial context, and move through everyday decisions with more confidence and clarity.',
        tags: ['FinTech', 'Personal Finance', 'Product Strategy', 'User Flows'],
        action: { type: 'link', href: 'https://saathi-prd.vercel.app/', text: 'PRD Doc & Wireframe' },
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
        id: 'sixt4-creations',
        statusDot: 'building',
        status: 'In Progress',
        title: 'Sixt4 Creations',
        sub: 'Website development - in progress',
        desc: 'Building and refining the website experience, structure, and digital presence for the brand.',
        tags: ['Website Development', 'Web Presence', 'Client Work'],
        action: { type: 'link', href: 'https://sixt4creations-wireframe.vercel.app/', text: 'View Wireframe' },
      },
      {
        id: 'broadmind-technologies',
        statusDot: 'building',
        status: 'Underway',
        title: 'Broadmind Technologies Pvt Ltd India',
        sub: 'GoHighLevel agency ecosystem build - underway',
        desc: 'Working on a GoHighLevel-powered agency operating system covering CRM setup, AI workflows, automations, funnels, client onboarding, and backend execution flows.',
        tags: ['GoHighLevel', 'CRM', 'Automation', 'Agency Systems'],
      },
      {
        id: 'bombay-central',
        statusDot: 'live',
        status: 'Client Work',
        title: 'Bombay Central',
        sub: 'Social media marketing and content execution',
        desc: 'Contributed to social media strategy, scripts, shooting, editing, and Instagram page execution for brand visibility and content growth.',
        tags: ['Social Media', 'Content Strategy', 'Scripts', 'Editing'],
        action: { type: 'link', href: 'https://www.instagram.com/bombaycentrral.india/?hl=en', text: 'View Instagram' },
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
