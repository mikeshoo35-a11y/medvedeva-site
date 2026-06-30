---
id: F05
name: Contact inquiry capture
status: Implemented
priority: Must
stakeholders: [STK-01, STK-02, STK-03, STK-04]
scenarios: [SCN-01]
requires: [F01]
---

# F05: Contact inquiry capture

## Overview

**Intent:** Deliver the Contact route (`/contact`, label «Контакты») inside the F01 shell — inquiry form only — so visitors submit consulting leads (EVT-01) and the owner receives notification via Resend, fulfilling GOL-01 and SCN-01 steps 3–4.

**Scope:** **In:** contact form (name, email, phone, message); client-side required-field validation; submit success and error feedback; owner notification to `medvedeva19889@gmail.com` via Resend on successful submit; Russian labels and messages. **Out:** visible owner email or phone on the site; CRM setup and lead pipeline (boundary Out); live chat, booking, payments; spam service configuration detail (see [NFR-04](../3-arch/solution-strategy.md#nfr-04-security)); blog, English locale.

**Trace:** [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation), [GOL-01](../1-scope/stakeholders-and-goals.md#goals); [NFR-03](../3-arch/solution-strategy.md#nfr-03-accessibility), [NFR-04](../3-arch/solution-strategy.md#nfr-04-security), [NFR-05](../3-arch/solution-strategy.md#nfr-05-contact-delivery), [NFR-08](../3-arch/solution-strategy.md#nfr-08-privacy)

**Blocks:** [BB-01.3](../3-arch/building-blocks.md#bb-01-3) contact page UI; [BB-02](../3-arch/building-blocks.md#bb-02) contact inquiry handler ([BB-02.1](../3-arch/building-blocks.md#bb-02-1), [BB-02.2](../3-arch/building-blocks.md#bb-02-2))

**Requires:** [F01](F01-site-shell-and-navigation.md)

## Overview trace

    ```mermaid
    flowchart LR
        SCN01["SCN-01"] --> GOL01["GOL-01"]
        GOL01 --> UR01["UR-F05-01"]
        EVT01["EVT-01"] --> F05["F05"]
        BB01["BB-01"] --> F05
        BB02["BB-02"] --> F05
    ```

## User requirements

| ID | Requirement | Parent |
|----|-------------|--------|
| UR-F05-01 | Потенциальный клиент can submit a contact form with their details and message so that Юлия Медведева receives an inbound consulting inquiry | [GOL-01](../1-scope/stakeholders-and-goals.md#goals), [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation) |
| UR-F05-03 | Потенциальный клиент receives clear feedback after form submit so that they know whether the inquiry was sent | [GOL-01](../1-scope/stakeholders-and-goals.md#goals) |
| UR-F05-04 | Потенциальный клиент is prompted to fix invalid or missing required fields before submit so that leads are actionable | [GOL-01](../1-scope/stakeholders-and-goals.md#goals) |

## UR trace

    ```mermaid
    flowchart LR
        GOL01["GOL-01"] --> UR01["UR-F05-01"]
        GOL01 --> UR03["UR-F05-03"]
        GOL01 --> UR04["UR-F05-04"]
        SCN01["SCN-01"] --> UR01
    ```

## Functional requirements

| ID | Type | Requirement | Parent | Block | Acceptance |
|----|------|-------------|--------|-------|------------|
| FR-F05-01 | functional | Contact route shall render inside the F01 main content region | UR-F05-01 | [BB-01.3](../3-arch/building-blocks.md#bb-01-3) | Given F01 shell is loaded, when the visitor opens `/contact`, then Contact page content appears in the main region |
| FR-F05-02 | functional | Contact form shall include fields: name (Имя), email (Email), phone (Телефон), message (Сообщение) | UR-F05-01 | [BB-01.3](../3-arch/building-blocks.md#bb-01-3) | Given the Contact page, when rendered, then all four fields are present with Russian labels |
| FR-F05-03 | functional | Form shall require name, email, and message; phone is optional | UR-F05-04 | [BB-01.3](../3-arch/building-blocks.md#bb-01-3) | Given empty required fields, when submit is attempted, then inline validation blocks submit and names missing fields |
| FR-F05-04 | functional | Form shall validate email format before submit | UR-F05-04 | [BB-01.3](../3-arch/building-blocks.md#bb-01-3) | Given an invalid email, when submit is attempted, then validation error is shown and submit does not proceed |
| FR-F05-05 | functional | On successful submit, system shall emit EVT-01 with name, email, phone (if provided), and message | UR-F05-01 | [BB-02.1](../3-arch/building-blocks.md#bb-02-1) | Given valid input, when submit succeeds, then EVT-01 payload contains all provided field values |
| FR-F05-06 | functional | On successful submit, owner notification shall be delivered via Resend to `medvedeva19889@gmail.com` | UR-F05-01 | [BB-02.2](../3-arch/building-blocks.md#bb-02-2) | Given a successful submit, when notification runs, then owner receives an email at `medvedeva19889@gmail.com` containing inquiry fields |
| FR-F05-07 | functional | On successful submit, visitor shall see a confirmation message that the inquiry was sent | UR-F05-03 | [BB-01.3](../3-arch/building-blocks.md#bb-01-3) | Given successful submit, when the response returns, then a success state is shown without exposing internal errors |
| FR-F05-08 | functional | On submit failure, visitor shall see a non-technical error message and may retry | UR-F05-03 | [BB-01.3](../3-arch/building-blocks.md#bb-01-3) | Given server/network failure, when submit fails, then an error message appears and form data is preserved for retry |
| FR-F05-10 | functional | Contact page shall include brief copy inviting consultation inquiries for investors, clinic owners, and doctors | UR-F05-01 | [BB-01.3](../3-arch/building-blocks.md#bb-01-3) | Given the Contact page, when rendered, then intro copy addresses inbound consulting intent |

## FR trace

    ```mermaid
    flowchart LR
        UR01["UR-F05-01"] --> FR01["FR-F05-01"]
        UR01 --> FR02["FR-F05-02"]
        UR01 --> FR05["FR-F05-05"]
        UR01 --> FR06["FR-F05-06"]
        UR01 --> FR10["FR-F05-10"]
        UR03["UR-F05-03"] --> FR07["FR-F05-07"]
        UR03 --> FR08["FR-F05-08"]
        UR04["UR-F05-04"] --> FR03["FR-F05-03"]
        UR04 --> FR04["FR-F05-04"]
        FR05 --> BB02["BB-02"]
        FR06 --> BB02
        FR02 --> BB01["BB-01"]
    ```

## UI flow

1. **Потенциальный клиент** opens Contact from nav, CTA, or direct URL — form renders (FR-F05-01, FR-F05-02).
2. **Потенциальный клиент** fills name, email, optional phone, message — validation on submit (FR-F05-03, FR-F05-04).
3. **Потенциальный клиент** submits — success confirmation or retryable error (FR-F05-07, FR-F05-08).

**Not in F05:** Footer/nav shell (F01); visible owner email or phone; CRM lead storage beyond owner email notification.

**Mockups:** [MCK-05](../4-design/mockups.md#mck-05-contact) · Components: [CMP-14](../4-design/design-strategy.md#cmp-14-contact-form), [CMP-15](../4-design/design-strategy.md#cmp-15-form-field), [CMP-16](../4-design/design-strategy.md#cmp-16-form-status-message)

## UI flow diagram

    ```mermaid
    sequenceDiagram
        actor Visitor
        participant Page as F05 Contact UI
        participant Handler as BB-02 Handler
        participant Owner as Owner inbox
        Visitor->>Page: Fill form FR-F05-02
        Visitor->>Page: Submit FR-F05-03
        Page->>Handler: POST inquiry FR-F05-05
        Handler->>Owner: Notify email FR-F05-06
        Handler-->>Page: Success FR-F05-07
        Page-->>Visitor: Confirmation message
    ```

## Runtime flow

1. **[BB-01.3](../3-arch/building-blocks.md#bb-01-3)** — Match `/contact` route and render form (FR-F05-01, FR-F05-02).
2. **[BB-01.3](../3-arch/building-blocks.md#bb-01-3)** — Validate required fields and email format client-side (FR-F05-03, FR-F05-04).
3. **[BB-02.1](../3-arch/building-blocks.md#bb-02-1)** — Accept inquiry payload, emit EVT-01; **[BB-02.2](../3-arch/building-blocks.md#bb-02-2)** — send owner notification email (FR-F05-05, FR-F05-06).
4. **[BB-01.3](../3-arch/building-blocks.md#bb-01-3)** — Render success or error state to visitor (FR-F05-07, FR-F05-08).

## Runtime diagram

    ```mermaid
    sequenceDiagram
        participant UI as BB-01 Contact page
        participant API as BB-02 Inquiry API
        participant Mail as Owner email
        UI->>UI: validate FR-F05-03
        UI->>API: submit ContactInquiry FR-F05-05
        API->>Mail: send notification FR-F05-06
        API-->>UI: 200 OK
        UI-->>UI: show success FR-F05-07
    ```

**Notable aspects:** CRM integration out of scope — notification via Resend to `medvedeva19889@gmail.com` only; owner inbox configured server-side (`OWNER_NOTIFICATION_EMAIL` env), not exposed in public UI; spam/bot mitigation per [NFR-04](../3-arch/solution-strategy.md#nfr-04-security).

**See also:** [EVT-01](../1-scope/business-scenarios.md#business-events) · [RT-01](../3-arch/runtime-views.md#rt-01), [RT-02](../3-arch/runtime-views.md#rt-02)

## Data model

### ContactInquiry (transient, BB-02.1)

| Attribute | Type | Notes |
|-----------|------|-------|
| name | string | Required; submitter name (FR-F05-02, FR-F05-03) |
| email | string | Required; valid format (FR-F05-04) |
| phone | string | Optional (FR-F05-02) |
| message | string | Required (FR-F05-03) |
| submittedAt | datetime | Set server-side on accept (FR-F05-05) |

**Relationships:** None persisted on marketing site — payload passed to owner notification only (CRM Out).

### ContactPageContent (static, BB-01.3)

| Attribute | Type | Notes |
|-----------|------|-------|
| intro | string | Consulting inquiry invitation (FR-F05-10) |
| successMessage | string | Post-submit confirmation (FR-F05-07) |
| errorMessage | string | Generic failure copy (FR-F05-08) |

### OwnerNotificationConfig (server env, BB-02.2)

| Attribute | Type | Notes |
|-----------|------|-------|
| ownerNotificationEmail | string | `medvedeva19889@gmail.com` — Resend `to` address (FR-F05-06); not rendered on site |

**Full model:** [db-and-dfd.md](../4-design/db-and-dfd.md)

## Data diagram

    ```mermaid
    erDiagram
        ContactInquiry {
            string name
            string email
            string phone
            string message
            datetime submittedAt
        }
        ContactPageContent {
            string intro
        }
    ```
