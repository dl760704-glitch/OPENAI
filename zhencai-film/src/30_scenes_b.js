/* ===== 分镜 · 第10章、第11章、第12章 ===== */
const CHINA = [[73.5,39.5],[76,40.5],[80,42],[80.5,45],[83,47],[85.5,47.2],[87.5,49],[90,47.7],[91,45.5],[95,44.5],[97,42.7],[101,42.5],[105,41.8],[110,42.5],[112,45],[116,46.5],[118,47.5],[119.5,50],[121,53.3],[124.5,53.5],[127,50.2],[130,48.8],[133.5,48.2],[134.7,47.5],[133,45],[131,43],[129.5,42.5],[127,41.5],[124.3,40],[122,39.5],[121.5,38.8],[122.3,37.4],[120.5,36.2],[119.3,35],[121.8,32.8],[121.9,31.2],[121.5,29.5],[120,26.5],[117.5,23.8],[114.5,22.3],[111,21.5],[109.7,21.5],[108,21.6],[106.5,22.3],[105,23],[102.5,22.7],[101,21.3],[98.7,24],[97.5,28],[96,29],[92,27.8],[88.8,27.3],[85,28.3],[81.5,30.2],[79,32.5],[78.5,35],[75.5,37],[74.5,38.5]];
const mapXY = (lon, lat, ox, oy, k) => [ox + (lon - 104) * k, oy - (lat - 36) * k * 1.12];

function gear(x, y, r, teeth, ang, col, hub) {
  c.save(); c.translate(x, y); c.rotate(ang);
  c.beginPath(); for (let i = 0; i < teeth * 2; i++) { const a = i / (teeth * 2) * TAU, rr = i % 2 ? r : r * 1.14, a2 = (i + 1) / (teeth * 2) * TAU; c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); c.lineTo(Math.cos(a2 - 0.02) * rr, Math.sin(a2 - 0.02) * rr); }
  c.closePath(); const g = c.createRadialGradient(0, 0, r * 0.2, 0, 0, r * 1.1); g.addColorStop(0, col[0]); g.addColorStop(1, col[1]); c.fillStyle = g; c.fill();
  c.strokeStyle = 'rgba(20,10,4,0.8)'; c.lineWidth = 2; c.stroke();
  c.beginPath(); c.arc(0, 0, r * 0.62, 0, TAU); c.strokeStyle = 'rgba(30,14,6,0.6)'; c.lineWidth = 2; c.stroke();
  c.beginPath(); c.arc(0, 0, r * 0.22, 0, TAU); c.fillStyle = 'rgba(20,10,4,0.85)'; c.fill();
  c.lineWidth = 3; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(Math.cos(k * TAU / 6) * r * 0.22, Math.sin(k * TAU / 6) * r * 0.22); c.lineTo(Math.cos(k * TAU / 6) * r * 0.62, Math.sin(k * TAU / 6) * r * 0.62); c.strokeStyle = 'rgba(30,14,6,0.55)'; c.stroke(); }
  if (hub) { c.rotate(-ang); txt(hub, 0, 0, r * 0.3, '#f3d89a', { font: KAI, weight: 'bold' }); }
  c.restore();
}
function handprint(x, y, r, a) {
  c.save(); c.translate(x, y); c.rotate(r); c.fillStyle = `rgba(185,30,24,${a})`;
  c.beginPath(); c.ellipse(0, 6, 14, 17, 0, 0, TAU); c.fill();
  for (let i = 0; i < 5; i++) { const an = -2.5 + i * 0.5 + (i === 0 ? -0.25 : 0), L = i === 0 ? 14 : 20 - Math.abs(i - 2) * 2; c.beginPath(); c.ellipse(Math.cos(an) * 17, 2 + Math.sin(an) * 17 - (i === 0 ? 0 : 3), 4, L * 0.55, an + Math.PI / 2, 0, TAU); c.fill(); }
  c.restore();
}

