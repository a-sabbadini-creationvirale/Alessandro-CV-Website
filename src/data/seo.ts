// SEO landing pages: one web-design service page per language + city pages.
// Websites are the core offer; video, AI and CGI are add-ons.
import type { Lang } from './site';

export const PRICE_FROM = 785;

export interface Faq { q: string; a: string }

export interface PageCopy {
  title: string; // <title>
  description: string; // meta description
  label: string;
  h1: string; // may contain <em>
  intro: string;
  local?: string; // city pages: why this city
}

export interface SeoPage {
  key: string; // shared across languages, used for hreflang alternates
  lang: Lang;
  path: string; // no leading/trailing slash
  kind: 'service' | 'city';
  city?: string; // schema areaServed
  work: string[]; // project slugs from WORK
  copy: PageCopy;
}

/* ---------- shared UI copy per language ---------- */
export const UI: Record<Lang, {
  from: string; fixed: string; quote: string; portfolio: string; included: string; included_items: string[];
  addonsTitle: string; addonsLead: string; addons: { t: string; d: string }[];
  processTitle: string; process: { t: string; d: string }[];
  workTitle: string; faqTitle: string; citiesTitle: string; visit: string;
  waMsg: (page: string) => string; ctaTitle: string; ctaLead: string; home: string; faq: Faq[];
}> = {
  en: {
    from: 'From €785', fixed: 'Fixed price and timeline, agreed before we start.', quote: 'Get a quote on WhatsApp', portfolio: 'See the portfolio',
    included: 'Included in every website',
    included_items: [
      'Custom design, never a template that looks like everyone else',
      'Mobile-first, fast loading and built to convert',
      'SEO foundations: structure, metadata, sitemap and Google Search Console',
      'Up to 4 languages: English, Italian, French and Spanish',
      'Forms, booking, galleries, membership or RSVP when you need them',
      'Domain, hosting setup and a handover so you own everything',
    ],
    addonsTitle: 'Make it unforgettable', addonsLead: 'Optional add-ons that turn a good website into a premium one.',
    addons: [
      { t: 'Brand video', d: 'A hero film or reel for your homepage: filming, editing, colour, motion graphics and sound.' },
      { t: 'AI visuals & video', d: 'On-brand AI imagery and video for products, campaigns and social, without a full shoot.' },
      { t: 'CGI & 3D', d: '3D product animations, liquid-gold loops and visual effects that make the first screen stop people.' },
    ],
    processTitle: 'How it works',
    process: [
      { t: 'Call', d: 'A short call about your business, your clients and what the site must achieve.' },
      { t: 'Fixed quote', d: 'A clear scope, price and timeline in writing. No surprises later.' },
      { t: 'Design & build', d: 'You see and review the design first, then the site is built and tested on every device.' },
      { t: 'Launch', d: 'Go live, connect Google, hand over access. Support after launch if you need it.' },
    ],
    workTitle: 'Selected websites', faqTitle: 'Questions', citiesTitle: 'See also', visit: 'Visit site',
    waMsg: (p) => `Hi Alessandro! I found you through your ${p} page and I'd like a quote for a website.`,
    ctaTitle: 'Tell me about your website.', ctaLead: 'Reply within a day, in English, Italian, French or Spanish.', home: 'Portfolio',
    faq: [
      { q: 'How much does a website cost?', a: 'Websites start from €785 for a focused one-page or small site. Larger multilingual sites with booking or membership get a fixed quote before we start.' },
      { q: 'How long does it take?', a: 'It depends on the size of the site. You get a clear timeline with the quote, and you see the design before anything is built.' },
      { q: 'Can you redesign my existing website?', a: 'Yes: full redesigns, speed and SEO fixes, new sections, or a move to a new platform.' },
      { q: 'Will people find me on Google?', a: 'Every site ships with SEO foundations: fast pages, clean structure, metadata, a sitemap and Google Search Console set up.' },
      { q: 'Which languages do you work in?', a: 'English, Italian, French and Spanish, all fluent. Your site can be in any of them, or all four.' },
    ],
  },
  it: {
    from: 'Da 785 €', fixed: 'Prezzo e tempi fissi, concordati prima di iniziare.', quote: 'Chiedete un preventivo su WhatsApp', portfolio: 'Guardate il portfolio',
    included: 'Incluso in ogni sito',
    included_items: [
      'Design su misura, mai un template uguale a tutti gli altri',
      'Mobile-first, veloce e pensato per convertire',
      'Basi SEO: struttura, metadati, sitemap e Google Search Console',
      'Fino a 4 lingue: italiano, inglese, francese e spagnolo',
      'Moduli, prenotazioni, gallerie, area soci o RSVP quando servono',
      'Dominio, hosting e consegna finale: tutto resta vostro',
    ],
    addonsTitle: 'Rendetelo indimenticabile', addonsLead: 'Extra opzionali che trasformano un buon sito in un sito premium.',
    addons: [
      { t: 'Video di marca', d: 'Un film o un reel per la homepage: riprese, montaggio, colore, motion graphics e sound design.' },
      { t: 'Immagini e video AI', d: 'Immagini e video AI coerenti con il brand per prodotti, campagne e social, senza un set completo.' },
      { t: 'CGI e 3D', d: 'Animazioni 3D di prodotto, loop in oro liquido ed effetti visivi che fermano lo sguardo al primo schermo.' },
    ],
    processTitle: 'Come funziona',
    process: [
      { t: 'Chiamata', d: 'Una breve chiamata sulla vostra attività, i vostri clienti e cosa deve ottenere il sito.' },
      { t: 'Preventivo fisso', d: 'Obiettivi, prezzo e tempi chiari, per iscritto. Nessuna sorpresa.' },
      { t: 'Design e sviluppo', d: 'Vedete e approvate prima il design, poi il sito viene sviluppato e testato su ogni dispositivo.' },
      { t: 'Lancio', d: 'Messa online, collegamento a Google e consegna degli accessi. Supporto anche dopo, se serve.' },
    ],
    workTitle: 'Siti selezionati', faqTitle: 'Domande frequenti', citiesTitle: 'Vedi anche', visit: 'Visita il sito',
    waMsg: (p) => `Ciao Alessandro! Ti ho trovato tramite la pagina ${p} e vorrei un preventivo per un sito web.`,
    ctaTitle: 'Raccontatemi il vostro sito.', ctaLead: 'Risposta entro un giorno, in italiano, inglese, francese o spagnolo.', home: 'Portfolio',
    faq: [
      { q: 'Quanto costa un sito web?', a: 'I siti partono da 785 € per un sito one-page o di poche pagine. Siti multilingue più grandi, con prenotazioni o area soci, hanno un preventivo fisso prima di iniziare.' },
      { q: 'Quanto tempo serve?', a: 'Dipende dalle dimensioni del sito. Ricevete tempi chiari insieme al preventivo e vedete il design prima che venga sviluppato.' },
      { q: 'Potete rifare il mio sito attuale?', a: 'Sì: restyling completi, interventi su velocità e SEO, nuove sezioni o il passaggio a una nuova piattaforma.' },
      { q: 'Mi troveranno su Google?', a: 'Ogni sito include le basi SEO: pagine veloci, struttura pulita, metadati, sitemap e Google Search Console configurata.' },
      { q: 'In che lingue lavorate?', a: 'Italiano, inglese, francese e spagnolo, tutte fluenti. Il sito può essere in una di queste lingue o in tutte e quattro.' },
    ],
  },
  fr: {
    from: 'À partir de 785 €', fixed: 'Prix et délais fixes, convenus avant de commencer.', quote: 'Demander un devis sur WhatsApp', portfolio: 'Voir le portfolio',
    included: 'Inclus dans chaque site',
    included_items: [
      'Design sur mesure, jamais un template qui ressemble à tous les autres',
      'Pensé mobile, rapide et conçu pour convertir',
      'Bases SEO : structure, métadonnées, sitemap et Google Search Console',
      'Jusqu’à 4 langues : français, anglais, italien et espagnol',
      'Formulaires, réservation, galeries, espace membres ou RSVP si besoin',
      'Domaine, hébergement et passation : tout vous appartient',
    ],
    addonsTitle: 'Rendez-le inoubliable', addonsLead: 'Des options qui transforment un bon site en site premium.',
    addons: [
      { t: 'Vidéo de marque', d: 'Un film ou un reel pour votre page d’accueil : tournage, montage, étalonnage, motion graphics et son.' },
      { t: 'Visuels et vidéo IA', d: 'Images et vidéos IA fidèles à votre marque pour produits, campagnes et réseaux, sans tournage complet.' },
      { t: 'CGI et 3D', d: 'Animations produit en 3D, boucles d’or liquide et effets visuels qui captent le regard dès le premier écran.' },
    ],
    processTitle: 'Comment ça marche',
    process: [
      { t: 'Appel', d: 'Un court appel sur votre activité, vos clients et ce que le site doit accomplir.' },
      { t: 'Devis fixe', d: 'Périmètre, prix et délais clairs, par écrit. Aucune surprise.' },
      { t: 'Design et développement', d: 'Vous validez d’abord le design, puis le site est développé et testé sur tous les écrans.' },
      { t: 'Mise en ligne', d: 'Lancement, connexion à Google et remise des accès. Support ensuite si besoin.' },
    ],
    workTitle: 'Sites sélectionnés', faqTitle: 'Questions fréquentes', citiesTitle: 'Voir aussi', visit: 'Voir le site',
    waMsg: (p) => `Bonjour Alessandro ! Je vous ai trouvé via la page ${p} et j’aimerais un devis pour un site web.`,
    ctaTitle: 'Parlez-moi de votre site.', ctaLead: 'Réponse sous un jour, en français, anglais, italien ou espagnol.', home: 'Portfolio',
    faq: [
      { q: 'Combien coûte un site web ?', a: 'Les sites commencent à 785 € pour un one-page ou un petit site. Les sites multilingues plus grands, avec réservation ou espace membres, ont un devis fixe avant de commencer.' },
      { q: 'Combien de temps faut-il ?', a: 'Cela dépend de la taille du site. Vous recevez un délai clair avec le devis et vous voyez le design avant le développement.' },
      { q: 'Pouvez-vous refaire mon site actuel ?', a: 'Oui : refonte complète, optimisation de la vitesse et du SEO, nouvelles sections ou migration vers une autre plateforme.' },
      { q: 'Me trouvera-t-on sur Google ?', a: 'Chaque site inclut les bases SEO : pages rapides, structure propre, métadonnées, sitemap et Google Search Console configurée.' },
      { q: 'Dans quelles langues travaillez-vous ?', a: 'Français, anglais, italien et espagnol, couramment. Votre site peut être dans l’une de ces langues ou dans les quatre.' },
    ],
  },
  es: {
    from: 'Desde 785 €', fixed: 'Precio y plazos cerrados, acordados antes de empezar.', quote: 'Pedir presupuesto por WhatsApp', portfolio: 'Ver el portfolio',
    included: 'Incluido en cada web',
    included_items: [
      'Diseño a medida, nunca una plantilla igual a todas',
      'Pensada para móvil, rápida y orientada a convertir',
      'Bases SEO: estructura, metadatos, sitemap y Google Search Console',
      'Hasta 4 idiomas: español, inglés, italiano y francés',
      'Formularios, reservas, galerías, área de socios o RSVP si los necesita',
      'Dominio, hosting y entrega final: todo queda a su nombre',
    ],
    addonsTitle: 'Hágala inolvidable', addonsLead: 'Extras opcionales que convierten una buena web en una web premium.',
    addons: [
      { t: 'Vídeo de marca', d: 'Un film o reel para la home: rodaje, edición, color, motion graphics y sonido.' },
      { t: 'Imágenes y vídeo con IA', d: 'Imágenes y vídeos con IA fieles a su marca para productos, campañas y redes, sin un rodaje completo.' },
      { t: 'CGI y 3D', d: 'Animaciones 3D de producto, loops de oro líquido y efectos visuales que detienen la mirada en la primera pantalla.' },
    ],
    processTitle: 'Cómo funciona',
    process: [
      { t: 'Llamada', d: 'Una llamada breve sobre su negocio, sus clientes y lo que debe lograr la web.' },
      { t: 'Presupuesto cerrado', d: 'Alcance, precio y plazos claros, por escrito. Sin sorpresas.' },
      { t: 'Diseño y desarrollo', d: 'Primero ve y aprueba el diseño; después la web se desarrolla y se prueba en todos los dispositivos.' },
      { t: 'Lanzamiento', d: 'Publicación, conexión con Google y entrega de accesos. Soporte posterior si lo necesita.' },
    ],
    workTitle: 'Webs seleccionadas', faqTitle: 'Preguntas frecuentes', citiesTitle: 'Ver también', visit: 'Ver la web',
    waMsg: (p) => `¡Hola Alessandro! Te encontré en la página ${p} y me gustaría un presupuesto para una web.`,
    ctaTitle: 'Cuénteme su web.', ctaLead: 'Respuesta en un día, en español, inglés, italiano o francés.', home: 'Portfolio',
    faq: [
      { q: '¿Cuánto cuesta una página web?', a: 'Las webs empiezan desde 785 € para una one-page o una web pequeña. Las webs multilingües más grandes, con reservas o área de socios, tienen un presupuesto cerrado antes de empezar.' },
      { q: '¿Cuánto tiempo lleva?', a: 'Depende del tamaño de la web. Recibe plazos claros con el presupuesto y ve el diseño antes de desarrollarlo.' },
      { q: '¿Puede rediseñar mi web actual?', a: 'Sí: rediseños completos, mejoras de velocidad y SEO, nuevas secciones o migración a otra plataforma.' },
      { q: '¿Me encontrarán en Google?', a: 'Cada web incluye las bases SEO: páginas rápidas, estructura limpia, metadatos, sitemap y Google Search Console configurado.' },
      { q: '¿En qué idiomas trabaja?', a: 'Español, inglés, italiano y francés, con fluidez. Su web puede estar en cualquiera de ellos o en los cuatro.' },
    ],
  },
};

