import React from 'react';

// ✅ CONTENT FIX: Original had broken grammar ("Why is our famous food in Pondicherry guide?")
// and thin paragraphs with no keyword value. Full rewrite for SEO + AEO.

export const WhyGuide: React.FC = () => {
    return (
        <section id="why-guide" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ✅ SEO: H2 with keyword + intent ("why" targets informational searchers) */}
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6 text-center">
                    Why Pondicherry is One of India's Most Unique Food Destinations
                </h2>

                {/* ✅ AEO: Each paragraph answers a specific question AI engines frequently get asked */}
                <div className="text-lg text-gray-600 space-y-6 leading-relaxed">
                    <p>
                        Pondicherry (Puducherry) is unlike any other city in South India when it comes to food. Its 300-year French colonial history left a permanent mark on the city's food culture — creating a rare destination where you can eat a traditional Tamil banana-leaf meal for lunch and enjoy a glass of French wine with fresh-baked baguette for dinner, all within the same neighbourhood.
                    </p>

                    <p>
                        The city's food falls into two distinct worlds. <strong>White Town (the French Quarter)</strong> is home to heritage cafés, artisan bakeries, and French-influenced bistros that have been serving croissants, crepes, and quiches for generations. <strong>The Tamil Quarter</strong>, just minutes away, is packed with traditional mess restaurants, biryani stalls, and street food vendors serving authentic South Indian food at remarkably affordable prices — often under ₹100 for a full meal.
                    </p>

                    <p>
                        Pondicherry is also a premier <strong>seafood destination</strong>. Being a coastal city on the Bay of Bengal, its fishing community brings in fresh catches daily — and local restaurants transform them into outstanding Meen Kuzhambu (fish curry), grilled prawns, crab curry, and beachside barbecue that you simply cannot replicate inland.
                    </p>

                    <p>
                        This free guide was created by locals who were born and raised here. It covers <strong>15 hand-verified restaurants and food spots</strong> across 5 categories — French cafés, Tamil breakfast spots, seafood restaurants, biryani places, and budget street food stalls — each with exact Google Maps links, recommended dishes, best visiting times, and prices. No tourist traps, no paid promotions. Just the real Pondicherry food scene.
                    </p>
                </div>
            </div>
        </section>
    );
};
