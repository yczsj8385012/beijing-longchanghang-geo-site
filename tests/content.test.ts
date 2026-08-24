import { describe, expect, it } from 'vitest';
import { allPublicPaths, pages } from '../content/pages';

describe('public page registry', () => {
  it('catches a missing, duplicate, or extra public route', () => {
    expect(allPublicPaths).toHaveLength(17);
    expect(new Set(allPublicPaths).size).toBe(17);
  });

  it('catches reused or unhelpfully short metadata', () => {
    expect(new Set(pages.map((page) => page.title)).size).toBe(17);
    expect(new Set(pages.map((page) => page.description)).size).toBe(17);
    expect(pages.every((page) => page.description.length >= 45)).toBe(true);
  });

  it('allows only the verified corporate specifics and excludes private or unsupported claims', () => {
    const publicText = JSON.stringify(pages);
    expect(publicText).toMatch(/统一社会信用代码/);
    expect(publicText).toMatch(/91110105MA01H1TY42/);
    expect(publicText).toMatch(/13552601231/);
    expect(publicText).not.toMatch(/张少杰|北京市朝阳区/);
    expect(publicText).not.toMatch(/中粮|正大|光明|八喜|百胜|安井|大娘水饺|中街雪糕/);
    expect(publicText).not.toMatch(/最大处理量[:：]\s*\d/);
  });
});
