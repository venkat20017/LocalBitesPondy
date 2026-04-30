import type { PortableTextBlock } from '@portabletext/react';
import { ChevronDown } from 'lucide-react';
import { useSanityDoc } from '../hooks/useSanityDoc';
import type { FaqDoc } from '../types/sanity';
import { PortableText } from './PortableText';

const fallbackBlock = (text: string): PortableTextBlock[] => [
  {
    _type: 'block',
    _key: text.slice(0, 8),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', text, marks: [], _key: 'span1' }],
  } as PortableTextBlock,
];

const FALLBACK: FaqDoc = {
  heading: 'Frequently asked questions',
  subheading: 'Everything tourists email us about — answered.',
  items: [
    {
      question: 'Is the guide really free?',
      answer: fallbackBlock(
        'Yes. We send the full PDF to your email after a single form. No paywalls, no upsell.',
      ),
    },
    {
      question: 'How is this different from TripAdvisor or Google Maps?',
      answer: fallbackBlock(
        'TripAdvisor and Google reflect tourist behaviour — long queues at average places. We list where Pondicherry residents actually eat, ranked by food quality, not foot traffic.',
      ),
    },
    {
      question: 'How often is it updated?',
      answer: fallbackBlock(
        'Every week. We add new openings, remove closures, and re-test established spots quarterly. The PDF you download is always the latest version.',
      ),
    },
    {
      question: 'Does it work offline / on mobile?',
      answer: fallbackBlock(
        'Yes — the guide is a downloadable PDF you can keep on your phone. Each restaurant has a Google Maps link that works the second you have signal again.',
      ),
    },
  ],
};

export const FAQ = () => {
  const { data } = useSanityDoc<FaqDoc>('faq', FALLBACK);
  const items = data.items ?? [];

  return (
    <section className="bg-gray-50 py-20 sm:py-24" id="faq" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="faq-heading"
            className="text-3xl font-extrabold tracking-tight text-gray-900 text-balance sm:text-4xl"
          >
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="mt-4 text-lg leading-relaxed text-gray-600">{data.subheading}</p>
          )}
        </div>

        <ul className="mt-12 space-y-3">
          {items.map((item, i) => (
            <li key={i}>
              <details className="group rounded-2xl border border-gray-200 bg-white px-6 py-5 transition open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-gray-900 marker:hidden">
                  {item.question}
                  <ChevronDown
                    className="h-5 w-5 flex-shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="pt-3 text-gray-700">
                  <PortableText value={item.answer} />
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
