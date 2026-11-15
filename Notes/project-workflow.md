
# REST AND EAT — MASTER PROJECT WORKFLOW

## 1. Project control

Project: REST AND EAT Restaurant Website  
Repository: BlockJakub/rest-and-eat  
Branch: main  
Editor: SPCK Editor (Android)  
Stack: HTML5 / BEM CSS / Vanilla JavaScript  
Backend: None  
Last audit: 2026-11-15  

Last inspected Git commit:
bdba58a1b4da767edb6cfca5b9c49baba3361ea7

This document is the authoritative source for
development progress, testing and next actions.

Never mark a task VERIFIED without test evidence.

## 2. Status definitions

**TODO:**  
Work has not started.

**IN PROGRESS:**  
Implementation or testing is underway.

**IMPLEMENTED:**  
Code exists, but verification is incomplete.

**VERIFIED:**  
Implementation passed its defined tests.

**BLOCKED:**  
Work cannot continue until a dependency is resolved.

## 3. Current project status

| Phase | Status |
|---|---|
| Phase 1 — Foundation | VERIFIED |
| Phase 2A — Responsive Bento Grid | VERIFIED |
| Phase 2B — Menu Animations | IMPLEMENTED |
| Phase 3 — Hero Parallax | TODO |
| Phase 4 — Featured Dish Promotion | TODO |
| Phase 5 — Story, Conclusion, Footer | TODO |
| Phase 6 — Demo Accounts and Dashboard | TODO |
| Phase 7 — Final QA and Release | TODO |

**Current active phase:** PHASE 2B

**Next dependency:**
Complete Phase 2B verification and resolve any
confirmed issues before starting Phase 3.

## 4. Implementation roadmap

### PHASE 1 — Foundation

**Status: VERIFIED**

Completed:

- [x] Semantic HTML structure
- [x] Site header and logo
- [x] Responsive navigation
- [x] Mobile hamburger
- [x] Full-screen hero
- [x] Hero heading and CTA
- [x] Base CSS design tokens
- [x] ES Module entry point

Evidence:
User confirmed working SPCK Preview.

Git commit:
58e09be — first-commit

### PHASE 2A — Responsive Bento Grid

**Status: VERIFIED (visual responsive checks)**

Completed:

- [x] Semantic menu section
- [x] Section heading and description
- [x] Three menu cards
- [x] Food images, titles and prices
- [x] Reusable BEM card components
- [x] Mobile-first CSS Grid
- [x] Responsive column layout
- [x] Portrait visual verification
- [x] Landscape visual verification

Remaining polish:

- [ ] Improve image alt descriptions
- [ ] Confirm intrinsic image dimensions
- [ ] Replace placeholder dish names/prices
- [ ] Review food photograph variety
- [ ] Add more menu items if required
- [ ] Consider category filters

Git commit:
625c624 — feat: add responsive bento menu layout

### PHASE 2B — Menu Animations

**Status: IMPLEMENTED — QA PENDING**

Implemented:

- [x] js/animations.js
- [x] main.js module import
- [x] IntersectionObserver reveal logic
- [x] Click/tap card highlight
- [x] ARIA pressed-state updates
- [x] CSS translate animations
- [x] Reduced-motion CSS styles
- [x] JSDoc documentation

Verification still required:

- [ ] Scroll reveal works correctly
- [ ] Cards reveal once
- [ ] Highlight button works
- [ ] Second click cancels selection
- [ ] Selecting another card clears previous state
- [ ] Portrait layout remains functional
- [ ] Landscape layout remains functional
- [ ] Navigation and hero remain functional
- [ ] Keyboard activation works
- [ ] Accessible button naming is correct
- [ ] Reduced-motion behaviour passes
- [ ] Content remains visible without JavaScript
- [ ] No unexpected browser errors

Git commit:
bdba58a — bento-grid animations

Do not mark this phase VERIFIED yet.

### PHASE 3 — Hero Parallax

**Status: TODO**

Tasks:

- [ ] Implement actual scroll-linked hero movement
- [ ] Use requestAnimationFrame where appropriate
- [ ] Minimize scroll performance overhead
- [ ] Clamp background movement
- [ ] Prevent image gaps during translation
- [ ] Respect prefers-reduced-motion
- [ ] Test portrait and landscape
- [ ] Test performance and text contrast

### PHASE 4 — Featured Dish Promotion

**Status: TODO**

Tasks:

- [ ] Add full-bleed promotional section
- [ ] Add featured food photograph
- [ ] Add dish title, description and price
- [ ] Add meaningful CTA destination
- [ ] Add independently controlled parallax
- [ ] Test responsive cropping and contrast

### PHASE 5 — Story, Conclusion and Footer

**Status: TODO**

Tasks:

- [ ] Create About / Restaurant Story
- [ ] Create conclusion section
- [ ] Create reservation CTA demonstration
- [ ] Implement #about destination
- [ ] Implement #contact destination
- [ ] Create semantic footer
- [ ] Add appropriate contact information
- [ ] Add opening hours where appropriate
- [ ] Review links and heading hierarchy

### PHASE 6 — Frontend Account Demonstration

**Status: TODO**

Tasks:

- [ ] Create login.html
- [ ] Create register.html
- [ ] Create dashboard.html
- [ ] Create auth-demo.js
- [ ] Add accessible form validation
- [ ] Add demonstration session state
- [ ] Add dashboard welcome state
- [ ] Add sample favourites/activity
- [ ] Add demo logout
- [ ] Label the system as frontend-only

Security requirements:

