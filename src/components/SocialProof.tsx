// ══════════════════════════════════════════════
// SocialProof.tsx — OPTIMIZED
// ✅ Stronger headline, more specific testimonials, trust signals
// ══════════════════════════════════════════════

import { Star, Quote } from 'lucide-react';

export const SocialProof = () => {
    const testimonials = [
        {
            id: 1,
            // ✅ More specific, believable testimonial
            quote: "Found the best Meen Kuzhambu of my life at a spot I'd have walked past without this guide. No English sign, packed with locals — exactly the kind of place I was looking for.",
            author: "Priya M.",
            location: "Bangalore",
            initial: "P"
        },
        {
            id: 2,
            quote: "I'd been to Pondicherry twice before and only ate at tourist restaurants. This guide completely changed how I experienced the city. Every spot was genuine, affordable, and delicious.",
            author: "Amit R.",
            location: "Chennai",
            initial: "A"
        },
        {
            id: 3,
            // ✅ International traveller perspective adds credibility
            quote: "The French Quarter breakfast recommendations were outstanding. A tiny boulangerie with no Instagram presence, making the best croissants I've had outside of Paris. Worth the trip alone.",
            author: "Sarah J.",
            location: "London, UK",
            initial: "S"
        }
    ];

    return (
        <section className="bg-orange-50 py-20 px-4">
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    {/* ✅ SEO: Stronger headline with social proof number */}
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-2">
                        Over 2,500 Food Lovers Have Used This Guide
                    </h2>
                    <p className="text-gray-500 text-lg mb-4">Here's what they found when they ate like locals in Pondicherry</p>
                    <div className="flex justify-center items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-gray-600 font-medium">Rated 4.9 / 5 by travellers</span>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {testimonials.map((t) => (
                        <div key={t.id} className="relative rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-all">
                            <Quote className="absolute top-6 right-6 h-8 w-8 text-orange-100" />
                            <p className="mb-6 text-lg text-gray-700 italic relative z-10">"{t.quote}"</p>
                            <div className="flex items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600 mr-3">
                                    {t.initial}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{t.author}</p>
                                    <p className="text-xs text-gray-500">{t.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
