import { isPageActive } from '../router.js';

let projInit = false;
export function initProjCanvas() {
  if (projInit) {
    return;
  }
  projInit = true;

  const cv = document.getElementById('projCanvas');
  if (!cv) {
    return;
  }

  const cx = cv.getContext('2d');
  let W;
  let H;
  let t = 0;

  function resize() {
    const p = cv.parentElement;
    const dpr = window.devicePixelRatio || 1;
    W = p.clientWidth;
    H = p.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize);

  const data = [];
  for (let i = 0; i < 60; i += 1) {
    const base = 50 + Math.sin(i * 0.3) * 15 + Math.random() * 8;
    data.push({ v: base, anomaly: Math.random() < 0.05 });
  }
  data[12].v = 91;
  data[12].anomaly = true;
  data[28].v = 10;
  data[28].anomaly = true;
  data[44].v = 92;
  data[44].anomaly = true;

  function loop() {
    t += 1;

    if (isPageActive('projects')) {
      cx.clearRect(0, 0, W, H);
      cx.fillStyle = '#f7f7f5';
      cx.fillRect(0, 0, W, H);

      cx.save();
      cx.setLineDash([2, 4]);
      cx.strokeStyle = '#e8e8e4';
      cx.lineWidth = 1;
      for (let y = 0; y <= 4; y += 1) {
        const ly = H * 0.1 + y * (H * 0.8) / 4;
        cx.beginPath();
        cx.moveTo(W * 0.05, ly);
        cx.lineTo(W * 0.95, ly);
        cx.stroke();
      }
      cx.restore();

      const high = H * 0.1 + (1 - 0.78) * H * 0.8;
      const low = H * 0.1 + (1 - 0.22) * H * 0.8;

      cx.save();
      cx.setLineDash([4, 4]);
      cx.strokeStyle = 'rgba(224,48,48,.38)';
      cx.lineWidth = 1;
      cx.beginPath();
      cx.moveTo(W * 0.05, high);
      cx.lineTo(W * 0.95, high);
      cx.stroke();
      cx.beginPath();
      cx.moveTo(W * 0.05, low);
      cx.lineTo(W * 0.95, low);
      cx.stroke();
      cx.restore();

      cx.font = '8px "Space Mono",monospace';
      cx.fillStyle = 'rgba(224,48,48,.5)';
      cx.fillText('HIGH', W * 0.05, high - 4);
      cx.fillText('LOW', W * 0.05, low - 4);

      const done = t >= data.length * 2;
      const visible = done ? data.length : Math.min(data.length, Math.floor(t * 0.5) + 1);
      const xStep = (W * 0.9) / (data.length - 1);
      const startX = W * 0.05;

      cx.save();
      cx.beginPath();
      for (let i = 0; i < visible; i += 1) {
        const x = startX + i * xStep;
        const y = H * 0.1 + (1 - data[i].v / 100) * H * 0.8;
        if (i === 0) {
          cx.moveTo(x, y);
        } else {
          cx.lineTo(x, y);
        }
      }
      cx.strokeStyle = '#2a2a2a';
      cx.lineWidth = 1.5;
      cx.setLineDash([]);
      cx.stroke();
      cx.restore();

      for (let i = 0; i < visible; i += 1) {
        if (!data[i].anomaly) {
          continue;
        }
        const x = startX + i * xStep;
        const y = H * 0.1 + (1 - data[i].v / 100) * H * 0.8;
        cx.save();
        cx.globalAlpha = 1;
        cx.strokeStyle = '#E03030';
        cx.lineWidth = 1.5;
        cx.setLineDash([]);
        cx.beginPath();
        cx.arc(x, y, 5, 0, Math.PI * 2);
        cx.stroke();
        cx.globalAlpha = 0.25;
        cx.fillStyle = '#E03030';
        cx.beginPath();
        cx.arc(x, y, 5, 0, Math.PI * 2);
        cx.fill();
        cx.restore();
      }

      cx.font = '8px "Space Mono",monospace';
      cx.fillStyle = 'rgba(0,0,0,.22)';
      cx.fillText('TRANSACTION ANOMALY MONITOR', W * 0.05, H - 8);
    }
    requestAnimationFrame(loop);
  }

  loop();
}

let vlInit = false;
export function initVLCanvas() {
  if (vlInit) {
    return;
  }
  vlInit = true;

  const cv = document.getElementById('vlBgCanvas');
  if (!cv) {
    return;
  }

  const cx = cv.getContext('2d');
  let W;
  let H;
  let nodes = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = cv.parentElement.clientWidth;
    H = cv.parentElement.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx.scale(dpr, dpr);
    nodes = [];
    for (let i = 0; i < 32; i += 1) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: 1.5 + Math.random() * 2,
      });
    }
  }

  resize();
  window.addEventListener('resize', resize);

  function loop() {
    if (isPageActive('visionlabs')) {
      cx.fillStyle = '#060810';
      cx.fillRect(0, 0, W, H);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > W) {
          node.vx *= -1;
        }
        if (node.y < 0 || node.y > H) {
          node.vy *= -1;
        }
      });

      cx.save();
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 130) {
            cx.globalAlpha = (1 - d / 130) * 0.18;
            cx.strokeStyle = '#3355aa';
            cx.lineWidth = 0.7;
            cx.beginPath();
            cx.moveTo(nodes[i].x, nodes[i].y);
            cx.lineTo(nodes[j].x, nodes[j].y);
            cx.stroke();
          }
        }
      }
      cx.restore();

      nodes.forEach((node) => {
        cx.save();
        cx.shadowColor = '#4466ff';
        cx.shadowBlur = 4;
        cx.fillStyle = '#263a70';
        cx.beginPath();
        cx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        cx.fill();
        cx.restore();
      });
    }

    requestAnimationFrame(loop);
  }

  loop();
}

