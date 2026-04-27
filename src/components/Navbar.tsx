import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-bold text-gray-900">
          LocalBitesPondy
        </Link>
        <ul className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
          <li><Link to="/restaurants" className="hover:text-orange-600">Restaurants</Link></li>
          <li><Link to="/blog" className="hover:text-orange-600">Blog</Link></li>
        </ul>
      </nav>
    </header>
  );
};
