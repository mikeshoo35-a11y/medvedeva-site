---
id: F03
name: About and trust content
status: Implemented
priority: Must
stakeholders: [STK-01, STK-02, STK-03, STK-04]
scenarios: [SCN-01]
requires: [F01]
---

# F03: About and trust content

## Overview

**Intent:** Deliver the About route (`/about`, label «Обо мне») inside the F01 shell — positioning, trust figures, professional background, mission, and geography — so visitors can judge consultant credibility and fit before moving to Services or Contact (SCN-01 step 2).

**Scope:** **In:** positioning block (premium portrait, role, 10+ years as CEO/managing partner, ВРТ/ЭКО focus); trust-figures block (four key stats); expert-background narrative (clinician + manager, P&L/EBITDA/ROI language); mission statement; geography (РФ, KZ, UZ, EU approaches cited); end-of-page CTAs to Services and Contact; Russian copy. **Out:** service descriptions and segment pain points (F04); contact form and visible channels (F05); home hero teasers (F02); shell chrome (F01); blog, case-study CMS, English locale.

**Trace:** [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation), [GOL-02](../1-scope/stakeholders-and-goals.md#goals); [NFR-01](../3-arch/solution-strategy.md#nfr-01-performance), [NFR-03](../3-arch/solution-strategy.md#nfr-03-accessibility), [NFR-06](../3-arch/solution-strategy.md#nfr-06-seo), [NFR-07](../3-arch/solution-strategy.md#nfr-07-availability)

**Blocks:** [BB-01.2](../3-arch/building-blocks.md#bb-01-2) marketing content pages — about route

**Requires:** [F01](F01-site-shell-and-navigation.md)

## Overview trace

    ```mermaid
    flowchart LR
        SCN01["SCN-01"] --> GOL02["GOL-02"]
        GOL02 --> UR01["UR-F03-01"]
        F01["F01"] --> F03["F03"]
        BB01["BB-01"] --> F03
    ```

## User requirements

| ID | Requirement | Parent |
|----|-------------|--------|
| UR-F03-01 | Потенциальный клиент can read positioning, credentials, and professional background so that they judge whether Юлия Медведева is a credible consultant | [GOL-02](../1-scope/stakeholders-and-goals.md#goals), [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation) |
| UR-F03-02 | Потенциальный клиент can scan trust figures (tenure, turnkey cycle, ВРТ/ЭКО niche, international experience) so that high-ticket consulting positioning feels substantiated | [GOL-02](../1-scope/stakeholders-and-goals.md#goals) |
| UR-F03-03 | Потенциальный клиент can see project geography and international scope so that they understand market fit for RF, KZ, and UZ | [GOL-02](../1-scope/stakeholders-and-goals.md#goals) |
| UR-F03-04 | Потенциальный клиент can continue to Services or Contact from the About page so that the discover path does not dead-end | [GOL-02](../1-scope/stakeholders-and-goals.md#goals), [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation) |

## UR trace

    ```mermaid
    flowchart LR
        GOL02["GOL-02"] --> UR01["UR-F03-01"]
        GOL02 --> UR02["UR-F03-02"]
        GOL02 --> UR03["UR-F03-03"]
        GOL02 --> UR04["UR-F03-04"]
        SCN01["SCN-01"] --> UR01
        SCN01 --> UR04
    ```

## Functional requirements

| ID | Type | Requirement | Parent | Block | Acceptance |
|----|------|-------------|--------|-------|------------|
| FR-F03-01 | functional | About route shall render inside the F01 main content region | UR-F03-01 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given F01 shell is loaded, when the visitor opens `/about`, then About content appears in the main region |
| FR-F03-02 | functional | Positioning section shall display consultant name, premium portrait area, international-class medical-business expert headline, 10+ years as CEO/managing partner, and ВРТ/ЭКО specialization | UR-F03-01 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the About page, when rendered, then all positioning elements are visible in the first content section |
| FR-F03-03 | functional | Trust-figures block shall present four stats: 10+ years leadership; full turnkey cycle to payback; №1 niche in ЭКО/ВРТ and embryology labs; international licensing experience (СНГ + European approaches) | UR-F03-02 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the About page, when rendered, then four distinct trust figures are scannable without scrolling past the figures block |
| FR-F03-04 | functional | Background section shall explain clinician-to-executive path and ability to translate clinical standards into business metrics (P&L, EBITDA, ROI) | UR-F03-01 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the About page, when the visitor reads the background section, then doctor background and business-metrics framing are both present |
| FR-F03-05 | functional | Mission block shall state turning medical ideas into high-margin business with quality-driven profit | UR-F03-01 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the About page, when rendered, then the mission statement is present as a distinct block |
| FR-F03-06 | functional | Geography block shall name Russia, Kazakhstan, and Uzbekistan and cite European approaches for credibility | UR-F03-03 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the About page, when rendered, then RF, KZ, and UZ are named and EU experience is referenced without implying an English site locale |
| FR-F03-07 | functional | Page shall include CTAs linking to Services and Contact routes | UR-F03-04 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the About page, when the visitor clicks Services or Contact CTAs, then the corresponding routes load |
| FR-F03-08 | functional | Portrait area shall use a placeholder when no photo asset is configured | UR-F03-01 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given no portrait URL, when the About page renders, then layout remains intact with a styled placeholder |

## FR trace

    ```mermaid
    flowchart LR
        UR01["UR-F03-01"] --> FR01["FR-F03-01"]
        UR01 --> FR02["FR-F03-02"]
        UR01 --> FR04["FR-F03-04"]
        UR01 --> FR05["FR-F03-05"]
        UR01 --> FR08["FR-F03-08"]
        UR02["UR-F03-02"] --> FR03["FR-F03-03"]
        UR03["UR-F03-03"] --> FR06["FR-F03-06"]
        UR04["UR-F03-04"] --> FR07["FR-F03-07"]
        FR02 --> BB01["BB-01"]
        FR03 --> BB01
    ```

## UI flow

1. **Потенциальный клиент** opens About from nav, home CTA, or direct URL — F01 shell loads About content (FR-F03-01).
2. **Потенциальный клиент** reads positioning and portrait — establishes who the consultant is (FR-F03-02, FR-F03-08).
3. **Потенциальный клиент** scans trust figures — validates expertise for high-ticket engagement (FR-F03-03).
4. **Потенциальный клиент** reads background and mission — connects clinical and business credibility (FR-F03-04, FR-F03-05).
5. **Потенциальный клиент** reviews geography — confirms market relevance (FR-F03-06).
6. **Потенциальный клиент** clicks CTA to Services or Contact — continues SCN-01 journey (FR-F03-07).

**Not in F03:** Service offerings, segment pain points, and deliverables (F04); inquiry capture (F05).

**Mockups:** [MCK-03](../4-design/mockups.md#mck-03-about) · Components: [CMP-09](../4-design/design-strategy.md#cmp-09-portrait-frame), [CMP-10](../4-design/design-strategy.md#cmp-10-trust-figures-grid), [CMP-11](../4-design/design-strategy.md#cmp-11-content-section), [CMP-05](../4-design/design-strategy.md#cmp-05-primary-button), [CMP-06](../4-design/design-strategy.md#cmp-06-secondary-button)

## UI flow diagram

    ```mermaid
    sequenceDiagram
        actor Visitor
        participant Shell as F01 Shell
        participant About as F03 About
        Visitor->>Shell: Open /about FR-F03-01
        Shell->>About: Mount about content
        Visitor->>About: Read positioning + figures FR-F03-02
        Visitor->>Shell: CTA to Services FR-F03-07
        Shell->>Shell: Route to Services F04
    ```

## Runtime flow

1. **[BB-01.1](../3-arch/building-blocks.md#bb-01-1)** — Match `/about` route and render F01 layout (FR-F03-01).
2. **[BB-01.2](../3-arch/building-blocks.md#bb-01-2)** — Load static About content and compose sections in order: positioning → trust figures → background → mission → geography → CTAs (FR-F03-02–FR-F03-07).
3. **[BB-01.2](../3-arch/building-blocks.md#bb-01-2)** — Resolve portrait asset or fallback placeholder (FR-F03-08).

## Runtime diagram

    ```mermaid
    sequenceDiagram
        participant Router as BB-01 Router
        participant Layout as F01 Layout
        participant About as F03 Content
        Router->>Layout: GET /about FR-F03-01
        Layout->>About: load AboutPageContent FR-F03-02
        About-->>Layout: rendered sections + CTAs
    ```

**Notable aspects:** Static marketing copy; EU cited for credibility only (Russian UI per scope); extended biography text may be refined in design/copy pass without new FRs if sections remain.

### AboutPageContent (static, BB-01.2)

| Attribute | Type | Notes |
|-----------|------|-------|
| positioningHeadline | string | International-class medical-business expert (FR-F03-02) |
| positioningSubhead | string | CEO/managing partner, 10+ years, ВРТ/ЭКО (FR-F03-02) |
| portraitUrl | string | Optional; null → placeholder (FR-F03-08) |
| trustFigures | array | Four items: label + short description (FR-F03-03) |
| backgroundNarrative | string | Clinician-to-executive story (FR-F03-04) |
| missionStatement | string | Medical ideas → high-margin business (FR-F03-05) |
| geography | string | RF, KZ, UZ + EU approaches (FR-F03-06) |
| ctaServices | object | Label, route `/services` (FR-F03-07) |
| ctaContact | object | Label, route `/contact` (FR-F03-07) |

### TrustFigure (embedded)

| Attribute | Type | Notes |
|-----------|------|-------|
| label | string | e.g. «10+ лет» (FR-F03-03) |
| description | string | Supporting line for the figure (FR-F03-03) |

**Relationships:** `AboutPageContent` contains 4 `TrustFigure` entries.

**Full model:** [db-and-dfd.md](../4-design/db-and-dfd.md)

## Data diagram

    ```mermaid
    erDiagram
        AboutPageContent ||--|{ TrustFigure : contains
        AboutPageContent {
            string positioningHeadline
            string positioningSubhead
            string backgroundNarrative
            string missionStatement
            string geography
        }
        TrustFigure {
            string label
            string description
        }
    ```
