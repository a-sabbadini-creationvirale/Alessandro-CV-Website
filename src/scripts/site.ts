import { runIntro, replayIntro } from './intro';

const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(s));

/* Intro ------------------------------------------------------------------ */
runIntro();
$('[data-replay]')?.addEventListener('click', replayIntro);

/* Scroll reveals ----------------------------------------------------------- */
const revealIO = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } }),
  { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
);
$$('[data-reveal]').forEach((el) => revealIO.observe(el));

/* Active section: sidebar + breadcrumb ---------------------------------------- */
const crumb = $('[data-crumb]');
const navLinks = $$<HTMLAnchorElement>('[data-nav]');
const sections = navLinks.map((a) => document.getElementById(a.dataset.nav!)).filter(Boolean) as HTMLElement[];
const setActive = (id: string) => {
  navLinks.forEach((a) => a.setAttribute('aria-current', String(a.dataset.nav === id)));
  const a = navLinks.find((x) => x.dataset.nav === id);
  if (crumb && a) crumb.textContent = a.textContent?.replace(/\d+$/, '').trim() || '';
};
const secIO = new IntersectionObserver(
  (entries) => {
    const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (vis) setActive(vis.target.id);
  },
  { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
);
sections.forEach((s) => secIO.observe(s));
setActive('overview');

/* Mobile drawer ------------------------------------------------------------- */
const side = $('#sidebar');
const scrim = $('.scrim');
const menuBtn = $('[data-menu]');
const setDrawer = (open: boolean) => {
  side?.classList.toggle('open', open);
  scrim?.classList.toggle('open', open);
  menuBtn?.setAttribute('aria-expanded', String(open));
  if (open) $<HTMLElement>('.side-nav a', side!)?.focus({ preventScroll: true });
};
menuBtn?.addEventListener('click', () => setDrawer(true));
$$('[data-close]').forEach((el) => el.addEventListener('click', () => setDrawer(false)));
navLinks.forEach((a) => a.addEventListener('click', () => setDrawer(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && side?.classList.contains('open')) { setDrawer(false); menuBtn?.focus(); } });

/* Brief form -> prefilled email ------------------------------------------------ */
const brief = $<HTMLFormElement>('[data-brief]');
brief?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = $<HTMLInputElement>('input', brief)!;
  const text = input.value.trim() || input.placeholder.replace(/\.\.\.$/, '');
  const url = `mailto:${brief.dataset.email}?subject=${encodeURIComponent(brief.dataset.subject || '')}&body=${encodeURIComponent(text)}`;
  window.location.href = url;
});

/* Work filters ------------------------------------------------------------- */
const filterBtns = $$<HTMLButtonElement>('[data-filter]');
const cards = $$<HTMLElement>('.work-grid .card');
filterBtns.forEach((b) =>
  b.addEventListener('click', () => {
    const f = b.dataset.filter!;
    filterBtns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    let i = 0;
    cards.forEach((c) => {
      const show = f === 'all' || c.dataset.cat === f;
      c.classList.toggle('is-hidden', !show);
      // when filtering, the first visible card is not the "big" one unless "all"
      c.style.gridColumn = f !== 'all' && c.classList.contains('featured') ? 'span 4' : '';
      c.style.gridRow = f !== 'all' ? 'auto' : '';
      if (show) {
        c.classList.add('in');
        c.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 480, delay: i++ * 40, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
      }
    });
  }),
);

/* Films: lazy previews that only play while visible -------------------------------- */
const canAutoplay = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const filmIO = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      const tile = e.target as HTMLElement;
      const v = $<HTMLVideoElement>('video', tile)!;
      if (e.isIntersecting && canAutoplay) {
        if (!v.dataset.loaded) {
          v.dataset.loaded = '1';
          const webm = document.createElement('source');
          webm.src = v.dataset.webm!;
          webm.type = 'video/webm';
          const mp4 = document.createElement('source');
          mp4.src = v.dataset.mp4!;
          mp4.type = 'video/mp4';
          v.append(webm, mp4);
          v.addEventListener('playing', () => tile.classList.add('playing'), { once: true });
          v.load();
        }
        v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    }),
  { threshold: 0.45 },
);
$$('.film').forEach((f) => filmIO.observe(f));

const dlg = $<HTMLDialogElement>('#player');
if (dlg) {
  const pv = $<HTMLVideoElement>('video', dlg)!;
  const src = $<HTMLAnchorElement>('[data-p-source]', dlg)!;
  let opener: HTMLElement | null = null;
  $$('.film').forEach((tile) =>
    tile.addEventListener('click', () => {
      opener = tile;
      $('[data-p-title]', dlg)!.textContent = tile.dataset.title || '';
      $('[data-p-desc]', dlg)!.textContent = tile.dataset.desc || '';
      src.hidden = !tile.dataset.source;
      if (tile.dataset.source) src.href = tile.dataset.source;
      pv.src = `/media/films/${tile.dataset.film}-full.mp4`;
      pv.poster = `/media/films/${tile.dataset.film}.webp`;
      dlg.showModal();
      pv.play().catch(() => {});
    }),
  );
  const close = () => dlg.close();
  $('[data-p-close]', dlg)?.addEventListener('click', close);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
  dlg.addEventListener('close', () => { pv.pause(); pv.removeAttribute('src'); pv.load(); opener?.focus(); });
}

/* Language bars animate in -------------------------------------------------- */
const barIO = new IntersectionObserver((entries) =>
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    $$('.bar i', e.target).forEach((b, i) => b.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 900, delay: 120 + i * 80, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
    barIO.unobserve(e.target);
  }),
);
$$('.lang-list').forEach((l) => barIO.observe(l));