/* ---------- 第10章 同一台机器的两次换挡 ---------- */
function sc10(s, t) {
  const dawn = sm(seg(s, 0, 7)); c.fillStyle = vgrad(rgba(mix([34, 12, 10], [60, 16, 14], dawn)), rgba(mix([90, 24, 14], [196, 70, 34], dawn))); c.fillRect(0, 0, W, H);
  const gA = 1 - sm(seg(s, 2.8, 3.3)), gB = sm(seg(s, 2.9, 3.4)) * (1 - sm(seg(s, 4.9, 5.4))), gC = sm(seg(s, 5.0, 5.5));
  const ga = c.globalAlpha;
  // —— A 准据换挡：同一台机器 ——
  if (gA > 0.01) {
    c.globalAlpha = ga * gA;
    const sh1 = sm(seg(t, EV.shift[0], EV.shift[0] + 0.4)), sh2 = sm(seg(t, EV.shift[1], EV.shift[1] + 0.4));
    const speed = 0.3 + sh1 * 0.9 + sh2 * 1.6; const ang = (s < 0 ? 0 : s) * speed + (sh1 + sh2) * 2;
    glow(640, 290, 420, [255, 150, 60], 0.35 + 0.3 * pulse(t, 0.25));
    gear(560, 290, 120, 18, ang, ['#e0a64e', '#6b4318'], '准据');
    gear(560 + 120 * 1.07 + 70, 290 - 20, 70, 11, -ang * 120 / 70 + 0.2, ['#d58a3a', '#5c3414'], '');
    gear(560 - 120 * 1.07 - 55, 290 + 40, 55, 9, -ang * 120 / 55 + 0.1, ['#c97b3a', '#52300f'], '');
    // 变速杆
    c.save(); c.translate(920, 360); c.fillStyle = 'rgba(10,6,4,0.7)'; c.fillRect(-60, -30, 120, 150); c.strokeStyle = rgba(GOLD, 0.7); c.strokeRect(-60, -30, 120, 150);
    ['Ⅲ', 'Ⅱ', 'Ⅰ'].forEach((n, i) => { txt(n, -38, 10 + i * 42, 20, '#e9cf98', { font: KAI }); c.fillStyle = 'rgba(255,255,255,0.1)'; c.fillRect(-20, 4 + i * 42, 70, 14); });
    const pos = 2 - (sh1 + sh2) * 1; const ly = 10 + pos * 42; c.strokeStyle = '#c9a050'; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(10, 120); c.lineTo(10 + (pos - 1) * 4, ly); c.stroke(); c.fillStyle = '#b32a1e'; c.beginPath(); c.arc(10 + (pos - 1) * 4, ly, 12, 0, TAU); c.fill(); c.restore();
    // 档案
    [[EV.shift[0], 1000, 190, '1949'], [EV.shift[1], 1120, 250, '1978']].forEach(([t0, x, y, yr]) => { const a = eo(seg(t, t0, t0 + 0.5)); if (a <= 0) return;
      c.save(); c.translate(x, y + (1 - a) * 40); c.rotate(0.08 * (yr === '1949' ? -1 : 1)); c.globalAlpha *= a; c.fillStyle = '#e8d6a6'; c.fillRect(-52, -66, 104, 132); c.strokeStyle = '#6a4a24'; c.lineWidth = 2; c.strokeRect(-52, -66, 104, 132);
      for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(70,44,20,0.5)'; c.fillRect(-40, -44 + k * 14, 80 - (k % 3) * 14, 3); }
      txt(yr, 0, -50 + 0, 24, '#8c1e16', { font: KAI, weight: 'bold' }); txt('档案', 0, 52, 14, '#4a2c14', { font: KAI }); seal(26, 28, '换挡', 24, CIN); c.restore(); });
    txt('准据换挡：1949 · 1978', 640, 70, 18, '#f4d9a0', { font: KAI, ls: 5, alpha: sm(seg(s, 0.6, 1.2)), shadow: 'rgba(0,0,0,0.7)', sb: 6 });
    const yr = sh2 > 0.5 ? '1978' : sh1 > 0.5 ? '1949' : ''; if (yr) txt(yr, 560, 440, 54, 'rgba(255,230,170,0.92)', { font: KAI, weight: 'bold', shadow: 'rgba(0,0,0,0.6)', sb: 8 });
  }
  // —— B 小岗村红手印 ——
  if (gB > 0.01) {
    c.globalAlpha = ga * gB;
    c.fillStyle = vgrad('#1a0d08', '#3b2012'); c.fillRect(0, 0, W, H); glow(640, 240, 480, [255, 170, 80], 0.5 + 0.1 * Math.sin(t * 14));
    c.fillStyle = '#2a170c'; c.fillRect(0, 430, W, 120);
    c.save(); c.translate(640, 255); c.rotate(-0.015); c.fillStyle = '#e9d7a8'; c.fillRect(-330, -170, 660, 340); c.strokeStyle = '#7a5a30'; c.lineWidth = 2; c.strokeRect(-330, -170, 660, 340);
    c.fillStyle = 'rgba(120,90,50,0.1)'; for (let k = 0; k < 30; k++) c.fillRect(-330 + R(k) * 660, -170 + R(k, 1) * 340, 40, 2);
    vtxt('大包干契约', -280, -140, 24, '#3a1a08', { font: KAI, weight: 'bold' });
    ['我们分田到户', '每户户主签字盖章', '如不成我们干部', '坐牢杀头也干', '社员保证把我们的', '小孩养活到十八岁'].forEach((l, i) => vtxt(l, 255 - i * 44, -150, 19, '#3a1a08', { font: KAI, sp: 1.08 }));
    for (let i = 0; i < 18; i++) { const t0 = EV.hand0 + i * EV.handDt; if (t < t0) continue; const a = clamp((t - t0) / 0.06), col = i % 6, row = (i / 6) | 0;
      handprint(-210 + col * 76 + (R(i) - 0.5) * 12, 58 + row * 52 + (R(i, 1) - 0.5) * 6, (R(i, 2) - 0.5) * 0.5, 0.88 * a); }
    c.restore();
    txt('1978 · 凤阳小岗村 · 试点授权，容错默许', 640, 70, 18, '#f6dca4', { font: KAI, ls: 4, alpha: sm(seg(s, 3.2, 3.8)), shadow: 'rgba(0,0,0,0.7)', sb: 6 });
    flame(120, 380, 10, t, [255, 190, 90]); flame(1160, 380, 10, t + 1.3, [255, 190, 90]);
  }
  // —— C 复制推广：星火成势 ——
  if (gC > 0.01) {
    c.globalAlpha = ga * gC;
    c.fillStyle = vgrad('#1d0a0a', '#7a2214'); c.fillRect(0, 0, W, H);
    const ox = 640, oy = 300, k = 7.6, p0 = mapXY(117, 32.8, ox, oy, k), p1 = mapXY(114, 22.5, ox, oy, k);
    c.beginPath(); CHINA.forEach(([lo, la], i) => { const p = mapXY(lo, la, ox, oy, k); i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); }); c.closePath();
    c.fillStyle = 'rgba(20,6,6,0.75)'; c.fill(); c.strokeStyle = rgba(GOLD, 0.8); c.lineWidth = 1.6; c.stroke();
    const u = seg(t, EV.spread, 32.0);
    // 城点（确定性分布，向外扩散点亮）
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 220; i++) {
      const lo = 98 + R(i) * 30, la = 22 + R(i, 1) * 24; let inside = false; for (let a = 0, b = CHINA.length - 1; a < CHINA.length; b = a++) { const [xi, yi] = CHINA[a], [xj, yj] = CHINA[b]; if (((yi > la) !== (yj > la)) && lo < (xj - xi) * (la - yi) / (yj - yi) + xi) inside = !inside; }
      if (!inside) continue; const p = mapXY(lo, la, ox, oy, k); const d = Math.min(Math.hypot(p[0] - p0[0], p[1] - p0[1]), Math.hypot(p[0] - p1[0], p[1] - p1[1])) / 520; const a = sm((u * 1.3 - d) * 6); if (a <= 0) continue;
      const rr = 1.5 + R(i, 2) * 2.5; glow(p[0], p[1], rr * 4, [255, 190, 90], 0.8 * a); c.fillStyle = `rgba(255,236,190,${a})`; c.fillRect(p[0] - 1, p[1] - 1, 2, 2);
    }
    [p0, p1].forEach(p => { const age = t - EV.spread; for (let r = 0; r < 4; r++) { const a = ((age * 0.9 + r * 0.25) % 1); c.strokeStyle = `rgba(255,200,110,${0.7 * (1 - a)})`; c.lineWidth = 2; c.beginPath(); c.arc(p[0], p[1], a * 300, 0, TAU); c.stroke(); } glow(p[0], p[1], 40, [255, 220, 140], 0.9); });
    c.restore();
    txt('凤阳', p0[0] + 18, p0[1] - 12, 13, '#ffe6b0', { font: KAI, align: 'left' }); txt('深圳', p1[0] + 16, p1[1] + 8, 13, '#ffe6b0', { font: KAI, align: 'left' });
    // 城市天际线
    for (let i = 0; i < 26; i++) { const h = (20 + R(i) * 90) * eo(seg(t, 30.4 + i * 0.03, 31.5)); const x = 20 + i * 14; c.fillStyle = 'rgba(14,6,6,0.9)'; c.fillRect(x, H - 50 - h, 11, h); c.fillStyle = 'rgba(255,200,110,0.6)'; for (let w = 0; w < h / 9; w++) if (R(i, w) > 0.4) c.fillRect(x + 2 + (w % 2) * 4, H - 50 - h + 4 + w * 8, 2, 3); }
    for (let i = 0; i < 26; i++) { const h = (20 + R(i, 7) * 90) * eo(seg(t, 30.4 + i * 0.03, 31.5)); const x = W - 20 - 11 - i * 14; c.fillStyle = 'rgba(14,6,6,0.9)'; c.fillRect(x, H - 50 - h, 11, h); }
    txt('复制推广 · 星火成势 · 追赶启动', 640, 70, 18, '#f9dba0', { font: KAI, ls: 4, alpha: sm(seg(s, 5.3, 5.9)), shadow: 'rgba(0,0,0,0.7)', sb: 6 });
  }
  c.globalAlpha = ga;
  cmpCard(40, 380, '中：准据换挡 + 试点授权 → 追赶', '西：战后增长转缓，慢变量固化', sm(seg(s, 0.8, 1.4)) * (1 - sm(seg(s, 6.5, 7))), 340);
}

