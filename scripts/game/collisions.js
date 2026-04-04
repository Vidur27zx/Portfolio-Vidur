import { Asteroid } from './enemies.js';
import { Particle, ScoreText } from './bullets.js';

export function handleShipCollisions(state, updateHud) {
  for (let i = state.asteroids.length - 1; i >= 0; i -= 1) {
    const asteroid = state.asteroids[i];
    if (!asteroid.hitsShip(state)) {
      continue;
    }

    for (let p = 0; p < 16; p += 1) {
      state.particles.push(new Particle(asteroid.x, asteroid.y));
    }

    state.asteroids.splice(i, 1);
    state.lives -= 1;
    state.shipDmg = 38;
    state.shake = 8;
    updateHud();

    if (state.lives <= 0) {
      return true;
    }
  }

  return false;
}

export function handleBulletCollisions(state, updateHud) {
  state.bullets.forEach((bullet) => {
    for (let i = state.asteroids.length - 1; i >= 0; i -= 1) {
      const asteroid = state.asteroids[i];
      if (!asteroid.hitsPoint(bullet.x, bullet.y)) {
        continue;
      }

      state.combo += 1;
      state.comboTimer = 80;
      const points = state.combo > 2 ? 50 * state.combo : 10;
      state.score += points;
      if (state.score > state.hiScore) {
        state.hiScore = state.score;
      }

      state.scoreTexts.push(new ScoreText(asteroid.x, asteroid.y - 20, points));
      for (let p = 0; p < 12; p += 1) {
        state.particles.push(new Particle(asteroid.x, asteroid.y));
      }

      if (asteroid.size > 13) {
        for (let s = 0; s < 2; s += 1) {
          const angle = Math.random() * Math.PI * 2;
          state.asteroids.push(
            new Asteroid(
              state,
              asteroid.size * 0.5,
              asteroid.x + Math.cos(angle) * 11,
              asteroid.y + Math.sin(angle) * 11,
              asteroid.vx + (Math.random() - 0.5) * 1.8,
              asteroid.vy + (Math.random() - 0.5) * 1.8,
            ),
          );
        }
      }

      state.asteroids.splice(i, 1);
      bullet.life = 0;
      state.shake = 2;
      updateHud();
      break;
    }
  });
}
