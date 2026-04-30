import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Download, Home } from 'lucide-react';
import { trackPdfDownload } from '../services/analytics';
import { SESSION_FLAGS } from '../services/leads';
import { useSanityDoc } from '../hooks/useSanityDoc';
import type { ThankYouPageDoc } from '../types/sanity';
import { SmartCta } from '../components/SmartCta';
import { PageSEO } from '../components/PageSEO';

const FALLBACK: ThankYouPageDoc = {
  heading: "You're all set",
  subheading: 'Your Pondicherry food guide is ready. Tap the button below if the download did not start automatically.',
  pdfUrl: '/famous-food-in-pondicherry.pdf',
  pdfDownloadLabel: 'Download the guide',
  nextStepsHeading: 'What happens next',
  nextStepsBody:
    "We'll send a short follow-up email with our top picks, plus updates whenever we add new spots. Keep an eye on your inbox (and spam folder, just in case).",
};

function triggerDownload(url: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = url.split('/').pop() ?? 'guide.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function ThankYou() {
  const { data } = useSanityDoc<ThankYouPageDoc>('thankYouPage', FALLBACK);
  const pdfUrl = data.pdfUrl ?? FALLBACK.pdfUrl ?? '/famous-food-in-pondicherry.pdf';
  const heading = data.heading ?? FALLBACK.heading ?? "You're all set";

  const autoStarted = useRef(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (autoStarted.current) return;
    autoStarted.current = true;

    let pending = false;
    try {
      pending = sessionStorage.getItem(SESSION_FLAGS.PENDING_DOWNLOAD) === '1';
      if (pending) sessionStorage.removeItem(SESSION_FLAGS.PENDING_DOWNLOAD);
    } catch {
      /* sessionStorage unavailable */
    }

    if (pending) {
      triggerDownload(pdfUrl);
      setDownloaded(true);
      trackPdfDownload('auto_after_submit');
    }
  }, [pdfUrl]);

  const onManualDownload = () => {
    triggerDownload(pdfUrl);
    setDownloaded(true);
    trackPdfDownload('manual_button');
  };

  return (
    <>
      <PageSEO
        title={heading}
        description={data.subheading}
        canonicalPath="/thank-you"
        noindex
      />
      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" aria-hidden="true" />
        </div>
        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {heading}
        </h1>
        {data.subheading && (
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            {downloaded
              ? 'Your guide is downloading. Check your downloads folder.'
              : data.subheading}
          </p>
        )}

        <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
          <button
            type="button"
            onClick={onManualDownload}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            <Download className="h-5 w-5" />
            {downloaded ? "Download again" : (data.pdfDownloadLabel ?? FALLBACK.pdfDownloadLabel)}
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-base font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <Home className="h-5 w-5" />
            Back to home
          </Link>
        </div>

        {(data.nextStepsHeading || data.nextStepsBody) && (
          <section className="mt-16 max-w-xl rounded-2xl border border-gray-200 bg-gray-50 p-6 text-left sm:p-8">
            {data.nextStepsHeading && (
              <h2 className="text-lg font-bold text-gray-900">{data.nextStepsHeading}</h2>
            )}
            {data.nextStepsBody && (
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{data.nextStepsBody}</p>
            )}
            {data.ctaButton?.label && (
              <SmartCta
                url={data.ctaButton.url}
                external={data.ctaButton.external}
                source="thank_you"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                {data.ctaButton.label} →
              </SmartCta>
            )}
          </section>
        )}
      </main>
    </>
  );
}
