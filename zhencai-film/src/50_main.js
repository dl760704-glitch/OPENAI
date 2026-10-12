/* ===== 总装：场景调度、字幕、编年轴、中西对比曲线、调色与主循环 ===== */
const SCENES = [
  { a: 0, fn: scPrologue }, { a: 3, fn: sc7 }, { a: 10, fn: sc8 }, { a: 18, fn: sc9 }, { a: 25, fn: sc10 },
  { a: 32, fn: sc11 }, { a: 37, fn: sc12 }, { a: 44, fn: sc13 }, { a: 51, fn: sc15 }, { a: 56, fn: sc16 },
];
const CHAPTERS = [
  [3.3, 10, '第七章', '采诗官与贞人的黄昏'], [10.3, 18, '第八章', '印刷机前的中国式扩容'], [18.3, 25, '第九章', '精准的保守主义'],
  [25.3, 32, '第十章', '同一台机器的两次换挡'], [32.3, 37, '第十一章', '欧洲这面镜子'], [37.3, 44, '第十二章', '当机器不再需要人'],
  [44.3, 51, '第十三章', '两条百年航线'], [51.3, 56, '第十五章', '甄采体制的一般理论'], [56.3, 59.6, '第十六章', '中国之所以为中国'],
];
const SUBS = [
  [3.1, 5.7, '公元前1046年 · 殷墟贞人垄断通天，占卜即行政'], [5.7, 8.1, '周人以德配天：采诗官摇铎，民声入庙堂'], [8.1, 10.0, '利簋、大盂鼎铭文：慢变量由此起步'],
  [10.2, 13.3, '唐宋之变：冯道刻九经，雕版把知识变成公共品'], [13.4, 15.3, '占城稻抬升农业剩余，养得起天下读书人'], [15.3, 18.0, '科举放榜，学而优则仕 · 宋刻本早于古登堡数百年'],
  [18.1, 20.3, '近代古今之变：一口通商，封禁诏书落下'], [20.3, 22.6, '锁链横江，航道愈窄 · 精准保守'], [22.6, 25.0, '蒸汽点火、工厂成势：第三次大分流，中国落后'],
  [25.1, 27.9, '同一台机器，两次准据换挡：1949、1978'], [27.95, 30.0, '小岗村红手印：试点授权，容错默许'], [30.0, 32.0, '复制推广，星火成势：准据换挡，追赶并超越'],
  [32.1, 34.8, '欧洲这面镜子：六种政体构型，破「中国例外论」'], [34.8, 37.0, '拿破仑法典、明治维新：定型权集中度决定移植深度'],
  [37.1, 39.0, '智能之变：打破垄断者，必须争取民众'], [39.0, 41.3, '依赖纽带松动：生产、财政、兵源，同时失去必要性'], [41.4, 44.0, '2026年7月：具身机器人运动会，依赖归零的社会已在眼前'],
  [44.1, 46.3, '两条百年航线：智能红利分往何处'], [46.3, 48.0, '依赖度0.363：条件性转折，接入权双峰分化'], [48.0, 51.0, '国家甄采构型：普惠通道，红利派发给全社会公众'],
  [51.1, 53.6, '变异、甄别、复制：三个子机制，一个循环'], [53.6, 56.0, '四项判据，两个退化极限：边界案例检验区分力'],
  [56.1, 58.3, '准据、容量、通道：文明底色的可计算表达'], [58.3, 59.8, '中国之所以为中国：三千年，一以贯之'],
];
const ERAS = [[3, 10, '上古周秦', '陶埙'], [10, 18, '中古唐宋', '古琴'], [18, 25, '近代古今', '琵琶'], [25, 37, '当代追赶', '民乐交响'], [37, 56, '智能时代', '民乐交响']];
const YEARS = [[3, 10, -1046, -221], [10, 18, 932, 1127], [18, 25, 1757, 1840], [25, 32, 1949, 1995], [32, 37, 1804, 1868], [37, 44, 2026, 2026], [44, 51, 2026, 2126]];
const modK = [[0, 0], [18, 0.15], [25, 0.45], [32, 0.65], [37, 0.85], [44, 1], [60, 1]];
const modAt = t => { for (let i = 1; i < modK.length; i++) if (t <= modK[i][0]) return lerp(modK[i - 1][1], modK[i][1], seg(t, modK[i - 1][0], modK[i][0])); return 1; };
// 中西「社会形态变革」示意曲线（非统计，叙事性定性刻画）
const CN = [[3, .28], [7, .5], [10, .58], [14, .8], [18, .86], [21, .74], [24, .52], [27, .48], [32, .66], [37, .84], [44, .96], [56, .98]];
const WS = [[3, .22], [7, .22], [10, .24], [14, .3], [18, .38], [21, .62], [24, .9], [28, .93], [37, .92], [44, .94], [56, .95]];
const curveAt = (K, t) => { if (t <= K[0][0]) return K[0][1]; for (let i = 1; i < K.length; i++) if (t <= K[i][0]) return lerp(K[i - 1][1], K[i][1], sm(seg(t, K[i - 1][0], K[i][0]))); return K[K.length - 1][1]; };

