// Single source of truth for canonical URLs across the site.
// PRIMARY_DOMAIN is overridable via VITE_PRIMARY_DOMAIN at build time.
// Phase 8 will also pull from Sanity siteSettings — this constant is
// the static fallback used for SSR-less builds.

export const PRIMARY_DOMAIN =
  import.meta.env.VITE_PRIMARY_DOMAIN ?? 'https://localbitespondy.com';

export function absoluteUrl(path: string = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  if (!path.startsWith('/')) path = `/${path}`;
  return `${PRIMARY_DOMAIN.replace(/\/$/, '')}${path}`;
}

export function pathFromLocation(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname || '/';
}
