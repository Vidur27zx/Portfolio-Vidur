export class Asteroid {
  constructor(state, size, x, y, vx, vy) {
    this.size = size || 14 + Math.random() * 26;

    if (x !== undefined) {
      this.x = x;
      this.y = y;
    } else {
      const side = Math.floor(Math.random() * 4);
      if (side === 0) {
        this.x = Math.random() * state.W;
        this.y = -50;
      } else if (side === 1) {
        this.x = state.W + 50;
        this.y = Math.random() * state.H * 0.85;
      } else if (side === 2) {
        this.x = -50;
        this.y = Math.random() * state.H * 0.85;
      } else {
        this.x = Math.random() * state.W;
        this.y = -45;
      }
    }

    if (vx !== undefined) {
      this.vx = vx;
      this.vy = vy;
    } else {
      const dx = state.shipX - this.x;
      const dy = state.shipY - this.y;
      const d = Math.hypot(dx, dy) || 1;
      const sp = 0.5 + Math.random() * 0.6 + state.wave * 0.06;
      const homing = Math.random() < 4 / 6;

      if (homing) {
        const scatter = (Math.random() - 0.5) * 0.5;
        this.vx = (dx / d) * sp + scatter;
        this.vy = (dy / d) * sp + scatter * 0.2;
      } else {
        const a = Math.random() * Math.PI * 2;
        this.vx = Math.cos(a) * sp;
        this.vy = Math.abs(Math.sin(a)) * sp + 0.3;
      }
    }

    this.rotation = Math.random() * Math.PI * 2;
    this.rotationVelocity = (Math.random() - 0.5) * 0.018;
    this.points = this.createPoints();
    this.craters = this.createCraters();
  }

  createPoints() {
    const n = 7 + Math.floor(Math.random() * 4);
    const points = [];
    for (let i = 0; i < n; i += 1) {
      const a = (i / n) * Math.PI * 2;
      points.push({
        x: Math.cos(a) * this.size * (0.62 + Math.random() * 0.38),
        y: Math.sin(a) * this.size * (0.62 + Math.random() * 0.38),
      });
    }
    return points;
  }

  createCraters() {
    const craters = [];
    const n = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i += 1) {
      const a = Math.random() * Math.PI * 2;
      const d = this.size * Math.random() * 0.4;
      craters.push({
        x: Math.cos(a) * d,
        y: Math.sin(a) * d,
        r: this.size * (0.07 + Math.random() * 0.1),
      });
    }
    return craters;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationVelocity;
  }

  outOfBounds(state) {
    return this.x < -100 || this.x > state.W + 100 || this.y < -100 || this.y > state.H + 200;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    const g = ctx.createRadialGradient(-this.size * 0.22, -this.size * 0.22, 0, 0, 0, this.size);
    g.addColorStop(0, '#565656');
    g.addColorStop(0.5, '#2c2c2c');
    g.addColorStop(1, '#111');

    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    this.points.forEach((point, index) => {
      if (index) {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.closePath();
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = '#383838';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    this.craters.forEach((crater) => {
      ctx.beginPath();
      ctx.arc(crater.x, crater.y, crater.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,.35)';
      ctx.fill();
    });

    ctx.restore();
  }

  hitsPoint(px, py) {
    return Math.hypot(px - this.x, py - this.y) < this.size * 0.85;
  }

  hitsShip(state) {
    return Math.hypot(this.x - state.shipX, this.y - state.shipY) < this.size + 20;
  }
}
