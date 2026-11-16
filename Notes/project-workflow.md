
# REST AND EAT — MASTER PROJECT WORKFLOW

## 1. Project control

Project: REST AND EAT Restaurant Website  
Repository: BlockJakub/rest-and-eat  
Branch: main  
Editor: SPCK Editor (Android)  
Stack: HTML5 / BEM CSS / Vanilla JavaScript  
Backend: None  
Last audit: 2026-11-16  

Last inspected code/documentation baseline commit:
6040a6b136469d32745fb45e522da29ddc4a9991

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
| Phase 2B — Menu Animations | IMPLEMENTED — MOBILE QA PASSED; DESKTOP QA DEFERRED |
| Phase 3 — Hero Parallax | NEXT — READY FOR IMPLEMENTATION |
| Phase 4 — Featured Dish Promotion | TODO |
| Phase 5 — Story, Conclusion, Footer | TODO |
| Phase 6 — Demo Accounts and Dashboard | TODO |
| Phase 7 — Final QA and Release | TODO |

**Current active phase:** PHASE 3 — HERO PARALLAX (NEXT)

**Next dependency:**
Four Phase 2B mobile functional groups passed on 2026-11-16.
Five advanced checks are explicitly DEFERRED TO DESKTOP QA, individually
documented below. They are NOT PASSED and block final release.
Proceed with Phase 3 implementation in SPCK, preserving existing features.

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

**Status: IMPLEMENTED — MOBILE QA PASSED; ADVANCED QA DEFERRED TO DESKTOP**

Implemented:

- [x] js/animations.js
- [x] main.js module import
- [x] IntersectionObserver reveal logic
- [x] Click/tap card highlight
- [x] ARIA pressed-state updates
- [x] CSS translate animations
- [x] Reduced-motion CSS styles
- [x] JSDoc documentation

Verification results — owner-reported SPCK Android on 2026-11-16:

- [x] Scroll reveal works correctly (mobile QA group 1: PASS)
- [x] Cards reveal once; no repeated reveal on scrolling (group 1: PASS)
- [x] Highlight button works (group 2: PASS)
- [x] Second click cancels selection (group 2: PASS)
- [x] Selecting another card clears previous state (group 2: PASS)
- [x] Portrait layout remains functional (group 3: PASS)
- [x] Landscape layout remains functional (group 3: PASS)
- [x] Navigation and hero remain functional (group 4: PASS)
- [ ] Keyboard activation and focus-visible indication work with Tab, Enter and Space
- [ ] Accessible button naming and pressed state are announced correctly in TalkBack or a screen reader
- [ ] Reduced-motion behaviour passes with the actual prefers-reduced-motion media query enabled
- [ ] Content remains visible with JavaScript disabled
- [ ] Browser console shows no unexpected errors (not covered by reported functional tests)

Mobile functional result: 4 of 4 tested groups PASS.
Advanced accessibility / fallback / console checks: NOT YET TESTED.
Scheduling status: DEFERRED TO DESKTOP QA (not marked PASS).
Source review confirms stable aria-label and aria-pressed logic, but is not a screen-reader test.

Git commit:
bdba58a — bento-grid animations

Phase 2B remains PARTIALLY VERIFIED, not VERIFIED. Deferred advanced checks are mandatory before production release; they do not constitute a test pass. The owner can continue Phase 3 development while these desktop checks remain open.

### PHASE 3 — Hero Parallax

**Status: NEXT — READY FOR IMPLEMENTATION**

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

The highlight button now keeps a stable accessible
label while aria-pressed communicates its state.
The code change exists on GitHub but keyboard and
screen-reader verification has not been reported.

Status: IMPLEMENTED — QA PENDING

Action:
Run keyboard and screen-reader checks before closing.

### ISSUE-005 — REPOSITORY VISIBILITY

GitHub repository is currently PUBLIC.

Status: REVIEW REQUIRED

Action:
Confirm whether public visibility is intended.

### ISSUE-006 — ANIMATION VERIFICATION

Owner-reported SPCK Android functional tests:
- Scroll reveal: PASS
- Click/tap highlight: PASS
- Responsive portrait/landscape: PASS
- Header/hero regression: PASS
- Notes: None

