import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, X, Loader2 } from 'lucide-react';
import { useSanityDoc } from '../hooks/useSanityDoc';
import type { LeadCaptureDoc, LeadCaptureField } from '../types/sanity';
import { subscribeLeadModal } from '../lib/leadModal';
import { submitLead, SESSION_FLAGS } from '../services/leads';
import {
  trackLeadConversion,
  trackLeadFailed,
  trackLeadModalOpen,
  trackLeadSubmit,
} from '../services/analytics';

const FALLBACK: LeadCaptureDoc = {
  heading: 'Get the Free Pondicherry Food Guide',
  subheading: '15 hand-picked spots · Google Maps links · What to order',
  buttonLabel: 'Send me the guide',
  successMessage: "You're on the list — your guide is downloading.",
  source: 'landing_modal',
  netlifyFormName: 'lead-capture',
  fields: [
    { name: 'name', label: 'Your name (optional)', placeholder: 'Your name', type: 'text', required: false },
    { name: 'email', label: 'Email address', placeholder: 'you@example.com', type: 'email', required: true },
  ],
};

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const LeadModal = () => {
  const { data } = useSanityDoc<LeadCaptureDoc>('leadCapture', FALLBACK);
  const fields: LeadCaptureField[] = data.fields?.length ? data.fields : (FALLBACK.fields ?? []);
  const formName = data.netlifyFormName ?? FALLBACK.netlifyFormName ?? 'lead-capture';
  const baseSource = data.source ?? FALLBACK.source ?? 'landing_modal';

  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string>(baseSource);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // Subscribe to open events from any CTA in the app
  useEffect(() => {
    return subscribeLeadModal((src) => {
      const resolved = src || baseSource;
      setSource(resolved);
      setError(null);
      setIsOpen(true);
      trackLeadModalOpen(resolved);
    });
  }, [baseSource]);

  // Body scroll lock + ESC key
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);

    // Focus first input after open animation
    const t = window.setTimeout(() => firstInputRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const close = (markDismissed = true) => {
    setIsOpen(false);
    setSubmitting(false);
    if (markDismissed) {
      try {
        sessionStorage.setItem(SESSION_FLAGS.DISMISSED, '1');
      } catch {
        /* sessionStorage unavailable */
      }
    }
  };

  const handleChange = (name: string, val: string) => {
    setValues((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    for (const f of fields) {
      const v = (values[f.name ?? ''] ?? '').trim();
      if (f.required && !v) {
        setError(`${f.label ?? f.name} is required.`);
        return;
      }
      if (f.type === 'email' && v && !isValidEmail(v)) {
        setError('Please enter a valid email address.');
        return;
      }
    }

    setSubmitting(true);
    trackLeadSubmit(source);

    const payload: Record<string, string> = { source };
    for (const f of fields) {
      const key = f.name ?? '';
      if (key) payload[key] = (values[key] ?? '').trim();
    }
    // Honeypot — should be empty in legit submissions; bots fill it
    payload['bot-field'] = '';

    const result = await submitLead(payload, formName);

    if (!result.ok) {
      setSubmitting(false);
      setError("We couldn't send your details. Please check your connection and try again.");
      trackLeadFailed(source, result.status, result.error);
      return;
    }

    // Fire conversions: GA4 generate_lead + Google Ads conversion (shared txn id)
    trackLeadConversion(source);

    try {
      sessionStorage.setItem(SESSION_FLAGS.SUBMITTED, '1');
      // Tell ThankYou page to auto-trigger the PDF download
      sessionStorage.setItem(SESSION_FLAGS.PENDING_DOWNLOAD, '1');
    } catch {
      /* ignore */
    }

    close(false);
    navigate('/thank-you');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      onClick={() => close()}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={() => close()}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Orange header */}
        <div className="bg-orange-600 px-6 py-7 text-center text-white sm:px-10 sm:py-8">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <Mail className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <h2 id="lead-modal-title" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="mt-2 text-sm text-orange-100 sm:text-base">{data.subheading}</p>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 px-6 py-6 sm:px-10 sm:py-7"
          name={formName}
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          {/* Hidden Netlify form-name + honeypot fields (mirror of static form) */}
          <input type="hidden" name="form-name" value={formName} />
          <p className="hidden">
            <label>
              Don&apos;t fill this out: <input name="bot-field" />
            </label>
          </p>
          <input type="hidden" name="source" value={source} />

          {fields.map((f, i) => {
            const id = `lead-${f.name}`;
            const required = !!f.required;
            return (
              <div key={f.name ?? i}>
                <label htmlFor={id} className="sr-only">
                  {f.label}
                </label>
                <input
                  ref={i === 0 ? firstInputRef : undefined}
                  id={id}
                  name={f.name}
                  type={f.type ?? 'text'}
                  required={required}
                  placeholder={f.placeholder ?? f.label}
                  autoComplete={f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'name'}
                  value={values[f.name ?? ''] ?? ''}
                  onChange={(e) => handleChange(f.name ?? '', e.target.value)}
                  disabled={submitting}
                  className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 disabled:opacity-60"
                />
              </div>
            );
          })}

          {error && (
            <p className="text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            {submitting && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
            {submitting ? 'Sending…' : data.buttonLabel}
          </button>

          <p className="mt-1 text-center text-xs text-gray-500">
            No spam. Unsubscribe anytime. Your email stays private.
          </p>
        </form>
      </div>
    </div>
  );
};
