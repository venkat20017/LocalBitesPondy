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
        // Inject JSON-LD Schema (AEO/AI Engine Optimized)
        const schemaId = 'json-ld-home';
        let script = document.getElementById(schemaId) as HTMLScriptElement;
        if (!script) {
            script = document.createElement('script');
            script.id = schemaId;
            script.type = 'application/ld+json';
            script.text = JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebSite",
                        "@id": "https://localbitespondy.netlify.app/#website",
                        "url": "https://localbitespondy.netlify.app/",
                        "name": "LocalBitesPondy",
                        "description": "Local food guide for the best and most famous food in Pondicherry, India",
                        "inLanguage": "en-IN",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": {
                                "@type": "EntryPoint",
                                "urlTemplate": "https://localbitespondy.netlify.app/?s={search_term_string}"
                            },
                            "query-input": "required name=search_term_string"
                        }
                    },
                    {
                        "@type": "Article",
                        "@id": "https://localbitespondy.netlify.app/#article",
                        "headline": "The 'Not-So-Secret' Guide to Famous Food in Pondicherry 2026",
                        "description": "A deep dive into Pondicherry's real food scene. Skip the tourist traps and discover authentic Tamil messes, heritage Creole fusion, and the best French boulangeries (beyond the hype).",
                        "url": "https://localbitespondy.netlify.app/",
                        "datePublished": "2026-01-01",
                        "dateModified": "2026-03-01",
                        "author": {
                            "@type": "Organization",
                            "name": "LocalBitesPondy",
                            "url": "https://localbitespondy.netlify.app/"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "LocalBitesPondy",
                            "url": "https://localbitespondy.netlify.app/",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://localbitespondy.netlify.app/logo.png"
                            }
                        },
                        "about": [
                            {
                                "@type": "Place",
                                "name": "Surguru Pondicherry"
                            },
                            {
                                "@type": "Place",
                                "name": "Zuka Pondicherry"
                            },
                            {
                                "@type": "Place",
                                "name": "Coromandel Cafe"
                            }
                        ],
                        "keywords": "famous food Pondicherry, best restaurants Pondicherry, street food Pondy, local food guide, Surguru, Zuka, Creole food"
                    },
                    {
                        "@type": "FAQPage",
                        "@id": "https://localbitespondy.netlify.app/#faqpage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What is the most famous food in Pondicherry?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Pondicherry is famous for its unique blend of Tamil and French cuisine. Must-try foods include fresh seafood, crispy dosas, French crepes, baguettes, and local street food like sundal and kothu parotta."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Where can I find the best local food in Pondicherry?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "The best local food in Pondicherry can be found in the White Town (French Quarter) for fusion cuisine, along the beach promenade for street food, and in the Tamil Quarter markets for authentic South Indian dishes."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What is unique about Pondicherry food culture?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Pondicherry's food culture is unique because it blends South Indian Tamil cuisine with French colonial influences. You can find authentic French bakeries next to traditional South Indian tiffin centres, making it a one-of-a-kind culinary destination."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is Pondicherry good for food tourism?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes! Pondicherry is an excellent destination for food tourism. It offers a diverse range of cuisines, from coastal seafood and street food to fine dining and French-inspired cafes, all at affordable prices."
                                }
                            }
                        ]
                    },
                    {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://localbitespondy.netlify.app/"
                            }
                        ]
                    }
                ]
            });
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
                title="Famous Food in Pondicherry: The 'Not-So-Secret' Local's Guide 2026"
                description="Discover the real famous food in Pondicherry. From Surguru's Ghee Roast and Zuka's Hot Chocolate to hidden Creole gems. Skip the tourist traps with our local guide."
                keywords="famous food in Pondicherry, best restaurants Pondicherry, Pondicherry street food, local food guide Pondy, what to eat in Pondicherry, Surguru Pondicherry, Zuka Pondicherry, Creole food Pondicherry"
                canonical="https://localbitespondy.netlify.app/"
                ogImage="https://localbitespondy.netlify.app/og-image.jpg"
                ogImageAlt="Famous food in Pondicherry - The Not-So-Secret Local's Guide"
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
