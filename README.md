# beautyunlocked.io — landing site

Static site, no build step: `index.html`, `signup.html`, `contact.html`,
sharing one stylesheet, `styles.css`. Deploy as-is (e.g. to Vercel) or open
directly in a browser — just keep all four files in the same folder.

- `SETUP.md` — connecting the waitlist and contact forms to Tally.

## Deployment

> Demo Link: https://waitlist-site-pearl-nine.vercel.app/
> Deployed with Vercel.

Collects emails via Tally for waitlist sign up for new startup biz (see SETUP.md).
Hook up to google analytics.

## Accessibility widget — why we built it ourselves

Every page includes a small accessibility toolbar (bottom-right corner)
with text size, high contrast, a dyslexia-friendly font option, reduce
motion, and underline-links controls. Preferences are saved per-browser
and carry across pages.

We considered a free third-party option (UserWay, AccessiBe, and similar
"overlay" widgets) but decided against it. These tools work by injecting a
script that guesses at fixes — reflowing text, auto-generating alt text,
etc. — without touching the underlying code. Hundreds of accessibility
professionals and disabled advocates have publicly documented that these
overlays frequently conflict with screen readers and assistive tech, and
in some cases make a site _less_ usable for the people they're meant to
help (see [overlayfactsheet.com](https://overlayfactsheet.com/) for the
detailed critique).

Given that our entire product is built around genuine, vetted
accessibility, shipping a bolt-on overlay would undercut that promise the
moment a knowledgeable visitor tried it. So the toolbar here only does a
handful of things that are simple, well-understood, and don't fight the
browser or assistive tech — no AI-guessed fixes, no third-party script,
no tracking. It's a start, not a substitute for the real work of testing
with disabled users, which is the standard the rest of the product holds
itself to.
