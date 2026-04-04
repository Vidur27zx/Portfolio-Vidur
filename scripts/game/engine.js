import { createHeroState, resetHeroRound } from './state.js';
import { isPageActive } from '../router.js';
import { Asteroid } from './enemies.js';
import { Bullet, Particle } from './bullets.js';
import { drawAirship } from './player.js';
import { handleShipCollisions, handleBulletCollisions } from './collisions.js';
import { setReplayVisibility, updateHeroHud } from './hud.js';

let initialized = false;
let loopActive = false;
let replayFn = null;
let state = null;
let cv = null;
let cx = null;
let hud = null;
let hasInteracted = false;

const ARIES_NODES = [
  [0.0, 0.0],
  [0.18, -0.08],
  [0.26, -0.1],
  [-0.16, 0.18],
  [-0.28, 0.1],
];
const ARIES_LINES = [[0, 1], [1, 2], [0, 3], [3, 4]];
const ARIES_SIZE = [1.9, 1.4, 1.3, 1.1, 1.0];
let ariesTw = 0;
let galaxyTw = 0;

export function replayGame() {
  if (replayFn) {
    replayFn();
  }
}

function resize() {
  if (!cv || !state) return;
  state.W = cv.width = window.innerWidth;
  state.H = cv.height = window.innerHeight;
  state.shipX = state.W / 2;
  state.shipY = state.H - 100;
  state.stars = [];

  for (let i = 0; i < 260; i += 1) {
    state.stars.push({
      x: Math.random() * state.W,
      y: Math.random() * state.H,
      r: Math.random() * 1.3,
      a: 0.12 + Math.random() * 0.88,
      tw: Math.random() * Math.PI * 2,
      tws: 0.004 + Math.random() * 0.016,
    });
  }
}

function drawStars() {
  state.stars.forEach((star) => {
    star.tw += star.tws;
    cx.save();
    cx.globalAlpha = star.a * (0.35 + 0.65 * Math.sin(star.tw));
    cx.fillStyle = '#fff';
    cx.beginPath();
    cx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    cx.fill();
    cx.restore();
  });
}

function drawAries() {
  ariesTw += 0.005;
  const cx0 = state.W * 0.63;
  const cy0 = state.H * 0.3;
  const scale = Math.min(state.W, state.H) * 0.14;

  cx.save();
  cx.strokeStyle = 'rgba(255,220,200,0.14)';
  cx.lineWidth = 0.7;
  ARIES_LINES.forEach(([a, b]) => {
    cx.beginPath();
    cx.moveTo(cx0 + ARIES_NODES[a][0] * scale, cy0 + ARIES_NODES[a][1] * scale);
    cx.lineTo(cx0 + ARIES_NODES[b][0] * scale, cy0 + ARIES_NODES[b][1] * scale);
    cx.stroke();
  });
  cx.restore();

  ARIES_NODES.forEach(([nx, ny], i) => {
    const px = cx0 + nx * scale;
    const py = cy0 + ny * scale;
    const pulse = 0.5 + 0.5 * Math.sin(ariesTw + i * 1.1);
    const r = ARIES_SIZE[i];

    cx.save();
    cx.globalAlpha = pulse * 0.12;
    const glow = cx.createRadialGradient(px, py, 0, px, py, r * 5);
    glow.addColorStop(0, 'rgba(255,210,180,1)');
    glow.addColorStop(1, 'transparent');
    cx.fillStyle = glow;
    cx.beginPath();
    cx.arc(px, py, r * 5, 0, Math.PI * 2);
    cx.fill();

    cx.globalAlpha = 0.55 + pulse * 0.45;
    cx.fillStyle = i === 0 ? '#ffe8d0' : '#fff';
    cx.beginPath();
    cx.arc(px, py, r, 0, Math.PI * 2);
    cx.fill();
    cx.restore();
  });
}