- Never claim this is secure authentication.
- Never store real passwords in browser storage.
- Never collect real account credentials.
- Do not present frontend redirects as access control.
- Any real authentication requires a separate backend.

### PHASE 7 — Final QA and Release

**Status: TODO**

Tasks:

- [ ] Test 320px, 375px and 390px
- [ ] Test 768px and 1024px
- [ ] Test desktop layouts
- [ ] Test portrait and landscape
- [ ] Test keyboard accessibility
- [ ] Test screen-reader behaviour
- [ ] Test focus visibility
- [ ] Test reduced-motion preferences
- [ ] Check image loading and dimensions
- [ ] Check layout shifts
- [ ] Check scroll performance
- [ ] Check semantic HTML
- [ ] Check navigation targets
- [ ] Check SEO metadata
- [ ] Check production asset paths
- [ ] Verify demo authentication warnings
- [ ] Complete final code review

## 5. Known issues and risks

### ISSUE-001 — OUTDATED BRANDING

Repository: REST AND EAT  
Current website brand: SAVOUR  
Status: OPEN  

Action:
Confirm final brand before changing UI.

### ISSUE-002 — INCOMPLETE NAVIGATION DESTINATIONS

The #about, #contact and login.html targets
are not yet implemented.

Status: OPEN

Planned resolution:
Phases 5 and 6.

### ISSUE-003 — DEMONSTRATION MENU CONTENT

Images, names, prices and descriptions are
not yet finalized as real restaurant content.

Status: OPEN

Planned resolution:
Content polish.

### ISSUE-004 — CARD BUTTON ACCESSIBLE NAME

The highlight button changes visible text and
aria-pressed, but its aria-label does not change.

Status: OPEN

Action:
Correct and verify accessible naming.

### ISSUE-005 — REPOSITORY VISIBILITY

GitHub repository is currently PUBLIC.

Status: REVIEW REQUIRED

Action:
Confirm whether public visibility is intended.

### ISSUE-006 — ANIMATION VERIFICATION

Phase 2B code is pushed, but complete QA evidence
has not been supplied.

Status: OPEN

Action:
Run Phase 2B acceptance tests.

## 6. Architecture decisions

### DECISION-001

Use mobile-first CSS with min-width breakpoints.

### DECISION-002

Follow BEM naming for visual components.

### DECISION-003

Use native JavaScript ES Modules.

### DECISION-004

Use IntersectionObserver for menu scroll reveals.
No external AOS library is required at this stage.

### DECISION-005

Use transform-based visual animations.

### DECISION-006

Respect prefers-reduced-motion.

### DECISION-007

Use static frontend demo accounts only.
Real authentication is outside the current scope.

### DECISION-008

Use normal CSS in SPCK Editor.
SCSS compilation is not currently required.

## 7. Work session history

### 2026-11-15 — Foundation

Implemented:

- Initial HTML structure
- Header and responsive navigation
- Full-screen static hero
- Basic project styles
- Navigation JavaScript module

Testing:
User confirmed the initial page works in SPCK.

Commit:
58e09be — first-commit

Result: VERIFIED

### 2026-11-15 — Bento Grid

Implemented:

- Restaurant menu section
- Responsive CSS Grid
- Three food cards
- Titles and demonstration prices
- Portrait/landscape responsive layout

Testing:
User supplied portrait and landscape screenshots.
Visual layout checks passed.

Commit:
625c624 — feat: add responsive bento menu layout

Result: VERIFIED for tested layouts.

### 2026-11-15 — Bento Animations

Implemented:

- Menu animation module
- IntersectionObserver scroll reveal
- Card highlight selection
- CSS animation modifiers
- Reduced-motion styles

Files changed:

- README.md
- css/style.css
- js/animations.js
- js/main.js

Commit:
bdba58a — bento-grid animations

Testing:
Complete Phase 2B QA not yet confirmed.

Result: IMPLEMENTED — VERIFICATION PENDING

### 2026-11-15 — Documentation Audit

Actions:

- Reviewed current GitHub repository
- Compared README with actual implementation
- Identified outdated project structure
- Separated technical README from workflow tracking
- Documented open issues and remaining phases

Status:
Documentation update prepared.
Git commit and SPCK synchronization pending.

## 8. Required development workflow

### Before each work session

1. Read README.md.
2. Read this workflow tracker.
3. Inspect current GitHub files and branch.
4. Review open issues and current phase.
5. Identify exact files requiring modification.
6. Avoid rewriting verified components.

### During implementation

1. Work on one defined task or batch.
2. Preserve existing functionality.
3. Follow semantic HTML, BEM and JSDoc rules.
4. Test after changes.
5. Record failures or unresolved issues.

### After implementation

1. Record changed files.
2. Record what was implemented.
3. Record actual test results.
4. Update the task status honestly.
5. Record remaining dependencies.
6. Stage and commit code with the workflow update.
7. Push to GitHub.
8. Verify the remote commit exists.

Never mark code VERIFIED merely because it was pushed.

## 9. Next authorized development target

**NEXT: PHASE 2B VERIFICATION**

Dependency order:

1. Test existing animations in SPCK.
2. Fix confirmed interaction/accessibility issues.
3. Update QA results in this document.
4. Commit and push verified changes.
5. Begin Phase 3 — Hero Parallax.

Do not silently skip unfinished acceptance tests.

## 10. Definition of done

A development phase can be marked VERIFIED only when:

- Required functionality is implemented.
- Relevant responsive checks pass.
- Accessibility requirements are checked.
- Existing features still work.
- Results are recorded in this tracker.
- The user has confirmed applicable SPCK tests.

Git history and workflow documentation must agree.
