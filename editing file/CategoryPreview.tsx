// ══════════════════════════════════════════════
// CategoryPreview.tsx — OPTIMIZED
// ✅ H2 keyword-rich, richer category descriptions, better alt text
// ══════════════════════════════════════════════

import frenchCafeImg from '../assets/cat-french-cafe.webp';
import tamilBreakfastImg from '../assets/cat-tamil-breakfast.webp';
import seafoodImg from '../assets/cat-seafood.webp';
import budgetImg from '../assets/cat-budget.webp';
import beachDiningImg from '../assets/cat-beach-dining.webp';

export const CategoryPreview = () => {
    const categories = [
        {
            id: 1,
            name: "French Cafés & Bakeries",
            alt: "French cafes and bakeries in Pondicherry White Town — croissants and coffee",
            image: frenchCafeImg,
            count: "3 spots included",
            description: "The only place in South India with authentic French boulangeries that have been baking since the colonial era. Flaky croissants, pain au chocolat, fresh baguettes, and courtyard cafés serving French filter coffee. These spots sell out before 9 AM — our guide tells you exactly when to arrive."
        },
        {
            id: 2,
            name: "Authentic Tamil Breakfast",
            alt: "Tamil breakfast in Pondicherry — idli, dosa, filter coffee and sambar",
            image: tamilBreakfastImg,
            count: "3 spots included",
            description: "Start your day the way Pondicherry locals have for generations — crispy dosas with freshly ground coconut chutney, steaming idlis, aromatic sambar, and strong filter coffee. These tiffin centres open at 6 AM and serve some of the best South Indian breakfast you'll find anywhere in Tamil Nadu."
        },
        {
            id: 3,
            name: "Fresh Seafood Restaurants",
            alt: "Fresh seafood in Pondicherry — prawn masala, crab curry and grilled fish",
            image: seafoodImg,
            count: "3 spots included",
            description: "Pondicherry's fishing boats bring in fresh catches every morning from the Bay of Bengal. The best seafood restaurants source directly from local fishermen, serving prawn masala, Nandu Kuzhambu (crab curry), grilled lobster with garlic butter, and whole fish fry with spiced marinade. Our guide shows you where to eat seafood like a Pondicherry local."
        },
        {
            id: 4,
            name: "Budget Eats Under ₹200",
            alt: "Budget food in Pondicherry — biryani, thali and street snacks under 200 rupees",
            image: budgetImg,
            count: "3 spots included",
            description: "Incredible authentic Pondicherry food for under ₹200 per meal. Think full Tamil thali on banana leaf for ₹80, Seeraga Samba biryani for ₹120, and street-side kothu parotta for ₹60. These are the spots locals eat at daily — where the food is best and the prices are lowest."
        },
        {
            id: 5,
            name: "Romantic Beachside Dining",
            alt: "Beachside dining in Pondicherry — seafood dinner by the beach at sunset",
            image: beachDiningImg,
            count: "3 spots included",
            description: "Dinner with the Bay of Bengal as your backdrop — waves, candlelight, and fresh grilled seafood. Pondicherry's beachfront restaurants offer everything from affordable open-air fish grills to upscale candlelit dinners with wine pairings. Perfect for a special evening or a memorable last night in the city."
        }
    ];

    return (
        <section id="famous-food" className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-16">
                    {/* ✅ SEO: H2 with primary keyword + numbers (click-worthy) */}
                    <h2 className="text-3xl font-bold text-gray-900 md:text-5xl mb-6">
                        15 Famous Food Spots in Pondicherry Across 5 Categories
                    </h2>
                    {/* ✅ AEO: This paragraph directly answers "What food is Pondicherry known for?" */}
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Pondicherry's food scene spans French colonial bakeries, traditional Tamil breakfast stalls, Bay of Bengal seafood, fragrant biriyani spots, and beachside dining — all within a few kilometres of each other. We've handpicked and personally verified 15 local spots (3 per category) that represent the real culinary identity of Pondicherry. No tourist traps. No paid inclusions.
                    </p>
                    <div className="max-w-4xl mx-auto bg-orange-50 p-6 rounded-xl border border-orange-100">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Each spot in this guide comes with the exact Google Maps link, our recommended must-order dish, the best time to visit, local price range, and insider tips that no travel blog covers. Download the free PDF and have it ready on your phone when you arrive in Pondicherry.
                        </p>
                    </div>
                </div>

                <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8 md:overflow-visible lg:grid-cols-5">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="group relative shrink-0 w-72 snap-center overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-2xl md:w-auto h-[400px]"
                        >
                            <div className="absolute inset-0 h-full w-full">
                                <img
                                    src={cat.image}
                                    alt={cat.alt}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                            </div>
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                    <h3 className="text-2xl font-bold leading-tight mb-2">{cat.name}</h3>
                                    <p className="text-orange-300 font-semibold mb-3">{cat.count}</p>
                                    <p className="text-gray-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-4">
                                        {cat.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
