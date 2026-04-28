import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanity';

// In-memory cache so a singleton is fetched once per session.
const cache = new Map<string, unknown>();

/**
 * Fetch a Sanity singleton document where _id == _type.
 * Returns the fallback immediately while the request is in flight.
 *
 * Usage:
 *   const hero = useSanityDoc<HeroDoc>('hero', heroFallback);
 */
export function useSanityDoc<T>(type: string, fallback: T): {
  data: T;
  loading: boolean;
  error: Error | null;
} {
  const cached = cache.get(type) as T | undefined;
  const [data, setData] = useState<T>(cached ?? fallback);
  const [loading, setLoading] = useState<boolean>(!cache.has(type));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cache.has(type)) return;

    let cancelled = false;
    const query = `*[_type == $type && _id == $type][0]`;

    sanityClient
      .fetch<T | null>(query, { type })
      .then((result) => {
        if (cancelled) return;
        const merged = result ? { ...fallback, ...result } : fallback;
        cache.set(type, merged);
        setData(merged as T);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        // On failure, silently fall back so the page still renders.
        console.warn(`[sanity] Failed to fetch '${type}':`, e);
        setError(e as Error);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // We intentionally don't depend on `fallback` — it's the initial seed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return { data, loading, error };
}
