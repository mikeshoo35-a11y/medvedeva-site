# Design Strategy

Assumptions, UI intent, screen inventory, and component catalog for the Юлия Медведева consulting marketing site. Design tokens live in [library.md](library.md).

## Assumptions and agreements

| ID | Assumption / agreement | Source | Impact |
|----|------------------------|--------|--------|
| DSA-01 | Russian-only UI and copy at launch; `lang="ru"` on document root | [Assumptions](../1-scope/stakeholders-and-goals.md#assumptions), [ADR-06](../3-arch/solution-strategy.md#adr-06-russian-only-static-content) | All labels, CTAs, form copy, and meta in Russian; no locale switcher |
| DSA-02 | Contact form is the sole public contact channel; owner email and phone are not displayed | [Constraints](../1-scope/stakeholders-and-goals.md#constraints), [NFR-08](../3-arch/solution-strategy.md#nfr-08-privacy) | No mailto/tel links in header, footer, or content; CTAs route to `/contact` only |
| DSA-03 | Premium trust-first visual tone for high-ticket medical-business consulting | [GOL-02](../1-scope/stakeholders-and-goals.md#goals), [Constraints](../1-scope/stakeholders-and-goals.md#constraints) | Generous whitespace, portrait-led hero/About, trust figures, restrained colour palette |
| DSA-04 | Tailwind CSS with tokens defined in `library.md` | [ADR-05](../3-arch/solution-strategy.md#adr-05-tailwind-css-styling) | Component **Looks** cite token names; theme extension mirrors token table |
| DSA-05 | Light theme only at launch; no dark-mode toggle | Scope non-goals (no auth portal complexity) | `--color-surface` backgrounds; no theme switch UI |
| DSA-06 | Mobile-first layout; primary nav collapses at ≤768px | [NFR-02](../3-arch/solution-strategy.md#nfr-02-responsive-layout), [FR-F01-06](../2-features/F01-site-shell-and-navigation.md#functional-requirements) | Desktop horizontal nav; mobile hamburger + drawer; dual-audience blocks stack on narrow viewports |
| DSA-07 | WCAG 2.1 AA baseline for nav, forms, contrast, focus | [NFR-03](../3-arch/solution-strategy.md#nfr-03-accessibility) | Visible focus rings (`--color-focus-ring`); labelled form fields; 4.5:1 text contrast minimum |
| DSA-08 | Equal visual prominence for investor and clinic-owner segments | [Assumptions](../1-scope/stakeholders-and-goals.md#assumptions), [FR-F02-04](../2-features/F02-home-landing-page.md#functional-requirements), [FR-F04-09](../2-features/F04-services-overview.md#functional-requirements) | Side-by-side or equal-weight cards on desktop; star-doctor block uses supporting tier |
| DSA-09 | Portrait photography may be placeholder until assets supplied | [solution-strategy Risks](../3-arch/solution-strategy.md#risks), [FR-F02-07](../2-features/F02-home-landing-page.md#functional-requirements) | Styled placeholder frame preserves layout; swap `portraitUrl` without route changes |

## UI intent

The site presents Юлия Медведева as an international-class medical-business consultant — calm, authoritative, and premium without clinical coldness. Visual direction favours deep teal-navy (`--color-primary`) with warm gold accents (`--color-accent`) on warm off-white surfaces, serif headlines for gravitas and sans-serif body for clarity. Whitespace and structured section rhythm signal high-ticket consulting fit ([GOL-02](../1-scope/stakeholders-and-goals.md#goals)).

Interaction stays understated: primary navigation and CTAs guide the [SCN-01](../1-scope/business-scenarios.md#scn-01-discover-expertise-and-request-consultation) discover path (Home → About/Services → Contact) without distraction. Trust blocks — figures, credentials, geography — are scannable at a glance. The contact form is the conversion endpoint ([GOL-01](../1-scope/stakeholders-and-goals.md#goals)); success and error states are clear and privacy-respecting per [NFR-08](../3-arch/solution-strategy.md#nfr-08-privacy).

Responsive behaviour prioritises reachable nav and readable copy on mobile ([NFR-02](../3-arch/solution-strategy.md#nfr-02-responsive-layout)); performance targets fast first paint on static routes ([NFR-01](../3-arch/solution-strategy.md#nfr-01-performance)). Accessibility is built in — keyboard-navigable menu, labelled inputs, visible focus — not retrofitted ([NFR-03](../3-arch/solution-strategy.md#nfr-03-accessibility)).

## Screen inventory

Every Must-path view from feature **UI flow**. Mockup rows and SVG assets in [mockups.md](mockups.md).

| ID | Screen | Route | Feature(s) | Mockup | Journey |
|----|--------|-------|------------|--------|---------|
| MCK-01 | Site shell — header and footer (desktop) | `*` | F01 | [MCK-01](mockups.md#mck-01-site-shell) | JRN-01 |
| MCK-02 | Home — hero and segment teasers | `/` | F01, F02 | [MCK-02](mockups.md#mck-02-home) | JRN-01 |
| MCK-03 | About — positioning, trust, background | `/about` | F01, F03 | [MCK-03](mockups.md#mck-03-about) | JRN-01 |
| MCK-04 | Services — pillars and audience segments | `/services` | F01, F04 | [MCK-04](mockups.md#mck-04-services) | JRN-01 |
| MCK-05 | Contact — inquiry form | `/contact` | F01, F05 | [MCK-05](mockups.md#mck-05-contact) | JRN-01 |
| MCK-06 | Mobile navigation — drawer open | `*` | F01 | [MCK-06](mockups.md#mck-06-mobile-nav) | JRN-01 |
| MCK-07 | Not found — branded 404 inside shell | `*` | F01 | [MCK-07](mockups.md#mck-07-not-found) | — |

## Component inventory {#component-inventory}

Structured catalog — each component answers **What**, **Looks**, **Behaves**. IDs `CMP-01`…; anchors `#cmp-##-slug`.

### CMP-01: Site Header {#cmp-01-site-header}

**Used in:** F01 · **Screens:** MCK-01, MCK-02–MCK-05, MCK-07

| Aspect | Description |
|--------|-------------|
| **What** | Persistent top chrome: site identity link home, primary nav (Главная, Обо мне, Услуги, Контакты), mobile menu trigger. Establishes premium brand on every route. |
| **Looks** | Full-width bar, height `--header-height` (desktop) / `--header-height-mobile` (mobile). Background `--color-surface`, bottom `--shadow-header`. Identity uses `--font-heading`, `--text-lg`, `--color-primary`. Nav links `--font-body`, `--text-sm`, `--color-text`; active item `--color-primary` with `--color-accent` underline. Inner content constrained to `--max-width-content`, horizontal padding `--space-6`. |
| **Behaves** | Identity click → `/`. Nav items client-route to targets; active item styled per current path ([FR-F01-07](../2-features/F01-site-shell-and-navigation.md#functional-requirements)). At ≤`--breakpoint-md`, nav links hidden; hamburger visible (see CMP-02). Sticky optional; keyboard: Tab through identity → nav → menu button. Focus ring `--color-focus-ring`. |

### CMP-02: Mobile Nav Drawer {#cmp-02-mobile-nav-drawer}

**Used in:** F01 · **Screens:** MCK-06

| Aspect | Description |
|--------|-------------|
| **What** | Collapsible navigation for viewports ≤768px so all primary destinations remain reachable without horizontal scroll. |
| **Looks** | Trigger: icon button in header, `--space-3` padding, `--radius-sm`. Panel: full-width or right-side drawer over `--color-surface`, links stacked with `--space-4` vertical gap, `--text-base` `--font-body`. Overlay scrim `rgba(18, 40, 51, 0.4)`. |
| **Behaves** | Closed by default. Button `aria-expanded` toggles open/closed ([FR-F01-06](../2-features/F01-site-shell-and-navigation.md#functional-requirements)). Open: focus trapped in panel; Escape closes; link click navigates and closes. Transition `--transition-panel`. No owner contact links. |

### CMP-03: Site Footer {#cmp-03-site-footer}

**Used in:** F01 · **Screens:** MCK-01, MCK-02–MCK-05, MCK-07

| Aspect | Description |
|--------|-------------|
| **What** | Bottom chrome repeating primary nav so visitors who scroll past content can still reach all sections. |
| **Looks** | Background `--color-primary-dark`, text `--color-text-inverse` muted to 90% opacity for links. Padding `--space-12` top/bottom. Nav links in a horizontal row (desktop) or wrapped stack (mobile), `--text-sm`, gap `--space-6`. Site name repeated in `--font-heading`. |
| **Behaves** | Same four destinations as header ([FR-F01-04](../2-features/F01-site-shell-and-navigation.md#functional-requirements)). No email/phone. Keyboard-accessible links with focus ring visible on dark background (light outline). |

### CMP-04: Main Content Slot {#cmp-04-main-content-slot}

**Used in:** F01 · **Screens:** MCK-02–MCK-05, MCK-07

| Aspect | Description |
|--------|-------------|
| **What** | Layout region between header and footer where F02–F05 page content mounts. |
| **Looks** | Flex-grow main; max width `--max-width-content`, centered, horizontal padding `--space-6` (mobile) / `--space-8` (desktop). Minimum height fills viewport minus header/footer. |
| **Behaves** | Child routes render inside slot without remounting shell ([FR-F01-03](../2-features/F01-site-shell-and-navigation.md#functional-requirements)). Page scroll is document-level; skip-link target optional for a11y. |

### CMP-05: Primary Button {#cmp-05-primary-button}

**Used in:** F02, F03, F04 · **Screens:** MCK-02–MCK-04

| Aspect | Description |
|--------|-------------|
| **What** | High-emphasis call to action — typically «Связаться» / Contact route — driving [GOL-01](../1-scope/stakeholders-and-goals.md#goals). |
| **Looks** | Background `--color-primary`, text `--color-text-inverse`, `--font-body` `--weight-medium` `--text-sm`, padding `--space-3` `--space-6`, `--radius-md`. Hover: `--color-primary-dark`. Min touch target 44×44px. |
| **Behaves** | Navigates to `/contact` ([FR-F02-05](../2-features/F02-home-landing-page.md#functional-requirements), [FR-F03-07](../2-features/F03-about-and-trust-content.md#functional-requirements), [FR-F04-10](../2-features/F04-services-overview.md#functional-requirements)). Focus visible. Optional `aria-label` when label alone is insufficient. |

### CMP-06: Secondary Button {#cmp-06-secondary-button}

**Used in:** F02, F03 · **Screens:** MCK-02, MCK-03

| Aspect | Description |
|--------|-------------|
| **What** | Lower-emphasis CTA to About or Services — continues discover path without competing with primary Contact action. |
| **Looks** | Outline: `1px solid --color-primary`, text `--color-primary`, transparent background. Same typography and radius as CMP-05. Hover: background `--color-accent-muted`. |
| **Behaves** | Navigates to `/about` or `/services` ([FR-F02-06](../2-features/F02-home-landing-page.md#functional-requirements)). Keyboard and hover states mirror CMP-05. |

### CMP-07: Hero Block {#cmp-07-hero-block}

**Used in:** F02 · **Screens:** MCK-02

| Aspect | Description |
|--------|-------------|
| **What** | Above-the-fold home positioning: name, headline, subhead on ВРТ/ЭКО expertise, geography line, portrait, CTAs. |
| **Looks** | Two-column on desktop (copy left, portrait right); stacked on mobile. Headline `--font-heading` `--text-4xl` (desktop) / `--text-hero-mobile` (mobile), `--color-primary`. Subhead and geography `--text-lg` `--color-text-muted`. Vertical padding `--space-16`. Portrait via CMP-09. CTAs row with `--space-4` gap. |
| **Behaves** | Static content from `HomePageContent` ([FR-F02-02](../2-features/F02-home-landing-page.md#functional-requirements)–FR-F02-03). CTAs use CMP-05/06. No carousel or animation required for MVP. |

### CMP-08: Segment Teaser Pair {#cmp-08-segment-teaser-pair}

**Used in:** F02 · **Screens:** MCK-02

| Aspect | Description |
|--------|-------------|
| **What** | Dual-audience value hooks — investor (turnkey clinic) and clinic owner (IVF/ART launch) — with equal weight at entry. |
| **Looks** | Two cards side-by-side (desktop) or stacked (mobile). Background `--color-surface-alt`, border `1px --color-accent-muted`, `--radius-lg`, padding `--space-6`, `--shadow-card`. Titles `--text-2xl` `--font-heading`; body `--text-base`. Equal width columns at ≥`--breakpoint-md`. |
| **Behaves** | Read-only teasers; no expand/collapse. Content from `investorHook` and `clinicOwnerHook` ([FR-F02-04](../2-features/F02-home-landing-page.md#functional-requirements)). |

### CMP-09: Portrait Frame {#cmp-09-portrait-frame}

**Used in:** F02, F03 · **Screens:** MCK-02, MCK-03

| Aspect | Description |
|--------|-------------|
| **What** | Premium consultant portrait or styled placeholder — humanises trust positioning on Home and About. |
| **Looks** | Aspect ratio 3:4, `--radius-lg`, overflow hidden. Image `object-fit: cover`. Placeholder: `--color-surface-alt` fill with subtle `--color-accent` border and initials or silhouette icon in `--color-text-muted`. Max width ~320px on desktop. |
| **Behaves** | Renders `portraitUrl` when set; otherwise placeholder without layout shift ([FR-F02-07](../2-features/F02-home-landing-page.md#functional-requirements), [FR-F03-08](../2-features/F03-about-and-trust-content.md#functional-requirements)). Decorative — empty `alt` if adjacent text names consultant; otherwise meaningful `alt` with name. |

### CMP-10: Trust Figures Grid {#cmp-10-trust-figures-grid}

**Used in:** F03 · **Screens:** MCK-03

| Aspect | Description |
|--------|-------------|
| **What** | Four scannable credibility stats (e.g. 10+ лет, проекты, география) validating expertise before contact. |
| **Looks** | Four cells in 2×2 grid (mobile) or 4-column row (desktop). Numeral/label `--font-heading` `--text-3xl` `--color-accent`; description `--text-sm` `--color-text-muted`. Section background `--color-surface-alt`, padding `--space-section`. |
| **Behaves** | Static from `trustFigures` array ([FR-F03-03](../2-features/F03-about-and-trust-content.md#functional-requirements)). No interaction. |

### CMP-11: Content Section {#cmp-11-content-section}

**Used in:** F03, F04 · **Screens:** MCK-03, MCK-04

| Aspect | Description |
|--------|-------------|
| **What** | Reusable heading + prose block for narrative sections (background, mission, services intro). |
| **Looks** | H2 `--font-heading` `--text-3xl` `--color-primary`, margin bottom `--space-6`. Prose max `--max-width-prose`, `--text-base` `--color-text`, paragraph spacing `--space-4`. Alternating sections may use `--color-surface-alt` full-bleed background. |
| **Behaves** | Static text. Semantic heading hierarchy (single H1 per page in hero/positioning; sections use H2). |

### CMP-12: Service Pillar Card {#cmp-12-service-pillar-card}

**Used in:** F04 · **Screens:** MCK-04

| Aspect | Description |
|--------|-------------|
| **What** | One of three offering pillars: turnkey clinic, ЭКО/ВРТ launch, audit — with title, description, bullet deliverables. |
| **Looks** | Card `--color-surface`, `--shadow-card`, `--radius-lg`, padding `--space-6`. Title `--text-2xl` `--font-heading`. Bullets `--text-base` with `--space-2` between items. Three-column grid desktop; stacked mobile. |
| **Behaves** | Static content from `ServicePillar` ([FR-F04-03](../2-features/F04-services-overview.md#functional-requirements)–FR-F04-05). No accordion in MVP. |

### CMP-13: Audience Segment Block {#cmp-13-audience-segment-block}

**Used in:** F04 · **Screens:** MCK-04

| Aspect | Description |
|--------|-------------|
| **What** | Segment-specific block (investor, clinic owner, star doctor) with profile, pain points, linked pillars. |
| **Looks** | Primary segments (investor, clinic-owner): equal layout tier — full-width cards or two-column, `--space-8` between. Star-doctor: supporting tier — slightly smaller `--text-xl` heading or single-column below primaries ([FR-F04-09](../2-features/F04-services-overview.md#functional-requirements)). Border-left accent `3px --color-accent`. |
| **Behaves** | Static. Pain points as bullet list. No tabs — all segments visible on scroll. |

### CMP-14: Contact Form {#cmp-14-contact-form}

**Used in:** F05 · **Screens:** MCK-05

| Aspect | Description |
|--------|-------------|
| **What** | Inquiry capture — name, email, optional phone, message — sole conversion form for [GOL-01](../1-scope/stakeholders-and-goals.md#goals). |
| **Looks** | Single column, max width `--max-width-prose`. Intro text `--text-lg` above fields. Submit uses CMP-05 styling full-width on mobile. Hidden honeypot field not visible (off-screen, `aria-hidden`). Spacing `--space-6` between fields. |
| **Behaves** | Client validation on submit ([FR-F05-03](../2-features/F05-contact-inquiry-capture.md#functional-requirements)–FR-F05-04). POST to `/api/contact`; loading state disables submit. Success/error via CMP-16. Honeypot filled → silent reject per [ADR-04](../3-arch/solution-strategy.md#adr-04-honeypot-and-rate-limiting). |

### CMP-15: Form Field {#cmp-15-form-field}

**Used in:** F05 · **Screens:** MCK-05

| Aspect | Description |
|--------|-------------|
| **What** | Labelled input or textarea for contact form fields. |
| **Looks** | Label `--text-sm` `--weight-medium` `--color-text`, margin bottom `--space-2`. Input border `1px --color-border`, `--radius-sm`, padding `--space-3`, `--font-body` `--text-base`. Error state border `--color-error`. Textarea min-height 8rem. |
| **Behaves** | Associated `<label for>` and `id`. Required fields marked visually and with `required` / `aria-required`. Inline error message below field in `--color-error` `--text-sm`. Focus ring `--color-focus-ring`. Phone field optional. |

### CMP-16: Form Status Message {#cmp-16-form-status-message}

**Used in:** F05 · **Screens:** MCK-05

| Aspect | Description |
|--------|-------------|
| **What** | Post-submit confirmation or retryable error feedback. |
| **Looks** | Success: `--color-success` text, optional light green background tint. Error: `--color-error` with retry guidance. `--text-base`, padding `--space-4`, `--radius-md`. `role="status"` or `role="alert"`. |
| **Behaves** | Shown after API response ([FR-F05-07](../2-features/F05-contact-inquiry-capture.md#functional-requirements)–FR-F05-08). Success replaces or appears above form; error allows resubmit. Focus moved to message for screen readers. |

### CMP-17: Not Found Content {#cmp-17-not-found-content}

**Used in:** F01 · **Screens:** MCK-07

| Aspect | Description |
|--------|-------------|
| **What** | Branded 404 message inside shell for unknown routes. |
| **Looks** | Centered in main slot. Headline `--text-3xl` `--font-heading`; body `--text-base` `--color-text-muted`. Link back home uses CMP-06 style. |
| **Behaves** | Renders inside F01 layout ([F01 Notable aspects](../2-features/F01-site-shell-and-navigation.md#runtime-flow)). Home link via nav or inline CTA. HTTP 404 status from router. |

## Layout patterns {#layout-patterns}

| Pattern | Description | Feature |
|---------|-------------|---------|
| Shell + page | CMP-01 header, CMP-04 main, CMP-03 footer wrap every marketing route | F01 |
| Hero + teasers + CTA | CMP-07 hero with CMP-09 portrait, CMP-08 segment pair, CMP-05/06 CTAs | F02 |
| Positioning → trust → narrative | CMP-09 + CMP-11 positioning, CMP-10 figures, stacked CMP-11 sections, footer CTAs | F03 |
| Intro → pillars → segments → CTA | CMP-11 intro, CMP-12 grid, CMP-13 blocks (tiered prominence), CMP-05 | F04 |
| Form-centric page | CMP-11 short intro, CMP-14 form with CMP-15 fields, CMP-16 feedback | F05 |
| Dual-audience equal weight | Two CMP-08 or CMP-13 primary blocks side-by-side ≥768px; stacked below | F02, F04 |