let meshInit = false;
export function initMesh23() {
  if (meshInit) {
    return;
  }
  meshInit = true;

  const cv = document.getElementById('mesh23Canvas');
  if (!cv) {
    return;
  }

  const cx = cv.getContext('2d');
  let W;
  let H;
  let t = 0;

  function resize() {
    const p = cv.parentElement;
    const dpr = window.devicePixelRatio || 1;
    W = p.clientWidth;
    H = p.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize);

  const cols = 6;
  const rows = 4;
  const nodes = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      nodes.push({
        bx: 0,
        by: 0,
        ox: (Math.random() - 0.5) * 5,
        oy: (Math.random() - 0.5) * 5,
        phase: Math.random() * Math.PI * 2,
        active: Math.random() < 0.38,
      });
    }
  }

  let packets = [];

  function spawnPacket() {
    const from = Math.floor(Math.random() * nodes.length);
    let to = Math.floor(Math.random() * nodes.length);
    while (to === from) {
      to = Math.floor(Math.random() * nodes.length);
    }
    packets.push({ from, to, p: 0, sp: 0.012 + Math.random() * 0.014 });
  }

  function loop() {
    t += 1;

    if (isPageActive('visionlabs')) {
      cx.fillStyle = '#0c0c0c';
      cx.fillRect(0, 0, W, H);

      nodes.forEach((node, index) => {
        const c = index % cols;
        const r = Math.floor(index / cols);
        node.bx = W * 0.1 + c * (W * 0.8) / (cols - 1) + node.ox + Math.sin(t * 0.012 + node.phase) * 2.5;
        node.by = H * 0.15 + r * (H * 0.7) / (rows - 1) + node.oy + Math.cos(t * 0.015 + node.phase) * 2.5;
      });

      cx.save();
      nodes.forEach((node, index) => {
        const c = index % cols;
        const r = Math.floor(index / cols);
        if (c < cols - 1) {
          const nb = nodes[index + 1];
          cx.globalAlpha = 0.14;
          cx.strokeStyle = '#334488';
          cx.lineWidth = 0.6;
          cx.beginPath();
          cx.moveTo(node.bx, node.by);
          cx.lineTo(nb.bx, nb.by);
          cx.stroke();
        }
        if (r < rows - 1) {
          const nb = nodes[index + cols];
          cx.globalAlpha = 0.14;
          cx.strokeStyle = '#334488';
          cx.lineWidth = 0.6;
          cx.beginPath();
          cx.moveTo(node.bx, node.by);
          cx.lineTo(nb.bx, nb.by);
          cx.stroke();
        }
      });
      cx.restore();

      if (t % 38 === 0 && packets.length < 5) {
        spawnPacket();
      }

      packets = packets.filter((packet) => packet.p < 1);
      packets.forEach((packet) => {
        packet.p += packet.sp;
        const from = nodes[packet.from];
        const to = nodes[packet.to];
        const px = from.bx + (to.bx - from.bx) * packet.p;
        const py = from.by + (to.by - from.by) * packet.p;

        cx.save();
        cx.strokeStyle = '#E03030';
        cx.lineWidth = 0.9;
        cx.globalAlpha = 0.45;
        cx.beginPath();
        cx.moveTo(from.bx + (to.bx - from.bx) * Math.max(0, packet.p - 0.14), from.by + (to.by - from.by) * Math.max(0, packet.p - 0.14));
        cx.lineTo(px, py);
        cx.stroke();
        cx.shadowColor = '#E03030';
        cx.shadowBlur = 7;
        cx.fillStyle = '#ff4444';
        cx.globalAlpha = 1;
        cx.beginPath();
        cx.arc(px, py, 2.2, 0, Math.PI * 2);
        cx.fill();
        cx.restore();
      });

      nodes.forEach((node) => {
        cx.save();
        if (node.active) {
          cx.shadowColor = '#4466ff';
          cx.shadowBlur = 7;
        }
        cx.fillStyle = node.active ? '#304e9a' : '#1e1e1e';
        cx.strokeStyle = node.active ? '#4d6ec0' : '#2e2e2e';
        cx.lineWidth = 0.9;
        cx.beginPath();
        cx.rect(node.bx - 3.5, node.by - 3.5, 7, 7);
        cx.fill();
        cx.stroke();
        cx.restore();
      });

      cx.font = '8px "Space Mono",monospace';
      cx.fillStyle = 'rgba(255,255,255,.16)';
      cx.fillText('MESH23 // NODE NETWORK', 10, H - 9);
    }
    requestAnimationFrame(loop);
  }

  loop();
}

