// ══════════════════════════════════════════════
// BestHotels.tsx — OPTIMIZED
// ✅ Richer hotel descriptions, SEO H2, AEO intro paragraph, better alt text
// ══════════════════════════════════════════════

import { Star, MapPin, ArrowRight } from 'lucide-react';

export const BestHotels = () => {
    const hotels = [
        {
            id: 1,
            name: "Palais de Mahe",
            rating: "4.8",
            location: "White Town, French Quarter",
            price: "Luxury",
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
            // ✅ Richer description with specific details
            description: "A beautifully restored colonial mansion in the heart of Pondicherry's French Quarter. Features 14 elegant rooms, a serene courtyard pool, and is walking distance from the best French cafés and heritage restaurants in White Town. Ideal for food lovers who want to stay in the thick of the culinary action.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Palais+de+Mahe+Pondicherry"
        },
        {
            id: 2,
            name: "Villa Shanti",
            rating: "4.7",
            location: "White Town, French Quarter",
            price: "Mid-Range",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
            description: "Award-winning heritage boutique hotel with minimalist design and an outstanding in-house restaurant — arguably one of the best French-Tamil fusion dining experiences in Pondicherry. The courtyard dining area at Villa Shanti is a must even if you're not staying here.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Villa+Shanti+Pondicherry"
        },
        {
            id: 3,
            name: "The Promenade",
            rating: "4.5",
            location: "Rock Beach, Promenade",
            price: "Luxury",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
            description: "Pondicherry's premier beachfront hotel with ocean-facing rooms and a stunning rooftop bar overlooking the Bay of Bengal. Best location for accessing the beach promenade street food scene in the evenings, and the rooftop sundowner is a Pondicherry experience in itself.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=The+Promenade+Pondicherry"
        }
    ];

    return (
        <section id="hotels" className="py-20 bg-orange-50">
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-16">
                    <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">Where to Stay</span>
                    {/* ✅ SEO: H2 with local keyword */}
                    <h2 className="text-3xl font-bold text-gray-900 md:text-5xl mt-2 mb-4">
                        Best Hotels in Pondicherry
                    </h2>
                    {/* ✅ AEO: Intro paragraph answers "Where should I stay in Pondicherry?" */}
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Where you stay in Pondicherry significantly affects your food experience. Staying in White Town (French Quarter) puts you within walking distance of the best French cafés and heritage restaurants. Staying near Rock Beach gives you direct access to the beach promenade street food scene. Here are the top-rated hotels in each area.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {hotels.map((hotel) => (
                        <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                            <div className="relative h-64">
                                <img
                                    src={hotel.image}
                                    alt={`${hotel.name} — ${hotel.location} Pondicherry hotel`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-gray-900 shadow-sm">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    {hotel.rating}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                                            <MapPin className="w-4 h-4" />
                                            {hotel.location}
                                        </div>
                                    </div>
                                    <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        {hotel.price}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-6 grow leading-relaxed">
                                    {hotel.description}
                                </p>
                                <a
                                    href={hotel.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
                                >
                                    View on Google Maps
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
