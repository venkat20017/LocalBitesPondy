import { useEffect } from 'react';
import { openLeadModal } from '../lib/leadModal';
import { SESSION_FLAGS } from '../services/leads';

type Options = {
  /** Delay before timer-fired auto-open (ms). Default: 30000. */
  delayMs?: number;
  /** Enable exit-intent (desktop only). Default: true. */
  exitIntent?: boolean;
  /** Disable auto-trigger entirely (e.g. on /thank-you). Default: false. */
  disabled?: boolean;
};

/**
 * Auto-open the lead modal once per session via timer or exit-intent,
 * provided the user hasn't already submitted, dismissed it manually,
 * or seen the auto-trigger before.
 */
export function useAutoTriggerModal({
  delayMs = 30000,
  exitIntent = true,
  disabled = false,
}: Options = {}) {
  useEffect(() => {
    if (disabled) return;
    if (typeof window === 'undefined') return;

    // Respect session-level gates set by the modal itself.
    if (sessionStorage.getItem(SESSION_FLAGS.SUBMITTED)) return;
    if (sessionStorage.getItem(SESSION_FLAGS.DISMISSED)) return;
    if (sessionStorage.getItem(SESSION_FLAGS.AUTO_TRIGGERED)) return;

    let fired = false;
    const fire = (source: string) => {
      if (fired) return;
      fired = true;
      sessionStorage.setItem(SESSION_FLAGS.AUTO_TRIGGERED, '1');
      cleanup();
      openLeadModal(source);
    };

    const timer = window.setTimeout(() => fire('auto_timer'), delayMs);

    const onMouseLeave = (e: MouseEvent) => {
      // Only fire on real top-edge exit (desktop).
      if (e.clientY <= 0 && e.relatedTarget === null) {
        fire('auto_exit_intent');
      }
    };

    const cleanup = () => {
      window.clearTimeout(timer);
      if (exitIntent) document.removeEventListener('mouseleave', onMouseLeave);
    };

    if (exitIntent && window.matchMedia('(min-width: 768px)').matches) {
      document.addEventListener('mouseleave', onMouseLeave);
    }

    return cleanup;
  }, [delayMs, exitIntent, disabled]);
}
