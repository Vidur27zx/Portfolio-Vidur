import { visionLabsCards } from '../../data/projects.js';

let initialized = false;

function renderAction(action) {
  if (!action) {
    return '';
  }

  if (action.type === 'link') {
    return `<a href="${action.href}" target="_blank" rel="noopener noreferrer" class="lab-cta"><span class="rsq"></span> ${action.text}</a>`;
  }

  return `<button class="lab-cta" data-route="${action.target}"><span class="rsq"></span> ${action.text}</button>`;
}

function renderCard(card) {
  const tags = card.tags.map((tag) => `<span class="lab-tag">${tag}</span>`).join('');
  const base = `<div class="lab-status"><span class="lb-dot ${card.statusDot}"></span> ${card.status}</div><div class="lab-title">${card.title}</div><div class="lab-sub">${card.sub}</div><div class="lab-desc">${card.desc}</div><div class="lab-tags">${tags}</div>${renderAction(card.action)}`;

  if (card.hero) {
    let visualHtml = `<div class="lab-visual"><canvas id="mesh23Canvas"></canvas></div>`;
    if (card.id === 'mesh23') {
      visualHtml = `<a href="${card.action.href || 'https://mesh-23-codex.vercel.app/'}" target="_blank" rel="noopener noreferrer" class="lab-visual" style="display: block; text-decoration: none; transition: transform 0.2s; cursor: pointer; padding: 0;">
        <img src="assets/images/mesh23.2.png" alt="Mesh23 Preview" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
      </a>`;
    }
    return `<div class="lab-card hero-card"><div class="lab-corner"></div><div>${base}</div><div>${visualHtml}</div></div>`;
  }

  return `<div class="lab-card"><div class="lab-corner"></div>${base}</div>`;
}

export function initVisionlabsPage() {
  if (initialized) {
    return;
  }

  const container = document.getElementById('visionLabsGrid');
  if (container) {
    container.innerHTML = visionLabsCards.map(renderCard).join('');
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
