'use client';

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext client Link navigation fails in the production worker; the drawer keeps a browser-native fallback. */

import { useCallback, useEffect, useRef, useState } from 'react';

export type NavItem = {
  href: string;
  label: string;
};

const dialogId = 'mobile-navigation';
const desktopMediaQuery = '(min-width: 60rem)';

function isVisible(element: HTMLElement) {
  let current: HTMLElement | null = element;

  while (current) {
    const styles = window.getComputedStyle(current);
    if (current.hidden || current.hasAttribute('inert') || styles.display === 'none' || styles.visibility === 'hidden') {
      return false;
    }
    current = current.parentElement;
  }

  return true;
}

function focusSafely(candidates: Array<HTMLElement | null | undefined>) {
  for (const candidate of candidates) {
    if (!candidate?.isConnected || !isVisible(candidate)) continue;
    candidate.focus({ preventScroll: true });
    if (document.activeElement === candidate) return;
  }
}

export function MobileNav({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    document.body.classList.remove('nav-open');
    setIsOpen(false);
    const trigger = triggerRef.current;
    const headerFallback = trigger
      ?.closest('.header-inner')
      ?.querySelector<HTMLElement>('.brand, .primary-nav a, .header-cta');
    focusSafely([trigger, headerFallback]);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const desktopQuery = typeof window.matchMedia === 'function'
      ? window.matchMedia(desktopMediaQuery)
      : null;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const currentElement = document.activeElement;

      if (event.shiftKey && (currentElement === firstElement || !panelRef.current?.contains(currentElement))) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && (currentElement === lastElement || !panelRef.current?.contains(currentElement))) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.classList.add('nav-open');
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('keydown', trapFocus);
    desktopQuery?.addEventListener('change', closeOnDesktop);
    panelRef.current?.querySelector<HTMLElement>('[data-mobile-nav-initial-focus]')?.focus();

    return () => {
      document.body.classList.remove('nav-open');
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('keydown', trapFocus);
      desktopQuery?.removeEventListener('change', closeOnDesktop);
    };
  }, [closeMenu, isOpen]);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-label={isOpen ? '关闭导航菜单' : '打开导航菜单'}
        aria-expanded={isOpen}
        aria-controls={dialogId}
        ref={triggerRef}
        onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
      >
        <span aria-hidden="true">{isOpen ? '关闭' : '菜单'}</span>
      </button>
      {isOpen && (
        <div
          id={dialogId}
          className="mobile-nav-dialog"
          role="dialog"
          aria-label="移动导航"
          aria-modal="true"
        >
          <button
            type="button"
            className="mobile-nav-backdrop"
            aria-label="关闭移动导航遮罩"
            tabIndex={-1}
            onClick={closeMenu}
          />
          <div className="mobile-nav-panel" ref={panelRef}>
            <button
              type="button"
              className="mobile-nav-close"
              aria-label="关闭移动导航"
              data-mobile-nav-initial-focus
              onClick={closeMenu}
            >
              关闭
            </button>
            <nav className="mobile-nav-links" aria-label="移动导航链接">
              {items.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
              <a className="mobile-nav-cta" href="/assessment" onClick={closeMenu}>
                库存评估 <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
