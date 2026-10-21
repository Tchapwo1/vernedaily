# 📋 Pillar 1: Product Requirements Document (PRD) — Evidence-Led Account Intelligence & Pipeline Creation Engine

## 1. Executive Summary & Value Proposition
The **Evidence-Led Account Intelligence & Pipeline Creation Engine** is an enterprise-grade platform designed to help B2B SaaS teams create qualified, high-ticket pipeline ($\ge \$10,000$ to $\$150,000+$ ACV) across long, multi-stakeholder sales cycles (3 to 9 months). 

Rather than functioning as another high-volume email generator or basic contact scraper, this engine separates **Account Intelligence** from **Execution**. It ensures sales teams focus their finite capacity on the right accounts, engage the right stakeholders with audited, evidence-backed problem hypotheses, respect strict contact policies, and hand over progressively qualified opportunities to Account Executives (AEs) with explicit unknowns and recommended validation questions.

---

## 2. Target Persona & Commercial Scope
- **Deal Economics**:
  - Minimum Deal Floor: **$10,000 ACV / ARR**.
  - Target Market: Mid-Market (100–1,000 employees) and Enterprise (1,000–10,000+ employees).
  - Average Sales Cycle: **90 to 270 days** (Consensus-driven, multi-stakeholder).
- **Primary Users & Stakeholders**:
  - **Account Executives (AEs)**: Receive high-conviction, evidence-backed account dossiers with verified pain hypotheses and explicit qualification gaps.
  - **SDR / BDR Teams & Enablement**: Cut manual research time from 45 minutes to 3 minutes while eliminating cold-calling/emailing guesswork.
  - **Sales Leadership & RevOps**: Protect CRM hygiene, eliminate territory collision, enforce legal compliance, and maximize pipeline yield per rep.
  - **Target Buyers (CISOs, VPs of Eng, Technical Evaluators)**: Receive respectful, diagnostic, problem-centered communication rather than generic sales pitches.

---

## 3. Core Capabilities & Architectural Pillars

### Feature 1: The 6-Stage Execution Engine
The engine enforces a strict separation between intelligence, decision-making, and action:
1. **Account Discovery**: Evaluates account universe against ICP criteria, exclusions, and active territory ownership.
2. **Evidence Engine**: Ingests, timestamps, and verifies raw observations (job postings, SEC filings, telemetry, tech footprints) with strict decay half-lives.
3. **Opportunity Decision Gate**: Applies uncertainty-aware gating to commit every account into one of four operational states:
   - `Pursue`: Strong fit and sufficient timely evidence of operational friction.
   - `Research more`: High fit, but a critical factual gap must be resolved before outreach.
   - `Monitor`: High fit without an active buying trigger; rechecks on signal change.
   - `Disqualify`: Clear mismatch, negative evidence, or permanent hard exclusion.
4. **Dynamic Stakeholder Mapping**: Maps active and latent stakeholders organically based on deal size and technical domain, rather than forcing a rigid committee headcount.
5. **Sales Play Selection & Contact Policy**: Formulates tailored diagnostic hypotheses, checks local timezones and frequency limits, and generates human-reviewable drafts.
6. **Outcome Learning**: Tracks downstream results (replies, held meetings, pipeline generated, false positives) to calibrate signal weights over time.

### Feature 2: Evidence Provenance & Signal Decay
Every material assertion must be backed by a structured evidence record:
- **Primary Citations**: Source URL, publication/observation date, exact supporting verbatim passage, and source category.
- **Ontological Discipline**: Absolute separation between **Verified Facts**, **Inferences** (with confidence rating), and **Working Hypotheses**.
- **Signal Decay Half-Lives**: 
  - Job Postings: 45 days.
  - Executive/Leadership Moves: 90 days.
  - Public Cloud/Tech Telemetry: 120 days.
  - Financial & SEC Filings: 180 days.
  - Signals past their decay window automatically trigger re-verification.

### Feature 3: Action-Priority Scoring Metric
Scoring is decoupled into three independent diagnostic vectors plus an actionable economic priority:
1. **ICP Fit (0–100)**: Firmographics, tech stack compatibility, and economic viability floor.
2. **Buying Momentum (0–100)**: Recency, relevance, and strength of observable friction signals.
3. **Evidence Confidence (0–100%)**: Proportion of claims backed by primary dated sources.
4. **Action-Priority ($V_{\text{expected}}$)**:
   $$V_{\text{expected}} = \Big( \text{ICP Fit} \times \text{Buying Momentum} \times \text{Expected ACV} \times \text{Confidence} \Big) - \text{Pursuit Cost}$$
   *Accounts are ranked by expected commercial value adjusted for uncertainty, not by raw vanity scores.*

