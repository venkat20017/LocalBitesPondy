
import { Star, MapPin, ArrowRight } from 'lucide-react';

export const BestHotels = () => {
    const hotels = [
        {
            id: 1,
            name: "Palais de Mahe",
            rating: "4.8",
            location: "White Town",
            price: "Luxury",
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
            description: "Colonial-style architecture with modern luxury in the heart of the French Quarter.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Palais+de+Mahe+Pondicherry"
        },
        {
            id: 2,
            name: "Villa Shanti",
            rating: "4.7",
            location: "White Town",
            price: "Mid-Range",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
            description: "Award-winning heritage hotel known for its minimalist design and courtyard dining.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Villa+Shanti+Pondicherry"
        },
        {
            id: 3,
            name: "The Promenade",
            rating: "4.5",
            location: "Rock Beach",
            price: "Luxury",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
            description: "Ocean-facing rooms with a stunning rooftop bar overlooking the Bay of Bengal.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=The+Promenade+Pondicherry"
        }
    ];

    return (
        <section id="hotels" className="py-20 bg-orange-50">
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-16">
                    <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">Stay in Style</span>
                    <h2 className="text-3xl font-bold text-gray-900 md:text-5xl mt-2 mb-6">
                        Best Hotels in Pondicherry
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Top-rated stays in Pondicherry. From heritage villas in White Town to beachfront resorts, book your perfect accommodation.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {hotels.map((hotel) => (
                        <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                            <div className="relative h-64">
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-gray-900 shadow-sm">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    {hotel.rating}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
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
                                <p className="text-gray-600 mb-6 flex-grow">
                                    {hotel.description}
                                </p>
                                <a
                                    href={hotel.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
                                >
                                    Check Availability
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
