export interface LeadData {
    name?: string;
    email: string;
    source?: string;
    message?: string;
}

export const saveLeadToSheets = async (data: LeadData) => {
    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
        console.warn('Google Script URL not configured in .env');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('email', data.email);
        if (data.name) formData.append('name', data.name);
        if (data.source) formData.append('source', data.source);
        if (data.message) formData.append('message', data.message);
        formData.append('timestamp', new Date().toISOString());

        // Google Apps Script Web App requires POST request.
        // mode: 'no-cors' is necessary because the redirect from script.google.com
        // to googleusercontent.com generally violates CORS for simple fetch requests from browsers.
        // This means we won't get a readable response body, but the detailed logging
        // will help debugging if the request fails completely.
        await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            body: formData,
        });

        // With no-cors, response.ok is always false and status is 0.
        // We assume success if no error is thrown during the fetch.
        console.log('Request sent to Google Sheets');

    } catch (error) {
        console.error('Error submitting to Google Sheets', error);
        // We might want to re-throw or handle this depending on UX requirements
        // For now, allow the UI to show success as the user still gets the PDF
    }
};
