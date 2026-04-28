import { CheckCircle2 } from 'lucide-react';
import { useSanityDoc } from '../hooks/useSanityDoc';
import type { WhyChooseUsDoc } from '../types/sanity';
import { SanityImage } from './SanityImage';
import heroFallback from '../assets/hero-collage.webp';

const FALLBACK: WhyChooseUsDoc = {
  heading: 'Built for travellers and locals — not for ad revenue',
  subheading:
    "We don't take payments from restaurants. We don't run ads. The only goal is to put you in front of food worth driving across Pondicherry for.",
  benefits: [
    {
      title: 'Zero pay-to-play listings',
      body: 'No restaurant has ever paid to be featured. Every recommendation passes a personal taste test.',
    },
    {
      title: 'Local Tamil + French + Creole expertise',
      body: 'Our team grew up eating here. We know which kuzhipaniyaram is worth the wait and which croissant is from frozen dough.',
    },
    {
      title: 'Honest dish-level recommendations',
      body: 'We tell you exactly what to order — and which best-sellers to skip — at each restaurant.',
    },
    {
      title: 'Mobile-first directions',
      body: 'Every entry has a working Google Maps link. No copying addresses or asking three rickshaw drivers.',
    },
  ],
};

export const WhyChooseUs = () => {
  const { data } = useSanityDoc<WhyChooseUsDoc>('whyChooseUs', FALLBACK);
  const benefits = data.benefits ?? [];

  return (
    <section className="bg-gray-50 py-20 sm:py-24" aria-labelledby="why-us-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-3xl bg-gray-200 shadow-xl">
              {data.image?.asset?._ref ? (
                <SanityImage
                  image={data.image}
                  alt={data.heading ?? ''}
                  width={1200}
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              ) : (
                <img
                  src={heroFallback}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Copy */}
          <div className="order-2 lg:order-1">
            <h2
              id="why-us-heading"
              className="text-3xl font-extrabold tracking-tight text-gray-900 text-balance sm:text-4xl"
            >
              {data.heading}
            </h2>
            {data.subheading && (
              <p className="mt-5 text-lg leading-relaxed text-gray-600">{data.subheading}</p>
            )}

            <ul className="mt-10 space-y-6">
              {benefits.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-orange-600" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{b.title}</h3>
                    {b.body && <p className="mt-1 text-sm leading-relaxed text-gray-600">{b.body}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
