import { createClient } from '@sanity/client';

// Make sure to add your Project ID to your .env file as VITE_SANITY_PROJECT_ID
const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
    dataset: 'production',
    useCdn: true, // Optimized for production: enables edge caching for faster load times
    apiVersion: '2024-01-01',
});

export const fetchAllWebsiteData = async () => {
    try {
        const query = `{
            "Settings": *[_type == "siteSettings"][0]{ ..., "heroImageUrl": heroImage.asset->url, "heroImageAlt": heroImage.alt },
            "FAQs": *[_type == "faq"],
            "TraditionalFood": *[_type == "traditionalFood"]{ ..., "imageUrl": image.asset->url, "imageAlt": image.alt },
            "FrenchCafes": *[_type == "frenchCafe"]{ ..., "imageUrl": image.asset->url, "imageAlt": image.alt },
            "Seafood": *[_type == "seafood"]{ ..., "imageUrl": image.asset->url, "imageAlt": image.alt },
            "StreetFood": *[_type == "streetFood"]{ ..., "imageUrl": image.asset->url, "imageAlt": image.alt }
        }`;

        const data = await client.fetch(query);
        return data;
    } catch (error) {
        console.error('Error fetching entire website data from Sanity:', error);
        return null;
    }
};

// We export a dummy parseSettings function so we don't break other files immediately,
// but Sanity returns the object directly so we just return the object as-is.
export const parseSettings = (settings: any) => {
    return settings || {};
};
