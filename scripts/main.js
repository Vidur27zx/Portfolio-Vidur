const isPlayground = window.location.pathname.startsWith('/playground');
const isFinmonitorCaseStudy = window.location.pathname === '/finmonitor' || window.location.pathname === '/finmonitor/';

function updateResumeLinks() {
  document.querySelectorAll('a[href="./assets/Vidur__CV.pdf"]').forEach((link) => {
    link.href = './assets/Vidur_SF_CV.pdf';
    link.download = 'Vidur_SF_CV.pdf';
  });
}

async function initPlayground() {
  document.body.classList.add('playground-view');
  document.body.classList.remove('professional-view');
  document.title = 'Vidur Builds — Playground';
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = 'Vidur Builds — ideas, prototypes, systems and interactive experiments built to see if they could exist.';
  const socialTitle = document.querySelector('meta[property="og:title"]');
  if (socialTitle) socialTitle.content = 'Vidur Builds — Playground';
  try {
    sessionStorage.setItem('vidur-portfolio-mode', 'playground');
  } catch (_error) {
    // The Playground remains available if storage is disabled.
  }

  const [router, utils, navigation, accordion, cards, metrics, home, projects, visionLabs, hero] = await Promise.all([
    import('./router.js'),
    import('./utils.js'),
    import('./modules/navigation.js'),
    import('./modules/accordion.js'),
    import('./modules/cards.js'),
    import('./modules/metrics.js'),
    import('./pages/home.js'),
    import('./pages/projects.js'),
    import('./pages/visionlabs.js'),
    import('./canvas/heroCanvas.js'),
  ]);

  window.showPage = router.showPage;
  window.downloadResume = utils.downloadResume;
  window.toggleMenu = navigation.toggleMenu;
  window.closeMenu = navigation.closeMenu;
  window.toggleImpact = accordion.toggleImpact;
  window.toggleExpCard = cards.toggleExpCard;
  window.replayGame = hero.replayGame;

  document.addEventListener('mousemove', (event) => {
    document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
    document.documentElement.style.setProperty('--my', `${event.clientY}px`);
  });

  utils.bindDataInlineEvents();
  home.initHomePage();
  projects.initProjectsPage();
  visionLabs.initVisionlabsPage();
  hero.initHeroCanvas();
  navigation.initNavigation();
  metrics.initScrollCta();
  router.initRouter();
}

async function init() {
  updateResumeLinks();

  if (isPlayground) {
    await initPlayground();
    return;
  }

  if (isFinmonitorCaseStudy) {
    const { initFinmonitorCaseStudy } = await import('./finmonitor-case-study.js');
    initFinmonitorCaseStudy();
    return;
  }

  const { initProfessionalPortfolio } = await import('./professional.js');
  initProfessionalPortfolio();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { void init(); }, { once: true });
} else {
  void init();
}
