import { ArrowRight, Download } from 'lucide-react';
import heroCollage from '../assets/hero-collage.webp';
import { useLeadModal } from '../hooks/useLeadModal';

export const HeroB = () => {
    const { openLeadModal } = useLeadModal();

    return (
        <section id="home" className="relative overflow-hidden bg-white">
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Left Side: Content & CTA */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-24 md:px-12 lg:px-20 z-10 bg-white">
                    <div id="download" className="animate-fade-in-up">

                        {/* ✅ SEO: H1 targets primary keyword + location + year */}
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl leading-tight">
                            The "Not-So-Secret" Guide to{' '}
                            <span className="text-orange-500">Famous Food</span>
                            {' '}in Pondicherry
                        </h1>

                        {/* ✅ AEO: Answers "What makes Pondicherry food unique?" directly — citable by AI */}
                        <p className="mb-4 text-lg text-gray-600 md:text-xl leading-relaxed">
                            Stop following the TripAdvisor crowds. Pondicherry (Puducherry) isn't just about 'French vibes' — it's where 200-year-old <strong>Tamil traditions and French Creole secrets</strong> meet on the same street. From the buttery croissants of White Town to the legendary messes of the Tamil Quarter, we show you exactly where the locals actually eat.
                        </p>
                        <p className="mb-10 text-lg text-gray-600 md:text-xl leading-relaxed">
                            Our free, locally-verified guide reveals <strong>15 handpicked spots</strong> tourists usually miss — including Google Maps links, must-order dishes (like the real Ghee Roast), and tourist traps to avoid.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                            <button
                                type="button"
                                onClick={() => openLeadModal('hero_b_cta')}
                                className="flex items-center justify-center rounded-lg bg-orange-600 px-6 py-4 text-center font-bold text-lg text-white hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                Get My Free Food Guide
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                        <p className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                            <span className="text-green-500">●</span> Instant download. No spam, ever. Trusted by 2,500+ food lovers.
                        </p>
                    </div>
                </div>

                {/* Right Side: Hero Image */}
                <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-auto">
                    <img
                        src={heroCollage}
                        alt="Famous food in Pondicherry — French croissants, Tamil breakfast, fresh seafood and street food"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent md:bg-linear-to-l"></div>
                </div>
            </div>
        </section>
    );
};
