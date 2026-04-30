// Dual-write lead submission:
//   1. POST to Google Apps Script (VITE_LEAD_SCRIPT_URL) — writes to Google
//      Sheets and triggers confirmation + notification emails. Uses
//      mode: 'no-cors' because Apps Script Web Apps don't return CORS
//      headers; we treat any non-throw as success.
//   2. POST to Netlify Forms (form-name=lead-capture) — gives us the
//      Netlify dashboard view + spam protection (honeypot, Akismet).
//
// Either side succeeding counts as "lead saved" — robust against single
// outages.

import type { LeadSource } from '../types/sanity';

export type LeadPayload = {
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  /** Broad bucket for analytics / pipeline routing. */
  lead_source: LeadSource;
  /** Finer-grained trigger context, e.g. 'hero_primary', 'navbar', 'blog_post'. */
  source?: string;
  /** Auto-filled if omitted. */
  page_url?: string;
};

export type LeadResult = {
  ok: boolean;
  /** Which sinks accepted the lead. */
  sinks: { gas: boolean; netlify: boolean };
  error?: string;
};

const FORM_NAME_DEFAULT = 'lead-capture';
const GAS_URL = import.meta.env.VITE_LEAD_SCRIPT_URL;

/* -------------------------------------------------------------------------- */
/* Internal sinks                                                              */
/* -------------------------------------------------------------------------- */

async function postToGoogleAppsScript(payload: LeadPayload): Promise<boolean> {
  if (!GAS_URL) {
    if (import.meta.env.DEV) {
      console.warn('[leads] VITE_LEAD_SCRIPT_URL not set — skipping Sheets write.');
    }
    return false;
  }

  const formData = new FormData();
  formData.append('date', new Date().toISOString());
  formData.append('name', payload.name ?? '');
  formData.append('email', payload.email);
  formData.append('phone', payload.phone ?? '');
  formData.append('message', payload.message ?? '');
  formData.append('lead_source', payload.lead_source);
  formData.append('page_url', payload.page_url ?? '');
  if (payload.source) formData.append('source', payload.source);

  try {
    // mode: 'no-cors' is required for Apps Script Web Apps. It means we
    // can't read the response, so we assume success unless fetch threw.
    await fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    });
    return true;
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[leads] GAS fetch failed:', err);
    return false;
  }
}

async function postToNetlifyForms(
  payload: LeadPayload,
  formName: string,
): Promise<boolean> {
  const body = new URLSearchParams({
    'form-name': formName,
    name: payload.name ?? '',
    email: payload.email,
    phone: payload.phone ?? '',
    message: payload.message ?? '',
    source: payload.source ?? payload.lead_source,
    lead_source: payload.lead_source,
    page_url: payload.page_url ?? '',
    'bot-field': '',
  });

  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    if (res.ok) return true;
    if (import.meta.env.DEV) {
      console.warn(`[leads] Dev mode — Netlify unreachable (${res.status}). Treating as ok.`);
      return true;
    }
    return false;
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('[leads] Dev mode — Netlify fetch failed. Treating as ok:', err);
      return true;
    }
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Submit a lead to all configured sinks in parallel. Returns ok=true if at
 * least one sink accepted it.
 */
export async function submitLead(
  payload: LeadPayload,
  formName: string = FORM_NAME_DEFAULT,
): Promise<LeadResult> {
  const filled: LeadPayload = {
    ...payload,
    page_url:
      payload.page_url ??
      (typeof window !== 'undefined' ? window.location.href : ''),
  };

  const [gas, netlify] = await Promise.all([
    postToGoogleAppsScript(filled),
    postToNetlifyForms(filled, formName),
  ]);

  return {
    ok: gas || netlify,
    sinks: { gas, netlify },
    error: gas || netlify ? undefined : 'Both lead sinks failed',
  };
}

export const SESSION_FLAGS = {
  SUBMITTED: 'lbp_lead_submitted',
  DISMISSED: 'lbp_modal_dismissed',
  PENDING_DOWNLOAD: 'lbp_pending_pdf_download',
  AUTO_TRIGGERED: 'lbp_auto_triggered',
} as const;
