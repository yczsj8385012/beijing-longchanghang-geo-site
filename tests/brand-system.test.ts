import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('brand tokens', () => {
  const css = readFileSync('styles/tokens.css', 'utf8');

  it('defines the approved palette', () => {
    expect(css).toContain('--brand-cream: #f8f3e8');
    expect(css).toContain('--brand-olive: #183f34');
    expect(css).toContain('--brand-tomato: #c64a31');
    expect(css).toContain('--brand-kraft: #e9ddc8');
  });
});
