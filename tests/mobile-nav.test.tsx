// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MobileNav } from '../components/mobile-nav';

describe('MobileNav', () => {
  it('opens and closes an accessible mobile menu', () => {
    render(<MobileNav items={[{ href: '/process', label: '合作流程' }]} />);

    const button = screen.getByRole('button', { name: '打开导航菜单' });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(screen.getByRole('dialog', { name: '移动导航' })).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(document.body).toHaveClass('nav-open');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: '移动导航' })).not.toBeInTheDocument();
    expect(document.body).not.toHaveClass('nav-open');
  });
});
