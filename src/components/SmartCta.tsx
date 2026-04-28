import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { isExternalUrl, isLeadCtaUrl, openLeadModal } from '../lib/leadModal';

type Props = {
  url?: string | null;
  external?: boolean;
  source?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

/**
 * Renders a CTA that picks the right element based on the URL:
 * - "#lead" / "#lead-modal" → button that opens the lead modal
 * - http(s)://...           → external <a> with rel="noopener"
 * - "/path"                 → react-router <Link>
 * - "#anchor"               → in-page anchor <a>
 * - empty / no URL          → renders children unwrapped (or button stub)
 */
export function SmartCta({
  url,
  external,
  source = 'cta',
  className,
  children,
  ariaLabel,
}: Props) {
  const target = url ?? '';

  if (isLeadCtaUrl(target)) {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={() => openLeadModal(source)}
        className={className}
      >
        {children}
      </button>
    );
  }

  if (!target) {
    return (
      <button type="button" aria-label={ariaLabel} className={className} disabled>
        {children}
      </button>
    );
  }

  if (isExternalUrl(target) || external) {
    return (
      <a
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </a>
    );
  }

  if (target.startsWith('/')) {
    return (
      <Link to={target} aria-label={ariaLabel} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={target} aria-label={ariaLabel} className={className}>
      {children}
    </a>
  );
}
