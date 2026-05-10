export interface LeadData {
    name?: string;
    email: string;
    phone?: string;
    source?: string;
    message?: string;
}

export const saveLeadToSheets = async (data: LeadData) => {
    const scriptUrl = import.meta.env.VITE_LEAD_SCRIPT_URL;

    if (!scriptUrl) {
        console.warn('Google Script URL not configured in .env');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('email', data.email);
        if (data.name) formData.append('name', data.name);
        if (data.phone) formData.append('phone', data.phone);
        if (data.source) formData.append('source', data.source);
        if (data.message) formData.append('message', data.message);
        formData.append('timestamp', new Date().toISOString());

        // Google Apps Script Web App requires POST request.
        await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            body: formData,
        });

        // console.log('Request sent to Google Sheets');

    } catch (error) {
        console.error('Error submitting to Google Sheets', error);
    }
};

