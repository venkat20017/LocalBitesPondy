import { useState, type FormEvent } from 'react';
import { Loader2, Mail, Send } from 'lucide-react';
import { useSanityDoc } from '../hooks/useSanityDoc';
import type { ContactFormDoc, ContactFormField } from '../types/sanity';
import { submitLead } from '../services/leads';
import { trackEvent, trackLeadConversion } from '../services/analytics';

const FALLBACK: ContactFormDoc = {
  heading: 'Get in touch',
  subheading: 'Restaurant recommendations, content corrections, partnerships — drop us a line and we reply within 24-48 hours.',
  buttonLabel: 'Send message',
  successMessage: "Thanks — we'll reply within 24-48 hours.",
  fields: [
    { name: 'name', label: 'Your name', placeholder: 'Full name', required: true },
    { name: 'email', label: 'Email', placeholder: 'you@example.com', required: true },
    { name: 'phone', label: 'Phone (optional)', placeholder: '+91 ...', required: false },
    { name: 'message', label: 'Message', placeholder: 'How can we help?', required: true },
  ],
};

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const inputCls =
  'block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 disabled:opacity-60';

export const ContactForm = () => {
  const { data } = useSanityDoc<ContactFormDoc>('contactForm', FALLBACK);
  const fields: ContactFormField[] = data.fields?.length ? data.fields : (FALLBACK.fields ?? []);

  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (name: string, val: string) => {
    setValues((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    for (const f of fields) {
      const key = f.name ?? '';
      const v = (values[key] ?? '').trim();
      if (f.required && !v) {
        setError(`${f.label ?? key} is required.`);
        return;
      }
      if (key === 'email' && v && !isValidEmail(v)) {
        setError('Please enter a valid email address.');
        return;
      }
    }

    setSubmitting(true);
    trackEvent('contact_submit', 'lead_generation', 'inline_contact_form');

    const result = await submitLead({
      name: values['name']?.trim(),
      email: values['email']?.trim() ?? '',
      phone: values['phone']?.trim(),
      message: values['message']?.trim(),
      lead_source: 'contact_form',
      source: 'inline_contact_form',
    });

    if (!result.ok) {
      setSubmitting(false);
      setError("Couldn't send your message — please try again or email hello@localbitespondy.com.");
      return;
    }

    trackLeadConversion('contact_form');
    setSubmitting(false);
    setSuccess(true);
    setValues({});
  };

  // Render an input or textarea depending on field name
  const renderField = (f: ContactFormField, i: number) => {
    const id = `contact-${f.name}`;
    const required = !!f.required;
    const isMessage = f.name === 'message';
    const type = f.name === 'email' ? 'email' : f.name === 'phone' ? 'tel' : 'text';
    const autoComplete =
      f.name === 'email' ? 'email' : f.name === 'phone' ? 'tel' : f.name === 'name' ? 'name' : undefined;

    return (
      <div key={f.name ?? i} className={isMessage ? 'sm:col-span-2' : undefined}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {f.label}
          {required && <span className="ml-0.5 text-orange-600">*</span>}
        </label>
        {isMessage ? (
          <textarea
            id={id}
            name={f.name}
            required={required}
            rows={4}
            placeholder={f.placeholder ?? f.label}
            value={values[f.name ?? ''] ?? ''}
            onChange={(e) => handleChange(f.name ?? '', e.target.value)}
            disabled={submitting}
            className={`mt-1.5 ${inputCls} resize-none`}
          />
        ) : (
          <input
            id={id}
            name={f.name}
            type={type}
            required={required}
            autoComplete={autoComplete}
            placeholder={f.placeholder ?? f.label}
            value={values[f.name ?? ''] ?? ''}
            onChange={(e) => handleChange(f.name ?? '', e.target.value)}
            disabled={submitting}
            className={`mt-1.5 ${inputCls}`}
          />
        )}
      </div>
    );
  };

  return (
    <section
      id="contact"
      className="bg-white py-20 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600 ring-1 ring-orange-100">
            <Mail className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2
            id="contact-heading"
            className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 text-balance sm:text-4xl"
          >
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
              {data.subheading}
            </p>
          )}
        </div>

        {success ? (
          <div
            role="status"
            className="mx-auto mt-12 max-w-xl rounded-2xl border border-green-200 bg-green-50 p-6 text-center"
          >
            <p className="text-base font-semibold text-green-900">{data.successMessage}</p>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-3 text-sm font-medium text-green-700 underline hover:text-green-900"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 max-w-xl rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8"
            noValidate
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{fields.map(renderField)}</div>

            {error && (
              <p className="mt-4 text-sm font-medium text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:w-auto"
            >
              {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              {submitting ? 'Sending…' : data.buttonLabel}
            </button>
            <p className="mt-3 text-xs text-gray-500">
              No spam. Your details are stored securely and used only to reply to you.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