let breakoutInit = false;
export function initBreakoutBg() {
  const cv = document.getElementById('aboutHeaderCanvas');
  if (!cv) {
    return;
  }
  if (breakoutInit) {
    return;
  }
  breakoutInit = true;

  const cx = cv.getContext('2d');
  let W;
  let H;
  let mx = 0;

  function resize() {
    const parent = cv.parentElement;
    const dpr = window.devicePixelRatio || 1;
    W = parent ? parent.clientWidth : window.innerWidth;
    H = parent ? parent.clientHeight : window.innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', (e) => {
    const rect = cv.getBoundingClientRect();
    mx = e.clientX - rect.left;
  });
  document.addEventListener('touchmove', (e) => {
    if (e.touches[0]) {
      const rect = cv.getBoundingClientRect();
      mx = e.touches[0].clientX - rect.left;
    }
  }, { passive: true });

  const rings = [
    { r: 140, n: 14, col: '#e03030', w: 22, h: 10 },
    { r: 195, n: 20, col: '#cc5520', w: 22, h: 10 },
    { r: 250, n: 26, col: '#bb8800', w: 22, h: 10 },
    { r: 305, n: 32, col: '#226699', w: 22, h: 10 },
    { r: 360, n: 38, col: '#338844', w: 22, h: 10 },
  ];

  let bricks = [];
  function buildBricks() {
    bricks = [];
    rings.forEach((rg) => {
      for (let i = 0; i < rg.n; i += 1) {
        const a = (i / rg.n) * Math.PI * 2;
        bricks.push({
          cx: 0,
          cy: 0,
          a,
          r: rg.r,
          w: rg.w,
          h: rg.h,
          col: rg.col,
          alive: true,
        });
      }
    });
  }
  buildBricks();

  let bx;
  let by;
  let bvx;
  let bvy;
  function resetBall() {
    bx = W / 2;
    by = H * 0.7;
    const a = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
    bvx = Math.cos(a) * 4.5;
    bvy = Math.sin(a) * 4.5;
  }
  resetBall();

  const paddleW = 100;
  const paddleH = 10;
  const paddleYOffset = 60;
  let shake = 0;

  function draw() {
    cx.save();
    if (shake > 0) {
      cx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
      shake *= 0.82;
      if (shake < 0.2) shake = 0;
    }
    cx.clearRect(-10, -10, W + 20, H + 20);
    cx.fillStyle = '#0a0a12';
    cx.fillRect(0, 0, W, H);

    const ox = W / 2;
    const oy = H / 2 - 40;

    rings.forEach((rg) => {
      cx.save();
      cx.strokeStyle = rg.col;
      cx.globalAlpha = 0.07;
      cx.lineWidth = 1;
      cx.setLineDash([3, 6]);
      cx.beginPath();
      cx.arc(ox, oy, rg.r, 0, Math.PI * 2);
      cx.stroke();
      cx.restore();
    });

    bricks.forEach((b) => {
      if (!b.alive) {
        return;
      }
      b.cx = ox + Math.cos(b.a) * b.r;
      b.cy = oy + Math.sin(b.a) * b.r;
      cx.save();
      cx.translate(b.cx, b.cy);
      cx.rotate(b.a + Math.PI / 2);
      cx.fillStyle = b.col;
      cx.globalAlpha = 0.7;
      cx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
      cx.globalAlpha = 0.9;
      cx.strokeStyle = 'rgba(0,0,0,.3)';
      cx.lineWidth = 0.5;
      cx.strokeRect(-b.w / 2, -b.h / 2, b.w, b.h);
      cx.restore();
    });

    const px = Math.max(paddleW / 2, Math.min(W - paddleW / 2, mx));
    const py = H - paddleYOffset;
    cx.save();
    cx.fillStyle = '#ffffff';
    cx.globalAlpha = 0.85;
    cx.beginPath();
    cx.roundRect(px - paddleW / 2, py - paddleH / 2, paddleW, paddleH, 5);
    cx.fill();
    cx.restore();

    bx += bvx;
    by += bvy;

    if (bx < 8) {
      bx = 8;
      bvx *= -1;
    }
    if (bx > W - 8) {
      bx = W - 8;
      bvx *= -1;
    }
    if (by < 8) {
      by = 8;
      bvy *= -1;
    }

    if (by > py - paddleH / 2 - 8 && by < py + paddleH / 2 && bx > px - paddleW / 2 && bx < px + paddleW / 2 && bvy > 0) {
      bvy *= -1;
      bvx += ((bx - px) / paddleW) * 3;
      const spd = Math.hypot(bvx, bvy);
      if (spd > 8) {
        bvx = (bvx / spd) * 8;
        bvy = (bvy / spd) * 8;
      }
    }

    if (by > H + 20) {
      resetBall();
    }

    bricks.forEach((b) => {
      if (!b.alive) {
        return;
      }
      const d = Math.hypot(bx - b.cx, by - b.cy);
      if (d < b.w * 0.65) {
        b.alive = false;
        const nx = (bx - b.cx) / d;
        const ny = (by - b.cy) / d;
        const dot = bvx * nx + bvy * ny;
        bvx -= 2 * dot * nx;
        bvy -= 2 * dot * ny;
        shake = 8;
      }
    });

    if (bricks.every((b) => !b.alive)) {
      buildBricks();
    }

    cx.save();
    cx.shadowColor = '#ffffff';
    cx.shadowBlur = 12;
    cx.fillStyle = '#ffffff';
    cx.globalAlpha = 0.9;
    cx.beginPath();
    cx.arc(bx, by, 6, 0, Math.PI * 2);
    cx.fill();
    cx.restore();

    cx.font = '8px "Space Mono",monospace';
    cx.fillStyle = 'rgba(255,255,255,.12)';
    cx.fillText('VORTEX // ABOUT', 10, H - 10);
    cx.restore();
  }

  function loop() {
    if (isPageActive('about')) {
      draw();
    }
    requestAnimationFrame(loop);
  }

  loop();
}