### Feature 4: Progressive Evidence-Based Qualification (Replacing Rigid BANT)
Recognizing that early-stage enterprise buyers rarely disclose all four BANT parameters upfront, the engine replaces rigid gating with progressive qualification.
For each qualification dimension (**Budget**, **Authority**, **Need**, **Timeframe**), the engine tracks:
- **Status**: `verified`, `inferred`, `unknown`, or `contradicted`.
- **Evidence Reference**: Linking directly to the supporting evidence assertion.
- **Validation Question**: A tailored diagnostic question for the AE to ask during discovery to validate or invalidate the dimension.
*Deliverable*: An automated **Progressive Qualification Dossier** generated whenever evidence justifies a sales conversation.

### Feature 5: Dynamic Stakeholder Graph
Replaces fixed stakeholder quotas with an account-specific buying group graph:
- **Roles Identified**: Champion / Mobilizer, Economic Buyer, Technical Evaluator, Blocker, End User.
- **Attributes Tracked**: Verified vs. inferred title, influence level, decision criteria, relationship strength, and missing coverage.
- **No-Invention Rule**: Stakeholders are only added when supported by verified professional evidence.

### Feature 6: Timezone-Aware Contact Policy Engine
Replaces naive holiday calendars with a comprehensive contact governance engine (`contact-policy.json`):
- **Recipient Working Hours**: Restricts outreach to 08:30–17:30 in the recipient's local timezone (Tuesday–Thursday optimized; Friday afternoons suppressed).
- **Statutory Public Holidays**: Respects official national bank holidays (US, GB, DE, etc.).
- **Frequency Capping**: Maximum 2 touches per week per contact; maximum 2 touches per day across the entire target account.
- **Jurisdiction Compliance**: Enforces statutory requirements per region (e.g., German UWG §7 email restrictions, UK PECR corporate subscriber rules, US CAN-SPAM).
- **Out-of-Office (OOO) Intelligence**: Parses explicit return dates to reschedule follow-ups, and extracts named delegates as provisional stakeholders.

### Feature 7: Inbound Reply-Triage & Recovery System
Automates response generation for real-world prospect replies:
- **"Send me info / 1-pager"**: Immediately delivers the 1-page architectural Trojan Horse asset paired with an operational diagnostic inquiry.
- **"Not interested / Bad timing"**: Applies Chris Voss diagnostic labels to test whether the operational friction is solved or merely paused.
- **"Talk to Dave"**: Secures explicit permission to reference the executive colleague before initiating warm contact with the delegate.
- **"We use Competitor / Terraform"**: Validates the existing vendor while isolating the unconsidered day-2 cross-region drift boundary.

### Feature 8: Pre-Call Show-Rate & Multi-Attendee Locking Engine
Bridges the drop-off gap between meeting confirmation and actual held meetings:
- **Pre-Call Show-Rate Flow**: Sends a high-value T-24h 3-point executive value agenda and T-1h calendar update to prevent no-shows.
- **Executive Bring-Along Protocol**: Generates frictionless 1-click calendar forwarding copy so Champions invite Economic Buyers without sales pressure.
- **Ghost Recovery Protocol**: Converts non-responsive meeting acceptances with low-friction 2-slot choices and Voss walk-away resets.

### Feature 9: Batch Territory Ingestion & Sequencing Exporter
Enables reps to process 50 target accounts simultaneously:
- **Batch CSV Ingestion**: Parses territory spreadsheets, runs the 6-stage engine across all accounts, and produces the `Territory_Priority_Matrix.json`.
- **Sequencer Export**: Generates upload-ready CSV files for Salesloft, Outreach, and Apollo with pre-computed drafts, phone battlecards, and contact-policy delivery windows.

---

## 4. Guardrails, Safety & Deliverability Infrastructure
- **Draft Only / Prohibited Autonomous Dispatch**: The engine creates draft communications and battlecards. **Autonomous sending, calling, or CRM write dispatch without explicit human approval is strictly prohibited.**
- **Deliverability & Secondary Domain Defense**: All outbound campaigns are isolated on secondary domains (`get-company.com`, `company-platform.io`) to protect primary corporate email reputation; enforces DMARC, SPF, and DKIM strict alignment.
- **Catch-All Email Scrubbing**: Verifies recipient mailboxes against catch-all SMTP traps; requires secondary validation before sending.
- **LinkedIn Weekly Budget Limits**: Caps connection requests at 15/day (75/week) per SDR to prevent LinkedIn account restrictions.
- **Untrusted Data Isolation**: External web pages, job postings, and profiles are treated as untrusted data and parsed through an adversarial prompt-injection sanitizer.
- **Suppression Immutability**: Existing customers, open CRM opportunities, partner domains, and global opt-out lists immediately halt outreach.
- **Outcome-Oriented Metrics**: Success is measured by held AE meetings, qualified pipeline, and signal accuracy—not volume of emails generated.
