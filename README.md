# SAVOUR Restaurant — Project Master Plan

**Project:** SAVOUR Restaurant  
**Type:** Mobile-first, responsive restaurant website + frontend-only account demonstration  
**Editor:** SPCK Editor (Android)  
**Stack:** Semantic HTML5, CSS3 (BEM), vanilla JavaScript (ES modules)  
**Backend:** None in this version  
**Last reviewed:** 2026-11-15

> **Source of truth:** Update this file after every completed work session. Never mark an item DONE without testing it in SPCK Preview. Preserve working code and avoid rebuilding finished components.

## 1. Project goals

Build a polished, fast, accessible, mobile-first restaurant website featuring:

- [ ] Full-bleed hero with **real, performant parallax motion** (current hero is static).
- [ ] Responsive bento-grid food menu with photos, names, prices, and category information.
- [ ] Scroll-reveal animations (AOS-style), plus **click/tap-triggered `translate` interactions** on menu cards. These are separate interactions.
- [ ] Full-width featured-dish promotional parallax section with dish name, price, and call to action.
- [ ] About/story section, conclusion/reservation call to action, and footer.
- [ ] Header, responsive navigation, keyboard accessibility, and visible focus styles.
- [ ] Frontend-only login and register **demonstration** and a customer dashboard.
- [ ] Responsive layouts for narrow mobile, tablet, and desktop screens.
- [ ] Basic search-engine optimization, performance checks, and accessibility checks.

## 2. Current verified baseline

**Phase 1 — DONE (user confirmed in SPCK Preview):**

- [x] `index.html` semantic starting structure, metadata, skip link, header, nav, hero, menu placeholder.
- [x] `css/style.css` mobile-first foundation, dark/gold design tokens, responsive navigation.
- [x] `js/main.js` imports navigation module.
- [x] `js/navigation.js` toggles the menu, updates `aria-expanded` and label, closes on link selection.
- [x] Full-screen hero background displays.
- [x] Mobile hamburger works.
- [x] Hero CTA scrolls to `#menu`.

**Important:** The hero currently uses a static CSS background. A working static hero is **not** completion of parallax. The menu is currently a placeholder, not a bento grid.

## 3. File structure

```text
savour-restaurant/
├── README.md
├── index.html
├── login.html                 # Planned
├── register.html              # Planned
├── dashboard.html             # Planned
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── animations.js          # Planned
│   └── auth-demo.js           # Planned
└── assets/
    └── images/
        └── hero.jpg
```

Create additional files only when needed and record them here. For now, use regular CSS rather than requiring an SCSS compiler on the phone. If a desktop Sass build is introduced later, document the source/build distinction and never edit generated CSS as the authoritative source.

## 4. Visual design and layout

- Brand: **SAVOUR** (working fictional restaurant brand).
- Design: dark, premium, editorial food photography, restrained gold accent.
- Current CSS tokens: `--color-bg: #11100e`, `--color-text: #f8f4eb`, `--color-accent: #d9a85f`.
- Mobile-first default styles; add `min-width` media queries only where the layout needs them.
- Use fluid spacing and typography (`clamp()`), no horizontal overflow.
- Images: properly licensed or original assets, optimized sizes; use `<picture>`/`srcset` for content imagery where appropriate, descriptive `alt`, explicit dimensions/aspect ratios, and lazy loading below the fold. Hero can use a CSS background because it is decorative, but it must be optimized and preloaded only if justified by measurement.
- Parallax must not compromise text readability, touch behavior, reduced-motion preferences, or scrolling performance.

## 5. Implementation roadmap

### Phase 1 — Foundation: DONE

See verified baseline above. Do not recreate these files from scratch.

### Phase 2 — Bento menu: NEXT / TODO

- [ ] Replace menu placeholder with semantic section heading and introductory text.
- [ ] Create reusable `.menu-card` BEM components with food image, dish title, description, price, and optional badge.
- [ ] Build an asymmetric mobile-friendly CSS Grid; use spans only at suitable wider breakpoints.
- [ ] Ensure menu cards are accessible on touch and keyboard; only interactive cards receive button/link semantics.
- [ ] Add category controls if useful; filters must work without hiding content from assistive technology incorrectly.
- [ ] Add click/tap translation animation via CSS classes and JavaScript events; avoid using hover as the only trigger.
- [ ] Add scroll-reveal effects using `IntersectionObserver` (AOS-style) or a documented AOS library; do not combine duplicate reveal systems.
- [ ] Respect `prefers-reduced-motion`; content must remain visible if JavaScript fails.
- [ ] Test on mobile and desktop.

### Phase 3 — Hero parallax: TODO

- [ ] Implement actual scroll-linked visual motion for `.hero__background`, not just a fixed background image.
- [ ] Use `requestAnimationFrame` and passive scroll observation, or another measured performant method; avoid layout-thrashing and unnecessary work offscreen.
- [ ] Clamp movement and prevent background gaps.
- [ ] Disable/reduce motion when `prefers-reduced-motion: reduce` is active.
- [ ] Check mobile browser support, text contrast, scroll smoothness, and visual stability.

### Phase 4 — Featured-dish promotion: TODO

