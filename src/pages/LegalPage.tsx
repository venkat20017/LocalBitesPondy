type LegalSlug = 'privacy-policy' | 'terms-of-use';

export default function LegalPage({ slug }: { slug: LegalSlug }) {
  const title = slug === 'privacy-policy' ? 'Privacy Policy' : 'Terms of Use';
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="mt-4 text-gray-600">
        Legal copy is CMS-driven from Sanity (Portable Text). Wired up in Phase 6.
      </p>
    </main>
  );
}
