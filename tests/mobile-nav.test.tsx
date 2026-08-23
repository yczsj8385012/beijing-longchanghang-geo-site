// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { MobileNav } from '../components/mobile-nav';

const shellStyles = readFileSync(join(process.cwd(), 'styles', 'shell.css'), 'utf8');

function installDesktopMediaQuery() {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  let matches = false;
  const media = '(min-width: 60rem)';

  const mediaQueryList = {
    get matches() {
      return matches;
    },
    media,
    onchange: null,
    addEventListener(type: string, listener: (event: MediaQueryListEvent) => void) {
      if (type === 'change') listeners.add(listener);
    },
    removeEventListener(type: string, listener: (event: MediaQueryListEvent) => void) {
      if (type === 'change') listeners.delete(listener);
    },
    addListener(listener: (event: MediaQueryListEvent) => void) {
      listeners.add(listener);
    },
    removeListener(listener: (event: MediaQueryListEvent) => void) {
      listeners.delete(listener);
    },
    dispatchEvent() {
      return true;
    },
  } as MediaQueryList;

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: () => mediaQueryList,
  });

  return {
    listenerCount: () => listeners.size,
    setMatches(nextMatches: boolean) {
      matches = nextMatches;
      const event = { matches, media } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
}

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

  it('closes at the desktop breakpoint, releases effects, and moves focus to a visible header control', () => {
    const desktopMediaQuery = installDesktopMediaQuery();
    render(
      <>
        <div className="header-inner">
          <button className="brand" type="button">北京隆昌行首页</button>
          <MobileNav items={[{ href: '/process', label: '合作流程' }]} />
        </div>
        <button type="button">外部操作</button>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: '打开导航菜单' }));
    expect(document.body).toHaveClass('nav-open');
    expect(desktopMediaQuery.listenerCount()).toBe(1);

    const mobileNav = document.querySelector<HTMLElement>('.mobile-nav')!;
    mobileNav.style.display = 'none';
    act(() => desktopMediaQuery.setMatches(true));

    expect(screen.queryByRole('dialog', { name: '移动导航' })).not.toBeInTheDocument();
    expect(document.body).not.toHaveClass('nav-open');
    expect(desktopMediaQuery.listenerCount()).toBe(0);
    expect(screen.getByRole('button', { name: '北京隆昌行首页' })).toHaveFocus();

    const externalControl = screen.getByRole('button', { name: '外部操作' });
    externalControl.focus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(externalControl).toHaveFocus();
  });

  it.each(['合作流程', '库存评估'])('runs the shared close lifecycle when choosing %s', (linkName) => {
    const desktopMediaQuery = installDesktopMediaQuery();
    render(<MobileNav items={[{ href: '/process', label: '合作流程' }]} />);
    const trigger = screen.getByRole('button', { name: '打开导航菜单' });

    fireEvent.click(trigger);
    const navLink = screen.getByRole('link', { name: linkName });
    expect(navLink).toHaveAttribute('href', linkName === '合作流程' ? '/process' : '/assessment');
    navLink.addEventListener('click', (event) => event.preventDefault());
    navLink.focus();
    fireEvent.click(navLink);

    expect(screen.queryByRole('dialog', { name: '移动导航' })).not.toBeInTheDocument();
    expect(document.body).not.toHaveClass('nav-open');
    expect(desktopMediaQuery.listenerCount()).toBe(0);
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

  it('hands navigation to the desktop layout at exactly 60rem', () => {
    const style = document.createElement('style');
    style.textContent = shellStyles;
    document.head.append(style);
    const mobileLayoutRule = Array.from(style.sheet!.cssRules).find(
      (rule) => rule.constructor.name === 'CSSMediaRule'
        && Array.from((rule as CSSMediaRule).cssRules).some(
          (nestedRule) => (nestedRule as CSSStyleRule).selectorText === '.mobile-nav',
        ),
    ) as CSSMediaRule;

    expect(mobileLayoutRule.conditionText).toBe('(max-width: 59.999rem)');
    style.remove();
  });
});
