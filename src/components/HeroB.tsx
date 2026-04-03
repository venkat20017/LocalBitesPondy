import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, User } from 'lucide-react';
import heroCollage from '../assets/hero-collage.webp';
import { saveLeadToSheets } from '../services/googleSheets';
import { trackConversion } from '../services/analytics';

export const HeroB = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        setIsSubmitting(true);
        try {
            await saveLeadToSheets({ name, email, source: 'hero_b_signup' });
            trackConversion('hero_signup');
            window.open('/famous-food-in-pondicherry.pdf', '_blank');
            navigate('/thank-you');
        } catch (error) {
            console.error('Submission failed', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="home" className="relative overflow-hidden bg-white">
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Left Side: Content & Form */}
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

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                            <div>
                                <label htmlFor="name" className="sr-only">Name (Optional)</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                                        placeholder="Your Name (Optional)"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                                        placeholder="Your Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 flex items-center justify-center rounded-lg bg-orange-600 px-6 py-4 text-center font-bold text-lg text-white hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    <>
                                        Get My Free Food Guide
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>
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