/* ---------- 第11章 欧洲这面镜子 ---------- */
function sc11(s, t) {
  c.fillStyle = vgrad('#140606', '#4a1612'); c.fillRect(0, 0, W, H);
  const mx = 640, my = 262, rr = 160;
  glow(mx, my, 420, [255, 160, 70], 0.28 + 0.2 * pulse(t, 0.3));
  // 六枚徽记环绕：六种政体构型
  const six = ['战争仿效', '重商顶层', '点火偶然', '政治分立', '法典移植', '明治维新'];
  six.forEach((n, i) => {
    const a = -Math.PI / 3 + i * TAU / 6 + Math.sin(s * 0.6) * 0.06, x = mx + Math.cos(a) * 340, y = my + Math.sin(a) * 158, al = sm(seg(s, 0.2 + i * 0.12, 0.7 + i * 0.12));
    c.save(); c.globalAlpha *= al; c.translate(x, y); c.fillStyle = 'rgba(14,6,6,0.75)'; c.beginPath(); c.arc(0, 0, 38, 0, TAU); c.fill(); c.strokeStyle = rgba(GOLD, 0.85); c.lineWidth = 2; c.stroke(); c.beginPath(); c.arc(0, 0, 32, 0, TAU); c.lineWidth = 0.8; c.stroke();
    txt(n.slice(0, 2), 0, -11, 18, '#f0d9a2', { font: KAI, ls: 2 }); txt(n.slice(2), 0, 11, 18, '#f0d9a2', { font: KAI, ls: 2 }); c.restore();
  });
  // 铜镜
  const fl0 = EV.flip.reduce((a, t0) => a + (t > t0 ? 1 : 0), 0), flip = EV.flip.reduce((a, t0) => a + (t > t0 + 0.2 ? 1 : 0), 0), since = t - (EV.flip[Math.max(0, fl0 - 1)] || -9), fa = fl0 > 0 && since < 0.4 ? Math.abs(Math.cos(clamp(since / 0.4) * Math.PI)) : 1;
  c.save(); c.translate(mx, my);
  const bg = c.createRadialGradient(-40, -50, 20, 0, 0, rr); bg.addColorStop(0, '#e6c36c'); bg.addColorStop(0.7, '#a37a2c'); bg.addColorStop(1, '#5a3d12'); c.fillStyle = bg; c.beginPath(); c.arc(0, 0, rr, 0, TAU); c.fill();
  c.strokeStyle = '#2a1706'; c.lineWidth = 4; c.stroke(); c.lineWidth = 1.2; for (let r = 1; r <= 3; r++) { c.beginPath(); c.arc(0, 0, rr - r * 9, 0, TAU); c.strokeStyle = 'rgba(40,22,6,0.55)'; c.stroke(); }
  c.save(); c.rotate(s * 0.15); for (let k = 0; k < 24; k++) { c.rotate(TAU / 24); c.fillStyle = 'rgba(60,34,10,0.55)'; c.fillRect(rr - 26, -4, 14, 8); } c.restore();
  // 镜面：映像（欧洲 / 移植 / 再定型）
  c.save(); c.beginPath(); c.arc(0, 0, rr - 34, 0, TAU); c.clip(); c.scale(1, fa * 0.92 + 0.08);
  c.fillStyle = vgrad('#cfe3ee', '#78a0b8', -rr, rr); c.fillRect(-rr, -rr, rr * 2, rr * 2);
  const k0 = Math.min(3, flip);
  if (k0 === 0 || k0 === 1) { // 哥特式教堂 + 拿破仑法典
    c.fillStyle = '#2a3744'; c.fillRect(-70, -20, 140, 130); c.fillRect(-92, 20, 30, 90); c.fillRect(62, 20, 30, 90);
    [-52, 52].forEach(x => { c.beginPath(); c.moveTo(x - 22, -20); c.lineTo(x, -125); c.lineTo(x + 22, -20); c.closePath(); c.fill(); }); c.beginPath(); c.moveTo(-14, -20); c.lineTo(0, -80); c.lineTo(14, -20); c.fill();
    c.fillStyle = '#cfe3ee'; c.beginPath(); c.arc(0, 20, 20, 0, TAU); c.fill(); c.fillRect(-8, 40, 16, 60);
    if (k0 === 1) { c.fillStyle = '#7d2a20'; c.fillRect(-60, 70, 120, 56); c.fillStyle = '#f1e2b8'; c.fillRect(-52, 76, 104, 44); txt('CODE CIVIL', 0, 90, 12, '#3a2410', { font: 'serif', weight: 'bold' }); txt('1804', 0, 108, 14, '#3a2410', { font: 'serif', weight: 'bold' }); }
  } else { // 明治：旭日与鸟居
    c.fillStyle = '#d6402e'; c.beginPath(); c.arc(0, -20, 62, 0, TAU); c.fill(); for (let k = 0; k < 16; k++) { c.strokeStyle = 'rgba(214,64,46,0.55)'; c.lineWidth = 4; c.beginPath(); c.moveTo(Math.cos(k * TAU / 16) * 72, -20 + Math.sin(k * TAU / 16) * 72); c.lineTo(Math.cos(k * TAU / 16) * 120, -20 + Math.sin(k * TAU / 16) * 120); c.stroke(); }
    c.fillStyle = '#b8261a'; c.fillRect(-80, 40, 160, 12); c.fillRect(-70, 56, 140, 8); c.fillRect(-60, 52, 14, 70); c.fillRect(46, 52, 14, 70);
    txt('1868', 0, 120, 18, '#2a1a0e', { font: 'serif', weight: 'bold' });
  }
  glow(-60 + ((t * 40) % 220), -60, 90, [255, 255, 255], 0.18);
  c.restore();
  c.fillStyle = '#8a6420'; c.beginPath(); c.arc(0, 0, 0.1, 0, TAU); c.fill(); c.restore();
  const ta = sm(seg(s, 1.6, 2.2)); txt('定型权集中度，决定移植改造深度', 640, 70, 18, '#f9dba0', { font: KAI, ls: 4, alpha: ta, shadow: 'rgba(0,0,0,0.7)', sb: 6 });
  cmpCard(40, 380, '检验：是否「中国例外」？', '镜中：拿破仑法典 · 明治维新的再定型', sm(seg(s, 1.0, 1.6)) * (1 - sm(seg(s, 4.5, 5))), 340);
}

