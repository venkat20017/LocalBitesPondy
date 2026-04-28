import { ArrowUpRight } from 'lucide-react';
import { useSanityDoc } from '../hooks/useSanityDoc';
import type { FeaturedContentDoc } from '../types/sanity';
import { SanityImage } from './SanityImage';
import { SmartCta } from './SmartCta';
import frenchCafe from '../assets/cat-french-cafe.webp';
import tamilBreakfast from '../assets/cat-tamil-breakfast.webp';
import beachDining from '../assets/cat-beach-dining.webp';

const FALLBACKS: { title: string; body: string; image: string; url: string }[] = [
  {
    title: 'French Heritage Cafés',
    body: '100-year-old boulangeries, slow-pour espresso, and the croissants worth queuing for.',
    image: frenchCafe,
    url: '/restaurants',
  },
  {
    title: 'Tamil Breakfast Spots',
    body: 'Idiyappam, paniyaram, soft idlis — where locals actually eat at 6am.',
    image: tamilBreakfast,
    url: '/restaurants',
  },
  {
    title: 'Beach & Sunset Dining',
    body: 'Seaside tables that don\'t cost ₹3000 a head — fresh seafood, real prices.',
    image: beachDining,
    url: '/restaurants',
  },
];

const FALLBACK: FeaturedContentDoc = {
  heading: 'A food guide for every kind of hunger',
  subheading: 'Whether you have one morning or one week — we\'ll send you to the right table.',
};

export const FeaturedContent = () => {
  const { data } = useSanityDoc<FeaturedContentDoc>('featuredContent', FALLBACK);
  const cards = data.cards ?? [];

  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="featured-heading"
            className="text-3xl font-extrabold tracking-tight text-gray-900 text-balance sm:text-4xl"
          >
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="mt-4 text-lg leading-relaxed text-gray-600">{data.subheading}</p>
          )}
        </div>

        <ul className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.length > 0
            ? cards.map((card, i) => (
                <li key={i}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
                    {card.image?.asset?._ref && (
                      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                        <SanityImage
                          image={card.image}
                          alt={card.title ?? ''}
                          width={800}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-col p-6">
                      <h3 className="text-xl font-bold tracking-tight text-gray-900">{card.title}</h3>
                      {card.body && (
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.body}</p>
                      )}
                      {card.link?.label && (
                        <SmartCta
                          url={card.link.url}
                          external={card.link.external}
                          source={`featured_${i}`}
                          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
                        >
                          {card.link.label}
                          <ArrowUpRight className="h-4 w-4" />
                        </SmartCta>
                      )}
                    </div>
                  </article>
                </li>
              ))
            : FALLBACKS.map((card, i) => (
                <li key={i}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={card.image}
                        alt={card.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col p-6">
                      <h3 className="text-xl font-bold tracking-tight text-gray-900">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.body}</p>
                      <SmartCta
                        url={card.url}
                        source={`featured_fallback_${i}`}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
                      >
                        Browse spots
                        <ArrowUpRight className="h-4 w-4" />
                      </SmartCta>
                    </div>
                  </article>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
};
