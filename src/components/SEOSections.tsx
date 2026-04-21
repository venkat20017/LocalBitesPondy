import { Utensils, Coffee, Fish, MapPin, ChefHat, Sun, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SEOSections = () => {
    return (
        <div className="font-sans text-gray-800">

            {/* ── Section 1: Traditional Tamil Dishes ── */}
            <section id="famous-food" className="py-16 bg-orange-50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <Link to="/tamil-dishes" className="group">
                                {/* ✅ SEO: H2 with location keyword */}
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3 group-hover:text-orange-600 transition-colors">
                                    <Utensils className="text-orange-600 h-8 w-8 shrink-0" />
                                    Authentic Tamil & Creole Flavours
                                    <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </h2>
                            </Link>
                            {/* ✅ AEO: Paragraph answers "What are traditional Tamil dishes in Pondicherry?" */}
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                The heart of Pondicherry's food scene isn't in the fancy cafes, but in the crowded Tamil messes and heritage Creole kitchens. While tourists flock to White Town, locals head to places like <strong>Surguru</strong> for a Ghee Roast that actually tastes like home, or hunt down the rare <strong>Creole cuisine</strong> — a unique 200-year-old fusion of French techniques and Tamil spices that you won't find anywhere else in India.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    {
                                        name: "Surguru's Ghee Roast & Filter Coffee",
                                        desc: "Ask any local where to start your day, and they'll point you to Surguru. Their paper-thin, buttery Ghee Roast paired with strong, frothy filter coffee is the gold standard of Pondy breakfasts."
                                    },
                                    {
                                        name: "Creole Meen Curry (French-Tamil Fusion)",
                                        desc: "Unlike the spicy Tamil Meen Kuzhambu, Creole fish curry uses coconut milk and mild spices, reflecting the French influence. Look for this at heritage spots like Chez Pushpa for a truly local experience."
                                    },
                                    {
                                        name: "Seeraga Samba Biryani",
                                        desc: "Pondy's secret is the small-grain Samba rice. It’s more fragrant and lighter than Basmati. Skip the big chains and look for the wood-fired 'Biryani Mess' spots in the Tamil Quarter."
                                    },
                                    {
                                        name: "Kothu Parotta (Street Icon)",
                                        desc: "The ultimate evening comfort food. Shredded parotta stir-fried with eggs and spices on a massive iron griddle. It's the sound of Pondy's streets at night."
                                    }
                                ].map((item, idx) => (
                                    <li key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
                                        <strong className="text-orange-700 block text-lg mb-1">{item.name}</strong>
                                        <span className="text-gray-600 text-sm leading-relaxed">{item.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800"
                                alt="Traditional Tamil food in Pondicherry — meen kuzhambu, idli, dosa and sambar"
                                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 2: French Influenced Foods ── */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <Link to="/french-quarter" className="group">
                                {/* ✅ SEO: H2 targets "French food Pondicherry" query */}
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3 group-hover:text-orange-600 transition-colors">
                                    <Coffee className="text-orange-600 h-8 w-8 shrink-0" />
                                    French Boulangeries & Heritage Cafés
                                    <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </h2>
                            </Link>
                            {/* ✅ AEO: Directly answers "What French food can I find in Pondicherry?" */}
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                White Town's yellow walls hide some of India's best European-style dining. While every tourist guide mentions <strong>Baker Street</strong>, locals know that for the truly buttery, flaky croissants, you should head to <strong>Le Petit Four</strong> or <strong>Bouche Sucrée</strong>. For an afternoon vibe, the award-winning <strong>Coromandel Cafe</strong> offers a fusion of Indo-French flavours in a stunningly restored mansion.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        name: "The 'Hot Chocolate' Ritual",
                                        desc: "At Zuka, the hot chocolate comes with a signature chocolate spoon. It's a local rite of passage for anyone with a sweet tooth visiting Pondicherry."
                                    },
                                    {
                                        name: "Artisanal Gelato on the Promenade",
                                        desc: "Skip the industrial ice creams. GMT Gelato's Himalayan Salt-Caramel is widely considered the best gelato in the city, perfect for a sunset stroll."
                                    },
                                    {
                                        name: "Baguettes & Quiches",
                                        desc: "Freshly baked every morning. The key is to arrive before 9 AM; the best boulangeries sell out their morning batches faster than you can say 'Bonjour'."
                                    },
                                    {
                                        name: "Indo-French Fusion",
                                        desc: "Dishes like Rasam aux Crevettes (shrimp soup) at heritage spots blend French plating with the tangy depth of Tamil rasam."
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-orange-50 p-5 rounded-xl border border-orange-100 hover:shadow-md transition-shadow">
                                        <strong className="text-gray-900 block mb-2">{item.name}</strong>
                                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800"
                                alt="French bakery in Pondicherry White Town — croissants, baguettes and crepes"
                                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 3: Seafood & Street Food ── */}
            <section className="py-16 bg-orange-50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Seafood */}
                        <div>
                            <Link to="/seafood" className="group">
                                {/* ✅ SEO: H2 targets "seafood Pondicherry" */}
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3 group-hover:text-orange-600 transition-colors">
                                    <Fish className="text-orange-600 h-8 w-8 shrink-0" />
                                    The Fresh Catch: Seafood Rules
                                    <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </h2>
                            </Link>
                            {/* ✅ AEO: Answers "What seafood is Pondicherry famous for?" */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Pondicherry's coastal location means seafood isn't just a menu item; it's a way of life. The rule is simple: if it wasn't caught this morning, don't order it. While beachside grills are popular, locals head to <strong>Mass Seafood</strong> for a no-frills, authentic prawn masala that packs a punch.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    { name: "Prawn Masala (Mass Style)", desc: "Juicy, spice-coated prawns that are a local favorite. It's the dish that defines Pondy's coastal Tamil cooking." },
                                    { name: "Grilled Lobster with Garlic Butter", desc: "A French-influenced preparation. Best enjoyed at a White Town bistro with a glass of chilled wine." },
                                    { name: "Nandu Kuzhambu (Crab Curry)", desc: "A spicy, peppery crab curry that is a staple in Tamil fishing communities. Messy but absolutely worth it." },
                                    { name: "Fish Fry (Daily Catch)", desc: "Whole fish marinated in local spices and pan-fried. Always ask for the 'catch of the day' rather than choosing from the menu." }
                                ].map((item, idx) => (
                                    <li key={idx} className="bg-white p-3 rounded-lg shadow-sm">
                                        <strong className="text-orange-700 block">{item.name}</strong>
                                        <span className="text-sm text-gray-600">{item.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Street Food */}
                        <div>
                            <Link to="/street-food" className="group">
                                {/* ✅ SEO: H2 targets "street food Pondicherry" */}
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3 group-hover:text-orange-600 transition-colors">
                                    <MapPin className="text-orange-600 h-8 w-8 shrink-0" />
                                    Street Food: The Evening Buzz
                                    <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </h2>
                            </Link>
                            {/* ✅ AEO: Answers "What street food should I try in Pondicherry?" */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                As the sun sets, the Promenade Beach comes alive with the smell of roasted chickpeas and spiced puffed rice. But for the real 'Pondy' street experience, head to the local markets on MG Road for piping hot <strong>Bajji</strong> or the legendary <strong>Egg Kothu Parotta</strong>.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    { name: "Sundal (Beach Staple)", desc: "Spiced chickpeas tossed with coconut. It's the ultimate 'walking snack' for a sunset stroll on Rock Beach." },
                                    { name: "Xtasi Wood-Fired Pizza", desc: "Technically a restaurant, but its 18-inch pizzas are a local legend. Many locals consider it the 'best street-style pizza' in South India." },
                                    { name: "Masala Pori (Puffed Rice)", desc: "A crunchy, tangy mix of puffed rice, onions, and spices. Simple, affordable, and incredibly addictive." },
                                    { name: "Spiced Pineapple & Mango", desc: "Look for vendors on the beach selling sliced fruits dusted with salt and red chilli powder — the perfect coastal palate cleanser." }
                                ].map((item, idx) => (
                                    <li key={idx} className="bg-white p-3 rounded-lg shadow-sm">
                                        <strong className="text-orange-700 block">{item.name}</strong>
                                        <span className="text-sm text-gray-600">{item.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 4: Best Restaurants & Where NOT to Eat ── */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-4xl px-6">
                    <Link to="/restaurants" className="group inline-block w-full">
                        {/* ✅ SEO: H2 targets "best restaurants Pondicherry" */}
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 group-hover:text-orange-600 transition-colors inline-flex items-center gap-3">
                            Where to Eat (and Where NOT to) in Pondicherry
                            <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h2>
                    </Link>
                    {/* ✅ AEO: Introductory answer for "where to eat in Pondicherry" */}
                    <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                        Don't fall for the Instagram traps. Here's our brutally honest take on where you'll get the best value and flavour.
                    </p>

                    <div className="space-y-10">
                        {/* The Good */}
                        <div className="border-l-4 border-green-500 pl-6 py-2 bg-green-50 rounded-r-xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">The Local Favorites (Go Here!)</h3>
                            <ul className="space-y-4">
                                <li>
                                    <strong className="text-gray-900">Surguru (Vegetarian):</strong> The undisputed king of South Indian breakfast. Their Ghee Roast is legendary.
                                </li>
                                <li>
                                    <strong className="text-gray-900">Coromandel Cafe:</strong> Perfect for a 'fancy' dinner that actually delivers on taste and atmosphere.
                                </li>
                                <li>
                                    <strong className="text-gray-900">Zuka:</strong> Not just a chocolate shop, but a destination. The hot chocolate is a must.
                                </li>
                            </ul>
                        </div>

                        {/* The Trap */}
                        <div className="border-l-4 border-red-500 pl-6 py-2 bg-red-50 rounded-r-xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Tourist Traps to Avoid</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed italic">
                                "We've made the mistakes so you don't have to."
                            </p>
                            <ul className="space-y-4 text-gray-700">
                                <li>
                                    <strong>The 'Baker Street' Hype:</strong> It's iconic, but often overpriced and crowded. For better pastries, try <strong>Le Petit Four</strong> or <strong>Bouche Sucrée</strong>.
                                </li>
                                <li>
                                    <strong>Beachside 'No-Name' Seafood:</strong> Be wary of restaurants on the main Promenade with huge menus but no visible fresh catch. Freshness is key!
                                </li>
                                <li>
                                    <strong>Fixed-Rate Auto Rickshaws:</strong> Never agree to a fixed price without checking an app like Ola or Rapido first. They often overcharge tourists by 3x.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 5: Foodie's Guide & Tips ── */}
            <section className="py-16 bg-orange-900 text-white rounded-t-3xl mt-12 mx-4 lg:mx-12">
                <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16">
                    <div>
                        <Link to="/foodie-guide" className="group">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 group-hover:text-orange-200 transition-colors">
                                <ChefHat className="text-orange-300 h-8 w-8" />
                                Pondicherry Food Travel Guide
                                <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </h2>
                        </Link>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-orange-200 mb-2">Culinary Food Walks</h3>
                                <p className="text-orange-50 leading-relaxed">
                                    The best way to experience Pondicherry's food is on foot. Start at a Tamil tiffin centre for breakfast, walk through the French Quarter mid-morning for pastries and coffee, lunch at a local mess for a banana-leaf rice meal, and end the day with beach promenade street food at sunset.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-orange-200 mb-2">Traditional Cooking Experiences</h3>
                                <p className="text-orange-50 leading-relaxed">
                                    Several locals in Pondicherry offer private cooking class experiences covering Tamil spice blending, fish curry preparation, seafood marination, and French pastry basics — an excellent way to bring Pondicherry's food culture home with you.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-orange-200 mb-2">Best Season to Visit for Food</h3>
                                <p className="text-orange-50 leading-relaxed">
                                    October to March is ideal — pleasant weather, Pongal harvest festival food in January, and peak seafood season. Avoid monsoon months (October–November) for beach dining, as most outdoor stalls close.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Sun className="text-yellow-400 h-6 w-6" />
                            Insider Tips for Eating in Pondicherry
                        </h2>
                        <ul className="space-y-5">
                            {[
                                { tip: "Arrive at bakeries before 9 AM for the freshest croissants — they sell out fast.", why: "Most White Town boulangeries bake only one batch per morning." },
                                { tip: "Evenings (6–9 PM) are best for beach street food and outdoor seafood grills.", why: "Beach promenade stalls operate only at dusk." },
                                { tip: "Ask for the 'fresh catch of the day' at any seafood restaurant.", why: "Fishing boats arrive in the morning — daily specials use the freshest catch." },
                                { tip: "Visit local mess restaurants for the most authentic, affordable Tamil meals.", why: "These spots rarely have English menus or online presence — but that's a good sign." },
                                { tip: "Carry cash — most local food spots and street stalls don't accept cards or UPI.", why: "Especially true for small street food vendors near the beach." }
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <Star className="w-5 h-5 text-yellow-400 shrink-0 mt-1" />
                                    <div>
                                        <span className="block font-medium">{item.tip}</span>
                                        <span className="text-orange-200 text-sm">{item.why}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ✅ AEO: Conclusion paragraph — ideal for AI engines summarising "Is Pondicherry good for food?" */}
                <div className="text-center mt-16 max-w-3xl mx-auto border-t border-white/20 pt-10">
                    <h2 className="text-2xl font-bold mb-4">Is Pondicherry Worth Visiting for Food?</h2>
                    <p className="text-lg text-orange-100 leading-relaxed mb-8">
                        Absolutely. Pondicherry is one of the most distinctive food destinations in India — and arguably the most underrated. It's the only city where French colonial baking culture, Tamil home cooking, and Bay of Bengal seafood all coexist on the same street. Whether you have ₹100 or ₹1,000 to spend on a meal, Pondicherry delivers quality, authenticity, and flavour that few cities in India can match. Our free guide ensures you spend every rupee at the right place.
                    </p>
                    <a
                        href="#download"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2 bg-white text-orange-900 px-8 py-3 rounded-full font-bold hover:bg-orange-100 transition-colors"
                    >
                        Get the Free Guide & Start Exploring
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>
        </div>
    );
};
