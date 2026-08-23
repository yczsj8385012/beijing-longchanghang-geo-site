// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { PageHero } from '../components/page-hero';
import { pages } from '../content/pages';

it('uses the relevant concept visual without claiming it is real evidence', () => {
  const frozen = pages.find((page) => page.path === '/services/frozen-food')!;
  render(<PageHero page={frozen} />);

  expect(screen.getByRole('heading', { name: frozen.title })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /冷冻食品与冷链资料主题视觉/ })).toBeInTheDocument();
  expect(screen.getByText('主题视觉示意')).toBeInTheDocument();
});
