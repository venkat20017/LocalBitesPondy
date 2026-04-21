import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Home, Download } from 'lucide-react';
import { MetaTags } from '../components/MetaTags';
import { trackPageView, trackEvent } from '../services/analytics';

const ThankYou: React.FC = () => {
    const downloadStarted = useRef(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        trackPageView('/thank-you');
        trackEvent('Thank You Page Viewed', 'lead_generation');

        // Auto-download PDF instantly
        if (!downloadStarted.current) {
            downloadStarted.current = true;
            triggerDownload();
        }
    }, []);

    const triggerDownload = () => {
        const link = document.createElement('a');
        link.href = '/famous-food-in-pondicherry.pdf';
        link.download = 'famous-food-in-pondicherry.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        trackEvent('PDF Downloaded', 'content_access', 'auto_download');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 pt-32 pb-12">
            <MetaTags
                title="Success! | LocalBitesPondy"
                description="Your Pondicherry food guide is downloading."
                canonical="https://localbitespondy.netlify.app/thank-you"
                robots="noindex, nofollow"
            />

            <div className="max-w-md w-full text-center animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-8">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">You're All Set!</h1>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                    Your "Not-So-Secret" Food Guide is downloading automatically.
                </p>

                <div className="space-y-4 max-w-sm mx-auto">
                    <button
                        onClick={triggerDownload}
                        className="flex items-center justify-center gap-3 w-full bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl hover:shadow-orange-200 transform hover:scale-[1.02]"
                    >
                        <Download className="w-5 h-5" />
                        Download Didn't Start?
                    </button>
                    
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-3 w-full bg-gray-50 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                </div>

                <p className="mt-16 text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} LocalBitesPondy
                </p>
            </div>
        </div>
    );
};

export default ThankYou;


