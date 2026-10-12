/* ===== 声：全部以 WebAudio 合成（陶埙 / 古琴 / 琵琶 / 民乐交响），与画面共用同一事件表 ===== */
const EV = {
  crack: [3.7, 4.15, 4.55, 4.9, 5.2], tuo: [5.9, 6.5, 7.1], gui: 8.3,
  press: [10.9, 11.45, 12.0, 12.55], bang: 15.4,
  stamp: 19.2, chain: 20.4,
  shift: [26.0, 27.6], hand0: 28.0, handDt: 0.11, spread: 30.0,
  flip: [32.0, 33.4, 34.8, 36.0],
  snap: [39.2, 40.0, 40.8], robots: 41.5,
  fork: 46.3, burst: 48.0,
  bells: [0.4, 3, 10, 18, 25, 32, 37, 44, 51, 56],
};
EV.books = Array.from({ length: 9 }, (_, j) => 11.0 + j * 0.2);

const SC = [];
const add = (t, k, m, d, v, x) => SC.push({ t, k, m: m || 0, d: d || 0, v: v === undefined ? 0.7 : v, x });
(function compose() {
  // —— 上古周秦：陶埙为主，战鼓如心跳 ——
  add(0.35, 'bell', 50, 4, 0.9); add(0.4, 'drum', 0, 0, 0.55); add(0.5, 'xun', 62, 2.3, 0.85);
  add(3.0, 'bell', 50, 3, 0.7); add(3.0, 'drum', 0, 0, 0.8);
  [[3.1, 57, 1.3], [4.5, 59, 0.6], [5.2, 62, 0.5], [5.8, 62, 0.7], [6.6, 64, 0.5], [7.2, 66, 0.9], [8.7, 69, 0.9], [9.5, 66, 0.7]].forEach(n => add(n[0], 'xun', n[1], n[2], 0.8));
  EV.crack.forEach((t, i) => { add(t, 'crack', 0, 0, 0.8); add(t, 'drum', 0, 0, 0.3 + i * 0.08); });
  EV.tuo.forEach(t => add(t, 'tuo', 0, 0, 0.7));
  add(8.0, 'whoosh', 0, 0.35, 0.5);
  add(EV.gui, 'bell', 50, 4, 1); add(EV.gui, 'gong', 38, 0, 0.8); add(EV.gui, 'drum', 0, 0, 1);
  add(9.5, 'whoosh', 0, 0.5, 0.45);
  // —— 中古唐宋：古琴，散音、泛音、吟猱 ——
  add(10, 'bell', 62, 3, 0.8); add(10.05, 'qin', 38, 4, 0.9); add(10.5, 'qing', 86, 0, 0.5);
  [[0, 45], [1, 50], [2, 52]].forEach((n, i) => { add(EV.press[i], 'wood', 0, 0, 0.8); add(EV.press[i] + 0.02, 'qin', n[1], 2.5, 0.8); });
  add(EV.press[3], 'wood', 0, 0, 0.8); add(EV.press[3] + 0.02, 'qins', 54, 2.2, 0.8, 57);
  EV.books.forEach((t, j) => add(t, 'wood', 0, 0, 0.18));
  add(13.0, 'qin', 38, 4, 0.7); add(13.4, 'bell', 74, 2, 0.35);
  [[13.2, 74], [13.7, 78], [14.2, 81], [14.7, 83], [15.05, 86]].forEach(n => add(n[0], 'qinh', n[1], 2.2, 0.55));
  add(14.0, 'qing', 81, 0, 0.45);
  add(EV.bang, 'gong', 50, 0, 0.9); add(EV.bang, 'drum', 0, 0, 0.9);
  [50, 57, 62].forEach((m, i) => add(EV.bang + 0.05 + i * 0.05, 'qin', m, 3, 0.8));
  add(16.5, 'rustle', 0, 0.7, 0.5);
  [50, 54, 57, 62, 66].forEach((m, i) => add(16.9 + i * 0.16, 'qin', m, 2.5, 0.7));
  add(17.6, 'qinh', 86, 2.4, 0.6); add(17.4, 'whoosh', 0, 0.6, 0.45);
  // —— 近代古今：琵琶，轮指与扫弦 ——
  add(18, 'bell', 45, 3, 0.8); add(18.0, 'drum', 0, 0, 0.6);
  add(18.2, 'pipaT', 62, 0.9, 0.6);
  add(EV.stamp, 'stamp', 0, 0, 1); add(EV.stamp, 'gong', 38, 0, 0.7);
  [50, 57, 62, 66].forEach((m, i) => add(EV.stamp + 0.03 * i, 'pipa', m, 1.6, 0.9));
  add(EV.chain, 'snap', 0, 0, 0.9); add(EV.chain, 'gong', 40, 0, 0.8); add(EV.chain + 0.02, 'drum', 0, 0, 1);
  add(19.9, 'pipaT', 66, 0.6, 0.6);
  const pp = [50, 57, 50, 62, 50, 57, 54, 59];
  for (let i = 0; i < 18; i++) { const t = 20.7 + i * 0.25; add(t, 'pipa', pp[i % 8], 0.5, i % 4 === 0 ? 0.85 : 0.55); }
  for (let t = 21.0; t < 24.5; t += 0.5) { add(t, 'chuff', 0, 0, 0.55); add(t, 'drum', 0, 0, 0.4); }
  add(22.0, 'pipaT', 69, 1.2, 0.5); add(23.3, 'pipaT', 74, 1.4, 0.65);
  add(23.4, 'whoosh', 0, 1.5, 0.6);
  // —— 当代追赶：民乐交响登场 ——
  add(25, 'bell', 50, 4, 1); add(25, 'drum', 0, 0, 1); add(25, 'gong', 38, 0, 0.8);
  add(25.1, 'erhu', 69, 2.6, 0.7); add(25.1, 'erhu', 57, 2.6, 0.45);
  EV.shift.forEach(t => { add(t, 'clang', 0, 0, 0.9); add(t, 'drum', 0, 0, 0.9); add(t, 'gong', 45, 0, 0.5); });
  [[27.7, 74, 0.5], [28.2, 76, 0.5], [28.7, 74, 0.5], [29.2, 71, 0.7], [29.9, 69, 0.5]].forEach(n => add(n[0], 'erhu', n[1], n[2], 0.55));
  for (let i = 0; i < 18; i++) add(EV.hand0 + i * EV.handDt, 'wood', 0, 0, 0.45 + (i % 3 === 0 ? 0.2 : 0));
  for (let t = 26.4; t < 31.9; t += 0.5) add(t, 'drum', 0, 0, 0.35);
  add(EV.spread, 'drum', 0, 0, 1); add(EV.spread, 'gong', 38, 0, 0.9); add(EV.spread, 'bell', 62, 3, 0.7);
  [50, 52, 54, 57, 59, 62, 64, 66, 69, 71, 74].forEach((m, i) => add(EV.spread + 0.05 + i * 0.07, 'zheng', m, 1.2, 0.7));
  EV.flip.forEach((t, i) => {
    add(t, 'bell', [62, 57, 59, 62][i], 3, 0.8); add(t, 'drum', 0, 0, 0.8);
    const base = [[74, 71, 69], [69, 71, 74], [71, 74, 76], [74, 78, 81]][i];
    base.forEach((m, k) => add(t + 0.1 + k * 0.3, 'di', m, 0.6, 0.6));
    [50, 57, 62].forEach((m, k) => add(t + 0.05 + k * 0.06, 'zheng', m, 1.5, 0.6));
  });
  for (let t = 32.5; t < 37; t += 0.5) add(t, 'drum', 0, 0, 0.35);
  add(36.4, 'whoosh', 0, 0.7, 0.6);
  // —— 智能时代：民乐交响，节奏渐强，最终回归陶埙 ——
  add(37, 'bell', 50, 4, 1); add(37, 'gong', 38, 0, 0.9);
  for (let t = 37; t < 56.0; t += 0.5) { const bar = Math.round((t - 37) / 0.5) % 4 === 0; add(t, 'drum', 0, 0, bar ? 0.9 : 0.5); if (t > 38.9 && t < 55.5) add(t + 0.25, 'wood', 0, 0, 0.18); }
  const arp = [50, 57, 62, 66, 69, 66, 62, 57];
  for (let i = 0; i < 24; i++) add(37.0 + i * 0.25, 'pipa', arp[i % 8], 0.4, i % 8 === 0 ? 0.75 : 0.45);
  EV.snap.forEach((t, i) => { add(t, 'snap', 0, 0, 1); add(t, 'gong', 38 + i * 2, 0, 0.8); });
  const theme = [[0, 69, .5], [.5, 71, .5], [1, 74, 1], [2, 76, .5], [2.5, 74, .5], [3, 71, 1], [4, 69, .5], [4.5, 71, .5], [5, 74, .5], [5.5, 78, 1.5]];
  [41.5, 47.5].forEach(st => theme.forEach(n => { add(st + n[0], 'di', n[1] + 12 > 86 ? n[1] : n[1], n[2], 0.75); add(st + n[0], 'erhu', n[1] - 12, n[2] + 0.05, 0.5); }));
  [[37.5, 74, 1], [38.5, 76, 1], [40, 78, 1.4]].forEach(n => add(n[0], 'di', n[1], n[2], 0.6));
  add(EV.robots, 'bell', 62, 3, 0.8); add(EV.robots, 'gong', 38, 0, 0.8);
  for (let i = 0; i < 12; i++) add(EV.robots + i * 0.125 + 0.05, 'zheng', arp[i % 8] + 12, 0.5, 0.45);
  add(43.4, 'whoosh', 0, 0.7, 0.6);
  add(44, 'bell', 50, 4, 1); add(44.0, 'gong', 38, 0, 0.9);
  [[44.2, 62, 4], [44.2, 69, 4]].forEach(n => add(n[0], 'erhu', n[1], n[2], 0.5));
  add(45.8, 'whoosh', 0, 0.5, 0.6); add(EV.fork, 'gong', 45, 0, 0.9); add(EV.fork, 'bell', 74, 3, 0.8);
  [57, 62, 66, 69, 74].forEach((m, i) => add(EV.burst + i * 0.08, 'zheng', m + 12 * (i > 2 ? 1 : 0), 1.8, 0.7)); add(EV.burst, 'bell', 86, 4, 0.7);
  add(50.5, 'whoosh', 0, 0.5, 0.55);
  add(51, 'bell', 50, 4, 1); add(51, 'gong', 38, 0, 0.8);
  for (let i = 0; i < 20; i++) add(51.0 + i * 0.25, 'zheng', arp[i % 8] + (i % 16 > 7 ? 12 : 0), 0.7, 0.4);
  add(55.4, 'whoosh', 0, 0.6, 0.6);
  add(56, 'bell', 50, 5, 1); add(56, 'gong', 38, 0, 1); add(56, 'drum', 0, 0, 1);
  [50, 57, 62, 66, 69].forEach(m => add(56.0, 'erhu', m, 3, 0.45));
  [62, 69, 74, 78].forEach((m, i) => add(56.05 + i * 0.05, 'pipa', m, 1.5, 0.8));
  add(56.8, 'bell', 74, 3, 0.55); add(57.2, 'qing', 86, 0, 0.5);
  add(58.0, 'xun', 62, 1.8, 0.7);                         // 余音回到开篇陶埙，循环自洽
  SC.sort((a, b) => a.t - b.t);
})();
const KICKS = SC.filter(e => e.k === 'drum' || e.k === 'stamp' || e.k === 'snap').map(e => ({ t: e.t, v: e.v }));
function pulse(t, decay = 0.2, minv = 0) {          // 画面脉冲：取最近一次鼓点
  let best = 0;
  for (let i = KICKS.length - 1; i >= 0; i--) {
    const k = KICKS[i]; if (k.t > t) continue; const age = t - k.t; if (age > 1.2) break;
    best = Math.max(best, k.v * Math.exp(-age / decay) * (k.v >= minv ? 1 : 0));
  }
  return best;
}

