# 📋 Pillar 1: Product Requirements Document (PRD) — God Mode SaaS ABM SDR

## 1. Executive Summary & Value Proposition
**God Mode SaaS ABM SDR** is an enterprise-grade, consultative Account-Based Sales Development engine. Tailored specifically for complex B2B SaaS solutions with contract values $\ge \$10,000$ ACV and sales cycles spanning 3 to 9 months, it replaces high-volume spam tactics with account-centric orchestration, Neil Rackham's SPIN Selling methodology, Chris Voss negotiation tactics, and an omnichannel tri-touch execution model (LinkedIn, Consultative Email, Phone/Voicemail).

Its primary objective is not simply generating activity, but booking **BANT-Qualified Sales Appointments (SQAs)** for Account Executives (AEs) while strictly protecting domain reputation and customer trust.

---

## 2. Target Persona & Commercial Scope
- **Deal Economics**:
  - Minimum Deal Floor: **$10,000 ACV / ARR**.
  - Target Market: Mid-Market (150–1,000 employees) and Enterprise (1,000–10,000+ employees).
  - Average Sales Cycle: **90 to 270 days** (Consensus-driven, multi-stakeholder).
- **Primary Users & Stakeholders**:
  - **Account Executives (AEs)**: Benefit from highly qualified, BANT-verified meetings with detailed account dossiers.
  - **SDR / BDR Managers & Sales Leadership**: Gain visibility into committee coverage, qualification integrity, and conversion velocity.
  - **Prospect Buying Committee**: Engaged with consultative, high-value problem analysis rather than generic feature pitches.

---

## 3. Core Capabilities & Feature Requirements

### Feature 1: Decoupled Tri-Vector Qualification Engine
Replaces single-score assumptions with three distinct, non-conflated dimensions:
1. **ICP Fit (0–100)**: Firmographics, target tech stack, geographic compliance, minimum employee and revenue thresholds.
2. **Buying Priority / Timing (0–100)**: Fresh hiring spikes in relevant pain areas, tech migrations, regulatory deadlines, and first-party intent signals.
3. **Epistemic Confidence (0–100%)**: Completeness of primary, dated source citations. 
   - *Gating Rule*: Accounts with $< 75\%$ confidence are blocked from outbound until research gaps are resolved. Missing data never inflates priority.

### Feature 2: Asynchronous Pre-Computed SPIN Engine
Translates Neil Rackham’s SPIN Selling research into high-converting asynchronous touchpoints:
- **[S] Situation**: Autonomously pre-researched prior to outreach. Zero lazy discovery questions.
- **[P] Problem**: Identifies latent operational friction from observable tech stack and hiring indicators.
- **[I] Implication**: Quantifies the business, financial, or regulatory impact (loss aversion framing, 2x–2.5x impact).
- **[N] Need-Payoff**: Concludes with low-friction, interest-based, or "No"-oriented inquiries (Chris Voss).

### Feature 3: Strict BANT Calendar Gating (Sales Qualified Appointments)
An appointment is only booked into an AE's calendar when all four BANT criteria are verified:
- **Budget**: Financial viability verified ($\ge \$10\text{k}$ ACV capacity via headcount, tech spend footprint, or funding tier).
- **Authority**: Buying committee mapped with at least one verified Champion and identified Economic Buyer.
- **Need**: Active business friction and compelling event explicitly verified within the last 60 days.
- **Timeframe**: Stated or verified implementation milestone within the next **6 months**.
*Deliverable*: Every scheduled meeting must generate an automated **BANT AE Handoff Dossier**.

### Feature 4: Omnichannel Tri-Touch Cadence (LinkedIn + Email + Phone/Voicemail)
Choreographs a synchronized 28-day cadence across 3 touchpoints:
- **LinkedIn**: Soft awareness (profile views, post comments) $\rightarrow$ Contextual connection notes ($<200$ chars) $\rightarrow$ Conversational InMails.
- **Consultative Email**: Pre-computed SPIN emails strictly under 75 words (5th-grade reading level, mobile-optimized) and 1-page "Trojan Horse" architecture teardowns.
- **Phone & Voicemail**: 15-second cold call hooks using pattern interrupts, real-time objection handling matrices, and 20-second Voss-style voicemails.

### Feature 5: Calendar, Seasonality & OOO Intelligence Engine
- **Geo-Holiday & Bank Holiday Awareness**: Automatically pauses outreach during regional bank holidays, national vacations, and school half-terms based on recipient location.
- **Industry Code Freeze Detection**: Automatically throttles technical pitches to retail/e-commerce during Q4 holiday freezes (Oct 20 – Jan 5).
- **Out-of-Office (OOO) Harvester**: Automatically extracts return dates to reschedule follow-ups, and captures named delegates to discover new buying committee members.

---

## 4. Guardrails, Safety & Out-of-Scope (Non-Goals)
- **Draft Only / Prohibited Dispatch**: The skill creates email drafts, LinkedIn message drafts, and call battlecards. **Autonomous sending or calling without human approval is strictly prohibited.**
- **Suppression Immutability**: Active CRM opportunities, existing customers, partner accounts, and opt-out lists take absolute priority and immediately halt outreach.
- **Anti-Prompt-Injection Defense**: External scraped data (job boards, corporate websites) is treated as untrusted text and filtered through an adversarial sanitizer.
- **No Transactional Churn**: Deals under $10,000 ACV are disqualified or routed to self-serve flows.
