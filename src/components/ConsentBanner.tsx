import { useState, useEffect } from 'react';
import { trackConsentUpdate } from '../services/analytics';

declare global {
    interface Window {
        consentGrantAll?: () => void;
        consentDenyAll?: () => void;
    }
}

export const ConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check local storage — only show banner if no prior choice
        const choice = localStorage.getItem('cookie_consent');
        if (!choice) {
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'granted');
        // Update Google Consent Mode v2 — grant all
        window.consentGrantAll?.();
        // Push GTM-friendly event so consent-aware tags can fire
        trackConsentUpdate('granted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie_consent', 'denied');
        // Explicit deny — keeps tags in cookieless/anonymous mode
        window.consentDenyAll?.();
        trackConsentUpdate('denied');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            role="region"
            aria-label="Cookie consent"
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-lg md:p-6 animate-fade-in-up"
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                <div className="text-center md:text-left">
                    <p className="text-sm text-gray-600">
                        We use cookies for analytics and advertising to improve your experience.
                        You can accept all, reject all, or read our{' '}
                        <a href="/privacy-policy" className="text-orange-600 underline hover:text-orange-700">
                            privacy policy
                        </a>
                        .
                    </p>
                </div>
                <div className="flex flex-shrink-0 gap-3">
                    <button
                        type="button"
                        onClick={handleReject}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 transition-colors"
                    >
                        Reject
                    </button>
                    <button
                        type="button"
                        onClick={handleAccept}
                        className="rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors"
                    >
                        Accept all
                    </button>
                </div>
            </div>
        </div>
    );
};