- [ ] Add full-bleed promotional section featuring food photograph, name, price, and CTA.
- [ ] Implement independent parallax/reveal behavior where appropriate.
- [ ] Ensure the CTA leads to a real on-page destination; no fake checkout/ordering promise.
- [ ] Test overlay contrast and responsive cropping.

### Phase 5 — Story, conclusion, footer: TODO

- [ ] Add `#about` story section with meaningful content.
- [ ] Add conclusion/reservation CTA with honest demo behavior.
- [ ] Add `#contact` section or destination so existing navigation links resolve.
- [ ] Add footer with brand, contact details (clearly fictional until real), opening hours (clearly fictional), social links only if real, and copyright.
- [ ] Review heading hierarchy, landmarks, and keyboard navigation.

### Phase 6 — Frontend-only accounts: TODO

- [ ] Create `login.html`, `register.html`, and `dashboard.html` with consistent header/footer and BEM styles.
- [ ] Create accessible forms with associated labels, autocomplete, validation messages, and clear feedback.
- [ ] Build a **demo-only** login/register experience; no real authentication or account security claims.
- [ ] **Never store passwords, password hashes, security tokens, or sensitive personal data in `localStorage` or `sessionStorage`.** Do not collect real credentials for this demo.
- [ ] Prefer predefined demo personas or non-sensitive display-name-only session state for demonstrating the flow.
- [ ] Dashboard shows a demo welcome state and sample favourites/activity; avoid presenting sample data as live.
- [ ] Logout clears the demo session state.
- [ ] Explain in UI that access control is cosmetic: client-side redirects cannot protect private information.
- [ ] If genuine accounts are needed later, design a server-side authentication system separately (backend, database, hashed passwords, secure sessions, CSRF protections, rate limits).

### Phase 7 — Quality assurance and release: TODO

- [ ] Verify at ~320px, 375px, 390px, 768px, 1024px, and desktop widths.
- [ ] Verify portrait/landscape, touch controls, menu open/close, links, and forms.
- [ ] Test with keyboard, visible focus, reduced motion, zoom, and screen reader where available.
- [ ] Confirm headings, descriptive links, image alternatives, labels, and contrast.
- [ ] Check no console errors, broken asset paths, missing images, or dead anchor targets.
- [ ] Check image sizes, layout shift, loading behavior, and scrolling performance.
- [ ] Check title, meta description, canonical URL when deployed, and basic structured data only when real facts are available.
- [ ] Confirm all authentication UI is visibly labelled a demo.
- [ ] Prepare Git commit/release notes only after final checks.

## 6. Architecture and coding rules

1. **Semantic HTML:** one `<main>` per page, appropriate `<header>`, `<nav>`, `<section>`, `<footer>`, logical headings, real buttons for actions and anchors for navigation.
2. **BEM:** use `.block`, `.block__element`, `.block--modifier` consistently. JavaScript state classes may be documented separately; avoid coupling business logic to decorative classes where possible.
3. **JavaScript modules:** keep `main.js` as initializer; `navigation.js` for nav; `animations.js` for parallax/reveals/card interactions; `auth-demo.js` for demo session/forms.
4. **Documentation:** JSDoc for every JavaScript function (purpose, `@param`, `@returns`); comment *why* for non-obvious decisions. Add professional HTML section comments.
5. **Progressive enhancement:** essential content must be readable without JavaScript; animation must never gate visibility permanently.
6. **Security:** frontend-only authentication is a simulation, never a security boundary. Never use `innerHTML` with untrusted input; prefer `textContent` and safe DOM APIs.
7. **Performance:** optimize imagery; avoid heavy animation libraries unless justified; prefer compositor-friendly `transform`/`opacity`; measure before optimizing.
8. **No silent scope changes:** add changes to this document before implementing them.

## 7. Work-session procedure

At the beginning of every session:

1. Read `README.md` and identify the first unfinished phase.
2. Review existing working files before suggesting edits.
3. State exactly which files and components will change.
4. Implement one testable increment at a time.
5. Test in SPCK Preview, including the narrow mobile viewport.
6. Mark items DONE only after the user confirms they work.
7. Update the current status and session log below; do not claim untested work is verified.

### Status snapshot

| Phase | Status | Notes |
|---|---|---|
| 1. Foundation | DONE | User verified navigation, hero, and CTA |
| 2. Bento menu | NEXT | Menu section is a placeholder |
| 3. Hero parallax | TODO | Hero currently static |
| 4. Featured-dish promotion | TODO | Not implemented |
| 5. Story, conclusion, footer | TODO | Not implemented |
| 6. Demo accounts/dashboard | TODO | Not implemented |
| 7. QA and release | TODO | Not implemented |

### Session log

**2026-11-15 — Baseline and plan**

- User confirmed initial website renders and existing navigation works in SPCK Editor.
- Created project master plan to track the remaining scope and prevent duplicate work.
- Next action: Phase 2, implement the first bento menu cards and responsive grid, then test before adding motion.

## 8. Definition of done

A phase is DONE only when its listed features exist in the project, work in SPCK Preview, meet relevant accessibility and responsive requirements, and the user confirms the result. Planning, drafting, or generating code alone does not make a phase DONE.
