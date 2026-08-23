'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export type NavItem = {
  href: string;
  label: string;
};

const dialogId = 'mobile-navigation';

export function MobileNav({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
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
    panelRef.current?.querySelector<HTMLElement>('[data-mobile-nav-initial-focus]')?.focus();

    return () => {
      document.body.classList.remove('nav-open');
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('keydown', trapFocus);
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
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Link className="mobile-nav-cta" href="/assessment" onClick={() => setIsOpen(false)}>
                库存评估 <span aria-hidden="true">↗</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
