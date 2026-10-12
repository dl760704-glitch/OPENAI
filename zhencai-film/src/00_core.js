/* ===== 核心：画布、时间轴、数学与绘图工具 ===== */
const cv = document.getElementById('cv'), c = cv.getContext('2d');
const W = 1280, H = 545, DUR = 60;           // 逻辑坐标；画布实际 2560×1090（2.35:1）
const TAU = Math.PI * 2;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const sm = x => { x = clamp(x); return x * x * (3 - 2 * x); };
const eo = x => 1 - Math.pow(1 - clamp(x), 3);
const ei = x => Math.pow(clamp(x), 3);
const seg = (t, a, b) => clamp((t - a) / (b - a));
const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const R = (i, k = 0) => hash(i * 7.31 + k * 19.17);               // 确定性伪随机
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const a = hash(xi + yi * 57), b = hash(xi + 1 + yi * 57), c1 = hash(xi + (yi + 1) * 57), d = hash(xi + 1 + (yi + 1) * 57);
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  return lerp(lerp(a, b, u), lerp(c1, d, u), v);
}
const rgba = (col, a = 1) => `rgba(${col[0]|0},${col[1]|0},${col[2]|0},${a})`;
const mix = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const SERIF = '"Songti SC","STSong","Noto Serif CJK SC","Source Han Serif SC","SimSun","Songti TC","WenQuanYi Zen Hei","Microsoft YaHei",serif';
const KAI = '"Kaiti SC","STKaiti","KaiTi","楷体","Noto Serif CJK SC","Songti SC","SimSun","WenQuanYi Zen Hei",serif';

// 色板：墨、朱砂、赭、青金、石绿、金
const INK = [22, 14, 10], CIN = [190, 40, 32], GOLD = [226, 178, 84], JADE = [64, 138, 118], BLUE = [48, 98, 150], CYAN = [90, 220, 235], PAPER = [236, 222, 184];

