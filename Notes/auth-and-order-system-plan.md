# REST & EAT — Authentication & Ordering System Plan

**Document status:** PROPOSED — OWNER REVIEW REQUIRED. No backend or real authentication is implemented yet.
**Date:** 2026-11-16
**Scope:** A real, secure customer account system and simple restaurant food ordering, designed for reuse across future client projects.
**Related tracker:** `Notes/project-workflow.md`.
**Current repository baseline:** Static HTML/CSS/JavaScript frontend on `main`; no backend, real user accounts or database.

## 1. Critical distinction

Browser-only JavaScript cannot provide trustworthy authentication, secure sessions or enforce ownership of orders. The browser and its storage are controlled by the visitor. A login screen, localStorage flag or client-side redirect is not a security boundary.

Real functionality requires a trusted backend. The proposed solution still uses **JavaScript on both sides**:
- **Client:** semantic HTML, mobile-first BEM CSS (extractable SCSS later), vanilla JavaScript ES modules.
- **Server:** Node.js and a small HTTP API (Express is the proposed starting framework).
- **Database:** a dedicated MariaDB database for REST & EAT, isolated from other projects; all SQL queries parameterized.
- **Email:** a configured transactional mail service for verification, password reset and restaurant notifications.
- **Deployment:** HTTPS with a Node-compatible runtime, persistent database, managed secrets, backups and monitoring. Verify actual hosting capabilities before selecting services or implementing live credentials.

This is a **proposed** architecture, not a claim about existing hosting support. Another secure architecture could use a managed authentication/backend service; it would still NOT be client-side-only authentication.

## 2. Boundaries and non-goals

### Must support
- Customer registration, email verification, login, logout and forgotten/reset password.
- Change password, basic profile and account deletion/request workflow.
- Proper session lifecycle and access-controlled customer dashboard.
- Public menu, customer cart, submit order, order receipt/confirmation and **own** order history.
- A reliable way for the restaurant operator to receive orders and deal with failures (delivery channel to be selected).
- Accessible, responsive, reusable interface components and modular JavaScript.
- Security, auditability, error handling and tests before live use.

### Not included without a new owner decision
- Payments or storing payment card information.
- Delivery logistics or live table reservations.
- Staff scheduling, stock, inventory, financial reporting or a full management dashboard.
- A separate customer/employee role hierarchy beyond the minimum strictly needed to receive orders.
- Third-party social login, loyalty schemes and marketing subscriptions.
- Fake client-only authentication or real customer credential collection before the server is secure.

**Operational decision needed:** A real order must reach the restaurant. The smallest option is server-side notification plus a reliable review/confirmation procedure; a restricted operator order inbox is a possible later addition if necessary. Do not mark ordering production-ready until this receiving/fulfilment path is actually tested.

**Ordering policy needed:** Collection/pickup versus delivery, payment method (if any), availability, cancellation and order confirmation. Start with a collection-only, no-online-payment proposal unless the owner changes it; do not silently publish these as settled facts.

## 3. Reusable architecture rules

1. **Separate UI from business rules and persistence.** CSS, markup and front-end interaction modules must not contain secrets, SQL or authorization rules.
2. **Reusable components** (form fields, validation messages, buttons, modal/status feedback, navigation, loading state, product cards, cart rows) follow semantic HTML and BEM. Export reusable client JavaScript ES modules with documented, minimal APIs.
3. **Reusable authentication backend** should have routes/controllers, services (use-case logic), repositories (database access), validation and security middleware. Avoid mixing restaurant-specific menu/order logic with authentication logic.
4. **Project-specific integration** connects generic auth to REST & EAT Dashboard and orders.
5. **Single source of truth:** Backend checks identity, item availability, prices, quantities and order ownership. The client only displays estimated totals.
6. **No untested publishing of reusable packages.** Extract thoroughly tested generic components into a versioned separate template/package later; do not duplicate insecure starter code across clients.
7. Follow JSDoc on every JavaScript function; include purpose, parameters, returns and explanatory reasons for non-obvious design choices. Server-side JavaScript should use consistent modern module syntax, small single-purpose units and dependency injection where useful.
8. Do not rewrite existing working Hero, Bento, Parallax or Story merely to make an auth system. Use narrow integration points.

