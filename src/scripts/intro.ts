/* ==========================================================================
   "AI agents building the site" intro.
   ~9s timeline, no dependencies (rAF + Web Animations API).

   Markup contract:
     [data-build="bar|side|area|text|input|btn|media|stat|table|cal"]  a box the agents draw then fill
     [data-order]   build order (0 = big layout areas first)
     [data-layer]   Figma-like layer name shown on the box
     [data-bit]     small detail revealed in quick bursts inside a box
   html.intro hides every [data-build]/[data-bit] until revealed (see global.css).
   ========================================================================== */

type Agent = { el: HTMLElement; x: number; y: number; color: string; name: string; chain: Promise<void>; busy: boolean };
type Target = { el: HTMLElement; kind: string; rect: DOMRect; box?: HTMLElement; agent?: Agent; layers: number; filled?: boolean };
type Strings = { agents: string; layers: string; complete: string; skip: string };

const ACCENT = '#2F6BFF';
const COLORS = ['#8B5CF6', '#EF4444', '#10B981', '#F97316', '#3B82F6', '#EC4899', '#F59E0B', '#06B6D4'];
const NAMES = ['Ada', 'Nova', 'Pixel', 'Atlas', 'Iris', 'Echo', 'Juno', 'Kai', 'Lumen', 'Milo', 'Nyx', 'Orion', 'Quill', 'Rhea', 'Sol', 'Tess', 'Vega', 'Wren', 'Zed', 'Bo', 'Cleo', 'Dex', 'Fen', 'Gia', 'Hux', 'Ivo', 'Lux', 'Mira'];

const html = document.documentElement;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const linear = (t: number) => t;

let running = false;
let skipped = false;
let t0 = 0;
const restorers: Array<() => void> = [];

function sleep(ms: number) {
  return new Promise<void>((r) => (skipped ? r() : setTimeout(r, Math.max(0, ms))));
}
const until = (ms: number) => sleep(ms - (performance.now() - t0));

function tween(dur: number, fn: (e: number) => void, ease = easeIO) {
  return new Promise<void>((res) => {
    if (skipped || dur <= 0) { fn(1); return res(); }
    const s = performance.now();
    const step = (now: number) => {
      if (skipped) { fn(1); return res(); }
      const p = Math.min(1, (now - s) / dur);
      fn(ease(p));
      p < 1 ? requestAnimationFrame(step) : res();
    };
    requestAnimationFrame(step);
  });
}

function h<K extends keyof HTMLElementTagNameMap>(tag: K, cls: string, parent?: HTMLElement, text?: string) {
  const el = document.createElement(tag);
  el.className = cls;
  if (text) el.textContent = text;
  parent?.appendChild(el);
  return el;
}

