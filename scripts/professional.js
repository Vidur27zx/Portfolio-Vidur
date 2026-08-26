import { currentEngagements, experienceEntries, getEngagementStatus, portfolioProjectGroups, portfolioProjects, portraitConfig, quickViews } from '../data/professional.js';

const NAV_OFFSET = 88;
let previouslyFocusedElement = null;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function setProfessionalMetadata() {
  document.title = 'Vidur Ramachandran — Product Analysis, Product Management & Founder’s Office';
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = 'Portfolio of Vidur Ramachandran — product analysis, business analysis, product management and founder’s office work across Deloitte, startups and independent engagements.';
  }
}

function initialiseHeroContent() {
  const hero = document.querySelector('.pro-v2 .pro-hero');
  if (!hero) return;

  hero.querySelector('.pro-eyebrow').textContent = 'PRODUCT OPERATIONS · PRODUCT SYSTEMS';
  hero.querySelector('h1').innerHTML = 'I translate complex business and product requirements into <em>clear, reliable execution.</em>';
  hero.querySelector('.pro-hero-description').textContent = 'Product-minded operator across enterprise systems, early-stage teams and independent engagements — from investigation and requirements to lean prototypes and repeatable workflows.';
  hero.querySelector('.pro-positioning').textContent = 'Product Analyst · Business Analyst · Associate PM · Product Manager · Founder’s Office';
  hero.querySelector('.pro-credibility').textContent = 'Deloitte USI · Startup product work · Independent engagements';
  hero.querySelector('.pro-button-primary').innerHTML = 'View work <span>↘</span>';
  hero.querySelector('.pro-hero-bottom > span:nth-child(2)').textContent = 'OPEN TO PA · BA · APM · PM · FOUNDER’S OFFICE';
  const currentWorkButton = hero.querySelector('.pro-currently-building');
  if (currentWorkButton) currentWorkButton.innerHTML = 'CURRENT WORK <b>+</b>';
  const contactCopy = document.querySelector('.pro-v2 .pro-contact > p:not(.pro-eyebrow)');
  if (contactCopy) contactCopy.textContent = 'Open to Product Analyst, Business Analyst, Associate PM, Product Manager and Founder’s Office opportunities.';
}

function initialiseModePreference() {
  try {
    sessionStorage.setItem('vidur-portfolio-mode', 'professional');
  } catch (_error) {
    // Browsing does not depend on session storage.
  }
}

function initialiseMenu() {
  const button = document.querySelector('.pro-v2 .pro-menu-toggle');
  const panel = document.querySelector('.pro-v2 .pro-nav-content');
  if (!button || !panel) return;

  const close = () => {
    button.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
  };

  button.addEventListener('click', () => {
    const willOpen = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(willOpen));
    panel.classList.toggle('is-open', willOpen);
  });

  panel.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', close));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) close();
  });
}

function initialiseScrollState() {
  const nav = document.querySelector('.pro-v2 .pro-nav');
  const progress = document.querySelector('.pro-v2 .pro-scroll-progress span');
  const portrait = document.querySelector('.pro-v2 .pro-portrait-placeholder');
  const navLinks = [...document.querySelectorAll('.pro-v2 .pro-nav-links a[href^="#"]')];
  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const update = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const amount = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
    document.documentElement.style.setProperty('--scroll-progress', `${amount}%`);
    nav?.classList.toggle('is-scrolled', window.scrollY > 14);
    if (portrait && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      portrait.style.setProperty('--portrait-y', `${Math.min(10, window.scrollY * .018)}px`);
    }
  };

  update();
  window.addEventListener('scroll', update, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    navLinks.forEach((link) => {
      link.classList.toggle('is-current', link.getAttribute('href') === `#${current.target.id}`);
    });
  }, { rootMargin: `-${NAV_OFFSET}px 0px -55% 0px`, threshold: [0.08, 0.28] });
  observedSections.forEach((section) => observer.observe(section));
  return progress;
}

function initialiseAnchorOffsets() {
  document.querySelectorAll('.pro-v2 a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      history.replaceState(null, '', link.getAttribute('href'));
    });
  });
}

function initialisePortrait() {
  const target = document.querySelector('#portraitTarget');
  if (!target || !portraitConfig.src) return;

  const image = new Image();
  image.src = portraitConfig.src;
  image.alt = portraitConfig.alt;
  image.decoding = 'async';
  image.addEventListener('load', () => {
    target.replaceChildren(image);
    target.classList.add('has-image');
    target.removeAttribute('role');
    target.removeAttribute('aria-label');
  });
}