### Proposed directory map (future; not yet created)

```text
rest-and-eat/
  index.html
  login.html
  register.html
  forgot-password.html
  reset-password.html
  dashboard.html
  css/
    style.css                 # existing site styles
    auth.css                  # proposed reusable auth component styles
  js/
    main.js                   # existing website entry
    navigation.js             # existing
    animations.js             # existing
    core/
      api-client.js           # JSON requests and consistent errors
    components/
      form-feedback.js        # accessible reusable form feedback
      loading-button.js
    features/
      auth/
        auth-api.js
        auth-forms.js
        session-ui.js
      ordering/
        menu-api.js
        cart.js
        order-api.js
        order-ui.js
  server/
    package.json
    src/
      app.js
      routes/
        auth.routes.js
        profile.routes.js
        menu.routes.js
        order.routes.js
      controllers/
      services/
        auth.service.js
        order.service.js
      repositories/
        user.repository.js
        session.repository.js
        menu.repository.js
        order.repository.js
      middleware/
        require-auth.js
        csrf-protection.js
        rate-limit.js
        error-handler.js
      config/
    migrations/
    tests/
  Notes/
    project-workflow.md
    auth-and-order-system-plan.md
```

This is an intended target tree, not an instruction to generate every file up front. Add each file only when the related phase calls for it. Keep the current site working throughout.

## 4. Identity and authentication logic

### Registration
1. Client checks required fields for usability; the server independently validates input.
2. Server normalizes email and checks the account according to anti-enumeration policy.
3. Store only a salted **Argon2id password hash**, never plaintext/reversible passwords.
4. Create pending account and send a time-limited, single-use email verification link.
5. Only an appropriately verified account may complete normal sign-in.
6. Provide resend-verification with rate limiting and safe generic responses.

### Login
1. Client sends credentials to HTTPS API; server applies request limits and generic failure messages.
2. Server verifies email verification state and password hash.
3. On success, issue a fresh, unpredictable server-side session; regenerate/rotate identifiers at authentication and after sensitive events.
4. Cookie: `HttpOnly`, `Secure` (HTTPS), suitable `SameSite` and constrained `Path`; keep tokens outside localStorage.
5. Server session lifetime: inactivity and absolute expiry, revocation on logout/reset, and secure persistent store.
6. `GET /api/auth/me` returns a safe account summary. The Dashboard cannot rely on JavaScript redirect or hidden links as authorization.

### Logout
1. `POST /api/auth/logout` invalidates the server-side session.
2. Clear the browser cookie; redirect to a public view.
3. Test that previously protected API calls fail after logout, including via old tabs.

### Forgotten / reset password
1. `POST /api/auth/forgot-password` responds identically whether an email exists.
2. If valid, send an expiring one-time token; store a **hash of the random token** server-side.
3. `POST /api/auth/reset-password` verifies token, expiry and single-use status; sets new password hash.
4. Invalidate existing sessions and tokens after reset; notify the user about the credential change.
5. Rate-limit sending and redeeming tokens; never log tokens or embed tokens in analytics/referrer leaks.

### Account profile, security and privacy
- Change password with existing credential/re-authentication.
- Limited profile fields (for example display name and verified email), with ownership checks.
- Account deletion/export handling and explicit retention rules for legitimate order records.
- Error UI must avoid leaking whether an account exists; avoid exposing account data in page source.
- Multi-factor authentication may be added later; do not claim it exists now.

## 5. Food ordering logic (server is authoritative)

```text
Public menu (GET /api/menu)
  -> choose product and quantity (client cart)
  -> authenticated order submission (POST /api/orders)
  -> server validates session + ownership + quantities + availability
  -> server reloads current prices from its database
  -> server calculates totals and creates order + line-item snapshots
     inside a database transaction
  -> server responds with order ID and accepted/recorded status
  -> persistent server-side notification is delivered/retried to operator
  -> dashboard displays this customer's own order history
```

