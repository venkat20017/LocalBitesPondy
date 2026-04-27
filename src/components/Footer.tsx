import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-gray-600 sm:px-6 md:flex-row lg:px-8">
        <p>&copy; {new Date().getFullYear()} LocalBitesPondy</p>
        <ul className="flex gap-6">
          <li><Link to="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link></li>
          <li><Link to="/terms-of-use" className="hover:text-gray-900">Terms of Use</Link></li>
        </ul>
      </div>
    </footer>
  );
};
