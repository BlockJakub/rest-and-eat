
# REST AND EAT — Restaurant Website

Mobile-first, responsive restaurant frontend built with
semantic HTML5, BEM CSS and vanilla JavaScript.

## Project information

- Repository: BlockJakub/rest-and-eat
- Development editor: SPCK Editor (Android)
- Development branch: main
- Project type: Static frontend demonstration
- Backend: None
- Status: Active development

The repository is named REST AND EAT. The current website
still displays the temporary SAVOUR brand. Final branding
has not yet been approved.

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
- Full-screen hero with a static background
- Responsive Bento Grid Menu
- Three demonstration food cards
- Menu-card scroll reveal animation
- Menu-card highlight interaction
- Reduced-motion CSS support

The animation features are implemented but still require
the documented Phase 2B quality assurance checks.

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

The Notes directory is the proposed documentation addition.

Planned application pages:
- login.html
- register.html
- dashboard.html

These pages do not exist yet.

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

style.css:
- Base styles and design tokens
- Header and hero
- Bento Grid
- Animation states
- Responsive media queries

## Development

Open the project in SPCK Editor and use Preview.

Development follows a mobile-first approach.
All changes must be tested before being marked VERIFIED.

Git workflow:
1. Pull before editing when remote changes exist.
2. Edit and save the required files.
3. Test in SPCK Preview.
4. Update Notes/project-workflow.md.
5. Stage and commit the complete change.
6. Push to origin/main.
7. Verify that GitHub contains the commit.

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
- Update workflow documentation with every work batch.

## Ownership

Development project maintained by BlockJakub.
Current repository visibility: Public.

Last documentation review: 2026-11-15.
