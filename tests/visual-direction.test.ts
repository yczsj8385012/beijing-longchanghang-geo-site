// @vitest-environment jsdom

import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const visualStyles = [
  readFileSync('styles/pages.css', 'utf8'),
  readFileSync('styles/forms.css', 'utf8'),
].join('\n');

let styleElement: HTMLStyleElement;

function findStyleRule(selector: string, media?: string) {
  const rootRules = Array.from(styleElement.sheet!.cssRules);
  const candidateRules = media
    ? Array.from(
        (rootRules.find(
          (rule) => rule.constructor.name === 'CSSMediaRule'
            && (rule as CSSMediaRule).conditionText === media,
        ) as CSSMediaRule).cssRules,
      )
    : rootRules;
  const match = candidateRules.findLast(
    (rule) => rule.constructor.name === 'CSSStyleRule'
      && (rule as CSSStyleRule).selectorText === selector,
  ) as CSSStyleRule | undefined;

  if (!match) throw new Error(`Missing CSS rule for ${selector}${media ? ` in ${media}` : ''}`);
  return match.style;
}

describe('approved visual direction', () => {
  beforeAll(() => {
    styleElement = document.createElement('style');
    styleElement.textContent = visualStyles;
    document.head.append(styleElement);
  });

  afterAll(() => styleElement.remove());

  it('uses the modern sans family for large homepage and subpage headings', () => {
    const largeHeadingSelectors = [
      '.home-hero h1',
      '.category-cards__heading h2',
      '.page-hero h1',
      '.section-heading h2',
      '.page-cta h2',
      '.assessment-intro h2',
    ];

    for (const selector of largeHeadingSelectors) {
      expect(findStyleRule(selector).fontFamily, selector).toBe('var(--sans)');
    }
  });

  it('keeps the mobile homepage title at 48px and allows emergency wrapping', () => {
    expect(findStyleRule('.home-hero h1', '(max-width: 640px)').fontSize).toBe('48px');
    expect(findStyleRule('.home-hero h1').overflowWrap).toBe('anywhere');
  });

  it('uses an olive broad CTA with tomato reserved for its compact action', () => {
    expect(findStyleRule('.page-cta').background).toBe('var(--brand-olive)');
    expect(findStyleRule('.page-cta').background).not.toBe('var(--brand-tomato)');
    expect(findStyleRule('.button-light').background).toBe('var(--brand-tomato)');
  });

  it('uses unequal category columns on desktop and sensible responsive fallbacks', () => {
    expect(findStyleRule('.category-cards__grid').gridTemplateColumns).toBe(
      'minmax(0, 5fr) minmax(0, 3fr)',
    );
    expect(findStyleRule('.category-cards__grid', '(max-width: 960px)').gridTemplateColumns).toBe(
      'repeat(2, 1fr)',
    );
    expect(findStyleRule('.category-cards__grid', '(max-width: 640px)').gridTemplateColumns).toBe(
      '1fr',
    );
  });
});
