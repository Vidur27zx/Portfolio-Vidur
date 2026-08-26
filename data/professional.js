export const portraitConfig = {
  src: './assets/images/vidur-portrait.png',
  alt: 'Portrait of Vidur Ramachandran',
};

export const currentEngagements = [
  {
    id: 'iagents',
    company: 'iAgents',
    engagement: 'Product Operations & Acting Product Manager',
    summary: 'Supporting two iAgents workstreams: setting SOPs for an e-commerce operating-system service tailored to individual clients, and helping keep product work moving on a large marketplace-client engagement while capturing delivery learnings.',
    cardSummary: 'E-commerce service SOPs plus product execution support for a marketplace-client engagement.',
    helpingWith: 'SOP design for a client-tailored e-commerce operating-system service; product coordination, requirements, workflow follow-through and delivery learnings for a marketplace client.',
    artifacts: ['Service SOPs', 'Product coordination', 'Requirements', 'Delivery learnings'],
    status: 'Current',
    clientSensitive: true,
  },
  {
    id: 'broadmind',
    company: 'Broadmind Technologies Pvt. Ltd.',
    engagement: 'Product & AI Systems Consultant',
    summary: 'Co-designing an Agency OS through GoHighLevel or a custom setup—connecting website journeys, AI agents, calls, CRM structures and automations into a usable operating system for agency clients.',
    cardSummary: 'Agency OS design across AI agents, calls, website flows and GoHighLevel or custom automations.',
    helpingWith: 'Agency OS system design, AI-agent setup, call and workflow automations, website-connected journeys and flexible implementation through GoHighLevel or custom systems.',
    artifacts: ['Agency OS', 'AI agents', 'Calls & automations', 'GoHighLevel / custom systems'],
    status: 'Current',
  },
  {
    id: 'saathi',
    company: 'Saathi',
    engagement: 'Product AI Consultant — Part-time',
    summary: 'Beginning a part-time Product AI consulting engagement in September 2026, with scope around AI architecture and product-feature thinking. Public detail will follow once the work is appropriate to share.',
    cardSummary: 'Upcoming part-time work on AI architecture and product-feature thinking.',
    helpingWith: 'Product AI support focused on AI architecture and feature thinking, with the detailed scope to be shaped through the engagement.',
    artifacts: ['AI architecture', 'Product features', 'Product feedback'],
    status: 'Starting Sep ’26',
    startDate: '2026-09-01T00:00:00+05:30',
  },
];

export function getEngagementStatus(engagement, now = new Date()) {
  if (!engagement.startDate) return engagement.status;
  return now >= new Date(engagement.startDate) ? 'Current' : engagement.status;
}

export const quickViews = {
  deloitte: {
    eyebrow: 'Deloitte USI · Enterprise data workflow',
    title: 'From recurring failures to earlier validation.',
    problem: 'Recurring ingestion and transformation failures were slow to isolate across large, interconnected customer-data workflows.',
    role: 'Associate Analyst supporting investigation, data validation, failure-pattern analysis and operational documentation.',
    did: 'Used SQL-based audits to investigate schema mismatches, null propagation and upstream delays; contributed to Python-based pre-ingestion validation, stakeholder communication, QA/UAT validation and repeatable SOPs and runbooks.',
    outcome: 'Contributed to a 28% improvement in average incident-resolution time across the supported workflow.',
    status: 'Enterprise work',
    visual: 'data-flow',
  },
  corpsim: {
    eyebrow: 'CorpSim AI · Functional prototype',
    title: 'Turning an open-ended idea into something people could actually try.',
    problem: 'Corporate readiness is hard to practise through static content; the core experience needed to be tangible before a larger platform could be scoped.',
    role: 'Translated a founder-led direction into product framing, scenario flows, a functional prototype and a proposed future architecture.',
    did: 'Mapped the experience from virtual first day through decisions and feedback, then made the scoring concept testable in a prototype.',
    outcome: 'A functional prototype that communicates the product direction. Future production infrastructure remains proposed, not implemented.',
    status: 'Functional prototype',
    visual: 'corpsim',
  },
  automation: {
    eyebrow: 'Deloitte USI · LG Brazil case study',
    title: 'Python validation for earlier exception checks.',
    problem: 'Data-quality issues needed to be identified before they travelled further through the LG Brazil customer-data workflow.',
    role: 'Associate Analyst supporting validation, investigation and operational documentation at Deloitte USI.',
    did: 'Contributed to Python-based validation automation and SQL-led checks to filter and verify live data before downstream ingestion.',
    outcome: 'A Deloitte case-study artifact showing how earlier validation could make exception handling more structured. It is not presented as a standalone production system.',
    status: 'Deloitte USI · LG Brazil case study',
    visual: 'automation',
  },
  batua: {
    eyebrow: 'Batua · Product concept',
    title: 'Making personal finance feel less fragmented.',
    problem: 'Everyday money decisions are scattered across accounts, cards, balances and unclear financial-health signals.',
    role: 'Self-directed product concept — product strategy, UX framing and feature thinking.',
    did: 'Framed a clearer finance layer around account visibility, spending context, financial health and decision-support flows.',
    outcome: 'A documented product concept and wireframe direction. It is not presented as a launched product.',
    status: 'Product concept',
    visual: 'batua',
  },
  saathi: {
    eyebrow: 'Saathi · Product interview exercise',
    title: 'A small exercise in product thinking.',
    problem: 'Prepared for an interview conversation to show how I approach an unfamiliar product problem. It was not a critique of, or proposal for, Saathi’s existing product.',
    role: 'Candidate-led interview exercise, separate from the upcoming Product AI consulting engagement.',
    did: 'Used the existing product only as context, then shared a few early journey observations and exploratory feature/design sketches as examples of my process.',
    outcome: 'A respectful interview artifact—not client work, a product recommendation, or a claim of ownership. Saathi’s product and direction remain theirs.',
    status: 'Interview exercise',
    visual: 'saathi',
  },
};

