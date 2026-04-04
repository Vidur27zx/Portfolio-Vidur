export function drawAirship(ctx, state) {
  state.shipBobT += 0.03;
  const y = state.shipY + Math.sin(state.shipBobT) * 2.5;

  ctx.save();
  ctx.translate(state.shipX, y);
  const fl = 0.55 + Math.random() * 0.45;

  for (let i = -1; i <= 1; i += 2) {
    ctx.save();
    ctx.globalAlpha = 0.5 * fl;
    ctx.fillStyle = state.shipDmg > 0 ? '#ff4400' : '#112244';
    const fh = 6 + Math.random() * 10;
    ctx.fillRect(i * 14 - 3, 16, 6, fh);
    ctx.restore();
  }

  ctx.shadowColor = state.shipDmg > 0 ? 'rgba(255,80,0,.5)' : 'rgba(60,120,255,.38)';
  ctx.shadowBlur = 18;

  ctx.fillStyle = state.shipDmg > 0 ? '#bb2200' : '#bebebe';
  ctx.beginPath();
  ctx.moveTo(-22, 10);
  ctx.lineTo(-28, 0);
  ctx.lineTo(-18, -14);
  ctx.lineTo(18, -14);
  ctx.lineTo(28, 0);
  ctx.lineTo(22, 10);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = state.shipDmg > 0 ? '#882200' : '#929292';
  ctx.beginPath();
  ctx.moveTo(-10, -14);
  ctx.lineTo(-6, -24);
  ctx.lineTo(6, -24);
  ctx.lineTo(10, -14);
  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = state.shipDmg > 0 ? '#ff4400' : '#001020';
  ctx.beginPath();
  ctx.arc(0, -18, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(0,80,200,.3)';
  ctx.beginPath();
  ctx.arc(-1, -19, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = state.shipDmg > 0 ? '#992200' : '#787878';
  ctx.beginPath();
  ctx.moveTo(-22, 0);
  ctx.lineTo(-44, 8);
  ctx.lineTo(-44, 14);
  ctx.lineTo(-22, 10);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(22, 0);
  ctx.lineTo(44, 8);
  ctx.lineTo(44, 14);
  ctx.lineTo(22, 10);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#4a4a4a';
  ctx.fillRect(-20, 4, 4, 8);
  ctx.fillRect(16, 4, 4, 8);

  ctx.strokeStyle = state.shipDmg > 0 ? '#ff5500' : '#383838';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-22, 10);
  ctx.lineTo(-28, 0);
  ctx.lineTo(-18, -14);
  ctx.lineTo(18, -14);
  ctx.lineTo(28, 0);
  ctx.lineTo(22, 10);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  if (state.shipDmg > 0) {
    state.shipDmg -= 1;
  }
}
