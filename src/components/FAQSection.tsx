import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SchemaMarkup } from './SchemaMarkup';

// ✅ AEO: Every answer is 3-5 sentences — the minimum length AI engines need to cite a source as authoritative.
// ✅ SEO: Questions match exact search queries. Answers use natural keywords without stuffing.

const FALLBACK_FAQS = [
    {
        question: "What is the most famous food in Pondicherry?",
        answer: "Pondicherry is most famous for its unique fusion of Tamil and French cuisines, often called 'Creole' food. Must-try dishes include the Ghee Roast at Surguru, freshly baked croissants from boulangeries like Le Petit Four, Zuka's famous Hot Chocolate, and Seeraga Samba Biryani. Unlike other South Indian cities, you can find a 100-year-old French bakery and a traditional Tamil mess on the very same street, offering a culinary variety that is rare in India."
    },
    {
        question: "Why is Pondicherry food different from other South Indian cities?",
        answer: "Pondicherry's food culture is shaped by its history as a French colonial post, which introduced European baking and 'slow dining' to the local Tamil palate. While Chennai or Madurai are predominantly Tamil, Pondy's White Town is home to authentic French boulangeries and heritage cafes that have been operating for generations. This has resulted in unique fusion dishes like Rasam aux Crevettes and a specialized baking culture that is more authentic than almost anywhere else in India. The availability of wine and a continental cafe vibe further distinguishes it from its neighbours."
    },
    {
        question: "Where can I find the best seafood in Pondicherry?",
        answer: "For the best seafood, skip the touristy promenade restaurants and head to Mass Seafood for authentic Tamil-style prawn masala or small messes near the fishing harbour. If you're looking for French-style grilled fish or lobster, White Town's heritage bistros are your best bet. Always ask for the 'catch of the day' — the most reputable spots source directly from the morning's fishing boats, ensuring freshness that pre-frozen menus can't match. Look for places that specialize in seafood rather than multi-cuisine restaurants."
    },
    {
        question: "What are the common tourist traps to avoid in Pondicherry?",
        answer: "The biggest 'trap' is the over-reliance on Baker Street; while iconic, it's often overcrowded and locals now prefer Le Petit Four or Bouche Sucrée for better quality. Be wary of restaurants on the main Promenade that have huge, generic menus but no visible fresh catch. Another common pitfall is agreeing to fixed-rate auto rickshaws; always use an app like Ola or Rapido to check the fair price first. Lastly, don't treat White Town as just a photo studio — be respectful of the residents who live in these heritage homes."
    }
];

export const FAQSection = () => {
    const { data } = useContent();
    const faqs = data?.FAQs || FALLBACK_FAQS;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqSchema = useMemo(() => {
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq: any) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
    }, [faqs]);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 bg-white">
            <SchemaMarkup schema={faqSchema} />
            <div className="mx-auto max-w-4xl px-6">
                <div className="text-center mb-12">
                    {/* ✅ SEO: H2 with keyword */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                        <HelpCircle className="text-orange-500 h-8 w-8" />
                        Frequently Asked Questions About Food in Pondicherry
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Everything you need to know about famous food in Pondicherry — answered by locals who've eaten here their whole lives.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq: any, index: number) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-5 bg-gray-50 text-left focus:outline-none"
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="h-5 w-5 text-orange-500 shrink-0" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                                )}
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                    }`}
                            >
                                {/* ✅ AEO: Rich paragraph answers — ideal for AI snippet extraction */}
                                <div className="p-5 bg-white text-gray-700 leading-relaxed border-t border-gray-100 text-base">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
