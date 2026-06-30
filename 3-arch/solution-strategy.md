# Solution Strategy

## Context

Russian-language **marketing website** for Юлия Медведева — medical-business consulting in ВРТ/ЭКО and turnkey private clinics (РФ, KZ, UZ). Visitors discover expertise (About, Services, Home) and submit inbound consulting inquiries (Contact form, email, phone). Sales continue offline after contact.

**Forces:** premium trust positioning (GOL-02); reliable lead capture (GOL-01); small scope (five static content routes + one form API); no CMS, auth, CRM, or English locale at launch; owner-operated with minimal ops overhead.

**Boundary:** in-scope system = public site (BB-01) + contact inquiry handler (BB-02). Out: CRM, blog, booking, payments, post-contact pipeline.

## Architecture Decision Records

| ID | Title | Decision | Status | Affects |
|----|-------|----------|--------|---------|
| ADR-01 | Full-stack Next.js | Next.js App Router — SSG/static pages for marketing routes + Route Handler for contact API | Accepted | BB-01, BB-02, F01, F02, F03, F04, F05 |
| ADR-02 | Vercel hosting | Deploy on Vercel — CDN for static assets, serverless runtime for API routes | Accepted | BB-01, BB-02, F01, F02, F03, F04, F05 |
| ADR-03 | Resend email delivery | Owner notification via Resend transactional API on successful form submit (EVT-01) | Accepted | BB-02, F05 |
| ADR-04 | Honeypot and rate limiting | Hidden honeypot field + server-side IP rate limiting; no third-party CAPTCHA at launch | Accepted | BB-02, F05 |
| ADR-05 | Tailwind CSS styling | Utility-first Tailwind for responsive premium marketing UI | Accepted | BB-01, F01, F02, F03, F04, F05 |
| ADR-06 | Russian-only static content | Copy and UI in Russian only; static content modules at build time — no i18n framework | Accepted | BB-01, F01, F02, F03, F04, F05 |

### ADR-01: Full-stack Next.js

**Context:** Five mostly-static pages share one shell (F01); one server endpoint must accept contact inquiries and notify the owner (F05, EVT-01). Need a mainstream stack with good DX and clear separation of layout vs page content.

**Decision:** Next.js (App Router) with React and TypeScript — `layout.tsx` for BB-01 shell, file-based routes for F02–F05 pages, `app/api/contact/route.ts` for BB-02.

**Rationale:** Single repo; SSG/ISR for marketing pages; native API routes; aligns with Vercel; team familiarity.

**Consequences:** Node serverless runtime required for contact API (not pure static export). Build step needed for content changes.

