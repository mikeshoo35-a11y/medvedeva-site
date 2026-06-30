# Design Library

Shared visual language for the Юлия Медведева consulting marketing site. Component catalog: [design-strategy.md](design-strategy.md#component-inventory).

Mapped to Tailwind theme extension per [ADR-05](../3-arch/solution-strategy.md#adr-05-tailwind-css-styling).

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#1B3A4B` | Header background tint, primary buttons, active nav indicator, key headings accent |
| `--color-primary-dark` | `#122833` | Button hover, footer background |
| `--color-accent` | `#C9A962` | Premium highlights, trust-figure numerals, secondary emphasis borders |
| `--color-accent-muted` | `#E8DCC4` | Subtle card borders, segment-teaser backgrounds |
| `--color-surface` | `#FFFFFF` | Page background, card surfaces |
| `--color-surface-alt` | `#F7F5F2` | Alternating section backgrounds, placeholder portrait fill |
| `--color-text` | `#1A1A1A` | Body copy |
| `--color-text-muted` | `#5C5C5C` | Supporting lines, footer legal, form hints |
| `--color-text-inverse` | `#FFFFFF` | Text on primary buttons and dark footer |
| `--color-border` | `#E2DDD6` | Form fields, card dividers, header bottom border |
| `--color-error` | `#B42318` | Field validation errors, form failure message |
| `--color-success` | `#027A48` | Form success confirmation text |
| `--color-focus-ring` | `#3B82F6` | Keyboard focus outline (WCAG contrast) |
| `--font-heading` | `'Cormorant Garamond', Georgia, serif` | H1–H3, hero headline, trust-figure labels |
| `--font-body` | `'Inter', system-ui, sans-serif` | Body, nav, buttons, form labels |
| `--text-xs` | `0.75rem / 1rem` | Footer fine print, form hints |
| `--text-sm` | `0.875rem / 1.25rem` | Nav links, button labels, trust-figure descriptions |
| `--text-base` | `1rem / 1.6` | Body paragraphs |
| `--text-lg` | `1.125rem / 1.75` | Intro leads, subheads |
| `--text-xl` | `1.25rem / 1.75` | Section intros |
| `--text-2xl` | `1.5rem / 2rem` | H3, card titles |
| `--text-3xl` | `1.875rem / 2.25rem` | H2, segment block headings |
| `--text-4xl` | `2.25rem / 2.5rem` | Hero headline (desktop) |
| `--text-hero-mobile` | `1.75rem / 2.25rem` | Hero headline at ≤768px |
| `--weight-regular` | `400` | Body |
| `--weight-medium` | `500` | Nav, labels |
| `--weight-semibold` | `600` | Buttons, trust numerals |
| `--weight-bold` | `700` | H1 emphasis |
| `--space-1` | `0.25rem` | Tight inline gaps |
| `--space-2` | `0.5rem` | Icon gaps, compact stacks |
| `--space-3` | `0.75rem` | Form field internal padding |
| `--space-4` | `1rem` | Card padding (mobile), stack gaps |
| `--space-6` | `1.5rem` | Section inner padding (mobile) |
| `--space-8` | `2rem` | Section vertical rhythm |
| `--space-12` | `3rem` | Section padding (desktop) |
| `--space-16` | `4rem` | Hero vertical padding |
| `--space-section` | `5rem` | Major section separation (desktop) |
| `--radius-sm` | `4px` | Inputs, small chips |
| `--radius-md` | `8px` | Cards, buttons |
| `--radius-lg` | `12px` | Portrait frame, segment cards |
| `--shadow-card` | `0 2px 8px rgba(27, 58, 75, 0.08)` | Service pillar and segment cards |
| `--shadow-header` | `0 1px 0 var(--color-border)` | Sticky header separation |
| `--max-width-content` | `72rem` | Main content column (`max-w-6xl` equivalent) |
| `--max-width-prose` | `42rem` | Long-form narrative blocks |
| `--breakpoint-md` | `768px` | Mobile ↔ desktop nav switch per [NFR-02](../3-arch/solution-strategy.md#nfr-02-responsive-layout) |
| `--header-height` | `4rem` | Desktop header bar |
| `--header-height-mobile` | `3.5rem` | Mobile header bar |
| `--transition-fast` | `150ms ease` | Hover, focus colour shifts |
| `--transition-panel` | `250ms ease-out` | Mobile nav drawer open/close |
