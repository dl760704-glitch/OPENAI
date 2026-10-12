/* ===== 分镜 · 序、第7章、第8章、第9章 ===== */
function scPrologue(s, t) {
  c.fillStyle = '#060403'; c.fillRect(0, 0, W, H);
  glow(W / 2, H / 2 + 10, 520, [120, 70, 30], 0.35 + 0.1 * Math.sin(t * 2));
  // 浮尘
  c.save(); c.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 60; i++) { const x = (R(i) * W + t * (6 + R(i, 2) * 14)) % W, y = (R(i, 1) * H - t * (4 + R(i, 3) * 8) + H * 3) % H; c.fillStyle = `rgba(240,200,130,${0.15 + 0.2 * R(i, 4)})`; c.fillRect(x, y, 1.5, 1.5); }
  c.restore();
  const ch = [...'甄采体制'];
  ch.forEach((g, i) => {
    const t0 = 0.4 + i * 0.2, a = sm(seg(s, t0, t0 + 0.5)); if (a <= 0) return;
    const x = W / 2 + (i - 1.5) * 170;
    c.save(); c.translate(x, 245); c.scale(1 + 0.15 * (1 - a), 1 + 0.15 * (1 - a)); c.globalAlpha *= a;
    glow(0, 0, 150, GOLD, 0.22 + 0.2 * pulse(t, 0.4));
    txt(g, 3, 4, 150, 'rgba(0,0,0,0.55)', { font: KAI, weight: 'bold' });
    const gr = c.createLinearGradient(0, -75, 0, 75); gr.addColorStop(0, '#f6dc9a'); gr.addColorStop(1, '#b57a2c');
    txt(g, 0, 0, 150, gr, { font: KAI, weight: 'bold' });
    c.restore();
  });
  const a2 = sm(seg(s, 1.5, 2.2));
  txt('中国三千年制度变迁史', W / 2, 352, 30, '#e8cf9a', { alpha: a2, font: KAI, ls: 10 });
  txt('史诗编年 · 公元前1046年 — 公元2026年', W / 2, 392, 14, '#b89b6a', { alpha: a2 * 0.85, ls: 4 });
  c.save(); c.globalAlpha *= a2; c.strokeStyle = rgba(GOLD, 0.6); c.lineWidth = 1.2; c.beginPath(); c.moveTo(W / 2 - 220, 322); c.lineTo(W / 2 + 220, 322); c.stroke(); c.restore();
  seal(W / 2 + 330, 330, '甄采', 40, CIN, a2);
}

