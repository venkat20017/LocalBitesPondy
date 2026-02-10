function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // ---------------------------------------------------------
    // AUTO-TEST MODE
    // If you run this function directly in the editor, 'e' will be undefined.
    // We automatically switch to test mode with dummy data so it doesn't crash.
    // ---------------------------------------------------------
    if (!e) {
        console.warn("⚠️ Running in TEST MODE (No event object found). Using dummy data.");
        e = {
            parameter: {
                email: "editor_test@example.com",
                name: "Test User (Editor Run)",
                source: "editor_test",
                timestamp: new Date().toISOString()
            }
        };
    }

    // Get parameters from the request
    // The frontend sends: email, name (optional), source (optional), timestamp
    var params = e.parameter;

    // Define the row data. 
    // IMPORTANT: Ensure your Google Sheet columns match this order!
    // Column A: Email
    // Column B: Name
    // Column C: Source
    // Column D: Timestamp
    // Column E: Message
    var rowData = [
        params.email,
        params.name || '',    // Handle missing name
        params.source || '',  // Handle missing source
        params.timestamp,
        params.message || '' // Handle missing message
    ];

    // Get the next empty row
    var nextRow = sheet.getLastRow() + 1;

    // Save the data
    // The '4' here is crucial - ensure the range matches the data length
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);

    // Return success response
    return ContentService.createTextOutput("Success");
}
