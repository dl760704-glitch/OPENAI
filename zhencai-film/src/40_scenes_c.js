/* ===== 分镜 · 第13章、第15章、第16章 ===== */
function bez(p0, p1, p2, p3, u) {
  const v = 1 - u; return [v * v * v * p0[0] + 3 * v * v * u * p1[0] + 3 * v * u * u * p2[0] + u * u * u * p3[0], v * v * v * p0[1] + 3 * v * v * u * p1[1] + 3 * v * u * u * p2[1] + u * u * u * p3[1]];
}
function route(p0, p1, p2, p3, f, col, w) {
  c.save(); c.lineCap = 'round'; c.beginPath(); for (let k = 0; k <= 40; k++) { const p = bez(p0, p1, p2, p3, f * k / 40); k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); }
  c.strokeStyle = rgba(col, 0.28); c.lineWidth = w + 6; c.stroke(); c.strokeStyle = rgba(col, 0.95); c.lineWidth = w; c.stroke(); c.restore();
}
function boat(x, y, ang, col) {
  c.save(); c.translate(x, y); c.rotate(ang); c.fillStyle = rgba(col, 1); c.beginPath(); c.moveTo(-12, 0); c.lineTo(12, 0); c.lineTo(8, 6); c.lineTo(-9, 6); c.closePath(); c.fill();
  c.fillStyle = rgba(mix(col, [255, 255, 255], 0.5), 0.95); c.beginPath(); c.moveTo(0, -1); c.lineTo(0, -16); c.lineTo(9, -2); c.closePath(); c.fill(); c.restore();
}

