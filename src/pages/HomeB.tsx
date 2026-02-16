import { useEffect } from 'react';
import { HeroB } from '../components/HeroB';
import { SEOSections } from '../components/SEOSections';
import { SecondEmailCapture } from '../components/SecondEmailCapture';
import { ContactUs } from '../components/ContactUs';

export const HomeB = () => {
    useEffect(() => {
        // 1. Manage Meta Tags (Description, Noindex)
        const metaTags = [
            { id: 'robots-noindex-home-b', name: 'robots', content: 'noindex' },
            { id: 'meta-desc-home-b', name: 'description', content: 'Discover famous food in Pondicherry including seafood, French cafes, Tamil dishes, and top restaurants. Complete foodie guide for visitors.' }
        ];

        metaTags.forEach(tagData => {
            let meta = document.getElementById(tagData.id) as HTMLMetaElement;
            if (!meta) {
                meta = document.createElement('meta');
                meta.id = tagData.id;
                meta.name = tagData.name;
                meta.content = tagData.content;
                document.head.appendChild(meta);
            }
        });

        // 2. Set Page Title
        const originalTitle = document.title;
        document.title = 'Famous Foods of Pondicherry | Best Restaurants & Guide';

        // 3. Inject JSON-LD Schema
        const schemaId = 'json-ld-home-b';
        let script = document.getElementById(schemaId) as HTMLScriptElement;
        if (!script) {
            script = document.createElement('script');
            script.id = schemaId;
            script.type = 'application/ld+json';
            script.text = JSON.stringify([
                {
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "Famous Foods of Pondicherry – Complete Food Guide",
                    "description": "Explore famous food in Pondicherry including Tamil dishes, French cafes, seafood restaurants and street food.",
                    "author": {
                        "@type": "Person",
                        "name": "Venkatesh Prasad"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "LocalBites Pondy"
                    },
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": "https://localbitespondy.netlify.app/home-b"
                    }
                },
                {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [{
                        "@type": "Question",
                        "name": "What is the famous food in Pondicherry?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Pondicherry is famous for seafood, French pastries, Tamil meals, prawn masala and fish curry."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Where can I try French food in Pondicherry?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "White Town area has popular French cafes serving croissants, crepes and continental dishes."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Is Pondicherry good for vegetarian food?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, Pondicherry offers many vegetarian-friendly Tamil restaurants and vegan-friendly cafes."
                        }
                    }]
                }
            ]);
            document.head.appendChild(script);
        }

        // Cleanup
        return () => {
            metaTags.forEach(tagData => {
                const tag = document.getElementById(tagData.id);
                if (tag) document.head.removeChild(tag);
            });
            const schema = document.getElementById(schemaId);
            if (schema) document.head.removeChild(schema);
            document.title = originalTitle;
        };
    }, []);

    return (
        <>
            <HeroB />
            <SEOSections />
            <SecondEmailCapture />
            <ContactUs />
        </>
    );
};
