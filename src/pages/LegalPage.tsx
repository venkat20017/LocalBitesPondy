import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSanityBySlug } from '../hooks/useSanityQuery';
import type { LegalPageDoc } from '../types/sanity';
import { PortableText } from '../components/PortableText';

type LegalSlug = 'privacy-policy' | 'terms-of-use';

const TITLE_MAP: Record<LegalSlug, string> = {
  'privacy-policy': 'Privacy Policy',
  'terms-of-use': 'Terms of Use',
};

const FALLBACK_BODY: Record<LegalSlug, string> = {
  'privacy-policy':
    "We're finalizing our privacy policy. In the meantime, your email is only used to send the food guide and occasional updates — never sold or shared. Email hello@localbitespondy.com to request data deletion.",
  'terms-of-use':
    "We're finalizing our terms of use. By using LocalBitesPondy you agree to use the content for personal, non-commercial purposes. Email hello@localbitespondy.com with any questions.",
};

function formatDate(iso?: string) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function LegalPage({ slug }: { slug: LegalSlug }) {
  const { data, loading, notFound } = useSanityBySlug<LegalPageDoc>('legalPage', slug);
  const fallbackTitle = TITLE_MAP[slug];
  const title = data?.title ?? fallbackTitle;

  useEffect(() => {
    document.title = `${title} | LocalBitesPondy`;
  }, [title]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-900">
          ← Back to home
        </Link>
      </nav>

      <header className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {title}
        </h1>
        {data?.lastUpdated && (
          <p className="mt-3 text-sm text-gray-500">Last updated {formatDate(data.lastUpdated)}</p>
        )}
      </header>

      <article className="prose prose-gray mt-8 max-w-none">
        {loading && !data ? (
          <p className="text-gray-500">Loading…</p>
        ) : data?.body && data.body.length > 0 ? (
          <PortableText value={data.body} />
        ) : (
          <p className="text-gray-700">{FALLBACK_BODY[slug]}</p>
        )}
        {notFound && (
          <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
            Detailed policy is being published shortly. Please check back soon.
          </p>
        )}
      </article>
    </main>
  );
}
