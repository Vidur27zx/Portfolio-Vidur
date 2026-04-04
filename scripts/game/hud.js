export function updateHeroHud(state, hud) {
  hud.score.textContent = String(state.score).padStart(3, '0');
  if (state.score > state.hiScore) {
    state.hiScore = state.score;
    localStorage.setItem('arcade_hiscore', state.hiScore.toString());
  }
  hud.hi.textContent = String(state.hiScore).padStart(3, '0');
  hud.wave.textContent = String(state.wave).padStart(2, '0');

  hud.lives.innerHTML = '';
  for (let i = 0; i < 3; i += 1) {
    const d = document.createElement('div');
    d.className = `life${i >= state.lives ? ' lost' : ''}`;
    hud.lives.appendChild(d);
  }
}

export function setReplayVisibility(visible) {
  const chip = document.getElementById('replayChip');
  if (chip) {
    chip.classList.toggle('visible', visible);
  }

  const hint = document.getElementById('heroGameHint');
  if (hint) {
    hint.style.opacity = visible ? '0' : '';
  }
}