function initialisePortraitModeToggle() {
  const modeToggle = document.querySelector('.pro-v2 .pro-mode-link');
  const stage = document.querySelector('#portraitStage');
  if (!modeToggle || !stage) return;

  modeToggle.classList.add('pro-photo-mode-toggle');
  modeToggle.setAttribute('aria-label', 'Switch from Professional to Playground');
  modeToggle.innerHTML = '<span class="pro-mode-active">Professional</span><span class="pro-mode-next">Playground <b>↗</b></span>';
  stage.append(modeToggle);

  const navContent = document.querySelector('.pro-v2 .pro-nav-content');
  if (navContent && !navContent.querySelector('.pro-nav-playground-link')) {
    const navEntry = document.createElement('a');
    navEntry.className = 'pro-nav-playground-link pro-playground-link';
    navEntry.href = '/playground';
    navEntry.innerHTML = 'Playground <span>↗</span>';
    navContent.append(navEntry);
  }
}

function initialiseRotatingPhrase() {
  const target = document.querySelector('.pro-v2 .pro-phrase-rotator strong');
  if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const values = ['structure', 'prototype', 'decision', 'execution'];
  let index = 0;
  window.setInterval(() => {
    target.classList.add('is-changing');
    window.setTimeout(() => {
      index = (index + 1) % values.length;
      target.textContent = values[index];
      target.classList.remove('is-changing');
    }, 410);
  }, 4100);
}

function initialiseProofPopovers() {
  const popover = document.querySelector('#proofPopover');
  const messages = {
    records: 'Analysed enterprise customer-data workflows during investigation and troubleshooting work at Deloitte USI.',
    resolution: 'Contributed to clearer investigation paths and runbooks that improved average incident-resolution time by 28%.',
  };
  if (!popover) return;

  const close = () => {
    popover.hidden = true;
    document.querySelectorAll('.pro-v2 [data-proof]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
  };

  document.querySelectorAll('.pro-v2 [data-proof]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = !popover.hidden && button.getAttribute('aria-expanded') === 'true';
      close();
      if (isOpen) return;
      popover.innerHTML = `${escapeHtml(messages[button.dataset.proof])} <a href="#work">View Deloitte case →</a>`;
      popover.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    });
  });
  document.addEventListener('click', (event) => {
    if (!popover.hidden && !popover.contains(event.target)) close();
  });
}

function initialiseMethodCards() {
  const cards = [...document.querySelectorAll('.pro-v2 .pro-method-card')];
  cards.forEach((card) => {
    const trigger = card.querySelector('.pro-method-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      cards.forEach((other) => {
        const open = other === card;
        other.classList.toggle('is-open', open);
        other.querySelector('.pro-method-trigger')?.setAttribute('aria-expanded', String(open));
      });
    });
  });
}

function modalElements() {
  return {
    root: document.querySelector('#proModal'),
    dialog: document.querySelector('#proModal .pro-modal-dialog'),
    eyebrow: document.querySelector('#modalEyebrow'),
    title: document.querySelector('#modalTitle'),
    visual: document.querySelector('#modalVisual'),
    problem: document.querySelector('#modalProblem'),
    role: document.querySelector('#modalRole'),
    did: document.querySelector('#modalDid'),
    outcome: document.querySelector('#modalOutcome'),
    status: document.querySelector('#modalStatus'),
  };
}

function closeModal() {
  const { root } = modalElements();
  if (!root || root.hidden) return;
  root.hidden = true;
  document.body.style.removeProperty('overflow');
  previouslyFocusedElement?.focus?.();
  previouslyFocusedElement = null;
}

function openModal(view) {
  const elements = modalElements();
  if (!elements.root || !view) return;
  previouslyFocusedElement = document.activeElement;
  elements.eyebrow.textContent = view.eyebrow;
  elements.title.textContent = view.title;
  elements.problem.textContent = view.problem;
  elements.role.textContent = view.role;
  elements.did.textContent = view.did;
  elements.outcome.textContent = view.outcome;
  elements.status.textContent = view.status;
  elements.visual.className = `pro-modal-visual visual-${view.visual || 'data-flow'}`;
  elements.root.hidden = false;
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => elements.dialog.focus(), 0);
}

