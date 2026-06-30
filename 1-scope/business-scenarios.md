# Business Scenarios and Events

## Context and Boundary

| Actor / System | Type | Role | In / Out |
|----------------|------|------|----------|
| Потенциальный клиент (инвестор, владелец клиники, врач) | Person | Discovers expertise and initiates contact | In |
| Юлия Медведева | Person | Receives and qualifies inbound leads | Out |
| Маркетинговый сайт | System | Presents About, services, trust content; hosts contact form | In |
| Resend / почтовый ящик владельца | System | Delivers inquiry notification to owner inbox (not shown on site) | Out |

**Boundary:** Russian-language **marketing website** — positioning, expertise, services overview, trust blocks (figures, background), and contact capture. **Outside scope:** CRM configuration, blog CMS, booking, payments, patient records, post-contact sales pipeline, and clinical operations.

## Scenarios

### SCN-01: Discover expertise and request consultation

**Actor:** Потенциальный клиент (STK-02, STK-03, or STK-04) · **Trigger:** Referral, search result, or direct URL · **Goal:** Decide that Юлия Медведева is the right consultant and submit an inquiry

**Main flow:** 1. Visitor lands on site (home or About). 2. Reads positioning, credentials, geography, and services (turnkey clinic, IVF/ART launch, audit). 3. Opens Contact and completes the inquiry form. 4. Submits inquiry; owner receives notification email.

**Alternate flows:** Visitor leaves without contacting → no system action. Visitor returns later via bookmark → same flow from step 2.

**Related features:** [F01](../2-features/F01-site-shell-and-navigation.md), [F02](../2-features/F02-home-landing-page.md), [F03](../2-features/F03-about-and-trust-content.md), [F04](../2-features/F04-services-overview.md), [F05](../2-features/F05-contact-inquiry-capture.md)

## Business Events

| Event ID | Name | Source | Payload | Consumers |
|----------|------|--------|---------|-----------|
| EVT-01 | Contact inquiry submitted | Contact form | `name`, `email`, `phone` (optional), `message`, `submittedAt` | Owner inbox via Resend (`medvedeva19889@gmail.com`) |
