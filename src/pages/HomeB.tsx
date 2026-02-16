import { useEffect } from 'react';
import { HeroB } from '../components/HeroB';
import { SEOSections } from '../components/SEOSections';
import { SecondEmailCapture } from '../components/SecondEmailCapture';
import { ContactUs } from '../components/ContactUs';
import { FAQSection } from '../components/FAQSection';

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
                            "text": "The famous food in Pondicherry includes seafood dishes like prawn masala and fish curry, traditional Tamil meals, French pastries, crepes, and beachside grilled seafood."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Why is Pondicherry food different from other South Indian cities?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Pondicherry food is unique because of its French colonial influence combined with Tamil cuisine. This fusion creates dishes that blend European baking techniques with Indian spices."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Where can I try the best seafood in Pondicherry?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "You can try fresh seafood at beachside restaurants and places like FinZ - Seafood & Barbeque, which is known for grilled and coastal-style seafood dishes."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Is Pondicherry good for vegetarian food?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Pondicherry offers many vegetarian Tamil restaurants serving dosa, idli, sambar, and full meals, along with French cafes offering vegetarian and vegan-friendly options."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Which area in Pondicherry is best for food lovers?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "White Town is the best area for French cafes and heritage dining, while local market areas and beach roads are great for traditional and street food."
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
            <FAQSection />
            <ContactUs />
        </>
    );
};