function initialiseModal() {
  const { root, dialog } = modalElements();
  if (!root || !dialog) return;
  document.querySelectorAll('.pro-v2 [data-quick-view]').forEach((button) => {
    button.addEventListener('click', () => openModal(quickViews[button.dataset.quickView]));
  });
  root.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (root.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')]
      .filter((element) => !element.hidden);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function renderPortfolioProjects() {
  const grid = document.querySelector('.pro-v2 .pro-projects');
  if (!grid) return;
  const section = grid.closest('.pro-selected-work');
  const eyebrow = section?.querySelector('.pro-eyebrow');
  const heading = section?.querySelector('h2');
  const introduction = section?.querySelector('.pro-heading-split > p');
  if (eyebrow) eyebrow.textContent = '01 — WORK & ARTIFACTS';
  if (heading) heading.innerHTML = 'Work I can <em>show clearly.</em>';
  if (introduction) introduction.textContent = 'Professional work first, then prototypes that show how I frame and test an idea.';

  grid.classList.add('pro-work-register');
  const renderCard = (project) => {
    const metrics = project.metrics?.length
      ? `<dl class="pro-work-metrics">${project.metrics.map((metric) => `<div><dt>${escapeHtml(metric.value)}</dt><dd>${escapeHtml(metric.label)}</dd></div>`).join('')}</dl>`
      : `<p class="pro-work-signal">${escapeHtml(project.signal)}</p>`;
    const trail = project.trail?.length
      ? `<ol class="pro-decision-trail">${project.trail.map((step, index) => `<li><span>0${index + 1}</span>${escapeHtml(step)}</li>`).join('')}</ol>`
      : '';
    const detailAction = project.detailUrl
      ? `<a class="pro-work-external" href="${escapeHtml(project.detailUrl)}">${escapeHtml(project.detailLabel || 'Read case study')} <span>→</span></a>`
      : '';
    const externalAction = project.externalUrl
      ? `<a class="pro-work-external" href="${escapeHtml(project.externalUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.externalLabel)} <span>↗</span></a>`
      : '';

    const actions = detailAction || externalAction ? `<div class="pro-work-actions">${detailAction}${externalAction}</div>` : '';
    return `<article class="pro-work-card ${project.featured ? 'is-featured' : ''} ${project.isCaseStudyLink ? 'is-case-study-link' : ''}">
      <div class="pro-work-card-meta"><span>${escapeHtml(project.number)}</span><span>${escapeHtml(project.type)}</span></div>
      <div class="pro-work-card-content">
        <h3>${project.title}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="pro-work-tags">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      </div>
      ${trail}
      <div class="pro-work-card-bottom">${metrics}${actions}</div>
    </article>`;
  };

  grid.innerHTML = portfolioProjectGroups.map((group) => {
    const projects = portfolioProjects.filter((project) => project.category === group.id);
    if (!projects.length) return '';
    return `<section class="pro-work-group" aria-labelledby="work-group-${escapeHtml(group.id)}">
      <div class="pro-work-group-heading"><p>${escapeHtml(group.number)}</p><div><h3 id="work-group-${escapeHtml(group.id)}">${escapeHtml(group.title)}</h3><span>${escapeHtml(group.description)}</span></div></div>
      <div class="pro-work-group-cards">${projects.map(renderCard).join('')}</div>
    </section>`;
  }).join('');
}

function renderExperience() {
  const section = document.querySelector('.pro-v2 .pro-experience-section');
  const list = section?.querySelector('.pro-history-list');
  if (!section || !list) return;

  const eyebrow = section.querySelector('.pro-eyebrow');
  const heading = section.querySelector('h2');
  if (eyebrow) eyebrow.textContent = '04 — EXPERIENCE';
  if (heading) heading.innerHTML = 'Experience across <em>product & operations.</em>';

  list.innerHTML = experienceEntries.map((entry) => `<article class="pro-history-card pro-history-${escapeHtml(entry.tone)}">
    <span class="pro-history-word" aria-hidden="true">${escapeHtml(entry.word)}</span>
    <p>${escapeHtml(entry.company)} <span>·</span> ${escapeHtml(entry.period)}</p>
    <h3>${escapeHtml(entry.role)}</h3>
    <p class="pro-history-context">${escapeHtml(entry.context)}</p>
    <ul>${entry.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join('')}</ul>
  </article>`).join('');
}

function renderCurrentEngagements() {
  const grid = document.querySelector('#currentEngagementGrid');
  if (!grid) return;
  const section = grid.closest('.pro-current-work');
  const eyebrow = section?.querySelector('.pro-eyebrow');
  const heading = section?.querySelector('h2');
  const introduction = section?.querySelector('.pro-heading-split > p');
  const rail = section?.querySelector('.pro-consultant-rail');
  if (section) section.id = 'independent';
  if (eyebrow) eyebrow.textContent = '03 — INDEPENDENT & PART-TIME WORK';
  if (heading) heading.innerHTML = 'Independent product work, <em>clearly scoped.</em>';
  if (introduction) introduction.textContent = 'Three current or upcoming engagements across marketplace product, AI systems and product consulting.';
  if (rail) rail.innerHTML = '<span>INDEPENDENT & PART-TIME</span><span>03 ENGAGEMENTS · 2026</span>';

  const saathi = currentEngagements.find((engagement) => engagement.id === 'saathi');
  const saathiStatus = saathi ? getEngagementStatus(saathi) : '';
  document.querySelectorAll('[data-saathi-hero-status]').forEach((element) => {
    element.textContent = saathiStatus;
  });
  grid.innerHTML = currentEngagements.map((engagement) => {
    const status = getEngagementStatus(engagement);
    const statusClass = status.startsWith('Starting') ? 'status-starting' : '';
    return `<button type="button" class="pro-current-card" data-engagement-id="${escapeHtml(engagement.id)}" aria-label="Open details for ${escapeHtml(engagement.company)}">
      <span class="pro-status ${statusClass}">${escapeHtml(status)}</span>
      <h3>${escapeHtml(engagement.company)}</h3>
      <p>${escapeHtml(engagement.engagement)}</p>
      <p class="pro-current-card-summary">${escapeHtml(engagement.cardSummary)}</p>
      <span>See engagement notes →</span>
    </button>`;
  }).join('');

  const nowList = document.querySelector('#nowPanel ul');
  if (nowList) {
    nowList.innerHTML = currentEngagements.map((engagement) => `<li><b>${escapeHtml(engagement.company)}</b><span>${escapeHtml(engagement.engagement)} · ${escapeHtml(getEngagementStatus(engagement))}</span></li>`).join('');
  }

  grid.querySelectorAll('[data-engagement-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const engagement = currentEngagements.find((item) => item.id === button.dataset.engagementId);
      if (!engagement) return;
      const status = getEngagementStatus(engagement);
      openModal({
        eyebrow: `Independent & part-time work · ${status}`,
        title: engagement.company,
        problem: engagement.summary,
        role: engagement.engagement,
        did: engagement.helpingWith,
        outcome: engagement.clientSensitive ? 'Client-sensitive engagement. Public detail is intentionally limited.' : 'Public detail is intentionally limited to maintain client confidence.',
        status,
        visual: 'data-flow',
      });
    });
  });
}

