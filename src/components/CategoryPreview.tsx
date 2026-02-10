
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
            alt: "best-family-restaurant-in-pondicherry",
            image: frenchCafeImg,
            count: "3 spots included",
            description: "Flaky croissants, buttery pain au chocolat, and fresh-baked baguettes that rival Paris. Discover century-old boulangeries where French colonial heritage lives on in every bite."
        },
        {
            id: 2,
            name: "Authentic Tamil Breakfast",
            alt: "best-food-spot-in-pondicherry",
            image: tamilBreakfastImg,
            count: "3 spots included",
            description: "Start your day like a true local with crispy dosas, fluffy idlis, and aromatic filter coffee. These traditional Tamil breakfast spots serve the soul food of Pondicherry."
        },
        {
            id: 3,
            name: "Fresh Seafood Delights",
            alt: "local-restaurant-in-pondicherry",
            image: seafoodImg,
            count: "3 spots included",
            description: "Catch of the day transformed into coastal magic. From spicy prawn masala to grilled fish that melts in your mouth, these spots serve the freshest seafood Pondicherry is famous for."
        },
        {
            id: 4,
            name: "Budget-Friendly Eats",
            alt: "best-biryani-in-pondicherry",
            image: budgetImg,
            count: "3 spots included",
            description: "Incredible flavors, unbeatable prices. Fill up on authentic Pondicherry street food, traditional thalis, and local snacks for under ₹200."
        },
        {
            id: 5,
            name: "Romantic Beachside Dining",
            alt: "best-dinner-place-in-pondicherry",
            image: beachDiningImg,
            count: "3 spots included",
            description: "Dine with your toes in the sand as waves crash nearby. These beachfront gems serve everything from candlelit seafood dinners to sunset cocktails."
        }
    ];

    return (
        <section id="famous-food" className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 md:text-5xl mb-6">
                        Your Complete Food Journey: 15 Local Favorites Across 5 Categories
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                        From French patisseries to Tamil tiffin centers, we've curated the best of Pondicherry's unique culinary heritage—each spot personally vetted by locals who've lived here for decades.
                    </p>
                    <div className="max-w-4xl mx-auto bg-orange-50 p-6 rounded-xl border border-orange-100">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Every spot in this guide represents the authentic taste of Pondicherry—no tourist traps, no overpriced mediocrity. We've organized the famous food in Pondicherry into 5 categories so you can eat your way through this coastal gem based on your mood, budget, and cravings. Whether you're craving French pastries at sunrise or grilled fish at sunset, your perfect meal is waiting.
                        </p>
                    </div>
                </div>

                {/* Mobile: Horizontal Scroll | Desktop: Grid */}
                <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8 md:overflow-visible lg:grid-cols-5">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="group relative flex-shrink-0 w-72 snap-center overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-2xl md:w-auto h-[400px]"
                        >
                            <div className="absolute inset-0 h-full w-full">
                                <img
                                    src={cat.image}
                                    alt={cat.alt}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
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
