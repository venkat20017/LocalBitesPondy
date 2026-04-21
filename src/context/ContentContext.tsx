import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { fetchAllWebsiteData, parseSettings } from '../services/content';

interface ContentContextType {
    data: any;
    settings: Record<string, any>;
    isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<any>(null);
    const [settings, setSettings] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAllData = async () => {
            const result = await fetchAllWebsiteData();
            if (result) {
                setData(result);
                if (result.Settings) {
                    setSettings(parseSettings(result.Settings));
                }
            }
            setIsLoading(false);
        };
        loadAllData();
    }, []);

    return (
        <ContentContext.Provider value={{ data, settings, isLoading }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