/* ---------- 第12章 当机器不再需要人 ---------- */
function sc12(s, t) {
  c.fillStyle = vgrad('#040918', '#0d2c4d'); c.fillRect(0, 0, W, H);
  // 星点
  for (let i = 0; i < 90; i++) { c.fillStyle = `rgba(190,230,255,${0.2 + 0.5 * R(i) * (0.6 + 0.4 * Math.sin(t * 2 + i))})`; c.fillRect(R(i, 1) * W, R(i, 2) * 300, 1.5, 1.5); }
  const gA = 1 - sm(seg(s, 3.3, 3.9)), gB = sm(seg(s, 3.4, 4.0));
  const ga = c.globalAlpha;
  // —— A 三条依赖纽带 ——
  if (gA > 0.01) {
    c.globalAlpha = ga * gA;
    const cx = 640, cy = 120, snaps = EV.snap, snapped = snaps.map(t0 => t > t0);
    const live = 1 - (snapped.filter(Boolean).length) / 3;
    glow(cx, cy, 160, [255, 200, 90], 0.15 + 0.5 * live);
    // 王座 / 权力
    c.fillStyle = '#0a0f1c'; c.fillRect(cx - 40, cy - 40, 80, 80); c.strokeStyle = rgba(GOLD, 0.5 + 0.5 * live); c.lineWidth = 2; c.strokeRect(cx - 40, cy - 40, 80, 80); txt('权', cx, cy, 52, rgba(GOLD, 0.45 + 0.55 * live), { font: KAI, weight: 'bold' });
    const lanes = [{ x: 260, n: '生产', i: 0 }, { x: 640, n: '财政', i: 1 }, { x: 1020, n: '兵源', i: 2 }];
    lanes.forEach(L => {
      const t0 = snaps[L.i], broken = t > t0, bt = broken ? t - t0 : 0;
      const col = broken ? [120, 140, 170] : [255, 210, 110];
      // 纽带
      for (let strand = 0; strand < 3; strand++) {
        c.beginPath(); const ph = strand * 2.1;
        const endY = broken ? 410 - bt * 180 * (1 + strand * 0.2) : 410;
        const topY = cy + 40 + (broken ? bt * 220 * (0.6 + strand * 0.25) : 0);
        for (let k = 0; k <= 30; k++) { const u = k / 30, y = lerp(topY, endY, u), amp = broken ? 14 * (1 - u) : (4 + (t < t0 ? (seg(t, t0 - 0.9, t0)) * 10 : 0)), x = lerp(cx, L.x, u) + Math.sin(u * 12 + t * 7 + ph) * amp * Math.sin(u * Math.PI) + (strand - 1) * 4;
          k ? c.lineTo(x, y) : c.moveTo(x, y); }
        c.strokeStyle = rgba(col, broken ? Math.max(0, 0.7 - bt * 0.5) : 0.85); c.lineWidth = 3 - strand * 0.5; c.stroke();
      }
      if (!broken) { c.save(); c.globalCompositeOperation = 'lighter'; for (let k = 0; k < 5; k++) { const u = ((t * 0.5 + k / 5) % 1), y = lerp(cy + 40, 410, u), x = lerp(cx, L.x, u); glow(x, y, 9, [255, 220, 130], 0.9); } c.restore(); }
      if (broken && bt < 0.5) { c.save(); c.globalCompositeOperation = 'lighter'; glow(lerp(cx, L.x, 0.5), 260, 160 * (1 - bt * 2), [255, 240, 200], 0.9); c.restore(); for (let k = 0; k < 14; k++) { const a = R(k + L.i * 20) * TAU, sp = 120 * R(k, 5); c.fillStyle = `rgba(255,230,160,${1 - bt * 2})`; c.fillRect(lerp(cx, L.x, 0.5) + Math.cos(a) * sp * bt * 2, 260 + Math.sin(a) * sp * bt * 2, 2.5, 2.5); } }
      // 下方群像
      c.fillStyle = 'rgba(8,14,28,0.9)'; c.fillRect(L.x - 120, 410, 240, 100);
      for (let k = 0; k < 7; k++) person(L.x - 90 + k * 30, 500, 46 + R(k + L.i * 9) * 8, broken ? '#4a6a8c' : '#c9a458', { aL: broken ? 1.4 : 1.9, aR: broken ? 1.7 : 1.2 });
      // 图标
      c.save(); c.translate(L.x, 375); c.strokeStyle = rgba(broken ? [130, 160, 190] : GOLD, 0.9); c.lineWidth = 2.4; c.fillStyle = 'rgba(0,0,0,0)';
      if (L.i === 0) { gear(0, 0, 18, 8, t * (broken ? 0.3 : 2), broken ? ['#52667f', '#243445'] : ['#e0b25a', '#6b4a1a'], ''); }
      else if (L.i === 1) { c.beginPath(); c.arc(0, 0, 18, 0, TAU); c.stroke(); c.strokeRect(-6, -6, 12, 12); }
      else { c.beginPath(); c.moveTo(0, -24); c.lineTo(0, 22); c.moveTo(-10, -14); c.lineTo(10, -14); c.moveTo(-10, -24); c.lineTo(10, -24); c.stroke(); }
      c.restore();
      txt(L.n, L.x, 355, 18, broken ? '#8aa4c0' : '#ffe2a2', { font: KAI, ls: 6 });
    });
    txt('依赖纽带松动：生产 · 财政 · 兵源', 640, 66, 18, '#bfe4ff', { font: KAI, ls: 4, alpha: sm(seg(s, 0.4, 1)) });
  }
  // —— B 具身机器人运动会 ——
  if (gB > 0.01) {
    c.globalAlpha = ga * gB;
    // 数据中心剪影
    for (let k = 0; k < 9; k++) { const x = 60 + k * 140, h = 70 + (k % 4) * 26; c.fillStyle = '#071326'; c.fillRect(x, 330 - h, 90, h); for (let l = 0; l < h / 10; l++) for (let m = 0; m < 6; m++) { const on = Math.sin(t * 3 + k * 3 + l * 1.7 + m) > 0.2; c.fillStyle = on ? 'rgba(90,230,255,0.85)' : 'rgba(20,50,70,0.8)'; c.fillRect(x + 6 + m * 14, 330 - h + 6 + l * 10, 8, 4); } }
    // 看台与人群
    c.fillStyle = '#0b1830'; c.fillRect(0, 352, W, 56);
    for (let k = 0; k < 96; k++) { const x = 8 + k * 13.3, y = 366 + (k % 3) * 12, jump = Math.abs(Math.sin(t * 5 + k)) * 5 * pulse(t, 0.4); c.fillStyle = `rgba(${200 + R(k) * 55 | 0},${120 + R(k, 1) * 100 | 0},${80 + R(k, 2) * 60 | 0},0.9)`; c.beginPath(); c.arc(x, y - jump, 3.5, 0, TAU); c.fill(); c.fillRect(x - 3, y - jump + 3, 6, 9); }
    // 灯笼
    for (let k = 0; k < 12; k++) { const x = 60 + k * 106, y = 150 + 10 * Math.sin(t * 1.4 + k); c.strokeStyle = 'rgba(230,200,140,0.5)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, y - 18); c.stroke(); glow(x, y, 40, [255, 80, 50], 0.5); c.fillStyle = '#c4281e'; c.beginPath(); c.ellipse(x, y, 13, 17, 0, 0, TAU); c.fill(); c.fillStyle = '#e8b64a'; c.fillRect(x - 6, y - 19, 12, 3); c.fillRect(x - 6, y + 16, 12, 3); }
    // 跑道与机器人
    c.fillStyle = '#17304f'; c.fillRect(0, 408, W, 76); c.strokeStyle = 'rgba(255,255,255,0.35)'; c.lineWidth = 2; for (let l = 0; l < 3; l++) { c.beginPath(); c.moveTo(0, 424 + l * 20); c.lineTo(W, 424 + l * 20); c.stroke(); }
    const run = Math.max(0, t - EV.robots + 0.6);
    for (let r = 0; r < 6; r++) {
      const lane = r % 3, x = lerp(-80, W + 80, ((run * (0.14 + r * 0.012) + r * 0.1) % 1)), y = 428 + lane * 20, ph = t * 12 + r, hs = 62;
      if (x < -60 || x > W + 60) continue; c.save(); c.translate(x, y);
      glow(0, -32, 55, [90, 220, 235], 0.25);
      c.strokeStyle = '#d6edf7'; c.lineWidth = 5; c.lineCap = 'round';
      c.beginPath(); c.moveTo(0, -hs * 0.45); c.lineTo(Math.sin(ph) * 14, -hs * 0.2); c.lineTo(Math.sin(ph) * 22 - 4, 0); c.stroke();
      c.beginPath(); c.moveTo(0, -hs * 0.45); c.lineTo(Math.sin(ph + Math.PI) * 14, -hs * 0.2); c.lineTo(Math.sin(ph + Math.PI) * 22 - 4, 0); c.stroke();
      c.fillStyle = r % 2 ? '#d5382a' : '#e7c14d'; c.fillRect(-9, -hs * 0.95, 18, hs * 0.5); c.fillStyle = '#e6f5fb'; c.fillRect(-7, -hs * 1.2, 14, 14); c.fillStyle = 'rgba(90,220,235,0.95)'; c.fillRect(-4, -hs * 1.12, 8, 3);
      c.strokeStyle = '#d6edf7'; c.lineWidth = 4; c.beginPath(); c.moveTo(-9, -hs * 0.9); c.lineTo(-9 + Math.sin(ph + Math.PI) * 14, -hs * 0.65); c.moveTo(9, -hs * 0.9); c.lineTo(9 + Math.sin(ph) * 14, -hs * 0.65); c.stroke();
      c.restore();
    }
    // 横幅
    c.save(); c.translate(640, 88); c.fillStyle = 'rgba(180,30,24,0.95)'; c.fillRect(-250, -26, 500, 52); c.strokeStyle = rgba(GOLD, 0.95); c.lineWidth = 2; c.strokeRect(-246, -22, 492, 44); txt('具 身 机 器 人 运 动 会', 0, 1, 30, '#ffe7b0', { font: KAI, weight: 'bold', ls: 8 }); c.restore();
    c.save(); c.globalCompositeOperation = 'lighter'; for (let k = 0; k < 40; k++) { const a = (t * 0.4 + k / 40) * TAU, rx = 140, ry = 28; glow(640 + Math.cos(a) * rx * 3.6, 185 + Math.sin(a) * ry, 7, [120, 240, 255], 0.9); } c.restore();
  }
  c.globalAlpha = ga;
  cmpCard(40, 150, '中：开源权重路线 · 应用普及', '美：私人AI投资 · 头部IPO竞速', sm(seg(s, 4.4, 5)) * (1 - sm(seg(s, 6.5, 7))), 340);
}
