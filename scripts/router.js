import { VALID_PAGES } from './config.js';
import { initHomePage } from './pages/home.js';
import { initProjectsPage } from './pages/projects.js';
import { initVisionlabsPage } from './pages/visionlabs.js';
import { initAboutPage } from './pages/about.js';
import { initHrsaasPage } from './pages/hrsaas.js';
import { initCorpsimPage } from './pages/corpsim.js';
import { initFinmonitorPage } from './pages/finmonitor.js';
import { initRoastmoneyPage } from './pages/roastmoney.js';
import { initValidateideaPage } from './pages/validateidea.js';
import {
  initProjCanvas,
  initMesh23,
  initBreakoutBg,
  initSnakeGame,
  initMarioBg,
  initVLCanvas,
} from './canvas/visionCanvas.js';
import { initHeroCanvas } from './canvas/heroCanvas.js';

let lastPageID = null;

export function isPageActive(id) {
  const page = document.getElementById(`page-${id}`);
  return page && page.classList.contains('active');
}

export function showPage(id) {
  if (id === lastPageID) {
    return;
  }

  document.querySelectorAll('.page').forEach((p) => {
    p.classList.remove('active');
    p.style.opacity = '0';
    p.style.transform = 'translateY(10px)';
  });
  document.querySelectorAll('.nav-links a').forEach((a) => a.classList.remove('active'));

  const page = document.getElementById(`page-${id}`);
  if (!page) {
    return;
  }

  lastPageID = id;
  page.classList.add('active');
  
  // Transition handled via CSS, but trigger opacity shift here for the flow
  requestAnimationFrame(() => {
    page.style.opacity = '1';
    page.style.transform = 'translateY(0)';
  });

  const navEl = document.getElementById(`nav-${id}`);
  if (navEl) {
    navEl.classList.add('active');
  }

  window.scrollTo(0, 0);
  try {
    const newHash = id === 'home' ? '#home' : `#${id}`;
    if (window.location.hash !== newHash) {
      history.pushState({ pageId: id }, '', newHash);
    }
  } catch (_error) {
    // no-op
  }

  const cta = document.getElementById('scrollCta');
  if (cta) {
    if (id === 'home') {
      cta.style.opacity = '';
      cta.style.transition = '';
    } else {
      cta.style.opacity = '0';
      cta.style.transition = 'none';
    }
  }

  if (id === 'home') {
    initHomePage();
    initHeroCanvas();
  }
  if (id === 'projects') {
    initProjectsPage();
    initProjCanvas();
    initSnakeGame();
  }
  if (id === 'visionlabs') {
    initVisionlabsPage();
    initVLCanvas();
    initMesh23();
    initMarioBg();
  }
  if (id === 'about') {
    initAboutPage();
    initBreakoutBg();
  }
  if (id === 'hrsaas') {
    initHrsaasPage();
  }
  if (id === 'corpsim') {
    initCorpsimPage();
  }
  if (id === 'finmonitor') {
    initFinmonitorPage();
  }
  if (id === 'roastmoney') {
    initRoastmoneyPage();
  }
  if (id === 'validateidea') {
    initValidateideaPage();
  }
}

export function initRouter() {
  function routeHash() {
    const hash = (window.location.hash || '').replace('#', '').trim();
    showPage(hash && VALID_PAGES.includes(hash) ? hash : 'home');
  }

  window.addEventListener('hashchange', routeHash);
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.pageId) {
      showPage(e.state.pageId);
    } else {
      routeHash();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', routeHash, { once: true });
  } else {
    routeHash();
  }
}
