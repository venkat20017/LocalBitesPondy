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
                source: "contact_form",
                message: "This is a test message.",
                timestamp: new Date().toISOString()
            }
        };
    }

    var params = e.parameter;

    var rowData = [
        params.email,
        params.name || '',    // Handle missing name
        params.source || '',  // Handle missing source
        params.timestamp,
        params.message || ''  // Handle missing message
    ];

    var nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);

    // EMAIL LOGIC
    try {
        var userEmail = params.email;
        var userName = params.name ? params.name : 'Food Lover';
        var source = params.source || '';
        var userMessage = params.message || '';
        
        var adminEmail = "venkateshprasads.bs019@gmail.com"; 
        var isContact = source === 'contact_form';
        
        var brandColor = "#EA580C"; // Tailwind orange-600
        var bgColor = "#F9FAFB"; 
        
        var htmlTemplate = function(title, bodyText, buttonHtml) {
            return `
                <div style="font-family: Arial, sans-serif; background-color: ${bgColor}; padding: 40px 20px; color: #1F2937;">
                    <div style="max-width: 600px; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 0 auto;">
                        <div style="background-color: ${brandColor}; padding: 30px; text-align: center;">
                            <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: bold;">LocalBitesPondy</h1>
                        </div>
                        <div style="padding: 40px 30px;">
                            <h2 style="margin-top: 0; color: #111827; font-size: 20px;">${title}</h2>
                            <p style="line-height: 1.6; color: #4B5563; font-size: 16px;">
                                ${bodyText}
                            </p>
                            ${buttonHtml ? `<div style="text-align: center; margin-top: 30px;">${buttonHtml}</div>` : ''}
                        </div>
                        <div style="background-color: #F3F4F6; padding: 20px; text-align: center; color: #6B7280; font-size: 14px;">
                            &copy; ${new Date().getFullYear()} LocalBitesPondy. All rights reserved.<br/>
                            Pondicherry, India
                        </div>
                    </div>
                </div>
            `;
        };

        if (isContact) {
            // 1. User Auto-Reply (Contact Form)
            var contactUserBody = `Hi ${userName},<br><br>Thank you for reaching out to us! We've received your message and our team will get back to you within 24 hours.<br><br>Here is a copy of your message:<br><blockquote style="border-left: 4px solid #E5E7EB; padding-left: 15px; margin-left: 0; margin-top: 15px; color: #6B7280;"><em>${userMessage}</em></blockquote>`;
            MailApp.sendEmail({
                to: userEmail,
                subject: "Thank you for contacting LocalBitesPondy",
                htmlBody: htmlTemplate("Message Received!", contactUserBody, "")
            });

            // 2. Admin Notification (Contact Form)
            var contactAdminBody = `<strong>New message from the website contact form:</strong><br><br>
                <strong>Name:</strong> ${userName}<br>
                <strong>Email:</strong> ${userEmail}<br>
                <strong>Message:</strong> ${userMessage}<br>
                <strong>Source:</strong> ${source}`;
            MailApp.sendEmail({
                to: adminEmail,
                subject: `New Contact Form Submission from ${userName}`,
                htmlBody: htmlTemplate("New Message Received", contactAdminBody, `<a href="mailto:${userEmail}" style="background-color: ${brandColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reply to ${userName}</a>`)
            });

        } else {
            // 1. User Auto-Reply (Lead Form)
            var leadUserBody = `Hi ${userName},<br><br>Thanks for your interest in the best food Pondicherry has to offer! As promised, here is your free guide to the 15+ spots locals love.<br><br>Get ready to explore the best French cafes, traditional Tamil messes, and hidden street food gems.`;
            var downloadBtn = `<a href="https://localbitespondy.com/famous-food-in-pondicherry.pdf" style="background-color: ${brandColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Download Your Free Guide</a>`;
            MailApp.sendEmail({
                to: userEmail,
                subject: "Here is your free Pondicherry Food Guide! 🍽️",
                htmlBody: htmlTemplate("Your Free Guide is Here!", leadUserBody, downloadBtn)
            });

            // 2. Admin Notification (Lead Form)
            var phoneStr = params.phone ? `<br><strong>Phone:</strong> ${params.phone}` : "";
            var leadAdminBody = `<strong>New lead acquired:</strong><br><br>
                <strong>Name:</strong> ${userName}<br>
                <strong>Email:</strong> ${userEmail}
                ${phoneStr}
                <br><strong>Source:</strong> ${source}`;
            MailApp.sendEmail({
                to: adminEmail,
                subject: `New Lead: ${userName}`,
                htmlBody: htmlTemplate("New Lead Received", leadAdminBody, `<a href="mailto:${userEmail}" style="background-color: ${brandColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Email Lead</a>`)
            });
        }
    } catch (err) {
        console.error("Email sending failed", err);
    }

    return ContentService.createTextOutput("Success");
}