const snakeInits = new Set();
export function initSnakeGame(options = {}) {
  const canvasId = options.canvasId || 'projectsHeaderCanvas';
  const activePage = options.activePage || 'projects';
  const hudLabel = options.hudLabel || 'PROJECTS';
  const cv = document.getElementById(canvasId);
  if (!cv || snakeInits.has(canvasId)) {
    return;
  }
  snakeInits.add(canvasId);

  const cx = cv.getContext('2d');
  const keys = { up: false, down: false, left: false, right: false };
  const pointer = { active: false, x: 0, y: 0 };
  const player = { x: 0, y: 0, size: 54, vx: 0, vy: 0 };
  const hazards = [];
  const particles = [];

  let W = 0;
  let H = 0;
  let simTime = 0;
  let elapsed = 0;
  let best = 0;
  let spawnTimer = 0;
  let crashTimer = 0;
  let crashed = false;
  let lastTs = performance.now();
  let shake = 0;

  function isProjectsActive() {
    return isPageActive(activePage);
  }

  function resize() {
    const parent = cv.parentElement;
    const dpr = window.devicePixelRatio || 1;
    W = parent ? parent.clientWidth : window.innerWidth;
    H = parent ? parent.clientHeight : window.innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx.scale(dpr, dpr);
  }

  function currentLevel() {
    return 1 + Math.floor(elapsed / 10);
  }

  function resetRound() {
    player.x = W * 0.2;
    player.y = H * 0.5;
    player.vx = 0;
    player.vy = 0;
    hazards.length = 0;
    particles.length = 0;
    elapsed = 0;
    spawnTimer = 0;
    crashTimer = 0;
    crashed = false;
  }

  function spawnHazard() {
    const lv = currentLevel();
    if (Math.random() < 0.4) {
      hazards.push({
        type: 'gate',
        x: W + 28,
        width: 10 + Math.random() * 4,
        speed: 132 + lv * 12 + Math.random() * 22,
        gapY: H * (0.24 + Math.random() * 0.52),
        gapH: Math.max(54, H * 0.26 - lv * 3.2),
        amp: 10 + Math.random() * H * 0.07,
        freq: 0.7 + Math.random() * 1.15,
        phase: Math.random() * Math.PI * 2,
      });
      return;
    }

    hazards.push({
      type: 'node',
      x: W + 24,
      r: 7 + Math.random() * 10,
      speed: 120 + lv * 13 + Math.random() * 28,
      y: H * (0.16 + Math.random() * 0.68),
      amp: 8 + Math.random() * H * 0.09,
      freq: 0.8 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
    });
  }

  function nodeY(hazard) {
    return hazard.y + Math.sin(simTime * hazard.freq + hazard.phase) * hazard.amp;
  }

  function gateGapY(hazard) {
    return hazard.gapY + Math.sin(simTime * hazard.freq + hazard.phase) * hazard.amp;
  }

  function isColliding() {
    const half = player.size * 0.5;
    for (let i = 0; i < hazards.length; i += 1) {
      const hazard = hazards[i];
      if (hazard.type === 'node') {
        if (Math.hypot(player.x - hazard.x, player.y - nodeY(hazard)) < hazard.r + half) {
          return true;
        }
        continue;
      }

      const gapY = gateGapY(hazard);
      const inGateX = Math.abs(player.x - hazard.x) < hazard.width * 0.5 + half;
      if (!inGateX) {
        continue;
      }
      const gapTop = gapY - hazard.gapH * 0.5;
      const gapBottom = gapY + hazard.gapH * 0.5;
      if (player.y - half < gapTop || player.y + half > gapBottom) {
        return true;
      }
    }
    return false;
  }

  function triggerCrash() {
    crashed = true;
    shake = 12;
    crashTimer = 1.05;
    best = Math.max(best, elapsed);

    for (let i = 0; i < 18; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 50 + Math.random() * 115;
      particles.push({
        x: player.x,
        y: player.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        ttl: 0.5 + Math.random() * 0.35,
        life: 0.5 + Math.random() * 0.35,
      });
    }
  }

  function updatePlayer(dt) {
    const lv = currentLevel();
    const accel = 780 + lv * 24;
    const damping = 0.84;
    const maxSpeed = 170 + lv * 10;

    const ix = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    const iy = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);

    if (pointer.active) {
      const dx = pointer.x - player.x;
      const dy = pointer.y - player.y;
      player.vx += dx * Math.min(8, dt * 34);
      player.vy += dy * Math.min(8, dt * 34);
    } else {
      player.vx += ix * accel * dt;
      player.vy += iy * accel * dt;
    }

    player.vx *= damping;
    player.vy *= damping;

    const speed = Math.hypot(player.vx, player.vy);
    if (speed > maxSpeed) {
      const k = maxSpeed / speed;
      player.vx *= k;
      player.vy *= k;
    }

    player.x += player.vx * dt;
    player.y += player.vy * dt;

    const margin = player.size * 0.6;
    player.x = Math.max(margin, Math.min(W - margin, player.x));
    player.y = Math.max(margin, Math.min(H - margin, player.y));
  }

  function updateHazards(dt) {
    const lv = currentLevel();
    const spawnEvery = Math.max(0.34, 1 - lv * 0.05);

    spawnTimer += dt;
    while (spawnTimer >= spawnEvery) {
      spawnTimer -= spawnEvery;
      spawnHazard();
    }

    for (let i = hazards.length - 1; i >= 0; i -= 1) {
      hazards[i].x -= hazards[i].speed * dt;
      if (hazards[i].x < -90) {
        hazards.splice(i, 1);
      }
    }
  }

  function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.92;
      p.vy *= 0.92;
      p.life -= dt;
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function update(dt) {
    simTime += dt;

    if (!crashed) {
      elapsed += dt;
      updatePlayer(dt);
      updateHazards(dt);

      if (isColliding()) {
        triggerCrash();
      }
    } else {
      crashTimer -= dt;
      if (crashTimer <= 0) {
        resetRound();
      }
    }

    updateParticles(dt);
  }

  function drawBackdrop() {
    cx.save();
    if (shake > 0) {
      cx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
      shake *= 0.85;
      if (shake < 0.2) shake = 0;
    }
    cx.fillStyle = '#070a12';
    cx.fillRect(-10, -10, W + 20, H + 20);

    cx.save();
    cx.strokeStyle = 'rgba(255,255,255,.07)';
    cx.lineWidth = 1;
    const step = Math.max(24, Math.floor(W / 16));
    for (let x = 0; x <= W; x += step) {
      cx.beginPath();
      cx.moveTo(x + Math.sin(simTime * 0.7 + x * 0.01) * 2, 0);
      cx.lineTo(x + Math.sin(simTime * 0.7 + x * 0.01) * 2, H);
      cx.stroke();
    }
    cx.restore();
  }

  function drawHazard(hazard) {
    if (hazard.type === 'node') {
      const y = nodeY(hazard);
      cx.save();
      cx.globalAlpha = 0.24;
      cx.strokeStyle = '#E03030';
      cx.lineWidth = 1;
      cx.beginPath();
      cx.moveTo(hazard.x - hazard.r - 14, y);
      cx.lineTo(hazard.x + hazard.r + 14, y);
      cx.stroke();
      cx.globalAlpha = 0.72;
      cx.fillStyle = '#E03030';
      cx.beginPath();
      cx.arc(hazard.x, y, hazard.r, 0, Math.PI * 2);
      cx.fill();
      cx.restore();
      return;
    }

    const gapY = gateGapY(hazard);
    const top = Math.max(0, gapY - hazard.gapH * 0.5);
    const bottom = Math.min(H, gapY + hazard.gapH * 0.5);

    cx.save();
    cx.fillStyle = 'rgba(224,48,48,.62)';
    cx.fillRect(hazard.x - hazard.width * 0.5, 0, hazard.width, top);
    cx.fillRect(hazard.x - hazard.width * 0.5, bottom, hazard.width, H - bottom);
    cx.restore();
  }

  function drawPlayer() {
    cx.save();
    cx.translate(player.x, player.y);
    
    // Rotate slightly with movement
    const tilt = player.vy * 0.002;
    cx.rotate(tilt + Math.sin(simTime * 2) * 0.05);

    if (crashed) {
      cx.globalAlpha = 0.45;
    }

    // Bird Body (Teardrop style)
    cx.fillStyle = '#f1f1f1';
    cx.beginPath();
    cx.moveTo(player.size * 0.6, 0);
    cx.bezierCurveTo(player.size * 0.6, player.size * 0.5, -player.size * 0.5, player.size * 0.5, -player.size * 0.5, 0);
    cx.bezierCurveTo(-player.size * 0.5, -player.size * 0.5, player.size * 0.6, -player.size * 0.5, player.size * 0.6, 0);
    cx.fill();

    // Eye
    cx.fillStyle = '#0a0a12';
    cx.beginPath();
    cx.arc(player.size * 0.25, -player.size * 0.1, 1.5, 0, Math.PI * 2);
    cx.fill();

    // Beak
    cx.fillStyle = '#E03030';
    cx.beginPath();
    cx.moveTo(player.size * 0.55, -2);
    cx.lineTo(player.size * 0.85, 0);
    cx.lineTo(player.size * 0.55, 2);
    cx.fill();

    // Wing (Flapping)
    const flap = Math.sin(simTime * 15) * 6;
    cx.fillStyle = '#d1d1d1';
    cx.beginPath();
    cx.moveTo(-2, 0);
    cx.lineTo(-player.size * 0.4, flap);
    cx.lineTo(-player.size * 0.1, 0);
    cx.fill();

    cx.restore();
  }

  function drawParticles() {
    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      cx.save();
      cx.globalAlpha = Math.max(0, p.life / p.ttl) * 0.75;
      cx.fillStyle = '#E03030';
      cx.fillRect(p.x - 2, p.y - 2, 4, 4);
      cx.restore();
    }
  }

  function drawHud() {
    cx.save();
    cx.font = '8px "Space Mono",monospace';
    cx.fillStyle = 'rgba(255,255,255,.2)';
    cx.fillText(`SYSTEM NAV // ${hudLabel}`, 10, H - 10);
    cx.fillText(`UPTIME ${elapsed.toFixed(1)}S`, 12, 16);
    cx.fillText(`BEST ${best.toFixed(1)}S`, 12, 28);
    cx.restore();

    if (!crashed) {
      return;
    }

    cx.save();
    cx.fillStyle = 'rgba(224,48,48,.14)';
    cx.fillRect(0, 0, W, H);
    cx.font = '700 10px "Space Mono",monospace';
    cx.fillStyle = 'rgba(255,255,255,.55)';
    cx.fillText('FAILURE DETECTED // RESETTING', Math.max(12, W * 0.3), Math.max(20, H * 0.52));
    cx.restore();
  }

  function draw() {
    drawBackdrop();
    hazards.forEach(drawHazard);
    drawParticles();
    drawPlayer();
    drawHud();
    cx.restore();
  }

  function setPointer(clientX, clientY) {
    if (!isProjectsActive()) {
      return;
    }
    const rect = cv.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    if (px < 0 || py < 0 || px > rect.width || py > rect.height) {
      return;
    }
    pointer.active = true;
    pointer.x = px;
    pointer.y = py;
  }

  document.addEventListener('keydown', (e) => {
    if (!isProjectsActive()) {
      return;
    }
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      keys.up = true;
      pointer.active = false;
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      keys.down = true;
      pointer.active = false;
    } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      keys.left = true;
      pointer.active = false;
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      keys.right = true;
      pointer.active = false;
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      keys.up = false;
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      keys.down = false;
    } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      keys.left = false;
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      keys.right = false;
    }
  });

  document.addEventListener('mousemove', (e) => setPointer(e.clientX, e.clientY));
  document.addEventListener('click', (e) => setPointer(e.clientX, e.clientY));
  document.addEventListener('touchmove', (e) => {
    if (e.touches[0]) {
      setPointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    resize();
    resetRound();
  });

  resize();
  resetRound();

  function loop(ts) {
    const now = ts || performance.now();
    const dt = Math.min(0.05, (now - lastTs) / 1000);
    lastTs = now;

    if (isProjectsActive()) {
      update(dt);
      draw();
    }

    requestAnimationFrame(loop);
  }

  loop(performance.now());
}

