import { RESUME_B64 } from './config.js';

export function downloadResume() {
  try {
    const bytes = atob(RESUME_B64);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i += 1) {
      arr[i] = bytes.charCodeAt(i);
    }
    const blob = new Blob([arr], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Vidur_Ramachandran_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
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
