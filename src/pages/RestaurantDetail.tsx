import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, MapPin } from 'lucide-react';
import { useSanityBySlug } from '../hooks/useSanityQuery';
import type { RestaurantDoc } from '../types/sanity';
import { SanityImage } from '../components/SanityImage';
import { PortableText } from '../components/PortableText';

const PRICE_LABEL: Record<string, string> = {
  budget: '₹ Budget',
  mid: '₹₹ Mid-range',
  premium: '₹₹₹ Premium',
};

export default function RestaurantDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: r, loading, notFound } = useSanityBySlug<RestaurantDoc>('restaurant', slug);

  useEffect(() => {
    if (r?.name) document.title = `${r.name} | LocalBitesPondy`;
    else if (notFound) document.title = 'Not found | LocalBitesPondy';
  }, [r?.name, notFound]);

  if (loading && !r) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-sm text-gray-500">Loading…</p>
      </main>
    );
  }

  if (notFound || !r) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Restaurant not found
        </h1>
        <p className="mt-3 text-gray-600">
          That listing doesn&apos;t exist (yet). Browse the directory below.
        </p>
        <Link
          to="/restaurants"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft className="h-4 w-4" /> All restaurants
        </Link>
      </main>
    );
  }

  const cuisines = r.cuisines ?? [];
  const mustTry = r.mustTry ?? [];
  const gallery = r.gallery ?? [];

  return (
    <main>
      <article>
        {/* Hero image */}
        {r.heroImage?.asset?._ref && (
          <div className="bg-gray-100">
            <SanityImage
              image={r.heroImage}
              alt={r.name ?? ''}
              width={2000}
              loading="eager"
              className="mx-auto block aspect-[16/9] h-full w-full max-w-7xl object-cover sm:rounded-b-3xl"
            />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm">
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" /> Back to restaurants
            </Link>
          </nav>

          <header>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 text-balance sm:text-5xl">
              {r.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              {r.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {r.location}
                </span>
              )}
              {r.priceRange && PRICE_LABEL[r.priceRange] && (
                <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
                  {PRICE_LABEL[r.priceRange]}
                </span>
              )}
              {cuisines.length > 0 &&
                cuisines.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700"
                  >
                    {c}
                  </span>
                ))}
            </div>
            {r.shortDescription && (
              <p className="mt-6 text-lg leading-relaxed text-gray-700">{r.shortDescription}</p>
            )}
          </header>

          {(r.address || r.googleMapsUrl) && (
            <section className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
              {r.address && (
                <p className="text-sm text-gray-700 whitespace-pre-line">{r.address}</p>
              )}
              {r.googleMapsUrl && (
                <a
                  href={r.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
                >
                  Open in Google Maps <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </section>
          )}

          {mustTry.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-gray-900">Must-try dishes</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {mustTry.map((dish) => (
                  <li
                    key={dish}
                    className="rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700 ring-1 ring-orange-100"
                  >
                    {dish}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {r.body && r.body.length > 0 && (
            <section className="mt-10">
              <PortableText value={r.body} />
            </section>
          )}

          {gallery.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-gray-900">Gallery</h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((img, i) => (
                  <li key={i} className="overflow-hidden rounded-xl bg-gray-100">
                    <SanityImage
                      image={img}
                      alt={`${r.name ?? 'Restaurant'} photo ${i + 1}`}
                      width={600}
                      className="aspect-square h-full w-full object-cover"
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
