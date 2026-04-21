export interface ClusterData {
    id: string;
    title: string;
    description: string;
    content: {
        intro: string;
        sections: {
            title: string;
            items?: { name: string; desc: string }[];
            text?: string;
        }[];
        conclusion?: string;
    };
    // 2-3 Q&As per cluster, used both as visible FAQ content on the page
    // and as FAQPage JSON-LD for Google's FAQ rich-result eligibility.
    faqs?: { q: string; a: string }[];
}

export const clusterData: Record<string, ClusterData> = {
    "/tamil-dishes": {
        id: "tamil-dishes",
        title: "Traditional Tamil Dishes & Creole Secrets in Pondicherry",
        description: "Explore the authentic flavors of Pondicherry with our guide to the best Tamil traditional meals and rare Creole fusion.",
        content: {
            intro: "While the yellow walls of White Town get all the attention, the real soul of Pondicherry's food scene lies in its Tamil and Creole kitchens. Traditional Tamil dishes form the foundation of everyday life here, but it's the 'Creole' fusion — a 200-year-old mix of French techniques and Tamil spices — that makes this city truly unique. If you want a true cultural food experience, you have to look beyond the tourist cafes.",
            sections: [
                {
                    title: "The Staples: Tamil Comfort Food",
                    items: [
                        { name: "Surguru's Ghee Roast", desc: "A local legend. It's paper-thin, buttery, and served with a variety of chutneys that define the South Indian breakfast experience." },
                        { name: "Meen Kuzhambu (Fish Curry)", desc: "A tangy, tamarind-based curry that is the backbone of coastal Tamil cooking. Best enjoyed at a local mess near the harbour." },
                        { name: "Seeraga Samba Biryani", desc: "Unlike the long-grain Basmati biryanis, this uses the small, fragrant Samba rice unique to the region. It's lighter and more aromatic." },
                        { name: "Nandu Kuzhambu (Crab Curry)", desc: "A spicy, peppery local favourite. Prepared with freshly caught crab and roasted masala paste." }
                    ]
                },
                {
                    title: "The Creole Secret",
                    text: "Creole food is Pondicherry's best-kept secret. It's a milder, more aromatic version of Tamil food, influenced by French palates. Dishes like Rasam aux Crevettes (shrimp rasam) or mild coconut-based fish curries are typical. To find authentic Creole food, you often have to look for home-dining experiences like Chez Pushpa."
                },
                {
                    title: "Where to Find the Real Deal",
                    text: "Skip the air-conditioned restaurants and look for 'Messes'. These small, family-run spots serve unlimited meals on banana leaves for under ₹120. Look for hand-written Tamil menus — that's the sign of genuine home-style cooking."
                }
            ]
        },
        faqs: [
            {
                q: "What is Creole food in Pondicherry?",
                a: "Creole food in Pondicherry is a 200-year-old fusion cuisine that blends French cooking techniques with Tamil spices. Typical dishes include coconut-milk fish curries, Rasam aux Crevettes (shrimp rasam), and mild meat stews. It is rarely served in mainstream restaurants — you'll find it at heritage home-dining spots like Chez Pushpa."
            },
            {
                q: "Where can I find authentic Tamil food in Pondicherry?",
                a: "For authentic Tamil food in Pondicherry, skip the tourist cafes in White Town and head to 'mess' restaurants in the Tamil Quarter. Surguru is legendary for its ghee roast and filter coffee, while small family-run messes serve banana-leaf meals for under ₹120. Look for hand-written Tamil menus — that's a reliable sign of home-style cooking."
            },
            {
                q: "What is Seeraga Samba biryani?",
                a: "Seeraga Samba biryani is Pondicherry's signature biryani, made with small-grain Samba rice instead of long-grain Basmati. It's more fragrant, lighter on the stomach, and traditionally cooked in wood-fired pots. The best versions are found at dedicated 'biryani mess' spots in the Tamil Quarter rather than big chains."
            }
        ]
    },
    "/french-quarter": {
        id: "french-cafes",
        title: "The 'Not-So-Tourist' Guide to French Cafes in White Town",
        description: "Discover the real French charm of White Town with our curated list of the best heritage cafes and boulangeries.",
        content: {
            intro: "Pondicherry's French Quarter is the only place in India where you'll find authentic 100-year-old boulangeries. But don't just follow the crowds to Baker Street. The real magic happens in the quiet courtyards and small artisanal bakeries that locals swear by. From the 'Hot Chocolate Ritual' to the perfect morning croissant, here's how to do White Town like a pro.",
            sections: [
                {
                    title: "Beyond the Hype: Top Picks",
                    items: [
                        { name: "Le Petit Four", desc: "Many locals consider this the most authentic French bakery in town. Their croissants are buttery perfection." },
                        { name: "Coromandel Cafe", desc: "Set in a stunningly restored mansion. It's where you go for a long, lazy lunch or an artisanal Indo-French dinner." },
                        { name: "Zuka's Hot Chocolate", desc: "A must-visit for chocolate lovers. The hot chocolate with the edible chocolate spoon is a local institution." },
                        { name: "Bouche Sucrée", desc: "A hidden gem for those who want to avoid the main tourist drag. Excellent quiches and pastries." }
                    ]
                },
                {
                    title: "The Morning Routine",
                    text: "In White Town, the early bird gets the croissant. Most top-tier boulangeries bake only one or two batches a day. If you arrive after 9:30 AM, you're likely to find the best items sold out. Start your day early, grab a baguette, and walk to the Promenade."
                },
                {
                    title: "Cafe Culture & Ambience",
                    text: "It's not just about the food; it's about the 'slow dining' experience. Most cafes are set in colonial buildings with bougainvillea-draped courtyards. Take your time, bring a book, and soak in the Franco-Tamil vibe."
                }
            ]
        },
        faqs: [
            {
                q: "What are the best French bakeries in Pondicherry?",
                a: "The best French bakeries in Pondicherry's White Town are Le Petit Four (widely considered the most authentic), Bouche Sucrée (a quieter hidden gem for quiches and pastries), and Coromandel Cafe (set in a restored heritage mansion). Baker Street is the famous one, but locals prefer the smaller artisanal boulangeries for buttery croissants and fresh baguettes."
            },
            {
                q: "When should I visit French cafes in Pondicherry?",
                a: "Visit French cafes in Pondicherry's White Town before 9:30 AM for the freshest croissants and baguettes — most boulangeries bake only one morning batch and sell out fast. Afternoons are ideal for slow lunches and coffee in the bougainvillea-draped courtyards."
            },
            {
                q: "Is Baker Street Pondicherry worth visiting?",
                a: "Baker Street is Pondicherry's most famous French bakery and the pastries are genuinely good, but it's often crowded and priced higher than nearby alternatives. Locals typically recommend Le Petit Four or Bouche Sucrée for a more authentic, less touristy French bakery experience."
            }
        ]
    },
    "/seafood": {
        id: "seafood",
        title: "Pondicherry Seafood: From Harbour to Plate",
        description: "The ultimate guide to finding the freshest seafood in Pondicherry, from beachside grills to local messes.",
        content: {
            intro: "Seafood in Pondicherry is a serious business. With the Bay of Bengal at our doorstep, the quality of the 'catch of the day' is unmatched. Whether you want a sophisticated grilled lobster or a spicy, messy crab curry, the key is knowing where the fishermen actually deliver their best hauls.",
            sections: [
                {
                    title: "Non-Negotiable Seafood Dishes",
                    items: [
                        { name: "Mass Seafood Prawn Masala", desc: "A spicy, local favorite that packs more flavour than any fancy restaurant version." },
                        { name: "Grilled Catch with Garlic Butter", desc: "The French way. Best enjoyed at a beachside bistro like FinZ or one of the upscale White Town spots." },
                        { name: "Coastal Fish Fry", desc: "Marinated in a secret blend of Tamil spices and pan-fried to crispy perfection." }
                    ]
                },
                {
                    title: "The Golden Rule of Freshness",
                    text: "Always ask for the 'catch of the day'. Most reputable seafood spots in Pondy will have a daily special based on what was caught that morning. Avoid pre-frozen options at all costs."
                },
                {
                    title: "Best Time for Seafood",
                    text: "Lunch is usually the best time for traditional Tamil seafood meals, while dinner is perfect for beachside grills and continental preparations. The Promenade comes alive in the evening with smaller seafood stalls near the harbour."
                }
            ]
        },
        faqs: [
            {
                q: "Where can I eat fresh seafood in Pondicherry?",
                a: "For the freshest seafood in Pondicherry, head to Mass Seafood for local-style prawn masala, FinZ for beachside grilled catch, or any mess restaurant near the harbour where the day's catch arrives straight from the fishing boats. Always ask for the 'catch of the day' rather than ordering from a fixed menu."
            },
            {
                q: "What is the best seafood dish in Pondicherry?",
                a: "The most iconic seafood dishes in Pondicherry are Mass-style prawn masala, Nandu Kuzhambu (peppery crab curry), and grilled catch with garlic butter — a French-influenced preparation. For an authentic Tamil coastal experience, the tangy tamarind-based Meen Kuzhambu (fish curry) is the local favourite."
            },
            {
                q: "When is seafood freshest in Pondicherry?",
                a: "Seafood in Pondicherry is freshest at lunch, shortly after the morning fishing boats dock at the harbour. Peak seafood season runs from October through March, when Bay of Bengal catches are most abundant. The monsoon months (late October–November) are the least reliable — many boats stay ashore."
            }
        ]
    },
    "/street-food": {
        id: "street-food",
        title: "Street Food Secrets: What Locals Eat After Dark",
        description: "Navigate Pondicherry's vibrant street food scene like a local. From Rock Beach snacks to MG Road delights.",
        content: {
            intro: "Street food in Pondicherry is where the city's energy truly lies. As the humidity drops in the evening, the streets fill with the sounds of 'kothu' hammers and the smell of spicy 'sundal'. It's affordable, authentic, and arguably the most fun way to eat your way through the city.",
            sections: [
                {
                    title: "The 'Big Four' Street Snacks",
                    items: [
                        { name: "Sundal at Rock Beach", desc: "Boiled chickpeas with coconut and spices. It's the quintessential Pondy beach snack." },
                        { name: "Egg Kothu Parotta", desc: "A local legend. Shredded parotta, eggs, and spicy gravy stir-fried on a flat iron griddle." },
                        { name: "Bajji & Bonda", desc: "Deep-fried vegetable fritters served with spicy coconut chutney. Best found near the bus stand or MG Road." },
                        { name: "Masala Pori", desc: "Spiced puffed rice that's light, crunchy, and perfect for an evening snack." }
                    ]
                },
                {
                    title: "Xtasi: The 'Street' Pizza",
                    text: "While it's a restaurant, Xtasi's wood-fired pizzas are so ingrained in the local food culture they've become a street-side legend. Their 18-inch pizzas are meant for sharing with friends on a busy night."
                },
                {
                    title: "Safety & Hygiene Tips",
                    text: "Stick to stalls with high turnover. If you see a crowd of locals, it's usually a good sign. Avoid raw juices or salads from street carts if you have a sensitive stomach; stick to the 'hot' fried or stir-fried items."
                }
            ]
        },
        faqs: [
            {
                q: "What are the must-try street foods in Pondicherry?",
                a: "The must-try street foods in Pondicherry are Sundal (spiced chickpeas, best eaten at Rock Beach), Egg Kothu Parotta (shredded parotta stir-fried on a griddle), hot Bajji and Bonda fritters with coconut chutney, and Masala Pori (tangy spiced puffed rice). Evening hours from 6 to 9 PM are when the street food scene is most alive."
            },
            {
                q: "Is street food in Pondicherry safe to eat?",
                a: "Street food in Pondicherry is generally safe if you pick stalls with high turnover — a crowd of locals is a reliable freshness signal. Stick to hot, freshly fried or stir-fried items like kothu parotta, bajji, and bonda. Avoid raw juices, uncovered salads, or cut fruit from unfamiliar vendors if you have a sensitive stomach."
            },
            {
                q: "Where can I find street food in Pondicherry?",
                a: "The best street food in Pondicherry is concentrated along Rock Beach (the Promenade) for sundal and roasted snacks, on MG Road near the bus stand for bajji and bonda stalls, and in the Tamil Quarter markets for egg kothu parotta and masala pori. Most stalls operate from early evening until late night."
            }
        ]
    },
    "/restaurants": {
        id: "vegetarian",
        title: "The Vegetarian's Guide to Pondy: More Than Just Idli",
        description: "Pondicherry is a paradise for vegetarians. Discover the best South Indian thalis, French vegetarian delights, and vegan spots.",
        content: {
            intro: "Think being a vegetarian in a coastal town is hard? Think again. Pondicherry is deeply rooted in Tamil vegetarian traditions, but it also offers some of the most creative plant-based French and continental food in India.",
            sections: [
                {
                    title: "Top Vegetarian Picks",
                    items: [
                        { name: "Surguru's Full Meal", desc: "A multi-course Tamil thali served on a banana leaf. It's the gold standard of vegetarian dining here." },
                        { name: "Crepes with Fresh Fruit", desc: "Available at most White Town cafes. A delicious, vegetarian-friendly French breakfast." },
                        { name: "Jain-Friendly Tamil Food", desc: "Many local spots like Surguru or Kamatchi (veg section) offer preparations without onion or garlic." }
                    ]
                },
                {
                    title: "The 'Auroville' Influence",
                    text: "The proximity to Auroville has brought a huge wave of healthy, organic, and vegan-friendly food to Pondicherry. Look for smoothie bowls, sourdough tartines, and fresh salads in the newer cafes."
                }
            ]
        },
        faqs: [
            {
                q: "Is Pondicherry good for vegetarians?",
                a: "Yes — Pondicherry is excellent for vegetarians. Tamil vegetarian tradition runs deep, and the proximity to Auroville means you'll also find a large wave of organic, vegan, and continental plant-based options. Surguru is the gold-standard for banana-leaf thalis, while White Town cafes offer French-inspired vegetarian fare like crepes and quiches."
            },
            {
                q: "What are the best vegetarian restaurants in Pondicherry?",
                a: "The best vegetarian restaurants in Pondicherry are Surguru (legendary South Indian thalis and ghee roast), Kamatchi (traditional veg section with Jain-friendly options), and the Auroville-adjacent cafes serving smoothie bowls, sourdough tartines, and salads. For French-style vegetarian breakfasts, most White Town boulangeries serve crepes, quiches, and fresh pastries."
            },
            {
                q: "Does Pondicherry have Jain-friendly restaurants?",
                a: "Yes. Several Pondicherry vegetarian restaurants — including Surguru and Kamatchi's veg section — will prepare dishes without onion or garlic on request. Many Auroville-area cafes also cater to Jain, vegan, and gluten-free diets without needing advance notice."
            }
        ]
    },
    "/foodie-guide": {
        id: "foodie-guide",
        title: "Pondy Foodie Survival Guide: 2026 Edition",
        description: "Insider tips, tourist traps to avoid, and the best way to experience the city's unique culinary landscape.",
        content: {
            intro: "Don't be just another tourist with a TripAdvisor list. To truly experience Pondicherry's food, you need to understand the rhythm of the city. From the morning bakery rush to the late-night parotta stalls, here's everything we wish we knew before we started eating our way through Pondy.",
            sections: [
                {
                    title: "Tourist Traps to Avoid",
                    text: "1. The Baker Street Hype: It's okay, but there are better, less crowded options. 2. Fixed-rate Autos: Always use an app to check the fair price first. 3. 'Multi-cuisine' restaurants on the Promenade: Stick to specialized spots for better quality."
                },
                {
                    title: "Pro Tips for Foodies",
                    items: [
                        { name: "Carry Cash", desc: "Many small, legendary local spots and street vendors still don't accept cards or UPI." },
                        { name: "The '9 AM' Rule", desc: "If you want the best croissants in White Town, you have to be there early." },
                        { name: "Follow the Locals", desc: "If a small mess is crowded with locals, just walk in. You won't regret it." }
                    ]
                }
            ]
        },
        faqs: [
            {
                q: "What tourist traps should I avoid in Pondicherry?",
                a: "Three common Pondicherry food tourist traps: the Baker Street hype (good but overcrowded — try Le Petit Four instead), 'multi-cuisine' restaurants on the Promenade that over-promise and under-deliver, and fixed-rate auto rickshaws (always cross-check pricing with Ola or Rapido apps before agreeing)."
            },
            {
                q: "What is the best time of year for food in Pondicherry?",
                a: "October to March is the best season for food in Pondicherry — pleasant weather, peak seafood season, and the Pongal harvest festival in January brings special Tamil dishes. Avoid late October and November if beach-dining is a priority, as monsoon rain often closes outdoor stalls."
            },
            {
                q: "Do I need cash in Pondicherry restaurants?",
                a: "Yes — carry cash in Pondicherry. While upscale restaurants and most White Town cafes accept cards and UPI, many of the best local spots, street vendors, and small Tamil messes are cash-only. Plan on ₹500–₹1,000 in small notes per day for food."
            }
        ]
    }
};
