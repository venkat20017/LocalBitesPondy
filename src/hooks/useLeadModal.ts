import { useContext } from 'react';
import { LeadModalContext } from '../contexts/leadModalContextObject';

export const useLeadModal = () => {
    const ctx = useContext(LeadModalContext);
    if (!ctx) throw new Error('useLeadModal must be used within LeadModalProvider');
    return ctx;
};
