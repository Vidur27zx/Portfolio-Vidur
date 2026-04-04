export function createHeroState() {
  return {
    W: 0,
    H: 0,
    score: 0,
    hiScore: parseInt(localStorage.getItem('arcade_hiscore')) || 0,
    lives: 2,
    wave: 1,
    asteroids: [],
    bullets: [],
    particles: [],
    stars: [],
    scoreTexts: [],
    goState: false,
    combo: 0,
    comboTimer: 0,
    muzzleFlash: 0,
    shipDmg: 0,
    shipBobT: 0,
    shipX: 0,
    shipY: 0,
    mouseX: -1,
    mouseY: -1,
    frameCount: 0,
    shake: 0,
  };
}

export function resetHeroRound(state) {
  state.score = 0;
  state.lives = 2;
  state.wave = 1;
  state.asteroids = [];
  state.bullets = [];
  state.particles = [];
  state.scoreTexts = [];
  state.combo = 0;
  state.comboTimer = 0;
  state.goState = false;
}
