export function toggleExpCard(card) {
  const isOpen = card.classList.contains('open');
  document.querySelectorAll('.exp-card').forEach((c) => c.classList.remove('open'));
  if (!isOpen) {
    card.classList.add('open');
  }
}

export function initExpCards() {
  const cards = document.querySelectorAll('.exp-card');

  function lockHeights() {
    cards.forEach((c) => {
      c.style.minHeight = '';
    });
    let maxHeight = 0;
    cards.forEach((c) => {
      if (c.offsetHeight > maxHeight) {
        maxHeight = c.offsetHeight;
      }
    });
    cards.forEach((c) => {
      c.style.minHeight = `${maxHeight}px`;
    });
  }

  if (document.readyState === 'complete') {
    lockHeights();
  } else {
    window.addEventListener('load', lockHeights, { once: true });
  }
}