/* ---------- 第13章 两条百年航线 ---------- */
function sc13(s, t) {
  c.fillStyle = vgrad('#03081a', '#0a2748'); c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(100,170,230,0.07)'; c.lineWidth = 1; for (let x = 0; x < W; x += 40) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = 0; y < H; y += 40) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  for (let k = 0; k < 10; k++) { c.strokeStyle = 'rgba(120,190,240,0.09)'; c.beginPath(); for (let x = 0; x <= W; x += 14) { const y = 120 + k * 40 + Math.sin(x * 0.02 + t * 0.9 + k) * 5; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
  const S0 = [80, 300], F = [420, 300], BU = [[560, 300], [640, 160], [740, 160]], RD = [[560, 300], [640, 440], [740, 440]];
  const blue = [90, 160, 255], red = [255, 90, 70], gold = [255, 214, 120];
  const pre = eo(seg(s, 0.1, 1.9)), post = eo(seg(s, 2.2, 3.8));
  c.save(); c.globalCompositeOperation = 'lighter'; route(S0, [200, 280], [320, 320], F, pre, gold, 4);
  if (t > EV.fork) { route(F, BU[0], BU[1], BU[2], post, blue, 3.4); route(F, RD[0], RD[1], RD[2], post, red, 3.4); } c.restore();
  // 0.363 转折点
  const fk = sm(seg(t, EV.fork - 0.15, EV.fork + 0.3)); if (fk > 0) {
    c.save(); c.globalAlpha *= fk; c.setLineDash([5, 6]); c.strokeStyle = rgba(gold, 0.8); c.lineWidth = 1.5; c.beginPath(); c.moveTo(F[0], 110); c.lineTo(F[0], 500); c.stroke(); c.setLineDash([]);
    glow(F[0], F[1], 80 + 60 * Math.exp(-(t - EV.fork) * 3), gold, 0.7); txt('依赖度 0.363', F[0], 96, 20, '#ffe4a0', { font: KAI, ls: 3, shadow: 'rgba(255,200,90,0.7)', sb: 10 }); txt('条件性转折点', F[0], 122, 13, '#bcd8f0', { font: KAI }); c.restore(); }
  // 舟行
  if (pre > 0.05) for (let k = 0; k < 3; k++) { const u = ((t * 0.12 + k / 3) % 1) * pre; const p = bez(S0, [200, 280], [320, 320], F, u); boat(p[0], p[1] - 8 + Math.sin(t * 3 + k) * 2, 0, gold); }
  if (t > EV.fork) for (let k = 0; k < 3; k++) { const u = (((t - EV.fork) * 0.16 + k / 3) % 1) * post; const pb = bez(F, BU[0], BU[1], BU[2], u), pr = bez(F, RD[0], RD[1], RD[2], u); boat(pb[0], pb[1] - 8, -0.4 * (1 - u), blue); boat(pr[0], pr[1] - 8, 0.35 * (1 - u), red); }
  // 人群：两排
  const rowY = [150, 420], rows = [{ y: 150, col: blue, name: '市场主导构型 · 接入权双峰分化', f: i => Math.exp(-Math.pow((i - 5) / 2.2, 2)) * 1.0 + Math.exp(-Math.pow((i - 24) / 2.2, 2)) * 0.75 },
    { y: 420, col: red, name: '国家甄采构型 · 普惠通道', f: i => 0.35 + 0.6 * Math.exp(-Math.pow((i - 15) / 12, 2)) }];
  const burst = EV.burst, N = 30;
  rows.forEach((rw, ri) => {
    const vis = sm(seg(s, 3.2, 4)); c.save(); c.globalAlpha *= vis;
    c.beginPath(); for (let i = 0; i < N; i++) { const x = 790 + i * 15, h = rw.f(i) * (ri ? 38 : 50) * eo(seg(t, burst - 0.2, burst + 2.2)); i ? c.lineTo(x, rw.y - 20 - h) : c.moveTo(x, rw.y - 20 - h); }
    c.strokeStyle = rgba(rw.col, 0.95); c.lineWidth = 2; c.stroke(); c.lineTo(790 + (N - 1) * 15, rw.y - 20); c.lineTo(790, rw.y - 20); c.closePath(); c.fillStyle = rgba(rw.col, 0.2); c.fill();
    for (let i = 0; i < N; i++) { const lit = clamp(rw.f(i) * eo(seg(t, burst + i * 0.03, burst + 1.4 + i * 0.03)) * 1.2); const x = 790 + i * 15; c.fillStyle = rgba(mix([40, 60, 90], rw.col, lit), 1); c.beginPath(); c.arc(x, rw.y, 3.6, 0, TAU); c.fill(); c.fillRect(x - 3, rw.y + 3, 6, 9); if (lit > 0.4) glow(x, rw.y + 4, 14, rw.col, 0.5 * lit); }
    txt(rw.name, 790 + N * 7.5, rw.y + 34, 14, rgba(mix(rw.col, [255, 255, 255], 0.5)), { font: KAI, ls: 2 });
    c.restore();
  });
  // 红利粒子：沿航线分发
  if (t > burst) { c.save(); c.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 120; k++) { const age = t - burst - R(k) * 1.6; if (age < 0 || age > 1.5) continue; const u = age / 1.5; const tgt = (k % 30); const e = bez(F, RD[0], RD[1], RD[2], u); const dest = 790 + tgt * 15; const x = lerp(e[0], dest, sm(seg(u, 0.5, 1))), y = lerp(e[1], 420, sm(seg(u, 0.5, 1))); glow(x, y, 7, gold, 0.9 * (1 - u * 0.4)); }
    for (let k = 0; k < 14; k++) { const age = t - burst - R(k, 9) * 1.2; if (age < 0 || age > 1.5) continue; const u = age / 1.5, e = bez(F, BU[0], BU[1], BU[2], u); const tgt = k % 2 ? 5 : 24; const x = lerp(e[0], 790 + tgt * 15, sm(seg(u, 0.5, 1))), y = lerp(e[1], 150, sm(seg(u, 0.5, 1))); glow(x, y, 7, gold, 0.9 * (1 - u * 0.4)); }
    c.restore(); }
  // 仿真平台滑杆
  const pa = sm(seg(s, 1.0, 1.6)) * (1 - sm(seg(s, 6.4, 6.9)));
  if (pa > 0) { c.save(); c.globalAlpha *= pa; c.fillStyle = 'rgba(4,12,28,0.75)'; c.fillRect(470, 388, 300, 62); c.strokeStyle = rgba(CYAN, 0.6); c.strokeRect(470.5, 388.5, 299, 61);
    ['税率', '阻尼', '自动化上限'].forEach((n, i) => { const y = 402 + i * 18; txt(n, 482, y, 11, '#bfe4ff', { align: 'left', font: KAI }); c.strokeStyle = 'rgba(160,210,255,0.5)'; c.beginPath(); c.moveTo(560, y); c.lineTo(750, y); c.stroke(); const kx = 560 + 190 * (0.5 + 0.4 * Math.sin(t * 1.2 + i * 2)); c.fillStyle = rgba(CYAN, 1); c.beginPath(); c.arc(kx, y, 4.5, 0, TAU); c.fill(); });
    c.restore(); }
  txt('智能红利，接入权的百年航线', 640, 68, 20, '#cfe8ff', { font: KAI, ls: 5, alpha: sm(seg(s, 0.3, 0.9)) });
  cmpCard(40, 380, '中：国家甄采构型，普惠通道，红利广泛派发', '西：市场主导构型，接入权向两端集中', sm(seg(s, 4.2, 4.8)) * (1 - sm(seg(s, 6.4, 6.9))), 380);
}

