// Language-independent data. All visible copy lives in src/i18n/*.ts.

export const LANGS = ['en', 'it', 'fr', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const SITE_URL = 'https://alessandrosabbadini.com';

export const langPath = (lang: Lang) => (lang === 'en' ? '/' : `/${lang}/`);

export const CONTACT = {
  email: 'alessandrosabbadinidesign@gmail.com',
  whatsapp: 'https://wa.me/393889340521',
  linkedin: 'https://www.linkedin.com/in/alessandro-sabbadini-lafrance/',
  cv: '/Alessandro_Sabbadini_CV.pdf',
};

export type Category = 'luxury' | 'hospitality' | 'finance' | 'culture' | 'studio';
export const CATEGORIES: Category[] = ['luxury', 'hospitality', 'finance', 'culture', 'studio'];

export interface Project {
  slug: string;
  name: string;
  url: string;
  year: string;
  cat: Category;
  stack: string[];
  featured?: boolean;
  /** key into dict.work.metrics, only for concrete, published results */
  metric?: string;
}

export const WORK: Project[] = [
  { slug: 'romilys', name: 'The Romilys', url: 'https://theromilys.com/', year: '2026', cat: 'culture', stack: ['GSAP', 'Lenis', 'WebGL', 'Apps Script'], featured: true },
  { slug: 'tacko', name: 'Tacko Ndiaye', url: 'https://web-production-5c019.up.railway.app/', year: '2026', cat: 'culture', stack: ['Next.js', 'i18n', 'Railway'], featured: true },
  { slug: 'ivy', name: 'Ivy League Club Rome', url: 'https://ivyleagueclubrome.com/', year: '2026', cat: 'culture', stack: ['WordPress', 'Elementor', 'Membership'], featured: true },
  { slug: 'orangetree', name: 'Orange Tree Homes', url: 'https://orangetreehome.it/', year: '2025', cat: 'hospitality', stack: ['Elementor Pro', 'Booking', 'Film'], metric: 'orangetree' },
  { slug: 'gabizon', name: 'Marco Gabizon Atelier', url: 'https://marcogabizon.com/', year: '2025', cat: 'luxury', stack: ['WordPress', 'Elementor Pro', 'Film'], metric: 'gabizon' },
  { slug: 'mogador', name: 'La Villa Mogador', url: 'https://www.lavillamogadorcapferret.com/', year: '2025', cat: 'hospitality', stack: ['Wix Studio', 'Film'], metric: 'mogador' },
  { slug: 'atelierunica', name: 'Atelier Unica', url: 'https://atelier-unica.com/', year: '2025', cat: 'luxury', stack: ['Elementor Pro', 'Motion'], metric: 'atelierunica' },
  { slug: 'colouraddict', name: 'Colour Addict', url: 'https://colouraddictofficial.com/', year: '2025', cat: 'luxury', stack: ['WordPress', 'Booking', 'Film'], metric: 'colouraddict' },
  { slug: 'laltraroma', name: "L'Altra Roma", url: 'https://laltraroma.com/', year: '2025', cat: 'culture', stack: ['Elementor Pro', 'Membership', 'Film'], metric: 'laltraroma' },
  { slug: 'comodista', name: 'Comodista Capital', url: 'https://comodistacap.com/', year: '2025', cat: 'finance', stack: ['Elementor Pro', 'Corporate'], metric: 'comodista' },
  { slug: 'traderline', name: 'Traderline AG', url: 'https://traderlineag.ch/', year: '2025', cat: 'finance', stack: ['Elementor Pro', 'EN · FR'] },
  { slug: 'terraopes', name: 'Terra Opes', url: 'https://terra-opes.com/', year: '2025', cat: 'finance', stack: ['Elementor Pro', 'Corporate'] },
  { slug: 'pdh', name: 'PDH Group', url: 'https://www.pdh-group.com/', year: '2025', cat: 'finance', stack: ['Wix Studio', 'Corporate'] },
  { slug: 'depetris', name: 'Studio De Petris', url: 'https://studioassociatodepetris.com/', year: '2025', cat: 'studio', stack: ['Elementor Pro', 'Film'], metric: 'depetris' },
  { slug: 'stylenotes', name: 'Style Notes From Italy', url: 'https://stylenotesfromitaly.com/', year: '2025', cat: 'luxury', stack: ['WordPress', 'Editorial'], metric: 'stylenotes' },
  { slug: 'odette', name: 'Odette Lafrance', url: 'https://odettelafrance.net/', year: '2025', cat: 'culture', stack: ['Wix Studio', 'Animations'] },
  { slug: 'ups', name: 'Universe Pixel Studio', url: 'https://www.universepixelstudio.com/', year: '2025', cat: 'studio', stack: ['Wix Studio', '3D', 'Motion'] },
  { slug: 'mixim', name: 'Mixim Creative Studio', url: 'https://miximcreativestudio.com/', year: '2025', cat: 'studio', stack: ['WordPress', 'Motion', 'SEO'] },
];

export type FilmKind = 'cgi' | 'motion' | 'brand' | 'edit' | 'ai';
export interface Film {
  slug: string;
  client: string;
  kind: FilmKind;
  year: string;
  /** aspect hint for the grid */
  wide?: boolean;
  /** 9:16 social piece, shown in the vertical row */
  vertical?: boolean;
  source?: string;
}

export const FILMS: Film[] = [
  { slug: 'ai-imperium', client: 'Gen-AI short film', kind: 'ai', year: '2025', wide: true },
  { slug: 'nude-teddy', client: 'Nude Project', kind: 'cgi', year: '2025', wide: true, source: 'https://www.universepixelstudio.com/home-1-1' },
  { slug: 'scalpers', client: 'Scalpers', kind: 'cgi', year: '2025', source: 'https://www.universepixelstudio.com/home-1-1-1' },
  { slug: 'gabizon', client: 'Marco Gabizon', kind: 'brand', year: '2025' },
  { slug: 'colouraddict', client: 'Colour Addict', kind: 'brand', year: '2025' },
  { slug: 'mixim-intro', client: 'Mixim Creative Studio', kind: 'motion', year: '2026' },
  { slug: 'mogador', client: 'La Villa Mogador', kind: 'brand', year: '2025', wide: true },
  { slug: 'laltraroma', client: "L'Altra Roma", kind: 'edit', year: '2025' },
  { slug: 'orangetree', client: 'Orange Tree Homes', kind: 'edit', year: '2025' },
  { slug: 'unica', client: 'Atelier Unica', kind: 'motion', year: '2026' },
  { slug: 'depetris', client: 'Studio De Petris', kind: 'brand', year: '2026', wide: true },
  { slug: 'ai-guardian', client: 'Instagram', kind: 'ai', year: '2026', vertical: true },
  { slug: 'ai-porsche', client: 'Porsche · spec ad', kind: 'ai', year: '2026', vertical: true },
  { slug: 'cgi-graceland', client: 'Graceland London', kind: 'cgi', year: '2024', vertical: true },
  { slug: 'ai-alterego', client: 'Instagram', kind: 'ai', year: '2026', vertical: true },
  { slug: 'mg-combien', client: 'Motion graphics edit', kind: 'motion', year: '2026', vertical: true },
  { slug: 'ai-giant', client: 'Instagram', kind: 'ai', year: '2026', vertical: true },
  { slug: 'cgi-whatif', client: 'Instagram ad', kind: 'cgi', year: '2024', vertical: true },
  { slug: 'ai-mesh', client: 'Instagram', kind: 'ai', year: '2026', vertical: true },
];

export const AI_TOOLS = ['Nano Banana Pro', 'GPT-4', 'Seedance 2.0', 'Grok Imagine', 'Kling 3.0', 'Higgsfield DOP', 'Claude'];

/** Career timeline used in the hero grid. Years are inclusive. */
export const TIMELINE = [
  { key: 'cv', from: 2026 + 7 / 12, to: 2027, color: '#2F6BFF' },
  { key: 'eko', from: 2026 + 1 / 12, to: 2026 + 7 / 12, color: '#10B981' },
  { key: 'mixim', from: 2022 + 8 / 12, to: 2026 + 10 / 12, color: '#111827' },
  { key: 'fastech', from: 2024 + 8 / 12, to: 2026 + 2 / 12, color: '#8B5CF6' },
  { key: 'ups', from: 2024 + 6 / 12, to: 2025 + 4 / 12, color: '#F97316' },
  { key: 'jam', from: 2025 + 3 / 12, to: 2025 + 9 / 12, color: '#EC4899' },
];
export const YEARS = [2022, 2023, 2024, 2025, 2026];
