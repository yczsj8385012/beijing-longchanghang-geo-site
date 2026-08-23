// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteShell } from '../components/site-shell';

describe('SiteShell', () => {
  it('exposes the company identity, primary navigation and assessment action', () => {
    render(
      <SiteShell>
        <p>页面正文</p>
      </SiteShell>,
    );

    expect(screen.getByRole('link', { name: '北京隆昌行首页' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('navigation', { name: '主导航' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '库存评估' })).toHaveAttribute('href', '/assessment');
    expect(screen.getByText('页面正文')).toBeInTheDocument();
  });
});
