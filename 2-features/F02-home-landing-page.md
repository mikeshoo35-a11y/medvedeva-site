---
id: F02
name: Home landing page
status: Implemented
priority: Must
stakeholders: [STK-01, STK-02, STK-03, STK-04]
scenarios: [SCN-01]
requires: [F01]
---

# F02: Home landing page

## Overview

**Intent:** Deliver the default entry route (`/`) inside the F01 shell — a premium hero with positioning, segment-relevant value hooks, and clear calls to action — so visitors from referral, search, or direct URL immediately understand who Юлия Медведева is and where to go next (About, Services, Contact).

**Scope:** **In:** hero block (name, headline, subhead on medical-business consulting and ВРТ/ЭКО focus); geography line (РФ, KZ, UZ); dual-audience value teaser for investors and clinic owners; primary CTA to Contact; secondary CTAs to About and Services; optional portrait placeholder area; Russian copy. **Out:** full About narrative and trust figures (F03); detailed service descriptions (F04); contact form and channels (F05); header/footer/shell (F01); blog, testimonials CMS, English locale.

**Trace:** [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation), [GOL-02](../1-scope/stakeholders-and-goals.md#goals); [NFR-01](../3-arch/solution-strategy.md#nfr-01-performance), [NFR-03](../3-arch/solution-strategy.md#nfr-03-accessibility), [NFR-06](../3-arch/solution-strategy.md#nfr-06-seo), [NFR-07](../3-arch/solution-strategy.md#nfr-07-availability)

**Blocks:** [BB-01.2](../3-arch/building-blocks.md#bb-01-2) marketing content pages — home route

**Requires:** [F01](F01-site-shell-and-navigation.md)

## Overview trace

    ```mermaid
    flowchart LR
        SCN01["SCN-01"] --> GOL02["GOL-02"]
        GOL02 --> UR01["UR-F02-01"]
        F01["F01"] --> F02["F02"]
        BB01["BB-01"] --> F02
    ```

## User requirements

| ID | Requirement | Parent |
|----|-------------|--------|
| UR-F02-01 | Потенциальный клиент landing on the home page can grasp consultant positioning and ВРТ/ЭКО expertise within the first screen so that they know they are in the right place | [GOL-02](../1-scope/stakeholders-and-goals.md#goals), [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation) |
| UR-F02-02 | Потенциальный клиент can jump to About, Services, or Contact from prominent calls to action so that they continue the discover journey without searching the menu | [GOL-02](../1-scope/stakeholders-and-goals.md#goals), [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation) |
| UR-F02-03 | Инвестор and владелец клиники each see a relevant value hook on the home page so that equal segment priority from scope is reflected at entry | [GOL-02](../1-scope/stakeholders-and-goals.md#goals) |

## UR trace

    ```mermaid
    flowchart LR
        GOL02["GOL-02"] --> UR01["UR-F02-01"]
        GOL02 --> UR02["UR-F02-02"]
        GOL02 --> UR03["UR-F02-03"]
        SCN01["SCN-01"] --> UR01
        SCN01 --> UR02
    ```

## Functional requirements

| ID | Type | Requirement | Parent | Block | Acceptance |
|----|------|-------------|--------|-------|------------|
| FR-F02-01 | functional | Home route shall render inside the F01 main content region | UR-F02-01 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given F01 shell is loaded, when the visitor opens `/`, then home content appears in the main region with header and footer unchanged |
| FR-F02-02 | functional | Hero shall display consultant name, a primary headline on medical-business expertise, and a subhead mentioning ВРТ/ЭКО and turnkey clinic work | UR-F02-01 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the home page, when rendered, then name «Юлия Медведева», headline, and ВРТ/ЭКО positioning are visible above the fold on desktop |
| FR-F02-03 | functional | Hero shall state project geography (Россия, Казахстан, Узбекистан) | UR-F02-01 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the home page, when rendered, then all three markets are named in the hero or immediate follow block |
| FR-F02-04 | functional | Page shall include a value-teaser block with one hook for investors (turnkey clinic / safe investment) and one for clinic owners (IVF/ART department launch) | UR-F02-03 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the home page, when rendered, then both segment hooks are present with comparable visual weight |
| FR-F02-05 | functional | Primary CTA shall link to the Contact route | UR-F02-02 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the home page, when the visitor clicks the primary CTA, then the Contact page route loads |
| FR-F02-06 | functional | Secondary CTAs shall link to About and Services routes | UR-F02-02 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the home page, when the visitor clicks About or Services secondary CTAs, then the corresponding routes load |
| FR-F02-07 | functional | Hero shall reserve space for a premium portrait image (asset may be placeholder until photography is supplied) | UR-F02-01 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the home page layout, when no photo asset is configured, then a styled placeholder does not break layout |

## FR trace

    ```mermaid
    flowchart LR
        UR01["UR-F02-01"] --> FR01["FR-F02-01"]
        UR01 --> FR02["FR-F02-02"]
        UR01 --> FR03["FR-F02-03"]
        UR01 --> FR07["FR-F02-07"]
        UR02["UR-F02-02"] --> FR05["FR-F02-05"]
        UR02 --> FR06["FR-F02-06"]
        UR03["UR-F02-03"] --> FR04["FR-F02-04"]
        FR01 --> BB01["BB-01"]
        FR02 --> BB01
    ```

## UI flow

1. **Потенциальный клиент** arrives at `/` (referral, search, or direct URL) — F01 shell loads; home hero and teasers render (FR-F02-01, FR-F02-02).
2. **Потенциальный клиент** scans geography and segment hooks — judges relevance for investor or clinic-owner need (FR-F02-03, FR-F02-04).
3. **Потенциальный клиент** clicks **primary CTA** — navigates to Contact (FR-F02-05).
4. **Потенциальный клиент** clicks **About** or **Services** secondary CTA — continues discover path (FR-F02-06).

**Not in F02:** Full biography, trust figures, professional history (F03); service detail pages and pricing context (F04); inquiry form fields (F05).

**Mockups:** [MCK-02](../4-design/mockups.md#mck-02-home) · Components: [CMP-07](../4-design/design-strategy.md#cmp-07-hero-block), [CMP-08](../4-design/design-strategy.md#cmp-08-segment-teaser-pair), [CMP-09](../4-design/design-strategy.md#cmp-09-portrait-frame), [CMP-05](../4-design/design-strategy.md#cmp-05-primary-button), [CMP-06](../4-design/design-strategy.md#cmp-06-secondary-button)

## UI flow diagram

    ```mermaid
    sequenceDiagram
        actor Visitor
        participant Shell as F01 Shell
        participant Home as F02 Home
        Visitor->>Shell: Open / FR-F02-01
        Shell->>Home: Mount home content
        Visitor->>Home: Read hero FR-F02-02
        Visitor->>Shell: Click CTA to Contact FR-F02-05
        Shell->>Shell: Route to Contact F05
    ```

## Runtime flow

1. **[BB-01.1](../3-arch/building-blocks.md#bb-01-1)** — Match `/` route and render F01 layout (FR-F02-01).
2. **[BB-01.2](../3-arch/building-blocks.md#bb-01-2)** — Load static home content (hero, teasers, CTA targets) and compose home view (FR-F02-02–FR-F02-07).
3. **[BB-01.1](../3-arch/building-blocks.md#bb-01-1)** — On CTA interaction, delegate navigation to shell router (FR-F02-05, FR-F02-06).

## Runtime diagram

    ```mermaid
    sequenceDiagram
        participant Router as BB-01 Router
        participant Layout as F01 Layout
        participant Home as F02 Content
        Router->>Layout: GET / FR-F02-01
        Layout->>Home: load HomePageContent FR-F02-02
        Home-->>Layout: rendered hero + CTAs
    ```

**Notable aspects:** Static content at build or deploy time; portrait image optional; no user-specific personalization; CTAs use same route paths as F01 nav labels.

### HomePageContent (static, BB-01.2)

| Attribute | Type | Notes |
|-----------|------|-------|
| headline | string | Primary positioning line — medical-business expert (FR-F02-02) |
| subhead | string | ВРТ/ЭКО and turnkey clinic focus (FR-F02-02) |
| geography | string | RF, KZ, UZ markets (FR-F02-03) |
| investorHook | string | Turnkey / safe-investment teaser (FR-F02-04) |
| clinicOwnerHook | string | IVF/ART launch teaser (FR-F02-04) |
| portraitUrl | string | Optional image URL; null → placeholder (FR-F02-07) |
| ctaPrimary | object | Label, target route `/contact` (FR-F02-05) |
| ctaSecondary | array | About and Services labels + routes (FR-F02-06) |

**Relationships:** None — static marketing copy; no persistence.

**Full model:** [db-and-dfd.md](../4-design/db-and-dfd.md)

## Data diagram

    ```mermaid
    erDiagram
        HomePageContent {
            string headline
            string subhead
            string geography
            string investorHook
            string clinicOwnerHook
            string portraitUrl
        }
    ```
