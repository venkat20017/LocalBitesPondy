import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { useSanityCollection } from '../hooks/useSanityQuery';
import type { RestaurantDoc } from '../types/sanity';
import { SanityImage } from '../components/SanityImage';
import { PageSEO } from '../components/PageSEO';
import { breadcrumbJsonLd, itemListJsonLd } from '../lib/jsonLd';

const PRICE_LABEL: Record<string, string> = {
  budget: '₹',
  mid: '₹₹',
  premium: '₹₹₹',
};

export default function RestaurantList() {
  const { data: restaurants, loading } = useSanityCollection<RestaurantDoc>('restaurant', {
    orderBy: 'name asc',
  });

  const itemList = itemListJsonLd(
    restaurants
      .filter((r) => r.slug?.current && r.name)
      .map((r) => ({ name: r.name as string, path: `/restaurants/${r.slug?.current}` })),
    'Restaurants in Pondicherry',
  );

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Restaurants', path: '/restaurants' },
  ]);

  return (
    <>
      <PageSEO
        title="Best Restaurants in Pondicherry — Where Locals Actually Eat"
        description="Hand-picked, locally vetted restaurants in Pondicherry — French heritage cafés, Tamil breakfast spots, and beach dining. Every entry includes a working Google Maps link."
        canonicalPath="/restaurants"
        jsonLd={[itemList, breadcrumbs]}
      />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
            Hand-picked & locally vetted
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 text-balance sm:text-5xl">
            Where to eat in Pondicherry
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            From 100-year-old French boulangeries to 6am Tamil breakfast carts — every spot is
            personally tasted, vetted, and mapped.
          </p>
        </header>

        {loading && restaurants.length === 0 && (
          <p className="mt-12 text-center text-sm text-gray-500">Loading restaurants…</p>
        )}

        {!loading && restaurants.length === 0 && (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-base text-gray-700">
              More restaurants are being added — the full directory goes live soon.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Get the free PDF guide while you wait <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {restaurants.length > 0 && (
          <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((r) => {
              const slug = r.slug?.current ?? '';
              const cuisinesText = r.cuisines?.join(' · ');
              return (
                <li key={r._id ?? slug}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
                    <Link to={`/restaurants/${slug}`} className="absolute inset-0 z-10" aria-label={r.name ?? 'Restaurant'} />
                    {r.heroImage?.asset?._ref && (
                      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                        <SanityImage
                          image={r.heroImage}
                          alt={r.name ?? ''}
                          width={800}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-lg font-bold tracking-tight text-gray-900">{r.name}</h2>
                        {r.priceRange && PRICE_LABEL[r.priceRange] && (
                          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
                            {PRICE_LABEL[r.priceRange]}
                          </span>
                        )}
                      </div>
                      {(r.location || cuisinesText) && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                          {r.location && (
                            <>
                              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>{r.location}</span>
                            </>
                          )}
                          {r.location && cuisinesText && <span aria-hidden="true">·</span>}
                          {cuisinesText && <span>{cuisinesText}</span>}
                        </p>
                      )}
                      {r.shortDescription && (
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">
                          {r.shortDescription}
                        </p>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}
