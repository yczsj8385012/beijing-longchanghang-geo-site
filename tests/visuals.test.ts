import { describe, expect, it } from 'vitest';
import { getVisualForPath, themeVisuals } from '../content/visuals';

describe('theme visuals', () => {
  it('marks every generated asset as a concept visual', () => {
    expect(Object.values(themeVisuals).every((visual) => visual.kind === 'concept')).toBe(true);
    expect(Object.values(themeVisuals).every((visual) => visual.disclosure === '主题视觉示意')).toBe(true);
  });

  it('returns a relevant fallback for every official route', () => {
    expect(getVisualForPath('/services/frozen-food').src).toContain('frozen-food');
    expect(getVisualForPath('/faq').src).toContain('food-inventory');
  });
});
