// Google Analytics + Google Ads tracking helpers.
// gtag is loaded in index.html with Consent Mode v2 — so these helpers
// will be no-ops (but safe) when analytics_storage/ad_storage are denied.

const GA4_ID = 'G-7K5JPSBRQ2';
// Google Ads conversion label for "Lead — Free Guide Download"
const ADS_LEAD_CONVERSION_SEND_TO = 'AW-17775750153/2dW3CNjE9eEbEInYkZxC';

const generateTransactionId = () =>
    `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

/**
 * Fire an explicit GA4 page_view event. For a React SPA, call this on every
 * route change (see usePageTracking). gtag's auto page_view is disabled in
 * index.html to avoid double-counting the initial load.
 */
export const trackPageView = (path: string, title?: string) => {
    if (!window.gtag) return;
    window.gtag('event', 'page_view', {
        page_path: path,
        page_location: window.location.origin + path,
        page_title: title ?? document.title,
        send_to: GA4_ID,
    });
    console.log(`[Analytics] page_view: ${path}`);
};

/**
 * Fire BOTH a GA4 `generate_lead` event AND a Google Ads conversion event
 * when a user submits the lead form. A shared transaction_id lets Ads
 * dedupe if the user double-submits or refreshes.
 */
export const trackLeadConversion = (source: string) => {
    if (!window.gtag) return;

    const transactionId = generateTransactionId();

    // GA4 — standard e-commerce lead event (mark as a conversion in GA4 UI)
    window.gtag('event', 'generate_lead', {
        currency: 'INR',
        value: 1.0,
        transaction_id: transactionId,
        source,
        send_to: GA4_ID,
    });

    // Google Ads — fire the conversion action with send_to for the specific
    // conversion label configured in Ads.
    window.gtag('event', 'conversion', {
        send_to: ADS_LEAD_CONVERSION_SEND_TO,
        value: 1.0,
        currency: 'INR',
        transaction_id: transactionId,
    });

    console.log(`[Analytics] lead conversion (${source}) — txn ${transactionId}`);
};

export const trackEvent = (action: string, category: string, label?: string) => {
    console.log(`[Analytics] Event tracked: ${action} | ${category} | ${label}`);
    if (window.gtag) {
        window.gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
};

/**
 * Backwards-compat alias — older callers (e.g. the unused Hero.tsx) used
 * `trackConversion(label)`. New code should prefer trackLeadConversion.
 * @deprecated
 */
export const trackConversion = (label: string) => trackLeadConversion(label);

// Add type for window.gtag
declare global {
    interface Window {
        gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    }
}
