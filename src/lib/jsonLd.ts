import type { PortableTextBlock } from '@portabletext/react';
import type { BlogPostDoc, FaqDoc, RestaurantDoc } from '../types/sanity';
import { absoluteUrl, PRIMARY_DOMAIN } from './siteUrl';
import { sanityClient } from './sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);
const imageToUrl = (image?: { asset?: { _ref?: string } }) =>
  image?.asset?._ref ? builder.image(image).width(1200).auto('format').url() : undefined;

const portableTextToPlain = (blocks?: PortableTextBlock[]) => {
  if (!blocks) return '';
  return blocks
    .map((b) => {
      if (b._type !== 'block') return '';
      const children = (b as unknown as { children?: { text?: string }[] }).children;
      if (!Array.isArray(children)) return '';
      return children.map((c) => c.text ?? '').join('');
    })
    .filter(Boolean)
    .join(' ');
};

/* -------------------------------------------------------------------------- */
/* Generators                                                                  */
/* -------------------------------------------------------------------------- */

export function websiteJsonLd(siteName: string = 'LocalBitesPondy') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    alternateName: 'Local Bites Pondicherry',
    url: PRIMARY_DOMAIN,
    description: 'The local food guide for Pondicherry — hand-picked restaurants, French heritage cafés, and street food spots, with Google Maps links.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${PRIMARY_DOMAIN}/restaurants?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationJsonLd(siteName: string = 'LocalBitesPondy') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: PRIMARY_DOMAIN,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqJsonLd(faq?: FaqDoc) {
  const items = faq?.items ?? [];
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
      .filter((it) => !!it.question)
      .map((it) => ({
        '@type': 'Question',
        name: it.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: portableTextToPlain(it.answer) || it.question,
        },
      })),
  };
}

export function restaurantJsonLd(r: RestaurantDoc) {
  const slug = r.slug?.current ?? '';
  const heroUrl = imageToUrl(r.heroImage);
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: r.name,
    url: absoluteUrl(`/restaurants/${slug}`),
    description: r.shortDescription,
    image: heroUrl ? [heroUrl] : undefined,
    address: r.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: r.address,
          addressLocality: r.location ?? 'Pondicherry',
          addressRegion: 'Puducherry',
          addressCountry: 'IN',
        }
      : undefined,
    servesCuisine: r.cuisines,
    priceRange:
      r.priceRange === 'budget' ? '₹' : r.priceRange === 'mid' ? '₹₹' : r.priceRange === 'premium' ? '₹₹₹' : undefined,
    hasMenu: r.googleMapsUrl,
    sameAs: r.googleMapsUrl ? [r.googleMapsUrl] : undefined,
  };
}

export function articleJsonLd(post: BlogPostDoc) {
  const slug = post.slug?.current ?? '';
  const cover = imageToUrl(post.coverImage);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${slug}`),
    image: cover ? [cover] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    keywords: post.tags?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/blog/${slug}`),
    },
    author: { '@type': 'Organization', name: 'LocalBitesPondy' },
    publisher: {
      '@type': 'Organization',
      name: 'LocalBitesPondy',
      url: PRIMARY_DOMAIN,
    },
  };
}

export function itemListJsonLd(items: { name: string; path: string }[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  };
}