function initialiseIndependentNav() {
  const links = document.querySelector('.pro-v2 .pro-nav-links');
  if (!links || links.querySelector('a[href="#independent"]')) return;
  const link = document.createElement('a');
  link.href = '#independent';
  link.textContent = 'Independent';
  const experience = links.querySelector('a[href="#experience"]');
  links.insertBefore(link, experience || null);
}

function initialiseCurrentWorkPanel() {
  const button = document.querySelector('.pro-v2 .pro-currently-building');
  const panel = document.querySelector('#nowPanel');
  if (!button || !panel) return;
  const close = () => {
    panel.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  };
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = panel.hidden;
    panel.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
  });
  panel.querySelector('.pro-popover-close')?.addEventListener('click', close);
  document.addEventListener('click', (event) => {
    if (!panel.hidden && !panel.contains(event.target) && event.target !== button) close();
  });
}

function initialiseProjectCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cursor = document.querySelector('.pro-v2 .pro-project-cursor');
  if (!cursor) return;
  document.querySelectorAll('.pro-v2 .pro-project-visual').forEach((visual) => {
    visual.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
    visual.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
    visual.addEventListener('mousemove', (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    });
  });
}

function initialisePlaygroundTransition() {
  const wash = document.querySelector('.pro-v2 .pro-mode-wash');
  if (!wash) return;
  document.querySelectorAll('.pro-v2 .pro-playground-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.location.assign(link.href);
        return;
      }
      wash.classList.add('is-running');
      window.setTimeout(() => window.location.assign(link.href), 510);
    });
  });
}

export function initProfessionalPortfolio() {
  document.body.classList.add('professional-view');
  document.body.classList.remove('playground-view');
  setProfessionalMetadata();
  initialiseHeroContent();
  initialiseModePreference();
  renderPortfolioProjects();
  renderCurrentEngagements();
  renderExperience();
  initialiseIndependentNav();
  initialiseMenu();
  initialiseScrollState();
  initialiseAnchorOffsets();
  initialisePortrait();
  initialisePortraitModeToggle();
  initialiseRotatingPhrase();
  initialiseProofPopovers();
  initialiseMethodCards();
  initialiseModal();
  initialiseCurrentWorkPanel();
  initialiseProjectCursor();
  initialisePlaygroundTransition();
}
