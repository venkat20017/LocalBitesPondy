import { useLocation } from 'react-router-dom';
import { usePageTracking } from '../hooks/usePageTracking';
import { useAutoTriggerModal } from '../hooks/useAutoTriggerModal';

/**
 * Side-effects that depend on the Router context.
 * Renders nothing — just runs the hooks.
 *
 * - GA4 page_view on every route change
 * - Auto-trigger lead modal (timer + exit-intent), disabled on /thank-you
 */
export function RouteEffects() {
  const { pathname } = useLocation();
  usePageTracking();
  useAutoTriggerModal({ disabled: pathname === '/thank-you' });
  return null;
}