/* ---------- 第7章 采诗官与贞人的黄昏 ---------- */
function shellPts(rx, ry) {
  const p = []; for (let i = 0; i < 64; i++) { const a = i / 64 * TAU, ca = Math.cos(a), sa = Math.sin(a); p.push([rx * Math.sign(ca) * Math.pow(Math.abs(ca), 0.78), ry * Math.sign(sa) * Math.pow(Math.abs(sa), 0.9) * (sa < 0 ? 0.97 : 1.04)]); }
  return p;
}
function sc7(s, t) {
  c.fillStyle = vgrad('#120a06', '#3a1c0d'); c.fillRect(0, 0, W, H);
  const gA = 1 - sm(seg(s, 2.55, 3.15)), gB = sm(seg(s, 2.6, 3.2)) * (1 - sm(seg(s, 4.75, 5.35))), gC = sm(seg(s, 4.8, 5.4));
  const ga = c.globalAlpha;
  // —— A 殷墟甲骨，贞人占卜 ——
  if (gA > 0.01) {
    c.globalAlpha = ga * gA;
    glow(640, 130, 330, [200, 120, 50], 0.28); c.strokeStyle = 'rgba(230,170,90,0.18)'; c.lineWidth = 2; c.beginPath(); c.arc(640, 130, 150 + 6 * Math.sin(t * 1.5), 0, TAU); c.stroke();
    txt('帝', 640, 130, 120, 'rgba(240,190,110,0.16)', { font: KAI, weight: 'bold' });
    // 龟甲
    c.save(); c.translate(640, 305);
    const pts = shellPts(255, 168);
    c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.closePath();
    const sg = c.createRadialGradient(-30, -40, 20, 0, 0, 260); sg.addColorStop(0, '#dcc283'); sg.addColorStop(0.7, '#a98650'); sg.addColorStop(1, '#6a4b27'); c.fillStyle = sg; c.fill();
    c.lineWidth = 3; c.strokeStyle = '#2a170a'; c.stroke(); c.save(); c.clip();
    for (let i = 0; i < 140; i++) { c.fillStyle = `rgba(50,28,12,${0.08 + R(i) * 0.14})`; c.beginPath(); c.arc((R(i, 1) - 0.5) * 520, (R(i, 2) - 0.5) * 340, 0.8 + R(i, 3) * 2.2, 0, TAU); c.fill(); }
    c.strokeStyle = 'rgba(45,25,10,0.55)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(0, -170); c.lineTo(0, 175); c.stroke();
    [-95, -30, 38, 100].forEach((y, k) => { c.beginPath(); c.moveTo(-250, y + 10 * (k % 2)); c.quadraticCurveTo(-120, y - 14, 0, y); c.quadraticCurveTo(120, y - 14, 250, y + 10 * (k % 2)); c.stroke(); });
    ['帝', '王', '贞', '雨', '年', '祀', '戎', '受'].forEach((g, i) => { const col = i < 4 ? -1 : 1, row = i % 4; txt(g, col * (155 + (row % 2) * 30), -95 + row * 62, 24, 'rgba(60,32,12,0.65)', { font: KAI }); });
    // 钻凿与兆纹
    const pit = [[-0, -108], [0, -48], [0, 12], [0, 72], [0, 124]];
    pit.forEach((p, i) => {
      const t0 = EV.crack[i], heat = sm(seg(t, t0 - 0.35, t0)) * (1 - sm(seg(t, t0 + 0.05, t0 + 1.2)));
      c.fillStyle = '#2a1608'; c.beginPath(); c.ellipse(p[0], p[1], 7, 4, 0, 0, TAU); c.fill();
      if (heat > 0.01) { c.save(); c.globalCompositeOperation = 'lighter'; glow(p[0], p[1], 46, [255, 120, 30], 0.7 * heat); c.restore(); }
      const pr = eo(seg(t, t0, t0 + 0.3)), L = 38;
      if (pr > 0) {
        c.strokeStyle = `rgba(30,12,4,0.95)`; c.lineWidth = 2.4; c.lineCap = 'round';
        c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(p[0], p[1] - L * pr); c.stroke();
        c.beginPath(); c.moveTo(p[0], p[1] - L * 0.45 * pr); c.lineTo(p[0] + 30 * pr * (i % 2 ? -1 : 1), p[1] - L * 0.62 * pr); c.stroke();
        c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = `rgba(255,140,40,${0.9 * (1 - sm(seg(t, t0 + 0.2, t0 + 1.4)))})`; c.lineWidth = 1.2;
        c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(p[0], p[1] - L * pr); c.stroke(); c.restore();
      }
    });
    c.restore();   // clip
    c.restore();   // translate
    // 火星
    c.save(); c.globalCompositeOperation = 'lighter';
    EV.crack.forEach((t0, i) => { const age = t - t0; if (age < 0 || age > 1) return; const px = 640, py = 305 - 108 + i * 58 - 0;
      for (let k = 0; k < 14; k++) { const a = R(i * 20 + k) * TAU, sp = 40 + R(i * 20 + k, 1) * 120; c.fillStyle = `rgba(255,${150 + R(k) * 90 | 0},60,${1 - age})`; c.fillRect(px + Math.cos(a) * sp * age, py + Math.sin(a) * sp * age + 120 * age * age, 2, 2); } });
    c.restore();
    // 贞人、火盆
    person(230, 470, 250, '#0a0503', { aL: -1.75, aR: -1.4, hat: 2 }); flame(330, 468, 16, t);
    c.fillStyle = '#0a0503'; c.beginPath(); c.moveTo(300, 448); c.lineTo(360, 448); c.lineTo(350, 470); c.lineTo(310, 470); c.closePath(); c.fill();
    person(1040, 470, 150, '#0a0503', { aL: 1.0, aR: 2.0 }); person(1110, 470, 130, '#0a0503', { aL: 1.2, aR: 1.9 });
    // 烟
    c.strokeStyle = 'rgba(200,170,130,0.14)'; c.lineWidth = 6; for (let k = 0; k < 3; k++) { c.beginPath(); for (let y = 445; y > 120; y -= 10) { const x = 330 + Math.sin(y * 0.03 + t * 1.5 + k) * (20 + (445 - y) * 0.12) + k * 12; y === 445 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); }
    txt('殷墟 YH127 · 贞人集团占卜行政 · 绝地天通的通神垄断', 640, 70, 16, 'rgba(230,200,150,0.85)', { font: KAI, ls: 3, alpha: sm(seg(s, 0.6, 1.2)) });
  }
  // —— B 周人以德配天，采诗官摇木铎 ——
  if (gB > 0.01) {
    c.globalAlpha = ga * gB;
    c.fillStyle = vgrad('#4a3326', '#e0b070', 0, 340); c.fillRect(0, 0, W, 340);
    const sx = 870, sy = 270; glow(sx, sy, 300, [255, 210, 130], 0.8); c.fillStyle = '#fff1c8'; c.beginPath(); c.arc(sx, sy, 38, 0, TAU); c.fill();
    mount(300, 120, 1, 'rgba(70,45,30,0.55)', s * 4, 0.004); mount(335, 80, 2, 'rgba(50,30,20,0.75)', s * 9, 0.005);
    c.fillStyle = vgrad('#6a4a2a', '#2c1a0e', 335, H); c.fillRect(0, 335, W, H - 335);
    roof(1010, 245, 190, 40, '#1b0f08');
    c.fillStyle = 'rgba(255,200,120,0.25)'; c.fillRect(960, 285, 100, 50);
    txt('宗庙', 1010, 215, 14, 'rgba(240,200,140,0.9)', { font: KAI, ls: 4 });
    // 田垄与庶人
    c.strokeStyle = 'rgba(30,18,8,0.45)'; c.lineWidth = 2; for (let k = 0; k < 7; k++) { c.beginPath(); c.moveTo(0, 360 + k * 24); c.quadraticCurveTo(W / 2, 350 + k * 24 + (k % 2) * 10, W, 360 + k * 24); c.stroke(); }
    const vx = [200, 330, 470, 600, 700, 820, 940, 1090];
    vx.forEach((x, i) => { const y = 400 + (i % 3) * 22 + 20; person(x, y, 60 + (i % 3) * 8, '#120a05', { aL: 1.1 + 0.25 * Math.sin(t * 3 + i), aR: 0.5 + 0.3 * Math.cos(t * 2 + i) }); });
    // 采诗官
    const ox = lerp(110, 820, seg(s, 2.7, 5.2)), oy = 440, step = Math.sin(t * 8) * 2;
    person(ox, oy - Math.abs(step), 165, '#0b0604', { hat: 1, aL: 1.3, aR: -1.2, walk: step });
    const sw = Math.sin(t * 9) * 0.35 + EV.tuo.reduce((a, t0) => a + (t > t0 ? Math.exp(-(t - t0) * 3) * Math.sin((t - t0) * 24) * 0.7 : 0), 0);
    c.strokeStyle = '#0b0604'; c.lineWidth = 3; c.beginPath(); c.moveTo(ox + 28, oy - 110); c.lineTo(ox + 62, oy - 200); c.stroke();
    c.save(); c.translate(ox + 62, oy - 200); c.rotate(sw); c.fillStyle = '#c99a3a'; c.beginPath(); c.moveTo(-10, 0); c.quadraticCurveTo(-14, 20, -16, 26); c.lineTo(16, 26); c.quadraticCurveTo(14, 20, 10, 0); c.closePath(); c.fill(); c.fillStyle = '#5a3a14'; c.fillRect(-2, 22, 4, 10); c.restore();
    c.fillStyle = '#2b1a0c'; c.fillRect(ox - 34, oy - 96, 22, 30);           // 竹篮
    EV.tuo.forEach(t0 => { const a = t - t0; if (a < 0 || a > 1) return; c.strokeStyle = `rgba(255,220,150,${0.7 * (1 - a)})`; c.lineWidth = 2; c.beginPath(); c.arc(ox + 62, oy - 180, 10 + a * 150, 0, TAU); c.stroke(); });
    // 诗句：自庶人升起，汇入采诗官之篮，再奉入宗庙
    const poem = [...'关关雎鸠在河之洲窈窕淑女君子好逑'];
    c.save(); c.globalCompositeOperation = 'lighter';
    poem.forEach((g, i) => {
      const t0 = 3.0 + i * 0.13 + 3.0 * 0, age = s - t0; if (age < 0 || age > 2.2) return;
      const vxp = vx[i % vx.length], vyp = 360; let x, y;
      if (age < 1.0) { const u = eo(age / 1.0); x = lerp(vxp, ox - 22, u); y = lerp(vyp, oy - 90, u) - Math.sin(u * Math.PI) * 70; }
      else { const u = sm((age - 1.0) / 1.2); x = lerp(ox - 22, 1010, u); y = lerp(oy - 90, 300, u) - Math.sin(u * Math.PI) * 120; }
      const a = Math.min(1, age * 3) * (1 - sm(seg(age, 1.9, 2.2)));
      txt(g, x, y, 22, `rgba(255,220,140,${a})`, { font: KAI, shadow: 'rgba(255,190,80,0.9)', sb: 12 });
    });
    c.restore();
    txt('周人以德配天 · 合法性来源向民间开放', 640, 68, 17, 'rgba(255,236,196,0.95)', { font: KAI, ls: 4, alpha: sm(seg(s, 3.0, 3.6)), shadow: 'rgba(0,0,0,0.8)', sb: 6 });
  }
  // —— C 利簋·大盂鼎 ——
  if (gC > 0.01) {
    c.globalAlpha = ga * gC;
    c.fillStyle = '#080503'; c.fillRect(0, 0, W, H); glow(640, 280, 520, [170, 110, 40], 0.5);
    const flash = Math.exp(-Math.max(0, t - EV.gui) * 5) * (t > EV.gui ? 1 : 0);
    // 大盂鼎（背影）与「德」
    txt('德', 330, 270, 280, `rgba(226,178,84,${0.12 + 0.12 * flash})`, { font: KAI, weight: 'bold' });
    c.save(); c.translate(330, 372); c.fillStyle = 'rgba(120,90,40,0.5)';
    c.beginPath(); c.moveTo(-95, -170); c.quadraticCurveTo(-120, -80, -85, -20); c.lineTo(85, -20); c.quadraticCurveTo(120, -80, 95, -170); c.closePath(); c.fill();
    c.fillRect(-100, -176, 24, 22); c.fillRect(76, -176, 24, 22); [-70, 0, 70].forEach(x => c.fillRect(x - 11, -20, 22, 62)); c.restore();
    // 利簋
    const bx = 770, by = 330, sc = 1.15;
    c.save(); c.translate(bx, by); c.scale(sc, sc);
    const bg = c.createLinearGradient(-130, 0, 130, 0); bg.addColorStop(0, '#4c3c1c'); bg.addColorStop(0.35 + 0.15 * Math.sin(t * 1.2), '#d4ad58'); bg.addColorStop(1, '#4c3c1c');
    c.fillStyle = bg; c.strokeStyle = '#1e1408'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(-135, -70); c.bezierCurveTo(-130, 20, -80, 55, 0, 58); c.bezierCurveTo(80, 55, 130, 20, 135, -70); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(0, -70, 135, 16, 0, 0, TAU); c.fillStyle = '#2d200e'; c.fill(); c.stroke();
    c.lineWidth = 9; c.strokeStyle = '#a98238'; c.beginPath(); c.arc(-150, -20, 30, -1.3, 1.5); c.stroke(); c.beginPath(); c.arc(150, -20, 30, 1.64, -1.8, true); c.stroke();
    c.fillStyle = bg; c.fillRect(-90, 56, 180, 76); c.strokeStyle = '#1e1408'; c.lineWidth = 2; c.strokeRect(-90, 56, 180, 76);
    c.save(); c.beginPath(); c.rect(-90, 56, 180, 76); c.clip(); meander(-90, 70, 180, 24, [40, 26, 10], 0.9); meander(-90, 100, 180, 24, [40, 26, 10], 0.9); c.restore();
    c.save(); c.beginPath(); c.moveTo(-135, -70); c.bezierCurveTo(-130, 20, -80, 55, 0, 58); c.bezierCurveTo(80, 55, 130, 20, 135, -70); c.clip(); meander(-135, -40, 270, 22, [40, 26, 10], 0.85); c.restore();
    c.restore();
    glow(bx, by - 20, 260, [255, 200, 90], 0.25 + 0.45 * flash);
    ['武王征商', '唯甲子朝', '岁鼎克昏', '夙有商'].forEach((col, i) => {
      const a = sm(seg(s, 5.5 + i * 0.28, 5.9 + i * 0.28));
      vtxt(col, 1040 - i * 48, 110, 28, `rgba(255,218,140,${a})`, { font: KAI, shadow: 'rgba(255,170,60,0.9)', sb: 10 });
    });
    txt('利簋 · 大盂鼎 · 铭文以德配天', 640, 70, 17, 'rgba(255,230,180,0.9)', { font: KAI, ls: 4 });
    c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = `rgba(255,220,150,${0.9 * flash})`; c.fillRect(0, 0, W, H); c.restore();
  }
  c.globalAlpha = ga;
  const ca = sm(seg(s, 3.8, 4.4)) * (1 - sm(seg(s, 6.6, 7)));
  cmpCard(40, 380, '周：以德配天，合法性来源向民间开放', '近东同期：王权多托庇神庙祭司', ca);
}

