import { projectsPageCards } from '../../data/projects.js';

let initialized = false;

function renderCard(card) {
  const rows = card.rows
    .map((row) => `<div class="pc-cs-row"><span class="pc-cs-lbl">${row.label}</span><span class="pc-cs-txt">${row.text}</span></div>`)
    .join('');

  const tags = card.tags.map((tag) => `<span class="pc-tag">${tag}</span>`).join('');
  const status = `<div class="pc-status"><span class="st-dot ${card.status.dot}"></span> ${card.status.text}</div>`;

  if (card.featured) {
    return `<div class="pc featured"><div class="pc-corner"></div><div><div class="pc-num">${card.num}</div><div class="pc-title">${card.title}</div><div class="pc-mini-cs">${rows}</div><div class="pc-tags">${tags}</div><div class="pc-feature-row">${status}<button class="lab-cta pc-feature-cta" data-route="${card.action.target}"><span class="rsq"></span> ${card.action.text}</button></div></div><div class="p-visual"><canvas id="projCanvas"></canvas></div></div>`;
  }

  return `<div class="pc"><div class="pc-corner"></div><div class="pc-num">${card.num}</div><div class="pc-title">${card.title}</div><div class="pc-mini-cs">${rows}</div><div class="pc-tags">${tags}</div>${status}</div>`;
}

export function initProjectsPage() {
  if (initialized) {
    return;
  }

  const container = document.getElementById('projectsGrid');
  if (container) {
    container.innerHTML = projectsPageCards.map(renderCard).join('');
    container.querySelectorAll('[data-route]').forEach((button) => {
      button.addEventListener('click', () => {
        const route = button.getAttribute('data-route');
        if (route && typeof window.showPage === 'function') {
          window.showPage(route);
        }
      });
    });
  }

  initialized = true;
}
