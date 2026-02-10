


import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-gray-50 pt-16 pb-8 px-4 border-t border-gray-200">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 md:grid-cols-2 mb-12">
                    {/* Left Column: About */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-lg mb-4">About LocalBitesPondy</h3>
                        <p className="text-gray-600 leading-relaxed max-w-md">
                            Your insider's guide to famous food in Pondicherry. We skip the tourist traps and show you where locals actually eat—from century-old French boulangeries to family-run Tamil restaurants that serve the authentic flavors of Puducherry.
                        </p>
                    </div>

                    {/* Right Column: Popular Searches */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-lg mb-4">Popular Searches</h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "homely food in pondicherry",
                                "best budget restaurants in pondicherry",
                                "best biryani in pondicherry",
                                "best dinner place in pondicherry",
                                "best food spot in pondicherry",
                                "best restaurant near me",
                                "local restaurant in pondicherry",
                                "best home food restaurant near me",
                                "homely food near me",
                                "best family restaurant in pondicherry",
                                "famous food in pondicherry",
                                "famous food near me",
                                "best hotel in pondicherry",
                                "local food in pondicherry",
                                "Best restaurants in Pondicherry",
                                "French cafes Pondicherry",
                                "Tamil breakfast spots",
                                "Pondicherry street food",
                                "Seafood restaurants Pondicherry"
                            ].map((tag, index) => (
                                <span key={index} className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-orange-200 hover:text-orange-600 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} LocalBitesPondy. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-use" className="hover:text-gray-900 transition-colors">Terms of Use</Link>
                        <Link to="/about-us" className="hover:text-gray-900 transition-colors">About Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