/* ---------- 第8章 印刷机前的中国式扩容 ---------- */
function sc8(s, t) {
  c.fillStyle = vgrad('#f0e2b4', '#b98f4c'); c.fillRect(0, 0, W, H);
  // 远山水墨
  mount(300, 110, 4, 'rgba(60,50,40,0.22)', t * 2, 0.004); mount(345, 80, 5, 'rgba(40,34,26,0.34)', t * 4, 0.005);
  const gA = 1 - sm(seg(s, 3.1, 3.6)), gB = sm(seg(s, 3.2, 3.7)) * (1 - sm(seg(s, 5.0, 5.5))), gC = sm(seg(s, 5.1, 5.6));
  const ga = c.globalAlpha, ink = '#2a1a0e';
  // —— A 雕版印刷 ——
  if (gA > 0.01) {
    c.globalAlpha = ga * gA;
    c.fillStyle = 'rgba(60,36,18,0.9)'; c.fillRect(0, 410, W, 140);
    // 案台与雕版
    c.fillStyle = '#5a3a1e'; c.fillRect(160, 392, 400, 18); c.fillRect(190, 410, 14, 100); c.fillRect(516, 410, 14, 100);
    c.fillStyle = '#b5834a'; c.fillRect(230, 340, 260, 52); c.fillStyle = '#7a5530'; c.fillRect(230, 384, 260, 8);
    [...'易書詩禮春秋'].forEach((g, i) => { const col = i % 3, row = (i / 3) | 0; c.save(); c.translate(262 + col * 85, 358 + row * 0); txt(g, 0, 0, 26, 'rgba(50,28,10,0.9)', { font: KAI, weight: 'bold' }); c.restore(); });
    // 印纸飞向书架
    EV.press.forEach((t0, i) => {
      const a = t - t0; if (a < -0.3 || a > 1.2) return;
      if (a < 0) { const u = sm((a + 0.3) / 0.3); c.fillStyle = '#fdf6df'; c.fillRect(250, 340 - 70 * (1 - u), 220, 50 + 0); }
      else if (a < 0.25) { c.fillStyle = '#fdf6df'; c.fillRect(250, 336 + 4 * a, 220, 54); c.fillStyle = 'rgba(50,28,10,0.8)'; for (let k = 0; k < 6; k++) c.fillRect(268 + k * 34, 346, 18, 34); }
      else { const u = eo((a - 0.25) / 0.95); const x = lerp(360, 800 + (i * 2) * 34, u), y = lerp(330, 290, u) - Math.sin(u * Math.PI) * 120, r = (u * 5 - 0.6) * 0.7;
        c.save(); c.translate(x, y); c.rotate(r); c.fillStyle = '#fdf6df'; c.fillRect(-60, -34, 120, 68); c.fillStyle = 'rgba(50,28,10,0.75)'; for (let k = 0; k < 5; k++) c.fillRect(-48 + k * 22, -22, 10, 44); c.restore(); }
    });
    const press = pulse(t, 0.15, 0.7);
    c.fillStyle = '#3b2412'; c.fillRect(300, 322 - press * 0, 120, 14 + press * 4);       // 棕刷
    c.fillStyle = 'rgba(30,12,4,0.8)'; c.fillRect(330, 314 - 8 * press, 60, 8);
    person(150, 470, 170, '#1a0e06', { hat: 1, aL: 1.6, aR: 0.8 }); flame(205, 388, 7, t, [255, 190, 90]);
    // 九经书架
    c.fillStyle = '#7c5530'; c.fillRect(740, 385, 400, 12); c.fillRect(750, 397, 10, 70); c.fillRect(1120, 397, 10, 70);
    const bk = ['易', '书', '诗', '周礼', '仪礼', '礼记', '左传', '公羊', '谷梁'];
    bk.forEach((g, j) => { const a = eo(seg(t, EV.books[j], EV.books[j] + 0.35)); if (a <= 0) return; const x = 756 + j * 42, h = 120 * a;
      c.fillStyle = j % 2 ? '#7d2a20' : '#2f4f46'; c.fillRect(x, 385 - h, 36, h); c.fillStyle = 'rgba(240,220,170,0.9)'; c.fillRect(x + 4, 385 - h + 8, 28, 52 * a);
      if (a > 0.9) vtxt(g.length > 1 ? g : g, x + 18, 385 - h + 22, g.length > 1 ? 13 : 17, '#2a1a0e', { font: KAI, sp: 1.05 }); });
    txt('冯道主持 · 雕版刻印九经', 940, 310, 16, '#3a2410', { font: KAI, ls: 3, alpha: sm(seg(t, 11.2, 11.8)) });
    seal(1160, 330, '官刻', 34, CIN, sm(seg(t, 12.6, 13)));
  }
  // —— B 占城稻与农业剩余 ——
  if (gB > 0.01) {
    c.globalAlpha = ga * gB;
    const g = seg(t, 13.4, 15.2); glow(220, 150, 260, [255, 220, 130], 0.8); c.fillStyle = '#fff6d2'; c.beginPath(); c.arc(220, 150, 34, 0, TAU); c.fill();
    for (let b = 0; b < 6; b++) {
      const y0 = 250 + b * 42; c.beginPath(); c.moveTo(-10, y0 + 40); c.quadraticCurveTo(300 + b * 40, y0 - 30 + b * 4, 700, y0 + 6); c.quadraticCurveTo(1000, y0 + 30, W + 10, y0 - 20); c.lineTo(W + 10, y0 + 60); c.lineTo(-10, y0 + 60); c.closePath();
      const col = mix([88, 140, 70], [214, 170, 62], clamp(g * 1.4 - b * 0.08)); c.fillStyle = rgba(col, 0.96); c.fill();
      c.strokeStyle = 'rgba(40,60,30,0.35)'; c.lineWidth = 1.4; c.stroke();
      for (let k = 0; k < 70; k++) { const x = (k / 70) * W + (b % 2) * 8, y = y0 + 20 + Math.sin(x * 0.011 + b) * 12 - (g * 12) * R(k, b); const h = (6 + g * 16) * (0.6 + R(k, b + 3));
        c.strokeStyle = rgba(mix([60, 110, 45], [190, 140, 40], g), 0.9); c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 3 + Math.sin(t * 2 + k) * 2, y - h * 0.6, x + 6 + Math.sin(t * 2 + k) * 3, y - h); c.stroke(); }
    }
    person(900, 440, 90, '#1a0e06', { aL: 1.9, aR: 0.6, hat: 1 }); person(980, 450, 80, '#1a0e06', { aL: 0.6, aR: 1.9, hat: 1 });
    // 稻谷堆
    for (let k = 0; k < 18; k++) { const a = eo(seg(t, 14.0 + k * 0.06, 14.5 + k * 0.06)); const x = 1080 + (k % 6) * 22 - (k / 6 | 0) * 10, y = 480 - (k / 6 | 0) * 18; c.fillStyle = `rgba(220,176,70,${a})`; c.beginPath(); c.ellipse(x, y, 11, 8, 0, 0, TAU); c.fill(); c.strokeStyle = `rgba(120,80,20,${a})`; c.stroke(); }
    txt('占城稻 · 江东犁 · 农业剩余抬升', 640, 70, 17, '#3a2410', { font: KAI, ls: 4, alpha: sm(seg(t, 13.5, 14)) });
  }
  // —— C 科举取士·汴京·交子 ——
  if (gC > 0.01) {
    c.globalAlpha = ga * gC;
    // 远塔与城
    for (let k = 0; k < 4; k++) { const x = 120 + k * 300; c.fillStyle = 'rgba(40,30,22,0.35)'; for (let l = 0; l < 6; l++) c.fillRect(x - 24 + l * 3, 300 - l * 18, 48 - l * 6, 12); }
    // 号舍
    for (let r = 0; r < 4; r++) for (let k = 0; k < 14; k++) { const x = 90 + k * 40 + r * 14, y = 392 + r * 26, lit = R(k + r * 17) < seg(t, 15.4, 17.2) ? 1 : 0; c.fillStyle = '#2a1a0e'; c.fillRect(x, y, 32, 18); c.fillStyle = lit ? 'rgba(255,200,100,0.9)' : 'rgba(100,70,40,0.5)'; c.fillRect(x + 8, y + 6, 16, 8); c.fillStyle = '#4a2c14'; c.beginPath(); c.moveTo(x - 4, y); c.lineTo(x + 16, y - 10); c.lineTo(x + 36, y); c.closePath(); c.fill(); }
    // 金榜
    const bu = eo(seg(t, EV.bang - 0.2, EV.bang + 0.7)), bh = 270 * bu;
    c.fillStyle = '#c9392b'; c.fillRect(540, 120, 200, bh); c.strokeStyle = '#e8c06a'; c.lineWidth = 4; c.strokeRect(540, 120, 200, bh);
    c.fillStyle = '#4a2c14'; c.fillRect(530, 112, 220, 10);
    if (bu > 0.7) { vtxt('金榜题名', 640, 142, 25, '#f7dca0', { font: KAI, weight: 'bold' }); ['状元', '榜眼', '探花'].forEach((n, i) => { vtxt(n, 580 + i * 40, 292, 17, '#f7dca0', { font: KAI }); vtxt('某某某', 580 + i * 40, 338, 12, 'rgba(247,220,160,0.8)', { font: KAI }); }); }
    const flashB = Math.exp(-Math.max(0, t - EV.bang) * 4) * (t > EV.bang ? 1 : 0); glow(640, 220, 360, [255, 220, 130], 0.5 * flashB);
    // 取士规模柱
    for (let k = 0; k < 8; k++) { const a = eo(seg(t, EV.bang + 0.3 + k * 0.1, EV.bang + 0.9 + k * 0.1)); const h = (30 + k * 26) * a; c.fillStyle = rgba(CIN, 0.92); c.fillRect(800 + k * 38, 300 - h + 90, 26, h); c.fillStyle = 'rgba(0,0,0,0.25)'; c.fillRect(800 + k * 38 + 20, 300 - h + 90, 6, h); }
    txt('取士规模扩容 · 学而优则仕', 940, 112, 15, '#3a2410', { font: KAI, ls: 2, alpha: sm(seg(t, 15.8, 16.3)) });
    // 交子
    const ja = sm(seg(t, 16.4, 16.9)); if (ja > 0) { c.save(); c.translate(240, 210 + Math.sin(t * 2) * 6); c.rotate(-0.14 + Math.sin(t * 1.5) * 0.05); c.globalAlpha *= ja; c.fillStyle = '#efe0b6'; c.fillRect(-90, -55, 180, 110); c.strokeStyle = '#6a3a1a'; c.lineWidth = 3; c.strokeRect(-90, -55, 180, 110); c.strokeRect(-80, -45, 160, 90); txt('交子', 0, -8, 38, '#8c1e16', { font: KAI, weight: 'bold' }); txt('官交子 · 铁钱十贯', 0, 30, 13, '#4a2c14', { font: KAI }); c.restore(); }
  }
  c.globalAlpha = ga;
  const ca = sm(seg(s, 1.4, 2)) * (1 - sm(seg(s, 7.4, 7.9)));
  cmpCard(40, 380, '宋刻本、科举取士：社会流动制度化', '古登堡约1450 · 宗教改革1517：晚数百年', ca, 360);
  if (t > EV.press[0]) c.globalAlpha = ga;
}

