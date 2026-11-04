# beautyunlocked.io — accessible waitlist site

**[View the live site](https://waitlist-site-pearl-nine.vercel.app/)**

Pre-launch website for an early-stage startup building a beauty directory for disabled people. I designed it, built it in vanilla HTML, CSS and JavaScript, and deployed it on Vercel.

![Final design mockup of the beautyunlocked.io landing page](mockup/Mockup%20Final%20version%2021-07-26.png)

## Why accessibility drives this project

The startup's promise is that beauty products are genuinely vetted for accessibility. The website is the first place a visitor can test that promise, so accessibility is both a usability requirement and part of the business case.

| Business goal                    | How the site supports it                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Grow the waitlist                | Disabled visitors, the core audience, need to be able to read the page, navigate it and reach the signup form.     |
| Earn trust before launch         | The site demonstrates the product's values instead of only claiming them.                                          |
| Stay credible with the community | Avoiding bolt-on overlays reduces the risk of contradicting the "no accessibility-washing" message.                |
| Validate demand cheaply          | A coming-soon directory page tests interest before the directory is built.                                         |
| Keep costs and handover simple   | A static site, with Tally handling forms, needs no backend, and non-technical teammates can view signups in Tally. |

---

## Features

![accessibility toolbar image with overlay effect on page](mockup/toolbar.png)

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

## Key decision: custom toolbar vs. third-party overlay

I considered free overlay widgets such as UserWay and accessiBe, and decided against them. Overlays inject a script that tries to fix problems without changing the underlying code. Accessibility professionals and disabled advocates have documented that they can conflict with screen readers and other assistive technology ([Overlay Fact Sheet](https://overlayfactsheet.com/)).

For a brand built on genuine accessibility, that risk was too high. I built a small toolbar that uses simple CSS class toggles, with no third-party script and no AI-guessed fixes. Toolbar preferences stay in the visitor's browser.

The toolbar doesn't replace accessible code or testing with disabled users. It adds options on top of the base site.

## Tech stack

| Area      | Choice                                                         |
| --------- | -------------------------------------------------------------- |
| Design    | Figma, Google Stitch                                           |
| Front end | HTML, CSS, vanilla JavaScript, with no framework or build step |
| Forms     | Tally                                                          |
| Analytics | Google Analytics 4                                             |
| Hosting   | Vercel                                                         |

I used Google Stitch to explore the initial design, and refined the code through the steps shown in the commit history, including accessibility, responsiveness and deployment fixes.

## Known gaps

- It hasn't been tested with disabled users, and no formal WCAG audit has been done. The site doesn't claim WCAG conformance.
- The accessibility of the embedded Tally forms hasn't been audited.
- Signup conversion isn't tracked yet. [SETUP.md](SETUP.md) describes the planned funnel events.

## Run locally

There is nothing to install. Open `index.html` in a browser, or serve the folder with any static file server.

```text
index.html       Landing page
signup.html      Waitlist signup
contact.html     Contact form
directory.html   Coming-soon directory page
css/styles.css   Shared styles
js/script.js     Mobile menu and accessibility toolbar
```

See [SETUP.md](SETUP.md) for connecting Tally and Google Analytics.

## Using this as a template

Replace the images and alt text before you publish. The hero, review and banner images in `index.html` are placeholder graphics, and each has the label `Write alt text here in plain language`. Screen readers will read that label aloud until you replace it with a description of your image.
