# beautyunlocked.io — Low-code accessible waitlist site

**[View the live site](https://waitlist-site-pearl-nine.vercel.app/)**

![Final design mockup of the beautyunlocked.io landing page](assets/mockup/final.png)

## Project Overview & Goals

**What it is**: This is a pre-launch waiting-list website for an early-stage startup client building a beauty directory for disabled people. I designed it, built it in vanilla HTML, CSS and JavaScript, and deployed it on Vercel. It was built with portability and simplicity in mind, can be reused as a starter template for future marketing campaigns validating new ideas quickly.

**Main Goal:** The startup's promise is that beauty products are genuinely vetted for accessibility. The website is the first place a visitor can test that promise, so accessibility is both a usability requirement and critical part of the business case.

| Business goal                    | How the site supports it                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Grow the waitlist                | Disabled visitors, the core audience, need to be able to read the page, navigate it and reach the signup form.     |
| Earn trust before launch         | The site demonstrates the product's values instead of only claiming them.                                          |
| Stay credible with the community | Avoiding bolt-on overlays reduces the risk of contradicting the "no accessibility-washing" message.                |
| Validate demand cheaply          | A coming-soon directory page tests interest before the directory is built.                                         |
| Keep costs and handover simple   | A static site, with Tally handling forms, needs no backend, and non-technical teammates can view signups in Tally. |

## Tech stack

| Area      | Choice                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------ |
| Design    | Figma, Google Stitch                                                                                   |
| Front end | HTML, CSS, vanilla JavaScript, with no framework or packages                                           |
| Fonts     | Sora and Inter (Google Fonts), OpenDyslexic via jsdelivr CDN for the dyslexia-friendly toolbar setting |
| Forms     | Tally                                                                                                  |
| Analytics | Google Analytics 4                                                                                     |
| Hosting   | Vercel                                                                                                 |

I used Google Stitch to explore the initial design, and refined the code through the steps shown in the commit history, including accessibility, responsiveness and deployment fixes.

## Features

![accessibility toolbar image with overlay effect on page](assets/demo/toolbar.png)

- **Accessibility toolbar:** a custom toolbar on every page, with nine settings:
  - text size
  - text and line spacing
  - high contrast
  - low saturation
  - dyslexia-friendly font
  - larger click targets and cursor
  - stronger focus outline
  - reduced motion, which also pauses autoplaying video
  - underlined links

- **Saved preferences:** settings persist across pages through `localStorage`. If storage is unavailable, the site falls back to the defaults.
- **Keyboard support:** each page has a skip link and visible focus styles. Pressing `Escape` closes the toolbar and returns focus to its toggle button.
- **System motion setting:** the CSS respects `prefers-reduced-motion`, so visitors don't need the toolbar to turn off transitions and smooth scrolling.
- **Assistive technology support:** the mobile menu and toolbar expose their open or closed state through `aria-expanded`.
- **Responsive layout:** the pages share one stylesheet, with breakpoints for tablet and mobile.
- **Waitlist and contact forms:** both are embedded Tally forms.
- **Demand tracking:** Google Analytics 4 runs on every page. The directory page fires a custom `directory_fake_door_view` event with the chosen category, such as mobility, sensory or sight, to show which needs attract the most interest.

## Key decisions

### 1. Building a Custom toolbar vs. Using third-party overlay plugins

I originally considered free overlay widgets such as UserWay and accessiBe, and decided against them. Overlays inject a script that tries to fix problems without changing the underlying code. Accessibility professionals and disabled advocates have documented that they can conflict with screen readers and other assistive technology ([Overlay Fact Sheet](https://overlayfactsheet.com/)).

For a brand built on genuine accessibility, that risk was too high. I built a small toolbar that uses simple CSS class toggles, with no third-party script and no AI-guessed fixes. Toolbar preferences stay in the visitor's browser.

The toolbar doesn't replace accessible code or testing with disabled users. It adds options on top of the base site.

## 2. Using plain vanilla HTML/CSS vs. React

I built the site in plain HTML, CSS and JavaScript because it's a mostly static 4-page site with little interactivity. React doesn't make a site inaccessible, since accessibility depends on the HTML it produces, but it wouldn't have solved any problem this site has.

A waitlist site usually needs only 1-3 core pages. This one has a landing page, a signup page and a contact page, plus a coming-soon directory page to test demand. Keeping it simple makes it easy for early-stage startups and marketing teams to set up quickly and start getting user feedback.

It would also have added risks I'd need to manage:

- **Performance:** visitors on older devices would download more JavaScript for no benefit.
- **Resilience:** without pre-rendering, a client-side React app shows a blank page if its JavaScript fails.
- **Navigation:** client-side route changes don't announce the new page or reset focus by default. Standard links between pages handle this natively.
- **SEO:** React renders content client-side, so crawlers and link previews see less at first load. Bad for marketing campaigns needing search visibility and traffic.

The trade-off is duplication: the header, footer and toolbar are repeated on every page. That's manageable at this size. If it stops being manageable, a static site generator such as Astro would allow shared components while still shipping plain HTML. I'd reconsider React when the directory needs interactive features such as filtering, saved products or accounts.

## Setup

To build the site, you need Node 20.12 or newer. There are no packages to install.

1. Copy `.env.example` to `.env` and fill in every value.
2. Run `node build.js`.
3. Open `dist/index.html` in a browser, or serve the `dist` folder with any static file server.

Edit the source files, not `dist`. The build replaces `dist` each time and stops with an error if a value is missing.

> **Without Node:** you can skip the build and replace the values by hand.

See below for connecting Tally Forms and Google Analytics.

## Using this as a template

Your form IDs, Analytics ID, contact email and business details go in `.env`, as described in [Run locally](#run-locally). On Vercel, add the same values under **Settings → Environment Variables**. `vercel.json` already sets the build command and output folder.

Replace the images and alt text before you publish. The hero, review and banner images in `index.html` are placeholder graphics, and each has the label `Write alt text here in plain language`. Screen readers will read that label aloud until you replace it with a description of your image.

## Connecting the waitlist form to Tally

The site is a set of static files (`index.html`, `signup.html`, `contact.html`) — no server needed. "Join the Waitlist" (in the nav, hero, and footer CTA of `index.html`) links to `signup.html`, a dedicated page with an embedded **Tally** form. Tally stores every submission for you and gives your team a spreadsheet-like view with no code required.

### 1. Create the waitlist form in Tally

1. Go to [tally.so](https://tally.so) and sign up (free — no credit card).
2. Click **Create form**, and add a single **Email** question (Tally has an email field type with built-in format validation).
3. Optional but recommended: turn on **Prevent duplicate submissions** in the form's settings so the same email can't join twice.
4. Customize the look under **Design** — set the accent color to the site's maroon (`#5A1B1E`) and background to the cream (`#F4EFE4`) so the embed matches the page. This is a few clicks, no CSS needed.
5. Click **Publish**.

### 2. Get your form ID

1. Open your form and click **Share**.
2. You'll see a URL like `https://tally.so/r/wAbCd1`. The part after `/r/` (e.g. `wAbCd1`) is your **form ID**.

### 3. Wire it into the site

Copy `.env.example` to `.env` if you haven't already. Set `TALLY_WAITLIST_FORM_ID` to your form ID from step 2, then run `node build.js`. On Vercel, add the same variable under **Settings → Environment Variables**.

That's it — no script URL, no API key, nothing else to configure. The embed script already included at the bottom of `signup.html` loads the form into the iframe automatically.

### 4. Where your team sees signups

- **In Tally:** open the form → **Responses** tab. This is a live, filterable, exportable (CSV) table — the easiest option for non-technical teammates, no extra setup.
- **Auto-sync elsewhere (optional):** Tally has one-click integrations (under the form's **Integrations** tab) to send each new response to a Google Sheet, Airtable, Slack channel, or Mailchimp/Brevo audience automatically, if you'd rather your team not log into Tally directly.

### 5. Test it

Open `dist/signup.html` in a browser, submit a test email, and confirm it shows up under the form's **Responses** tab in Tally within a few seconds.

### Notes

- Tally's free plan has no cap on forms or responses, so this scales for free as your waitlist grows.
- Because the form itself is hosted and rendered by Tally (not your own fetch call to a public endpoint), there's no exposed write-access URL on your page for someone to abuse — safer by default than the earlier Google Apps Script approach.
- If you later want automated "you're on the list" emails, launch announcements, or segmentation, connect Tally's Mailchimp/Brevo integration under **Integrations** rather than building that yourself.
- `contact.html` uses a second, separate Tally form (name, email, subject, message), also embedded inline. Create that form the same way — steps 1–2 above — then set `TALLY_CONTACT_FORM_ID` to that form's ID. It's a distinct form from the waitlist one in `signup.html`.

## Hooking up to Google Analytics

Since this is a plain static site (no framework, no server), the simplest approach is Google Analytics 4 with the standard `gtag.js` snippet — it's just a script tag, and GA4 already auto-tracks page views, clicks, scroll depth, and outbound clicks without you writing anything, via its "Enhanced measurement" feature.

**Setup (one-time, ~5 min):**

1. Go to [analytics.google.com](https://analytics.google.com), create a GA4 property, add a "Web" data stream for your domain.
2. You'll get a Measurement ID like `G-XXXXXXXXXX`.
3. Set `GA_MEASUREMENT_ID` to that ID in `.env`, then run `node build.js`. The `gtag.js` snippet is already in the `<head>` of every page. On Vercel, add the same variable under **Settings → Environment Variables**.

**What you get for free with zero extra code**, once Enhanced Measurement is on (it's on by default): page views, scroll depth (90%), outbound link clicks, and site search — genuinely useful before writing a single custom event.

**Custom events worth adding on top**, since a waitlist site lives or dies by conversion:

- `cta_click` — fires when someone clicks "Join the Waitlist" (hero, waitlist section, or nav "Sign Up") — tells you which CTA placement actually works
- `waitlist_signup_completed` — the most important one. Tally posts a `window.postMessage` event when someone successfully submits the embedded form, so you can listen for that on `signup.html` and fire a real GA conversion event the moment someone joins — not just "visited the signup page," but "actually signed up"
- `contact_form_completed` — same pattern, listening for Tally's message on `contact.html`

That gives you a real funnel: homepage view → CTA click → signup page view → completed signup, instead of just raw pageviews.

---

## Known gaps

- It hasn't been tested with disabled users, and no formal WCAG audit has been done. The site doesn't claim WCAG conformance. However feedback has been given from occupational therapists.
- The accessibility of the embedded Tally forms hasn't been audited.
- Signup conversion isn't tracked yet. [SETUP.md](SETUP.md) describes the planned funnel events.