/* ---------- 第9章 精准的保守主义 ---------- */
function sc9(s, t) {
  c.fillStyle = vgrad('#0e1216', '#2b3139'); c.fillRect(0, 0, W, H);
  const flashS = Math.exp(-Math.max(0, t - EV.stamp) * 6) * (t > EV.stamp ? 1 : 0);
  // 东：封禁
  c.save(); c.beginPath(); c.rect(0, 0, 640, H); c.clip();
  mount(330, 90, 7, 'rgba(60,70,80,0.45)', 0, 0.005);
  c.fillStyle = vgrad('#122028', '#050a0e', 380, H); c.fillRect(0, 380, 640, H);
  c.strokeStyle = 'rgba(120,150,170,0.25)'; c.lineWidth = 1; for (let k = 0; k < 8; k++) { c.beginPath(); for (let x = 0; x <= 640; x += 12) { const y = 392 + k * 18 + Math.sin(x * 0.03 + t * 1.3 + k) * 3; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
  for (let k = 0; k < 4; k++) { const x = 90 + k * 140 + Math.sin(t * 0.8 + k) * 4, y = 400 + (k % 2) * 28 + Math.sin(t * 1.1 + k) * 2;
    c.fillStyle = '#05080b'; c.beginPath(); c.moveTo(x - 50, y); c.lineTo(x + 50, y); c.lineTo(x + 36, y + 14); c.lineTo(x - 40, y + 14); c.closePath(); c.fill();
    c.fillRect(x - 1, y - 85, 2, 85); for (let l = 0; l < 4; l++) { c.beginPath(); c.moveTo(x + 2, y - 80 + l * 20); c.quadraticCurveTo(x + 36, y - 74 + l * 20, x + 40, y - 62 + l * 20 + 4); c.lineTo(x + 2, y - 62 + l * 20); c.closePath(); c.fillStyle = 'rgba(40,36,30,0.9)'; c.fill(); }
    glow(x - 38, y - 4, 12, [255, 150, 60], 0.55); }
  // 铁锁
  const cu = seg(t, EV.chain - 0.4, EV.chain), drop = (1 - ei(cu)) * -160 + Math.exp(-Math.max(0, t - EV.chain) * 6) * Math.sin((t - EV.chain) * 30) * 6;
  if (t > EV.chain - 0.4) { c.save(); c.translate(0, drop); c.strokeStyle = '#7d8790'; c.lineWidth = 4; for (let k = 0; k < 24; k++) { const x = 40 + k * 24, y = 372 + Math.sin(k / 23 * Math.PI) * 18; c.beginPath(); c.ellipse(x, y, 9, 5, 0, 0, TAU); c.stroke(); } c.restore(); }
  // 诏书
  const un = eo(seg(t, 18.6, 19.2)), sh = 240 * un, sx = 160, sy = 134;
  c.fillStyle = '#d6a73a'; c.fillRect(sx, sy, 300, sh); c.strokeStyle = '#7a4c14'; c.lineWidth = 5; c.strokeRect(sx, sy, 300, sh);
  c.fillStyle = '#5a3414'; c.fillRect(sx - 8, sy - 8, 316, 12); c.fillRect(sx - 8, sy + sh - 4, 316, 12);
  if (un > 0.9) {
    c.save(); c.beginPath(); c.rect(sx, sy, 300, sh); c.clip(); meander(sx + 10, sy + 14, 280, 14, [120, 60, 20], 0.7); meander(sx + 10, sy + sh - 32, 280, 14, [120, 60, 20], 0.7); c.restore();
    vtxt('奉天承运', sx + 244, sy + 44, 22, '#3a1a08', { font: KAI, weight: 'bold' }); vtxt('皇帝诏曰', sx + 206, sy + 44, 22, '#3a1a08', { font: KAI, weight: 'bold' });
    vtxt('海疆有禁通商一口', sx + 150, sy + 44, 19, '#4a2410', { font: KAI, sp: 1.1 }); vtxt('违者严惩不贷', sx + 100, sy + 44, 17, '#4a2410', { font: KAI, sp: 1.1 });
  }
  const sa = clamp((t - EV.stamp) / 0.12);
  if (t > EV.stamp - 0.02) { const k = lerp(2.6, 1, eo(sa)); c.save(); c.translate(sx + 50, sy + 198); c.rotate(-0.12); c.scale(k * 0.82, k * 0.82); c.globalAlpha *= sa; c.fillStyle = 'rgba(190,34,26,0.96)'; c.fillRect(-42, -42, 84, 84); c.strokeStyle = '#f0d8b8'; c.lineWidth = 3; c.strokeRect(-36, -36, 72, 72); txt('禁', 0, 3, 66, '#f6e3c8', { font: KAI, weight: 'bold' }); c.restore(); }
  c.restore();
  // 西：蒸汽与工厂
  c.save(); c.beginPath(); c.rect(640, 0, 640, H); c.clip();
  const up = sm(seg(s, 1.5, 6));
  glow(930, 330, 420, [255, 120, 40], 0.18 + 0.5 * up);
  mount(380, 80, 9, 'rgba(70,40,30,0.55)', 0, 0.006);
  c.fillStyle = '#0a0706'; c.fillRect(640, 420, 640, 130);
  for (let k = 0; k < 6; k++) { const x = 700 + k * 100, h = 120 + (k % 3) * 40; c.fillStyle = '#0c0807'; c.fillRect(x, 420 - h, 44, h); c.fillRect(x - 6, 420 - h, 56, 10);
    for (let p = 0; p < 6; p++) { const age = (t * 0.6 + p / 6 + k * 0.13) % 1, px = x + 22 + age * 60 + Math.sin(age * 6 + k) * 10, py = 420 - h - age * 150, r = 10 + age * 30; c.fillStyle = `rgba(60,56,54,${0.5 * (1 - age)})`; c.beginPath(); c.arc(px, py, r, 0, TAU); c.fill(); }
    for (let w = 0; w < 4; w++) { c.fillStyle = `rgba(255,170,70,${0.4 + 0.5 * R(k * 4 + w)})`; c.fillRect(x + 6 + (w % 2) * 20, 420 - h + 26 + (w >> 1) * 28, 12, 14); } }
  // 飞轮与连杆
  const spd = lerp(1, 7, up), ang = t * spd * 0.35 + s * 0; const gx = 960, gy = 360;
  c.save(); c.translate(gx, gy); c.rotate(ang); c.strokeStyle = '#d9a35a'; c.lineWidth = 7; c.beginPath(); c.arc(0, 0, 64, 0, TAU); c.stroke(); c.lineWidth = 4; for (let k = 0; k < 8; k++) { c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(k * TAU / 8) * 64, Math.sin(k * TAU / 8) * 64); c.stroke(); }
  for (let k = 0; k < 24; k++) { c.save(); c.rotate(k * TAU / 24); c.fillStyle = '#c2863c'; c.fillRect(62, -4, 12, 8); c.restore(); } c.restore();
  const px = gx + Math.cos(ang) * 40, py = gy + Math.sin(ang) * 40; c.strokeStyle = '#b98a52'; c.lineWidth = 6; c.beginPath(); c.moveTo(px, py); c.lineTo(px + 150, 360); c.stroke(); c.fillStyle = '#8a6a40'; c.fillRect(px + 130 + Math.sin(ang) * 0, 345, 60, 30);
  // 铁路与机车
  c.strokeStyle = 'rgba(200,170,130,0.6)'; c.lineWidth = 2; c.beginPath(); c.moveTo(1000, 430); c.lineTo(1280, 520); c.moveTo(1040, 430); c.lineTo(1330, 520); c.stroke();
  const tx = lerp(700, 1220, (t * 0.2) % 1); c.fillStyle = '#080605'; c.fillRect(tx, 452, 70, 22); c.fillRect(tx + 8, 436, 18, 16); c.fillRect(tx + 44, 440, 20, 12); c.fillStyle = 'rgba(255,220,160,0.7)'; c.beginPath(); c.arc(tx + 66, 462, 4, 0, TAU); c.fill();
  txt('1769 瓦特 · 蒸汽与工厂 · 点火成势', 960, 80, 16, '#f0c890', { font: KAI, ls: 3, alpha: sm(seg(s, 2, 2.6)) });
  c.restore();
  // 中缝
  c.fillStyle = 'rgba(0,0,0,0.5)'; c.fillRect(638, 0, 4, H);
  // 流动性折价表盘
  const da = sm(seg(s, 3.2, 3.8)); if (da > 0) { c.save(); c.globalAlpha *= da; c.translate(640, 150);
    c.fillStyle = 'rgba(8,10,12,0.8)'; c.beginPath(); c.arc(0, 0, 62, Math.PI, 0); c.lineTo(62, 14); c.lineTo(-62, 14); c.closePath(); c.fill(); c.strokeStyle = rgba(GOLD, 0.7); c.lineWidth = 1.2; c.stroke();
    for (let k = 0; k <= 10; k++) { const a = Math.PI + k / 10 * Math.PI; c.strokeStyle = k > 6 ? '#d4503c' : '#c9a860'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(Math.cos(a) * 52, Math.sin(a) * 52); c.lineTo(Math.cos(a) * 60, Math.sin(a) * 60); c.stroke(); }
    const na = Math.PI + lerp(0.15, 0.9, sm(seg(s, 3.4, 5.2))) * Math.PI + Math.sin(t * 22) * 0.015; c.strokeStyle = '#f0d8a8'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(na) * 50, Math.sin(na) * 50); c.stroke(); c.fillStyle = '#f0d8a8'; c.beginPath(); c.arc(0, 0, 4, 0, TAU); c.fill();
    txt('流动性折价', 0, -30, 12, '#e8cf9a', { font: KAI, ls: 2 }); txt('点火概率 ↓', 0, 30, 12, '#e8a090', { font: KAI }); c.restore(); }
  c.fillStyle = `rgba(255,240,220,${0.55 * flashS})`; c.fillRect(0, 0, W, H);
  // 雨
  c.strokeStyle = 'rgba(170,190,210,0.2)'; c.lineWidth = 1; c.beginPath(); for (let k = 0; k < 150; k++) { const x = (R(k) * W * 1.2 + t * 70) % (W + 50) - 25, y = (R(k, 1) * H + t * 520 * (0.7 + R(k, 2) * 0.6)) % H; c.moveTo(x, y); c.lineTo(x - 5, y + 16); } c.stroke();
  const ca = sm(seg(s, 3.4, 4)) * (1 - sm(seg(s, 6.5, 7)));
  cmpCard(40, 380, '中：封禁诏书 · 精准保守，航道愈窄', '西：蒸汽工厂点火，第三次大分流', ca, 340);
}
