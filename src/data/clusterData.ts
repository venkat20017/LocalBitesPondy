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
}

export const clusterData: Record<string, ClusterData> = {
    "/traditional-tamil-dishes-pondicherry": {
        id: "tamil-dishes",
        title: "Traditional Tamil Dishes in Pondicherry",
        description: "Explore the authentic flavors of Pondicherry with our guide to the best Tamil traditional meals.",
        content: {
            intro: "When exploring famous food in Pondicherry, traditional Tamil dishes form the foundation of the local cuisine. While French influence is visible, authentic Tamil flavors dominate everyday meals. If you want a true cultural food experience, start here.",
            sections: [
                {
                    title: "Popular Traditional Tamil Dishes",
                    items: [
                        { name: "Meen Kuzhambu (Fish Curry)", desc: "A tangy tamarind-based curry cooked with fresh coastal fish, curry leaves, and mustard seeds. It is spicy, aromatic, and served with steamed rice." },
                        { name: "Nandu Kuzhambu (Crab Curry)", desc: "Prepared with freshly caught crab, black pepper, and roasted masala paste. A must-try for seafood lovers." },
                        { name: "Karaikudi Chicken Curry", desc: "Rich in black pepper and slow-roasted spices, offering deep Chettinad flavors." },
                        { name: "Sambar & Rasam", desc: "Staple lentil-based gravies served daily in most Tamil homes." },
                        { name: "Idli, Dosa & Pongal", desc: "Breakfast classics served with coconut chutney and sambar." }
                    ]
                },
                {
                    title: "Where to Try Traditional Tamil Food",
                    text: "Look for local mess-style restaurants, banana leaf serving hotels, and small family-run eateries. These places provide authentic taste over commercial presentation."
                },
                {
                    title: "Why Traditional Tamil Food is Important",
                    text: "It represents local agriculture, coastal fishing culture, generational recipes, and community dining traditions. If you are exploring famous food in Pondicherry, this is your starting point."
                }
            ]
        }
    },
    "/french-cafes-in-pondicherry": {
        id: "french-cafes",
        title: "French Cafes in Pondicherry",
        description: "Discover the charm of White Town with our curated list of the best French cafes.",
        content: {
            intro: "Pondicherry is famous for its French-inspired cafes located mainly in White Town. These cafes offer croissants, baguettes, crepes, and continental breakfasts.",
            sections: [
                {
                    title: "Popular French Cafe Foods",
                    items: [
                        { name: "Butter Croissants", desc: "Flaky, buttery perfection." },
                        { name: "Baguettes with Cheese", desc: "Classic French staple." },
                        { name: "Chocolate Crepes", desc: "Sweet treat for dessert or breakfast." },
                        { name: "Quiche", desc: "Savory tart with egg and fillings." },
                        { name: "French Toast", desc: "Rich and custard-soaked bread." }
                    ]
                },
                {
                    title: "Recommended Cafes",
                    items: [
                        { name: "Cafe des Arts", desc: "Known for French breakfast ambiance." },
                        { name: "The Pavilion", desc: "Fine dining with continental menu." }
                    ]
                },
                {
                    title: "Why French Cafes Are Popular",
                    text: "Colonial architecture, Instagram-friendly ambiance, slow dining experience, and European-style coffee culture make them a hit. If you’re searching for famous food in Pondicherry beyond spicy dishes, these cafes are perfect."
                }
            ]
        }
    },
    "/seafood-restaurants-pondicherry": {
        id: "seafood",
        title: "Best Seafood in Pondicherry",
        description: "Find the best seafood restaurants in Pondicherry for a coastal dining experience.",
        content: {
            intro: "Being a coastal town, Pondicherry is known for fresh seafood prepared in Tamil and continental styles.",
            sections: [
                {
                    title: "Must-Try Seafood Dishes",
                    items: [
                        { name: "Prawn Masala", desc: "Spicy and rich coastal flavors." },
                        { name: "Grilled Lobster", desc: "Fresh catch grilled to perfection." },
                        { name: "Crab Curry", desc: "Authentic local preparation." },
                        { name: "Fish Fry", desc: "Crispy fried fish with spices." },
                        { name: "Garlic Butter Shrimp", desc: "Continental style delight." }
                    ]
                },
                {
                    title: "Top Seafood Restaurant",
                    items: [
                        { name: "FinZ - Seafood & Barbeque", desc: "Famous for beachside seafood dining." }
                    ]
                },
                {
                    title: "Best Time to Eat Seafood",
                    text: "Evenings are ideal for fresh catch dining. If seafood is your priority while exploring famous food in Pondicherry, this page covers everything you need."
                }
            ]
        }
    },
    "/street-food-in-pondicherry": {
        id: "street-food",
        title: "Street Food in Pondicherry",
        description: "A guide to Pondicherry's vibrant street food scene.",
        content: {
            intro: "Street food in Pondicherry offers authentic flavors at affordable prices.",
            sections: [
                {
                    title: "Popular Street Food Items",
                    items: [
                        { name: "Egg Kothu Parotta", desc: "Minced parotta with egg and spices." },
                        { name: "Sundal", desc: "Spiced chickpea snack." },
                        { name: "Bajji & Bonda", desc: "Deep fried fritters." },
                        { name: "Masala Pori", desc: "Spiced puffed rice." },
                        { name: "Local Ice Cream Carts", desc: "Nostalgic cold treats." }
                    ]
                },
                {
                    title: "Where to Find Street Food",
                    text: "Check out Beach Road in the evening, local markets, and areas near bus stands. Street food reflects the everyday culture of Pondicherry."
                }
            ]
        }
    },
    "/vegetarian-restaurants-pondicherry": {
        id: "vegetarian",
        title: "Vegetarian Restaurants in Pondicherry",
        description: "Find the best vegetarian and vegan-friendly spots in Pondicherry.",
        content: {
            intro: "Pondicherry is very vegetarian-friendly, offering a wide range of options for herbivores.",
            sections: [
                {
                    title: "Vegetarian Food Options",
                    items: [
                        { name: "Full Tamil Meals", desc: "Traditional rice and curry spread." },
                        { name: "Dosa & Idli Varieties", desc: "South Indian staples." },
                        { name: "Jain-Friendly Options", desc: "No onion/garlic preparations available." },
                        { name: "Vegan Salads & Soups", desc: "Available at many French cafes." }
                    ]
                },
                {
                    title: "Why Vegetarians Love Pondicherry",
                    text: "Strong temple culture, South Indian food traditions, and French cafes with plant-based options make it a paradise. Looking for famous food in Pondicherry without seafood? This page is for you."
                }
            ]
        }
    },
    "/foodie-guide-pondicherry": {
        id: "foodie-guide",
        title: "A Foodie’s Guide to Exploring Pondicherry",
        description: "Your ultimate companion for culinary tours and food festivals.",
        content: {
            intro: "Maximize your culinary journey with these tips and guides.",
            sections: [
                {
                    title: "Best Time to Visit",
                    text: "October to March – Pleasant weather for exploring food streets."
                },
                {
                    title: "Unique Culinary Experiences",
                    items: [
                        { name: "Beachside seafood dinner", desc: "Dining with a view." },
                        { name: "Heritage cafe breakfast", desc: "Soak in the colonial vibe." },
                        { name: "Banana leaf feast", desc: "Traditional and eco-friendly." },
                        { name: "Cooking classes", desc: "Learn to make local dishes." }
                    ]
                },
                {
                    title: "Pro Tips",
                    text: "Try fresh catch of the day, walk in White Town, and explore local markets."
                }
            ]
        }
    }
};
