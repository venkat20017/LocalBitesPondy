// Lightweight pub/sub for opening the lead modal from anywhere in the app.
// The actual modal UI is added in Phase 4 — until then, calling openLeadModal
// is a no-op (the event has no listeners).

const EVENT = 'lead-modal:open';

export function openLeadModal(source: string = 'unknown') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { source } }));
}

export function subscribeLeadModal(handler: (source: string) => void) {
  if (typeof window === 'undefined') return () => undefined;
  const listener = (e: Event) => {
    const detail = (e as CustomEvent<{ source?: string }>).detail;
    handler(detail?.source ?? 'unknown');
  };
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

/** Returns true if the URL is a "open the lead modal" trigger (no side effects). */
export function isLeadCtaUrl(url?: string | null): boolean {
  return url === '#lead' || url === '#lead-modal';
}

/** Returns true if the URL is fully external (http/https). */
export function isExternalUrl(url?: string | null): boolean {
  return !!url && /^https?:\/\//.test(url);
}

/** Returns true if URL is an in-page anchor (e.g. #faq) but NOT a lead-modal trigger. */
export function isHashAnchor(url?: string | null): boolean {
  return !!url && url.startsWith('#') && !isLeadCtaUrl(url);
}
