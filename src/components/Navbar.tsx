import { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLeadPopup } from '../context/LeadPopupContext';

export const Navbar = () => {
    const { openPopup } = useLeadPopup();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Traditional', href: '#famous-food' },
        { name: 'French Cafes', href: '#french-cafes' },
        { name: 'Seafood', href: '#seafood-street' },
        { name: 'Best Spots', href: '#restaurants' },
        { name: 'Tips', href: '#foodie-guide' },
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);

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

    useEffect(() => {
        const scrollToTarget = () => {
            const hash = location.hash;
            const stateTarget = (location.state as any)?.target;

            if ((hash || stateTarget) && location.pathname === '/') {
                const targetId = (hash || stateTarget).replace('#', '');
                const element = document.getElementById(targetId);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    if (stateTarget) {
                        window.history.replaceState({}, document.title);
                    }
                }
            }
        };

        setTimeout(scrollToTarget, 100);
    }, [location]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-white/90 backdrop-blur-md shadow-sm py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <a
                        href="/"
                        onClick={(e) => handleLinkClick(e, '#home')}
                        className="flex items-center gap-2 font-bold text-xl text-orange-600 z-50"
                    >
                        <UtensilsCrossed className="h-6 w-6" />
                        <span>LocalBitesPondy</span>
                    </a>

                        <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className={`font-medium transition-colors hover:text-orange-600 ${scrolled ? 'text-gray-700' : 'text-gray-800'}`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={() => openPopup('navbar')}
                            className="bg-orange-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Get Guide
                        </button>
                    </div>

                    <div className="md:hidden z-50">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-800 hover:text-orange-600 transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="text-2xl font-bold text-gray-800 hover:text-orange-600 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={() => openPopup('navbar_mobile')}
                        className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-orange-700 transition-colors shadow-lg"
                    >
                        Get Guide
                    </button>
                </div>
            </div>
        </nav>
    );
};

