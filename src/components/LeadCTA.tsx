import { ArrowRight, Mail } from 'lucide-react';
import { useSanityDoc } from '../hooks/useSanityDoc';
import type { LeadCaptureDoc } from '../types/sanity';
import { openLeadModal } from '../lib/leadModal';

const FALLBACK: LeadCaptureDoc = {
  heading: 'Get the free Pondicherry food guide',
  subheading:
    '15 hand-picked spots, real Google Maps links, and what to actually order at each. Delivered to your inbox the moment you sign up.',
  buttonLabel: 'Send me the guide',
};

export const LeadCTA = () => {
  const { data } = useSanityDoc<LeadCaptureDoc>('leadCapture', FALLBACK);

  return (
    <section
      id="lead"
      className="relative isolate overflow-hidden bg-orange-600 py-20 sm:py-24"
      aria-labelledby="lead-heading"
    >
      {/* Decorative background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,0,0,0.15),_transparent_60%)]"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur ring-1 ring-white/30">
          <Mail className="h-7 w-7 text-white" aria-hidden="true" />
        </div>
        <h2
          id="lead-heading"
          className="mt-6 text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl"
        >
          {data.heading}
        </h2>
        {data.subheading && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-orange-50">
            {data.subheading}
          </p>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => openLeadModal(data.source ?? 'inline_cta')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-orange-600 shadow-xl shadow-black/10 transition hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {data.buttonLabel}
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-sm text-orange-100">No spam. One email. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
};
