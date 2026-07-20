# Connecting the waitlist form to Tally

The site is a set of static files (`index.html`, `signup.html`,
`contact.html`) — no server needed. "Join the Waitlist" (in the nav, hero,
and footer CTA of `index.html`) links to `signup.html`, a dedicated page
with an embedded **Tally** form. Tally stores every submission for you and
gives your team a spreadsheet-like view with no code required.

## 1. Create the waitlist form in Tally

1. Go to [tally.so](https://tally.so) and sign up (free — no credit card).
2. Click **Create form**, and add a single **Email** question (Tally has an
   email field type with built-in format validation).
3. Optional but recommended: turn on **Prevent duplicate submissions** in
   the form's settings so the same email can't join twice.
4. Customize the look under **Design** — set the accent color to the site's
   maroon (`#5A1B1E`) and background to the cream (`#F4EFE4`) so the embed
   matches the page. This is a few clicks, no CSS needed.
5. Click **Publish**.

## 2. Get your form ID

1. Open your form and click **Share**.
2. You'll see a URL like `https://tally.so/r/wAbCd1`. The part after `/r/`
   (e.g. `wAbCd1`) is your **form ID**.

## 3. Wire it into the site

Open `signup.html` and find the `iframe` with
`data-tally-src="https://tally.so/embed/PASTE_YOUR_TALLY_FORM_ID?..."`.
Replace `PASTE_YOUR_TALLY_FORM_ID` with your real form ID from step 2.

That's it — no script URL, no API key, nothing else to configure. The
embed script already included at the bottom of `signup.html` loads the
form into the iframe automatically.

## 4. Where your team sees signups

- **In Tally:** open the form → **Responses** tab. This is a live,
  filterable, exportable (CSV) table — the easiest option for non-technical
  teammates, no extra setup.
- **Auto-sync elsewhere (optional):** Tally has one-click integrations
  (under the form's **Integrations** tab) to send each new response to a
  Google Sheet, Airtable, Slack channel, or Mailchimp/Brevo audience
  automatically, if you'd rather your team not log into Tally directly.

## 5. Test it

Open `signup.html` in a browser, submit a test email, and confirm it shows
up under the form's **Responses** tab in Tally within a few seconds.

## Notes

- Tally's free plan has no cap on forms or responses, so this scales for
  free as your waitlist grows.
- Because the form itself is hosted and rendered by Tally (not your own
  fetch call to a public endpoint), there's no exposed write-access URL on
  your page for someone to abuse — safer by default than the earlier
  Google Apps Script approach.
- If you later want automated "you're on the list" emails, launch
  announcements, or segmentation, connect Tally's Mailchimp/Brevo
  integration under **Integrations** rather than building that yourself.
- `contact.html` uses a second, separate Tally form (name, email, subject,
  message), also embedded inline. Create that form the same way — steps
  1–2 above — then open `contact.html` and replace
  `PASTE_YOUR_TALLY_FORM_ID` in its `iframe`'s `data-tally-src` with that
  form's ID. It's a distinct form from the waitlist one in `signup.html`.
