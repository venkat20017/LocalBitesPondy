import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { LeadModalContext } from './leadModalContextObject';

export const LeadModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [source, setSource] = useState('popup');

    const openLeadModal = useCallback((src: string = 'popup') => {
        setSource(src);
        setIsOpen(true);
    }, []);

    const closeLeadModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const value = useMemo(
        () => ({ isOpen, source, openLeadModal, closeLeadModal }),
        [isOpen, source, openLeadModal, closeLeadModal]
    );

    return <LeadModalContext.Provider value={value}>{children}</LeadModalContext.Provider>;
};
