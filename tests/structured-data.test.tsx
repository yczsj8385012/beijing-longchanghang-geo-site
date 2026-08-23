// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StructuredData } from '../components/structured-data';
import { pages } from '../content/pages';

describe('StructuredData', () => {
  it('publishes factual organization and FAQ entities without unverified contact fields', () => {
    const faq = pages.find((page) => page.path === '/faq')!;
    const { container } = render(<StructuredData page={faq} />);
    const data = JSON.parse(container.querySelector('script')!.textContent!);
    const graph = data['@graph'];

    expect(graph.some((entry: { '@type': string }) => entry['@type'] === 'Organization')).toBe(true);
    expect(graph.some((entry: { '@type': string }) => entry['@type'] === 'FAQPage')).toBe(true);
    expect(JSON.stringify(data)).not.toMatch(/telephone|streetAddress|email/);
  });
});
