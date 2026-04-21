import { useEffect } from 'react';
import { useLeadModal } from './useLeadModal';

const SESSION_KEY_SHOWN = 'lbp_lead_modal_shown';
const SESSION_KEY_SUBMITTED = 'lbp_lead_submitted';

const TIME_DELAY_MS = 30_000;
const SCROLL_DEPTH_THRESHOLD = 0.6;

const hasAlreadyTriggered = () =>
    sessionStorage.getItem(SESSION_KEY_SHOWN) === '1' ||
    sessionStorage.getItem(SESSION_KEY_SUBMITTED) === '1';

export const useAutoTriggerModal = () => {
    const { openLeadModal, isOpen } = useLeadModal();

    useEffect(() => {
        if (hasAlreadyTriggered()) return;

        const trigger = (source: string) => {
            if (hasAlreadyTriggered() || isOpen) return;
            sessionStorage.setItem(SESSION_KEY_SHOWN, '1');
            openLeadModal(source);
        };

        // 1) Time-based trigger
        const timeoutId = window.setTimeout(() => trigger('popup_time_delay'), TIME_DELAY_MS);

        // 2) Scroll-depth trigger
        const onScroll = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollable <= 0) return;
            const ratio = window.scrollY / scrollable;
            if (ratio >= SCROLL_DEPTH_THRESHOLD) trigger('popup_scroll_depth');
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        // 3) Exit-intent trigger (desktop only: mouse leaves viewport top)
        const onMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0) trigger('popup_exit_intent');
        };
        document.addEventListener('mouseleave', onMouseLeave);

        return () => {
            window.clearTimeout(timeoutId);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [openLeadModal, isOpen]);
};