function cursorSVG(color: string) {
  return `<svg width="18" height="20" viewBox="0 0 18 20" aria-hidden="true"><path d="M2 1.6 16 9.2l-6.3 1.6-3.1 6.4z" fill="${color}" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
}

/* ---------------- agents ---------------- */
function place(a: Agent) {
  a.el.style.transform = `translate3d(${a.x.toFixed(1)}px, ${a.y.toFixed(1)}px, 0)`;
}

/** Curved, slightly human path: quadratic bezier with a random perpendicular bend. */
function move(a: Agent, x: number, y: number, dur?: number) {
  const x0 = a.x, y0 = a.y;
  const dx = x - x0, dy = y - y0;
  const dist = Math.hypot(dx, dy) || 1;
  const d = dur ?? clamp(240 + dist * 0.5, 280, 820);
  const bend = rand(-0.22, 0.22) * dist;
  const cx = (x0 + x) / 2 - (dy / dist) * bend;
  const cy = (y0 + y) / 2 + (dx / dist) * bend;
  return tween(d, (t) => {
    const u = 1 - t;
    a.x = u * u * x0 + 2 * u * t * cx + t * t * x;
    a.y = u * u * y0 + 2 * u * t * cy + t * t * y;
    place(a);
  });
}

function queue(a: Agent, job: (a: Agent) => Promise<void>) {
  a.chain = a.chain.then(async () => { a.busy = true; await job(a); a.busy = false; });
  return a.chain;
}

/* ---------------- main ---------------- */
export function runIntro(force = false) {
  if (running) return;
  if (!force && !html.classList.contains('intro')) return;
  if (!force && reduced()) { html.classList.remove('intro'); return; }

  running = true;
  skipped = false;
  (window as any).__asIntro = true;
  html.classList.add('intro');
  window.scrollTo(0, 0);

  const S: Strings = JSON.parse(document.body.dataset.intro || '{}');
  const vw = window.innerWidth, vh = window.innerHeight;
  const mobile = vw < 760;

  // Overlay
  const root = h('div', 'ib');
  const grid = h('div', 'ib-grid', root);
  const boxes = h('div', 'ib-boxes', root);
  const agentsLayer = h('div', 'ib-agents', root);
  const pill = h('div', 'ib-pill', root);
  [grid, boxes, agentsLayer, pill].forEach((el) => el.setAttribute('aria-hidden', 'true'));
  const live = h('div', 'ib-live', pill);
  const dots = h('span', 'ib-dots', live);
  for (let i = 0; i < 6; i++) h('i', '', dots);
  const agentsLbl = h('span', '', live);
  h('span', 'ib-sep', live);
  const layersLbl = h('span', '', live);
  const done = h('div', 'ib-done', pill);
  done.innerHTML = `<i>✓</i>${S.complete || 'Build complete'}`;
  const prog = h('span', 'ib-prog', pill);
  const progBar = h('i', '', prog);
  const skipBtn = document.createElement('button');
  skipBtn.type = 'button';
  skipBtn.className = 'ib-skip';
  skipBtn.textContent = (S.skip || 'Skip intro') + '  esc';
  root.appendChild(skipBtn);
  document.body.appendChild(root);

  // Targets in the first viewport
  const all = Array.from(document.querySelectorAll<HTMLElement>('[data-build]'));
  const targets: Target[] = all
    .map((el) => ({ el, kind: el.dataset.build || 'area', rect: el.getBoundingClientRect(), layers: 1 + el.querySelectorAll('*').length }))
    .filter((t) => t.rect.width > 0 && t.rect.height > 0 && t.rect.top < vh - 8 && t.rect.bottom > 0 && t.rect.left < vw && t.rect.right > 4)
    .sort((a, b) => Number(a.el.dataset.order || 0) - Number(b.el.dataset.order || 0));
  const offscreen = all.filter((el) => !targets.some((t) => t.el === el));

  // Layer counter: every element inside the build scope is a "layer".
  const scopeEls = new Set<Element>();
  targets.forEach((t) => { scopeEls.add(t.el); t.el.querySelectorAll('*').forEach((c) => scopeEls.add(c)); });
  const totalLayers = scopeEls.size || 1;
  let builtLayers = 0;
  const bump = (n: number) => { builtLayers = Math.min(totalLayers, builtLayers + n); };

  // Agents
  const N = mobile ? 14 : 28;
  agentsLbl.innerHTML = `<b>${N}</b> ${S.agents || 'agents'}`;
  const agents: Agent[] = Array.from({ length: N }, (_, i) => {
    const color = COLORS[i % COLORS.length];
    const name = NAMES[i % NAMES.length];
    const el = h('div', 'ib-agent', agentsLayer);
    el.innerHTML = cursorSVG(color) + `<span style="background:${color}">${name}</span>`;
    // start just outside a random edge
    const side = i % 4;
    const x = side === 0 ? -30 : side === 1 ? vw + 30 : rand(0, vw);
    const y = side === 2 ? -30 : side === 3 ? vh + 30 : rand(0, vh);
    const a: Agent = { el, x, y, color, name, chain: Promise.resolve(), busy: false };
    place(a);
    return a;
  });

  // Status pill ticker
  let shown = 0;
  const tick = () => {
    if (!running) return;
    shown += (builtLayers - shown) * 0.18;
    if (Math.abs(builtLayers - shown) < 0.5) shown = builtLayers;
    layersLbl.innerHTML = `<b>${Math.round(shown)}</b> / ${totalLayers} ${S.layers || 'layers'}`;
    progBar.style.transform = `scaleX(${(shown / totalLayers).toFixed(3)})`;
    requestAnimationFrame(tick);
  };
  const dotTimer = window.setInterval(() => {
    const busy = agents.filter((a) => a.busy);
    const pool = busy.length ? busy : agents;
    Array.from(dots.children).forEach((d, i) => ((d as HTMLElement).style.background = pool[(i * 3 + Math.floor(performance.now() / 300)) % pool.length].color));
  }, 260);

  const click = (a: Agent) => {
    a.el.classList.add('press');
    setTimeout(() => a.el.classList.remove('press'), 140);
    const r = h('div', 'ib-ring', agentsLayer);
    r.style.left = `${a.x + 2}px`;
    r.style.top = `${a.y + 2}px`;
    r.style.borderColor = a.color;
    setTimeout(() => r.remove(), 600);
  };
  const flashHit = (el: Element) => {
    el.classList.remove('ib-hit');
    void (el as HTMLElement).offsetWidth;
    el.classList.add('ib-hit');
    setTimeout(() => el.classList.remove('ib-hit'), 650);
  };
  const show = (el: HTMLElement) => { el.style.opacity = '1'; };

  /* ---------- reveal effects ---------- */
  async function typeText(el: HTMLElement, dur: number) {
    const hgt = el.getBoundingClientRect().height;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes: Array<[Text, string]> = [];
    let total = 0;
    while (walker.nextNode()) {
      const n = walker.currentNode as Text;
      if (!n.data.trim() && !n.data.length) continue;
      nodes.push([n, n.data]);
      total += n.data.length;
    }
    const restore = () => { nodes.forEach(([n, s]) => (n.data = s)); caret.remove(); el.style.minHeight = ''; };
    restorers.push(restore);
    nodes.forEach(([n]) => (n.data = ''));
    el.style.minHeight = `${hgt}px`;
    const caret = document.createElement('span');
    caret.className = 'ib-caret';
    el.appendChild(caret);
    show(el);
    await tween(dur, (t) => {
      let k = Math.round(total * t);
      let last: Text | null = null;
      for (const [n, s] of nodes) {
        const take = Math.min(s.length, Math.max(0, k));
        if (n.data.length !== take) n.data = s.slice(0, take);
        if (take > 0) last = n;
        k -= s.length;
      }
      if (last && caret.previousSibling !== last) last.parentNode?.insertBefore(caret, last.nextSibling);
    }, linear);
    await sleep(140);
    restore();
  }

  async function typePlaceholder(input: HTMLInputElement, dur: number) {
    const full = input.placeholder;
    restorers.push(() => (input.placeholder = full));
    await tween(dur, (t) => (input.placeholder = full.slice(0, Math.round(full.length * t))), linear);
    input.placeholder = full;
  }

  async function countUp(el: HTMLElement, dur: number) {
    const full = el.textContent || '';
    const m = full.match(/^(\d+)(.*)$/);
    restorers.push(() => (el.textContent = full));
    if (!m) return;
    const n = Number(m[1]);
    await tween(dur, (t) => (el.textContent = `${Math.round(n * t)}${m[2]}`), easeOut);
    el.textContent = full;
  }

  async function burst(container: HTMLElement, helpers: Agent[], step = 26) {
    const bits = Array.from(container.querySelectorAll<HTMLElement>('[data-bit]'));
    const vis = bits.filter((b) => { const r = b.getBoundingClientRect(); return r.top < vh && r.bottom > 0; });
    vis.forEach((b, i) => {
      setTimeout(() => {
        show(b);
        b.animate([{ opacity: 0, transform: 'translateY(3px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
        bump(1 + b.querySelectorAll('*').length);
        if (i % 3 === 0) flashHit(b);
      }, skipped ? 0 : i * step + rand(0, step * 0.8));
    });
    // helpers hop between a few bits and click
    const hops = helpers.map((a, j) => queue(a, async () => {
      for (let k = 0; k < 3; k++) {
        const b = vis[Math.floor(rand(0, vis.length))];
        if (!b) break;
        const r = b.getBoundingClientRect();
        await move(a, r.left + rand(4, Math.max(6, r.width - 4)), r.top + r.height / 2, rand(220, 380));
        click(a);
        await sleep(rand(30, 90));
      }
    }));
    await sleep(vis.length * step + 360);
    bits.forEach(show);
    void hops;
  }

  async function fill(tg: Target, a: Agent, helpers: Agent[]) {
    const { el, kind, rect } = tg;
    if (tg.filled) return;
    tg.filled = true;
    // transparent parent containers must be visible before their children
    let p = el.parentElement?.closest<HTMLElement>('[data-build]');
    while (p) { show(p); p = p.parentElement?.closest<HTMLElement>('[data-build]'); }
    // the agent moves in and clicks the layer
    const px = kind === 'text' ? rect.left + 6 : rect.left + rect.width * rand(0.3, 0.7);
    const py = kind === 'text' ? rect.top + Math.min(rect.height / 2, 24) : rect.top + Math.min(rect.height * rand(0.3, 0.6), 160);
    await move(a, px, py, rand(260, 420));
    click(a);
    tg.box?.classList.add('flash');

    const fadeBox = () => {
      if (!tg.box) return;
      tg.box.style.opacity = '0';
      const b = tg.box;
      setTimeout(() => b.remove(), 500);
    };

    switch (kind) {
      case 'side': {
        show(el);
        el.animate([{ transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }], { duration: 640, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });
        bump(1);
        setTimeout(fadeBox, 300);
        await sleep(360);
        await burst(el, helpers, 34);
        break;
      }
      case 'bar':
      case 'area': {
        show(el);
        bump(1);
        setTimeout(fadeBox, 250);
        if (kind === 'bar') await burst(el, helpers, 40);
        break;
      }
      case 'text': {
        const len = (el.textContent || '').length;
        const dur = el.tagName === 'H1' ? clamp(len * 22, 700, 1250) : clamp(len * 5, 320, 1000);
        bump(tg.layers);
        setTimeout(fadeBox, 200);
        await typeText(el, dur);
        break;
      }
      case 'input': {
        show(el);
        el.animate([{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' });
        bump(tg.layers);
        setTimeout(fadeBox, 220);
        const inp = el.querySelector('input');
        if (inp) await typePlaceholder(inp, 650);
        break;
      }
      case 'btn': {
        show(el);
        el.animate([{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' });
        flashHit(el);
        bump(tg.layers);
        setTimeout(fadeBox, 200);
        break;
      }
      case 'media': {
        show(el);
        const img = el.querySelector('img');
        img?.animate([{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }], { duration: 760, easing: 'cubic-bezier(.65,0,.35,1)' });
        bump(1);
        setTimeout(fadeBox, 300);
        await sleep(420);
        await burst(el, helpers.slice(0, 1), 90);
        break;
      }
      case 'stat': {
        show(el);
        el.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' });
        bump(2);
        setTimeout(fadeBox, 220);
        const num = el.querySelector<HTMLElement>('[data-count]');
        const p = num ? countUp(num, 700) : Promise.resolve();
        await burst(el, [], 60);
        await p;
        break;
      }
      case 'table':
      case 'cal': {
        show(el);
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
        bump(1);
        setTimeout(fadeBox, 260);
        await burst(el, helpers, kind === 'cal' ? 7 : 45);
        break;
      }
      default:
        show(el);
        bump(tg.layers);
        fadeBox();
    }
  }

  /* ---------- wireframe a box ---------- */
  async function draw(tg: Target, a: Agent) {
    const r = tg.rect;
    const x = Math.max(1, r.left), y = Math.max(1, r.top);
    const w = Math.min(r.width, vw - x - 1), hh = Math.min(r.height, vh - y - 1);
    await move(a, x, y);
    await sleep(rand(40, 120));
    const box = h('div', 'ib-box', boxes);
    box.style.left = `${x}px`;
    box.style.top = `${y}px`;
    box.innerHTML = '<i class="h h-tl"></i><i class="h h-tr"></i><i class="h h-bl"></i><i class="h h-br"></i>';
    const badge = h('span', 'ib-badge', box);
    if (tg.el.dataset.layer && hh > 18) h('span', 'ib-name', box, tg.el.dataset.layer);
    tg.box = box;
    tg.agent = a;
    click(a);
    const x1 = x + w, y1 = y + hh;
    const sx = a.x, sy = a.y;
    await tween(clamp(Math.hypot(w, hh) * 0.55, 260, 560), (t) => {
      const cw = w * t, ch = hh * t;
      box.style.width = `${cw}px`;
      box.style.height = `${ch}px`;
      badge.textContent = `${Math.round(cw)} × ${Math.round(ch)}`;
      a.x = sx + (x1 - sx) * t;
      a.y = sy + (y1 - sy) * t;
      place(a);
    }, easeIO);
    badge.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
    bump(1);
  }

  /* ---------- finish / skip ---------- */
  let finished = false;
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') skip(); };
  function finalize() {
    if (finished) return;
    finished = true;
    restorers.splice(0).forEach((f) => f());
    document.querySelectorAll<HTMLElement>('[data-build],[data-bit]').forEach((el) => {
      el.style.opacity = '';
      el.getAnimations().forEach((an) => an.cancel());
    });
    html.classList.remove('intro');
    running = false;
    window.clearInterval(dotTimer);
    window.removeEventListener('keydown', onKey);
    try { sessionStorage.setItem('as-built', '1'); } catch {}
    document.dispatchEvent(new CustomEvent('intro:done'));
  }
  function skip() {
    if (finished) return;
    skipped = true;
    finalize();
    root.style.transition = 'opacity .35s';
    root.style.opacity = '0';
    setTimeout(() => root.remove(), 380);
  }
  skipBtn.addEventListener('click', skip);
  window.addEventListener('keydown', onKey);

  /* ---------- timeline ---------- */
  (async () => {
    t0 = performance.now();
    requestAnimationFrame(tick);

    // 1. Empty canvas, agents fly in (0-1s)
    agents.forEach((a, i) => queue(a, async () => {
      await sleep(i * 22);
      await move(a, rand(vw * 0.08, vw * 0.92), rand(vh * 0.1, vh * 0.85), rand(560, 820));
    }));
    setTimeout(() => { pill.classList.add('on'); skipBtn.classList.add('on'); }, 350);
    await until(700);

    // 2. Wireframing (1-3s): layout areas first, then content blocks
    const W0 = 750, W1 = 2450;
    const wires = targets.map((tg, i) => {
      const a = agents[i % agents.length];
      return queue(a, async () => {
        await until(W0 + (i / Math.max(1, targets.length - 1)) * (W1 - W0));
        await draw(tg, a);
      });
    });
    // idle agents drift around the canvas like they are inspecting
    const idle = agents.slice(Math.min(targets.length, agents.length));
    idle.forEach((a) => queue(a, async () => {
      await until(W0 + rand(0, 400));
      for (let k = 0; k < 2; k++) { await move(a, rand(vw * 0.1, vw * 0.9), rand(vh * 0.15, vh * 0.85)); await sleep(rand(80, 260)); }
    }));
    await Promise.race([Promise.all(wires), until(3300)]);
    await until(3000);

    // 3. Filling in (3-7s): several agents in parallel, one layer at a time each
    const F0 = 3000, F1 = 5900;
    const spare = agents.slice(Math.min(targets.length, agents.length));
    const fills = targets.map((tg, i) => {
      const a = tg.agent ?? agents[i % agents.length];
      const helpers = spare.length ? [spare[(2 * i) % spare.length], spare[(2 * i + 1) % spare.length]].filter((x, k, arr) => arr.indexOf(x) === k) : [];
      return queue(a, async () => {
        await until(F0 + (i / Math.max(1, targets.length - 1)) * (F1 - F0));
        await fill(tg, a, mobile ? helpers.slice(0, 1) : helpers);
      });
    });
    await Promise.race([Promise.all(fills), until(7400)]);
    await until(7000);

    // 4. Finish (7-9.5s): outlines fade, agents leave, pill confirms
    offscreen.forEach((el) => (el.style.opacity = '1'));
    targets.filter((tg) => !tg.filled).forEach((tg) => {
      tg.filled = true;
      show(tg.el);
      tg.el.animate(
        tg.kind === 'side' ? [{ transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }] : [{ opacity: 0 }, { opacity: 1 }],
        { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' },
      );
    });
    document.querySelectorAll<HTMLElement>('[data-bit]').forEach(show);
    restorers.splice(0).forEach((f) => f());
    builtLayers = totalLayers;
    boxes.querySelectorAll<HTMLElement>('.ib-box').forEach((b) => (b.style.opacity = '0'));
    grid.style.opacity = '0';
    agents.forEach((a, i) => {
      a.chain = Promise.resolve();
      const ex = a.x < vw / 2 ? -40 : vw + 40;
      const ey = a.y + rand(-120, 120);
      setTimeout(() => { move(a, ex, ey, rand(520, 820)); a.el.style.opacity = '0'; }, i * 14);
    });
    await sleep(650);
    pill.classList.add('done');
    await sleep(950);
    pill.classList.remove('on');
    skipBtn.classList.remove('on');
    finalize();
    await sleep(500);
    root.style.transition = 'opacity .4s';
    root.style.opacity = '0';
    await sleep(420);
    root.remove();
  })().catch(() => skip());
}

export function replayIntro() {
  if (running) return;
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  // wait one frame so layout is at the top before measuring
  requestAnimationFrame(() => requestAnimationFrame(() => runIntro(true)));
}
