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
                        "headline": "Famous Food in Pondicherry: Local's Guide 2026",
                        "description": "A comprehensive guide to the most famous and best local food in Pondicherry, covering street food, restaurants, French Quarter cuisine, and hidden gems.",
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
                        "about": {
                            "@type": "Place",
                            "name": "Pondicherry",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Pondicherry",
                                "addressRegion": "Puducherry",
                                "addressCountry": "IN"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": 11.9416,
                                "longitude": 79.8083
                            }
                        },
                        "keywords": "famous food Pondicherry, best restaurants Pondicherry, street food Pondy, local food guide"
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
                title="Famous Food in Pondicherry: Local's Guide 2026 | LocalBitesPondy"
                description="Discover the most famous food in Pondicherry — from crispy dosas and fresh seafood to French-inspired crepes. Your local guide to the best eats in Pondy 2026."
                keywords="famous food in Pondicherry, best restaurants Pondicherry, Pondicherry street food, local food guide Pondy, what to eat in Pondicherry, Pondicherry cuisine 2026"
                canonical="https://localbitespondy.netlify.app/"
                ogImage="https://localbitespondy.netlify.app/og-image.jpg"
                ogImageAlt="Famous food in Pondicherry - Local's Guide 2026"
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
