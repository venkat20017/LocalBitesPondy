// Submit a lead to Netlify Forms.
//
// Netlify Forms detects forms at build time by scanning index.html for
// <form name="..." data-netlify="true"> tags. The runtime form is JS, so
// we POST to "/" with application/x-www-form-urlencoded and a form-name
// field that matches the static form in index.html.
//
// Spam protection: include the bot-field honeypot from the schema.

export type LeadFields = Record<string, string>;

export type LeadResult = {
  ok: boolean;
  status: number;
  error?: string;
};

const FORM_NAME_DEFAULT = 'lead-capture';

export async function submitLead(
  fields: LeadFields,
  formName: string = FORM_NAME_DEFAULT,
): Promise<LeadResult> {
  const body = new URLSearchParams({
    'form-name': formName,
    ...fields,
  });

  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (res.ok) return { ok: true, status: res.status };

    // In dev, vite has no /-handler, so a non-200 is expected.
    if (import.meta.env.DEV) {
      console.warn(
        `[leads] Dev mode — Netlify Forms unreachable (status ${res.status}). Treating as success.`,
      );
      return { ok: true, status: 200 };
    }

    return { ok: false, status: res.status, error: `HTTP ${res.status}` };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('[leads] Dev mode — fetch failed. Treating as success:', err);
      return { ok: true, status: 200 };
    }
    return {
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

export const SESSION_FLAGS = {
  SUBMITTED: 'lbp_lead_submitted',
  DISMISSED: 'lbp_modal_dismissed',
  PENDING_DOWNLOAD: 'lbp_pending_pdf_download',
} as const;
