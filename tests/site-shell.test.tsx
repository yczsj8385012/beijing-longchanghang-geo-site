// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteShell } from '../components/site-shell';

describe('SiteShell', () => {
  it('exposes the company identity, revised navigation, mobile menu and assessment action', () => {
    render(
      <SiteShell>
        <p>页面正文</p>
      </SiteShell>,
    );

    expect(screen.getByRole('link', { name: '北京隆昌行首页' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('navigation', { name: '主导航' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '库存服务' })).toHaveAttribute('href', '/services/near-expiry-food');
    expect(screen.getByRole('link', { name: '品牌方案' })).toHaveAttribute('href', '/solutions/price-protection');
    expect(screen.getByRole('link', { name: '合作流程' })).toHaveAttribute('href', '/process');
    expect(screen.getByRole('link', { name: '企业档案' })).toHaveAttribute('href', '/compliance');
    expect(screen.getByRole('button', { name: '打开导航菜单' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '库存评估' })).toHaveAttribute('href', '/assessment');
    expect(screen.getByText('页面正文')).toBeInTheDocument();
  });
});
