export function downloadResume() {
  try {
    const a = document.createElement('a');
    a.href = './assets/Vidur__CV.pdf';
    a.download = 'Vidur_Ramachandran_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
    }, 1000);
  } catch (error) {
    alert('Resume download failed. Please email vidur2002@gmail.com');
  }
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function executeInlineExpression(expression, event, element) {
  const fn = new Function('event', expression);
  return fn.call(element, event);
}

export function bindDataInlineEvents(root = document) {
  const events = [
    ['data-onclick', 'click'],
    ['data-onmouseover', 'mouseover'],
    ['data-onmouseout', 'mouseout'],
  ];

  events.forEach(([attr, type]) => {
    root.querySelectorAll(`[${attr}]`).forEach((el) => {
      const expression = el.getAttribute(attr);
      if (!expression) {
        return;
      }
      el.removeAttribute(attr);
      el.addEventListener(type, (event) => {
        executeInlineExpression(expression, event, el);
      });
    });
  });
}
