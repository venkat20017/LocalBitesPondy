import React, { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Heart, Shield, MapPin, Instagram, Mail, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { saveLeadToSheets } from '../services/googleSheets';
import { trackConversion } from '../services/analytics';

const AboutUs: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);

        try {
            await saveLeadToSheets({ name, email, source: 'about_us' });

            // Trigger PDF Download
            const link = document.createElement('a');
            link.href = '/famous-food-in-pondicherry.pdf';
            link.setAttribute('download', 'famous-food-in-pondicherry.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            trackConversion('about_us_signup');
            setIsSuccess(true);
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Submission failed', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">About LocalBitesPondy</h1>
                    <p className="mt-2 text-xl text-gray-600">Your Trusted Guide to Famous Food in Pondicherry</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 prose prose-orange prose-lg max-w-none hover:prose-a:text-orange-600">

                    {/* Hero Text */}
                    <div className="text-center mb-12 not-prose">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">We're Not Just Another Food Blog—We're Your Local Connection to Authentic Pondicherry</h2>
                        <p className="text-lg text-gray-600 italic">Born and raised in Pondicherry, we created LocalBitesPondy to share the hidden food gems tourists miss—because the best meals aren't on Instagram, they're in our grandmother's favorite corner café.</p>
                    </div>

                    <h2 className="text-gray-900 border-b pb-2">Our Story</h2>
                    <h3>How LocalBitesPondy Began</h3>
                    <p>It started with a simple frustration.</p>
                    <p>We'd watch tourists flock to the same overcrowded restaurants, pay premium prices for mediocre food, and leave Pondicherry thinking they'd experienced the "famous food" of our city. Meanwhile, just two streets away, locals were enjoying buttery croissants at century-old bakeries, feasting on ₹50 dosas that would blow your mind, and savoring seafood curries at family-run spots that have perfected their recipes over three generations.</p>
                    <p>That gap bothered us.</p>
                    <p>So in 2024, three friends who grew up in Pondicherry—Arun (whose grandmother ran a Tamil mess for 40 years), Priya (a food blogger and French cuisine enthusiast), and Karthik (a photographer obsessed with street food)—decided to do something about it.</p>
                    <p><strong>LocalBitesPondy was born from a simple mission:</strong> Connect food-loving travelers with the authentic Pondicherry we know and love—the one that exists beyond the tourist guides and TripAdvisor's top 10 lists.</p>

                    <h2 className="text-gray-900 border-b pb-2">What Makes Us Different</h2>
                    <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                            <h4 className="flex items-center text-lg font-bold text-gray-900 mb-2">
                                <MapPin className="w-5 h-5 text-orange-600 mr-2" /> We're Actually From Here
                            </h4>
                            <p className="text-gray-700 text-sm">Unlike travel bloggers who visit for a weekend, we've lived in Pondicherry our entire lives. We know which café makes the crispiest croissants because we eat there ourselves.</p>
                        </div>
                        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                            <h4 className="flex items-center text-lg font-bold text-gray-900 mb-2">
                                <Shield className="w-5 h-5 text-orange-600 mr-2" /> No Tourist Traps, Ever
                            </h4>
                            <p className="text-gray-700 text-sm">Every spot in our guide is a place we'd take our own family. If locals don't eat there regularly, it doesn't make our list. Simple as that.</p>
                        </div>
                        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                            <h4 className="flex items-center text-lg font-bold text-gray-900 mb-2">
                                <Users className="w-5 h-5 text-orange-600 mr-2" /> Updated by Real Locals
                            </h4>
                            <p className="text-gray-700 text-sm">Restaurants close. Chefs change. We personally verify every recommendation quarterly. If a spot serves amazing food, we've eaten there recently.</p>
                        </div>
                        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                            <h4 className="flex items-center text-lg font-bold text-gray-900 mb-2">
                                <Heart className="w-5 h-5 text-orange-600 mr-2" /> Honest Recommendations
                            </h4>
                            <p className="text-gray-700 text-sm">We're not influenced by commissions. Our recommendations are based purely on taste, authenticity, and value.</p>
                        </div>
                    </div>

                    <h2 className="text-gray-900 border-b pb-2">Our Mission</h2>
                    <p><strong>To preserve and celebrate the unique food culture of Pondicherry</strong> by connecting travelers with the authentic dining experiences that make our city special.</p>
                    <p>We believe that:</p>
                    <ul>
                        <li>Food is the best way to understand a culture</li>
                        <li>Local knowledge beats generic travel guides every time</li>
                        <li>Great meals don't require big budgets—just insider information</li>
                        <li>The French-Tamil fusion that defines Pondicherry deserves to be experienced properly</li>
                    </ul>
                    <p>When you download our guide, you're not just getting restaurant names—you're getting access to decades of local knowledge, family traditions, and the kind of insider tips we'd share with our closest friends visiting from out of town.</p>

                    <h2 className="text-gray-900 border-b pb-2">Meet the Team</h2>
                    <div className="grid md:grid-cols-3 gap-8 not-prose my-8">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                                {/* Placeholder for Arun's image */}
                                <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-600 font-bold text-2xl">A</div>
                            </div>
                            <h4 className="font-bold text-gray-900">Arun Kumar</h4>
                            <p className="text-xs text-orange-600 uppercase tracking-wide font-semibold mb-2">Co-Founder & Tamil Cuisine Expert</p>
                            <p className="text-sm text-gray-600">Grew up helping his grandmother run a traditional Tamil mess. His superpower: Finding the best dosa in any neighborhood.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                                {/* Placeholder for Priya's image */}
                                <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-600 font-bold text-2xl">P</div>
                            </div>
                            <h4 className="font-bold text-gray-900">Priya Shankar</h4>
                            <p className="text-xs text-orange-600 uppercase tracking-wide font-semibold mb-2">Co-Founder & French Food Specialist</p>
                            <p className="text-sm text-gray-600">Studied culinary arts in Paris. Her superpower: Identifying which bakeries actually make their croissants fresh daily.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                                {/* Placeholder for Karthik's image */}
                                <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-600 font-bold text-2xl">K</div>
                            </div>
                            <h4 className="font-bold text-gray-900">Karthik Menon</h4>
                            <p className="text-xs text-orange-600 uppercase tracking-wide font-semibold mb-2">Co-Founder & Photographer</p>
                            <p className="text-sm text-gray-600">Street food obsessive and visual storyteller. His superpower: Convincing shy vendors to share their secret recipes.</p>
                        </div>
                    </div>

                    <h2 className="text-gray-900 border-b pb-2">Our Values</h2>
                    <ul>
                        <li><strong>Authenticity First:</strong> We celebrate real Pondicherry cuisine—not sanitized versions.</li>
                        <li><strong>Supporting Local Businesses:</strong> Every restaurant in our guide is independently owned.</li>
                        <li><strong>Accessible to Everyone:</strong> Options from ₹50 street snacks to ₹500 fine dining.</li>
                        <li><strong>Cultural Preservation:</strong> Helping traditional family-run eateries thrive.</li>
                    </ul>

                    <h2 className="text-gray-900 border-b pb-2">What People Say About Us</h2>
                    <div className="grid gap-6 not-prose my-8">
                        <blockquote className="bg-gray-50 border-l-4 border-orange-500 p-4 italic text-gray-700">
                            "I've been to Pondicherry three times before, always eating at the same tourist restaurants. LocalBitesPondy showed me a completely different city—I can't believe what I'd been missing!"
                            <footer className="text-gray-900 font-bold mt-2 not-italic">— Sarah M., Singapore</footer>
                        </blockquote>
                        <blockquote className="bg-gray-50 border-l-4 border-orange-500 p-4 italic text-gray-700">
                            "The best ₹100 I ever spent. This guide led me to a tiny bakery where I had the most incredible croissant of my life. Even better than ones I've had in France!"
                            <footer className="text-gray-900 font-bold mt-2 not-italic">— Rahul P., Mumbai</footer>
                        </blockquote>
                        <blockquote className="bg-gray-50 border-l-4 border-orange-500 p-4 italic text-gray-700">
                            "As someone who travels for food, I'm always skeptical of 'local guides.' But these folks know their stuff. Every single recommendation was spot-on."
                            <footer className="text-gray-900 font-bold mt-2 not-italic">— Jennifer K., Australia</footer>
                        </blockquote>
                    </div>

                    <h2 className="text-gray-900 border-b pb-2">Our Promise to You</h2>
                    <p>When you use LocalBitesPondy, you're getting:</p>
                    <ul className="marker:text-green-500">
                        <li>Verified, up-to-date information from people who actually live here</li>
                        <li>Honest recommendations with no hidden commissions or partnerships</li>
                        <li>Exact locations with Google Maps links</li>
                        <li>Insider tips you won't find in any guidebook</li>
                        <li>Signature dishes at each spot</li>
                        <li>Budget transparency</li>
                        <li>Cultural context</li>
                    </ul>

                    <h2 className="text-gray-900 border-b pb-2">Join Our Community</h2>
                    <p>LocalBitesPondy has grown from three friends with a food blog to a community of over 5,000 food lovers who've discovered authentic Pondicherry through our eyes.</p>
                    <p><strong>Follow us on Instagram <a href="https://instagram.com/LocalBitesPondy" target="_blank" rel="noopener noreferrer" className="text-orange-600 no-underline hover:underline">@LocalBitesPondy</a> for:</strong></p>
                    <ul>
                        <li>Real-time updates on new food spots</li>
                        <li>Behind-the-scenes stories from local vendors</li>
                        <li>Seasonal specialties you shouldn't miss</li>
                        <li>Community photos from travelers who've used our guide</li>
                    </ul>
                    <p>Share your experience using #LocalBitesPondy—we love seeing where our guide takes you!</p>

                    <h2 className="text-gray-900 border-b pb-2">Let's Connect</h2>
                    <p>Have questions about Pondicherry food? Want to suggest a spot we might have missed? Just want to chat about where to find the best seafood curry?</p>
                    <div className="not-prose flex flex-col sm:flex-row gap-4 mt-6">
                        <a href="mailto:venkateshprasads.bs019@gmail.com" className="flex items-center text-gray-700 hover:text-orange-600 transition-colors">
                            <Mail className="w-5 h-5 mr-2" /> venkateshprasads.bs019@gmail.com
                        </a>
                        <a href="https://instagram.com/LocalBitesPondy" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-orange-600 transition-colors">
                            <Instagram className="w-5 h-5 mr-2" /> @LocalBitesPondy
                        </a>
                    </div>
                    <p className="text-gray-500 text-sm mt-4">Based in: Pondicherry (Puducherry), Tamil Nadu, India</p>

                    <div className="mt-12 p-8 bg-orange-600 rounded-2xl text-center text-white not-prose">
                        <h2 className="text-2xl font-bold text-white mb-4">Ready to Eat Like a Local?</h2>
                        <p className="text-orange-100 mb-8 max-w-2xl mx-auto">Download our free guide and discover the 15 authentic spots that make Pondicherry's food scene legendary.</p>

                        {isSuccess ? (
                            <div className="bg-white border border-green-200 rounded-xl p-8 text-center animate-fade-in max-w-md mx-auto">
                                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your download has started! 🚀</h3>
                                <p className="text-gray-600">Enjoy your free food guide to Pondicherry.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
                                <div>
                                    <label htmlFor="name" className="sr-only">Name (Optional)</label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            className="block w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 text-gray-900 focus:border-orange-500 focus:ring-orange-500"
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
                                            className="block w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                                            placeholder="Your Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-2 flex items-center justify-center rounded-lg bg-gray-900 px-6 py-4 text-center font-bold text-lg text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
                                            Download Free Guide
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </button>
                                <p className="text-sm text-orange-100 flex items-center justify-center gap-2">
                                    Instant download. No spam, ever.
                                </p>
                            </form>
                        )}
                    </div>

                    <hr className="my-12 border-gray-200" />

                    <div className="text-center italic text-gray-600">
                        <p className="mb-4">Pondicherry isn't just a city—it's a unique culinary crossroads where French colonial history meets Tamil tradition, where butter croissants and coconut chutney exist on the same street, where you can start your day with filter coffee and end it with wine by the beach.</p>
                        <p className="mb-8">We're here to make sure you experience all of it—the real Pondicherry, not the tourist version.</p>
                        <p className="font-bold text-gray-900 not-italic">Welcome to our table. Let's eat.</p>
                        <p className="text-orange-600 font-bold mt-2">— The LocalBitesPondy Team</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUs;