Advanced keyboard, screen reader, reduced-motion,
JavaScript-disabled and browser-console checks are still untested.

Status: PARTIALLY VERIFIED — FIVE CHECKS DEFERRED TO DESKTOP QA

Action:
Run all deferred checks on a suitable desktop/browser test setup before release.
Keep ISSUE-006 OPEN. Do not claim that a deferral equals verification.

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
README and Notes tracker were subsequently committed
and pushed by the project owner.
The current Notes/ folder is part of the repository.



### 2026-11-15 — Phase 2B QA Preparation

Previous GitHub HEAD:
4c9ab08818773bc0cd9e542648a75bd2fd1aa3b9

Documentation:
- README.md and project workflow were pushed.
- Correct repository tracker path: Notes/project-workflow.md
- README path correction required.

Code review:
- Reviewed animations.js, main.js and style.css.
- Identified accessible button naming inconsistency.
- Prepared stable button labels with aria-pressed.
- No changes required to navigation.js or index.html.

Files in current work batch:
- js/animations.js
- README.md
- Notes/project-workflow.md

Verification:
- Phase 2B visual QA: PENDING
- Keyboard accessibility: PENDING
- Screen reader: PENDING
- Reduced motion: PENDING
- JavaScript-disabled fallback: PENDING

Issue status:
- ISSUE-004: IMPLEMENTED — QA PENDING
- ISSUE-006: OPEN — awaiting test evidence

Next:
1. Run Phase 2B acceptance tests.
2. Fix any confirmed failures.
3. Record actual test results.
4. Commit and push the work batch.
5. Begin Phase 3 after verification.

### 2026-11-15 — Mobile Documentation Ownership

Verified remote baseline:
21bf160 — update Notes/ and animations.js

Documentation handoff:
- Owner asked the assistant to maintain README and project workflow directly on GitHub.
- Owner continues editing and testing code in SPCK Editor.
- Assistant records confirmed changes and test results after each pushed batch.
- README and Notes are not manually edited on the phone as part of normal development.
- Any assistant-side documentation commit requires a subsequent clean Pull in SPCK.
- No automatic background monitoring is configured.

Code findings:
- js/animations.js uses a stable button label and aria-pressed for selection state.
- This is IMPLEMENTED, but accessibility QA remains PENDING.
- Phase 2B remains IMPLEMENTED, not VERIFIED.

Next:
1. Pull the documentation commit into SPCK.
2. Perform Phase 2B acceptance testing.
3. Report results, then proceed to Phase 3 only after verification.

### 2026-11-16 — Phase 2B Mobile Functional QA

Evidence:
User submitted results from SPCK Preview on Android.
No screenshots or independent browser instrumentation were supplied for this batch.
Source reviewed: js/animations.js and css/style.css at GitHub main.
Baseline before documentation update: 6040a6b.

Owner-reported tests:
1. Scroll Reveal — PASS
   Expected: cards reveal on entry and do not replay after revisiting.
2. Click / Tap Highlight — PASS
   Expected: select, deselect, switch selected card.
3. Responsive Portrait / Landscape — PASS
   Expected: cards and controls remain usable with no layout overflow.
4. Regression Header / Hero — PASS
   Expected: hamburger and hero CTA still function.

User notes: None.

Assessment:
- Functional mobile QA groups passed: 4/4.
- No code changes required based on the reported tests.
- Phase 2B stays IMPLEMENTED with MOBILE QA PASSED / ADVANCED QA PENDING.
- ISSUE-006 remains open for unperformed advanced tests.
- ISSUE-004 remains IMPLEMENTED — QA PENDING until screen-reader/keyboard verification.

Outstanding test actions:
- Keyboard: Tab to each Highlight dish button; check visible focus, Enter and Space toggle, and only one selected card.
- Screen reader: Android TalkBack announces correct dish-specific button name, button role and pressed/not-pressed state.
- Reduced motion: emulate prefers-reduced-motion: reduce, reload; all cards remain visible without reveal or translate animations.
- No JavaScript: disable scripts in a browser test, reload; all menu images, text and prices remain visible without enhancement buttons.
- Console: check for JavaScript errors and failed assets, preferably with desktop developer tools.

Next dependency:
Report advanced test results or record individually justified deferrals
before advancing to Phase 3. Documentation-only commit follows this audit.
No README changes needed because architecture/features did not change.

