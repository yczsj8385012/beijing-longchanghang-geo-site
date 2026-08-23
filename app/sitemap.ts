import type { MetadataRoute } from 'next';
import { pages } from '../content/pages';
import { getSiteUrl } from '../lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  return pages.map((page) => ({
    url: `${origin}${page.path === '/' ? '' : page.path}`,
    lastModified: new Date('2026-08-23T00:00:00+08:00'),
    changeFrequency: page.path === '/' ? 'weekly' : 'monthly',
    priority: page.path === '/' ? 1 : page.path === '/assessment' ? 0.9 : 0.7,
  }));
}
