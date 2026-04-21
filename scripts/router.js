import { VALID_PAGES } from './config.js';
import { initHomePage } from './pages/home.js';
import { initProjectsPage } from './pages/projects.js';
import { initVisionlabsPage } from './pages/visionlabs.js';
import { initAboutPage } from './pages/about.js';
import { initHrsaasPage } from './pages/hrsaas.js';
import { initClinicbotPage } from './pages/clinicbot.js';
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
    const newPath = id === 'home' ? '/' : `/${id}`;
    if (window.location.pathname !== newPath) {
      history.pushState({ pageId: id }, '', newPath);
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
  if (id === 'clinicbot') {
    initClinicbotPage();
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
  function routeFromPath() {
    // Support both path-based (/about) and legacy hash-based (#about) routing
    const pathSegment = window.location.pathname.replace(/^\//, '').trim();
    const hashSegment = (window.location.hash || '').replace('#', '').trim();
    const segment = pathSegment || hashSegment;
    showPage(segment && VALID_PAGES.includes(segment) ? segment : 'home');
  }

  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.pageId) {
      showPage(e.state.pageId);
    } else {
      routeFromPath();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', routeFromPath, { once: true });
  } else {
    routeFromPath();
  }
}
