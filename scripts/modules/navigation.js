export function toggleMenu() {
  const links = document.getElementById('navLinks');
  const btn = document.getElementById('navHamburger');
  if (links) {
    links.classList.toggle('open');
  }
  if (btn) {
    btn.classList.toggle('open');
  }
}

export function closeMenu() {
  const links = document.getElementById('navLinks');
  const btn = document.getElementById('navHamburger');
  if (links) {
    links.classList.remove('open');
  }
  if (btn) {
    btn.classList.remove('open');
  }
}

export function initNavigation() {
  document.addEventListener('click', (event) => {
    const menu = document.getElementById('navLinks');
    const button = document.getElementById('navHamburger');
    if (!menu || !button || !menu.classList.contains('open')) {
      return;
    }

    const target = event.target;
    if (target instanceof Node && !menu.contains(target) && !button.contains(target)) {
      closeMenu();
    }
  });
}
