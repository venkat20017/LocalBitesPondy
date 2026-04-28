import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSanityDoc } from '../hooks/useSanityDoc';
import type { NavbarDoc, CtaButton, LinkItem } from '../types/sanity';
import { SanityImage } from './SanityImage';
import { isExternalUrl, isLeadCtaUrl, openLeadModal } from '../lib/leadModal';

const FALLBACK: NavbarDoc = {
  logoText: 'LocalBitesPondy',
  links: [
    { label: 'Restaurants', url: '/restaurants' },
    { label: 'Blog', url: '/blog' },
    { label: 'FAQ', url: '/#faq' },
  ],
  ctaButton: { label: 'Get the Free Guide', url: '#lead' },
};

function NavLink({
  link,
  className,
  onClick,
}: {
  link: LinkItem;
  className?: string;
  onClick?: () => void;
}) {
  const url = link.url ?? '#';
  const label = link.label ?? '';
  if (isLeadCtaUrl(url)) {
    return (
      <button
        type="button"
        onClick={() => {
          openLeadModal('navbar_link');
          onClick?.();
        }}
        className={className}
      >
        {label}
      </button>
    );
  }
  if (isExternalUrl(url) || link.external) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
        {label}
      </a>
    );
  }
  if (url.startsWith('/')) {
    return (
      <Link to={url} onClick={onClick} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={url} onClick={onClick} className={className}>
      {label}
    </a>
  );
}

function CtaButtonEl({
  cta,
  source,
  className,
  onClick,
}: {
  cta: CtaButton;
  source: string;
  className: string;
  onClick?: () => void;
}) {
  const url = cta.url ?? '#';
  const label = cta.label ?? 'Get the Guide';
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        if (isLeadCtaUrl(url)) {
          openLeadModal(source);
          return;
        }
        if (isExternalUrl(url) || cta.external) {
          window.open(url, '_blank', 'noopener,noreferrer');
          return;
        }
        if (url.startsWith('/')) {
          navigate(url);
          return;
        }
        if (url.startsWith('#')) {
          window.location.hash = url;
          return;
        }
      }}
      className={className}
    >
      {label}
    </button>
  );
}

export const Navbar = () => {
  const { data } = useSanityDoc<NavbarDoc>('navbar', FALLBACK);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const links = data.links ?? [];
  const cta = data.ctaButton;

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all ${
        scrolled
          ? 'border-gray-200 bg-white/95 shadow-sm backdrop-blur'
          : 'border-transparent bg-white/80 backdrop-blur'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-gray-900">
          {data.logoImage?.asset?._ref ? (
            <SanityImage image={data.logoImage} width={120} className="h-8 w-auto" alt={data.logoText ?? 'Logo'} />
          ) : (
            <span>{data.logoText}</span>
          )}
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex">
          {links.map((l, i) => (
            <li key={i}>
              <NavLink link={l} className="transition-colors hover:text-orange-600" />
            </li>
          ))}
        </ul>

        <div className="hidden items-center md:flex">
          {cta?.label && (
            <CtaButtonEl
              cta={cta}
              source="navbar"
              className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            />
          )}
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="absolute inset-x-0 top-16 z-40 border-b border-gray-200 bg-white md:hidden">
          <ul className="flex flex-col px-4 py-3 sm:px-6">
            {links.map((l, i) => (
              <li key={i} className="border-b border-gray-100 last:border-0">
                <NavLink
                  link={l}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-gray-800 hover:text-orange-600"
                />
              </li>
            ))}
          </ul>
          {cta?.label && (
            <div className="px-4 pb-4 sm:px-6">
              <CtaButtonEl
                cta={cta}
                source="navbar_mobile"
                onClick={() => setOpen(false)}
                className="w-full rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
};
