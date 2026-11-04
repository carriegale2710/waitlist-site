# Accessibility Audit: beautyunlocked.io

**Standard:** WCAG 2.1 AA | **Date:** 2026-11-04 | **Pages:** `index.html`, `signup.html`, `contact.html`, `directory.html`

This audit doesn't certify WCAG conformance. It hasn't been tested with disabled users or with a real screen reader.

## Summary

**Issues found:** 26 | **Critical:** 2 | **Major:** 9 | **Minor:** 15

Automated scanning found only a small part of this list: low contrast on `.form-note`, heading order, and the Tally footer text. The other issues came from reading the code and measuring behavior in the browser.

**Severity**

- 🔴 **Critical:** stops people from using a core function, such as seeing where keyboard focus is or reaching the toolbar controls.
- 🟡 **Major:** a WCAG failure or a significant barrier for the site's core audience.
- 🟢 **Minor:** a smaller barrier, a best-practice gap, or a problem in an uncommon setup.

## Findings

Line references point to `index.html` where the same markup repeats on other pages.

### Perceivable

| # | Issue | WCAG criterion | Severity | Recommendation |
|---|-------|----------------|----------|----------------|
| 1 | `.form-note` text fails contrast at 3.52:1 on `--card`. It's 13px and includes the consent wording (`css/styles.css:606`, `index.html:457`, `signup.html:118`, `contact.html:169`, `directory.html:113`). | 1.4.3 Contrast | 🟡 Major | Use `--ink-soft` (7.10:1). `--ink-faint` would then have no text use left, so remove it. |
| 2 | Placeholder graphics are announced as photos that aren't there. For example, "Person applying makeup, smiling into a mirror" is really a gradient with a generic icon (`index.html:108`, `:317`, `:409`). | 1.1.1 Non-text Content | 🟡 Major | Add real photos with accurate alt text. Until then, use `aria-hidden="true"` and remove `role="img"`. |
| 3 | Star ratings have no text alternative. `★★★★☆` can be read as a string of symbols or skipped, so the score is lost (`index.html:340`, `:347`). | 1.1.1 Non-text Content | 🟡 Major | Use `<span class="stars" role="img" aria-label="4 out of 5 stars">`. |
| 4 | Heading levels skip. `contact.html` goes from `h1` to `h3` (`contact.html:112`), and footer columns jump to `h4` on all pages (`index.html:486`). Flagged by axe. | 1.3.1 Info and Relationships | 🟢 Minor | Make the contact cards `h2`. Make footer column titles `h2`, or plain text labelling each `nav`, and restyle them in CSS. |
| 5 | Structure is only visual: the numbered vetting steps aren't a list (`index.html:369`), and review quotes aren't marked as quotes (`index.html:337`). The footer's link groups aren't `nav` landmarks, and the header `nav` has no label (`index.html:37`, `:485`). | 1.3.1 Info and Relationships | 🟢 Minor | Use `ol` for the steps and `blockquote` or `figure` for reviews. Add `aria-label` to each `nav`. |
| 6 | Decorative SVGs and `→` arrows aren't hidden from assistive technology (AT). Only the toolbar icon has `aria-hidden` (`index.html:40`, `:70`, `:158`, `:176`). | 1.1.1 Non-text Content | 🟢 Minor | Add `aria-hidden="true"` to decorative SVGs and to `.arrow` spans. |
| 7 | At 137.5% toolbar text size, a 320px viewport scrolls sideways and the menu button sits off-screen. Page width was 385px on `index.html`, 367px on `contact.html`, and 351px on `signup.html` and `directory.html`. Cause: `zoom` on `body` (`css/styles.css:987`). | 1.4.10 Reflow | 🟡 Major | Scale `font-size` on `html` instead of using `zoom`, with sizes in `rem` (see #8). Then retest at 320px. |
| 8 | All font sizes are in `px`, so browser default-font-size settings have no effect (for example `css/styles.css:81`, `:95`, `:219`). Browser zoom still works, so this isn't a clear WCAG failure. | 1.4.4 Resize Text (best practice) | 🟢 Minor | Convert font sizes to `rem`. This also enables the fix for #7. |
| 9 | The toolbar's "Adjustable text spacing" is an on/off switch, and it misses some text. Headings and `.eyebrow` keep their own `letter-spacing`, and only `p` gets the larger line height (`css/styles.css:998`, `index.html:580`). | 1.4.12 Text Spacing (support) | 🟢 Minor | Rename it "Increase text spacing". Apply the values from 1.4.12 to all text, and check nothing clips. |
| 10 | "Made with Tally" fails contrast inside both embedded forms. This is third-party text. Flagged by axe. | 1.4.3 Contrast | 🟢 Minor | Remove the branding if the Tally plan allows it, or accept and document this. |

### Operable

| # | Issue | WCAG criterion | Severity | Recommendation |
|---|-------|----------------|----------|----------------|
| 11 | The focus ring is nearly or fully invisible on dark backgrounds. Maroon measures 1.39:1 on the footer and 1.61:1 on the high-contrast footer. On the filled Mobility card, it's the same color as the background, at 1.00:1. This affects every footer link, the Mobility "Browse" link (`index.html:254`), and the toolbar button when it sits over the footer. The optional "Stronger focus outline" setting doesn't fix the default (`css/styles.css:69`). | 2.4.7 Focus Visible, 1.4.11 Non-text Contrast | 🔴 Critical | Use a two-tone ring by adding `box-shadow: 0 0 0 3px var(--cream)` to the existing `:focus-visible` rule. Then check every background. |
| 12 | The toolbar panel doesn't fit short viewports. Its top is clipped and can't be scrolled into view, because the panel is `position: fixed` and its height isn't tied to the viewport. At 640×360 (1280×720 at 200% zoom), the panel starts at -129px and the text-size buttons at -77px. At 844×390 (phone landscape), the panel starts at -99px. At 320×568 with the largest text size, it's also clipped on the left, at -48px (`css/styles.css:875`). | 1.4.10 Reflow, 2.4.7 Focus Visible | 🔴 Critical | Set `max-height: calc(100dvh - 100px)` and keep `overflow-y: auto`. Retest at each text size. |
| 13 | The accessibility toolbar comes last in tab order: 26 Tab presses on `index.html` and 18–19 on other pages, not counting the fields inside the Tally forms (`index.html:523`). Keyboard users have to pass the whole page to reach the settings meant to help them. | 2.4.3 Focus Order (usability) | 🟡 Major | Move the widget's markup to just after the skip link, or add a second skip link to it. It can stay fixed in the same visual position. |
| 14 | Target sizes are small for people with limited dexterity: text-size buttons 30×30px, menu button 40×40px, checkboxes 13×13px with a 19px-tall label row, footer links 17px tall. "Larger click targets" doesn't enlarge inline links; the contact email link stays 197×20px (`css/styles.css:183`, `:910`, `:1015`). This isn't a 2.1 AA failure because 2.5.5 is AAA, but mobility access is a core promise of the site. | 2.5.5 Target Size (AAA) | 🟡 Major | Make 44×44px the default for controls and links. Add `display: inline-block` to links in the large-targets mode. |
| 15 | On mobile, in-page links land with the section's first line under the sticky header. At 375px, the heading is at 64px and the header ends at 73px, which clips it by 9px. Backward tabbing can also land focus under the header (`css/styles.css:28`, `:131`). | 2.4.3 Focus Order (usability) | 🟢 Minor | Add `scroll-padding-top: 100px` to `html`. |
| 16 | `Escape` doesn't close the mobile menu, although it does close the toolbar (`js/script.js:4`). | 2.1.1 Keyboard (usability) | 🟢 Minor | Close the menu on `Escape` and return focus to `#menuToggle`. |
| 17 | The nav Sign Up button disappears at exactly 768px, because both breakpoints match at that width (`css/styles.css:745`, `:751`). | 2.4.5 Multiple Ways (usability) | 🟢 Minor | Change the `show-on-mobile` rule to `min-width: 769px`. |
| 18 | On `contact.html` at 900px or less, the form appears first visually, but keyboard and screen reader order reach the email link first (`css/styles.css:809`). | 2.4.3 Focus Order, 1.3.2 Meaningful Sequence | 🟢 Minor | Choose one order and make the DOM match it. Then remove the `order: -1`. |

### Understandable

| # | Issue | WCAG criterion | Severity | Recommendation |
|---|-------|----------------|----------|----------------|
| 19 | Key links lead nowhere. "By joining you agree to our Terms & Privacy Policy" has no links (`index.html:458`, `signup.html:119`, `directory.html:114`), and footer links for Privacy Policy, Terms of Service, Accessibility Statement, Accessibility Standards, and others use `href="#"` (`index.html:488`–`509`). Visitors are asked to accept terms they can't read, and the site has no accessibility statement or barrier-reporting route. | 2.4.4 Link Purpose, 3.2.4 Consistent Identification (usability) | 🟡 Major | Publish and link these pages. Remove links for pages that don't exist yet. Prioritize the Privacy Policy, Terms, and Accessibility Statement. |
| 20 | Three links are all named "Browse →", so they can't be told apart in a screen reader's links list (`index.html:254`, `:277`, `:298`). | 2.4.4 Link Purpose | 🟡 Major | Keep the visible text and add hidden context, such as "Browse mobility products". Add a `.visually-hidden` class, because the stylesheet has none. |
| 21 | The current page isn't indicated. `contact.html:52` has `class="active"`, but there's no matching CSS and no `aria-current` on any page. | 2.4.8 Location (AAA) | 🟢 Minor | Add `aria-current="page"` and style that attribute. |
| 22 | Saved toolbar preferences apply only when `js/script.js` runs at the end of `body` (`index.html:616`). The page may briefly appear in default styling before high contrast, reduced motion, or other settings apply. Found by code review, not measured. | 2.3.1 Three Flashes (related, not a failure) | 🟢 Minor | Apply the saved classes with a small inline script in `head`. |

### Robust

| # | Issue | WCAG criterion | Severity | Recommendation |
|---|-------|----------------|----------|----------------|
| 23 | The panel declares `role="dialog"` but doesn't act like one. Opening it leaves focus on the toggle, and tabbing past the last control leaves it open over the page (measured). AT users are told to expect a dialog that never takes focus (`index.html:549`, `js/script.js:77`). | 4.1.2 Name, Role, Value, 2.4.3 Focus Order | 🟡 Major | Remove `role="dialog"` and treat it as a disclosure, since `aria-expanded` is already in place. Use `role="group"`, and close the panel when focus leaves it. |
| 24 | Text-size controls have no announced result and no signal at the limits (`js/script.js:107`). Their spoken names also don't include their visible labels: "A+" is named "Increase text size" (`index.html:556`–`576`), which can stop voice control commands from working. | 4.1.3 Status Messages, 2.5.3 Label in Name | 🟢 Minor | Add an `aria-live="polite"` status with the current size. Set `aria-disabled` at the limits, and start each name with its visible label. |
| 25 | With JavaScript off, the form iframe has no `src` and there's no fallback, so the waitlist and contact forms are blank (`signup.html:108`, `contact.html:159`, `directory.html:103`). | Robustness (best practice) | 🟢 Minor | Add a `<noscript>` link to the Tally form. On `contact.html`, also point to the email address. |
| 26 | `index.html:147` opens a `.wrap` that's never closed before `</section>` at line 224, and it nests a second `.wrap` at line 155. Browsers recover from this, but the Features section gets doubled padding. | 4.1.1 Parsing (removed in WCAG 2.2) | 🟢 Minor | Remove the duplicate wrapper and correct the nesting. |

## Color Contrast Check

Ratios were calculated from the values in `css/styles.css`.

| Element | Foreground | Background | Ratio | Required | Pass? |
|---------|------------|------------|-------|----------|-------|
| `.form-note` | `#8b837c` | `#fbf8f2` | 3.52:1 | 4.5:1 | ❌ |
| Body text on page | `#5b534d` | `#f4efe4` | 6.57:1 | 4.5:1 | ✅ |
| Body text on card | `#5b534d` | `#fbf8f2` | 7.10:1 | 4.5:1 | ✅ |
| Headings, links, primary button | `#5a1b1e` | `#f4efe4` | 11.37:1 | 4.5:1 | ✅ |
| Links on card | `#5a1b1e` | `#fbf8f2` | 12.30:1 | 4.5:1 | ✅ |
| Footer text | `#c6bdb3` | `#1b1512` | 9.75:1 | 4.5:1 | ✅ |
| Focus ring on page | `#5a1b1e` | `#f4efe4` | 11.37:1 | 3:1 | ✅ |
| Focus ring on footer | `#5a1b1e` | `#1b1512` | 1.39:1 | 3:1 | ❌ |
| Focus ring on high-contrast footer | `#5a1b1e` | `#000000` | 1.61:1 | 3:1 | ❌ |
| Focus ring on filled card | `#5a1b1e` | `#5a1b1e` | 1.00:1 | 3:1 | ❌ |

The semi-transparent text on the filled card (`rgba(244, 239, 228, 0.82)`) wasn't calculated separately. Text over the header's translucent background is close to the page color but wasn't measured.

## Keyboard Navigation

| Element | Tab order | Enter/Space | Escape | Arrow keys |
|---------|-----------|-------------|--------|------------|
| Skip link | First ✅ | Moves to `#main` | N/A | N/A |
| Mobile menu button | After Sign Up | Toggles menu ✅ | ❌ Doesn't close (#16) | N/A |
| Toolbar button | ❌ Last on page (#13) | Toggles panel ✅ | Closes and returns focus ✅ | N/A |
| Toolbar panel | Follows button ✅ | Controls work ✅ | Closes ✅ | N/A |
| Tabbing past panel | ❌ Panel stays open (#23) | N/A | N/A | N/A |
| Footer links | In order, ❌ focus not visible (#11) | Follow link, ❌ 6–7 go nowhere (#19) | N/A | N/A |

## Screen Reader

This table is based on the markup. It hasn't been confirmed with NVDA or VoiceOver.

| Element | Expected announcement | Issue |
|---------|-----------------------|-------|
| Hero, review, and banner graphics | "Person applying makeup… image" | ❌ Describes photos that aren't there (#2) |
| Review stars | Star symbols, or nothing | ❌ Score isn't conveyed (#3) |
| Needs card links | "Browse right arrow" three times | ❌ Destinations are indistinguishable (#6, #20) |
| Toolbar panel | Expanded state on the button only | ❌ Dialog role with no dialog behavior (#23) |
| Text-size buttons | "Increase text size, button" | ❌ No result announced (#24) |
| Toolbar checkboxes | Label and checked state | ✅ Native labels work |
| Tally form iframes | "Waitlist signup form" or "Contact form" | ✅ Titled, and axe found the fields labelled |

## Priority Fixes

1. **Make the focus ring visible everywhere (#11).** Affects keyboard users, who currently can't see their position across the footer. One CSS line.
2. **Keep the toolbar panel on screen (#12).** Affects low-vision users who zoom and people using phones in landscape. They can lose the text-size controls.
3. **Fix contrast and false alt text (#1, #2, #3).** Low-vision and blind visitors get wrong or missing information. Small edits.
4. **Publish or remove dead links, especially legal pages (#19).** Affects everyone asked to agree to terms, and the Accessibility Statement matters to this audience.
5. **Make the toolbar easy to reach and accurately exposed (#13, #23).** Improves access for keyboard and screen reader users.
6. **Replace `zoom` and `px` with `rem` (#7, #8).** Fixes the text-size overflow and honors browser font settings. This is the largest change here.
7. **Make links and targets clearer (#14, #20).** Helps people with limited dexterity and screen reader users.
8. **Clear the remaining minor issues.** Several are one-line fixes (#15, #16, #17).

## What Already Works

- `lang` and unique page titles on every page, and the directory title updates by category.
- A working skip link on every page.
- Zoom isn't blocked in the viewport meta tag.
- No page overflow at 320px at the default text size.
- `prefers-reduced-motion` is respected without using the toolbar.
- Toolbar checkboxes use native labels, and `Escape` returns focus to the toggle.
- Tally iframes have titles.

## How This Was Tested

- **Automated:** axe-core (WCAG 2.0, 2.1, and 2.2 A/AA plus best-practice rules) on all four pages in Edge. `directory.html` was scanned with `?category=mobility`.
- **Measured in the browser:** tab order, element sizes, page overflow, panel position, and anchor positions, using Playwright. Zoom was simulated with viewport sizes, not with actual browser zoom.
- **Code review:** all HTML, CSS, and JavaScript.
- **Tally forms:** each form was loaded once and scanned with axe in its initial state. Nothing was typed or submitted.

## Not Tested

- Real screen readers (NVDA, JAWS, VoiceOver, TalkBack).
- Testing with disabled users. This matters most for this product.
- Tally error messages, validation, and keyboard flow through to submission.
- Windows High Contrast (forced colors). `.a11y-toggle` and `.menu-toggle` use `border: none`, so check that their edges stay visible.
- Real devices, Safari, and Firefox.
