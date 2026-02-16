import { Utensils, Coffee, Fish, MapPin, ChefHat, Sun, Star, Info } from 'lucide-react';

export const SEOSections = () => {
    return (
        <div className="font-sans text-gray-800">
            {/* Traditional Tamil Dishes */}
            <section className="py-16 bg-orange-50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <Utensils className="text-orange-600 h-8 w-8" />
                                Traditional Tamil Dishes
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                The foundation of Pondicherry’s cuisine lies in Tamil culinary traditions. These dishes are deeply rooted in local households and traditional Tamil restaurants across the city.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { name: "Meen Kuzhambu", desc: "A tangy tamarind-based fish curry with curry leaves and mustard seeds." },
                                    { name: "Karaikudi-style Chicken Curry", desc: "Rich in black pepper and roasted spices." },
                                    { name: "Sambar & Rasam", desc: "Lentil-based gravies paired with rice." },
                                    { name: "Idli & Dosa", desc: "Fermented rice-lentil dishes served with chutney and sambar." }
                                ].map((item, idx) => (
                                    <li key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
                                        <strong className="text-orange-700 block text-lg">{item.name}</strong>
                                        <span className="text-gray-600">{item.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800"
                                alt="Traditional Tamil Food Pondicherry"
                                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* French Influenced Foods */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <Coffee className="text-orange-600 h-8 w-8" />
                                Popular French Influenced Foods
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                French rule left a strong culinary imprint on Pondicherry. This fusion makes Pondicherry unique compared to other South Indian cities.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { name: "Croissants & Baguettes", desc: "Freshly baked in French-style bakeries." },
                                    { name: "Crepes", desc: "Sweet & Savory, often filled with chocolate or fruits." },
                                    { name: "Ratatouille", desc: "A vegetable stew adapted with Indian spices." },
                                    { name: "Quiches", desc: "Popular in heritage cafés in White Town." }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-orange-50 p-5 rounded-xl border border-orange-100 hover:shadow-md transition-shadow">
                                        <strong className="text-gray-900 block mb-1">{item.name}</strong>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800"
                                alt="French Bakery Pondicherry"
                                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Seafood & Street Food Grid */}
            <section className="py-16 bg-orange-50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Seafood */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <Fish className="text-orange-600 h-8 w-8" />
                                Seafood Specialties
                            </h2>
                            <p className="text-gray-600 mb-6">Being a coastal town, Pondicherry is known for fresh seafood prepared in both Tamil and continental styles.</p>
                            <ul className="space-y-3">
                                {["Prawn Masala", "Grilled Lobster with Garlic Butter", "Crab Curry (Nandu Kuzhambu)", "Fish Fry with Spiced Marinade"].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-700 bg-white p-3 rounded-lg shadow-sm">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Street Food */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <MapPin className="text-orange-600 h-8 w-8" />
                                Street Food Delights
                            </h2>
                            <p className="text-gray-600 mb-6">Evening street stalls near beaches and busy markets offer affordable and flavorful experiences.</p>
                            <ul className="space-y-3">
                                {["Sundal (spiced chickpeas)", "Bajji & Bonda", "Egg Kothu Parotta", "Masala Pori"].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-700 bg-white p-3 rounded-lg shadow-sm">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Best Restaurants */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-4xl px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                        Best Restaurants to Taste Pondicherry's Famous Foods
                    </h2>

                    <div className="space-y-12">
                        {/* Tamil */}
                        <div className="border-l-4 border-orange-500 pl-6 py-2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Dining at Traditional Tamil Restaurants</h3>
                            <p className="text-gray-600 mb-4">Traditional Tamil restaurants provide authentic meals served on banana leaves. Look for local mess-style eateries for the most authentic experience.</p>
                        </div>

                        {/* French */}
                        <div className="border-l-4 border-blue-500 pl-6 py-2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">French Cafes and Bistros</h3>
                            <p className="text-gray-600 mb-4">White Town is home to elegant French cafés offering pastries and continental dishes.</p>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                <li className="bg-gray-50 p-4 rounded-lg">
                                    <strong className="block text-gray-900">The Pavilion</strong>
                                    <span className="text-sm text-gray-600">Multi-cuisine fine dining</span>
                                </li>
                                <li className="bg-gray-50 p-4 rounded-lg">
                                    <strong className="block text-gray-900">Cafe des Arts</strong>
                                    <span className="text-sm text-gray-600">Famous for French breakfast</span>
                                </li>
                            </ul>
                        </div>

                        {/* Seafood */}
                        <div className="border-l-4 border-teal-500 pl-6 py-2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Seafood Restaurants</h3>
                            <p className="text-gray-600 mb-4">Specializing in grilled, barbecued, and curry-based preparations.</p>
                            <ul className="grid sm:grid-cols-1 gap-4">
                                <li className="bg-gray-50 p-4 rounded-lg">
                                    <strong className="block text-gray-900">FinZ - Seafood & Barbeque</strong>
                                    <span className="text-sm text-gray-600">Popular for beachside seafood dining and live grill options.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Foodie's Guide & Tips */}
            <section className="py-16 bg-orange-900 text-white rounded-t-3xl mt-12 mx-4 lg:mx-12">
                <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                            <ChefHat className="text-orange-300 h-8 w-8" />
                            A Foodie's Guide
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-orange-200 mb-2">Culinary Tours</h3>
                                <p className="text-orange-50">Guided food walks to explore traditional kitchens and colonial cafés.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-orange-200 mb-2">Traditional Cooking Classes</h3>
                                <p className="text-orange-50">Learn Tamil spice blending, seafood curry preparation, and French pastry basics.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-orange-200 mb-2">Best Times to Visit</h3>
                                <p className="text-orange-50">October to March for pleasant climate and food festivals.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Sun className="text-yellow-400 h-6 w-6" />
                            Tips for your Trip
                        </h2>
                        <ul className="space-y-4">
                            {[
                                "Visit early mornings for fresh bakery items.",
                                "Evenings are best for seafood and street food.",
                                "Explore White Town for French cuisine.",
                                "Try local mess restaurants for authentic Tamil meals.",
                                "Ask for the “fresh catch of the day” at seafood spots."
                            ].map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-16 max-w-3xl mx-auto border-t border-white/20 pt-8">
                    <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                    <p className="text-lg text-orange-100 leading-relaxed">
                        Pondicherry stands out as one of India’s most distinctive food destinations. Whether you are a street food explorer, seafood enthusiast, or café lover, Pondicherry offers an experience that goes beyond taste — it delivers culture, history, and flavor on every plate.
                    </p>
                </div>
            </section>
        </div>
    );
};
