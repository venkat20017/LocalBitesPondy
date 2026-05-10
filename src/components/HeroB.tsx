import { ArrowRight } from 'lucide-react';
import pyHero from '../assets/py_hero_image.png';
import { useLeadPopup } from '../context/LeadPopupContext';
import { useContent } from '../context/ContentContext';

export const HeroB = () => {
    const { openPopup } = useLeadPopup();
    const { settings } = useContent();

    const title = settings.heroTitle || settings.hero_title || (
        <>
            The "Not-So-Secret" Guide to{' '}
            <span className="text-orange-500">Famous Food</span>
            {' '}in Pondicherry
        </>
    );

    const subtitle1 = settings.heroSubtitle1 || settings.hero_subtitle1 || "Stop following the TripAdvisor crowds. Pondicherry isn't just about 'French vibes' — it's where 200-year-old Tamil traditions and French Creole secrets meet on the same street. From the buttery croissants of White Town to the legendary messes of the Tamil Quarter, we show you exactly where the locals actually eat.";
    
    const subtitle2 = settings.heroSubtitle2 || settings.hero_subtitle2 || "Our free, locally-verified guide reveals 15 handpicked spots tourists usually miss — including Google Maps links, must-order dishes (like the real Ghee Roast), and tourist traps to avoid.";

    const ctaText = settings.heroCta || settings.hero_cta || "Get My Free Food Guide";
    const ctaLink = settings.heroLink || settings.hero_link;

    const handleCTAClick = () => {
        if (ctaLink && ctaLink.startsWith('http')) {
            window.open(ctaLink, '_blank');
        } else {
            openPopup('hero_b');
        }
    };

    return (
        <section id="home" className="relative overflow-hidden bg-white">
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Left Side: Content & CTA */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-24 md:px-12 lg:px-20 z-10 bg-white">
                    <div id="download" className="animate-fade-in-up">
 
                        {/* ✅ SEO: H1 targets primary keyword + location + year */}
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl leading-tight">
                            {title}
                        </h1>
 
                        {/* ✅ AEO: Answers "What makes Pondicherry food unique?" directly — citable by AI */}
                        <p className="mb-4 text-lg text-gray-600 md:text-xl leading-relaxed">
                            {subtitle1}
                        </p>
                        <p className="mb-10 text-lg text-gray-600 md:text-xl leading-relaxed">
                            {subtitle2}
                        </p>
 
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleCTAClick}
                                className="flex items-center justify-center rounded-2xl bg-orange-600 px-8 py-5 text-center font-bold text-xl text-white hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 transition-all transform hover:scale-[1.02] shadow-xl hover:shadow-orange-200"
                            >
                                {ctaText}
                                <ArrowRight className="ml-2 h-6 w-6" />
                            </button>
                        </div>
                        
                        <p className="mt-6 text-base text-gray-500 flex items-center gap-2">
                            <span className="text-green-500 animate-pulse">●</span> Instant download. No spam, ever. Trusted by 2,500+ food lovers.
                        </p>
                    </div>
                </div>

                {/* Right Side: Hero Image */}
                <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-screen">
                    <img
                        src={settings.heroImageUrl || pyHero}
                        alt={settings.heroImageAlt || "Famous food in Pondicherry — French croissants, Tamil breakfast, fresh seafood and street food"}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent md:bg-linear-to-l"></div>
                </div>
            </div>
        </section>
    );
};