function glow(x, y, r, col, a = 1) {
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0));
  c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r);
}
function vgrad(top, bot, y0 = 0, y1 = H) {
  const g = c.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, top); g.addColorStop(1, bot); return g;
}
function txt(s, x, y, size, col, o = {}) {
  c.save();
  c.font = `${o.weight || ''} ${size}px ${o.font || SERIF}`;
  c.textAlign = o.align || 'center'; c.textBaseline = o.base || 'middle';
  if (o.ls) c.letterSpacing = o.ls + 'px';
  c.globalAlpha *= (o.alpha === undefined ? 1 : o.alpha);
  if (o.shadow) { c.shadowColor = o.shadow; c.shadowBlur = o.sb || 6; }
  if (o.stroke) { c.lineWidth = o.sw || 3; c.strokeStyle = o.stroke; c.lineJoin = 'round'; c.strokeText(s, x, y); }
  c.fillStyle = col; c.fillText(s, x, y);
  c.restore();
}
function vtxt(s, x, y, size, col, o = {}) {      // 竖排
  const n = [...s].length, sp = o.sp || 1.18; let i = 0;
  for (const ch of s) { txt(ch, x, y + i * size * sp, size, col, { ...o, align: 'center' }); i++; }
  return n * size * sp;
}
function seal(x, y, s, size, col = CIN, a = 1) {  // 朱文印
  c.save(); c.globalAlpha *= a;
  c.fillStyle = rgba(col, 0.92); c.fillRect(x - size / 2, y - size / 2, size, size);
  c.strokeStyle = rgba([255, 230, 200], 0.55); c.lineWidth = 1.2; c.strokeRect(x - size / 2 + 2.5, y - size / 2 + 2.5, size - 5, size - 5);
  const ch = [...s];
  if (ch.length === 1) txt(s, x, y + 1, size * 0.72, '#f6e3c8', { font: KAI, weight: 'bold' });
  else if (ch.length === 2) txt(s, x, y + 1, size * 0.46, '#f6e3c8', { font: KAI, weight: 'bold', ls: 0 });
  else { const fs = size * 0.4; txt(ch[0] + ch[1], x, y - size * 0.22, fs, '#f6e3c8', { font: KAI, weight: 'bold' }); txt((ch[2] || '') + (ch[3] || ''), x, y + size * 0.22, fs, '#f6e3c8', { font: KAI, weight: 'bold' }); }
  c.restore();
}
function flame(x, y, sz, t, col = [255, 150, 40]) {
  c.save(); c.globalCompositeOperation = 'lighter';
  glow(x, y - sz * 0.6, sz * 3.2, col, 0.35);
  for (let k = 0; k < 3; k++) {
    const w = sz * (1 - k * 0.28), h = sz * 2.1 * (1 - k * 0.22), fl = Math.sin(t * 13 + k * 2 + x) * sz * 0.12;
    c.beginPath(); c.moveTo(x - w * 0.55, y);
    c.bezierCurveTo(x - w * 0.7, y - h * 0.5, x - w * 0.1 + fl, y - h * 0.65, x + fl * 1.5, y - h);
    c.bezierCurveTo(x + w * 0.2 + fl, y - h * 0.6, x + w * 0.75, y - h * 0.45, x + w * 0.55, y);
    c.closePath();
    c.fillStyle = k === 0 ? 'rgba(255,90,20,0.55)' : k === 1 ? 'rgba(255,170,50,0.6)' : 'rgba(255,240,170,0.75)'; c.fill();
  }
  c.restore();
}
function person(x, y, h, col, o = {}) {           // 剪影人物（足底落于 x,y）
  const w = h * 0.2, sway = (o.walk || 0);
  c.save(); c.fillStyle = col; c.strokeStyle = col; c.lineCap = 'round';
  const sh = y - h * 0.8;
  c.beginPath(); c.moveTo(x - w * 0.5, sh); c.lineTo(x + w * 0.5, sh);
  c.lineTo(x + w * 0.85 + sway * 2, y); c.lineTo(x - w * 0.85 + sway * 2, y); c.closePath(); c.fill();
  c.beginPath(); c.arc(x, y - h * 0.9, h * 0.07, 0, TAU); c.fill();
  if (o.hat) { c.fillRect(x - h * 0.09, y - h * 0.99, h * 0.18, h * 0.045); if (o.hat === 2) { c.fillRect(x - h * 0.012, y - h * 1.14, h * 0.024, h * 0.16); } }
  c.lineWidth = h * 0.05;
  const aL = o.aL === undefined ? 1.9 : o.aL, aR = o.aR === undefined ? 1.2 : o.aR, L = h * 0.3;
  c.beginPath(); c.moveTo(x - w * 0.45, sh + h * 0.02); c.lineTo(x - w * 0.45 + Math.cos(aL) * L, sh + h * 0.02 + Math.sin(aL) * L); c.stroke();
  c.beginPath(); c.moveTo(x + w * 0.45, sh + h * 0.02); c.lineTo(x + w * 0.45 + Math.cos(aR) * L, sh + h * 0.02 + Math.sin(aR) * L); c.stroke();
  c.restore();
}
function mount(baseY, amp, seed, col, scroll = 0, freq = 0.006, step = 14) {
  c.beginPath(); c.moveTo(-10, H + 10);
  for (let x = -10; x <= W + 10; x += step) {
    const n = vnoise((x + scroll) * freq + seed * 9, seed) * 0.7 + vnoise((x + scroll) * freq * 2.7 + seed, 3) * 0.3;
    c.lineTo(x, baseY - n * amp);
  }
  c.lineTo(W + 10, H + 10); c.closePath(); c.fillStyle = col; c.fill();
}
function roof(x, y, w, h, col) {                  // 歇山/庑殿屋顶剪影
  c.fillStyle = col; c.beginPath();
  c.moveTo(x - w * 0.62, y + h * 0.1); c.quadraticCurveTo(x - w * 0.4, y + h * 0.05, x - w * 0.25, y - h * 0.5);
  c.lineTo(x + w * 0.25, y - h * 0.5); c.quadraticCurveTo(x + w * 0.4, y + h * 0.05, x + w * 0.62, y + h * 0.1);
  c.lineTo(x + w * 0.5, y + h * 0.2); c.lineTo(x - w * 0.5, y + h * 0.2); c.closePath(); c.fill();
  c.fillRect(x - w * 0.42, y + h * 0.2, w * 0.84, h * 0.12);
  c.fillRect(x - w * 0.36, y + h * 0.3, w * 0.07, h * 0.9); c.fillRect(x + w * 0.29, y + h * 0.3, w * 0.07, h * 0.9);
  c.fillRect(x - w * 0.04, y + h * 0.3, w * 0.08, h * 0.9);
}
function meander(x, y, w, h, col, a = 1) {       // 回纹带
  c.save(); c.strokeStyle = rgba(col, a); c.lineWidth = 1.2; c.beginPath();
  const u = h / 3;
  for (let px = x; px < x + w - u * 3; px += u * 3.4) {
    c.moveTo(px, y + h); c.lineTo(px, y); c.lineTo(px + u * 3, y); c.lineTo(px + u * 3, y + u * 2); c.lineTo(px + u, y + u * 2); c.lineTo(px + u, y + u);
    c.lineTo(px + u * 2, y + u);
  }
  c.stroke(); c.restore();
}
function cmpCard(x, y, zh, xi, a, w = 330) {     // 中西对观卡片
  if (a < 0.01) return;
  c.save(); c.globalAlpha *= a;
  c.fillStyle = 'rgba(8,6,6,0.62)'; c.fillRect(x, y, w, 62);
  c.strokeStyle = rgba(GOLD, 0.6); c.lineWidth = 1; c.strokeRect(x + 0.5, y + 0.5, w - 1, 61);
  seal(x + 20, y + 17, '中', 22, CIN); seal(x + 20, y + 45, '西', 22, [40, 82, 140]);
  txt(zh, x + 40, y + 17, 15, '#f1d9a4', { align: 'left', font: KAI });
  txt(xi, x + 40, y + 45, 15, '#bcd0ea', { align: 'left', font: KAI });
  c.restore();
}
