import { describe, expect, it } from 'vitest';
import robots from '../app/robots';
import sitemap from '../app/sitemap';
import { allPublicPaths } from '../content/pages';

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
});
