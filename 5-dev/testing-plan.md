# Testing Plan

| ID | Title | Traces to | Type | Status |
|----|-------|-----------|------|--------|
| TC-01 | Site shell layout and navigation | [BL-01](backlog.md#bl-01) | E2E | Ready |
| TC-02 | Mobile navigation drawer | [BL-02](backlog.md#bl-02) | E2E | Ready |
| TC-03 | Home landing page content and CTAs | [BL-03](backlog.md#bl-03) | E2E | Draft |
| TC-04 | About page trust content and CTAs | [BL-04](backlog.md#bl-04) | E2E | Draft |
| TC-05 | Services pillars, segments, and CTA | [BL-05](backlog.md#bl-05) | E2E | Draft |
| TC-06 | Contact form UI and client validation | [BL-06](backlog.md#bl-06) | E2E | Implemented |
| TC-07 | Contact API, notification, and anti-abuse | [BL-07](backlog.md#bl-07) | Integration | Implemented |

## TC-01: Site shell layout and navigation {#tc-01}

**Traces to:** [FR-F01-01](../2-features/F01-site-shell-and-navigation.md#functional-requirements), [FR-F01-02](../2-features/F01-site-shell-and-navigation.md#functional-requirements), [FR-F01-03](../2-features/F01-site-shell-and-navigation.md#functional-requirements), [FR-F01-04](../2-features/F01-site-shell-and-navigation.md#functional-requirements), [FR-F01-07](../2-features/F01-site-shell-and-navigation.md#functional-requirements) · **Backlog:** [BL-01](backlog.md#bl-01)

**Steps:**
1. Open `/` in a desktop viewport (≥768px).
2. Verify header shows site identity «Юлия Медведева» and four nav links (Главная, Обо мне, Услуги, Контакты).
3. Click each header nav item and assert the target route loads with shell intact.
4. On `/about`, assert the About nav item is visually active.
5. Scroll to footer and click each footer nav link; assert routes load.
6. Click header identity; assert navigation to `/`.
7. Navigate to `/nonexistent-path`; assert branded 404 inside shell with link to home.

**Expected:** All primary destinations reachable from header and footer; child pages render in main slot; active route indicated; unknown routes show MCK-07-style not-found.

## TC-02: Mobile navigation drawer {#tc-02}

**Traces to:** [FR-F01-06](../2-features/F01-site-shell-and-navigation.md#functional-requirements) · **Backlog:** [BL-02](backlog.md#bl-02)

**Steps:**
1. Set viewport to 375px width.
2. Open any page; assert horizontal nav links are hidden and hamburger control is visible.
3. Open the mobile menu drawer.
4. Select each of the four destinations from the drawer.
5. Assert each route loads without horizontal page scroll.

**Expected:** All primary destinations reachable via mobile drawer at ≤768px (MCK-06).

## TC-03: Home landing page content and CTAs {#tc-03}

**Traces to:** [FR-F02-01](../2-features/F02-home-landing-page.md#functional-requirements) through [FR-F02-07](../2-features/F02-home-landing-page.md#functional-requirements) · **Backlog:** [BL-03](backlog.md#bl-03)

**Steps:**
1. Open `/` on desktop viewport.
2. Assert hero shows consultant name, medical-business headline, and ВРТ/ЭКО subhead above the fold.
3. Assert geography mentions Россия, Казахстан, and Узбекистан.
4. Assert investor and clinic-owner segment teasers are present with comparable visual weight.
5. Click primary CTA «Связаться»; assert `/contact` loads.
6. Return to home; click About and Services secondary CTAs; assert `/about` and `/services` load.
7. With no portrait asset configured, assert placeholder frame does not break layout.

**Expected:** Home content matches MCK-02 and all FR-F02 acceptance criteria.

## TC-04: About page trust content and CTAs {#tc-04}

**Traces to:** [FR-F03-01](../2-features/F03-about-and-trust-content.md#functional-requirements) through [FR-F03-08](../2-features/F03-about-and-trust-content.md#functional-requirements) · **Backlog:** [BL-04](backlog.md#bl-04)

**Steps:**
1. Open `/about`.
2. Assert positioning section shows name, portrait area, expert headline, 10+ years, and ВРТ/ЭКО specialization.
3. Assert four trust figures are visible without scrolling past the figures block.
4. Assert background narrative mentions clinician path and business metrics (P&L, EBITDA, ROI).
5. Assert mission block is present.
6. Assert geography names RF, KZ, UZ and references EU approaches.
7. Click Services and Contact CTAs; assert routes load.
8. With no portrait URL, assert styled placeholder preserves layout.

**Expected:** About content matches MCK-03 and all FR-F03 acceptance criteria.

## TC-05: Services pillars, segments, and CTA {#tc-05}

**Traces to:** [FR-F04-01](../2-features/F04-services-overview.md#functional-requirements) through [FR-F04-10](../2-features/F04-services-overview.md#functional-requirements) · **Backlog:** [BL-05](backlog.md#bl-05)

**Steps:**
1. Open `/services` on desktop viewport.
2. Assert intro covers investment safety, launch speed, and experienced guidance.
3. Assert three distinct pillars: turnkey clinic, ЭКО/ВРТ launch, audit/advisory.
4. Assert investor segment block names pain points and references relevant pillars.
5. Assert clinic-owner segment block names pain points and references relevant pillars.
6. Assert star-doctor segment is present with lower prominence than investor and clinic-owner blocks.
7. Assert investor and clinic-owner sections use equivalent layout tier on desktop.
8. Click Contact CTA; assert `/contact` loads.

**Expected:** Services content matches MCK-04 and all FR-F04 acceptance criteria.

## TC-06: Contact form UI and client validation {#tc-06}

**Traces to:** [FR-F05-01](../2-features/F05-contact-inquiry-capture.md#functional-requirements), [FR-F05-02](../2-features/F05-contact-inquiry-capture.md#functional-requirements), [FR-F05-03](../2-features/F05-contact-inquiry-capture.md#functional-requirements), [FR-F05-04](../2-features/F05-contact-inquiry-capture.md#functional-requirements), [FR-F05-07](../2-features/F05-contact-inquiry-capture.md#functional-requirements), [FR-F05-08](../2-features/F05-contact-inquiry-capture.md#functional-requirements), [FR-F05-10](../2-features/F05-contact-inquiry-capture.md#functional-requirements) · **Backlog:** [BL-06](backlog.md#bl-06)

**Steps:**
1. Open `/contact`.
2. Assert intro copy invites consulting inquiries and four fields (Имя, Email, Телефон, Сообщение) with Russian labels are present.
3. Submit with all fields empty; assert validation blocks submit and names required fields.
4. Enter invalid email format; assert validation error and no submit.
5. With API mocked to succeed, submit valid form; assert success message without internal error details.
6. With API mocked to fail, submit valid form; assert generic error message and preserved field values.

**Expected:** Contact UI matches MCK-05; client validation and feedback states per FR-F05-01–04, 07, 08, 10.

## TC-07: Contact API, notification, and anti-abuse {#tc-07}

**Traces to:** [FR-F05-05](../2-features/F05-contact-inquiry-capture.md#functional-requirements), [FR-F05-06](../2-features/F05-contact-inquiry-capture.md#functional-requirements); [NFR-04](../3-arch/solution-strategy.md#nfr-04-security) · **Backlog:** [BL-07](backlog.md#bl-07)

**Steps:**
1. POST valid `ContactInquiry` payload to `/api/contact`; assert 200 response.
2. Assert EVT-01 payload includes name, email, phone (if provided), message, and `submittedAt`.
3. Assert Resend sends notification to `medvedeva19889@gmail.com` with inquiry fields (mock or test inbox).
4. POST with honeypot field filled; assert rejection without email sent.
5. POST repeatedly from same IP beyond rate limit; assert error response without email sent.

**Expected:** API behaviour matches RT-01/RT-02; owner notification per FR-F05-05/06; honeypot and rate limit per ADR-04.
