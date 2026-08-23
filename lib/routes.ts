import { pages, type PageDefinition } from '../content/pages';

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, '') : withLeadingSlash;
}

export function getPageByPath(pathname: string): PageDefinition | undefined {
  const normalized = normalizePath(pathname);
  return pages.find((page) => page.path === normalized);
}

export function slugToPath(slug: string[] | undefined): string {
  return slug?.length ? `/${slug.join('/')}` : '/';
}
