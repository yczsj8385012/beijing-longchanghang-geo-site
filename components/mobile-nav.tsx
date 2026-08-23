'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export type NavItem = {
  href: string;
  label: string;
};

const dialogId = 'mobile-navigation';

export function MobileNav({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.body.classList.add('nav-open');
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.classList.remove('nav-open');
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-label={isOpen ? '关闭导航菜单' : '打开导航菜单'}
        aria-expanded={isOpen}
        aria-controls={dialogId}
        onClick={() => setIsOpen((open) => !open)}
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
            aria-label="关闭导航菜单"
            onClick={() => setIsOpen(false)}
          />
          <nav className="mobile-nav-panel" aria-label="移动导航链接">
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
      )}
    </div>
  );
}
