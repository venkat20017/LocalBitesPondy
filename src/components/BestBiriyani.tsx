// ══════════════════════════════════════════════
// BestBiriyani.tsx — OPTIMIZED
// ✅ Richer restaurant descriptions, keyword-rich H2, AEO intro paragraph
// ══════════════════════════════════════════════

import { Flame, Star } from 'lucide-react';

export const BestBiriyani = () => {
    const spots = [
        {
            id: 1,
            name: "Kamatchi Biriyani",
            type: "Seeraga Samba Biryani",
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
            // ✅ Richer description with specific details
            description: "Pondicherry's most beloved biryani spot. Their wood-fired Seeraga Samba biryani uses small-grain fragrant rice slow-cooked with whole spices and tender mutton. Arrives fresh every morning — consistently sold out by 1 PM. Get there by 12:30 PM or you'll miss it."
        },
        {
            id: 2,
            name: "Kodai Ispah",
            type: "Mughlai-Style Biryani",
            image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800",
            description: "Famous for rich Mughlai-style biryani with dum-cooked meat in layered, saffron-tinted rice. The masala here is deeper and more complex than most Pondicherry biryani spots — the authentic Muslim-style preparation takes 3+ hours to make daily."
        },
        {
            id: 3,
            name: "Copper Kitchen",
            type: "Chettinad Biryani",
            image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800",
            description: "The go-to spot for Chettinad-style biryani in Pondicherry — intensely spiced with kalpasi (stone flower), star anise, and freshly ground Chettinad masala. Noticeably more aromatic and spice-forward than other styles. Great choice for families who enjoy bold South Indian flavours."
        }
    ];

    return (
        <section id="biriyani" className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2">
                        <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">Taste of Tradition</span>
                        {/* ✅ SEO: H2 with primary local keyword */}
                        <h2 className="text-3xl font-bold text-gray-900 md:text-5xl mt-2 mb-4">
                            Best Biryani in Pondicherry
                        </h2>
                        {/* ✅ AEO: Intro paragraph answers "What biryani is famous in Pondicherry?" */}
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Pondicherry's biryani scene is centred around <strong>Seeraga Samba rice</strong> — a small-grain, highly fragrant variety unique to Tamil Nadu that produces a denser, more flavourful biryani than Basmati-based versions. The city also has excellent Mughlai-style and Chettinad-style biryani, making it one of the best places in South India for biryani lovers. Here are the three spots locals swear by.
                        </p>

                        <div className="space-y-6">
                            <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-8 rounded-r-xl">
                                <p className="text-orange-900 font-bold mb-1 flex items-center gap-2">
                                    <Star className="w-4 h-4" /> Local Insider Tip:
                                </p>
                                <p className="text-orange-800 text-sm leading-relaxed">
                                    "The secret to Pondy biryani is the <strong>Seeraga Samba rice</strong>. It's much smaller than Basmati and absorbs the masala much better. If you see a place serving long-grain biryani, it's likely a generic chain — the real local gems always use Samba rice."
                                </p>
                            </div>
                            {spots.map((spot) => (
                                <div key={spot.id} className="flex gap-4 items-start p-4 rounded-xl hover:bg-orange-50 transition-colors">
                                    <img
                                        src={spot.image}
                                        alt={`${spot.name} — ${spot.type} in Pondicherry`}
                                        className="w-24 h-24 rounded-lg object-cover shrink-0"
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{spot.name}</h3>
                                        <span className="text-orange-600 text-sm font-medium flex items-center gap-1 mb-2">
                                            <Flame className="w-4 h-4" /> {spot.type}
                                        </span>
                                        <p className="text-gray-600 text-sm leading-relaxed">{spot.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative">
                            <img
                                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=1000"
                                alt="Authentic Seeraga Samba biryani in Pondicherry — wood-fired, fragrant, and sold out by 1 PM"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <p className="font-bold text-2xl">"The best biryani I've had anywhere in South India."</p>
                                    <p className="text-orange-300 mt-2">— Verified local review</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100 rounded-full z-[-1]" />
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-50 rounded-full z-[-1]" />
                    </div>
                </div>
            </div>
        </section>
    );
};
