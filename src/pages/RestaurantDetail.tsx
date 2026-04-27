import { useParams } from 'react-router-dom';

export default function RestaurantDetail() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Restaurant: {slug}</h1>
      <p className="mt-4 text-gray-600">Detail page placeholder. Wired up in Phase 6.</p>
    </main>
  );
}