const ROME_WORK = ['gabizon', 'orangetree', 'laltraroma', 'depetris', 'ivy', 'colouraddict'];
const BCN_WORK = ['ups', 'tacko', 'mixim', 'romilys'];
const PARIS_WORK = ['mogador', 'traderline', 'terraopes', 'atelierunica'];
const SERVICE_WORK = ['romilys', 'orangetree', 'gabizon', 'mogador', 'tacko', 'comodista'];

export const SEO_PAGES: SeoPage[] = [
  /* ---- service page ---- */
  { key: 'web', lang: 'en', path: 'web-design', kind: 'service', work: SERVICE_WORK, copy: {
    title: 'Website Design from €785 · Premium, Fast, Multilingual | Alessandro Sabbadini',
    description: 'Premium website design and development from €785. Custom, fast, SEO-ready sites in English, Italian, French and Spanish, with optional brand video, AI and CGI.',
    label: 'Website design & development', h1: 'Premium websites, <em>fast</em>, from €785.',
    intro: 'Custom websites for brands that want to look high-end without an agency budget. Designed and built by me, in up to four languages, fast and ready for Google from day one.' } },
  { key: 'web', lang: 'it', path: 'it/siti-web', kind: 'service', work: SERVICE_WORK, copy: {
    title: 'Creazione Siti Web da 785 € · Premium, Veloci, Multilingue | Alessandro Sabbadini',
    description: 'Creazione di siti web premium da 785 €. Siti su misura, veloci e ottimizzati SEO in italiano, inglese, francese e spagnolo, con video, AI e CGI opzionali.',
    label: 'Creazione siti web', h1: 'Siti web premium, <em>veloci</em>, da 785 €.',
    intro: 'Siti su misura per brand che vogliono un’immagine di alto livello senza il budget di un’agenzia. Progettati e sviluppati da me, fino a quattro lingue, veloci e pronti per Google dal primo giorno.' } },
  { key: 'web', lang: 'fr', path: 'fr/creation-site-web', kind: 'service', work: SERVICE_WORK, copy: {
    title: 'Création de Site Web dès 785 € · Premium, Rapide, Multilingue | Alessandro Sabbadini',
    description: 'Création de sites web premium à partir de 785 €. Sites sur mesure, rapides et optimisés SEO en français, anglais, italien et espagnol, avec vidéo, IA et CGI en option.',
    label: 'Création de site web', h1: 'Des sites premium, <em>rapides</em>, dès 785 €.',
    intro: 'Des sites sur mesure pour les marques qui veulent une image haut de gamme sans budget d’agence. Conçus et développés par moi, jusqu’à quatre langues, rapides et prêts pour Google dès le premier jour.' } },
  { key: 'web', lang: 'es', path: 'es/diseno-web', kind: 'service', work: SERVICE_WORK, copy: {
    title: 'Diseño Web desde 785 € · Premium, Rápido, Multilingüe | Alessandro Sabbadini',
    description: 'Diseño y desarrollo de webs premium desde 785 €. Webs a medida, rápidas y optimizadas para SEO en español, inglés, italiano y francés, con vídeo, IA y CGI opcionales.',
    label: 'Diseño y desarrollo web', h1: 'Webs premium, <em>rápidas</em>, desde 785 €.',
    intro: 'Webs a medida para marcas que quieren una imagen de alto nivel sin presupuesto de agencia. Diseñadas y desarrolladas por mí, hasta en cuatro idiomas, rápidas y listas para Google desde el primer día.' } },

  /* ---- Rome ---- */
  { key: 'rome', lang: 'it', path: 'it/siti-web-roma', kind: 'city', city: 'Roma', work: ROME_WORK, copy: {
    title: 'Siti Web a Roma da 785 € · Web Designer Premium | Alessandro Sabbadini',
    description: 'Web designer a Roma: siti web premium, veloci e multilingue da 785 €. Atelier, case vacanza di lusso, studi professionali ed eventi culturali.',
    label: 'Siti web a Roma', h1: 'Siti web premium a <em>Roma</em>, da 785 €.',
    intro: 'Ho studiato e lavorato a Roma e qui ho realizzato gran parte dei miei progetti: atelier sartoriali, affitti di lusso, studi professionali, eventi culturali. Siti veloci con un’estetica premium, a prezzo fisso.',
    local: 'Conosco il mercato romano: clienti internazionali, turismo di alto livello, studi professionali che devono trasmettere fiducia. Per questo ogni sito nasce multilingue e pensato per chi cerca su Google da tutto il mondo.' } },
  { key: 'rome', lang: 'en', path: 'web-design-rome', kind: 'city', city: 'Rome', work: ROME_WORK, copy: {
    title: 'Web Design in Rome from €785 · Premium Websites | Alessandro Sabbadini',
    description: 'Web designer in Rome: premium, fast, multilingual websites from €785 for ateliers, luxury rentals, professional firms and cultural events.',
    label: 'Web design in Rome', h1: 'Premium websites in <em>Rome</em>, from €785.',
    intro: 'I studied and worked in Rome and delivered most of my projects here: tailoring ateliers, luxury rentals, professional firms and cultural events. Fast websites with a premium look, at a fixed price.',
    local: 'Rome businesses sell to the world: international guests, high-end tourism, firms that must inspire trust. Every site is built multilingual and ready for people searching on Google from anywhere.' } },

  /* ---- Barcelona ---- */
  { key: 'barcelona', lang: 'es', path: 'es/diseno-web-barcelona', kind: 'city', city: 'Barcelona', work: BCN_WORK, copy: {
    title: 'Diseño Web en Barcelona desde 785 € · Webs Premium | Alessandro Sabbadini',
    description: 'Diseñador web en Barcelona: webs premium, rápidas y multilingües desde 785 €, con vídeo, IA y CGI para que su marca destaque.',
    label: 'Diseño web en Barcelona', h1: 'Webs premium en <em>Barcelona</em>, desde 785 €.',
    intro: 'Me formé en Animación 3D y VFX en La Salle Barcelona, di clases de Unreal Engine y Houdini allí y trabajé en estudios de la ciudad. Webs rápidas y con acabado premium, a precio cerrado.',
    local: 'Barcelona compite en diseño. Por eso cada web combina un diseño cuidado con extras que pocos ofrecen: vídeo, IA y CGI hechos por la misma persona que construye la web.' } },
  { key: 'barcelona', lang: 'en', path: 'web-design-barcelona', kind: 'city', city: 'Barcelona', work: BCN_WORK, copy: {
    title: 'Web Design in Barcelona from €785 · Premium Websites | Alessandro Sabbadini',
    description: 'Web designer in Barcelona: premium, fast, multilingual websites from €785, with optional video, AI and CGI to make your brand stand out.',
    label: 'Web design in Barcelona', h1: 'Premium websites in <em>Barcelona</em>, from €785.',
    intro: 'I trained in 3D Animation and VFX at La Salle Barcelona, taught Unreal Engine and Houdini there and worked with studios across the city. Fast websites with a premium finish, at a fixed price.',
    local: 'Barcelona competes on design. Every site pairs careful design with extras few web designers offer: video, AI and CGI, made by the same person who builds the site.' } },

  /* ---- Paris ---- */
  { key: 'paris', lang: 'fr', path: 'fr/creation-site-web-paris', kind: 'city', city: 'Paris', work: PARIS_WORK, copy: {
    title: 'Création de Site Web à Paris dès 785 € · Sites Premium | Alessandro Sabbadini',
    description: 'Création de sites web premium pour Paris et la France dès 785 € : sites rapides, multilingues et optimisés SEO, en français.',
    label: 'Création de site web à Paris', h1: 'Des sites premium pour <em>Paris</em>, dès 785 €.',
    intro: 'Je travaille en français avec des marques en France et en Suisse, du Cap Ferret à Zurich, à distance ou sur place. Des sites rapides avec une finition premium, à prix fixe.',
    local: 'À Paris, l’image compte autant que le produit. Chaque site est pensé pour inspirer confiance dès le premier écran, avec en option vidéo, IA ou CGI pour se démarquer.' } },
  { key: 'paris', lang: 'en', path: 'web-design-paris', kind: 'city', city: 'Paris', work: PARIS_WORK, copy: {
    title: 'Web Design for Paris from €785 · Premium Websites | Alessandro Sabbadini',
    description: 'Premium website design for Paris and France from €785: fast, multilingual, SEO-ready sites, built in French and English.',
    label: 'Web design for Paris', h1: 'Premium websites for <em>Paris</em>, from €785.',
    intro: 'I work in French with brands in France and Switzerland, from Cap Ferret to Zurich, remotely or on site. Fast websites with a premium finish, at a fixed price.',
    local: 'In Paris, image matters as much as the product. Every site is designed to earn trust from the first screen, with optional video, AI or CGI to stand out.' } },
];

export const pageUrl = (p: { path: string }) => `/${p.path}/`;
export const alternatesFor = (key: string) =>
  Object.fromEntries(SEO_PAGES.filter((p) => p.key === key).map((p) => [p.lang, pageUrl(p)])) as Partial<Record<Lang, string>>;