// 胶片颗粒
const GR = []; for (let k = 0; k < 3; k++) { const g = document.createElement('canvas'); g.width = g.height = 256; const gx = g.getContext('2d'), im = gx.createImageData(256, 256); for (let i = 0; i < im.data.length; i += 4) { const v = Math.random() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; } gx.putImageData(im, 0, 0); GR.push(g); }

function fmtYear(y) { y = Math.round(y); return y < 0 ? `公元前 ${-y}` : `公元 ${y}`; }
function drawChrome(t, md) {
  const fadeIO = sm(seg(t, 0.2, 0.9)) * (1 - sm(seg(t, 59.4, 59.95)));
  c.save(); c.globalAlpha = fadeIO;
  // 字幕底带
  const gb = c.createLinearGradient(0, 440, 0, H); gb.addColorStop(0, 'rgba(0,0,0,0)'); gb.addColorStop(1, 'rgba(0,0,0,0.78)'); c.fillStyle = gb; c.fillRect(0, 440, W, H - 440);
  // 编年轴
  const X0 = 120, X1 = 1160, ty = 528, px = X0 + (X1 - X0) * t / DUR;
  c.strokeStyle = 'rgba(230,200,140,0.35)'; c.lineWidth = 1; c.beginPath(); c.moveTo(X0, ty); c.lineTo(X1, ty); c.stroke();
  c.strokeStyle = rgba(GOLD, 0.95); c.lineWidth = 2; c.beginPath(); c.moveTo(X0, ty); c.lineTo(px, ty); c.stroke();
  ERAS.forEach(([a, b, n, inst]) => { const xa = X0 + (X1 - X0) * a / DUR, xb = X0 + (X1 - X0) * b / DUR, on = t >= a && t < b; c.fillStyle = on ? rgba(GOLD, 1) : 'rgba(230,200,140,0.45)'; c.fillRect(xa, ty - 4, 1.5, 8); txt(n, (xa + xb) / 2, ty - 10, 11, on ? '#ffe3a0' : 'rgba(230,200,140,0.55)', { font: KAI, ls: 2 }); txt('♪ ' + inst, (xa + xb) / 2, ty + 11, 9.5, on ? '#ffd48a' : 'rgba(230,200,140,0.4)', { font: KAI }); });
  glow(px, ty, 14, GOLD, 0.8); c.fillStyle = '#fff1c8'; c.beginPath(); c.arc(px, ty, 3.2, 0, TAU); c.fill();
  // 年份
  let ytxt = '';
  for (const [a, b, y0, y1] of YEARS) if (t >= a && t < b) { const y = lerp(y0, y1, sm(seg(t, a + 0.3, b - 0.5))); ytxt = (a === 37 ? '公元 2026 年 7 月' : fmtYear(y)); }
  if (!ytxt && t >= 51 && t < 56) ytxt = '一般理论'; if (!ytxt && t >= 56) ytxt = '三千年';
  if (ytxt) { txt(ytxt, 640, 30, 22, '#ffe3a0', { font: KAI, weight: 'bold', ls: 6, shadow: 'rgba(0,0,0,0.8)', sb: 8 }); c.strokeStyle = rgba(GOLD, 0.5); c.beginPath(); c.moveTo(500, 46); c.lineTo(780, 46); c.stroke(); }
  // 中西对比曲线
  const cx0 = 46, cy0 = 40, cw = 300, ch = 64;
  c.fillStyle = 'rgba(0,0,0,0.45)'; c.fillRect(cx0 - 8, cy0 - 14, cw + 16, ch + 36); c.strokeStyle = 'rgba(230,200,140,0.28)'; c.strokeRect(cx0 - 8.5, cy0 - 14.5, cw + 17, ch + 37);
  const mapx = tt => cx0 + (tt - 3) / 53 * cw, mapy = v => cy0 + ch - v * ch;
  [[CN, [235, 70, 56]], [WS, [96, 150, 235]]].forEach(([K, col]) => { c.beginPath(); for (let tt = 3; tt <= Math.min(56, Math.max(3, t)); tt += 0.5) { const x = mapx(tt), y = mapy(curveAt(K, tt)); tt === 3 ? c.moveTo(x, y) : c.lineTo(x, y); } c.strokeStyle = rgba(col, 1); c.lineWidth = 2; c.stroke(); const tt = clamp(t, 3, 56); glow(mapx(tt), mapy(curveAt(K, tt)), 8, col, 0.9); });
  const cv_ = curveAt(CN, clamp(t, 3, 56)), wv = curveAt(WS, clamp(t, 3, 56)); let st = '中国领先', stc = '#ff8a72'; if (t >= 20.5 && t < 27) { st = '中国落后'; stc = '#8fb4f0'; } else if (t >= 27 && t < 36.5) { st = '追赶'; stc = '#ffd48a'; } else if (t >= 36.5 && t < 44) { st = '并行 · 超越'; stc = '#ff8a72'; } else if (t >= 44) { st = '超越 · 普惠'; stc = '#ffd48a'; }
  txt('中西社会形态变革 · 示意', cx0, cy0 + ch + 12, 10.5, 'rgba(230,200,140,0.7)', { align: 'left', font: KAI }); txt(st, cx0 + cw, cy0 + ch + 12, 12, stc, { align: 'right', font: KAI, weight: 'bold' });
  txt('中', cx0 + cw - 4, cy0 + 2, 10, '#ff8a72', { align: 'right', font: KAI }); txt('西', cx0 + cw - 18, cy0 + 2, 10, '#8fb4f0', { align: 'right', font: KAI });
  // 章题（竖排）
  CHAPTERS.forEach(([a, b, n, tt]) => { const al = sm(seg(t, a, a + 0.5)) * (1 - sm(seg(t, b - 0.4, b))); if (al <= 0) return; c.save(); c.globalAlpha *= al * fadeIO;
    seal(1226, 70, n.slice(1, -1), 34, CIN); txt(n, 1226, 106, 12, '#ffd8a0', { font: KAI }); vtxt(tt, 1226, 130, 24, '#fbe7b8', { font: KAI, weight: 'bold', shadow: 'rgba(0,0,0,0.85)', sb: 8, sp: 1.2 }); c.restore(); });
  // 字幕
  SUBS.forEach(([a, b, s]) => { const al = sm(seg(t, a, a + 0.25)) * (1 - sm(seg(t, b - 0.25, b))); if (al <= 0) return; const rise = (1 - sm(seg(t, a, a + 0.35))) * 8;
    c.save(); c.globalAlpha *= al; txt(s, 640, 493 + rise, 25, '#fff6dc', { font: KAI, weight: 'bold', ls: 3, stroke: 'rgba(10,6,4,0.85)', sw: 5, shadow: 'rgba(0,0,0,0.9)', sb: 8 }); c.restore(); });
  c.restore();
  // 边框
  c.save(); c.globalAlpha = 0.5 * fadeIO; c.strokeStyle = rgba(GOLD, 0.8); c.lineWidth = 1.5; c.strokeRect(8, 8, W - 16, H - 16); c.lineWidth = 0.7; c.strokeRect(13, 13, W - 26, H - 26);
  [[8, 8, 1, 1], [W - 8, 8, -1, 1], [8, H - 8, 1, -1], [W - 8, H - 8, -1, -1]].forEach(([x, y, sx, sy]) => { c.beginPath(); c.moveTo(x + sx * 4, y + sy * 26); c.lineTo(x + sx * 4, y + sy * 4); c.lineTo(x + sx * 26, y + sy * 4); c.stroke(); }); c.restore();
}

