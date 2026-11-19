import { LANGS, SITE_URL, langPath } from '../data/site';
import { SEO_PAGES, pageUrl, alternatesFor } from '../data/seo';

export function GET() {
  const home = Object.fromEntries(LANGS.map((l) => [l, langPath(l)]));
  const groups: Record<string, string>[] = [home, ...[...new Set(SEO_PAGES.map((p) => p.key))].map((k) => alternatesFor(k) as Record<string, string>)];
  const abs = (p: string) => new URL(p, SITE_URL).href;
  const urls = groups.flatMap((g) =>
    Object.values(g).map((loc) =>
      `  <url><loc>${abs(loc)}</loc>${Object.entries(g).map(([l, h]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(h)}"/>`).join('')}<changefreq>monthly</changefreq><priority>${loc === '/' ? '1.0' : '0.8'}</priority></url>`,
    ),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
