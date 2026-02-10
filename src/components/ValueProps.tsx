
import { MapPinned, Utensils, IndianRupee, Lightbulb } from 'lucide-react';

export const ValueProps = () => {
    const features = [
        {
            icon: <MapPinned className="h-10 w-10 text-orange-500" />,
            title: "No Tourist Traps—Just Real Spots",
            description: "All restaurants, cafes, and street food sellers have the precise Google Maps coordinates. We have done the legwork so you can walk directly to where the well-known food in Pondicherry actually takes place, places that you could never discover in a travel blog-of-the-day."
        },
        {
            icon: <Utensils className="h-10 w-10 text-orange-500" />,
            title: "Menu Decoded for You",
            description: "Every spot contains our 2-3 best must-have in the country dishes with the local names expounded. Starting with the French boulangerie traditions and ending with Tamil breakfast delicacies, you will be well informed about what is so special about each of the dishes, and why people wait in line to get it."
        },
        {
            icon: <IndianRupee className="h-10 w-10 text-orange-500" />,
            title: "From Street Food to Fine Dining",
            description: "You have 100 or 500 rupees and want to have the real Pondicherry food. We have sorted all the spots by price level, enabling you to make your food adventure according to your financial capability and desire."
        },
        {
            icon: <Lightbulb className="h-10 w-10 text-orange-500" />,
            title: "Local Secrets & Best Times to Visit",
            description: "The time to arrive to avoid the crowds, their closed days, parking hints, and dishes not found on the menu that frequent patrons are able to order. Get the inside experience that makes good food to be memorable."
        }
    ];

    return (
        <section className="bg-orange-50 py-20 px-4">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">What's Inside Your Famous Food in Pondicherry Guide?</h2>
                <div className="grid gap-8 md:grid-cols-2">
                    {features.map((feature, index) => (
                        <div key={index} className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left flex flex-col items-start border border-transparent hover:border-orange-100 h-full">
                            <div className="mb-6 rounded-full bg-orange-100 p-4 transition-transform group-hover:scale-110 duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