/* ---------- 第15章 甄采体制的一般理论 ---------- */
function sc15(s, t) {
  c.fillStyle = vgrad('#0a0710', '#221320'); c.fillRect(0, 0, W, H);
  const cx = 640, cy = 262, Rr = 150, ring = [-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6], names = ['变异', '甄别', '复制'], cols = [[96, 200, 235], [255, 210, 110], [255, 100, 80]];
  glow(cx, cy, 300, [255, 190, 100], 0.2 + 0.15 * pulse(t, 0.3));
  c.strokeStyle = 'rgba(255,220,150,0.1)'; c.lineWidth = 1; for (let r = 1; r < 5; r++) { c.beginPath(); c.arc(cx, cy, Rr * 0.5 + r * 60, 0, TAU); c.stroke(); }
  for (let i = 0; i < 3; i++) { const a0 = ring[i] + 0.35, a1 = ring[(i + 1) % 3] + (i === 2 ? TAU : 0) - 0.35; c.save(); c.lineCap = 'round'; c.strokeStyle = rgba(cols[i], 0.9); c.lineWidth = 3; c.beginPath(); c.arc(cx, cy, Rr, a0, a1 + (i === 2 ? 0 : 0)); c.stroke(); const ex = cx + Math.cos(a1) * Rr, ey = cy + Math.sin(a1) * Rr, ta = a1 + Math.PI / 2; c.fillStyle = rgba(cols[i], 1); c.beginPath(); c.moveTo(ex + Math.cos(ta) * 9, ey + Math.sin(ta) * 9); c.lineTo(ex + Math.cos(a1) * 14, ey + Math.sin(a1) * 14); c.lineTo(ex - Math.cos(ta) * 9, ey - Math.sin(ta) * 9); c.fill(); c.restore(); }
  // 节点
  names.forEach((n, i) => { const a = sm(seg(s, 0.15 + i * 0.2, 0.7 + i * 0.2)); const x = cx + Math.cos(ring[i]) * Rr, y = cy + Math.sin(ring[i]) * Rr; c.save(); c.globalAlpha *= a; glow(x, y, 70, cols[i], 0.45); c.fillStyle = 'rgba(8,6,12,0.88)'; c.beginPath(); c.arc(x, y, 38, 0, TAU); c.fill(); c.strokeStyle = rgba(cols[i], 1); c.lineWidth = 2.5; c.stroke(); txt(n, x, y + 1, 28, rgba(mix(cols[i], [255, 255, 255], 0.5)), { font: KAI, weight: 'bold' }); c.restore(); });
  // 循环中的“制度候选体”
  const shape = (k, x, y, r, col, a) => { c.fillStyle = rgba(col, a); c.beginPath(); const m = [0, 3, 4, 4, 5, 6][k % 6]; if (!m) c.arc(x, y, r, 0, TAU); else for (let q = 0; q < m; q++) { const an = q / m * TAU + (k === 3 ? Math.PI / 4 : -Math.PI / 2); q ? c.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r) : c.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } c.closePath(); c.fill(); };
  c.save(); c.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 12; k++) {
    const u = ((t * 0.22 + k / 12) % 1), seg3 = Math.floor(u * 3), local = u * 3 - seg3, ang = ring[0] + u * TAU * 0.999 + 0.0;
    const surv = k % 3 === 0; if (seg3 === 1 && !surv) { if (local > 0.5) continue; }
    const jitter = seg3 === 0 ? (R(k) - 0.5) * 36 * (1 - local) : 0, rad = Rr + jitter + (seg3 === 2 && k % 2 ? 10 : 0);
    const x = cx + Math.cos(ang) * rad, y = cy + Math.sin(ang) * rad, col = seg3 === 0 ? cols[0] : seg3 === 1 ? (surv ? cols[1] : [120, 120, 130]) : cols[2];
    const a = seg3 === 1 && !surv ? 0.8 * (1 - local * 2) : 1; shape(k, x, y, seg3 === 1 && surv ? 7 : 5, col, a); glow(x, y, 11, col, 0.5 * a);
  }
  c.restore();
  txt('甄采', cx, cy - 6, 78, 'rgba(255,224,160,0.95)', { font: KAI, weight: 'bold', shadow: 'rgba(255,170,60,0.8)', sb: 18 }); txt('一般理论', cx, cy + 50, 17, '#e8cf9a', { font: KAI, ls: 6 });
  // 四项判据 · 边界案例
  const ca = sm(seg(s, 1.4, 2.0));
  [['诱致与强制', 150, 156], ['中间扩散', 150, 226], ['分级试验', 1040, 156], ['两个退化极限', 1040, 226]].forEach(([n, x, y], i) => { c.save(); c.globalAlpha *= ca; c.strokeStyle = rgba(GOLD, 0.6); c.fillStyle = 'rgba(10,8,12,0.7)'; c.fillRect(x - 90, y - 24, 180, 48); c.strokeRect(x - 90.5, y - 24.5, 181, 49); txt(n, x, y, 18, '#f1d9a4', { font: KAI, ls: 3 }); c.restore(); });
  txt('四项可观察判据 · 四项区分性预测', 640, 78, 19, '#e8cf9a', { font: KAI, ls: 5, alpha: ca });
  const ba = sm(seg(s, 2.8, 3.4)); [['苏联指令经济', 250], ['印度联邦试验', 640], ['拉美移植困境', 1030]].forEach(([n, x], i) => { c.save(); c.globalAlpha *= ba; const y = 432; c.strokeStyle = 'rgba(200,190,210,0.55)'; c.setLineDash([3, 4]); c.beginPath(); c.arc(x, y, 17, 0, TAU); c.stroke(); c.setLineDash([]); glow(x, y, 26, [180, 170, 200], 0.25); txt(n, x, y + 32, 14, '#c8c0d6', { font: KAI, ls: 2 }); c.restore(); });
  cmpCard(40, 380, '边界案例检验判据区分力', '三者均偏离「诱致·选择·复制」闭环', sm(seg(s, 3.0, 3.6)) * 0, 330);
}

