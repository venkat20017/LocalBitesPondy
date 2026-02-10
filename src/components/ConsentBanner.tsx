import { useState, useEffect } from 'react';

export const ConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check local storage to see if user has already consented
        const hasConsented = localStorage.getItem('cookie_consent');
        if (!hasConsented) {
            // Show banner after a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-lg md:p-6 animate-fade-in-up">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                <div className="text-center md:text-left">
                    <p className="text-sm text-gray-600">
                        We use cookies to improve your experience and analyze site traffic.
                        By continuing to use our site, you agree to our use of cookies.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleAccept}
                        className="rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors"
                    >
                        Got it, thanks!
                    </button>
                </div>
            </div>
        </div>
    );
};
