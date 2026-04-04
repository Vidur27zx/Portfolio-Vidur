import { isPageActive } from '../router.js';

let miniInit = false;
let loopActive = false;
let state = {
  t: 0,
  score: 0,
  shots: 0,
  miss: 0,
  targets: [],
  dustPuffs: [],
  shootFlash: 0,
  flashTX: 0,
  flashTY: 0,
  lastSpawn: 0,
  W: 0,
  H: 0
};

let cv = null;
let cx = null;
const GROUND = 0.72;

function cowboyX() { return 38; }
function cowboyY() { return Math.floor(state.H * GROUND); }
function gunBarrelX() { return cowboyX() + 28; }
function gunBarrelY() { return cowboyY() - 22; }

function resize() {
  if (!cv) return;
  const p = cv.parentElement;
  state.W = cv.width = p.clientWidth;
  state.H = cv.height = p.clientHeight;
}

function spawnTarget() {
  const minX = state.W * 0.38;
  const maxX = state.W * 0.88;
  const minY = state.H * 0.1;
  const maxY = state.H * (GROUND - 0.08);
  const x = minX + Math.random() * (maxX - minX);
  const y = minY + Math.random() * (maxY - minY);
  const r = 16 + Math.random() * 10;
  state.targets.push({ x, y, r, life: 180 + Math.floor(Math.random() * 120), born: state.t, hit: false, hitTimer: 0 });
}

function drawCowboy(x, y) {
  cx.save();
  cx.fillStyle = '#3a2a10';
  cx.fillRect(x - 2, y - 48, 20, 4);
  cx.fillRect(x + 3, y - 58, 10, 12);
  cx.fillStyle = '#d4a47a';
  cx.fillRect(x + 4, y - 42, 8, 10);
  cx.fillStyle = '#111';
  cx.fillRect(x + 5, y - 39, 2, 2);
  cx.fillRect(x + 9, y - 39, 2, 2);
  cx.fillStyle = '#4a3820';
  cx.fillRect(x + 2, y - 32, 12, 18);
  cx.fillStyle = '#f0c030';
  cx.fillRect(x + 7, y - 26, 4, 4);
  cx.fillStyle = '#4a3820';
  cx.fillRect(x + 14, y - 28, 14, 4);
  cx.fillStyle = '#222';
  cx.fillRect(x + 26, y - 30, 6, 3);
  cx.fillRect(x + 22, y - 29, 6, 6);
  cx.fillStyle = '#2a1a08';
  cx.fillRect(x + 3, y - 14, 5, 14);
  cx.fillRect(x + 9, y - 14, 5, 14);
  cx.fillStyle = '#1a0a00';
  cx.fillRect(x + 2, y, 6, 4);
  cx.fillRect(x + 8, y, 7, 4);
  cx.restore();
}

function drawTarget(target) {
  const { x, y, r, hit, hitTimer, born } = target;
  const age = state.t - born;
  const scale = age < 8 ? age / 8 : 1;

  cx.save();
  cx.translate(x, y);
  cx.scale(scale, scale);
  if (hit) cx.globalAlpha = Math.max(0, hitTimer / 12);

  cx.fillStyle = '#8B6914';
  cx.fillRect(-2, 0, 4, state.H * GROUND - y + 2 > 0 ? state.H * GROUND - y + 4 : 4);
  cx.strokeStyle = '#fff';
  cx.lineWidth = 3;
  cx.beginPath();
  cx.arc(0, 0, r, 0, Math.PI * 2);
  cx.stroke();

  cx.fillStyle = '#fff';
  cx.beginPath();
  cx.arc(0, 0, r, 0, Math.PI * 2);
  cx.fill();

  cx.fillStyle = '#E03030';
  cx.beginPath();
  cx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
  cx.fill();

  cx.fillStyle = '#fff';
  cx.beginPath();
  cx.arc(0, 0, r * 0.48, 0, Math.PI * 2);
  cx.fill();

  cx.fillStyle = '#E03030';
  cx.beginPath();
  cx.arc(0, 0, r * 0.24, 0, Math.PI * 2);
  cx.fill();

  cx.fillStyle = '#111';
  cx.beginPath();
  cx.arc(0, 0, r * 0.1, 0, Math.PI * 2);
  cx.fill();

  if (hit) {
    cx.strokeStyle = '#ff2222';
    cx.lineWidth = 3;
    cx.beginPath(); cx.moveTo(-r * 0.5, -r * 0.5); cx.lineTo(r * 0.5, r * 0.5); cx.stroke();
    cx.beginPath(); cx.moveTo(r * 0.5, -r * 0.5); cx.lineTo(-r * 0.5, r * 0.5); cx.stroke();
  }
  cx.restore();
}