function render(t) {
  c.setTransform(2, 0, 0, 2, 0, 0); c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
  const md = modAt(t);
  for (let i = 0; i < SCENES.length; i++) {
    const sc = SCENES[i], nx = SCENES[i + 1] ? SCENES[i + 1].a : DUR + 1;
    if (t < sc.a || t >= nx + 0.7) continue;
    const s = t - sc.a, p = clamp(s / ((nx > DUR ? DUR : nx) - sc.a)), a = i === 0 ? 1 : sm(seg(t, sc.a, sc.a + 0.6));
    c.save(); c.globalAlpha = a;
    const k = 1 + 0.045 * p, dx = (i % 2 ? -1 : 1) * 14 * p; c.translate(W / 2 + dx, H / 2); c.scale(k, k); c.translate(-W / 2, -H / 2);
    sc.fn(s, t);
    c.restore();
  }
  // 调色：历史段偏赭褐，当代段转为明亮朱金
  c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = `rgba(150,110,60,${0.22 * (1 - md)})`; c.fillRect(0, 0, W, H); c.restore();
  c.save(); c.globalCompositeOperation = 'lighter'; const pu = pulse(t, 0.18, 0.8); if (pu > 0.05) { c.fillStyle = `rgba(255,220,160,${0.05 * pu * (0.4 + md)})`; c.fillRect(0, 0, W, H); } c.restore();
  // 暗角
  const vg = c.createRadialGradient(W / 2, H / 2, H * 0.42, W / 2, H / 2, W * 0.62); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(0,0,0,${0.7 - 0.25 * md})`); c.fillStyle = vg; c.fillRect(0, 0, W, H);
  // 颗粒与划痕（历史段强，当代段弱）
  const gi = ((Math.floor(t * 14) % 3) + 3) % 3; c.save(); c.globalCompositeOperation = 'overlay'; c.globalAlpha = 0.16 * (1 - md * 0.7); const ox = (Math.floor(t * 14) * 53) % 256; for (let x = -ox; x < W; x += 256) for (let y = 0; y < H; y += 256) c.drawImage(GR[gi], x, y); c.restore();
  if (md < 0.6) { c.save(); c.strokeStyle = `rgba(255,240,210,${0.18 * (1 - md)})`; c.lineWidth = 1; const fr = Math.floor(t * 12); for (let k = 0; k < 2; k++) { if (hash(fr * 3 + k) > 0.6) { const x = hash(fr + k * 9) * W; c.beginPath(); c.moveTo(x, 0); c.lineTo(x + (hash(fr + 5) - 0.5) * 6, H); c.stroke(); } } c.restore(); }
  drawChrome(t, md);
  // 首尾淡入淡出（循环衔接）
  const fo = 1 - sm(seg(t, 0, 0.5)) * 0, fade = Math.max(sm(seg(t, 59.45, 60)), 1 - sm(seg(t, 0, 0.35)));
  if (fade > 0) { c.fillStyle = `rgba(0,0,0,${fade})`; c.fillRect(0, 0, W, H); }
}

/* ===== 主循环：requestAnimationFrame 时间戳驱动，非帧计数 ===== */
const qs = new URLSearchParams(location.search), FREEZE = qs.has('t') ? parseFloat(qs.get('t')) : null;
let T0 = null, lastTs = 0, started = false;
function frame(ts) {
  lastTs = ts; if (T0 === null) T0 = ts;
  const T = Math.max(0, (ts - T0) / 1000), t = FREEZE !== null ? FREEZE : T % DUR;
  try { if (started) audioTick(T); render(t); } catch (err) { console.error(err); }
  requestAnimationFrame(frame);
}
function begin() {
  if (started) return; started = true; startAudio(); T0 = performance.now(); sInit = false;
  document.getElementById('gate').style.display = 'none';
}
document.getElementById('gate').addEventListener('click', begin);
addEventListener('keydown', e => {
  if (e.key === 'm' || e.key === 'M') { setMuted(!muted); }
  else if (e.key === 'f' || e.key === 'F') { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => { }); }
  else if (!started && (e.key === ' ' || e.key === 'Enter')) begin();
});
cv.addEventListener('dblclick', () => { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => { }); });
window.__render = render;
requestAnimationFrame(frame);