- Client cannot submit authoritative price, discount or user ID.
- Model order items with current price snapshot to preserve history if menu price changes.
- One order creation must not create duplicate orders when a request is retried: use idempotency keys and a uniqueness rule.
- Never claim an order was accepted by the kitchen until the actual operator-confirmation process exists.
- Avoid relying on a single best-effort email request after order commit; record notification work durably and retry safely.
- Use clear server-controlled order states; proposed minimum: `placed`, `confirmed`, `cancelled`, `completed`. The state transitions and who can change them require an operational decision.
- Check the authenticated user's ownership on **every** order read/write request.

## 6. Minimal database design (proposed)

- `users`: opaque ID, normalized unique email, password hash, verification state, timestamps, lifecycle flags.
- `email_verification_tokens`: hashed random verifier, expiry and used timestamp.
- `password_reset_tokens`: hashed random verifier, expiry and used timestamp.
- `sessions`: revocable session verifier/hash, user ID, created/last activity/expiry timestamps.
- `menu_items`: restaurant-owned ID, name, price in integer minor units, availability and active flag.
- `orders`: order ID, server-derived user ID, state, total in minor units, creation time and request idempotency key.
- `order_items`: order ID, product ID, frozen label, integer unit price and quantity.
- `notification_outbox`: unsent/retryable restaurant order notifications.
- Optional minimal `security_events`: security-related events without passwords or tokens.

Define foreign keys, unique constraints, migrations, indexes and transaction boundaries before implementation. Use a **separate** REST & EAT database and least-privileged application DB account. Do not modify Halamina schema, users or credentials.

## 7. Proposed HTTP API (all routes require appropriate server-side checks)

| HTTP | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | New pending customer |
| POST | `/api/auth/verify-email` | Redeem verification token |
| POST | `/api/auth/resend-verification` | Resend with throttling |
| POST | `/api/auth/login` | Authenticate and create session |
| POST | `/api/auth/logout` | Revoke session |
| GET | `/api/auth/me` | Obtain authenticated profile summary |
| POST | `/api/auth/forgot-password` | Request reset email |
| POST | `/api/auth/reset-password` | Redeem one-time reset token |
| POST | `/api/auth/change-password` | Authenticated sensitive change |
| GET | `/api/profile` | Read own profile |
| PATCH | `/api/profile` | Change permitted own fields |
| DELETE | `/api/profile` | Account deletion flow (policy required) |
| GET | `/api/menu` | Public menu and availability |
| POST | `/api/orders` | Authenticated order placement |
| GET | `/api/orders` | Own order list |
| GET | `/api/orders/:id` | Own order detail only |

API shapes/parameters are **proposals**. CSRF validation is required for cookie-authenticated state-changing operations (including registration/login where relevant). Implement origin restrictions, secure CORS rules if cross-origin, HTTP security headers, request-size bounds, typed input validation and parameterized SQL.

## 8. Minimal customer page map

- `index.html`: marketing site, public menu, links to login/account.
- `register.html`: real registration form only after backend is ready.
- `login.html`: login, forgotten password entry and register link.
- `forgot-password.html`: reset request.
- `reset-password.html`: token redemption page.
- `dashboard.html`: customer greeting, menu, cart, order placement, own order history, profile, change password and logout.

Reusable BEM form components include label/input/help/error, password visibility toggle, submit/loading state, alert/status and focus management. All form state transitions (idle -> validating -> submitting -> success/error) must be explicit to prevent double submissions and misleading messages.

## 9. Dependency-ordered delivery plan

**PHASE AUTH-00 — Requirements and hosting gate (BLOCKING).**
- Confirm real versus demo scope (owner requests REAL), pickup/delivery, payment method, menu data, order notification/fulfilment workflow.
- Confirm Node-compatible hosting, HTTPS, persistent isolated database, mail provider, secret storage and maintenance responsibilities.
- Approve chosen backend/database architecture and data retention policy.
- Write threat model, acceptance criteria and no-go conditions. No real credential capture until these gates are satisfied.

