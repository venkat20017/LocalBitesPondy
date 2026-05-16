import { useMemo } from 'react';
import { Utensils, Coffee, Fish, MapPin, ChefHat, Sun, Star, ArrowRight } from 'lucide-react';
import tamilCreoleImg from '../assets/Authentic-Tamil-and-Creole-Flavours.png';
import frenchBoulangerieImg from '../assets/French-Boulangeries-and-Heritage-Cafés.png';
import { useLeadPopup } from '../context/LeadPopupContext';
import { useContent } from '../context/ContentContext';
import { SchemaMarkup } from './SchemaMarkup';

export const SEOSections = () => {
    const { openPopup } = useLeadPopup();
    const { data } = useContent();

    const traditionalFood = data?.TraditionalFood || [
        {
            name: "Surguru's Ghee Roast & Filter Coffee",
            desc: "Ask any local where to start your day, and they'll point you to Surguru. Their paper-thin, buttery Ghee Roast paired with strong, frothy filter coffee is the gold standard of Pondy breakfasts."
        },
        {
            name: "Creole Meen Curry (French-Tamil Fusion)",
            desc: "Unlike the spicy Tamil Meen Kuzhambu, Creole fish curry uses coconut milk and mild spices, reflecting the French influence. Look for this at heritage spots like Chez Pushpa for a truly local experience."
        },
        {
            name: "Seeraga Samba Biryani",
            desc: "Pondy's secret is the small-grain Samba rice. It’s more fragrant and lighter than Basmati. Skip the big chains and look for the wood-fired 'Biryani Mess' spots in the Tamil Quarter."
        },
        {
            name: "Kothu Parotta (Street Icon)",
            desc: "The ultimate evening comfort food. Shredded parotta stir-fried with eggs and spices on a massive iron griddle. It's the sound of Pondy's streets at night."
        }
    ];

    const frenchCafes = data?.FrenchCafes || [
        {
            name: "The 'Hot Chocolate' Ritual",
            desc: "At Zuka, the hot chocolate comes with a signature chocolate spoon. It's a local rite of passage for anyone with a sweet tooth visiting Pondicherry."
        },
        {
            name: "Artisanal Gelato on the Promenade",
            desc: "Skip the industrial ice creams. GMT Gelato's Himalayan Salt-Caramel is widely considered the best gelato in the city, perfect for a sunset stroll."
        },
        {
            name: "Baguettes & Quiches",
            desc: "Freshly baked every morning. The key is to arrive before 9 AM; the best boulangeries sell out their morning batches faster than you can say 'Bonjour'."
        },
        {
            name: "Indo-French Fusion",
            desc: "Dishes like Rasam aux Crevettes (shrimp soup) at heritage spots blend French plating with the tangy depth of Tamil rasam."
        }
    ];

    const seafood = data?.Seafood || [
        { name: "Prawn Masala (Mass Style)", desc: "Juicy, spice-coated prawns that are a local favorite. It's the dish that defines Pondy's coastal Tamil cooking." },
        { name: "Grilled Lobster with Garlic Butter", desc: "A French-influenced preparation. Best enjoyed at a White Town bistro with a glass of chilled wine." },
        { name: "Nandu Kuzhambu (Crab Curry)", desc: "A spicy, peppery crab curry that is a staple in Tamil fishing communities. Messy but absolutely worth it." },
        { name: "Fish Fry (Daily Catch)", desc: "Whole fish marinated in local spices and pan-fried. Always ask for the 'catch of the day' rather than choosing from the menu." }
    ];

    const streetFood = data?.StreetFood || [
        { name: "Sundal (Beach Staple)", desc: "Spiced chickpeas tossed with coconut. It's the ultimate 'walking snack' for a sunset stroll on Rock Beach." },
        { name: "Xtasi Wood-Fired Pizza", desc: "Technically a restaurant, but its 18-inch pizzas are a local legend. Many locals consider it the 'best street-style pizza' in South India." },
        { name: "Masala Pori (Puffed Rice)", desc: "A crunchy, tangy mix of puffed rice, onions, and spices. Simple, affordable, and incredibly addictive." },
        { name: "Spiced Pineapple & Mango", desc: "Look for vendors on the beach selling sliced fruits dusted with salt and red chilli powder — the perfect coastal palate cleanser." }
    ];

    const restaurantSchema = useMemo(() => {
        // Extracting known spots from the content arrays to generate LocalBusiness/Restaurant schemas
        const allSpots = [...traditionalFood, ...frenchCafes, ...seafood, ...streetFood];
        
        return {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": allSpots.map((spot, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Restaurant",
                    "name": spot.name,
                    "description": spot.description || spot.desc,
                    "image": spot.imageUrl,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Pondicherry",
                        "addressRegion": "PY",
                        "addressCountry": "IN"
                    }
                }
            }))
        };
    }, [traditionalFood, frenchCafes, seafood, streetFood]);

    return (
        <div className="font-sans text-gray-800">
            <SchemaMarkup schema={restaurantSchema} />

            {/* ── Section 1: Traditional Tamil Dishes ── */}
            <section id="famous-food" className="py-20 bg-orange-50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <Utensils className="text-orange-600 h-10 w-10 shrink-0" />
                                Authentic Tamil & Creole Flavours
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                The heart of Pondicherry's food scene isn't in the fancy cafes, but in the crowded Tamil messes and heritage Creole kitchens. While tourists flock to White Town, locals head to places like <strong>Surguru</strong> for a Ghee Roast that actually tastes like home, or hunt down the rare <strong>Creole cuisine</strong> — a unique 200-year-old fusion of French techniques and Tamil spices that you won't find anywhere else in India.
                            </p>
                            <ul className="space-y-4">
                                {traditionalFood.map((item: any, idx: number) => {
                                     const content = (
                                         <>
                                             {item.imageUrl && (
                                                 <img src={item.imageUrl} alt={item.imageAlt || item.name} className="w-full h-48 object-cover rounded-lg mb-3" loading="lazy" />
                                             )}
                                             <strong className="text-orange-700 block text-lg mb-1">{item.name}</strong>
                                             <span className="text-gray-600 text-sm leading-relaxed">{item.description || item.desc}</span>
                                         </>
                                     );
                                     
                                     return (
                                         <li key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                                             {item.link ? (
                                                 <a href={item.link} target={item.link.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer">
                                                     {content}
                                                 </a>
                                             ) : content}
                                         </li>
                                     );
                                 })}
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2">
                            <img
                                src={tamilCreoleImg}
                                alt="Traditional Tamil food in Pondicherry — meen kuzhambu, idli, dosa and sambar"
                                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 2: French Influenced Foods ── */}
            <section id="french-cafes" className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <Coffee className="text-orange-600 h-10 w-10 shrink-0" />
                                French Boulangeries & Heritage Cafés
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                White Town's yellow walls hide some of India's best European-style dining. While every tourist guide mentions <strong>Baker Street</strong>, locals know that for the truly buttery, flaky croissants, you should head to <strong>Le Petit Four</strong> or <strong>Bouche Sucrée</strong>. For an afternoon vibe, the award-winning <strong>Coromandel Cafe</strong> offers a fusion of Indo-French flavours in a stunningly restored mansion.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {frenchCafes.map((item: any, idx: number) => {
                                     const content = (
                                         <>
                                             {item.imageUrl && (
                                                 <img src={item.imageUrl} alt={item.imageAlt || item.name} className="w-full h-48 object-cover rounded-lg mb-3" loading="lazy" />
                                             )}
                                             <strong className="text-gray-900 block mb-2 text-lg">{item.name}</strong>
                                             <p className="text-sm text-gray-600 leading-relaxed">{item.description || item.desc}</p>
                                         </>
                                     );
                                     
                                     return (
                                         <div key={idx} className="bg-orange-50 p-6 rounded-xl border border-orange-100 hover:shadow-md transition-shadow">
                                             {item.link ? (
                                                 <a href={item.link} target={item.link.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer">
                                                     {content}
                                                 </a>
                                             ) : content}
                                         </div>
                                     );
                                 })}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <img
                                src={frenchBoulangerieImg}
                                alt="French bakery in Pondicherry White Town — croissants, baguettes and crepes"
                                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 3: Seafood & Street Food ── */}
            <section id="seafood-street" className="py-20 bg-orange-50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-2 gap-16">

                        {/* Seafood */}
                        <div id="seafood">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <Fish className="text-orange-600 h-8 w-8 shrink-0" />
                                The Fresh Catch: Seafood Rules
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Pondicherry's coastal location means seafood isn't just a menu item; it's a way of life. The rule is simple: if it wasn't caught this morning, don't order it. While beachside grills are popular, locals head to <strong>Mass Seafood</strong> for a no-frills, authentic prawn masala that packs a punch.
                            </p>
                            <ul className="space-y-4">
                                {seafood.map((item: any, idx: number) => {
                                     const content = (
                                         <>
                                             {item.imageUrl && (
                                                 <img src={item.imageUrl} alt={item.imageAlt || item.name} className="w-full h-48 object-cover rounded-lg mb-3" loading="lazy" />
                                             )}
                                             <strong className="text-orange-700 block text-lg">{item.name}</strong>
                                             <span className="text-gray-600">{item.description || item.desc}</span>
                                         </>
                                     );
                                     
                                     return (
                                         <li key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                                             {item.link ? (
                                                 <a href={item.link} target={item.link.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer">
                                                     {content}
                                                 </a>
                                             ) : content}
                                         </li>
                                     );
                                 })}
                            </ul>
                        </div>

                        {/* Street Food */}
                        <div id="street-food">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <MapPin className="text-orange-600 h-8 w-8 shrink-0" />
                                Street Food: The Evening Buzz
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                As the sun sets, the Promenade Beach comes alive with the smell of roasted chickpeas and spiced puffed rice. But for the real 'Pondy' street experience, head to the local markets on MG Road for piping hot <strong>Bajji</strong> or the legendary <strong>Egg Kothu Parotta</strong>.
                            </p>
                            <ul className="space-y-4">
                                {streetFood.map((item: any, idx: number) => {
                                     const content = (
                                         <>
                                             {item.imageUrl && (
                                                 <img src={item.imageUrl} alt={item.imageAlt || item.name} className="w-full h-48 object-cover rounded-lg mb-3" loading="lazy" />
                                             )}
                                             <strong className="text-orange-700 block text-lg">{item.name}</strong>
                                             <span className="text-gray-600">{item.description || item.desc}</span>
                                         </>
                                     );
                                     
                                     return (
                                         <li key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                                             {item.link ? (
                                                 <a href={item.link} target={item.link.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer">
                                                     {content}
                                                 </a>
                                             ) : content}
                                         </li>
                                     );
                                 })}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 4: Best Restaurants & Where NOT to Eat ── */}
            <section id="restaurants" className="py-20 bg-white border-b border-gray-100">
                <div className="mx-auto max-w-4xl px-6">
                    <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">
                        Where to Eat (and Where NOT to) in Pondicherry
                    </h2>
                    <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                        Don't fall for the Instagram traps. Here's our brutally honest take on where you'll get the best value and flavour.
                    </p>

                    <div className="grid gap-8">
                        {/* The Good */}
                        <div className="border-l-8 border-green-500 pl-8 py-6 bg-green-50 rounded-r-2xl shadow-sm">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Local Favorites (Go Here!)</h3>
                            <ul className="space-y-4 text-lg">
                                <li>
                                    <strong className="text-gray-900">Surguru (Vegetarian):</strong> The undisputed king of South Indian breakfast. Their Ghee Roast is legendary.
                                </li>
                                <li>
                                    <strong className="text-gray-900">Coromandel Cafe:</strong> Perfect for a 'fancy' dinner that actually delivers on taste and atmosphere.
                                </li>
                                <li>
                                    <strong className="text-gray-900">Zuka:</strong> Not just a chocolate shop, but a destination. The hot chocolate is a must.
                                </li>
                            </ul>
                        </div>

                        {/* The Trap */}
                        <div className="border-l-8 border-red-500 pl-8 py-6 bg-red-50 rounded-r-2xl shadow-sm">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tourist Traps to Avoid</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed italic text-lg">
                                "We've made the mistakes so you don't have to."
                            </p>
                            <ul className="space-y-4 text-gray-700 text-lg">
                                <li>
                                    <strong>The 'Baker Street' Hype:</strong> It's iconic, but often overpriced and crowded. For better pastries, try <strong>Le Petit Four</strong> or <strong>Bouche Sucrée</strong>.
                                </li>
                                <li>
                                    <strong>Beachside 'No-Name' Seafood:</strong> Be wary of restaurants on the main Promenade with huge menus but no visible fresh catch.
                                </li>
                                <li>
                                    <strong>Fixed-Rate Auto Rickshaws:</strong> Never agree to a fixed price without checking an app like Ola or Rapido first.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 5: Foodie's Guide & Tips ── */}
            <section id="foodie-guide" className="py-20 bg-orange-900 text-white rounded-t-[3rem] mt-12 mx-0">
                <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                            <ChefHat className="text-orange-300 h-10 w-10" />
                            Pondicherry Food Survival Guide
                        </h2>
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-2xl font-bold text-orange-200 mb-3 underline decoration-orange-400 underline-offset-8">Culinary Food Walks</h3>
                                <p className="text-orange-50 text-lg leading-relaxed">
                                    The best way to experience Pondicherry's food is on foot. Start at a Tamil tiffin centre for breakfast, walk through the French Quarter mid-morning for pastries and coffee, lunch at a local mess, and end at Rock Beach.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-orange-200 mb-3 underline decoration-orange-400 underline-offset-8">Traditional Cooking</h3>
                                <p className="text-orange-50 text-lg leading-relaxed">
                                    Several locals offer private cooking classes covering Tamil spice blending and French pastry basics — an excellent way to bring the culture home.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-orange-200 mb-3 underline decoration-orange-400 underline-offset-8">Best Season to Visit</h3>
                                <p className="text-orange-50 text-lg leading-relaxed">
                                    October to March is ideal. Pleasant weather, Pongal harvest festival in January, and peak seafood season. Avoid peak monsoons in Nov.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 p-10 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl">
                        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                            <Sun className="text-yellow-400 h-8 w-8" />
                            Insider Tips
                        </h2>
                        <ul className="space-y-6">
                            {[
                                { tip: "Arrive at bakeries before 9 AM for the freshest croissants.", why: "They bake one batch and it sells out instantly." },
                                { tip: "Evenings (6–9 PM) are best for beach street food.", why: "Stalls only open as the sun sets." },
                                { tip: "Ask for the 'fresh catch of the day' everywhere.", why: "Boats arrive in the morning — specials are always fresher." },
                                { tip: "Visit local mess restaurants for authentic Tamil meals.", why: "No English menus usually means the food is better." },
                                { tip: "Carry cash — many small stalls don't accept cards.", why: "Crucial for beach vendors and hidden messes." }
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4 group">
                                    <div className="bg-yellow-400 text-orange-900 rounded-full p-1 mt-1 shrink-0 group-hover:scale-110 transition-transform">
                                        <Star className="w-4 h-4 fill-current" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-lg group-hover:text-yellow-400 transition-colors">{item.tip}</span>
                                        <span className="text-orange-200 text-sm italic">{item.why}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-20 max-w-4xl mx-auto border-t border-white/10 pt-16 px-6">
                    <h2 className="text-3xl font-bold mb-6">The Final Verdict</h2>
                    <p className="text-xl text-orange-100 leading-relaxed mb-10 italic">
                        "Pondicherry is the only city in India where you can have a perfect French croissant for breakfast and a spicy Tamil fish curry for lunch on the same street. It's a culinary paradox that works perfectly."
                    </p>
                    <button
                        onClick={() => openPopup('final_verdict')}
                        className="inline-flex items-center gap-3 bg-white text-orange-900 px-10 py-4 rounded-full font-black text-lg hover:bg-orange-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                        Download the PDF Guide (Free)
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </section>
        </div>
    );
};
