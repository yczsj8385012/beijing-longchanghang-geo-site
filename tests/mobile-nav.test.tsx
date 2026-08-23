// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { MobileNav } from '../components/mobile-nav';

const shellStyles = readFileSync(join(process.cwd(), 'styles', 'shell.css'), 'utf8');

describe('MobileNav', () => {
  afterEach(cleanup);

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
    expect(button).toHaveFocus();
  });

  it('keeps keyboard focus in the drawer and restores it after backdrop close', () => {
    const { container } = render(<MobileNav items={[{ href: '/process', label: '合作流程' }]} />);
    const trigger = screen.getByRole('button', { name: '打开导航菜单' });

    fireEvent.click(trigger);

    const closeButton = screen.getByRole('button', { name: '关闭移动导航' });
    const assessmentLink = screen.getByRole('link', { name: '库存评估' });
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(assessmentLink).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(closeButton).toHaveFocus();

    fireEvent.click(container.querySelector('.mobile-nav-backdrop') as HTMLButtonElement);
    expect(screen.queryByRole('dialog', { name: '移动导航' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('contains touch scrolling inside the open drawer', () => {
    const style = document.createElement('style');
    style.textContent = shellStyles;
    document.head.append(style);
    const { container } = render(<MobileNav items={[{ href: '/process', label: '合作流程' }]} />);

    fireEvent.click(container.querySelector('.mobile-nav-toggle') as HTMLButtonElement);

    expect(getComputedStyle(container.querySelector('.mobile-nav-panel')!).overscrollBehavior).toBe('contain');
    style.remove();
  });
});
