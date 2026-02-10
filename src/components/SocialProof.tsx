import { Star, Quote } from 'lucide-react';

export const SocialProof = () => {
    const testimonials = [
        {
            id: 1,
            quote: "Found the best fish curry of my life! Would've never discovered it without this guide.",
            author: "Priya M.",
            location: "Bangalore",
            initial: "P"
        },
        {
            id: 2,
            quote: "Saved me so much time. I skipped all the tourist traps and went straight to the good stuff.",
            author: "Amit R.",
            location: "Chennai",
            initial: "A"
        },
        {
            id: 3,
            quote: "The street food recommendations were spot on. Every spot was hygienic and delicious!",
            author: "Sarah J.",
            location: "London, UK",
            initial: "S"
        }
    ];

    return (
        <section className="bg-orange-50 py-20 px-4">
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">Join 500+ Smart Travelers</h2>
                    <div className="flex justify-center items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
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
