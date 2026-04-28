import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2025-04-28';

if (!projectId || !dataset) {
  throw new Error(
    'Missing VITE_SANITY_PROJECT_ID or VITE_SANITY_DATASET. Check your .env file.',
  );
}

export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: SanityImageSource) => builder.image(source);

export async function getSingleton<T>(type: string): Promise<T | null> {
  const query = `*[_type == $type && _id == $type][0]`;
  return sanityClient.fetch<T>(query, { type });
}

export async function getCollection<T>(type: string): Promise<T[]> {
  const query = `*[_type == $type] | order(_createdAt desc)`;
  return sanityClient.fetch<T[]>(query, { type });
}

export async function getBySlug<T>(type: string, slug: string): Promise<T | null> {
  const query = `*[_type == $type && slug.current == $slug][0]`;
  return sanityClient.fetch<T>(query, { type, slug });
}