let marioInit = false;
export function initMarioBg() {
  const cv = document.getElementById('vlCanvas');
  if (!cv || marioInit) {
    return;
  }
  marioInit = true;

  const cx = cv.getContext('2d');
  const BASE_DROP_MS = 120; // 2x faster than 240
  const TETRIS_PIECES = [
    { color: '#6d8cff', shape: [[1, 1, 1, 1]] },
    { color: '#8f9ab8', shape: [[1, 0, 0], [1, 1, 1]] },
    { color: '#7f8fab', shape: [[0, 0, 1], [1, 1, 1]] },
    { color: '#9b5360', shape: [[1, 1], [1, 1]] },
    { color: '#be4658', shape: [[0, 1, 1], [1, 1, 0]] },
    { color: '#a56470', shape: [[0, 1, 0], [1, 1, 1]] },
    { color: '#E03030', shape: [[1, 1, 0], [0, 1, 1]] },
  ];

  let W = 0;
  let H = 0;
  let cell = 20; // Slightly larger cells for the reduced grid
  let cols = 12; // Reduced from 20 for a narrower playbox
  let rows = 18; // Standard verticality
  let boardX = 0;
  let boardY = 0;

  let board = [];
  let active = null;
  let next = null;

  let score = 0;
  let lines = 0;
  let clearFlash = 0;

  let dropTimer = 0;
  let thinkTimer = 0;
  let manualUntil = 0;
  let lastTs = performance.now();
  let shake = 0;

  function isVisionLabsActive() {
    const page = document.getElementById('page-visionlabs');
    return Boolean(page && page.classList.contains('active'));
  }

  function cloneShape(shape) {
    return shape.map((row) => row.slice());
  }

  function shapeSignature(shape) {
    return shape.map((row) => row.join('')).join('|');
  }

  function rotateShapeCW(shape) {
    const h = shape.length;
    const w = shape[0].length;
    const rotated = Array.from({ length: w }, () => Array(h).fill(0));
    for (let y = 0; y < h; y += 1) {
      for (let x = 0; x < w; x += 1) {
        rotated[x][h - 1 - y] = shape[y][x];
      }
    }
    return rotated;
  }

  function getRotations(shape) {
    const rotations = [];
    let current = cloneShape(shape);
    for (let i = 0; i < 4; i += 1) {
      const sig = shapeSignature(current);
      if (!rotations.some((entry) => entry.sig === sig)) {
        rotations.push({ shape: cloneShape(current), sig, rot: i });
      }
      current = rotateShapeCW(current);
    }
    return rotations;
  }

  function randomPiece() {
    const pick = TETRIS_PIECES[Math.floor(Math.random() * TETRIS_PIECES.length)];
    return {
      x: 0,
      y: 0,
      color: pick.color,
      shape: cloneShape(pick.shape),
      rot: 0,
      targetRot: 0,
      targetX: 0,
    };
  }

  function isMobile() {
    return window.matchMedia('(max-width: 720px)').matches;
  }

  function rebuildBoard() {
    board = Array.from({ length: rows }, () => Array(cols).fill(''));
  }

  function resetBoard() {
    rebuildBoard();
    score = 0;
    lines = 0;
    clearFlash = 0;
    next = randomPiece();
    spawnPiece();
  }

  function resize() {
    const parent = cv.parentElement;
    const dpr = window.devicePixelRatio || 1;
    W = parent ? parent.clientWidth : window.innerWidth;
    H = parent ? parent.clientHeight : window.innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx.scale(dpr, dpr);

    const minCell = isMobile() ? 9 : 11;
    const maxCell = isMobile() ? 13 : 16;
    cell = Math.max(minCell, Math.min(maxCell, Math.floor(Math.min(W / 56, H / 12))));

    cols = 14; 
    rows = Math.max(10, Math.min(20, Math.floor((H - 14) / cell)));

    boardX = Math.floor((W - cols * cell) / 2);
    boardY = Math.floor((H - rows * cell) / 2);

    resetBoard();
  }

  function collides(px, py, shape, targetBoard = board) {
    for (let y = 0; y < shape.length; y += 1) {
      for (let x = 0; x < shape[y].length; x += 1) {
        if (!shape[y][x]) {
          continue;
        }
        const bx = px + x;
        const by = py + y;
        if (bx < 0 || bx >= cols || by >= rows) {
          return true;
        }
        if (by >= 0 && targetBoard[by][bx]) {
          return true;
        }
      }
    }
    return false;
  }

  function mergePiece(targetBoard, piece) {
    for (let y = 0; y < piece.shape.length; y += 1) {
      for (let x = 0; x < piece.shape[y].length; x += 1) {
        if (!piece.shape[y][x]) {
          continue;
        }
        const bx = piece.x + x;
        const by = piece.y + y;
        if (by >= 0 && by < rows && bx >= 0 && bx < cols) {
          targetBoard[by][bx] = piece.color;
        }
      }
    }
  }

  function clearLines(targetBoard) {
    let cleared = 0;
    for (let y = rows - 1; y >= 0; y -= 1) {
      if (targetBoard[y].every((value) => value)) {
        targetBoard.splice(y, 1);
        targetBoard.unshift(Array(cols).fill(''));
        cleared += 1;
        y += 1;
      }
    }
    return cleared;
  }

  function evaluateBoard(simBoard, cleared) {
    const heights = Array(cols).fill(0);
    let holes = 0;

    for (let x = 0; x < cols; x += 1) {
      let found = false;
      for (let y = 0; y < rows; y += 1) {
        if (simBoard[y][x]) {
          if (!found) {
            heights[x] = rows - y;
            found = true;
          }
        } else if (found) {
          holes += 1;
        }
      }
    }

    let bumpiness = 0;
    let totalHeight = 0;
    for (let i = 0; i < heights.length; i += 1) {
      totalHeight += heights[i];
      if (i > 0) {
        bumpiness += Math.abs(heights[i] - heights[i - 1]);
      }
    }

    return cleared * 9 - holes * 4.7 - bumpiness * 0.28 - totalHeight * 0.09;
  }

  function findDropY(x, shape, targetBoard = board) {
    let y = -2;
    if (collides(x, y, shape, targetBoard)) {
      return null;
    }
    while (!collides(x, y + 1, shape, targetBoard)) {
      y += 1;
    }
    return y;
  }

  function planPiece() {
    if (!active) {
      return;
    }

    const rotations = getRotations(active.shape);
    let bestPlan = null;

    for (let i = 0; i < rotations.length; i += 1) {
      const rot = rotations[i];
      const shape = rot.shape;
      const minX = 0;
      const maxX = cols - shape[0].length;

      for (let x = minX; x <= maxX; x += 1) {
        const y = findDropY(x, shape);
        if (y === null) {
          continue;
        }

        const simBoard = board.map((row) => row.slice());
        mergePiece(simBoard, { x, y, shape, color: active.color });
        const cleared = clearLines(simBoard);
        const scoreValue = evaluateBoard(simBoard, cleared);

        if (!bestPlan || scoreValue > bestPlan.value) {
          bestPlan = { value: scoreValue, targetX: x, targetRot: rot.rot };
        }
      }
    }

    if (bestPlan) {
      active.targetX = bestPlan.targetX;
      active.targetRot = bestPlan.targetRot;
    } else {
      active.targetX = Math.floor(cols / 2);
      active.targetRot = 0;
    }
  }

  function spawnPiece() {
    active = next || randomPiece();
    next = randomPiece();

    active.y = -2;
    active.x = Math.floor(cols / 2) - Math.ceil(active.shape[0].length / 2);
    active.rot = 0;
    active.targetRot = 0;
    active.targetX = active.x;

    if (collides(active.x, active.y, active.shape)) {
      resetBoard();
      return;
    }

    planPiece();
  }

  function rotateActive() {
    if (!active) {
      return;
    }

    const rotated = rotateShapeCW(active.shape);
    const kicks = [0, -1, 1, -2, 2];
    for (let i = 0; i < kicks.length; i += 1) {
      const nx = active.x + kicks[i];
      if (!collides(nx, active.y, rotated)) {
        active.x = nx;
        active.shape = rotated;
        active.rot = (active.rot + 1) % 4;
        return true;
      }
    }
    return false;
  }

  function move(dx) {
    if (!active) {
      return;
    }
    const nx = active.x + dx;
    if (!collides(nx, active.y, active.shape)) {
      active.x = nx;
    }
  }

  function softDrop() {
    if (!active) {
      return false;
    }
    if (!collides(active.x, active.y + 1, active.shape)) {
      active.y += 1;
      return true;
    }

    mergePiece(board, active);
    const cleared = clearLines(board);
    if (cleared > 0) {
      lines += cleared;
      score += [0, 100, 280, 500, 820][cleared] || 820;
      clearFlash = 0.18;
    }
    spawnPiece();
    return false;
  }

  function hardDrop() {
    while (softDrop()) {
      // keep dropping
    }
  }

  function applyAutoplay(dtMs, now) {
    if (!active || now < manualUntil) {
      return;
    }

    thinkTimer += dtMs;
    const step = isMobile() ? 130 : 90;
    if (thinkTimer < step) {
      return;
    }
    thinkTimer = 0;

    if (active.rot !== active.targetRot) {
      rotateActive();
      return;
    }
    if (active.x < active.targetX) {
      move(1);
      return;
    }
    if (active.x > active.targetX) {
      move(-1);
      return;
    }

    if (Math.random() < 0.35) {
      softDrop();
    }
  }

  function update(ts) {
    const now = ts || performance.now();
    const dtMs = Math.min(50, now - lastTs);
    lastTs = now;

    if (!isVisionLabsActive()) {
      return;
    }

    dropTimer += dtMs;
    const speedBoost = Math.min(170, lines * 8);
    const dropMs = Math.max(isMobile() ? 180 : 140, BASE_DROP_MS - speedBoost);
    if (dropTimer >= dropMs) {
      dropTimer = 0;
      softDrop();
    }

    applyAutoplay(dtMs, now);

    if (clearFlash > 0) {
      clearFlash = Math.max(0, clearFlash - dtMs / 1000);
    }
  }

  function drawBlock(gx, gy, color, alpha = 1) {
    const x = boardX + gx * cell;
    const y = boardY + gy * cell;

    cx.save();
    cx.globalAlpha = alpha;
    cx.fillStyle = color;
    
    // Draw base block
    cx.fillRect(x + 1, y + 1, cell - 2, cell - 2);
    
    // Nothing OS Style Dot Matrix inside block
    cx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    const dotSize = Math.max(1, cell / 4);
    const spacing = cell / 2;
    for (let dy = 0; dy < cell; dy += spacing) {
      for (let dx = 0; dx < cell; dx += spacing) {
        cx.fillRect(x + dx + 1.5, y + dy + 1.5, dotSize, dotSize);
      }
    }

    cx.strokeStyle = 'rgba(255,255,255,.25)';
    cx.lineWidth = 1;
    cx.strokeRect(x + 1, y + 1, cell - 2, cell - 2);
    cx.restore();
  }

  function draw() {
    if (!isVisionLabsActive()) {
      return;
    }

    cx.save();
    if (clearFlash > 0) {
      // Screen shake effect on line clear
      const sx = (Math.random() - 0.5) * 6;
      const sy = (Math.random() - 0.5) * 6;
      cx.translate(sx, sy);
    }

    cx.clearRect(0, 0, W, H);
    cx.fillStyle = 'rgba(7,10,18,.6)';
    cx.fillRect(0, 0, W, H);

    const boardW = cols * cell;
    const boardH = rows * cell;

    cx.save();
    cx.strokeStyle = 'rgba(255,255,255,.07)';
    cx.lineWidth = 1;
    for (let x = 0; x <= cols; x += 1) {
      const gx = boardX + x * cell;
      cx.beginPath();
      cx.moveTo(gx, boardY);
      cx.lineTo(gx, boardY + boardH);
      cx.stroke();
    }
    for (let y = 0; y <= rows; y += 1) {
      const gy = boardY + y * cell;
      cx.beginPath();
      cx.moveTo(boardX, gy);
      cx.lineTo(boardX + boardW, gy);
      cx.stroke();
    }
    cx.restore();

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        if (board[y][x]) {
          drawBlock(x, y, board[y][x], 0.78);
        }
      }
    }

    if (active) {
      let ghostY = active.y;
      while (!collides(active.x, ghostY + 1, active.shape)) {
        ghostY += 1;
      }

      for (let y = 0; y < active.shape.length; y += 1) {
        for (let x = 0; x < active.shape[y].length; x += 1) {
          if (!active.shape[y][x]) {
            continue;
          }
          const gx = active.x + x;
          const gy = ghostY + y;
          if (gy >= 0) {
            drawBlock(gx, gy, active.color, 0.18);
          }
        }
      }

      for (let y = 0; y < active.shape.length; y += 1) {
        for (let x = 0; x < active.shape[y].length; x += 1) {
          if (!active.shape[y][x]) {
            continue;
          }
          const gx = active.x + x;
          const gy = active.y + y;
          if (gy >= 0) {
            drawBlock(gx, gy, active.color, 0.9);
          }
        }
      }
    }

    if (clearFlash > 0) {
      cx.save();
      cx.globalAlpha = clearFlash * 0.45;
      cx.fillStyle = '#E03030';
      cx.fillRect(boardX, boardY, boardW, boardH);
      cx.restore();
    }

    cx.restore();

    cx.save();
    cx.font = '8px "Space Mono",monospace';
    cx.fillStyle = 'rgba(255,255,255,.24)';
    cx.fillText('TETRIS GRID // VISION LABS', 10, H - 10);
    cx.fillText(`LINES ${String(lines).padStart(2, '0')}`, 12, 14);
    cx.fillText(`SCORE ${String(score).padStart(4, '0')}`, 96, 14);
    cx.restore();
  }

  function activateManualWindow(durationMs = 4500) {
    manualUntil = performance.now() + durationMs;
  }

  function handlePointer(clientX, clientY) {
    if (!isVisionLabsActive() || !active) {
      return;
    }

    const rect = cv.getBoundingClientRect();
    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
      return;
    }

    activateManualWindow(3600);

    const localX = clientX - rect.left;
    const localY = clientY - rect.top;

    if (localY < rect.height * 0.33) {
      rotateActive();
      return;
    }

    if (localY > rect.height * 0.8) {
      hardDrop();
      return;
    }

    if (localX < rect.width * 0.42) {
      move(-1);
    } else if (localX > rect.width * 0.58) {
      move(1);
    } else {
      softDrop();
    }
  }

  document.addEventListener('keydown', (e) => {
    if (!isVisionLabsActive() || !active) {
      return;
    }

    if (
      e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowDown' ||
      e.key === 'ArrowUp' || e.key === 'a' || e.key === 'A' || e.key === 'd' ||
      e.key === 'D' || e.key === 's' || e.key === 'S' || e.key === 'w' ||
      e.key === 'W' || e.key === ' '
    ) {
      activateManualWindow();
    }

    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      move(-1);
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      move(1);
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      softDrop();
    } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === 'x' || e.key === 'X') {
      rotateActive();
    } else if (e.key === ' ') {
      hardDrop();
    }
  });

  document.addEventListener('click', (e) => {
    handlePointer(e.clientX, e.clientY);
  });

  document.addEventListener('touchstart', (e) => {
    if (e.touches[0]) {
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('resize', resize);

  resize();

  function loop(ts) {
    update(ts || performance.now());
    draw();
    requestAnimationFrame(loop);
  }

  loop(performance.now());
}
