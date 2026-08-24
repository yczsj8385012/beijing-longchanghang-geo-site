// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageSections } from '../components/page-sections';
import { pages } from '../content/pages';

describe('EntityVerification', () => {
  it('shows client-provided business-license facts on the compliance page', () => {
    const compliance = pages.find((page) => page.path === '/compliance')!;
    render(<PageSections page={compliance} />);

    expect(screen.getByText('企业主体已核验')).toBeInTheDocument();
    expect(screen.getByText('91110105MA01H1TY42')).toBeInTheDocument();
    expect(screen.getByText('2019 年 3 月 18 日')).toBeInTheDocument();
    expect(screen.getByText('100 万元')).toBeInTheDocument();
  });
});
