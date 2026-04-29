import { absoluteUrl, pathFromLocation } from '../lib/siteUrl';

type Props = {
  title: string;
  description?: string;
  /** Path relative to domain (e.g. "/blog/x") or absolute URL. Defaults to current pathname. */
  canonicalPath?: string;
  /** Absolute image URL for OG / Twitter cards. */
  ogImage?: string;
  /** "website" | "article". Default: "website". */
  ogType?: 'website' | 'article';
  /** If true, emits robots noindex,nofollow. */
  noindex?: boolean;
  /** Tab title suffix; defaults to " | LocalBitesPondy". Set "" to disable. */
  titleSuffix?: string;
  /** One or more JSON-LD documents to embed (as plain JS objects). */
  jsonLd?: object | object[] | null;
  /** Override site name used for og:site_name. */
  siteName?: string;
};

const DEFAULT_OG_IMAGE = absoluteUrl('/og-image.jpg');

/**
 * Renders SEO head tags using React 19's native document-head hoisting:
 * <title>, <meta>, <link rel="canonical">. JSON-LD <script> tags are
 * rendered inline in the body (Google reads from anywhere on the page;
 * inline <script type="application/ld+json"> is not auto-hoisted).
 *
 * Place this once near the top of each page component.
 */
export function PageSEO({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = 'website',
  noindex = false,
  titleSuffix = ' | LocalBitesPondy',
  jsonLd,
  siteName = 'LocalBitesPondy',
}: Props) {
  const fullTitle = title.endsWith(titleSuffix) ? title : `${title}${titleSuffix}`;
  const path = canonicalPath ?? (typeof window !== 'undefined' ? pathFromLocation() : '/');
  const canonical = absoluteUrl(path);
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  const lds = jsonLd == null ? [] : Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {lds.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
