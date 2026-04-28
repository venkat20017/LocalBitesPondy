import { useSanityDoc } from '../hooks/useSanityDoc';
import type { ValuePropsDoc } from '../types/sanity';
import { LucideIcon } from '../lib/lucideIcon';

const FALLBACK: ValuePropsDoc = {
  heading: 'Why food lovers in Pondicherry trust this guide',
  subheading: 'Skip the tourist traps. Eat where locals eat — every spot vetted, mapped, and tasted.',
  items: [
    {
      icon: 'MapPin',
      title: 'Hand-picked by locals',
      body: 'Every spot is personally visited and vetted by long-time Pondicherry residents — no paid placements, no algorithms.',
    },
    {
      icon: 'Compass',
      title: 'Real Google Maps links',
      body: 'No vague "near the beach" directions. Tap, drive, eat. Each restaurant comes with the exact map pin.',
    },
    {
      icon: 'Coffee',
      title: 'French heritage to street food',
      body: 'From 100-year-old boulangeries to 5am breakfast carts — the full range of what makes Pondy food unique.',
    },
    {
      icon: 'Clock',
      title: 'Updated every week',
      body: 'New openings, closures, and tasting notes added regularly. We delete what no longer deserves the list.',
    },
  ],
};

export const ValueProps = () => {
  const { data } = useSanityDoc<ValuePropsDoc>('valueProps', FALLBACK);
  const items = data.items ?? [];

  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="value-props-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="value-props-heading"
            className="text-3xl font-extrabold tracking-tight text-gray-900 text-balance sm:text-4xl"
          >
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="mt-4 text-lg leading-relaxed text-gray-600">{data.subheading}</p>
          )}
        </div>

        <ul className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li
              key={i}
              className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100 transition group-hover:bg-orange-100">
                <LucideIcon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">{item.title}</h3>
              {item.body && <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
