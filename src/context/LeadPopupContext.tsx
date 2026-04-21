import { createContext, useContext, useState, type ReactNode } from 'react';
import { trackEvent } from '../services/analytics';

interface LeadPopupContextType {
    isOpen: boolean;
    openPopup: (source?: string) => void;
    closePopup: () => void;
    source: string;
}

const LeadPopupContext = createContext<LeadPopupContextType | undefined>(undefined);

export const LeadPopupProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [source, setSource] = useState('general');

    const openPopup = (newSource: string = 'general') => {
        setSource(newSource);
        setIsOpen(true);
        trackEvent('Popup Opened', 'lead_generation', newSource);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <LeadPopupContext.Provider value={{ isOpen, openPopup, closePopup, source }}>
            {children}
        </LeadPopupContext.Provider>
    );
};

export const useLeadPopup = () => {
    const context = useContext(LeadPopupContext);
    if (context === undefined) {
        throw new Error('useLeadPopup must be used within a LeadPopupProvider');
    }
    return context;
};
