import { useEffect } from 'react';
import { HeroB } from '../components/HeroB';
import { SEOSections } from '../components/SEOSections';
import { SecondEmailCapture } from '../components/SecondEmailCapture';
import { ContactUs } from '../components/ContactUs';
import { FAQSection } from '../components/FAQSection';
import { MetaTags } from '../components/MetaTags';
import { BestBiriyani } from '../components/BestBiriyani';
import { BestHotels } from '../components/BestHotels';
import { WhyGuide } from '../components/WhyGuide';

export const HomeB = () => {
    useEffect(() => {
        // Inject JSON-LD Schema
        const schemaId = 'json-ld-home';
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
                        "@id": "https://localbitespondy.netlify.app/"
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
            const schema = document.getElementById(schemaId);
            if (schema) document.head.removeChild(schema);
        };
    }, []);

    return (
        <>
            <MetaTags
                title="Famous Foods of Pondicherry | Best Restaurants & Guide"
                description="Discover famous food in Pondicherry including seafood, French cafes, Tamil dishes, and top restaurants. Complete foodie guide for visitors."
                canonical="https://localbitespondy.netlify.app/"
            />
            <HeroB />
            <SEOSections />
            <BestBiriyani />
            <BestHotels />
            <WhyGuide />
            <SecondEmailCapture />
            <FAQSection />
            <ContactUs />
        </>
    );
};