/* ---------- 第16章 中国之所以为中国 ---------- */
function sc16(s, t) {
  c.fillStyle = vgrad('#2a0b0a', '#d98a34'); c.fillRect(0, 0, W, H);
  const rise = eo(seg(s, 0, 2.2)); const sx = 640, sy = lerp(520, 300, rise); glow(sx, sy, 520, [255, 220, 130], 0.7); c.fillStyle = 'rgba(255,236,190,0.95)'; c.beginPath(); c.arc(sx, sy, 100, 0, TAU); c.fill();
  c.save(); c.globalCompositeOperation = 'lighter'; for (let k = 0; k < 24; k++) { const a = k / 24 * TAU + t * 0.08; c.strokeStyle = 'rgba(255,220,150,0.1)'; c.lineWidth = 14; c.beginPath(); c.moveTo(sx + Math.cos(a) * 110, sy + Math.sin(a) * 110); c.lineTo(sx + Math.cos(a) * 700, sy + Math.sin(a) * 700); c.stroke(); } c.restore();
  mount(430, 90, 11, 'rgba(60,20,10,0.55)', 0, 0.005); mount(470, 70, 12, 'rgba(30,10,6,0.85)', 0, 0.006);
  const dx = 640, dy = 440;
  // 轨道上的意象
  ['卜', '简', '版', '印', '机'].forEach((g, i) => { const a = t * 0.5 + i * TAU / 5, x = dx + Math.cos(a) * 400, y = 335 + Math.sin(a) * 45; c.save(); c.globalAlpha *= 0.85 * sm(seg(s, 1.0, 1.6)); c.fillStyle = 'rgba(20,8,6,0.7)'; c.beginPath(); c.arc(x, y, 22, 0, TAU); c.fill(); c.strokeStyle = rgba(GOLD, 0.9); c.lineWidth = 1.5; c.stroke(); txt(g, x, y + 1, 24, '#ffe3a0', { font: KAI, weight: 'bold' }); c.restore(); });
  // 鼎
    c.save(); c.translate(dx, dy); const sc = 1.1; c.scale(sc, sc);
  const bg = c.createLinearGradient(-120, 0, 120, 0); bg.addColorStop(0, '#3a2810'); bg.addColorStop(0.5 + 0.2 * Math.sin(t), '#f0cb70'); bg.addColorStop(1, '#3a2810');
  c.fillStyle = bg; c.strokeStyle = '#1c1206'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(-100, -90); c.quadraticCurveTo(-125, -20, -80, 24); c.lineTo(80, 24); c.quadraticCurveTo(125, -20, 100, -90); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(0, -90, 100, 12, 0, 0, TAU); c.fillStyle = '#2a1c0a'; c.fill(); c.stroke();
  [-110, 100].forEach(x => { c.fillStyle = bg; c.fillRect(x, -130, 10, 46); c.strokeRect(x, -130, 10, 46); c.fillRect(x - 6, -134, 22, 8); });
  [[-70, '准据'], [0, '容量'], [70, '通道']].forEach(([x, n], i) => { c.fillStyle = bg; c.beginPath(); c.moveTo(x - 14, 22); c.lineTo(x + 14, 22); c.lineTo(x + 10, 80); c.lineTo(x - 10, 80); c.closePath(); c.fill(); c.stroke(); });
  c.save(); c.beginPath(); c.moveTo(-100, -90); c.quadraticCurveTo(-125, -20, -80, 24); c.lineTo(80, 24); c.quadraticCurveTo(125, -20, 100, -90); c.clip(); meander(-110, -56, 220, 18, [50, 30, 8], 0.8); c.restore();
  c.restore();
  // 三参数
  [[-70, '准据', 0.0, [255, 120, 80]], [0, '容量', 0.3, [255, 230, 130]], [70, '通道', 0.6, [120, 230, 200]]].forEach(([x, n, d, col]) => {
    const a = sm(seg(s, 0.6 + d, 1.2 + d)), px = dx + x * 1.25 * 2.1 * 0.6 * 1, tx = [350, 640, 930][[-70, 0, 70].indexOf(x)];
    c.save(); c.globalAlpha *= a; c.globalCompositeOperation = 'lighter'; c.strokeStyle = rgba(col, 0.45); c.lineWidth = 3; c.beginPath(); c.moveTo(dx + x * 1.1, dy + 80 * 1.1 - 20); c.lineTo(tx, 215); c.stroke(); glow(tx, 205, 80, col, 0.55); c.restore();
    c.save(); c.globalAlpha *= a; txt(n, tx, 205, 42, rgba(mix(col, [255, 255, 255], 0.55)), { font: KAI, weight: 'bold', shadow: 'rgba(0,0,0,0.7)', sb: 10 }); c.restore();
  });
  const ta = sm(seg(s, 1.4, 2.2)); txt('甄采体制', 640, 92, 58, '#fff1c8', { font: KAI, weight: 'bold', alpha: ta, shadow: 'rgba(80,20,0,0.8)', sb: 14, ls: 20 });
  txt('中国三千年制度变迁的生成机制 · 智能时代的第四次大分流', 640, 140, 16, '#ffe3b0', { font: KAI, ls: 4, alpha: ta });
  seal(640 + 330, 96, '甄采', 38, CIN, ta);
}
