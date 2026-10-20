# Decoupled Tri-Vector Account Scoring & Prioritization

## Core Principles

1. **Decouple Fit, Timing, and Confidence.** Never compress distinct dimensions into a single blended 100-point score that hides critical deficiencies.
2. **Economic Viability Floor ($10,000+ ACV).** An account that cannot sustain at least a $10,000 ACV contract is automatically disqualified from high-touch outbound regardless of fit.
3. **Missing Data Never Inflates Priority.** Missing information lowers Epistemic Confidence; it never normalizes into an artificially high provisional score.
4. **Hard Disqualifiers Override Everything.** Active CRM opportunities, existing customers, opt-outs, and hard stops defined in `gtm-config.yaml` immediately block outreach.

---

## The Tri-Vector Model

Every account is evaluated across three distinct, uncompressed vectors:

$$\text{Account Posture} = \big\langle \text{ICP Fit}\ (0\text{--}100),\ \text{Buying Priority}\ (0\text{--}100),\ \text{Confidence}\ (0\text{--}100\%) \big\rangle$$

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TRI-VECTOR SCORING ENGINE                         │
│                                                                             │
│  [VECTOR 1] ICP FIT (0 - 100)                                               │
│  • Firmographics (Industry, Headcount >= 30 engineers, Geography)   [35 pts]│
│  • Tech Stack Compatibility (Kubernetes, AWS/GCP, multi-cloud)      [35 pts]│
│  • Economic Capacity (Demonstrated ability to support >= $10k ACV)  [30 pts]│
│                                                                             │
│  [VECTOR 2] BUYING PRIORITY & TIMING (0 - 100)                              │
│  • Verified Trigger Freshness (Hiring spike, leadership change <60d)[40 pts]│
│  • Latent Problem Exposure (Known cluster drift / egress friction)  [30 pts]│
│  • Stated Project / Compelling Event (Contract renewal, migration)  [30 pts]│
│                                                                             │
│  [VECTOR 3] EPISTEMIC CONFIDENCE (0% - 100%)                                │
│  • Proportion of required data points backed by primary, dated citations    │
│    (SEC filings, job postings, engineering blogs, verified telemetry).      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Actionability Gates & Operational Tiers

| Posture Tier | Criteria Thresholds | Required Operational Action |
| :--- | :--- | :--- |
| **Tier 1: High-Priority Outbound** | ICP Fit $\ge 80$, Buying Priority $\ge 70$, Confidence $\ge 75\%$ | Activate 28-day Omnichannel Tri-Touch Sequence (LinkedIn + Email + Phone). Multi-thread Champion and Economic Buyer. |
| **Tier 2: Targeted Development** | ICP Fit $\ge 70$, Buying Priority $40\text{--}69$, Confidence $\ge 75\%$ | Deliver "Trojan Horse" architecture teardown to Champion; test for latent problem responsiveness. |
| **Tier 3: Long-Term Nurture** | ICP Fit $\ge 70$, Buying Priority $< 40$, Confidence $\ge 75\%$ | Monitor for new executive hires, cloud migrations, or budget cycles. Zero outbound spam. |
| **Research Block / Hold** | Any Fit / Priority, **Confidence $< 75\%$** | **OUTREACH BLOCKED.** Insufficient primary evidence. Assign to research queue to resolve unknowns. |
| **Disqualified / Stop** | Fails $10k ACV floor, CRM active opp, opt-out, or hard disqualifier | Suppress domain. Update CRM with reason code. |

---

## Scoring Safeguards & Unknown Handling

1. **No Provisional Inflation**: If a dimension is unknown, do not divide earned points by known weights. The score remains bounded, and the Confidence vector drops proportionally.
2. **Separation of Contact vs. Account Signals**:
   - One engineer visiting a website is an unverified contact signal, NOT account intent.
   - Account intent requires verified multi-stakeholder activity, corporate press announcements, or active hiring for the exact problem domain.
3. **Temporal Validity**: Any buying trigger older than 60 days loses 50% of its Priority weighting. Triggers older than 180 days are considered expired.

---

## Required Output Schema

Every scored account must output:
* `account_domain`
* `icp_fit_score` (0–100) + key firmographic drivers
* `buying_priority_score` (0–100) + verified trigger and date
* `epistemic_confidence` (0–100%) + missing fields
* `economic_viability` (Verified $\ge \$10\text{k}$ ACV capacity)
* `suppression_status` (Clear / Blocked)
* `assigned_play` (Tier 1 Omnichannel / Tier 2 Development / Hold / Disqualified)
* `next_immediate_action`
