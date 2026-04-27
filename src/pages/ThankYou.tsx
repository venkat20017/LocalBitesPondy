import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../services/analytics';

export default function ThankYou() {
  const downloadStarted = useRef(false);

  useEffect(() => {
    if (downloadStarted.current) return;
    downloadStarted.current = true;

    const link = document.createElement('a');
    link.href = '/famous-food-in-pondicherry.pdf';
    link.download = 'famous-food-in-pondicherry.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    trackEvent('PDF Downloaded', 'content_access', 'auto_download');
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">You&apos;re all set</h1>
      <p className="mt-4 text-lg text-gray-600">
        Your Pondicherry food guide should be downloading now.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-500"
      >
        Back to home
      </Link>
    </main>
  );
}
