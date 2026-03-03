import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Home, ArrowRight, Instagram, Mail } from 'lucide-react';
import { MetaTags } from '../components/MetaTags';

const ThankYou: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-orange-50 pt-32 pb-20 px-4 font-sans">
            <MetaTags
                title="Thank You | LocalBitesPondy"
                description="Thank you for downloading our famous food in Pondicherry guide! Your PDF should have opened in a new tab."
                canonical="https://localbitespondy.netlify.app/thank-you"
            />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
                    {/* Header Banner */}
                    <div className="bg-orange-600 py-12 px-8 text-center text-white relative">
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>

                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-6 animate-bounce">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Thank You!</h1>
                        <p className="text-xl text-orange-100 font-medium">Your request has been received successfully.</p>
                    </div>

                    <div className="p-8 md:p-12 text-center">
                        <div className="space-y-8 mb-12 border-b border-gray-100 pb-12">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Next?</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    If you requested our food guide, it should have opened automatically in a new tab.
                                    If it didn't, don't worry! You can click the button below to open it manually.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="/famous-food-in-pondicherry.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all transform hover:scale-[1.03] shadow-lg hover:shadow-orange-200"
                                >
                                    Open Food Guide PDF
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                                <Link
                                    to="/"
                                    className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all"
                                >
                                    <Home className="w-5 h-5" />
                                    Back to Homepage
                                </Link>
                            </div>
                        </div>

                        {/* Social / Contact */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 hover:shadow-md transition-shadow">
                                <Instagram className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                                <h3 className="font-bold text-gray-900 mb-2">Follow our Food Journey</h3>
                                <p className="text-sm text-gray-600 mb-4">Get daily updates on the best food spots in Pondy.</p>
                                <a
                                    href="https://instagram.com/LocalBitesPondy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-orange-600 font-bold hover:underline inline-flex items-center gap-1"
                                >
                                    @LocalBitesPondy
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>

                            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 hover:shadow-md transition-shadow">
                                <Mail className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                                <h3 className="font-bold text-gray-900 mb-2">Have Questions?</h3>
                                <p className="text-sm text-gray-600 mb-4">We'd love to hear your feedback or suggestions!</p>
                                <a
                                    href="mailto:venkateshprasads.bs019@gmail.com"
                                    className="text-orange-600 font-bold hover:underline"
                                >
                                    Email us anytime
                                </a>
                            </div>
                        </div>

                        <div className="mt-12 text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} LocalBitesPondy. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
