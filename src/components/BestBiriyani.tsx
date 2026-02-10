
import { Flame } from 'lucide-react';

export const BestBiriyani = () => {
    const spots = [
        {
            id: 1,
            name: "Kamatchi Biriyani",
            type: "Seeraga Samba",
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
            description: "Legendary for their wood-fired Seeraga Samba biriyani. A local favorite that sells out by 1 PM."
        },
        {
            id: 2,
            name: "Kodai Ispah",
            type: "Mughlai Style",
            image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800",
            description: "Known for rich, flavorful masala and tender meat. The authentic Muslim-style biriyani experience."
        },
        {
            id: 3,
            name: "Copper Kitchen",
            type: "Chettinad",
            image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800",
            description: "Spicy, aromatic, and perfectly spiced. Great spot for families craving authentic Chettinad flavors."
        }
    ];

    return (
        <section id="biriyani" className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2">
                        <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">Taste of Tradition</span>
                        <h2 className="text-3xl font-bold text-gray-900 md:text-5xl mt-2 mb-6">
                            Best Biriyani in Pondicherry
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Pondicherry's biriyani scene is legendary. From the aromatic Seeraga Samba to spicy Chettinad styles, finding the perfect plate is serious business here.
                        </p>

                        <div className="space-y-6">
                            {spots.map((spot) => (
                                <div key={spot.id} className="flex gap-4 items-start p-4 rounded-xl hover:bg-orange-50 transition-colors">
                                    <img
                                        src={spot.image}
                                        alt={spot.name}
                                        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{spot.name}</h3>
                                        <span className="text-orange-600 text-sm font-medium flex items-center gap-1 mb-2">
                                            <Flame className="w-4 h-4" /> {spot.type}
                                        </span>
                                        <p className="text-gray-600 text-sm">{spot.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative">
                            <img
                                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=1000"
                                alt="Authentic Pondicherry Biriyani"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <p className="font-bold text-2xl">"The best biriyani I've ever had!"</p>
                                    <p className="text-orange-300 mt-2">— Food Critic Review</p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100 rounded-full z-[-1]" />
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-50 rounded-full z-[-1]" />
                    </div>
                </div>
            </div>
        </section>
    );
};
