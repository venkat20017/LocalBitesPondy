import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Twitter,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { useSanityDoc } from '../hooks/useSanityDoc';
import type { FooterDoc, LinkItem, SocialLink } from '../types/sanity';
import { isExternalUrl, isLeadCtaUrl, openLeadModal } from '../lib/leadModal';

const FALLBACK: FooterDoc = {
  logoText: 'LocalBitesPondy',
  tagline: 'The local food guide tourists never find.',
  columns: [
    {
      heading: 'Explore',
      links: [
        { label: 'Restaurants', url: '/restaurants' },
        { label: 'Blog', url: '/blog' },
        { label: 'FAQ', url: '/#faq' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About us', url: '/about-us' },
        { label: 'Contact', url: '/#contact' },
        { label: 'Privacy Policy', url: '/privacy-policy' },
        { label: 'Terms of Use', url: '/terms-of-use' },
      ],
    },
    {
      heading: 'Get the guide',
      links: [{ label: 'Free PDF download', url: '#lead' }],
    },
  ],
  socialLinks: [],
  copyright: '© {year} LocalBitesPondy. All rights reserved.',
};

const SOCIAL_ICON: Record<NonNullable<SocialLink['platform']>, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
  whatsapp: MessageCircle,
  linkedin: Linkedin,
};

function FooterLink({ link }: { link: LinkItem }) {
  const url = link.url ?? '#';
  const label = link.label ?? '';
  const className = 'text-sm text-gray-400 transition hover:text-white';

  if (isLeadCtaUrl(url)) {
    return (
      <button type="button" onClick={() => openLeadModal('footer')} className={className}>
        {label}
      </button>
    );
  }
  if (isExternalUrl(url) || link.external) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }
  if (url.startsWith('/')) {
    return (
      <Link to={url} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={url} className={className}>
      {label}
    </a>
  );
}

export const Footer = () => {
  const { data } = useSanityDoc<FooterDoc>('footer', FALLBACK);
  const year = new Date().getFullYear();
  const copyright = (data.copyright ?? FALLBACK.copyright)?.replace('{year}', String(year));

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="text-lg font-extrabold tracking-tight text-white">
              {data.logoText}
            </Link>
            {data.tagline && (
              <p className="mt-4 text-sm leading-relaxed text-gray-400">{data.tagline}</p>
            )}
          </div>

          {(data.columns ?? []).map((col, i) => (
            <div key={i}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {(col.links ?? []).map((link, j) => (
                  <li key={j}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-gray-800 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-gray-500">{copyright}</p>

          {!!data.socialLinks?.length && (
            <ul className="flex items-center gap-2">
              {data.socialLinks.map((social, i) => {
                if (!social.platform || !social.url) return null;
                const Icon = SOCIAL_ICON[social.platform];
                if (!Icon) return null;
                return (
                  <li key={i}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition hover:bg-orange-600 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
};
