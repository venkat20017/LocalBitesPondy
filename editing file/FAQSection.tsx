import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

// ✅ AEO: Every answer is 3-5 sentences — the minimum length AI engines need to cite a source as authoritative.
// ✅ SEO: Questions match exact search queries. Answers use natural keywords without stuffing.

const faqs = [
    {
        question: "What is the most famous food in Pondicherry?",
        answer: "Pondicherry is most famous for its unique French-Tamil fusion cuisine. The must-try dishes include Meen Kuzhambu (tamarind fish curry), crispy dosas served with coconut chutney and sambar, freshly baked croissants from French-style boulangeries, prawn masala cooked in coastal spices, and kothu parotta from street stalls. The city is also well-known for its Seeraga Samba biryani — a fragrant, small-grain rice biryani unique to South Tamil Nadu and Pondicherry. No other city in India offers this combination of South Indian and French cuisine in the same neighbourhood."
    },
    {
        question: "Why is Pondicherry food different from other South Indian cities?",
        answer: "Pondicherry's food is unique because it's the only city in South India where Tamil culinary traditions and French colonial influence have merged into a single food culture over centuries. While cities like Chennai and Coimbatore are predominantly Tamil in their cuisine, Pondicherry's White Town (French Quarter) is home to authentic French bakeries, crepe cafés, and bistros that have been operating for generations. This means you can have a traditional idli-sambar breakfast at a local mess and walk five minutes to get a freshly baked pain au chocolat from a heritage boulangerie — all in the same morning. The French influence is most visible in the baking culture, wine availability, and café dining style that simply doesn't exist elsewhere in South India."
    },
    {
        question: "Where can I find the best seafood in Pondicherry?",
        answer: "The best seafood in Pondicherry is found at beachside restaurants along the Promenade and at local fishing-community eateries near the harbour. FinZ — Seafood & Barbeque is a well-known spot for grilled and coastal-style seafood. For more authentic, budget-friendly options, look for small non-touristy restaurants in the Tamil Quarter that serve Nandu Kuzhambu (crab curry), fish fry with spiced marinade, and grilled lobster with garlic butter using the morning's fresh catch. The key is to ask for the 'fresh catch of the day' — Pondicherry's fishing boats bring in fresh catches daily, so the seafood quality is exceptional compared to inland cities."
    },
    {
        question: "What is the best area in Pondicherry for food lovers?",
        answer: "For food lovers, Pondicherry has two distinct zones worth exploring. White Town (the French Quarter) is ideal for French-inspired breakfasts, heritage cafés, fresh pastries, and fine dining — places like Café des Arts and The Pavilion are located here. The Tamil Quarter and local market areas around MG Road and the bus stand are the go-to spots for authentic South Indian food: biryani, street snacks, tiffin centres, and affordable thali restaurants. The beach promenade is the best place for evening street food — sundal, bajji, masala pori, and fresh coconut water. For a complete food experience, spend mornings in White Town and evenings along the beach road."
    },
    {
        question: "Is Pondicherry good for vegetarian food?",
        answer: "Yes, Pondicherry is an excellent destination for vegetarian food. The Tamil restaurant scene is deeply rooted in vegetarian South Indian cuisine — most traditional mess-style eateries serve full vegetarian thalis on banana leaves with rice, sambar, rasam, kootu, and 3-4 side dishes for under ₹100. Idli, dosa, upma, pongal, and vada are available at almost every street-side tiffin centre from 6 AM onwards. French cafés in White Town also cater well to vegetarians with quiches, crepes with fruit fillings, vegetable ratatouille, and salads. Vegetarian travellers will find Pondicherry far more accommodating than many other Indian coastal cities."
    },
    {
        question: "What is the best biryani in Pondicherry?",
        answer: "The best biryani in Pondicherry is the Seeraga Samba biryani — a variety that uses small-grain, fragrant Seeraga Samba rice (also called Samba rice) instead of the usual Basmati. This style is unique to Tamil Nadu and Pondicherry, and the result is a denser, more flavourful biryani with a distinct aroma. Kamatchi Biriyani is a legendary local spot famous for their wood-fired preparation that sells out by 1 PM daily. For Mughlai-style biryani, Kodai Ispah is popular for rich masala and tender meat. Chettinad-style biryani, available at places like Copper Kitchen, is another must-try for those who enjoy intense spice profiles."
    },
    {
        question: "What are the best street foods to try in Pondicherry?",
        answer: "Pondicherry's street food scene is best explored in the evenings along the beach promenade and near the local markets. The top street foods to try are Sundal (spiced boiled chickpeas tossed with coconut and curry leaves), Bajji and Bonda (deep-fried fritters), Egg Kothu Parotta (shredded parotta stir-fried with eggs and spices), Masala Pori (puffed rice snack), and freshly cut sugarcane juice. For breakfast street food, look for push-cart vendors selling crispy dosas and idlis near the bus stand from 6–9 AM. Most street food in Pondicherry costs between ₹20–60 per serving, making it one of the most budget-friendly street food destinations in South India."
    },
    {
        question: "What is the best time to visit Pondicherry for food?",
        answer: "The best time to visit Pondicherry for food is between October and March, when the weather is cooler and pleasant. This period also coincides with major food festivals — Pongal celebrations in January bring special traditional sweets and harvest meals, while the French-influenced Bastille Day in July features special French menu events at White Town restaurants. Mornings (6–10 AM) are the best time to experience Tamil breakfast culture — tiffin centres and push-cart vendors are at their freshest. Evenings from 6–9 PM are ideal for street food and beachside dining. Seafood is best on weekday mornings when the fresh catch arrives from the fishing harbour."
    }
];

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-white">
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
                                <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="h-5 w-5 text-orange-500 shrink-0" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                                )}
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${
                                    openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
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