function drawBulletLine() {
  if (state.shootFlash <= 0) return;
  cx.save();
  cx.globalAlpha = state.shootFlash / 10;
  cx.strokeStyle = '#E03030';
  cx.lineWidth = 2;
  cx.shadowColor = '#ff4444';
  cx.shadowBlur = 6;
  cx.beginPath();
  cx.moveTo(gunBarrelX(), gunBarrelY());
  cx.lineTo(state.flashTX, state.flashTY);
  cx.stroke();
  cx.globalAlpha = state.shootFlash / 8;
  cx.fillStyle = '#ffcc44';
  cx.beginPath();
  cx.arc(gunBarrelX(), gunBarrelY(), 5, 0, Math.PI * 2);
  cx.fill();
  cx.restore();
  state.shootFlash -= 1;
}

class Dust {
  constructor(x, y) {
    this.x = x; this.y = y; this.life = 18; this.ps = [];
    for (let i = 0; i < 8; i += 1) {
      const a = Math.random() * Math.PI * 2, s = 1 + Math.random() * 3;
      this.ps.push({ x: 0, y: 0, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: 2 + Math.random() * 3 });
    }
  }
  update() {
    this.life -= 1;
    this.ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vx *= 0.92; p.vy *= 0.92; });
  }
  draw() {
    cx.save();
    cx.globalAlpha = this.life / 18;
    this.ps.forEach(p => {
      cx.fillStyle = '#c8a86a';
      cx.beginPath(); cx.arc(this.x + p.x, this.y + p.y, p.r, 0, Math.PI * 2); cx.fill();
    });
    cx.restore();
  }
}

function drawScene() {
  const sky = cx.createLinearGradient(0, 0, 0, state.H * GROUND);
  sky.addColorStop(0, '#d4b886'); sky.addColorStop(0.5, '#e8c87e'); sky.addColorStop(1, '#f0d090');
  cx.fillStyle = sky; cx.fillRect(0, 0, state.W, state.H * GROUND);
  cx.save(); cx.fillStyle = '#fff176'; cx.shadowColor = '#ffdd44'; cx.shadowBlur = 14;
  cx.beginPath(); cx.arc(state.W * 0.82, state.H * 0.14, 18, 0, Math.PI * 2); cx.fill(); cx.restore();
  cx.fillStyle = '#c4966a';
  cx.beginPath(); cx.moveTo(state.W * 0.55, state.H * GROUND);
  cx.lineTo(state.W * 0.55, state.H * 0.38); cx.lineTo(state.W * 0.6, state.H * 0.32);
  cx.lineTo(state.W * 0.68, state.H * 0.32); cx.lineTo(state.W * 0.73, state.H * 0.38);
  cx.lineTo(state.W * 0.73, state.H * GROUND); cx.fill();
  cx.fillStyle = '#b87e58';
  cx.beginPath(); cx.moveTo(state.W * 0.74, state.H * GROUND);
  cx.lineTo(state.W * 0.74, state.H * 0.42); cx.lineTo(state.W * 0.78, state.H * 0.36);
  cx.lineTo(state.W * 0.84, state.H * 0.36); cx.lineTo(state.W * 0.88, state.H * 0.42);
  cx.lineTo(state.W * 0.88, state.H * GROUND); cx.fill();
  const grd = cx.createLinearGradient(0, state.H * GROUND, 0, state.H);
  grd.addColorStop(0, '#c8924a'); grd.addColorStop(0.3, '#b87838'); grd.addColorStop(1, '#9a6228');
  cx.fillStyle = grd; cx.fillRect(0, state.H * GROUND, state.W, state.H * (1 - GROUND));
  cx.fillStyle = '#a06030'; cx.fillRect(0, state.H * GROUND, state.W, 2);
  cx.fillStyle = '#2d6e3a';
  cx.fillRect(state.W * 0.45 - 3, state.H * GROUND - 34, 6, 34);
}

