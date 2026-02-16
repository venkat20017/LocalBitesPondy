import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection = () => {
    const faqs = [
        {
            question: "What is the famous food in Pondicherry?",
            answer: "The famous food in Pondicherry includes seafood dishes like prawn masala and fish curry, traditional Tamil meals, French pastries, crepes, and beachside grilled seafood."
        },
        {
            question: "Why is Pondicherry food different from other South Indian cities?",
            answer: "Pondicherry food is unique because of its French colonial influence combined with Tamil cuisine. This fusion creates dishes that blend European baking techniques with Indian spices."
        },
        {
            question: "Where can I try the best seafood in Pondicherry?",
            answer: "You can try fresh seafood at beachside restaurants and places like FinZ - Seafood & Barbeque, which is known for grilled and coastal-style seafood dishes."
        },
        {
            question: "Is Pondicherry good for vegetarian food?",
            answer: "Yes. Pondicherry offers many vegetarian Tamil restaurants serving dosa, idli, sambar, and full meals, along with French cafes offering vegetarian and vegan-friendly options."
        },
        {
            question: "Which area in Pondicherry is best for food lovers?",
            answer: "White Town is the best area for French cafes and heritage dining, while local market areas and beach roads are great for traditional and street food."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-white">
            <div className="mx-auto max-w-4xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                        <HelpCircle className="text-orange-500 h-8 w-8" />
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600">Quick answers to your questions about famous food in Pondicherry.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-5 bg-gray-50 text-left focus:outline-none"
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="h-5 w-5 text-orange-500" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                )}
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-5 bg-white text-gray-700 leading-relaxed border-t border-gray-100">
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
