import { useEffect } from 'react';
import { trackPageView } from '../services/analytics';

interface MetaTagsProps {
    title: string;
    description: string;
    canonical?: string;
}

export const MetaTags = ({ title, description, canonical }: MetaTagsProps) => {
    useEffect(() => {
        // Update Document Title
        document.title = title;

        // Update Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');

        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            metaDescription.setAttribute('content', description);
            document.head.appendChild(metaDescription);
        }

        // Update Canonical Link
        if (canonical) {
            let canonicalLink = document.querySelector('link[rel="canonical"]');
            if (canonicalLink) {
                canonicalLink.setAttribute('href', canonical);
            } else {
                canonicalLink = document.createElement('link');
                canonicalLink.setAttribute('rel', 'canonical');
                canonicalLink.setAttribute('href', canonical);
                document.head.appendChild(canonicalLink);
            }
        }

        // Explicitly track page view for GA4
        trackPageView(window.location.pathname);
    }, [title, description, canonical]);

    return null;
};
