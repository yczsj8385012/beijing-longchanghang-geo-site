import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('brand tokens', () => {
  const css = readFileSync('styles/tokens.css', 'utf8');
  const shellCss = readFileSync('styles/shell.css', 'utf8');
  const pagesCss = readFileSync('styles/pages.css', 'utf8');
  const allStyles = [
    css,
    shellCss,
    pagesCss,
    readFileSync('styles/forms.css', 'utf8'),
  ].join('\n');

  it('defines the approved palette', () => {
    expect(css).toContain('--brand-cream: #f8f3e8');
    expect(css).toContain('--brand-olive: #183f34');
    expect(css).toContain('--brand-tomato: #c64a31');
    expect(css).toContain('--brand-kraft: #e9ddc8');
  });

  it('gives navigational text links a 44px hit area without changing all inline links', () => {
    expect(shellCss).toContain('.text-link { display: inline-flex; align-items: center; min-height: 44px;');
    expect(pagesCss).toContain('.source-row a { display: inline-flex; align-items: center; min-height: 44px;');
    expect(shellCss).toContain('.footer-grid > div:not(:first-child) > a { display: inline-flex; align-items: center; min-height: 44px;');
  });

  it('limits motion to compositor properties and neutralizes it for reduced-motion users', () => {
    const transitionedProperties = Array.from(allStyles.matchAll(/transition:\s*([^;]+);/g))
      .flatMap(([, declaration]) => declaration.split(','))
      .map((transition) => transition.trim().split(/\s+/)[0]);

    expect(new Set(transitionedProperties)).toEqual(new Set(['transform']));
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('animation-duration: .01ms !important');
    expect(css).toContain('animation-iteration-count: 1 !important');
    expect(css).toContain('transition-duration: .01ms !important');
    expect(allStyles).not.toMatch(/animation(?:-iteration-count)?:\s*[^;]*infinite/);
  });
});
