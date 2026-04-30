import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSanityBySlug } from '../hooks/useSanityQuery';
import type { BlogPostDoc } from '../types/sanity';
import { SanityImage } from '../components/SanityImage';
import { PortableText } from '../components/PortableText';
import { PageSEO } from '../components/PageSEO';
import { articleJsonLd, breadcrumbJsonLd } from '../lib/jsonLd';
import { imageToOgUrl } from '../lib/sanity';
import { openLeadModal } from '../lib/leadModal';

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

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, loading, notFound } = useSanityBySlug<BlogPostDoc>('blogPost', slug);

  if (loading && !post) {
    return (
      <>
        <PageSEO title="Loading post…" canonicalPath={`/blog/${slug ?? ''}`} noindex />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <p className="text-sm text-gray-500">Loading…</p>
        </main>
      </>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <PageSEO
          title="Post not found"
          description="The blog post you're looking for doesn't exist."
          canonicalPath={`/blog/${slug ?? ''}`}
          noindex
        />
        <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Post not found</h1>
          <p className="mt-3 text-gray-600">
            That post doesn&apos;t exist (yet). Read the latest below.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>
        </main>
      </>
    );
  }

  const seoTitle = post.seo?.metaTitle ?? post.title ?? 'Blog post';
  const seoDescription =
    post.seo?.metaDescription ?? post.excerpt ?? `Story from LocalBitesPondy — ${post.title}.`;
  const ogImg = imageToOgUrl(post.seo?.ogImage) ?? imageToOgUrl(post.coverImage);

  const lds = [
    articleJsonLd(post),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title ?? 'Post', path: `/blog/${post.slug?.current ?? slug ?? ''}` },
    ]),
  ];

  return (
    <>
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/blog/${post.slug?.current ?? slug ?? ''}`}
        ogImage={ogImg}
        ogType="article"
        noindex={post.seo?.noindex}
        jsonLd={lds}
      />
      <main>
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" /> Back to blog
            </Link>
          </nav>

          <header className="border-b border-gray-200 pb-8">
            {post.publishedAt && (
              <time
                dateTime={post.publishedAt}
                className="text-xs font-semibold uppercase tracking-wider text-orange-600"
              >
                {formatDate(post.publishedAt)}
              </time>
            )}
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 text-balance sm:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 text-lg leading-relaxed text-gray-600">{post.excerpt}</p>
            )}
            {post.tags && post.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700"
                  >
                    #{t}
                  </li>
                ))}
              </ul>
            )}
          </header>

          {post.coverImage?.asset?._ref && (
            <div className="my-10 overflow-hidden rounded-2xl bg-gray-100">
              <SanityImage
                image={post.coverImage}
                alt={post.title ?? ''}
                width={1600}
                loading="eager"
                className="aspect-[16/9] h-full w-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-gray mt-8 max-w-none">
            <PortableText value={post.body} />
          </div>

          {/* Footer CTA: convert blog readers into leads */}
          <aside className="mt-16 rounded-2xl border border-orange-200 bg-orange-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">
              Hungry yet? Get the free Pondicherry food guide.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              15 hand-picked spots, every Google Maps link, and what to actually order. Free PDF in
              your inbox the moment you sign up.
            </p>
            <button
              type="button"
              onClick={() => openLeadModal('blog_post')}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-orange-700"
            >
              Send me the guide <ArrowRight className="h-4 w-4" />
            </button>
          </aside>
        </article>
      </main>
    </>
  );
}
