import { Language } from 'common/interfaces/enum';
import slugify from 'slugify';

export function toSlug(text: string, locale?: string): string {
  if (!text) return '';
  text = text.replace('$', '').replace('%', '');
  locale = locale ? locale : Language.EN;
  return slugify(text, {
    replacement: '-',
    lower: true,
    strict: true,
    locale: locale,
    trim: true,
  });
}

export function toKeyword(text: string): string {
  if (!text) return '';
  return text.replace(/-/g, ' ');
}

export function transformTextSearch(text: string): string {
  if (!text) return '';
  text = text.replace('$', '').replace('%', '');
  text = slugify(text, {
    replacement: '-',
    lower: true,
    strict: true,
    trim: true,
  });
  return text.replace(/-/g, ' ');
}

export function getNextCrawlTime(rangeTime = 900) {
  const addTime = rangeTime;
  const now = new Date();
  return new Date(now.getTime() + addTime);
}
