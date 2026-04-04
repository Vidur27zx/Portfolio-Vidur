import { initRouter, showPage } from './router.js';
import { downloadResume, bindDataInlineEvents } from './utils.js';
import { toggleMenu, closeMenu, initNavigation } from './modules/navigation.js';
import { toggleImpact } from './modules/accordion.js';
import { toggleExpCard } from './modules/cards.js';
import { initScrollCta } from './modules/metrics.js';
import { initHomePage } from './pages/home.js';
import { initProjectsPage } from './pages/projects.js';
import { initVisionlabsPage } from './pages/visionlabs.js';
import { initHeroCanvas, replayGame } from './canvas/heroCanvas.js';

function initGlobals() {
  window.showPage = showPage;
  window.downloadResume = downloadResume;
  window.toggleMenu = toggleMenu;
  window.closeMenu = closeMenu;
  window.toggleImpact = toggleImpact;
  window.toggleExpCard = toggleExpCard;
  window.replayGame = replayGame;

  // Add mouse tracking for reactive background
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
    document.documentElement.style.setProperty('--my', `${e.clientY}px`);
  });
}

function init() {
  initGlobals();
  bindDataInlineEvents();

  initHomePage();
  initProjectsPage();
  initVisionlabsPage();
  initHeroCanvas();

  initNavigation();
  initScrollCta();
  initRouter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
