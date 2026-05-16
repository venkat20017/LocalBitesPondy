import React, { Suspense, lazy } from 'react';
import { HeroB } from '../components/HeroB';
import { SEOSections } from '../components/SEOSections';
import { MetaTags } from '../components/MetaTags';
import { useContent } from '../context/ContentContext';

const BestBiriyani = lazy(() => import('../components/BestBiriyani').then(m => ({ default: m.BestBiriyani })));
const BestHotels = lazy(() => import('../components/BestHotels').then(m => ({ default: m.BestHotels })));
const WhyGuide = lazy(() => import('../components/WhyGuide').then(m => ({ default: m.WhyGuide })));
const SecondEmailCapture = lazy(() => import('../components/SecondEmailCapture').then(m => ({ default: m.SecondEmailCapture })));
const FAQSection = lazy(() => import('../components/FAQSection').then(m => ({ default: m.FAQSection })));
const ContactUs = lazy(() => import('../components/ContactUs').then(m => ({ default: m.ContactUs })));

export const HomeB = () => {
    const { data } = useContent();
    
    React.useEffect(() => {
        // Inject JSON-LD Schema (AEO/AI Engine Optimized)
        const schemaId = 'json-ld-home';
        
        // Dynamic FAQ Entities from Content or Fallback
        const faqs = data?.FAQs || [
            {
                question: "What is the most famous food in Pondicherry?",
                answer: "Pondicherry is famous for its unique blend of Tamil and French cuisine. Must-try foods include Surguru's Ghee Roast, fresh coastal seafood, French crepes, and authentic Creole fish curry."
            },
            {
                question: "Where do locals eat in Pondicherry?",
                answer: "Locals prefer traditional messes like Surguru for breakfast, small seafood spots like Mass Seafood for lunch, and MG Road street vendors for evening snacks like Bajji and Kothu Parotta."
            },
            {
                question: "What is unique about Pondicherry food culture?",
                answer: "It is the only place in India where French colonial baking (croissants, baguettes) and traditional Tamil spices merge into 'Creole' cuisine, offering a one-of-a-kind culinary experience."
            }
        ];

        const faqEntities = faqs.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }));

        let script = document.getElementById(schemaId) as HTMLScriptElement;
        if (script) {
            script.remove(); // Remove old script if content updated
        }
        
        script = document.createElement('script');
        script.id = schemaId;
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Person",
                    "@id": "https://localbitespondy.netlify.app/#person",
                    "name": "Venkatesh Prasad",
                    "url": "https://localbitespondy.netlify.app/",
                    "jobTitle": "Local Food Expert",
                    "sameAs": [
                        "https://www.linkedin.com/in/venkat20017/",
                        "https://www.instagram.com/localbitespondy/"
                    ]
                },
                {
                    "@type": "WebSite",
                    "@id": "https://localbitespondy.netlify.app/#website",
                    "url": "https://localbitespondy.netlify.app/",
                    "name": "LocalBitesPondy",
                    "alternateName": "Local Bites Pondicherry",
                    "publisher": { "@id": "https://localbitespondy.netlify.app/#person" },
                    "description": "The definitive local food guide for Pondicherry. Discover authentic Tamil dishes, French Quarter cafes, and hidden street food gems.",
                    "inLanguage": "en-IN"
                },
                {
                    "@type": "Article",
                    "@id": "https://localbitespondy.netlify.app/#article",
                    "headline": "Famous Food in Pondicherry — Local Guide to Best Restaurants Near You",
                    "description": "Discover the most famous food in Pondicherry — from affordable breakfast near you to the best dinner restaurants locals actually eat at. French Creole, Tamil classics, street food and seafood. Updated 2026.",
                    "url": "https://localbitespondy.netlify.app/",
                    "datePublished": "2026-01-01",
                    "dateModified": "2026-04-21",
                    "author": { "@id": "https://localbitespondy.netlify.app/#person" },
                    "publisher": { "@id": "https://localbitespondy.netlify.app/#person" }
                },
                {
                    "@type": "FAQPage",
                    "@id": "https://localbitespondy.netlify.app/#faqpage",
                    "mainEntity": faqEntities
                }
            ]
        });
        document.head.appendChild(script);

        return () => {
            const schema = document.getElementById(schemaId);
            if (schema) document.head.removeChild(schema);
        };
    }, [data]); // Re-run when CMS data updates

    return (
        <main className="overflow-x-hidden">
            <MetaTags
                title="LocalBitesPondy | Discover Pondicherry Food Spots"
                description="Discover the most famous food in Pondicherry — from affordable breakfast near you to the best dinner restaurants locals actually eat at. French Creole, Tamil classics, street food and seafood. Updated 2026."
                keywords="famous food in Pondicherry, best restaurants Pondicherry, Pondicherry street food, local food guide Pondy, what to eat in Pondicherry, Surguru Pondicherry, Zuka Pondicherry, Creole food Pondicherry"
                canonical="https://localbitespondy.netlify.app/"
                ogImage="https://localbitespondy.netlify.app/og-image.jpg"
                ogImageAlt="Famous food in Pondicherry - The Ultimate Local's Guide"
            />
            
            <HeroB />
            
            <nav className="sr-only">
                <ul>
                    <li><a href="#famous-food">Tamil & Creole Food</a></li>
                    <li><a href="#french-cafes">French Cafes</a></li>
                    <li><a href="#seafood">Seafood</a></li>
                    <li><a href="#street-food">Street Food</a></li>
                    <li><a href="#restaurants">Best Restaurants</a></li>
                    <li><a href="#foodie-guide">Survival Guide</a></li>
                    <li><a href="#faq">FAQ</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
            </nav>

            <SEOSections />
            
            <Suspense fallback={<div className="h-32"></div>}>
                <BestBiriyani />
                <BestHotels />
                <WhyGuide />
                <SecondEmailCapture />
                <FAQSection />
                <ContactUs />
            </Suspense>
        </main>
    );
};

