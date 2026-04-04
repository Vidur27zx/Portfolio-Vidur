export function initScrollCta() {
  const cta = document.getElementById('scrollCta');
  if (!cta) {
    return;
  }

  function hideCta() {
    cta.style.transition = 'opacity .6s ease';
    cta.style.opacity = '0';
    cta.style.pointerEvents = 'none';
    window.removeEventListener('scroll', hideCta);
    window.removeEventListener('touchmove', hideCta);
  }

  window.addEventListener('scroll', hideCta, { passive: true });
  window.addEventListener('touchmove', hideCta, { passive: true });
}
