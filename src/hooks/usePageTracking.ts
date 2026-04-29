import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../services/analytics';

/**
 * Fire a GA4 page_view on every route change.
 * gtag's auto page_view is disabled in index.html (`send_page_view: false`)
 * so the initial load doesn't double-count.
 */
export function usePageTracking() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
}
