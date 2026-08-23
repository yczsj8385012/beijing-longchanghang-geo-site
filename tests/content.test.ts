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

  it('catches publication of unverified corporate specifics', () => {
    const publicText = JSON.stringify(pages);
    expect(publicText).not.toMatch(/统一社会信用代码[:：]\s*[0-9A-Z]{18}/);
    expect(publicText).not.toMatch(/1[3-9]\d{9}/);
    expect(publicText).not.toMatch(/最大处理量[:：]\s*\d/);
  });
});
