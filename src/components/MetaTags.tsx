import { useEffect } from 'react';
import { trackPageView } from '../services/analytics';

interface MetaTagsProps {
    title: string;
    description: string;
    keywords?: string;
    author?: string;
    robots?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
    ogImageAlt?: string;
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
    geoRegion?: string;
    geoPlacename?: string;
    geoPosition?: string;
    icbm?: string;
}

export const MetaTags = ({
    title,
    description,
    keywords,
    author = 'LocalBitesPondy',
    robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    canonical,
    ogType = 'website',
    ogImage = 'https://localbitespondy.netlify.app/og-image.jpg',
    ogImageAlt,
    twitterCard = 'summary_large_image',
    geoRegion = 'IN-PY',
    geoPlacename = 'Pondicherry, India',
    geoPosition = '11.9416;79.8083',
    icbm = '11.9416, 79.8083'
}: MetaTagsProps) => {
    useEffect(() => {
        // Update Document Title
        document.title = title;

        const setMetaTag = (attr: string, value: string, content: string, isProperty = false) => {
            const selector = isProperty ? `meta[property="${value}"]` : `meta[${attr}="${value}"]`;
            let element = document.querySelector(selector);
            if (element) {
                element.setAttribute('content', content);
            } else {
                element = document.createElement('meta');
                element.setAttribute(isProperty ? 'property' : attr, value);
                element.setAttribute('content', content);
                document.head.appendChild(element);
            }
        };

        // Primary SEO
        setMetaTag('name', 'description', description);
        if (keywords) setMetaTag('name', 'keywords', keywords);
        setMetaTag('name', 'author', author);
        setMetaTag('name', 'robots', robots);

        // Open Graph
        setMetaTag('property', 'og:type', ogType, true);
        setMetaTag('property', 'og:title', title, true);
        setMetaTag('property', 'og:description', description, true);
        setMetaTag('property', 'og:url', canonical || window.location.href, true);
        setMetaTag('property', 'og:site_name', 'LocalBitesPondy', true);
        setMetaTag('property', 'og:locale', 'en_IN', true);
        setMetaTag('property', 'og:image', ogImage, true);
        if (ogImageAlt || title) setMetaTag('property', 'og:image:alt', ogImageAlt || title, true);

        // Twitter
        setMetaTag('name', 'twitter:card', twitterCard);
        setMetaTag('name', 'twitter:title', title);
        setMetaTag('name', 'twitter:description', description);
        setMetaTag('name', 'twitter:image', ogImage);

        // Geo
        setMetaTag('name', 'geo.region', geoRegion);
        setMetaTag('name', 'geo.placename', geoPlacename);
        setMetaTag('name', 'geo.position', geoPosition);
        setMetaTag('name', 'ICBM', icbm);

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
    }, [title, description, keywords, author, robots, canonical, ogType, ogImage, ogImageAlt, twitterCard, geoRegion, geoPlacename, geoPosition, icbm]);

    return null;
};
