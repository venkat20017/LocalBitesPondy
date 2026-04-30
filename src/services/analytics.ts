// Google Analytics + Google Ads + GTM tracking helpers.
//
// Strategy: every call DUAL-EMITS:
//   1. `gtag('event', ...)` — directly hits GA4/Ads via the gtag script
//      loaded in index.html. Required for direct GA4 tracking and for
//      Consent Mode v2 to gate / anonymize as configured.
//   2. `dataLayer.push({ event: 'name', ... })` — explicit GTM-friendly
//      event so Custom Event triggers in GTM can fire tags reliably.
//      (gtag's own dataLayer entries use a positional shape that GTM
//      Custom Event triggers don't match.)
//
// Consent Mode v2 — defaults to denied in index.html. ConsentBanner calls
// window.consentGrantAll / consentDenyAll to update. These helpers do NOT
// gate themselves on consent state — that's GA's job. We always emit; GA
// throttles or anonymizes downstream.

const GA4_ID = 'G-7K5JPSBRQ2';
const ADS_ID = 'AW-17775750153';
const ADS_LEAD_CONVERSION_SEND_TO = `${ADS_ID}/2dW3CNjE9eEbEInYkZxC`;

const isDev = import.meta.env.DEV;
const log = (...args: unknown[]) => {
  if (isDev) console.log('[Analytics]', ...args);
};

const generateTransactionId = () =>
  `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

/** Push an explicit, GTM-friendly event onto window.dataLayer. */
function pushDataLayer(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const dl = (window.dataLayer ??= []);
  dl.push({ event, ...params });
}

function gtagEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}

/* -------------------------------------------------------------------------- */
/* Public tracking API                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Fire a GA4 page_view + GTM page_view event on every SPA route change.
 * gtag's auto page_view is disabled in index.html (`send_page_view: false`)
 * so the initial HTML load doesn't double-count.
 */
export function trackPageView(path: string, title?: string) {
  const params = {
    page_path: path,
    page_location: typeof window !== 'undefined' ? window.location.origin + path : path,
    page_title: title ?? (typeof document !== 'undefined' ? document.title : ''),
  };
  gtagEvent('page_view', { ...params, send_to: GA4_ID });
  pushDataLayer('page_view', params);
  log('page_view', path);
}

/**
 * Generic event tracker. Keeps the legacy 3-arg signature for callers that
 * don't have a dedicated helper. New code should prefer the typed helpers
 * below (trackLeadModalOpen, trackLeadConversion, trackPdfDownload, etc.).
 */
export function trackEvent(action: string, category: string, label?: string) {
  gtagEvent(action, { event_category: category, event_label: label });
  pushDataLayer(action, { event_category: category, event_label: label });
  log('event', action, category, label);
}

/** User opened the lead modal (any source — auto-trigger, CTA, etc.). */
export function trackLeadModalOpen(source: string) {
  gtagEvent('lead_modal_open', { source });
  pushDataLayer('lead_modal_open', { source });
  log('lead_modal_open', source);
}

/** User clicked submit on the lead form (before result is known). */
export function trackLeadSubmit(source: string) {
  gtagEvent('lead_submit', { source });
  pushDataLayer('lead_submit', { source });
  log('lead_submit', source);
}

/** Lead form submission failed (HTTP error or network). */
export function trackLeadFailed(source: string, status: number, error?: string) {
  gtagEvent('lead_failed', { source, status, error });
  pushDataLayer('lead_failed', { source, status, error });
  log('lead_failed', source, status, error);
}

/**
 * Successful lead capture: fire BOTH the GA4 generate_lead event and the
 * Google Ads conversion event, deduplicated by a shared transaction_id.
 * Also pushes a single GTM-friendly `lead_captured` event so any GTM tags
 * (custom server-side, Meta Pixel, etc.) can fire too.
 */
export function trackLeadConversion(source: string) {
  const transactionId = generateTransactionId();

  // GA4 — standard ecommerce lead event (configure as conversion in GA4 UI)
  gtagEvent('generate_lead', {
    currency: 'INR',
    value: 1.0,
    transaction_id: transactionId,
    source,
    send_to: GA4_ID,
  });

  // Google Ads — fire the conversion action with the specific label.
  gtagEvent('conversion', {
    send_to: ADS_LEAD_CONVERSION_SEND_TO,
    value: 1.0,
    currency: 'INR',
    transaction_id: transactionId,
  });

  // GTM — single canonical event with all the params downstream tags need.
  pushDataLayer('lead_captured', {
    source,
    transaction_id: transactionId,
    value: 1.0,
    currency: 'INR',
  });

  log('lead_captured', source, transactionId);
  return transactionId;
}

/** PDF was downloaded — auto after submit, or manual via thank-you button. */
export function trackPdfDownload(method: 'auto_after_submit' | 'manual_button') {
  gtagEvent('pdf_download', { method, file: 'famous-food-in-pondicherry.pdf' });
  pushDataLayer('pdf_download', { method, file: 'famous-food-in-pondicherry.pdf' });
  log('pdf_download', method);
}

/** User updated cookie consent — granted or denied across the board. */
export function trackConsentUpdate(state: 'granted' | 'denied') {
  pushDataLayer('consent_update', { consent_state: state });
  log('consent_update', state);
}

/**
 * Backwards-compat alias.
 * @deprecated Use trackLeadConversion instead.
 */
export const trackConversion = (label: string) => trackLeadConversion(label);

/* -------------------------------------------------------------------------- */
/* Type augmentation                                                           */
/* -------------------------------------------------------------------------- */

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    dataLayer?: Record<string, unknown>[];
  }
}
