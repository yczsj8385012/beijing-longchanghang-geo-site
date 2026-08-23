import { describe, expect, it } from 'vitest';
import manifest from '../app/manifest';
import robots from '../app/robots';
import sitemap from '../app/sitemap';
import { allPublicPaths } from '../content/pages';
import { getSiteUrl } from '../lib/site-url';

describe('GEO technical surfaces', () => {
  it('includes every official page in the sitemap', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(17);
    expect(entries.map((entry) => new URL(entry.url).pathname)).toEqual(allPublicPaths);
  });

  it('allows public crawling and points to the sitemap', () => {
    const config = robots();
    expect(config.rules).toEqual([{ userAgent: '*', allow: '/' }]);
    expect(config.sitemap).toMatch(/\/sitemap\.xml$/);
  });

  it('uses coglioo.com as the default canonical host', () => {
    expect(getSiteUrl()).toBe('https://coglioo.com');
  });

  it('keeps the installable app chrome aligned with the current page background', () => {
    const config = manifest();

    expect(config.background_color).toBe('#f8f3e8');
    expect(config.theme_color).toBe('#f8f3e8');
  });
});