function drawHUD() {
  cx.save(); cx.fillStyle = 'rgba(0,0,0,.55)'; cx.fillRect(4, 4, 90, 26);
  cx.font = 'bold 10px "Space Mono",monospace'; cx.fillStyle = 'rgba(255,255,255,.5)'; cx.fillText('SCORE', 8, 16);
  cx.font = 'bold 13px "Space Mono",monospace'; cx.fillStyle = '#E03030'; cx.fillText(String(state.score).padStart(3, '0'), 8, 28);
  cx.fillStyle = 'rgba(0,0,0,.5)'; cx.fillRect(4, state.H - 38, state.W - 8, 32);
  cx.font = '9px "Space Mono",monospace'; cx.fillStyle = 'rgba(255,255,255,.7)';
  cx.fillStyle = '#E03030'; cx.fillRect(10, state.H - 27, 6, 6);
  cx.fillStyle = 'rgba(255,255,255,.7)'; cx.fillText('HIT THE TARGETS', 20, state.H - 22);
  cx.fillStyle = '#E03030'; cx.fillRect(10, state.H - 16, 6, 6);
  cx.fillStyle = 'rgba(255,255,255,.7)'; cx.fillText('CLICK TO SHOOT', 20, state.H - 11);
  cx.restore();
}

function handleMiniClick(e) {
  if (!cv || !isPageActive('home')) return;
  const rect = cv.getBoundingClientRect();
  const mx = (e.clientX - rect.left) * (state.W / rect.width);
  const my = (e.clientY - rect.top) * (state.H / rect.height);
  state.shots += 1; state.flashTX = mx; state.flashTY = my; state.shootFlash = 10;
  let hit = false;
  for (let i = state.targets.length - 1; i >= 0; i -= 1) {
    const target = state.targets[i];
    if (!target.hit && Math.hypot(mx - target.x, my - target.y) < target.r) {
      target.hit = true; target.hitTimer = 12; state.score += 1;
      state.dustPuffs.push(new Dust(target.x, target.y)); hit = true; break;
    }
  }
  if (!hit) state.miss += 1;
}

function loop() {
  if (!isPageActive('home')) { loopActive = false; return; }
  state.t += 1;
  cx.clearRect(0, 0, state.W, state.H);
  drawScene();
  if (state.t - state.lastSpawn > 90 && state.targets.filter(t => !t.hit).length < 3) {
    spawnTarget(); state.lastSpawn = state.t;
  }
  state.targets.forEach(target => {
    if (target.hit) { target.hitTimer -= 1; if (target.hitTimer < 0) target.hitTimer = 0; }
    target.life -= 1; drawTarget(target);
  });
  state.targets = state.targets.filter(t => t.life > 0 || (t.hit && t.hitTimer > 0));
  drawBulletLine();
  state.dustPuffs = state.dustPuffs.filter(d => d.life > 0);
  state.dustPuffs.forEach(d => { d.update(); d.draw(); });
  drawCowboy(10, cowboyY());
  drawHUD();
  requestAnimationFrame(loop);
}

export function initMiniCanvas() {
  cv = document.getElementById('miniCanvas');
  if (!cv) return;
  cx = cv.getContext('2d');
  
  if (miniInit) {
    resize();
    if (!loopActive) { loopActive = true; requestAnimationFrame(loop); }
    return;
  }

  miniInit = true;
  resize();
  window.addEventListener('resize', resize);
  cv.addEventListener('click', handleMiniClick);
  
  loopActive = true;
  requestAnimationFrame(loop);
}

// Ensure the mini game also resets or restarts on hashchange
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#home' || window.location.hash === '' || window.location.hash === '#') {
    if (miniInit) {
      if (!loopActive) {
        loopActive = true;
        requestAnimationFrame(loop);
      }
    }
  }
});