function drawGalaxy() {
  galaxyTw += 0.003;
  const gx = state.W * 0.22;
  const gy = state.H * 0.28;
  const arms = 3;
  const starsPerArm = 55;

  cx.save();
  const core = cx.createRadialGradient(gx, gy, 0, gx, gy, 38);
  core.addColorStop(0, 'rgba(160,140,255,0.18)');
  core.addColorStop(0.4, 'rgba(120,100,220,0.07)');
  core.addColorStop(1, 'transparent');
  cx.fillStyle = core;
  cx.beginPath();
  cx.arc(gx, gy, 38, 0, Math.PI * 2);
  cx.fill();

  for (let arm = 0; arm < arms; arm += 1) {
    const armAngle = (arm / arms) * Math.PI * 2 + galaxyTw;
    for (let j = 0; j < starsPerArm; j += 1) {
      const t = j / starsPerArm;
      const spread = t * Math.PI * 1.8 + armAngle;
      const dist = 8 + t * 52;
      const scatter = (Math.random() - 0.5) * 10 * (t + 0.3);
      const px = gx + Math.cos(spread) * dist + scatter;
      const py = gy + Math.sin(spread) * dist * 0.45 + scatter * 0.4;
      const alpha = (0.08 + t * 0.18) * (0.6 + 0.4 * Math.sin(galaxyTw * 2 + j));
      const r = 0.4 + Math.random() * 0.7 * (1 - t * 0.5);

      cx.save();
      cx.globalAlpha = alpha;
      cx.fillStyle = j % 7 === 0 ? 'rgba(200,180,255,1)' : '#fff';
      cx.beginPath();
      cx.arc(px, py, r, 0, Math.PI * 2);
      cx.fill();
      cx.restore();
    }
  }

  cx.save();
  cx.globalAlpha = 0.55 + 0.2 * Math.sin(galaxyTw * 3);
  cx.fillStyle = 'rgba(220,210,255,1)';
  cx.beginPath();
  cx.arc(gx, gy, 1.4, 0, Math.PI * 2);
  cx.fill();
  cx.restore();
  cx.restore();
}

function triggerGameOver() {
  if (!state) return;
  state.goState = true;
  setReplayVisibility(true);
  replayFn = startGame;
}

function startGame() {
  if (!state) return;
  resetHeroRound(state);
  hasInteracted = false;
  setReplayVisibility(false);
  
  // Clear any existing asteroids
  state.asteroids = [];
  
  for (let i = 0; i < 4; i += 1) {
    setTimeout(() => {
      if (state && !state.goState && isPageActive('home')) {
        state.asteroids.push(new Asteroid(state));
      }
    }, i * 400);
  }
  updateHeroHud(state, hud);
}

function shootAt(x, y) {
  if (!state || state.goState || !isPageActive('home')) {
    return;
  }
  hasInteracted = true;

  const pill = document.getElementById('gamePill');
  if (pill) {
    pill.classList.add('hidden');
  }

  state.bullets.push(new Bullet(state, x, y));
  for (let i = 0; i < 5; i += 1) {
    state.particles.push(new Particle(state.shipX, state.shipY - 12, true));
  }
  state.muzzleFlash = 8;
}

function handleMouseMove(e) {
  if (!cv || !state) return;
  const rect = cv.getBoundingClientRect();
  state.mouseX = e.clientX - rect.left;
  state.mouseY = e.clientY - rect.top;
}

function handleTouchMove(e) {
  if (!cv || !state || !e.touches[0]) return;
  const rect = cv.getBoundingClientRect();
  state.mouseX = e.touches[0].clientX - rect.left;
  state.mouseY = e.touches[0].clientY - rect.top;
}

function handleClick(e) {
  if (!cv) return;
  const rect = cv.getBoundingClientRect();
  shootAt(e.clientX - rect.left, e.clientY - rect.top);
}

function handleTouchStart(e) {
  if (!cv || !state || !e.touches[0]) return;
  const rect = cv.getBoundingClientRect();
  state.mouseX = e.touches[0].clientX - rect.left;
  state.mouseY = e.touches[0].clientY - rect.top;
  shootAt(state.mouseX, state.mouseY);
}

