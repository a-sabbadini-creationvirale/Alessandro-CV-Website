# alessandrosabbadini.com

Portfolio and resume site for Alessandro Sabbadini: Gen-AI content, CGI, films and websites.
Built with [Astro](https://astro.build) as a fully static site in four languages (EN, IT, FR, ES).

On first visit, an ~9 second intro shows the page being built live by a team of AI agents
(cursors, Figma-like selection boxes with size badges, text typing in, a status pill counting layers).
It plays once per browser session, is skipped for `prefers-reduced-motion`, deep links (`#work`) and
`?nointro`, and can be replayed from the footer ("Replay the build"). `?intro` forces it.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/
```

## Where things live

| What | File |
|---|---|
| All visible text, per language | `src/i18n/en.ts` (source of truth + types), `it.ts`, `fr.ts`, `es.ts` |
| Projects, films, contact links, timeline | `src/data/site.ts` |
| Page sections | `src/components/*.astro` (`Hero`, `Work`, `Films`, `AILab`, `Experience`, `Contact`, `Shell`) |
| Design tokens + all styles | `src/styles/global.css` |
| AI-agents intro engine (no dependencies) | `src/scripts/intro.ts` |
| Filters, film player, drawer, reveals | `src/scripts/site.ts` |
| Screenshots of client sites (webp, 1200 + 640) | `public/media/work/` |
| Film previews (8s mp4 + webm), posters, full versions | `public/media/films/` |

### Adding a website project
1. Add an entry to `WORK` in `src/data/site.ts` (`slug`, `name`, `url`, `year`, `cat`, `stack`, optional `metric`).
2. Add `work.items[slug]` (and `work.metrics[slug]` if used) to **all four** language files.
3. Add `public/media/work/<slug>.webp` (1200×750) and `<slug>-sm.webp` (640×400).

### Adding a film
1. Add an entry to `FILMS` in `src/data/site.ts`.
2. Add `films.items[slug]` to all four language files.
3. Add `public/media/films/<slug>.mp4` + `.webm` (8s muted loop, 960px), `<slug>.webp` poster and `<slug>-full.mp4` (720p with audio).

### Intro markup contract
- `data-build="bar|side|area|text|input|btn|media|stat|table|cal"`: a box the agents draw, then fill.
- `data-order`: build order (0 = big layout areas first).
- `data-layer`: the layer name shown above the selection box.
- `data-bit`: small details revealed in quick bursts with a blue highlight flash.

## Writing rules
No em dashes. Ranges use `→` or a short hyphen. Formal address in IT (voi), FR (vous) and ES (usted).
Every copy change goes into every language.