**Related:** [NFR-01](#nfr-01-performance), [NFR-07](#nfr-07-availability), [F01](../2-features/F01-site-shell-and-navigation.md), [F05](../2-features/F05-contact-inquiry-capture.md)

### ADR-02: Vercel hosting

**Context:** Marketing site needs global CDN, HTTPS, and zero-maintenance deploys; contact API must run serverlessly alongside the frontend.

**Decision:** Host on Vercel with automatic previews and production deploy from main branch.

**Rationale:** First-class Next.js support; serverless functions for Route Handlers; free tier sufficient for launch traffic.

**Consequences:** Vendor coupling; environment variables (Resend API key, owner inbox) managed in Vercel project settings.

**Related:** [NFR-07](#nfr-07-availability), [ADR-01](#adr-01-full-stack-nextjs), [ADR-03](#adr-03-resend-email-delivery)

### ADR-03: Resend email delivery

**Context:** FR-F05-06 requires owner email notification on successful submit; CRM integration is out of scope ([business-scenarios.md](../1-scope/business-scenarios.md) boundary).

**Decision:** Send notification emails via Resend API from the contact Route Handler to `medvedeva19889@gmail.com` (`OWNER_NOTIFICATION_EMAIL` env var). Owner email is **not** displayed on the public site.

**Rationale:** Simple SDK; reliable deliverability; works in Vercel serverless; no SMTP credential management on VPS; keeps owner inbox private while form remains the sole contact channel.

**Consequences:** Resend account and verified sender domain required; API key as secret; delivery SLA depends on Resend.

**Related:** [NFR-05](#nfr-05-contact-delivery), [NFR-08](#nfr-08-privacy), [F05](../2-features/F05-contact-inquiry-capture.md), [EVT-01](../1-scope/business-scenarios.md#business-events)

### ADR-04: Honeypot and rate limiting

**Context:** Public contact form is spam-prone; F05 defers bot mitigation to solution strategy; privacy-friendly MVP preferred over CAPTCHA widgets.

**Decision:** Hidden honeypot field (reject if filled) + per-IP rate limit on `POST /api/contact` (e.g. max 5 requests / 15 min).

**Rationale:** No user friction; no third-party CAPTCHA script; sufficient for low-traffic consulting site at launch.

**Consequences:** Sophisticated bots may bypass; monitor inquiry quality and escalate to Cloudflare Turnstile if needed.

**Related:** [NFR-04](#nfr-04-security), [F05](../2-features/F05-contact-inquiry-capture.md)

### ADR-05: Tailwind CSS styling

**Context:** Premium responsive marketing UI across shell and four content pages; mobile nav and segment blocks need consistent breakpoints (F01 FR-F01-06, F04 FR-F04-09).

**Decision:** Tailwind CSS with project design tokens mapped in `4-design/library.md` when design strategy is defined.

**Rationale:** Fast responsive layout; utility classes suit marketing sections; common Next.js pairing.

**Consequences:** Utility-class markup; token sync with design library required during design phase.

**Related:** [NFR-02](#nfr-02-responsive-layout), [NFR-03](#nfr-03-accessibility), [F01](../2-features/F01-site-shell-and-navigation.md)

### ADR-06: Russian-only static content

**Context:** Scope assumes Russian UI only; EU experience cited for credibility, not as a separate locale ([stakeholders-and-goals.md](../1-scope/stakeholders-and-goals.md) assumptions).

**Decision:** Marketing copy in static TypeScript/JSON content modules compiled at build time; no i18n library; `lang="ru"` on document root.

**Rationale:** Matches non-goals (no English at launch); simplest content model for five fixed pages.

**Consequences:** Adding English later requires i18n refactor or duplicate routes; content updates need redeploy.

**Related:** [NFR-06](#nfr-06-seo), [F02](../2-features/F02-home-landing-page.md), [F03](../2-features/F03-about-and-trust-content.md)

## Technology Stack

| Layer | Choice | ADR |
|-------|--------|-----|
| Frontend framework | Next.js (App Router), React, TypeScript | ADR-01 |
| Styling | Tailwind CSS | ADR-05 |
| Hosting / CDN | Vercel | ADR-02 |
| Marketing pages | SSG / static generation (`app/` routes) | ADR-01, ADR-06 |
| Contact API | Next.js Route Handler (`/api/contact`) | ADR-01 |
| Email delivery | Resend API → `medvedeva19889@gmail.com` | ADR-03 |
| Anti-spam | Honeypot field + IP rate limiting | ADR-04 |
| Content | Static TS modules (per-page content objects) | ADR-06 |

## Non-Functional Requirements

| ID | Category | Requirement | Metric | Priority | Features |
|----|----------|-------------|--------|----------|----------|
| <a id="nfr-01-performance"></a> NFR-01 | Performance | Marketing pages shall load quickly on desktop and mobile | LCP ≤ 2.5 s on 4G; TTFB ≤ 600 ms for static routes | Must | F01, F02, F03, F04 |
| <a id="nfr-02-responsive-layout"></a> NFR-02 | Usability | Layout shall remain usable on mobile viewports | All primary nav destinations reachable at ≤768 px width without horizontal scroll | Must | F01 |
| <a id="nfr-03-accessibility"></a> NFR-03 | Accessibility | Public UI shall meet baseline accessibility | WCAG 2.1 AA for navigation, forms, contrast, focus, and labels | Must | F01, F02, F03, F04, F05 |
| <a id="nfr-04-security"></a> NFR-04 | Security | Contact submission shall be protected against abuse | HTTPS only; server-side validation; honeypot; rate limit enforced | Must | F05 |
| <a id="nfr-05-contact-delivery"></a> NFR-05 | Reliability | Successful form submits shall notify the owner | ≥99% of valid submits result in Resend accept within 30 s under normal operation | Must | F05 |
| <a id="nfr-06-seo"></a> NFR-06 | SEO | Key marketing pages shall be discoverable in Russian search | Unique `<title>` and meta description per route; semantic headings; `lang="ru"` | Must | F02, F03, F04 |
| <a id="nfr-07-availability"></a> NFR-07 | Availability | Public pages shall be highly available | ≥99.9% uptime for static routes via CDN (excluding planned maintenance) | Must | F01, F02, F03, F04, F05 |
| <a id="nfr-08-privacy"></a> NFR-08 | Privacy | Contact PII shall be handled minimally | Inquiry data used only for owner notification; not persisted on site; no CRM storage in v1 | Must | F05 |

## Quality Goals

| Priority | Goal | NFR(s) |
|----------|------|--------|
| 1 | Visitors get a fast, credible first impression on any device | NFR-01, NFR-02 |
| 2 | Inbound consulting inquiries reach the owner reliably | NFR-04, NFR-05 |
| 3 | Russian-speaking prospects can find and understand service fit | NFR-06 |
| 4 | Premium trust presentation is accessible and consistent | NFR-03 |
| 5 | Visitor contact data is collected only as needed for notification | NFR-08 |

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Honeypot may be insufficient against targeted bots | Med | Monitor spam rate post-launch; ADR-04 allows adding Turnstile without architecture change |
| Resend or Vercel outage blocks new inquiries | Med | Show retryable error on form (FR-F05-08); monitor service status; no public mailto fallback by design |
| Portrait and brand assets delayed | Low | Placeholder components per F02/F03 FRs; swap assets without route changes |
| Static content requires redeploy for copy edits | Low | Acceptable for v1 scope; CMS explicitly a non-goal |
