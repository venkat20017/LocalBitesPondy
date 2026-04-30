import { useSanityDoc } from '../hooks/useSanityDoc';
import type { AboutUsDoc } from '../types/sanity';
import { SanityImage } from '../components/SanityImage';
import { PortableText } from '../components/PortableText';
import { PageSEO } from '../components/PageSEO';
import { breadcrumbJsonLd, organizationJsonLd } from '../lib/jsonLd';

const FALLBACK: AboutUsDoc = {
  heading: 'About LocalBitesPondy',
  subheading: 'A food guide built by Pondicherry locals, for everyone tired of TripAdvisor.',
  mission:
    "We exist to put you in front of food worth driving across town for. No paid placements, no sponsored content, no SEO-spam listicles. Just a small team of locals tasting and writing.",
  team: [
    {
      name: 'Venkatesh Prasad',
      role: 'Founder',
      bio: 'Pondicherry resident since 2009. Eats out four nights a week, drives a Royal Enfield, never takes free meals from restaurants.',
    },
  ],
};

export default function AboutUs() {
  const { data } = useSanityDoc<AboutUsDoc>('aboutUs', FALLBACK);

  const seoTitle = data.seo?.metaTitle ?? data.heading ?? 'About LocalBitesPondy';
  const seoDescription =
    data.seo?.metaDescription ??
    data.subheading ??
    "Why LocalBitesPondy exists, who's behind it, and how we pick the food we recommend.";

  return (
    <>
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/about-us"
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about-us' },
          ]),
        ]}
      />

      <main>
        <article>
          {data.heroImage?.asset?._ref && (
            <div className="bg-gray-100">
              <SanityImage
                image={data.heroImage}
                alt={data.heading ?? ''}
                width={2000}
                loading="eager"
                className="mx-auto block aspect-[16/9] h-full w-full max-w-7xl object-cover sm:rounded-b-3xl"
              />
            </div>
          )}

          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <header className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
                About us
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 text-balance sm:text-5xl">
                {data.heading}
              </h1>
              {data.subheading && (
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
                  {data.subheading}
                </p>
              )}
            </header>

            {data.mission && (
              <section className="mt-12 rounded-2xl border border-orange-200 bg-orange-50 p-6 sm:p-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-700">
                  Our mission
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-gray-800">{data.mission}</p>
              </section>
            )}

            {data.body && data.body.length > 0 && (
              <section className="mt-12">
                <PortableText value={data.body} />
              </section>
            )}

            {data.team && data.team.length > 0 && (
              <section className="mt-16">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">The team</h2>
                <ul className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {data.team.map((m, i) => (
                    <li
                      key={i}
                      className="flex flex-col items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6"
                    >
                      {m.photo?.asset?._ref ? (
                        <SanityImage
                          image={m.photo}
                          alt={m.name ?? ''}
                          width={160}
                          height={160}
                          className="h-20 w-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-700">
                          {(m.name ?? '?').charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{m.name}</h3>
                        {m.role && <p className="text-sm font-medium text-orange-600">{m.role}</p>}
                        {m.bio && (
                          <p className="mt-2 text-sm leading-relaxed text-gray-600">{m.bio}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
