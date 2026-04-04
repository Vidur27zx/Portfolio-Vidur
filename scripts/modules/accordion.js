export function toggleImpact(row) {
  const isOpen = row.classList.contains('open');
  document.querySelectorAll('.impact-row').forEach((r) => r.classList.remove('open'));
  if (!isOpen) {
    row.classList.add('open');
  }
}
