/**
 * LocalBitesPondy — lead intake Apps Script.
 *
 * Receives POSTs from src/services/leads.ts (mode: 'no-cors',
 * application/x-www-form-urlencoded), appends a row to a Google Sheet,
 * and sends two emails: a confirmation to the lead and a notification
 * to the admin.
 *
 * ---------------------------------------------------------------------------
 * SETUP (do this ONCE per environment)
 * ---------------------------------------------------------------------------
 * 1. Open https://script.google.com/ → New project → name it
 *    "LocalBitesPondy Leads".
 * 2. Replace the default Code.gs contents with this entire file.
 * 3. Set the constants below:
 *      ADMIN_EMAIL     — where notification emails go
 *      SHEET_ID        — your Google Sheet ID (from the URL after /d/)
 *      SHEET_TAB_NAME  — tab inside the sheet (default: "Leads")
 *    Or leave SHEET_ID empty to use SpreadsheetApp.getActiveSpreadsheet()
 *    (only works if the script is bound to a spreadsheet).
 * 4. Run the `setupHeaders` function once to write the column headers
 *    to the sheet (Google will prompt for permissions; allow them).
 * 5. Deploy → New deployment → Type: Web app
 *      Execute as: Me (your account)
 *      Who has access: Anyone
 *    Copy the deploy URL.
 * 6. Paste the URL into your .env as:
 *      VITE_LEAD_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 * 7. Test by submitting the contact form on the deployed site. Verify:
 *      - Sheet has a new row
 *      - You receive the admin notification email
 *      - The submitter receives the confirmation email
 *
 * Each time you change this script, you must Deploy → Manage deployments
 * → Edit → Version: New version → Deploy. The /exec URL stays the same.
 * ---------------------------------------------------------------------------
 */

const ADMIN_EMAIL = 'venkateshprasads.bs019@gmail.com';
const SHEET_ID = '';                 // optional — leave empty for bound sheet
const SHEET_TAB_NAME = 'Leads';
const FROM_NAME = 'LocalBitesPondy';
const SITE_URL = 'https://localbitespondy.com';

const COLUMNS = ['Date', 'Name', 'Email', 'Phone', 'Message', 'Lead Source', 'Page URL'];

/** Run ONCE manually after first install — writes header row. */
function setupHeaders() {
  const sheet = getSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
  }
}

/** Web App entry point. */
function doPost(e) {
  try {
    const params = (e && e.parameter) || {};
    const lead = {
      date: params.date || new Date().toISOString(),
      name: params.name || '',
      email: params.email || '',
      phone: params.phone || '',
      message: params.message || '',
      lead_source: params.lead_source || '',
      page_url: params.page_url || '',
    };

    appendRow_(lead);

    if (lead.email && isValidEmail_(lead.email)) {
      try { sendConfirmation_(lead); } catch (err) { Logger.log('Confirmation email failed: ' + err); }
    }
    try { sendAdminNotification_(lead); } catch (err) { Logger.log('Admin email failed: ' + err); }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    Logger.log('doPost error: ' + err);
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Health check via GET. */
function doGet() {
  return ContentService.createTextOutput('LocalBitesPondy lead intake — ok');
}

/* ------------------------------- Internals -------------------------------- */

function getSheet_() {
  const ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('No spreadsheet — set SHEET_ID at the top of the script.');
  let sheet = ss.getSheetByName(SHEET_TAB_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_TAB_NAME);
  return sheet;
}

function appendRow_(lead) {
  const sheet = getSheet_();
  const date = lead.date ? new Date(lead.date) : new Date();
  sheet.appendRow([
    date,
    lead.name,
    lead.email,
    lead.phone,
    lead.message,
    lead.lead_source,
    lead.page_url,
  ]);
}

function isValidEmail_(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function sendConfirmation_(lead) {
  const isPdf = lead.lead_source === 'pdf_download';
  const subject = isPdf
    ? 'Your Pondicherry food guide is on its way'
    : 'Thanks for reaching out — LocalBitesPondy';

  const greeting = lead.name ? 'Hi ' + lead.name + ',' : 'Hi there,';
  const intro = isPdf
    ? "Thanks for grabbing the food guide! It should already be downloading on the thank-you page. If you missed it, it's attached below or available here: " + SITE_URL + '/famous-food-in-pondicherry.pdf'
    : "Thanks for getting in touch. We've received your message and will reply within 24-48 hours. Below is a copy of what you sent for your records.";

  const messageBlock = lead.message
    ? '\n\n--- Your message ---\n' + lead.message + '\n--------------------'
    : '';

  const body =
    greeting + '\n\n' +
    intro + messageBlock + '\n\n' +
    'In the meantime, browse the latest restaurants and stories at ' + SITE_URL + '.\n\n' +
    'Cheers,\n' +
    'The ' + FROM_NAME + ' team';

  GmailApp.sendEmail(lead.email, subject, body, { name: FROM_NAME });
}

function sendAdminNotification_(lead) {
  const subject = '[' + FROM_NAME + '] New lead — ' + (lead.lead_source || 'unknown');
  const body =
    'New lead received:\n\n' +
    'Date:        ' + lead.date + '\n' +
    'Name:        ' + (lead.name || '(empty)') + '\n' +
    'Email:       ' + lead.email + '\n' +
    'Phone:       ' + (lead.phone || '(empty)') + '\n' +
    'Lead source: ' + lead.lead_source + '\n' +
    'Page URL:    ' + lead.page_url + '\n' +
    (lead.message ? '\nMessage:\n' + lead.message + '\n' : '') +
    '\n— Auto-sent by LocalBitesPondy lead intake.';
  GmailApp.sendEmail(ADMIN_EMAIL, subject, body, { name: FROM_NAME });
}
