
# REST & EAT — Restaurant Website

Mobile-first, responsive restaurant frontend built with
semantic HTML5, BEM CSS and vanilla JavaScript.

## Project information

- Repository: BlockJakub/rest-and-eat
- Development editor: SPCK Editor (Android)
- Development branch: main
- Current implementation: Static frontend demonstration
- Current backend: None (no real login/order processing yet)
- Proposed target: Real secure JavaScript-based authentication and restaurant ordering
- Architecture proposal: Notes/auth-and-order-system-plan.md (owner/hosting approval pending)
- Status: Active development; backend architecture not finalized

Branding is **REST & EAT** for the logo, headlines and display identity,
and **Rest & Eat** for document titles, metadata and natural prose.
The GitHub repository name remains `rest-and-eat` for technical URLs.
The brand change is committed; the owner still needs to verify its mobile layout.

## Technology stack

- HTML5 — Semantic page structure
- CSS3 — Mobile-first responsive styling
- BEM — Block Element Modifier methodology
- CSS Grid — Responsive Bento Menu
- JavaScript — ES Modules, Event Listeners and DOM APIs
- IntersectionObserver — Scroll reveal animations
- Git and GitHub — Version control

No JavaScript or CSS framework is currently required.

## Current implemented features

- Semantic HTML foundation
- Responsive header and navigation
- Mobile hamburger navigation
- Full-screen hero with scroll-linked parallax background (mobile QA passed)
- Responsive Bento Grid Menu
- Three demonstration food cards
- Menu-card scroll reveal animation
- Menu-card highlight interaction
- Reduced-motion CSS support
- A shared requestAnimationFrame scheduler and passive scroll listener for independent Hero and Featured Dish parallax
- Featured Dish Promotion (Phase 4A) with responsive image, demonstration price and menu CTA
- Independent Featured Dish background parallax (Phase 4B; mobile functional QA passed)
- Updated REST & EAT branding in the home page title, meta description, navigation and menu eyebrow
- Restaurant Story / About section (Phase 5A) with working #about link and responsive image/text layout
- Phase 5B Closing, Contact and Footer sections with responsive styling and working #contact anchor
- Explicit demo-only disclosure: real contact and table reservations are not available

Phase 2B menu animations, Phase 3 Hero Parallax and Phase 4B Featured Dish
Parallax have passed owner-reported Android functional QA.
Phase 4A has also been reviewed in SPCK and is implemented on GitHub.
REST & EAT branding was visually confirmed by the owner after Pull.
Phase 5A Restaurant Story and Phase 5B Closing/Contact/Footer each passed five
owner-reported Android functional checks. The Contact navigation test was initially
PENDING and was subsequently reported PASS. Source changes are on GitHub main.
Image alt/dimensions, desktop accessibility, keyboard, reduced-motion, console,
cross-browser and measured performance verification remain open; see the workflow tracker.
The current login.html link still has no destination until Phase 6.

## Project structure

rest-and-eat/
|-- README.md
|-- index.html
|-- css/
|   `-- style.css
|-- js/
|   |-- main.js
|   |-- navigation.js
|   `-- animations.js
|-- img/
|   |-- jidlo1.jpg
|   |-- jidlo2.jpg
|   `-- jidlo3.jpg
`-- Notes/
    `-- project-workflow.md

The Notes directory is tracked in the repository. Documentation is maintained directly on GitHub by the project assistant after each completed code batch.

Planned real customer application pages:
- login.html
- register.html
- forgot-password.html
- reset-password.html
- dashboard.html

These pages do not exist yet. No real authentication, sessions or orders
are currently implemented. Future account pages require a trusted server,
not localStorage-based login simulation.

Architecture/requirements proposal: Notes/auth-and-order-system-plan.md.
The previous frontend-only demo login proposal has been superseded by the
owner's request for real, reusable auth and food ordering. Hosting, DB and
order-delivery decisions require AUTH-00 approval before implementation.

## Architecture

main.js:
- Application entry point
- Initializes independent JavaScript modules

navigation.js:
- Mobile navigation behaviour
- ARIA state synchronization

animations.js:
- Menu scroll reveal
- Menu-card selection
- DOM-based button creation
- Shared initPageParallax() with one passive scroll listener and requestAnimationFrame scheduling
- Independent Hero and Featured Dish motion parameters, clamp limits and reduced-motion handling

style.css:
- Base styles and design tokens
- Header, hero and parallax background coverage
- Bento Grid
- Featured-dish promotion layout, overlay and oversized parallax background coverage
- Restaurant Story mobile-first layout and desktop two-column grid
- Responsive Closing, Contact and semantic Footer components
- Animation states
- Responsive media queries

## Development

Open the project in SPCK Editor and use Preview.

Development follows a mobile-first approach.
All changes must be tested before being marked VERIFIED.

Git workflow (SPCK mobile + GitHub documentation):
1. Before coding, Pull when remote changes exist and the local working tree is clean.
2. Edit and save code in SPCK Editor.
3. Test in SPCK Preview and report actual results.
4. Stage, commit and Push code to origin/main.
5. Tell the assistant "Pushed" (include test results or problems).
6. The assistant reviews current remote code and commits, then edits README.md and Notes/project-workflow.md directly on GitHub, recording implementation, QA status and next steps.
7. After the assistant confirms the documentation commit, Pull in SPCK before making more changes.

Do not Pull into a dirty working tree without resolving local changes first. Never Force Push or discard local work to sync. The assistant's documentation updates occur during an active conversation, not as automatic background monitoring.

Never use Force Push as part of the normal workflow.

## Security limitations

This is currently a static frontend project.

Planned login, registration and dashboard features are
demonstrations only. They must not be presented as
secure authentication.

Do not store real passwords, sensitive personal data
or authentication tokens in browser storage.

Real authentication would require a properly secured
server-side system.

## Documentation

The authoritative project tracker is:

[Project Workflow](Notes/project-workflow.md)

It contains:
- Implementation roadmap
- Phase and task statuses
- QA results
- Known issues and blockers
- Technical decisions
- Work-session history
- Next development actions

Git commits provide the code history. The workflow
document explains the development state and decisions.

## Project rules

- Preserve existing working components.
- Use semantic and accessible HTML.
- Follow BEM class naming.
- Document JavaScript functions with JSDoc.
- Respect reduced-motion preferences.
- Optimize images and responsive layouts.
- Never mark untested work as VERIFIED.
- The assistant maintains workflow documentation on GitHub after each pushed work batch; the SPCK developer Pulls the documentation commit before the next coding batch.

## Ownership

Development project maintained by BlockJakub.
Current repository visibility: Public.

Last documentation review: 2026-11-16.
