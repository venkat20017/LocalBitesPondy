


import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        if (location.pathname !== '/') {
            navigate('/', { state: { target: href } });
            return;
        }

        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const quickLinks = [
        { name: 'Traditional & Creole', href: '#famous-food' },
        { name: 'French Quarter', href: '#french-cafes' },
        { name: 'Seafood & Street', href: '#seafood-street' },
        { name: 'Best Restaurants', href: '#restaurants' },
        { name: 'Survival Guide', href: '#foodie-guide' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <footer className="bg-gray-50 pt-20 pb-8 px-4 border-t border-gray-200">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mb-16">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-xl mb-6">LocalBitesPondy</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            The "not-so-secret" guide to famous food in Pondicherry. We skip the tourist traps and show you where locals actually eat—from century-old French boulangeries to family-run Tamil messes.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-xl mb-6">Explore the Guide</h3>
                        <ul className="grid grid-cols-1 gap-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleLinkClick(e, link.href)}
                                        className="text-gray-600 hover:text-orange-600 transition-colors text-lg"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact & Info */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-xl mb-6">Get in Touch</h3>
                        <p className="text-gray-600 mb-6 text-lg">
                            Have questions about Pondy's food scene? We'd love to hear from you.
                        </p>
                        <Link 
                            to="/about-us" 
                            className="inline-block bg-white border-2 border-orange-600 text-orange-600 px-6 py-2 rounded-full font-bold hover:bg-orange-600 hover:text-white transition-all"
                        >
                            About the Team
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
                    <p className="text-base">&copy; {new Date().getFullYear()} LocalBitesPondy. All rights reserved.</p>
                    <div className="flex gap-8 text-base">
                        <Link to="/privacy-policy" className="hover:text-orange-600 transition-colors">Privacy</Link>
                        <Link to="/terms-of-use" className="hover:text-orange-600 transition-colors">Terms</Link>
                        <Link to="/about-us" className="hover:text-orange-600 transition-colors">About Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};


