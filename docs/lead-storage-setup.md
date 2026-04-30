# Lead storage setup

Leads from both the **PDF popup** (`LeadModal.tsx`) and the **inline contact form** (`ContactForm.tsx`) are written to two destinations in parallel:

1. **Google Sheets** via Google Apps Script (primary — also sends emails)
2. **Netlify Forms** (backup — visible in Netlify dashboard, has spam protection)

If either succeeds, the user sees a success message. If both fail, the user sees an error and can retry.

## What gets stored

| Column | Source |
|---|---|
| Date | server-side timestamp |
| Name | form input |
| Email | form input |
| Phone | form input (optional) |
| Message | form input (only ContactForm) |
| Lead Source | `pdf_download` \| `contact_form` \| `about_page` \| `blog_cta` |
| Page URL | `window.location.href` at submit time |

## Setting up the Google Apps Script (one-time)

1. Open https://script.google.com → **New project** → name it `LocalBitesPondy Leads`.
2. Open `scripts/google-apps-script-leads.gs` from this repo and copy its contents into the Apps Script editor's `Code.gs` (replacing the default).
3. Edit the constants at the top:
   - `ADMIN_EMAIL` — where notification emails go (default: `venkateshprasads.bs019@gmail.com`)
   - `SHEET_ID` — paste your Google Sheet ID (from `https://docs.google.com/spreadsheets/d/<ID>/edit`). Leave empty if the script is bound to a spreadsheet.
   - `SHEET_TAB_NAME` — tab name inside the sheet (default: `Leads`)
4. In the Apps Script editor, run the `setupHeaders` function once. Google will prompt for permissions — grant them. This writes the column headers and freezes the header row.
5. **Deploy** → **New deployment** → Type: **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click Deploy.
6. Copy the deployment URL (ends in `/exec`).
7. Add to your `.env`:
   ```
   VITE_LEAD_SCRIPT_URL=https://script.google.com/macros/s/<deployment-id>/exec
   ```
8. Trigger a Netlify rebuild so the new env var is baked in (or set it in Netlify's UI under Site settings → Environment variables).

### Updating the script later

Each time you change the script, you must:
- Deploy → **Manage deployments** → ✏️ **Edit** the existing deployment → Version: **New version** → **Deploy**.
- The `/exec` URL stays the same — no env update needed.

## Setting up Netlify Forms (already done)

The static `<form name="lead-capture" data-netlify="true" netlify-honeypot="bot-field" hidden>` in `index.html` is automatically detected by Netlify on every deploy. No setup required.

Submissions appear under: **Netlify dashboard → Site → Forms → lead-capture**.

You can configure email notifications under: **Forms → Settings → Form notifications** (separate from the Apps Script emails).

## Verifying end-to-end

Open the deployed site, submit the contact form (or trigger the popup), and check:

- ✅ A new row in your Google Sheet (within ~5 seconds)
- ✅ An email at `venkateshprasads.bs019@gmail.com` titled `[LocalBitesPondy] New lead — contact_form`
- ✅ An email to the address used in the form titled `Thanks for reaching out — LocalBitesPondy`
- ✅ The submission listed in Netlify dashboard → Forms

If only Netlify shows it but not the sheet/email, the Apps Script URL is misconfigured or hit its quota (100 emails/day for free Gmail accounts).

## Changing the admin email later

Either:
- Edit the `.env` file (NOT how it works currently — the email is in the Apps Script, not the env)
- Open the Apps Script, change `ADMIN_EMAIL`, redeploy as a new version

## Daily quotas (Google free tier)

| Limit | Free Gmail | Workspace |
|---|---|---|
| `GmailApp.sendEmail` | 100/day | 1500/day |
| Apps Script execution time | 6 min/script | 30 min/script |
| Web App calls | 20,000/day | 30,000/day |

For a marketing landing page these are non-binding. If you cross the email quota, the sheet still gets the row — only the email skips that day.
