# Stakeholders and Goals

## Stakeholders

| ID | Name | Role | Interest | Influence |
|----|------|------|----------|-----------|
| STK-01 | Юлия Медведева | Site owner; medical business consultant (CEO / managing partner, 10+ years) | Inbound consulting leads; credible expert positioning in IVF/ART and turnkey clinics | High |
| STK-02 | Инвесторы из непрофильных сфер | Potential client — entrepreneurs, funds, family offices entering private medicine | Safe investment in a turnkey clinic; business-plan and equipment audit; licensing and design oversight | High |
| STK-03 | Владельцы действующих клиник | Potential client — owners of multi-specialty centers in RF, KZ, UZ scaling into IVF/ART | Launch IVF department; embryology lab setup; licensing, pricing, and operations | High |
| STK-04 | Практикующие врачи-эксперты | Potential client — leading OB/GYN / reproductive specialists opening own clinic | Turn clinical reputation into a clinic business with investor partner | Medium |

## Goals

| ID | Goal | Success Metric | Stakeholder(s) | Priority |
|----|------|----------------|----------------|----------|
| GOL-01 | Generate inbound contact inquiries for consulting engagements | Monthly count of contact-form submissions | STK-02, STK-03, STK-04 | Must |
| GOL-02 | Visitor understands expertise, geography, and service fit before contacting | Visitor can articulate why to contact (qualitative review); completes About + services path without dead ends | STK-01, STK-02, STK-03 | Must |

## Goal map

    ```mermaid
    flowchart LR
        STK02["STK-02 Investors"] --> G1["GOL-01"]
        STK03["STK-03 Clinic owners"] --> G1
        STK04["STK-04 Star doctors"] --> G1
        G1 --> SCN01["SCN-01"]
        G2["GOL-02"] --> SCN01
        STK01["STK-01 Medvedeva"] --> G2
        G2 --> F02["F02 Home"]
        G2 --> F03["F03 About"]
        G2 --> F04["F04 Services"]
        G1 --> F05["F05 Contact"]
        F01["F01 Shell"] --> F02
        F01 --> F03
        F01 --> F04
        F01 --> F05
    ```

## Non-Goals

- Blog or expert articles (content marketing / SEO hub)
- Client portal or authenticated area
- Online appointment booking or payment processing
- English localization at launch
- Direct patient-facing medical services on the site

## Assumptions

- Site UI and copy are **Russian only** at launch; EU market experience is cited for credibility, not as a separate locale.
- Equal messaging priority for **investors (STK-02)** and **clinic owners (STK-03)**; star doctors (STK-04) are a third, supporting segment.
- Sales continue **offline** after inbound contact (calls, meetings, proposals).
- Geography of referenced projects: Russia, Kazakhstan, Uzbekistan; European approaches cited where relevant.
- **Owner notification inbox:** `medvedeva19889@gmail.com` — receives Resend emails from form submits; **not displayed** on the public site.

## Constraints

- **Marketing site only** — no transactional or clinical workflows in v1.
- **Contact channel at launch:** contact form only — no visible owner email or phone on the site.
- Premium business positioning: trust blocks (figures, credentials, international scope) must support high-ticket consulting.