function loop() {
  if (!state || !cx) {
    requestAnimationFrame(loop);
    return;
  }
  state.frameCount += 1;

  const active = isPageActive('home');

  if (active) {
    cx.save();
    if (state.shake > 0) {
      cx.translate((Math.random() - 0.5) * state.shake, (Math.random() - 0.5) * state.shake);
      state.shake *= 0.9;
      if (state.shake < 0.1) state.shake = 0;
    }
    cx.fillStyle = '#060608';
    cx.fillRect(-10, -10, state.W + 20, state.H + 20);

    const nebula = cx.createRadialGradient(state.W * 0.65, state.H * 0.35, 0, state.W * 0.65, state.H * 0.35, state.W * 0.5);
    nebula.addColorStop(0, 'rgba(20,8,30,.5)');
    nebula.addColorStop(0.6, 'rgba(8,3,16,.2)');
    nebula.addColorStop(1, 'transparent');
    cx.fillStyle = nebula;
    cx.fillRect(0, 0, state.W, state.H);

    drawStars();
    drawGalaxy();
    drawAries();

    if (!state.goState) {
      if (state.frameCount % Math.max(28, 60 - state.wave * 3) === 0 && state.asteroids.length < 6) {
        state.asteroids.push(new Asteroid(state));
      }

      if (hasInteracted && state.mouseX > 0) {
        cx.save();
        cx.setLineDash([3, 8]);
        cx.strokeStyle = 'rgba(224,48,48,.12)';
        cx.lineWidth = 1;
        const dx = state.mouseX - state.shipX;
        const dy = state.mouseY - (state.shipY - 10);
        const d = Math.hypot(dx, dy) || 1;
        cx.beginPath();
        cx.moveTo(state.shipX, state.shipY - 10);
        cx.lineTo(state.shipX + (dx / d) * 90, state.shipY - 10 + (dy / d) * 90);
        cx.stroke();
        cx.restore();
      }

      for (let i = state.asteroids.length - 1; i >= 0; i -= 1) {
        const asteroid = state.asteroids[i];
        asteroid.update();
        if (asteroid.outOfBounds(state)) {
          state.asteroids.splice(i, 1);
          continue;
        }
        asteroid.draw(cx);
      }

      if (handleShipCollisions(state, () => updateHeroHud(state, hud))) {
        triggerGameOver();
      }

      state.bullets = state.bullets.filter((b) => b.life > 0);
      state.bullets.forEach((bullet) => {
        bullet.update(state);
        bullet.draw(cx);
      });

      handleBulletCollisions(state, () => updateHeroHud(state, hud));

      if (state.score > state.wave * 200) {
        state.wave += 1;
        updateHeroHud(state, hud);
      }

      if (state.comboTimer > 0) {
        state.comboTimer -= 1;
        if (state.comboTimer === 0) {
          state.combo = 0;
        }
        if (state.combo > 1) {
          cx.save();
          cx.globalAlpha = Math.min(1, state.comboTimer / 25);
          cx.font = '700 13px "Space Mono",monospace';
          cx.fillStyle = '#E03030';
          cx.textAlign = 'center';
          cx.fillText(`x${state.combo} COMBO`, state.W / 2, state.H - 80);
          cx.restore();
        }
      }

      state.particles = state.particles.filter((p) => p.life > 0);
      state.particles.forEach((particle) => {
        particle.update();
        particle.draw(cx);
      });

      state.scoreTexts = state.scoreTexts.filter((text) => text.life > 0);
      state.scoreTexts.forEach((text) => {
        text.update();
        text.draw(cx);
      });

      if (state.muzzleFlash > 0) {
        cx.save();
        cx.globalAlpha = state.muzzleFlash / 8;
        cx.shadowColor = '#E03030';
        cx.shadowBlur = 16;
        cx.fillStyle = '#ff4444';
        cx.beginPath();
        cx.arc(state.shipX, state.shipY - 14, 5, 0, Math.PI * 2);
        cx.fill();
        cx.restore();
        state.muzzleFlash -= 1;
      }
    }

    drawAirship(cx, state);
    cx.restore();
  }

  requestAnimationFrame(loop);
}

export function initHeroGame() {
  cv = document.getElementById('gameCanvas');
  if (!cv) return;

  // Always sync HUD and elements even if already initialized
  hud = {
    score: document.getElementById('scoreNum'),
    hi: document.getElementById('hiNum'),
    lives: document.getElementById('livesRow'),
    wave: document.getElementById('waveNum'),
  };

  if (initialized) {
    // If we're already initialized, just ensure the loop is running and start a fresh round
    if (!loopActive) {
      loopActive = true;
      requestAnimationFrame(loop);
    }
    startGame();
    return;
  }

  initialized = true;
  cx = cv.getContext('2d');
  state = createHeroState();

  resize();
  window.addEventListener('resize', resize);
  
  // Attach listeners only once
  cv.addEventListener('mousemove', handleMouseMove);
  cv.addEventListener('touchmove', handleTouchMove, { passive: true });
  cv.addEventListener('click', handleClick);
  cv.addEventListener('touchstart', handleTouchStart, { passive: true });

  startGame();
  if (!loopActive) {
    loopActive = true;
    requestAnimationFrame(loop);
  }
}

// Global reset listener to ensure any return to home triggers a restart
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#home' || window.location.hash === '' || window.location.hash === '#') {
    if (initialized) {
      startGame();
    }
  }
});
