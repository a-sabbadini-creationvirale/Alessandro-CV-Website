import en, { type Dict } from './en';
import it from './it';
import fr from './fr';
import es from './es';
import type { Lang } from '../data/site';

export const dicts: Record<Lang, Dict> = { en, it, fr, es };
export const t = (lang: Lang): Dict => dicts[lang];
export type { Dict };
