const SCRIPT_URL = import.meta.env.VITE_CMS_SCRIPT_URL;

export const fetchAllWebsiteData = async () => {
    if (!SCRIPT_URL) return null;
    try {
        const response = await fetch(SCRIPT_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching entire website data:', error);
        return null;
    }
};

// Helper to convert a key-value sheet (like Settings) into a clean object
export const parseSettings = (settingsArray: any[]) => {
    const settings: Record<string, any> = {};
    if (!settingsArray) return settings;
    settingsArray.forEach(item => {
        if (item.key) settings[item.key] = item.value;
    });
    return settings;
};
