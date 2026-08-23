// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageSections } from '../components/page-sections';
import { pages } from '../content/pages';

describe('PageSections', () => {
  it('renders homepage links and the verification notice as readable content', () => {
    render(<PageSections page={pages[0]} />);

    expect(screen.getByRole('heading', { name: '按库存类型进入' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /临期食品/ })).toHaveAttribute(
      'href',
      '/services/near-expiry-food',
    );
    expect(screen.getByText('信息核验中，请以官方书面确认为准')).toBeInTheDocument();
  });
});
