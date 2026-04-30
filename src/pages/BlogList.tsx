import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSanityCollection } from '../hooks/useSanityQuery';
import type { BlogPostDoc } from '../types/sanity';
import { SanityImage } from '../components/SanityImage';
import { PageSEO } from '../components/PageSEO';
import { breadcrumbJsonLd, itemListJsonLd } from '../lib/jsonLd';

function formatDate(iso?: string) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function BlogList() {
  const { data: posts, loading } = useSanityCollection<BlogPostDoc>('blogPost', {
    orderBy: 'publishedAt desc',
  });

  const itemList = itemListJsonLd(
    posts
      .filter((p) => p.slug?.current && p.title)
      .map((p) => ({ name: p.title as string, path: `/blog/${p.slug?.current}` })),
    'LocalBitesPondy Blog',
  );

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]);

  return (
    <>
      <PageSEO
        title="Pondicherry Food Blog — Stories Locals Actually Read"
        description="New restaurant openings, deep dives into Pondicherry's French and Tamil food scenes, and locals-only tips. Updated weekly."
        canonicalPath="/blog"
        jsonLd={[itemList, breadcrumbs]}
      />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
            Stories from Pondicherry
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 text-balance sm:text-5xl">
            The food blog
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            New openings, deep dives into local cuisine, and where to actually eat — written by
            people who live here.
          </p>
        </header>

        {loading && posts.length === 0 && (
          <p className="mt-12 text-center text-sm text-gray-500">Loading posts…</p>
        )}

        {!loading && posts.length === 0 && (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-base text-gray-700">
              New posts go live every week. Check back shortly.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Browse the food guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {posts.length > 0 && (
          <ul className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => {
              const slug = p.slug?.current ?? '';
              return (
                <li key={p._id ?? slug}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
                    <Link to={`/blog/${slug}`} className="absolute inset-0 z-10" aria-label={p.title ?? 'Post'} />
                    {p.coverImage?.asset?._ref && (
                      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                        <SanityImage
                          image={p.coverImage}
                          alt={p.title ?? ''}
                          width={800}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-col p-5">
                      {p.publishedAt && (
                        <time
                          dateTime={p.publishedAt}
                          className="text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          {formatDate(p.publishedAt)}
                        </time>
                      )}
                      <h2 className="mt-2 text-lg font-bold tracking-tight text-gray-900">
                        {p.title}
                      </h2>
                      {p.excerpt && (
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.excerpt}</p>
                      )}
                      {p.tags && p.tags.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {p.tags.slice(0, 3).map((t) => (
                            <li
                              key={t}
                              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700"
                            >
                              #{t}
                            </li>
                          ))}
                        </ul>
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
