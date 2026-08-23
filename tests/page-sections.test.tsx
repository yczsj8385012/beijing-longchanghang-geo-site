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

  it('renders each service section once and keeps FAQ answers crawlable', () => {
    const frozen = pages.find((page) => page.path === '/services/frozen-food')!;
    const { container } = render(<PageSections page={frozen} />);

    expect(screen.getAllByRole('heading', { name: '首次沟通请准备' })).toHaveLength(1);
    expect(screen.getAllByRole('heading', { name: '承接边界' })).toHaveLength(1);
    expect(screen.getByText('单张截图不足以证明完整储存过程，还应结合标签要求、批次记录、交接和运输信息。')).toBeInTheDocument();
    expect(container.querySelector('.check-list')?.tagName).toBe('OL');
  });

  it('preserves the publisher and safe external link on source cards', () => {
    const faq = pages.find((page) => page.path === '/faq')!;
    render(<PageSections page={faq} />);

    expect(screen.getByText('国家市场监督管理总局')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /查看原始页面/ })).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: /查看原始页面/ })).toHaveAttribute('rel', 'noreferrer');
  });
});
