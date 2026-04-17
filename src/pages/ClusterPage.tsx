import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChefHat, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import type { ClusterData } from '../data/clusterData';
import { MetaTags } from '../components/MetaTags';
import { useLeadModal } from '../hooks/useLeadModal';

interface ClusterPageProps {
    data: ClusterData;
}

export const ClusterPage = ({ data }: ClusterPageProps) => {
    const location = useLocation();
    const canonicalUrl = `https://localbitespondy.netlify.app${location.pathname}`;
    const { openLeadModal } = useLeadModal();
    const clusterSource = `cluster_${location.pathname.replace(/^\//, '') || 'page'}_cta`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data.title]);

    return (
        <div className="min-h-screen bg-orange-50 pt-24 pb-12 px-6 font-sans">
            <MetaTags
                title={`${data.title} | Local's Guide 2026`}
                description={data.description}
                keywords={`famous food Pondicherry, ${data.title}, local food guide, Pondy eats`}
                canonical={canonicalUrl}
                ogImageAlt={data.title}
            />
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center text-orange-600 font-medium mb-8 hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Famous Food in Pondicherry
                </Link>

                <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-orange-600 p-8 md:p-12 text-center text-white">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                            <ChefHat className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">{data.title}</h1>
                        <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                            {data.description}
                        </p>
                    </div>
                    {/* ... rest of the component */}

                    {/* Content */}
                    <div className="p-8 md:p-12 space-y-12">
                        {/* Intro */}
                        <div className="prose prose-orange max-w-none">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {data.content.intro}
                            </p>
                        </div>

                        {/* Dynamic Sections */}
                        {data.content.sections.map((section, idx) => (
                            <div key={idx} className="border-t border-gray-100 pt-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-orange-500 rounded-full block"></span>
                                    {section.title}
                                </h2>

                                {section.text && (
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        {section.text}
                                    </p>
                                )}

                                {section.items && (
                                    <ul className="grid md:grid-cols-1 gap-4">
                                        {section.items.map((item, itemIdx) => (
                                            <li key={itemIdx} className="bg-orange-50 p-4 rounded-xl">
                                                <strong className="text-gray-900 block text-lg mb-1">{item.name}</strong>
                                                <span className="text-gray-700">{item.desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}

                        {/* CTA / Conclusion */}
                        <div className="bg-orange-50 rounded-xl p-8 border border-orange-100 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Want the Full Pondicherry Food Guide?</h3>
                            <p className="text-gray-600 mb-6">Download our free PDF with 15 handpicked local spots, Google Maps links, and must-order dishes.</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => openLeadModal(clusterSource)}
                                    className="inline-flex items-center bg-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-700 transition-colors shadow-md"
                                >
                                    <Download className="mr-2 h-5 w-5" />
                                    Get Free Guide
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </button>
                                <Link
                                    to="/"
                                    className="text-orange-600 font-semibold hover:underline"
                                >
                                    View Full Guide →
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};
