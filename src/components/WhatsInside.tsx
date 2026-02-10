
import { CheckCircle2 } from 'lucide-react';

export const WhatsInside = () => {
    const items = [
        "Top 5 Local Breakfast Spots (Idli, Dosa, Pongal)",
        "Hidden Street Food Stalls mostly known to locals",
        "Affordable Seafood Restaurants (Fresh Catch)",
        "Best Vegetarian & Non-Veg Thali places",
        "Must-try Bakeries & Authentic Filter Coffee"
    ];

    return (
        <section className="bg-white py-16 px-4">
            <div className="mx-auto max-w-3xl">
                <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">What's Inside Your Famous Food in Pondicherry Guide?</h2>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <ul className="space-y-4">
                        {items.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <CheckCircle2 className="mr-3 h-6 w-6 flex-shrink-0 text-green-500" />
                                <span className="text-lg text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
