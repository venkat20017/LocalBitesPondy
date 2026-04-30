import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanity';

// Two small in-memory caches so repeat visits within a session don't
// re-fetch from the API. Both cleared on full page reload.
const collectionCache = new Map<string, unknown[]>();
const slugCache = new Map<string, unknown>();

const collectionKey = (type: string, orderBy?: string) =>
  `${type}|${orderBy ?? '_createdAt desc'}`;

const slugKey = (type: string, slug: string) => `${type}|${slug}`;

/**
 * Fetch all documents of a given type, optionally ordered.
 *
 * @param type    Sanity document type (e.g. 'restaurant', 'blogPost')
 * @param options orderBy: GROQ order clause without "order(...)"
 *                e.g. 'publishedAt desc', 'name asc'
 */
export function useSanityCollection<T>(
  type: string,
  options: { orderBy?: string } = {},
): { data: T[]; loading: boolean; error: Error | null } {
  const key = collectionKey(type, options.orderBy);
  const cached = collectionCache.get(key) as T[] | undefined;
  const [data, setData] = useState<T[]>(cached ?? []);
  const [loading, setLoading] = useState<boolean>(!collectionCache.has(key));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (collectionCache.has(key)) return;
    let cancelled = false;
    const order = options.orderBy ?? '_createdAt desc';
    const query = `*[_type == $type] | order(${order})`;

    sanityClient
      .fetch<T[]>(query, { type })
      .then((result) => {
        if (cancelled) return;
        const list = result ?? [];
        collectionCache.set(key, list);
        setData(list);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        console.warn(`[sanity] Failed to fetch collection '${type}':`, e);
        setError(e as Error);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { data, loading, error };
}

/**
 * Fetch a single document by its slug.current value.
 * Returns notFound=true once the request completes with no match.
 */
export function useSanityBySlug<T>(
  type: string,
  slug: string | undefined,
): { data: T | null; loading: boolean; error: Error | null; notFound: boolean } {
  const key = slug ? slugKey(type, slug) : null;
  const cached = key ? (slugCache.get(key) as T | null | undefined) : undefined;
  const [data, setData] = useState<T | null>(cached ?? null);
  const [loading, setLoading] = useState<boolean>(!!slug && cached === undefined);
  const [error, setError] = useState<Error | null>(null);
  const [notFound, setNotFound] = useState<boolean>(cached === null);

  useEffect(() => {
    if (!slug || !key) {
      setLoading(false);
      return;
    }
    if (slugCache.has(key)) return;

    let cancelled = false;
    const query = `*[_type == $type && slug.current == $slug][0]`;

    sanityClient
      .fetch<T | null>(query, { type, slug })
      .then((result) => {
        if (cancelled) return;
        slugCache.set(key, result ?? null);
        setData(result ?? null);
        setNotFound(result == null);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        console.warn(`[sanity] Failed to fetch '${type}' by slug '${slug}':`, e);
        setError(e as Error);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, type, slug]);

  return { data, loading, error, notFound };
}
