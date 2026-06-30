---
id: F04
name: Services overview
status: Implemented
priority: Must
stakeholders: [STK-02, STK-03, STK-04]
scenarios: [SCN-01]
requires: [F01]
---

# F04: Services overview

## Overview

**Intent:** Deliver the Services route (`/services`, label «Услуги») inside the F01 shell — consulting offerings grouped by service pillars and client segments — so visitors understand turnkey clinic, IVF/ART launch, and audit fit before contacting (SCN-01 step 2; GOL-02 service-fit goal).

**Scope:** **In:** page intro framing (investment safety, launch speed, experienced guidance); three service pillars (клиника под ключ; запуск направления ЭКО/ВРТ; аудит и сопровождение); three audience sections for investors (STK-02), clinic owners (STK-03), and star doctors (STK-04, supporting); glossary-aligned terminology (СанПиН, чистые зоны, прейскурант, эмбриологическая лаборатория); CTA to Contact; Russian copy. **Out:** About narrative and trust figures (F03); contact form and channels (F05); pricing tables, proposals, or online quoting; shell chrome (F01); blog, case-study CMS, English locale.

**Trace:** [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation), [GOL-02](../1-scope/stakeholders-and-goals.md#goals); [NFR-01](../3-arch/solution-strategy.md#nfr-01-performance), [NFR-03](../3-arch/solution-strategy.md#nfr-03-accessibility), [NFR-06](../3-arch/solution-strategy.md#nfr-06-seo), [NFR-07](../3-arch/solution-strategy.md#nfr-07-availability)

**Blocks:** [BB-01.2](../3-arch/building-blocks.md#bb-01-2) marketing content pages — services route

**Requires:** [F01](F01-site-shell-and-navigation.md)

## Overview trace

    ```mermaid
    flowchart LR
        SCN01["SCN-01"] --> GOL02["GOL-02"]
        GOL02 --> UR01["UR-F04-01"]
        STK02["STK-02"] --> UR02["UR-F04-02"]
        STK03["STK-03"] --> UR03["UR-F04-03"]
        F01["F01"] --> F04["F04"]
        BB01["BB-01"] --> F04
    ```

## User requirements

| ID | Requirement | Parent |
|----|-------------|--------|
| UR-F04-01 | Потенциальный клиент can see what consulting services Юлия Медведева offers so that they judge service fit before contacting | [GOL-02](../1-scope/stakeholders-and-goals.md#goals), [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation) |
| UR-F04-02 | Инвестор из непрофильной сферы can recognize offerings for turnkey clinic launch, business-plan audit, equipment selection, and design oversight so that capital-risk concerns are addressed | [GOL-02](../1-scope/stakeholders-and-goals.md#goals) |
| UR-F04-03 | Владелец действующей клиники can recognize offerings for IVF/ART department launch, embryology lab setup, licensing, and price-list audit so that expansion into репродуктология feels feasible | [GOL-02](../1-scope/stakeholders-and-goals.md#goals) |
| UR-F04-04 | Практикующий врач-эксперт can see how clinical reputation translates into opening a clinic with an investor partner so that the third segment is not excluded from the page | [GOL-02](../1-scope/stakeholders-and-goals.md#goals) |
| UR-F04-05 | Потенциальный клиент can proceed to Contact from the Services page so that the discover path does not dead-end | [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation) |

## UR trace

    ```mermaid
    flowchart LR
        GOL02["GOL-02"] --> UR01["UR-F04-01"]
        GOL02 --> UR02["UR-F04-02"]
        GOL02 --> UR03["UR-F04-03"]
        GOL02 --> UR04["UR-F04-04"]
        SCN01["SCN-01"] --> UR01
        SCN01 --> UR05["UR-F04-05"]
    ```

## Functional requirements

| ID | Type | Requirement | Parent | Block | Acceptance |
|----|------|-------------|--------|-------|------------|
| FR-F04-01 | functional | Services route shall render inside the F01 main content region | UR-F04-01 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given F01 shell is loaded, when the visitor opens `/services`, then Services content appears in the main region |
| FR-F04-02 | functional | Page intro shall frame consulting value as investment safety, launch speed, and experienced guidance that prevents costly mistakes | UR-F04-01 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the Services page, when rendered, then the intro names all three value themes |
| FR-F04-03 | functional | Services page shall present a **клиника под ключ** pillar covering end-to-end launch from concept through licensing, equipment, staffing, and planned payback | UR-F04-01, UR-F04-02 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the Services page, when rendered, then turnkey clinic scope is described as a distinct pillar |
| FR-F04-04 | functional | Services page shall present an **ЭКО/ВРТ launch** pillar covering embryology lab, чистые зоны, licensing/quotas, and operational setup | UR-F04-01, UR-F04-03 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the Services page, when rendered, then IVF/ART launch scope is described including lab and regulatory aspects |
| FR-F04-05 | functional | Services page shall present an **audit and advisory** pillar covering business-plan audit, прейскурант audit, equipment selection, and design/project oversight | UR-F04-01, UR-F04-02, UR-F04-03 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the Services page, when rendered, then audit/advisory scope is described as a distinct pillar |
| FR-F04-06 | functional | Investor segment block shall state typical client profile, primary pain (СанПиН, licensing, equipment risk), and mapped offerings from pillars | UR-F04-02 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the Services page, when rendered, then the investor section names pain points and links to relevant pillars |
| FR-F04-07 | functional | Clinic-owner segment block shall state typical client profile, primary pain (revenue ceiling, ЭКО complexity, прейскурант), and mapped offerings from pillars | UR-F04-03 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the Services page, when rendered, then the clinic-owner section names pain points and links to relevant pillars |
| FR-F04-08 | functional | Star-doctor segment block shall address turning clinical reputation into a clinic business with an investor partner | UR-F04-04 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the Services page, when rendered, then the star-doctor section is present with lower prominence than investor and clinic-owner sections |
| FR-F04-09 | functional | Investor and clinic-owner segment blocks shall have comparable visual prominence on the page | UR-F04-02, UR-F04-03 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given desktop layout, when rendered, then investor and clinic-owner sections use equivalent layout tier (not hidden below excessive scroll vs each other) |
| FR-F04-10 | functional | Page shall include a CTA linking to the Contact route | UR-F04-05 | [BB-01.2](../3-arch/building-blocks.md#bb-01-2) | Given the Services page, when the visitor clicks the Contact CTA, then the Contact route loads |

## FR trace

    ```mermaid
    flowchart LR
        UR01["UR-F04-01"] --> FR01["FR-F04-01"]
        UR01 --> FR02["FR-F04-02"]
        UR01 --> FR03["FR-F04-03"]
        UR01 --> FR04["FR-F04-04"]
        UR01 --> FR05["FR-F04-05"]
        UR02["UR-F04-02"] --> FR03
        UR02 --> FR05
        UR02 --> FR06["FR-F04-06"]
        UR02 --> FR09["FR-F04-09"]
        UR03["UR-F04-03"] --> FR04
        UR03 --> FR05
        UR03 --> FR07["FR-F04-07"]
        UR03 --> FR09
        UR04["UR-F04-04"] --> FR08["FR-F04-08"]
        UR05["UR-F04-05"] --> FR10["FR-F04-10"]
        FR03 --> BB01["BB-01"]
    ```

## UI flow

1. **Потенциальный клиент** opens Services from nav, About/home CTA, or direct URL — F01 shell loads Services content (FR-F04-01).
2. **Потенциальный клиент** reads intro — understands consulting value proposition (FR-F04-02).
3. **Потенциальный клиент** reviews three service pillars — turnkey, ЭКО/ВРТ launch, audit (FR-F04-03–FR-F04-05).
4. **Потенциальный клиент** self-identifies with investor, clinic-owner, or star-doctor segment block (FR-F04-06–FR-F04-09).
5. **Потенциальный клиент** clicks Contact CTA — proceeds to inquiry (FR-F04-10).

**Not in F04:** Contact form (F05); credentials and biography (F03).

**Mockups:** [MCK-04](../4-design/mockups.md#mck-04-services) · Components: [CMP-11](../4-design/design-strategy.md#cmp-11-content-section), [CMP-12](../4-design/design-strategy.md#cmp-12-service-pillar-card), [CMP-13](../4-design/design-strategy.md#cmp-13-audience-segment-block), [CMP-05](../4-design/design-strategy.md#cmp-05-primary-button)

## UI flow diagram

    ```mermaid
    sequenceDiagram
        actor Visitor
        participant Shell as F01 Shell
        participant Services as F04 Services
        Visitor->>Shell: Open /services FR-F04-01
        Shell->>Services: Mount services content
        Visitor->>Services: Read pillars + segment FR-F04-03
        Visitor->>Shell: CTA to Contact FR-F04-10
        Shell->>Shell: Route to Contact F05
    ```

## Runtime flow

1. **[BB-01.1](../3-arch/building-blocks.md#bb-01-1)** — Match `/services` route and render F01 layout (FR-F04-01).
2. **[BB-01.2](../3-arch/building-blocks.md#bb-01-2)** — Load static Services content and compose sections: intro → pillars → segment blocks → CTA (FR-F04-02–FR-F04-10).

## Runtime diagram

    ```mermaid
    sequenceDiagram
        participant Router as BB-01 Router
        participant Layout as F01 Layout
        participant Services as F04 Content
        Router->>Layout: GET /services FR-F04-01
        Layout->>Services: load ServicesPageContent FR-F04-02
        Services-->>Layout: rendered pillars + segments + CTA
    ```

**Notable aspects:** No pricing or online quoting; segment copy uses [glossary](../1-scope/glossary.md) terms; star-doctor block is supporting per scope assumptions.

### ServicesPageContent (static, BB-01.2)

| Attribute | Type | Notes |
|-----------|------|-------|
| intro | string | Safety, speed, experience framing (FR-F04-02) |
| pillars | array | Three service pillar objects (FR-F04-03–FR-F04-05) |
| segments | array | Investor, clinic-owner, star-doctor blocks (FR-F04-06–FR-F04-08) |
| ctaContact | object | Label, route `/contact` (FR-F04-10) |

### ServicePillar (embedded)

| Attribute | Type | Notes |
|-----------|------|-------|
| id | string | `turnkey` \| `ivf-launch` \| `audit` (FR-F04-03–FR-F04-05) |
| title | string | Pillar heading |
| description | string | Scope summary using glossary terms where relevant |
| offerings | array | Bullet deliverables |

### AudienceSegment (embedded)

| Attribute | Type | Notes |
|-----------|------|-------|
| id | string | `investor` \| `clinic-owner` \| `star-doctor` (FR-F04-06–FR-F04-08) |
| prominence | string | `primary` for investor/clinic-owner; `supporting` for star-doctor (FR-F04-09) |
| profile | string | Who this client is |
| painPoints | array | Segment pains from brief |
| linkedPillarIds | array | References to ServicePillar ids |

**Relationships:** `ServicesPageContent` contains 3 `ServicePillar` and 3 `AudienceSegment` entries; segments link to pillars.

**Full model:** [db-and-dfd.md](../4-design/db-and-dfd.md)

## Data diagram

    ```mermaid
    erDiagram
        ServicesPageContent ||--|{ ServicePillar : contains
        ServicesPageContent ||--|{ AudienceSegment : contains
        AudienceSegment }o--o{ ServicePillar : links
        ServicePillar {
            string id
            string title
            string description
        }
        AudienceSegment {
            string id
            string prominence
            string profile
        }
    ```
