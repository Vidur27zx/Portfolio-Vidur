import { homeSystems, homeAboutTags } from '../../data/systems.js';
import { homeExperience } from '../../data/experience.js';
import { homeImpactRows } from '../../data/metrics.js';
import { homeProjectPreview } from '../../data/projects.js';
import { escapeHtml } from '../utils.js';
import { toggleImpact } from '../modules/accordion.js';
import { initExpCards } from '../modules/cards.js';
import { initMiniCanvas } from '../canvas/miniCanvas.js';

let initialized = false;

function renderSystems() {
  const container = document.getElementById('homeSystemsGrid');
  if (!container) {
    return;
  }

  container.innerHTML = homeSystems
    .map(
      (item) => `<div class="sys-item"><div class="sys-icon">${escapeHtml(item.icon)}</div><div class="sys-name">${item.name}</div><div class="sys-detail">${item.detail}</div></div>`,
    )
    .join('');
}

function renderAboutTags() {
  const container = document.getElementById('homeAboutTags');
  if (!container) {
    return;
  }

  container.innerHTML = homeAboutTags.map((tag) => `<span class="about-tag">${tag}</span>`).join('');
}

function renderExperience() {
  const container = document.getElementById('homeExperienceGrid');
  if (!container) {
    return;
  }

  container.innerHTML = homeExperience
    .map((item) => {
      const details = item.highlights.map((line) => `<li>${line}</li>`).join('');
      const accent = item.accent === 'green' ? ' home-exp-green' : item.accent ? ' home-exp-accent' : '';
      return `<div class="exp-card${accent}"><div class="exp-corner"></div><div class="exp-company">${item.company}</div><div class="exp-role">${item.role}</div><div class="exp-period">${item.period}</div><div class="exp-details"><ul>${details}</ul></div></div>`;
    })
    .join('');
}

function renderImpact() {
  const container = document.getElementById('homeImpactList');
  if (!container) {
    return;
  }

  container.innerHTML = homeImpactRows
    .map(
      (row) => `<div class="impact-row"><div class="impact-row-head"><div class="impact-row-num">${row.value}<span class="impact-pct">${row.suffix}</span></div><div class="impact-row-info"><div class="impact-row-title">${row.title}</div><div class="impact-row-meta">${row.meta}</div></div><div class="impact-row-arrow">+</div></div><div class="impact-row-body"><p>${row.body}</p></div></div>`,
    )
    .join('');

  container.querySelectorAll('.impact-row').forEach((row) => {
    row.addEventListener('click', () => toggleImpact(row));
  });
}

function renderHomeProjectPreview() {
  const container = document.getElementById('homeProjectPreview');
  if (!container) {
    return;
  }

  container.innerHTML = homeProjectPreview
    .map(
      (item) => `<div class="proj-item"><div class="proj-item-title">${item.title}</div><div class="proj-item-desc">${item.desc}</div><div class="p-tags">${item.tags
        .map((tag) => `<span class="p-tag">${tag}</span>`)
        .join('')}</div></div>`,
    )
    .join('');
}



export function initHomePage() {
  if (initialized) {
    initMiniCanvas();
    return;
  }

  renderSystems();
  renderAboutTags();
  renderExperience();
  renderImpact();
  renderHomeProjectPreview();
  initExpCards();
  initMiniCanvas();
  initialized = true;
}