/* —— 合成器 —— */
let AC = null, master = null, rev = null, noiseBuf = null, muted = false, ksCache = {};
function dest(n, wet = 0.25) { n.connect(master); const s = AC.createGain(); s.gain.value = wet; n.connect(s); s.connect(rev); }
function envG(t0, a, d, v, r) {
  const g = AC.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(v, t0 + a);
  g.gain.setValueAtTime(v, t0 + Math.max(a, d)); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d + r); return g;
}
const mf = m => 440 * Math.pow(2, (m - 69) / 12);
function noiseSrc(t0, dur) { const s = AC.createBufferSource(); s.buffer = noiseBuf; s.loop = true; s.start(t0, Math.random() * 1.5); s.stop(t0 + dur); return s; }
function ksBuf(f, sec, damp, bright) {
  const key = [f.toFixed(1), sec, damp, bright].join('|'); if (ksCache[key]) return ksCache[key];
  const sr = AC.sampleRate, N = Math.max(2, Math.round(sr / f)), L = Math.floor(sr * sec);
  const b = AC.createBuffer(1, L, sr), d = b.getChannelData(0); let prev = 0;
  for (let i = 0; i < N; i++) { prev = prev * (1 - bright) + (Math.random() * 2 - 1) * bright; d[i] = prev; }
  for (let i = N; i < L; i++) d[i] = damp * 0.5 * (d[i - N] + d[i - N + 1]);
  let mx = 0; for (let i = 0; i < L; i += 7) mx = Math.max(mx, Math.abs(d[i])); const sc = 0.9 / (mx || 1);
  for (let i = 0; i < L; i++) d[i] *= sc;
  return (ksCache[key] = b);
}
function pluck(t0, f, v, sec, damp, bright, wet, slideTo, lp) {
  const s = AC.createBufferSource(); s.buffer = ksBuf(f, sec, damp, bright);
  if (slideTo) { s.playbackRate.setValueAtTime(1, t0 + 0.25); s.playbackRate.linearRampToValueAtTime(slideTo / f, t0 + 0.9); }
  const g = AC.createGain(); g.gain.value = v;
  const fl = AC.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp || 6000;
  s.connect(fl); fl.connect(g); dest(g, wet); s.start(t0);
}
const INST = {
  xun(t0, e) {
    const f = mf(e.m), d = e.d, o = AC.createOscillator(), o2 = AC.createOscillator(), lfo = AC.createOscillator(), lg = AC.createGain();
    o.type = 'sine'; o2.type = 'sine'; o.frequency.setValueAtTime(f * 0.96, t0); o.frequency.linearRampToValueAtTime(f, t0 + 0.15); o2.frequency.value = f * 2;
    lfo.frequency.value = 4.8; lg.gain.setValueAtTime(0, t0); lg.gain.linearRampToValueAtTime(f * 0.008, t0 + d * 0.6); lfo.connect(lg); lg.connect(o.frequency);
    const g = envG(t0, 0.22, d, e.v * 0.5, 0.7), g2 = AC.createGain(); g2.gain.value = 0.1;
    const n = noiseSrc(t0, d + 0.9), bp = AC.createBiquadFilter(), ng = envG(t0, 0.15, d, 0.05 * e.v, 0.6); bp.type = 'bandpass'; bp.frequency.value = f * 2.2; bp.Q.value = 2.5;
    const lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800;
    o.connect(g); o2.connect(g2); g2.connect(g); n.connect(bp); bp.connect(ng); ng.connect(lp); g.connect(lp); dest(lp, 0.55);
    [o, o2, lfo].forEach(x => { x.start(t0); x.stop(t0 + d + 0.95); });
  },
  qin(t0, e) { pluck(t0, mf(e.m), e.v * 0.9, Math.min(4, e.d + 1), 0.9992, 0.5, 0.45, 0, 2600); },
  qins(t0, e) { pluck(t0, mf(e.m), e.v * 0.9, 3, 0.9992, 0.5, 0.45, mf(e.x), 2600); },
  qinh(t0, e) {
    const f = mf(e.m), o = AC.createOscillator(), o2 = AC.createOscillator(); o.frequency.value = f; o2.frequency.value = f * 2.001;
    const g = envG(t0, 0.005, 0.05, e.v * 0.35, e.d), g2 = AC.createGain(); g2.gain.value = 0.25; o.connect(g); o2.connect(g2); g2.connect(g); dest(g, 0.6);
    o.start(t0); o2.start(t0); o.stop(t0 + e.d + 0.2); o2.stop(t0 + e.d + 0.2);
  },
  pipa(t0, e) { pluck(t0, mf(e.m), e.v * 0.85, 1.8, 0.9965, 0.9, 0.3, 0, 7500); },
  pipaT(t0, e) { const n = Math.floor(e.d / 0.06); for (let i = 0; i < n; i++) pluck(t0 + i * 0.06, mf(e.m), e.v * (0.35 + 0.45 * Math.sin(Math.PI * (i / n))), 0.9, 0.995, 0.9, 0.3, 0, 7000); },
  zheng(t0, e) { pluck(t0, mf(e.m), e.v * 0.75, 2.2, 0.9985, 0.8, 0.4, 0, 6500); },
  erhu(t0, e) {
    const f = mf(e.m), d = e.d, o = AC.createOscillator(), o2 = AC.createOscillator(), lfo = AC.createOscillator(), lg = AC.createGain();
    o.type = 'sawtooth'; o2.type = 'sawtooth'; o.frequency.value = f; o2.frequency.value = f * 1.004; lfo.frequency.value = 5.6;
    lg.gain.setValueAtTime(0, t0); lg.gain.linearRampToValueAtTime(f * 0.011, t0 + 0.5); lfo.connect(lg); lg.connect(o.frequency); lg.connect(o2.frequency);
    const bp = AC.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = Math.max(900, f * 3); bp.Q.value = 0.9;
    const lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3000;
    const g = envG(t0, 0.14, d, e.v * 0.2, 0.5); o.connect(bp); o2.connect(bp); bp.connect(lp); lp.connect(g); dest(g, 0.4);
    [o, o2, lfo].forEach(x => { x.start(t0); x.stop(t0 + d + 0.6); });
  },
  di(t0, e) {
    const f = mf(e.m), d = e.d, o = AC.createOscillator(), o2 = AC.createOscillator(), lfo = AC.createOscillator(), lg = AC.createGain();
    o.type = 'sine'; o2.type = 'triangle'; o.frequency.value = f; o2.frequency.value = f * 2; lfo.frequency.value = 5.4; lg.gain.value = f * 0.007; lfo.connect(lg); lg.connect(o.frequency);
    const g = envG(t0, 0.05, d, e.v * 0.32, 0.25), g2 = AC.createGain(); g2.gain.value = 0.18; o.connect(g); o2.connect(g2); g2.connect(g);
    const n = noiseSrc(t0, d + 0.4), bp = AC.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f * 3; bp.Q.value = 4; const ng = envG(t0, 0.03, d, 0.06 * e.v, 0.2);
    n.connect(bp); bp.connect(ng); ng.connect(g); dest(g, 0.4);
    [o, o2, lfo].forEach(x => { x.start(t0); x.stop(t0 + d + 0.4); });
  },
  drum(t0, e) {
    const o = AC.createOscillator(); o.frequency.setValueAtTime(150, t0); o.frequency.exponentialRampToValueAtTime(45, t0 + 0.2);
    const g = envG(t0, 0.003, 0.02, e.v * 1.0, 0.55); o.connect(g); dest(g, 0.3); o.start(t0); o.stop(t0 + 0.7);
    const n = noiseSrc(t0, 0.15), lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 500; const ng = envG(t0, 0.002, 0.01, e.v * 0.4, 0.1); n.connect(lp); lp.connect(ng); dest(ng, 0.2);
  },
  wood(t0, e) {
    const o = AC.createOscillator(); o.type = 'triangle'; o.frequency.setValueAtTime(1000, t0); o.frequency.exponentialRampToValueAtTime(520, t0 + 0.06);
    const g = envG(t0, 0.001, 0.005, e.v * 0.5, 0.09); o.connect(g); dest(g, 0.25); o.start(t0); o.stop(t0 + 0.2);
  },
  gong(t0, e) {
    const f = mf(e.m); [1, 1.52, 2.31, 2.97, 3.6].forEach((r, i) => {
      const o = AC.createOscillator(); o.frequency.value = f * r; const g = envG(t0, 0.006, 0.02, e.v * 0.28 / (1 + i * 0.5), 2.8 - i * 0.3); o.connect(g); dest(g, 0.5); o.start(t0); o.stop(t0 + 3.4);
    });
  },
  bell(t0, e) {
    const f = mf(e.m); [[1, 1], [2.0, 0.5], [2.76, 0.4], [4.07, 0.22], [1.005, 0.7]].forEach(([r, a], i) => {
      const o = AC.createOscillator(); o.frequency.value = f * r; const g = envG(t0, 0.004, 0.02, e.v * 0.3 * a, Math.min(e.d, 4.5) / (1 + i * 0.35)); o.connect(g); dest(g, 0.55); o.start(t0); o.stop(t0 + e.d + 0.5);
    });
  },
  qing(t0, e) { const f = mf(e.m), o = AC.createOscillator(); o.frequency.value = f; const g = envG(t0, 0.003, 0.02, e.v * 0.25, 1.8); o.connect(g); dest(g, 0.6); o.start(t0); o.stop(t0 + 2.2); },
  tuo(t0, e) {
    [[520, 1], [1130, 0.55], [1750, 0.3]].forEach(([f, a]) => { const o = AC.createOscillator(); o.type = 'sine'; o.frequency.value = f; const g = envG(t0, 0.002, 0.01, e.v * 0.28 * a, 0.7); o.connect(g); dest(g, 0.4); o.start(t0); o.stop(t0 + 0.9); });
    INST.wood(t0, { v: 0.5 });
  },
  crack(t0, e) {
    const n = noiseSrc(t0, 0.2), hp = AC.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2200; const g = envG(t0, 0.001, 0.015, e.v * 0.6, 0.06); n.connect(hp); hp.connect(g); dest(g, 0.2);
    const o = AC.createOscillator(); o.frequency.value = 90; const g2 = envG(t0, 0.001, 0.01, e.v * 0.4, 0.1); o.connect(g2); dest(g2, 0.2); o.start(t0); o.stop(t0 + 0.2);
  },
  rustle(t0, e) {
    const n = noiseSrc(t0, e.d + 0.1), bp = AC.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 4200; bp.Q.value = 0.8;
    const g = AC.createGain(); g.gain.setValueAtTime(0.0001, t0); for (let i = 0; i < 12; i++) g.gain.linearRampToValueAtTime(e.v * 0.15 * (0.3 + Math.random()), t0 + (i + 1) * e.d / 12); g.gain.linearRampToValueAtTime(0.0001, t0 + e.d + 0.05);
    n.connect(bp); bp.connect(g); dest(g, 0.2);
  },
  whoosh(t0, e) {
    const n = noiseSrc(t0, e.d * 2 + 0.2), bp = AC.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.2; bp.frequency.setValueAtTime(300, t0); bp.frequency.exponentialRampToValueAtTime(3800, t0 + e.d * 1.6);
    const g = envG(t0, e.d * 1.2, e.d * 1.2, e.v * 0.25, e.d * 0.8); n.connect(bp); bp.connect(g); dest(g, 0.35);
  },
  chuff(t0, e) { const n = noiseSrc(t0, 0.3), lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400; const g = envG(t0, 0.004, 0.03, e.v * 0.4, 0.14); n.connect(lp); lp.connect(g); dest(g, 0.2); },
  snap(t0, e) {
    const n = noiseSrc(t0, 0.3), hp = AC.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1500; const g = envG(t0, 0.001, 0.02, e.v * 0.6, 0.12); n.connect(hp); hp.connect(g); dest(g, 0.3);
    const o = AC.createOscillator(); o.frequency.setValueAtTime(700, t0); o.frequency.exponentialRampToValueAtTime(70, t0 + 0.3); const g2 = envG(t0, 0.002, 0.02, e.v * 0.5, 0.3); o.connect(g2); dest(g2, 0.3); o.start(t0); o.stop(t0 + 0.6);
  },
  clang(t0, e) { [1800, 2700, 3900].forEach((f, i) => { const o = AC.createOscillator(); o.frequency.value = f; const g = envG(t0, 0.001, 0.01, e.v * 0.15 / (i + 1), 0.25); o.connect(g); dest(g, 0.35); o.start(t0); o.stop(t0 + 0.5); }); INST.wood(t0, { v: 0.9 }); },
  stamp(t0, e) {
    const o = AC.createOscillator(); o.frequency.setValueAtTime(110, t0); o.frequency.exponentialRampToValueAtTime(38, t0 + 0.3); const g = envG(t0, 0.002, 0.02, e.v, 0.5); o.connect(g); dest(g, 0.35); o.start(t0); o.stop(t0 + 0.8);
    const n = noiseSrc(t0, 0.2), lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700; const g2 = envG(t0, 0.001, 0.02, e.v * 0.6, 0.15); n.connect(lp); lp.connect(g2); dest(g2, 0.3);
  },
};
function startAudio() {
  if (AC) { AC.resume(); return; }
  AC = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 'interactive' });
  const comp = AC.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4; comp.attack.value = 0.005; comp.release.value = 0.25;
  master = AC.createGain(); master.gain.value = muted ? 0 : 0.5; master.connect(comp);
  const lim = AC.createDynamicsCompressor(); lim.threshold.value = -4; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = 0.002; lim.release.value = 0.12; comp.connect(lim); lim.connect(AC.destination);
  rev = AC.createConvolver(); const len = Math.floor(AC.sampleRate * 2.8), ib = AC.createBuffer(2, len, AC.sampleRate);
  for (let ch = 0; ch < 2; ch++) { const d = ib.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
  rev.buffer = ib; const rg = AC.createGain(); rg.gain.value = 0.7; rev.connect(rg); rg.connect(master);
  noiseBuf = AC.createBuffer(1, AC.sampleRate * 2, AC.sampleRate); const nd = noiseBuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  // 预生成弹拨缓冲
  SC.forEach(e => { try {
    if (e.k === 'qin') ksBuf(mf(e.m), Math.min(4, e.d + 1), 0.9992, 0.5);
    else if (e.k === 'qins') ksBuf(mf(e.m), 3, 0.9992, 0.5);
    else if (e.k === 'pipa') ksBuf(mf(e.m), 1.8, 0.9965, 0.9);
    else if (e.k === 'pipaT') ksBuf(mf(e.m), 0.9, 0.995, 0.9);
    else if (e.k === 'zheng') ksBuf(mf(e.m), 2.2, 0.9985, 0.8);
  } catch (_) { } });
}
function setMuted(m) { muted = m; if (master) master.gain.value = m ? 0 : 0.5; }
let sIdx = 0, sCycle = 0, sInit = false;
function audioReset(T) { sInit = false; }
function audioTick(T) {                              // T：由 rAF 时间戳换算的绝对影片时间（秒）
  if (!AC || AC.state !== 'running') return;
  const LOOK = 0.35, now = AC.currentTime;
  if (!sInit) { sCycle = Math.floor(T / DUR); const lt = T - sCycle * DUR; sIdx = SC.findIndex(e => e.t >= lt - 0.02); if (sIdx < 0) { sIdx = 0; sCycle++; } sInit = true; }
  let guard = 0;
  while (guard++ < 200) {
    const e = SC[sIdx], abs = sCycle * DUR + e.t;
    if (abs > T + LOOK) break;
    if (abs >= T - 0.06) { try { INST[e.k](now + Math.max(0.005, abs - T), e); } catch (err) { } }
    sIdx++; if (sIdx >= SC.length) { sIdx = 0; sCycle++; }
  }
}
