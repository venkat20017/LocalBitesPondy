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
                                    Traditional Tamil Dishes in Pondicherry
                                    <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </h2>
                            </Link>
                            {/* ✅ AEO: Paragraph answers "What are traditional Tamil dishes in Pondicherry?" */}
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                The foundation of Pondicherry's cuisine is deeply Tamil. Traditional mess-style restaurants across the city serve rice-based meals on banana leaves, aromatic gravies, and fermented breakfast staples that locals have eaten for centuries. Unlike tourist-oriented restaurants, these spots rarely appear on travel apps — but they represent the true, authentic food culture of Pondicherry.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    {
                                        name: "Meen Kuzhambu (Fish Curry)",
                                        desc: "A tangy tamarind-based fish curry tempered with curry leaves, mustard seeds, and red chillies. Served over steamed rice, this is arguably the most iconic dish in Pondicherry's Tamil food culture."
                                    },
                                    {
                                        name: "Karaikudi-style Chicken Curry",
                                        desc: "Chettinad-influenced chicken curry rich in black pepper, kalpasi (stone flower), and slow-roasted spices. Bold, fragrant, and unlike any curry you'll find elsewhere."
                                    },
                                    {
                                        name: "Sambar & Rasam",
                                        desc: "Lentil-based gravies that anchor every Tamil meal. Pondicherry's sambar uses freshly ground spices rather than pre-made powder, giving it a depth of flavour that's markedly different."
                                    },
                                    {
                                        name: "Idli & Dosa",
                                        desc: "Fermented rice-lentil dishes served with coconut chutney and sambar. Pondicherry's dosas are known for their crispy texture and the quality of the accompaniments — particularly the freshly ground chutney."
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
                                    French Influenced Food in Pondicherry's White Town
                                    <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </h2>
                            </Link>
                            {/* ✅ AEO: Directly answers "What French food can I find in Pondicherry?" */}
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Pondicherry's French Quarter (White Town) is the only place in India where you can eat authentic French pastries from heritage bakeries that have been operating for over 100 years. The French colonial period ended in 1954, but its food culture endures — and makes Pondicherry completely unique among Indian cities. These aren't tourist-facing imitations; they're real boulangeries with generations of craft behind every batch.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        name: "Croissants & Baguettes",
                                        desc: "Freshly baked every morning in French-style bakeries. The best ones are buttery, flaky, and sold out by 9 AM — arrive early."
                                    },
                                    {
                                        name: "Crepes",
                                        desc: "Both sweet and savoury versions. Sweet crepes filled with Nutella, banana, or fresh fruit; savoury ones with cheese and vegetables."
                                    },
                                    {
                                        name: "Ratatouille",
                                        desc: "The classic Provençal vegetable stew, often subtly adapted with local Indian spices at Pondicherry heritage restaurants."
                                    },
                                    {
                                        name: "Quiches",
                                        desc: "Egg-and-cheese tarts popular in White Town's heritage cafés — a breakfast staple that tourists and long-time residents alike swear by."
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
                                    Seafood in Pondicherry
                                    <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </h2>
                            </Link>
                            {/* ✅ AEO: Answers "What seafood is Pondicherry famous for?" */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                As a coastal city on the Bay of Bengal, Pondicherry has access to some of the freshest seafood in South India. Local fishing boats return to the harbour daily, and the best restaurants source directly from fishermen — meaning the fish and prawns on your plate were caught the same morning. Seafood is prepared in both Tamil coastal styles and French continental methods, giving you an unusually wide choice.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    { name: "Prawn Masala", desc: "Juicy prawns cooked in a spiced onion-tomato gravy with coastal spices." },
                                    { name: "Grilled Lobster with Garlic Butter", desc: "A French-influenced preparation found at upscale beachside restaurants." },
                                    { name: "Crab Curry (Nandu Kuzhambu)", desc: "Blue swimmer crabs in a tangy, coconut-based Tamil gravy — a local favourite." },
                                    { name: "Fish Fry with Spiced Marinade", desc: "Whole fish marinated in chilli, turmeric, and fennel seeds, then pan-fried crispy." }
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
                                    Street Food in Pondicherry
                                    <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </h2>
                            </Link>
                            {/* ✅ AEO: Answers "What street food should I try in Pondicherry?" */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Pondicherry's best street food comes alive in the evenings along the beach promenade and near local markets. Most stalls appear from 5 PM onwards, selling snacks that locals have enjoyed for decades. Prices typically range from ₹20–60 per serving — making it one of the most affordable street food experiences in South India.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    { name: "Sundal (Spiced Chickpeas)", desc: "Boiled chickpeas tossed with grated coconut, mustard seeds, and curry leaves — a Pondicherry beach staple." },
                                    { name: "Bajji & Bonda", desc: "Deep-fried fritters made from vegetables or lentils, served with chutney. Crispy, hot, and perfect with evening tea." },
                                    { name: "Egg Kothu Parotta", desc: "Shredded parotta stir-fried on a flat griddle with eggs, onions, and spices — a local street food icon." },
                                    { name: "Masala Pori", desc: "Puffed rice tossed with red onion, tomato, green chilli, and spices. Light, crunchy, and intensely flavourful." }
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

            {/* ── Section 4: Best Restaurants ── */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-4xl px-6">
                    {/* ✅ SEO: H2 targets "best restaurants Pondicherry" */}
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Best Restaurants in Pondicherry for Authentic Local Food
                    </h2>
                    {/* ✅ AEO: Introductory answer for "where to eat in Pondicherry" */}
                    <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                        Pondicherry's best dining is split across three distinct culinary traditions. Here's where locals actually go — not what TripAdvisor's top 10 list tells tourists to visit.
                    </p>

                    <div className="space-y-10">
                        {/* Tamil */}
                        <div className="border-l-4 border-orange-500 pl-6 py-2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Traditional Tamil Mess Restaurants</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                The most authentic Tamil food in Pondicherry is found at local mess-style eateries — small, family-run restaurants that serve multi-course rice meals on banana leaves. These spots rarely advertise, charge under ₹120 for a full meal, and are packed with locals for good reason. Look for hand-written menus in Tamil, which is usually a sign of genuine home-style cooking. The meal typically includes steamed rice, sambar, rasam, two vegetable kootu dishes, a papad, and pickle — all unlimited refills.
                            </p>
                        </div>

                        {/* French */}
                        <div className="border-l-4 border-blue-400 pl-6 py-2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">French Cafés and Heritage Bistros in White Town</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                White Town is home to Pondicherry's most distinctive dining experiences — elegant cafés set in restored colonial buildings with bougainvillea-draped courtyards. These are ideal for leisurely French breakfasts, afternoon coffee and pastries, or evening wine and continental food.
                            </p>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                <li className="bg-gray-50 p-4 rounded-lg">
                                    <strong className="block text-gray-900 mb-1">The Pavilion</strong>
                                    <span className="text-sm text-gray-600">Multi-cuisine fine dining in a heritage setting. Known for its French-Tamil fusion menu and courtyard ambience.</span>
                                </li>
                                <li className="bg-gray-50 p-4 rounded-lg">
                                    <strong className="block text-gray-900 mb-1">Café des Arts</strong>
                                    <span className="text-sm text-gray-600">Famous for French-style breakfasts — fresh croissants, filter coffee, and omelettes in a gallery-like setting.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Seafood */}
                        <div className="border-l-4 border-teal-500 pl-6 py-2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Seafood Restaurants in Pondicherry</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Seafood restaurants in Pondicherry range from beachside barbecue shacks to formal dining rooms — with prices to match every budget. The key to a great seafood meal here is to order whatever was caught that morning and avoid pre-frozen options. Beachfront restaurants along the Promenade are generally the safest bet for freshness.
                            </p>
                            <ul className="grid sm:grid-cols-1 gap-4">
                                <li className="bg-gray-50 p-4 rounded-lg">
                                    <strong className="block text-gray-900 mb-1">FinZ — Seafood & Barbeque</strong>
                                    <span className="text-sm text-gray-600">One of Pondicherry's most popular seafood spots, known for beachside dining, live grills, and a wide selection of fresh coastal-style dishes. Best for dinner with a group.</span>
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
