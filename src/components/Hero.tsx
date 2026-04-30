import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useSanityDoc } from '../hooks/useSanityDoc';
import type { HeroDoc, CtaButton } from '../types/sanity';
import { urlFor } from '../lib/sanity';
import { isExternalUrl, isLeadCtaUrl, openLeadModal } from '../lib/leadModal';
import heroFallback from '../assets/puducherry_hero_image.jpg';

const FALLBACK: HeroDoc = {
  eyebrow: 'The local food guide tourists never find',
  heading: "Discover Pondicherry's best-kept food secrets",
  subheading:
    'Hand-picked restaurants, French heritage cafés, and street food spots — written by locals, with Google Maps links to every place.',
  primaryCta: { label: 'Get the Free Guide', url: '#lead' },
  secondaryCta: { label: 'Browse Restaurants', url: '/restaurants' },
  trustBadges: ['15 hand-picked spots', 'Updated weekly', 'Free, no signup tricks'],
};

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2';
const variants = {
  primary:
    'bg-orange-600 text-white shadow-lg shadow-orange-600/30 hover:bg-orange-700 focus-visible:outline-orange-600',
  secondary:
    'border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 focus-visible:outline-white',
};

function HeroCta({
  cta,
  source,
  variant,
}: {
  cta?: CtaButton;
  source: string;
  variant: 'primary' | 'secondary';
}) {
  if (!cta?.label) return null;
  const url = cta.url ?? '#';
  const className = `${baseClass} ${variants[variant]}`;
  const arrow = variant === 'primary' ? <ArrowRight className="h-4 w-4" /> : null;

  if (isLeadCtaUrl(url)) {
    return (
      <button type="button" onClick={() => openLeadModal(source)} className={className}>
        {cta.label}
        {arrow}
      </button>
    );
  }
  if (isExternalUrl(url) || cta.external) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {cta.label}
        {arrow}
      </a>
    );
  }
  if (url.startsWith('/')) {
    return (
      <Link to={url} className={className}>
        {cta.label}
        {arrow}
      </Link>
    );
  }
  return (
    <a href={url} className={className}>
      {cta.label}
      {arrow}
    </a>
  );
}

export const Hero = () => {
  const { data } = useSanityDoc<HeroDoc>('hero', FALLBACK);

  const bgUrl = data.backgroundImage?.asset?._ref
    ? urlFor(data.backgroundImage).width(2000).auto('format').quality(80).url()
    : heroFallback;

  return (
    <section className="relative isolate overflow-hidden bg-gray-900">
      <img
        src={bgUrl}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"
      />

      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-start justify-center px-4 py-24 sm:min-h-[88vh] sm:px-6 lg:px-8">
        {data.eyebrow && (
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-200 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            {data.eyebrow}
          </p>
        )}
        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
          {data.heading}
        </h1>
        {data.subheading && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl">
            {data.subheading}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <HeroCta cta={data.primaryCta} source="hero_primary" variant="primary" />
          <HeroCta cta={data.secondaryCta} source="hero_secondary" variant="secondary" />
        </div>

        {!!data.trustBadges?.length && (
          <ul className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-200">
            {data.trustBadges.map((b, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