### 2026-11-16 — Advanced QA Deferral and Phase 3 Handoff

Reason for scheduling:
- Owner is developing in SPCK Editor on Android and requested progress
  without awkward manual documentation editing on the phone.
- Four relevant mobile functional groups passed.
- The remaining tests are most reliably executed with a hardware keyboard,
  screen reader and desktop browser developer tools.

Formal per-test deferrals (NO TEST PASS CLAIMED):
1. Keyboard focus and activation — DEFERRED TO DESKTOP QA.
   Requires Tab, Enter, Space and focus-visible observation with a keyboard.
2. Screen-reader accessible name/state — DEFERRED TO ACCESSIBILITY QA.
   Requires TalkBack or equivalent screen reader; aria-pressed must be announced.
3. prefers-reduced-motion — DEFERRED TO DESKTOP QA.
   Requires verified media-query emulation or an actual compatible system preference.
4. JavaScript-disabled fallback — DEFERRED TO DESKTOP QA.
   Requires loading the page with scripts disabled and inspecting content visibility.
5. Browser console errors — DEFERRED TO DESKTOP QA.
   Requires appropriate developer tools to inspect JavaScript errors and failed requests.

No evidence of PASS or FAIL was supplied for these five tests.
This deferral does not close ISSUE-004 or ISSUE-006.
Final release remains BLOCKED until advanced tests run and results are recorded.

Phase 3 next implementation batch:
- Add performant scroll-linked movement to .hero__background.
- Use requestAnimationFrame with passive scroll/resize scheduling.
- Clamp movement and avoid background gaps.
- Preserve the existing hero text, menu animations and navigation.
- Respect reduced-motion settings.
- Have owner verify portrait, landscape, CTA and scroll smoothness in SPCK.

Documentation synchronization:
- Assistant updates tracker directly on GitHub.
- Owner Pulls the resulting commit with a clean working tree before coding.
- Owner implements and pushes code before assistant documents actual results.

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

### After implementation — mobile collaboration

1. Owner tests code in SPCK Preview and records results in chat.
2. Owner stages, commits and pushes code to origin/main.
3. Owner tells the assistant "Pushed" and supplies any test results or failures.
4. Assistant fetches actual remote code, HEAD and current documentation.
5. Assistant updates implementation status, test evidence, open issues, decisions and next dependency directly in this tracker.
6. Assistant updates README only when technical project information changes.
7. Assistant creates GitHub documentation commit(s) and verifies them.
8. Assistant tells owner which remote commits were created.
9. Owner Pulls into SPCK with a clean working tree BEFORE starting the next code batch.

Never mark code VERIFIED merely because it was pushed.
Do not Pull with uncommitted local changes; commit/push or resolve them first.
Never Force Push, reset, or delete local work to synchronize.
Documentation maintenance happens during active chat, not unattended in the background.

## 9. Next authorized development target

**NEXT: PHASE 3 HERO PARALLAX IMPLEMENTATION**

Dependency order:

1. Mobile functional QA for Phase 2B: PASS (4/4 groups).
2. Five advanced QA checks: DEFERRED TO DESKTOP, not passed; release blockers.
3. Owner Pulls the documentation-only deferral/handoff commit into clean SPCK.
4. Owner implements Phase 3 scroll-linked hero movement in SPCK.
5. Owner runs portrait/landscape, header/CTA and smoothness tests.
6. Owner commits and pushes code; assistant reviews and records actual results.
7. Complete Phase 2B deferred QA plus Phase 3 QA before production release.

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

## 11. Documentation ownership and synchronization

- README.md: technical overview, architecture, project constraints and setup.
- Notes/project-workflow.md: authoritative tasks, statuses, QA evidence, decisions, blockers and work-session log.
- SPCK owner: edits code, performs mobile tests, commits and pushes code.
- Assistant: reviews the pushed remote state and updates both documents directly on GitHub, preserving unfinished tasks and test truthfulness.
- If GitHub write access is unavailable, the assistant reports the failure instead of claiming an update happened.
- After a documentation-only remote commit, the owner must Pull before the next work batch. Never overwrite uncommitted local work.
- Automated background surveillance is not enabled; updates are performed during the active conversation.
