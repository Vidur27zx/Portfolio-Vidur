export class Bullet {
  constructor(state, tx, ty) {
    this.x = state.shipX;
    this.y = state.shipY - 12;
    const d = Math.hypot(tx - this.x, ty - this.y) || 1;
    const speed = 14;
    this.vx = ((tx - this.x) / d) * speed;
    this.vy = ((ty - this.y) / d) * speed;
    this.life = 80;
    this.trail = [];
  }

  update(state) {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 7) {
      this.trail.shift();
    }
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 1;

    if (this.x < -10 || this.x > state.W + 10 || this.y < -10 || this.y > state.H + 10) {
      this.life = 0;
    }
  }

  draw(ctx) {
    this.trail.forEach((t, i) => {
      ctx.save();
      ctx.globalAlpha = (i / this.trail.length) * 0.5;
      ctx.fillStyle = '#ff5555';
      const s = (i / this.trail.length) * 4;
      ctx.fillRect(t.x - s / 2, t.y - s / 2, s, s);
      ctx.restore();
    });

    ctx.save();
    ctx.shadowColor = '#E03030';
    ctx.shadowBlur = 10;
    ctx.globalAlpha = Math.min(1, this.life / 15);
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(this.x - 3, this.y - 3, 6, 6);
    ctx.restore();
  }
}

export class Particle {
  constructor(x, y, red) {
    this.x = x;
    this.y = y;
    const a = Math.random() * Math.PI * 2;
    const speed = 0.7 + Math.random() * 5;
    this.vx = Math.cos(a) * speed;
    this.vy = Math.sin(a) * speed;
    this.life = 18 + Math.random() * 28;
    this.maxLife = this.life;
    this.size = 1 + Math.random() * 3;
    this.red = red || Math.random() < 0.3;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;
    this.life -= 1;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life / this.maxLife;
    ctx.fillStyle = this.red ? '#E03030' : Math.random() < 0.4 ? '#888' : '#444';
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.restore();
  }
}

export class ScoreText {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.life = 42;
  }

  update() {
    this.y -= 0.9;
    this.life -= 1;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life / 42;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px "Space Mono",monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`+${this.value}`, this.x, this.y);
    ctx.restore();
  }
}
