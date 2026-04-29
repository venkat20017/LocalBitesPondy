import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Download, Home } from 'lucide-react';
import { trackPdfDownload } from '../services/analytics';
import { SESSION_FLAGS } from '../services/leads';

const PDF_URL = '/famous-food-in-pondicherry.pdf';

function triggerDownload() {
  const link = document.createElement('a');
  link.href = PDF_URL;
  link.download = 'famous-food-in-pondicherry.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function ThankYou() {
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
      // Fresh submission — auto-trigger the PDF download
      triggerDownload();
      setDownloaded(true);
      trackPdfDownload('auto_after_submit');
    }
  }, []);

  const onManualDownload = () => {
    triggerDownload();
    setDownloaded(true);
    trackPdfDownload('manual_button');
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-10 w-10 text-green-600" aria-hidden="true" />
      </div>
      <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        You&apos;re all set
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        {downloaded
          ? 'Your Pondicherry food guide is downloading. Check your downloads folder.'
          : 'Your Pondicherry food guide is ready. Tap the button below to download.'}
      </p>

      <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
        <button
          type="button"
          onClick={onManualDownload}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          <Download className="h-5 w-5" />
          {downloaded ? 'Download again' : 'Download the guide'}
        </button>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-base font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <Home className="h-5 w-5" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
