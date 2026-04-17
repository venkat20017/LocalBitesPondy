import { createContext } from 'react';

export type LeadModalContextValue = {
    isOpen: boolean;
    source: string;
    openLeadModal: (source?: string) => void;
    closeLeadModal: () => void;
};

export const LeadModalContext = createContext<LeadModalContextValue | undefined>(undefined);
