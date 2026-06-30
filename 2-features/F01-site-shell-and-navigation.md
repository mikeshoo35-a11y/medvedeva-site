---
id: F01
name: Site shell and navigation
status: Implemented
priority: Must
stakeholders: [STK-01, STK-02, STK-03, STK-04]
scenarios: [SCN-01]
requires: []
---

# F01: Site shell and navigation

## Overview

**Intent:** Provide a consistent premium site chrome — header, primary navigation, footer, and page layout — so visitors on any page can reach Home, About, Services, and Contact without dead ends. Child features (F02–F05) supply page content inside the shell's main area.

**Scope:** **In:** site identity in header (name/logo linking home); primary nav (Главная, Обо мне, Услуги, Контакты); responsive layout wrapper; footer with repeated primary nav; active-route indication; Russian UI labels. **Out:** visible owner email or phone; page-specific hero and copy (F02–F04); contact form and submission (F05); blog, auth, booking, payments; English locale.

**Trace:** [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation), [GOL-02](../1-scope/stakeholders-and-goals.md#goals); [NFR-01](../3-arch/solution-strategy.md#nfr-01-performance), [NFR-02](../3-arch/solution-strategy.md#nfr-02-responsive-layout), [NFR-03](../3-arch/solution-strategy.md#nfr-03-accessibility), [NFR-07](../3-arch/solution-strategy.md#nfr-07-availability)

**Blocks:** [BB-01.1](../3-arch/building-blocks.md#bb-01-1) site shell & router

**Requires:** —

## Overview trace

    ```mermaid
    flowchart LR
        SCN01["SCN-01"] --> GOL02["GOL-02"]
        GOL02 --> UR01["UR-F01-01"]
        GOL02 --> UR02["UR-F01-02"]
        BB01["BB-01"] --> F01["F01"]
    ```

## User requirements

| ID | Requirement | Parent |
|----|-------------|--------|
| UR-F01-01 | Потенциальный клиент can open any primary section (Home, About, Services, Contact) from any page so that they complete the discover path without dead ends | [GOL-02](../1-scope/stakeholders-and-goals.md#goals), [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation) |
| UR-F01-02 | Потенциальный клиент sees consistent premium branding and layout on every page so that consultant positioning feels coherent and trustworthy | [GOL-02](../1-scope/stakeholders-and-goals.md#goals) |
| UR-F01-03 | Потенциальный клиент can use the site on a mobile device so that navigation remains usable away from desktop | [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation) |

## UR trace

    ```mermaid
    flowchart LR
        GOL02["GOL-02"] --> UR01["UR-F01-01"]
        GOL02 --> UR02["UR-F01-02"]
        SCN01["SCN-01"] --> UR01
        SCN01 --> UR03["UR-F01-03"]
    ```

## Functional requirements

| ID | Type | Requirement | Parent | Block | Acceptance |
|----|------|-------------|--------|-------|------------|
| FR-F01-01 | functional | Header shall display site identity (Юлия Медведева name or logo) linking to the home route | UR-F01-01, UR-F01-02 | [BB-01.1](../3-arch/building-blocks.md#bb-01-1) | Given any page, when the visitor clicks the header identity, then the home route loads inside the shell |
| FR-F01-02 | functional | Primary navigation shall expose routes for Home (Главная), About (Обо мне), Services (Услуги), and Contact (Контакты) | UR-F01-01 | [BB-01.1](../3-arch/building-blocks.md#bb-01-1) | Given the shell on any page, when the visitor opens each nav item, then the corresponding page route loads without full-site dead ends |
| FR-F01-03 | functional | Layout shall render a main content region for child feature pages | UR-F01-01 | [BB-01.1](../3-arch/building-blocks.md#bb-01-1) | Given a child route (F02–F05), when the route loads, then its content appears in the main region within the shared header and footer |
| FR-F01-04 | functional | Footer shall repeat primary navigation links | UR-F01-01 | [BB-01.1](../3-arch/building-blocks.md#bb-01-1) | Given any page, when the visitor scrolls to the footer, then the same primary destinations are available as in the header |
| FR-F01-06 | functional | Shell shall adapt layout for mobile viewports (collapsible or stacked nav) | UR-F01-03 | [BB-01.1](../3-arch/building-blocks.md#bb-01-1) | Given a viewport ≤768px, when the visitor opens navigation, then all primary destinations remain reachable without horizontal scroll |
| FR-F01-07 | functional | Active navigation item shall reflect the current route | UR-F01-02 | [BB-01.1](../3-arch/building-blocks.md#bb-01-1) | Given the visitor is on About, when the header nav renders, then the About item is visually distinguished from other items |

## FR trace

    ```mermaid
    flowchart LR
        UR01["UR-F01-01"] --> FR01["FR-F01-01"]
        UR01 --> FR02["FR-F01-02"]
        UR01 --> FR03["FR-F01-03"]
        UR01 --> FR04["FR-F01-04"]
        UR02["UR-F01-02"] --> FR01
        UR02 --> FR07["FR-F01-07"]
        UR03["UR-F01-03"] --> FR06["FR-F01-06"]
        FR01 --> BB01["BB-01"]
        FR02 --> BB01
        FR03 --> BB01
    ```

## UI flow

1. **Потенциальный клиент** lands on any route — shell renders header, main slot, and footer (FR-F01-03).
2. **Потенциальный клиент** on **header** — clicks a primary nav item to reach Home, About, Services, or Contact (FR-F01-02, FR-F01-07).
3. **Потенциальный клиент** on **mobile** — opens menu control and selects a destination (FR-F01-06).
4. **Потенциальный клиент** on **footer** — uses repeated nav links (FR-F01-04).

**Not in F01:** Page hero, About copy, services copy, contact form fields and submit (F02–F05).

**Mockups:** [MCK-01](../4-design/mockups.md#mck-01-site-shell), [MCK-06](../4-design/mockups.md#mck-06-mobile-nav), [MCK-07](../4-design/mockups.md#mck-07-not-found) · Components: [CMP-01](../4-design/design-strategy.md#cmp-01-site-header)–[CMP-04](../4-design/design-strategy.md#cmp-04-main-content-slot), [CMP-17](../4-design/design-strategy.md#cmp-17-not-found-content)

## UI flow diagram

    ```mermaid
    sequenceDiagram
        actor Visitor
        participant Shell as Site shell
        participant Page as Child page F02-F05
        Visitor->>Shell: Load any URL FR-F01-03
        Shell->>Page: Render route in main region
        Visitor->>Shell: Select nav item FR-F01-02
        Shell->>Page: Navigate to target route
    ```

## Runtime flow

1. **[BB-01.1](../3-arch/building-blocks.md#bb-01-1)** — Resolve requested route and load shared layout wrapper (FR-F01-03).
2. **[BB-01.1](../3-arch/building-blocks.md#bb-01-1)** — Render header with identity, nav links, and active state (FR-F01-01, FR-F01-02, FR-F01-07).
3. **[BB-01.1](../3-arch/building-blocks.md#bb-01-1)** — Inject child feature page into main content slot (FR-F01-03).
4. **[BB-01.1](../3-arch/building-blocks.md#bb-01-1)** — Render footer with repeated nav links (FR-F01-04).

## Runtime diagram

    ```mermaid
    sequenceDiagram
        participant Router as BB-01 Router
        participant Layout as BB-01 Layout
        participant Child as F02-F05 page
        Router->>Layout: match route FR-F01-03
        Layout->>Layout: render header/footer FR-F01-01
        Layout->>Child: mount page content FR-F01-03
    ```

**Notable aspects:** Static marketing site — no auth; no visible owner contact details on site; unknown routes should show a branded not-found page inside the shell.

## Data model

### SiteConfig (static, BB-01.1)

| Attribute | Type | Notes |
|-----------|------|-------|
| siteName | string | Display name in header — default «Юлия Медведева» (FR-F01-01) |
| navItems | array | Route id, label (RU), path — Home, About, Services, Contact (FR-F01-02) |

**Relationships:** None — configuration only; no persistence.

**Full model:** [db-and-dfd.md](../4-design/db-and-dfd.md)

## Data diagram

    ```mermaid
    erDiagram
        SiteConfig {
            string siteName
        }
    ```