**PHASE AUTH-01 — Reusable UI contracts and accessible page skeletons.**
- Build semantic Login, Register, Forgot/Reset Password and Dashboard layouts using BEM components.
- Extract small reusable JS modules for navigation, forms, feedback and API client.
- Until backend exists, forms must not accept/retain/transmit real credentials or misrepresent a login as real.
- Mobile SPCK visual/functional QA; code commit, documentation update.

**PHASE AUTH-02 — Backend and persistence foundation.**
- Node server bootstrap, configuration validation, SQL migrations, schema constraints.
- Parameterized DB access, global errors, HTTPS deployment integration, application logging (no secrets).
- Server-side authorization, session storage, CSRF, rate limiting and automated tests.

**PHASE AUTH-03 — Registration and session lifecycle.**
- Register -> verify email -> login -> get current user -> logout.
- Validate ownership and forced logout, session expiry, fixation defense and anti-enumeration.
- Integration/security tests before marking DONE.

**PHASE AUTH-04 — Password recovery and account controls.**
- Forgot/reset token flow, resend email, change password, profile/deletion workflow.
- Verify single-use tokens, expiry, account enumeration protection and session revocation.

**PHASE AUTH-05 — Menu and transactional order workflow.**
- Public menu API; client cart; authenticated order request.
- Server-side price/availability computation, transaction, idempotency, own history.
- Durable operator notification and realistic accepted-versus-recorded communication.
- Integration and cross-account authorization tests.

**PHASE AUTH-06 — Dashboard, reusable extraction and release QA.**
- Connect protected Dashboard to real profile/orders APIs; empty/loading/error states.
- Test mobile/desktop, keyboard, screen readers, reduced-motion, auth failures, network failures, CSRF, XSS, SQL injection, order tampering, duplicate requests, and cross-account access.
- Check backups, logging, secrets, HTTPS, data retention, accessibility and deployment rollback.
- Extract stable generic modules/components into versioned reusable template/package for future projects.
- Production gate: no unchecked critical security tests or falsely represented authentication.

## 10. Required test matrix / definition of done

- A user can register, verify email and sign in with a real session.
- Wrong credentials receive safe generic errors and rate limiting; no user enumeration.
- Logout and reset immediately revoke applicable sessions.
- A user cannot access another user's profile, cart/order or API data.
- Disabling JavaScript or editing localStorage cannot grant authentication.
- Replayed password reset link and expired token are rejected.
- CSRF token/origin checks prevent unauthorized state-changing requests.
- SQL injection and XSS tests fail safely; no secrets exposed to client.
- Price change in browser does not change server-calculated total.
- Duplicate checkout requests do not create duplicate orders.
- Order reaches the actual intended restaurant operator and failure/retry path works.
- Browser and backend errors have helpful accessible feedback without information disclosure.
- All phase checklists recorded in project workflow. No claim of production-ready until full release QA.

## 11. Open owner decisions (must resolve before implementation)

1. **Backend target:** Node.js + Express + a new MariaDB database is recommended for reuse, but deployment support must be confirmed. Do not assume the current static site host supports Node.
2. **Order model:** collection-only with pay-on-collection is the proposed simplest starting point. Confirm whether delivery or online payments are required.
3. **Restaurant operations:** define who receives and confirms orders, what hours/orders are accepted, and how notifications are managed.
4. **Account identity:** verified email is proposed; confirm what other profile data is truly necessary.
5. **Repository/package strategy:** implement in this repository first, then extract audited generic auth/components into a reusable versioned template in the development ecosystem.
6. **Deployment/public site:** decide whether to keep the existing public static GitHub demo as a mock showcase while the real private/separately hosted backend is built.

## 12. Reference guidance

Review OWASP Authentication, Session Management, Forgot Password, Authorization and REST Security Cheat Sheets during implementation. This plan is a specification, not a substitute for threat modeling, professional security review and real integration tests.
