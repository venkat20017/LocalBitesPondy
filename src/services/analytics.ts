export const trackConversion = (label: string) => {
    console.log(`[Analytics] Conversion tracked: ${label}`);

    if (window.gtag) {
        window.gtag('event', 'conversion', {
            'event_category': 'lead_generation',
            'event_label': label,
            'value': 1
        });
    } else {
        console.warn('Google Analytics (gtag) not found.');
    }
};

// Add type for window.gtag
declare global {
    interface Window {
        gtag?: (command: string, action: string, params?: Record<string, any>) => void;
    }
}
