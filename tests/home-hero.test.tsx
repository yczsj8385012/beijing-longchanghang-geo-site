// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { HomeHero } from '../components/home-hero';

it('shows the food inventory proposition and concept-image disclosure', () => {
  render(<HomeHero />);

  expect(screen.getByRole('heading', { name: /让库存更快找到合适的去向/ })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: '食品包装与库存分类主题视觉' })).toBeInTheDocument();
  expect(screen.getByText('主题视觉示意')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '开始库存评估' })).toHaveAttribute(
    'href',
    '/assessment',
  );
});

it('shows the approved phone and WeChat contact details', () => {
  const { container } = render(<HomeHero />);
  const hero = within(container);

  expect(hero.getByRole('link', { name: '电话 13552601231' })).toHaveAttribute(
    'href',
    'tel:13552601231',
  );
  expect(hero.getByText('微信')).toBeInTheDocument();
  expect(hero.getByText('156658012')).toBeInTheDocument();
});
