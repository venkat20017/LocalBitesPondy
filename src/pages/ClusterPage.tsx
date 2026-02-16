import { useEffect } from 'react';
import { ArrowLeft, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ClusterPageProps {
    title: string;
    description: string;
}

export const ClusterPage = ({ title, description }: ClusterPageProps) => {
    useEffect(() => {
        document.title = `${title} | Famous Food in Pondicherry`;
        window.scrollTo(0, 0);
    }, [title]);

    return (
        <div className="min-h-screen bg-orange-50 pt-24 pb-12 px-6">
            <div className="max-w-3xl mx-auto">
                <Link to="/home-b" className="inline-flex items-center text-orange-600 font-medium mb-8 hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Famous Food in Pondicherry
                </Link>

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ChefHat className="w-8 h-8 text-orange-600" />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h1>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                        {description}
                    </p>

                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 inline-block text-left">
                        <h3 className="font-semibold text-blue-900 mb-2">Detailed Guide Coming Soon</h3>
                        <p className="text-blue-800 text-sm">
                            We are currently compiling the ultimate list of spots for <strong>{title}</strong>.
                            Check back soon for reviews, locations, and top recommendations.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
