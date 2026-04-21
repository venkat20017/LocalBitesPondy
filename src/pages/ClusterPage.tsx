import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChefHat, Download, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import type { ClusterData } from '../data/clusterData';
import { MetaTags } from '../components/MetaTags';
import { useLeadModal } from '../hooks/useLeadModal';

interface ClusterPageProps {
    data: ClusterData;
}

const SITE_ORIGIN = 'https://localbitespondy.netlify.app';

/**
 * Build BreadcrumbList + ItemList + FAQPage JSON-LD for this cluster.
 * BreadcrumbList: Home → Famous Food → {Cluster Name}  (improves sitelinks + crumb display in SERP)
 * ItemList: the named restaurants/dishes from each section (FoodEstablishment/ListItem — eligible for list rich results)
 * FAQPage: rendered only if data.faqs is present (eligible for FAQ rich snippets)
 */
const buildSchema = (data: ClusterData, pathname: string) => {
    const canonicalUrl = `${SITE_ORIGIN}${pathname}`;

    // Flatten every section's `items` array into a single ordered list for
    // ItemList schema. Ghee Roast, Coromandel Cafe, Mass Seafood, etc.
    const listItems = data.content.sections
        .flatMap((s) => s.items ?? [])
        .map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            description: item.desc,
        }));

    const graph: Record<string, unknown>[] = [
        {
            '@type': 'BreadcrumbList',
            '@id': `${canonicalUrl}#breadcrumb`,
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
                { '@type': 'ListItem', position: 2, name: 'Famous Food in Pondicherry', item: `${SITE_ORIGIN}/` },
                { '@type': 'ListItem', position: 3, name: data.title, item: canonicalUrl },
            ],
        },
        {
            '@type': 'Article',
            '@id': `${canonicalUrl}#article`,
            headline: data.title,
            description: data.description,
            url: canonicalUrl,
            mainEntityOfPage: canonicalUrl,
            author: { '@type': 'Organization', name: 'LocalBitesPondy', url: `${SITE_ORIGIN}/` },
            publisher: {
                '@type': 'Organization',
                name: 'LocalBitesPondy',
                url: `${SITE_ORIGIN}/`,
                logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/logo.png` },
            },
            inLanguage: 'en-IN',
            isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        },
    ];

    if (listItems.length > 0) {
        graph.push({
            '@type': 'ItemList',
            '@id': `${canonicalUrl}#itemlist`,
            name: data.title,
            description: data.description,
            numberOfItems: listItems.length,
            itemListElement: listItems,
        });
    }

    if (data.faqs && data.faqs.length > 0) {
        graph.push({
            '@type': 'FAQPage',
            '@id': `${canonicalUrl}#faqpage`,
            mainEntity: data.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
        });
    }

    return { '@context': 'https://schema.org', '@graph': graph };
};

export const ClusterPage = ({ data }: ClusterPageProps) => {
    const location = useLocation();
    const canonicalUrl = `${SITE_ORIGIN}${location.pathname}`;
    const { openLeadModal } = useLeadModal();
    const clusterSource = `cluster_${location.pathname.replace(/^\//, '') || 'page'}_cta`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data.title]);

    // Inject per-cluster JSON-LD schema. Replaces the previous script on
    // navigation between clusters so each page declares its own graph.
    useEffect(() => {
        const scriptId = 'json-ld-cluster';
        const existing = document.getElementById(scriptId);
        if (existing) existing.remove();

        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.text = JSON.stringify(buildSchema(data, location.pathname));
        document.head.appendChild(script);

        return () => {
            const el = document.getElementById(scriptId);
            if (el) el.remove();
        };
    }, [data, location.pathname]);

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

                {/* Visible breadcrumb — matches BreadcrumbList schema for AEO/accessibility. */}
                <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
                    <ol className="flex flex-wrap items-center gap-2">
                        <li>
                            <Link to="/" className="hover:text-orange-600 hover:underline">Home</Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li>
                            <Link to="/" className="hover:text-orange-600 hover:underline">Famous Food in Pondicherry</Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li className="text-gray-900 font-medium" aria-current="page">{data.title}</li>
                    </ol>
                </nav>

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

                        {/* FAQ Section — visible version of FAQPage schema. Google
                            requires FAQ content to actually appear on the page for
                            the rich result to be eligible. */}
                        {data.faqs && data.faqs.length > 0 && (
                            <div className="border-t border-gray-100 pt-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <HelpCircle className="w-6 h-6 text-orange-500 shrink-0" />
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-4">
                                    {data.faqs.map((faq, faqIdx) => (
                                        <details
                                            key={faqIdx}
                                            className="bg-orange-50 rounded-xl border border-orange-100 overflow-hidden group"
                                        >
                                            <summary className="px-5 py-4 font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center gap-4 hover:bg-orange-100/50">
                                                <span>{faq.q}</span>
                                                <span className="text-orange-600 text-xl group-open:rotate-45 transition-transform shrink-0">+</span>
                                            </summary>
                                            <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Cross-links to sibling cluster pages — keeps crawlers moving
                            between related content, distributes internal link equity,
                            and gives users a next-step instead of a dead-end. */}
                        <div className="border-t border-gray-100 pt-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-orange-500 rounded-full block"></span>
                                Explore More Pondicherry Food Guides
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {[
                                    { to: '/tamil-dishes', name: 'Tamil & Creole' },
                                    { to: '/french-quarter', name: 'French Quarter' },
                                    { to: '/seafood', name: 'Seafood' },
                                    { to: '/street-food', name: 'Street Food' },
                                    { to: '/restaurants', name: 'Best Restaurants' },
                                    { to: '/foodie-guide', name: 'Foodie Guide' },
                                ]
                                    .filter((c) => c.to !== location.pathname)
                                    .map((c) => (
                                        <Link
                                            key={c.to}
                                            to={c.to}
                                            className="bg-white border border-orange-200 rounded-lg px-4 py-3 text-center font-medium text-gray-800 hover:border-orange-500 hover:text-orange-600 hover:shadow-md transition-all"
                                        >
                                            {c.name}
                                        </Link>
                                    ))}
                            </div>
                        </div>

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