export const portfolioProjects = [
  {
    id: 'deloitte',
    number: '01',
    category: 'professional-work',
    type: 'Deloitte USI · Enterprise work',
    title: 'From recurring failures to <em>earlier validation.</em>',
    description: 'One Deloitte case bringing together SQL-led investigation, Python validation support, stakeholder communication and the documentation behind a more repeatable response.',
    tags: ['Deloitte USI', 'SQL', 'Python validation', 'QA / UAT', 'SOPs & runbooks'],
    metrics: [
      { value: '18M+', label: 'records analysed' },
      { value: '28%', label: 'faster incident resolution' },
    ],
    trail: ['Investigate the data flow', 'Coordinate with stakeholders', 'Validate fixes through QA / UAT', 'Document SOPs & runbooks'],
    featured: true,
  },
  {
    id: 'deloitte-pipeline',
    number: '02',
    category: 'professional-work',
    type: 'Deloitte USI · LG Brazil · Case study',
    title: 'Pipeline Python scripts for <em>earlier exception checks.</em>',
    description: 'A short preview of an anonymised validation-workflow case study from my Deloitte work.',
    tags: ['Python', 'Pandas', 'SQL', 'Exception checks'],
    signal: 'Deloitte case study · data quality · repeatable validation',
    detailUrl: '/finmonitor',
    detailLabel: 'Read case study',
    isCaseStudyLink: true,
  },
  {
    id: 'corpsim',
    number: '01',
    category: 'prototypes',
    type: 'Product prototype',
    title: 'CorpSim: turning an idea into something people can <em>try.</em>',
    description: 'A functional corporate-readiness simulation that made a founder-led product direction tangible.',
    tags: ['Product', 'AI', 'Prototype'],
    signal: 'Product framing · scenario flows · functional prototype',
    externalUrl: 'https://corp-sim-zeta.vercel.app/',
    externalLabel: 'Try prototype',
  },
  {
    id: 'batua',
    number: '02',
    category: 'prototypes',
    type: 'Product concept',
    title: 'Batua: a clearer layer for <em>money decisions.</em>',
    description: 'A personal-finance concept for a more understandable view of balances, spending and financial health.',
    tags: ['FinTech', 'UX strategy', 'Product design'],
    signal: 'Product concept · strategy and wireframe direction',
    externalUrl: 'https://batua-prd.vercel.app/',
    externalLabel: 'Try prototype',
  },
];

export const portfolioProjectGroups = [
  {
    id: 'professional-work',
    number: '01',
    title: 'Professional work',
    description: 'Work completed inside teams and client environments, presented at the level that can be responsibly shared.',
  },
  {
    id: 'prototypes',
    number: '02',
    title: 'Product prototypes',
    description: 'Self-directed concepts and functional prototypes—useful evidence of how I frame and test an idea, not client delivery.',
  },
];

export const experienceEntries = [
  {
    company: 'EMELEX Business Solutions',
    period: 'SEP 2025 — JUN 2026',
    role: 'Founder’s Office Associate — Product',
    context: 'Early-stage product and operations work across PI DOT and AXIOM Creative Studio.',
    highlights: [
      'Partnered with the founder to turn open-ended product, operations and marketing briefs into structured plans.',
      'Reviewed product flows from customer and client perspectives, sharing usable feedback with freelance developers.',
      'Created SOPs and documentation to turn ad hoc work into repeatable systems.',
    ],
    word: 'FOUNDER',
    tone: 'startup',
  },
  {
    company: 'Deloitte USI',
    period: 'FEB 2024 — JUN 2025',
    role: 'Associate Analyst — Engineering Support / Developer',
    context: 'Enterprise data-platform support across customer-data ingestion, validation and operational reliability.',
    highlights: [
      'Investigated recurring pipeline failures using SQL audits and root-cause analysis across customer-data workflows.',
      'Communicated investigation context and validation findings with engineering, product and operations stakeholders.',
      'Supported QA and UAT validation of fixes, then documented repeatable SOPs and runbooks for support workflows.',
    ],
    word: 'SCALE',
    tone: 'deloitte',
  },
  {
    company: 'Acumen Connect',
    period: 'JAN 2023 — FEB 2024',
    role: 'Product Intern → Product Development Associate',
    context: 'Early-stage startup product and operations work with broad ownership across the product lifecycle.',
    highlights: [
      'Supported product requirements, structured tasks and feature-validation scenarios for freelance developers.',
      'Converted recurring operational fixes into 6+ documented SOPs, improving interdepartmental coordination by 15%.',
      'Owned a range of product and operations tasks in a fast-moving startup environment with limited guidance.',
    ],
    word: 'STARTUP',
    tone: 'acumen',
  },
];
