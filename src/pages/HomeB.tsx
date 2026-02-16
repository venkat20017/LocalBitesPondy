import { useEffect } from 'react';

export const HomeB = () => {
    useEffect(() => {
        const metaId = 'robots-noindex-home-b';
        let meta = document.getElementById(metaId);

        if (!meta) {
            meta = document.createElement('meta');
            meta.id = metaId;
            meta.name = 'robots';
            meta.content = 'noindex';
            document.head.appendChild(meta);
        }

        return () => {
            const existingMeta = document.getElementById(metaId);
            if (existingMeta) {
                document.head.removeChild(existingMeta);
            }
        };
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 font-sans text-gray-800">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-orange-600">Famous Foods of Pondicherry</h1>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Introduction to Pondicherry Cuisine</h2>
                <p className="mb-4 leading-relaxed">
                    Pondicherry (also known as Puducherry) is one of India’s most distinctive culinary destinations. The city’s food culture is shaped by a rare blend of Tamil heritage and French colonial influence. From authentic South Indian meals served on banana leaves to European-style pastries in heritage cafés, Pondicherry cuisine offers a balanced fusion of spice, freshness, and elegance.
                </p>
                <p className="leading-relaxed">
                    Its coastal location further enhances the dining experience with abundant seafood and vibrant local markets.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Traditional Tamil Dishes in Pondicherry</h2>
                <p className="mb-4 leading-relaxed">The foundation of Pondicherry’s cuisine lies in Tamil culinary traditions.</p>
                <p className="mb-4 font-medium">Popular traditional dishes include:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Meen Kuzhambu (Fish Curry)</strong> – A tangy tamarind-based curry with curry leaves and mustard seeds.</li>
                    <li><strong>Karaikudi-style Chicken Curry</strong> – Rich in black pepper and roasted spices.</li>
                    <li><strong>Sambar & Rasam</strong> – Lentil-based gravies paired with rice.</li>
                    <li><strong>Idli & Dosa</strong> – Fermented rice-lentil dishes served with chutney and sambar.</li>
                </ul>
                <p className="leading-relaxed">These dishes are deeply rooted in local households and traditional Tamil restaurants across the city.</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Popular French Influenced Foods</h2>
                <p className="mb-4 leading-relaxed">French rule left a strong culinary imprint on Pondicherry. Today, visitors can enjoy:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Croissants & Baguettes</strong> – Freshly baked in French-style bakeries.</li>
                    <li><strong>Crepes (Sweet & Savory)</strong> – Often filled with chocolate, fruits, cheese, or Indian masala blends.</li>
                    <li><strong>Ratatouille (Local Variation)</strong> – A vegetable stew adapted with Indian spices.</li>
                    <li><strong>Quiches & Continental Breakfasts</strong> – Popular in heritage cafés in White Town.</li>
                </ul>
                <p className="leading-relaxed">This fusion makes Pondicherry unique compared to other South Indian cities.</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Seafood Specialties in Pondicherry</h2>
                <p className="mb-4 leading-relaxed">Being a coastal town, Pondicherry is known for fresh seafood prepared in both Tamil and continental styles.</p>
                <p className="mb-4 font-medium">Must-try seafood dishes include:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Prawn Masala</li>
                    <li>Grilled Lobster with Garlic Butter</li>
                    <li>Crab Curry (Nandu Kuzhambu)</li>
                    <li>Fish Fry with Spiced Marinade</li>
                </ul>
                <p className="leading-relaxed">Fresh catch is often sourced daily, ensuring authentic flavors and quality.</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Street Food Delights in Pondicherry</h2>
                <p className="mb-4 leading-relaxed">Street food plays an important role in the local food scene.</p>
                <p className="mb-4 font-medium">Popular street food options:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Sundal (spiced chickpeas)</li>
                    <li>Bajji & Bonda</li>
                    <li>Egg Kothu Parotta</li>
                    <li>Masala Pori</li>
                </ul>
                <p className="leading-relaxed">Evening street stalls near beaches and busy markets offer affordable and flavorful experiences.</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Best Restaurants to Taste Pondicherry's Famous Foods</h2>

                <h3 className="text-xl font-medium mb-2 text-gray-800">Dining at Traditional Tamil Restaurants</h3>
                <p className="mb-4 leading-relaxed">Traditional Tamil restaurants provide authentic meals served on banana leaves. These establishments focus on home-style gravies, rice meals, and seafood curries prepared using age-old recipes.</p>
                <p className="mb-4 leading-relaxed">Look for local mess-style eateries for the most authentic experience.</p>

                <h3 className="text-xl font-medium mb-2 text-gray-800">French Cafes and Bistros in Pondicherry</h3>
                <p className="mb-4 leading-relaxed">White Town is home to elegant French cafés and colonial-era bistros offering pastries, coffee, and continental dishes.</p>
                <p className="mb-2 font-medium">Notable options include:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>The Pavilion</strong> – Known for multi-cuisine fine dining.</li>
                    <li><strong>Cafe des Arts</strong> – A heritage café famous for French breakfast spreads.</li>
                </ul>
                <p className="heading-relaxed">These cafés attract both tourists and digital nomads seeking relaxed dining environments.</p>

                <h3 className="text-xl font-medium mb-2 text-gray-800">Seafood Restaurants in Pondicherry</h3>
                <p className="mb-4 leading-relaxed">Seafood restaurants specialize in grilled, barbecued, and curry-based preparations.</p>
                <p className="mb-2 font-medium">One of the most recommended places is:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>FinZ - Seafood & Barbeque</strong> – Popular for beachside seafood dining and live grill options.</li>
                </ul>
                <p className="heading-relaxed">Freshness and coastal ambiance make seafood dining a highlight here.</p>

                <h3 className="text-xl font-medium mb-2 text-gray-800">Popular Street Food Stalls</h3>
                <p className="mb-4 leading-relaxed">Local food carts and small roadside vendors offer budget-friendly snacks that reflect true regional flavors. Beach Road and market areas are prime locations for discovering hidden gems.</p>

                <h3 className="text-xl font-medium mb-2 text-gray-800">Vegetarian Options in Pondicherry</h3>
                <p className="mb-4 leading-relaxed">Pondicherry is highly vegetarian-friendly. Many restaurants offer:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Pure vegetarian Tamil meals</li>
                    <li>Jain-friendly options</li>
                    <li>Vegan salads and continental dishes</li>
                    <li>Millet-based healthy meals</li>
                </ul>
                <p className="leading-relaxed">French cafés also provide vegetarian quiches, sandwiches, and soups, making it easy for travelers with dietary preferences.</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">A Foodie's Guide to Exploring Pondicherry</h2>

                <h3 className="text-xl font-medium mb-2 text-gray-800">Culinary Tours in Pondicherry</h3>
                <p className="mb-4 leading-relaxed">Guided food walks and culinary tours allow visitors to explore both traditional Tamil kitchens and colonial cafés. These tours often include tasting sessions, cultural storytelling, and market visits.</p>

                <h3 className="text-xl font-medium mb-2 text-gray-800">Best Times to Visit for Food Festivals</h3>
                <p className="mb-4 leading-relaxed">The ideal time to explore Pondicherry’s food culture is between October and March when the climate is pleasant. Seasonal celebrations and local temple festivals often feature traditional dishes and sweets unique to the region.</p>

                <h3 className="text-xl font-medium mb-2 text-gray-800">Unique Culinary Experiences</h3>
                <p className="mb-4 leading-relaxed">Food lovers can enjoy:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Beachside candlelight seafood dinners</li>
                    <li>Heritage café breakfasts</li>
                    <li>Banana leaf traditional feasts</li>
                    <li>Farm-to-table dining experiences</li>
                </ul>
                <p className="mb-4 leading-relaxed">The fusion of culture and cuisine creates a memorable gastronomic journey.</p>

                <h3 className="text-xl font-medium mb-2 text-gray-800">Traditional Cooking Classes in Pondicherry</h3>
                <p className="mb-4 leading-relaxed">Several local chefs and homestays offer cooking classes where visitors can learn:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Tamil spice blending techniques</li>
                    <li>Seafood curry preparation</li>
                    <li>French pastry basics</li>
                    <li>South Indian breakfast dishes</li>
                </ul>
                <p className="leading-relaxed">These hands-on experiences deepen appreciation for Pondicherry’s diverse culinary heritage.</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Tips for a Food Trip to Pondicherry</h2>
                <ul className="list-disc pl-6 space-y-2 mb-4 bg-orange-50 p-6 rounded-lg">
                    <li>Visit early mornings for fresh bakery items.</li>
                    <li>Evenings are best for seafood and street food exploration.</li>
                    <li>Explore White Town for French cuisine.</li>
                    <li>Try local mess restaurants for authentic Tamil meals.</li>
                    <li>Ask for the “fresh catch of the day” at seafood spots.</li>
                </ul>
            </section>

            <section className="mb-12 border-t pt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Conclusion</h2>
                <p className="mb-4 leading-relaxed">Pondicherry stands out as one of India’s most distinctive food destinations. Its seamless blend of Tamil tradition and French sophistication creates a culinary identity that is rich, diverse, and unforgettable.</p>
                <p className="leading-relaxed">Whether you are a street food explorer, seafood enthusiast, or café lover, Pondicherry offers an experience that goes beyond taste — it delivers culture, history, and flavor on every plate.</p>
            </section>
        </div>
    );
};
