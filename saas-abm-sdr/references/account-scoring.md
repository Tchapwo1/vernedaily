# Decoupled Account Scoring & Decision System Architecture

## 1. Core Principles & Philosophy

1. **Four-Tier Decision Hierarchy Before Scoring.** Never calculate prioritization metrics or rank an account before evaluating legal/CRM exclusions and factual evidence sufficiency. Mathematics cannot compensate for an unverified fact or an unlawful contact channel.
2. **Prioritization Heuristic Metric ($H_{\text{priority}}$) $\neq$ Actuarial Financial Forecast.**
   - The metric $H_{\text{priority}}$ is explicitly a **bounded capacity-allocation heuristic** designed to rank SDR attention across accounts that have already passed eligibility gates.
   - It is **not** an actuarial Net Present Value (NPV) or true financial Expected Commercial Value, because early-stage SDR workflows lack empirical deal win rates ($P_{\text{win}}$), gross contribution margins, downstream AE/SE closing costs, and sales cycle duration discounting.
3. **Decouple Epistemic Sufficiency from Commercial Prioritization.**
   - **Evidence Sufficiency Gate**: An independent binary threshold ($C_{\text{epistemic}} \ge 0.70$, zero unresolved contradictions). If failed, the account halts in `RESEARCH MORE` regardless of deal size.
   - **Epistemic Completeness Ratio ($C_{\text{epistemic}}$)**: $C_{\text{epistemic}} = \frac{N_{\text{verified}}}{N_{\text{total}}}$. Measures the proportion of assertions backed by primary dated sources. It is an operational evidence-coverage ratio, not a calibrated statistical probability that the account dossier is infallible.
4. **Economic Viability Floor ($\ge \$10,000$ ACV).** Accounts lacking the organizational scale or infrastructure budget to support a \$10k+ contract are immediately disqualified from high-touch outbound.
5. **Multi-Tiered Suppression Scoping (No Blunt Over-Exclusion).**
   - **Account-Level Permanent Exclusion**: Hard stop (sanctioned entity, sub-$10k ACV floor, hostile domain cease-and-desist). Suppresses entire domain permanently.
   - **Account-Level Temporary Hold**: Active CRM opportunity, existing customer, or restructuring/WARN freeze. Placed on hold until deal closes or hold expires; domain is **not** permanently disqualified.
   - **Contact-Level Opt-Out**: Single individual unsubscribed or departed. Suppresses *only that contact*; the rest of the 500-person company remains addressable for other stakeholders.
   - **Channel-Specific Restriction**: E.g., UK individual sole trader cold email suppression or German UWG §7 electronic direct marketing restrictions. Limits the *specific channel* while allowing lawful alternatives (e.g. inbound, events, phone where compliant).
6. **Contradiction Halts Automation.** If contradictory signals emerge between sources (e.g. job posting mentions Kubernetes but engineering blog post announces serverless migration), the account is flagged with `contradiction_status: flagged_for_human_review` and committed to `RESEARCH MORE`. Contradictions are never silently averaged into a blended score.

---

## 2. The Four-Tier Decision System

To eliminate arbitrary scoring distortions, every account passes through four deterministic tiers in strict sequential order:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       FOUR-TIER DECISION HIERARCHY                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [TIER 1: COMPLIANCE & EXCLUSIONS GATING] ─────────────────────────────────┐│
│  • Account-Level Permanent Exclusion (Sanctions, ACV < $10k, Hostile DNC)  ││
│  • Account-Level Temporary Hold (Active CRM Deal, Existing Customer)       ││
│  • Contact/Channel Restrictions (UK Sole Trader, German UWG §7 Direct DM)  ││
│                                                                             ││
│      PERMANENT EXCLUSION ──► [STATE: DISQUALIFY] (Terminal; Suppress Domain)│
│      TEMPORARY HOLD      ──► [STATE: HOLD / RECHECK] (Pause Cadence)        │
│         │                                                                  ││
│      PASSED                                                                ││
│         ▼                                                                  ││
│  [TIER 2: ICP ELIGIBILITY & EVIDENCE SUFFICIENCY GATE] ────────────────────┤│
│  • ICP Fit Score >= 75 / 100                                               ││
│  • Epistemic Completeness Ratio (C_epistemic) >= 70%                       ││
│  • Zero Unresolved Contradictions in Core Claims                           ││
│                                                                             ││
│      FAILED (Fit >= 75, but C_epistemic < 70% or Contradiction)            ││
│         ──► [STATE: RESEARCH MORE] (Log Missing Evidence Gap & Halt Outbound│
│         │                                                                  ││
│      PASSED                                                                ││
│         ▼                                                                  ││
│  [TIER 3: BUYING TRIGGERS & MOMENTUM] ─────────────────────────────────────┤│
│  • Buying Momentum Score >= 60 / 100                                       ││
│  • Active Trigger Signals within Calibrated Half-Life                      ││
│                                                                             ││
│      FAILED (Fit >= 75, C_epistemic >= 70%, but Momentum < 60)             ││
│         ──► [STATE: MONITOR] (Place on Telemetry Watch; No Outbound)       ││
│         │                                                                  ││
│      PASSED                                                                ││
│         ▼                                                                  ││
│  [TIER 4: CAPACITY ALLOCATION HEURISTIC (H_priority)] ─────────────────────┘│
│  • Compute H_priority to rank SDR daily queue                              ││
│         ──► [STATE: PURSUE] (Commit to Stakeholder Mapping & Drafts)       ││
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. State Machine Precedence & Overlap Resolution

When diagnostic conditions overlap, this strict precedence order determines the resulting state:

$$\text{Precedence Order:}\quad \mathbf{DISQUALIFY} \succ \mathbf{RESEARCH\ MORE} \succ \mathbf{MONITOR} \succ \mathbf{PURSUE}$$

### Conflict Resolution Scenarios:
1. **High Fit ($\ge 75$), Low Momentum ($< 60$), Low Confidence ($< 70\%$):**
   - *Resolution*: **`RESEARCH MORE`** wins over `MONITOR`. Rationale: Without verified facts, momentum cannot be accurately established. You must verify evidence before deciding whether an account is dormant or active.
2. **High Fit ($\ge 75$), High Momentum ($\ge 60$), Active CRM Deal:**
   - *Resolution*: **`HOLD`** (scoped temporary suppression) overrides `PURSUE`. Rationale: Active internal deals take priority over outbound prospecting.
3. **High Fit ($\ge 75$), High Momentum ($\ge 60$), Unresolved Contradiction:**
   - *Resolution*: **`RESEARCH MORE`** wins over `PURSUE`. Rationale: Outreach must never be launched on contradictory assumptions that destroy credibility on a live call.

---

## 4. The Prioritization Heuristic Metric ($H_{\text{priority}}$)

Once an account reaches Tier 4 (`PURSUE`), its position in the SDR's daily queue is governed by the Prioritization Heuristic Metric:

$$H_{\text{priority}} = \Big( \frac{\text{ICP Fit}}{100} \times \frac{\text{Buying Momentum}}{100} \times \text{Estimated ACV} \times C_{\text{epistemic}} \Big) - C_{\text{pursuit}}$$

### Parameter Definitions & Calibrated Ranges:

| Parameter | Type & Range | Definition & Operational Standard |
| :--- | :--- | :--- |
| **`ICP Fit`** | Integer $[0, 100]$ | Normalized firmographic and technographic compatibility score against ICP (headcount $\ge 30$ engineers, Kubernetes/cloud infrastructure, vertical). |
| **`Buying Momentum`** | Integer $[0, 100]$ | Temporal urgency score derived from observable friction triggers (active hiring, migrations, security audit deadlines) strictly within their valid half-life. |
| **`Estimated ACV`** | Float $[\$10,000, \$250,000+]$ | Target Annual Contract Value tier based on engineering team size and cluster scale. Hard floor is $\$10,000$. |
| **$C_{\text{epistemic}}$** | Float $[0.0, 1.0]$ | **Epistemic Completeness Ratio**: Ratio of primary verified factual citations to total claims ($C_{\text{epistemic}} = \frac{N_{\text{verified}}}{N_{\text{total}}}$). Operational evidence completeness, **not statistical deal win probability**. |
| **$C_{\text{pursuit}}$** | Float $[\$200, \$3,000]$ | Fully burdened cost of human SDR research hours + data enrichment API lookups required to qualify the account (\$150/hr standard burdened rate). |

---

## 5. Fully Reproducible Worked Examples

### Example 1: Tier-1 Enterprise Infrastructure Account
- **Target Profile**: Global Fintech with 1,200 engineers undergoing multi-region cloud migration.
- **Inputs**:
  - $\text{ICP Fit} = 80$ ($0.80$)
  - $\text{Buying Momentum} = 70$ ($0.70$)
  - $\text{Estimated ACV} = \$120,000$
  - $C_{\text{epistemic}} = 0.85$ (85% of infrastructure claims verified via SEC filings and public Terraform state snippets)
  - $C_{\text{pursuit}} = \$2,000$ (12 hours of complex engineering mapping + multi-source API enrichment)
- **Step-by-Step Calculation**:
  $$\text{Gross Heuristic Value} = 0.80 \times 0.70 \times \$120,000 \times 0.85 = \$57,120.00$$
  $$H_{\text{priority}} = \$57,120.00 - \$2,000.00 = \mathbf{55,120.00}$$

### Example 2: Tier-2 High-Fit Mid-Market Account
- **Target Profile**: High-growth SaaS with 65 engineers; perfect Kubernetes and AWS footprint.
- **Inputs**:
  - $\text{ICP Fit} = 95$ ($0.95$)
  - $\text{Buying Momentum} = 92$ ($0.92$)
  - $\text{Estimated ACV} = \$15,000$
  - $C_{\text{epistemic}} = 0.98$ (98% of tech stack verified via active job postings and GitHub repos)
  - $C_{\text{pursuit}} = \$486.80$ (3 hours of SDR validation + standard enrichment)
- **Step-by-Step Calculation**:
  $$\text{Gross Heuristic Value} = 0.95 \times 0.92 \times \$15,000 \times 0.98 = \$12,847.80$$
  $$H_{\text{priority}} = \$12,847.80 - \$486.80 = \mathbf{12,361.00}$$

### Operational Interpretation:
Even though the mid-market account has higher fit (95 vs 80), higher momentum (92 vs 70), and higher epistemic certainty (98% vs 85%), the enterprise account correctly receives a **$4.4\times$ higher queue priority** ($55,120 vs $12,361). This prevents SDRs from cherry-picking low-value accounts simply because they are faster to research.

---

## 6. Future Calibrated Expected Contribution Margin Model (ECV)

When downstream sales telemetry and CRM conversion data become available in production, the engine transitions from the capacity heuristic $H_{\text{priority}}$ to an actuarial Expected Contribution Value model:

$$\text{ECV} = \Big( \text{Estimated ACV} \times \text{Gross Margin} \times P_{\text{win}}(\text{Segment}, \text{Stage}, \text{Trigger}) \Big) - \Big( C_{\text{SDR}} + C_{\text{AE}} + C_{\text{SE}} \Big)$$

- **$P_{\text{win}}$**: Empirically back-tested win probability derived from historical CRM close rates per vertical and trigger freshness.
- **Gross Margin**: Segment-specific gross software margin (e.g. 80%).
- **Downstream Costs**: Fully burdened acquisition cost encompassing SDR prospecting, AE demo hours, and Sales Engineering POC support.

---

## 7. Required Output Ledger Schema

```json
{
  "account_domain": "example.com",
  "operational_state": "pursue",
  "state_precedence_tier": 4,
  "suppression_scope": "none",
  "state_rationale": "Meets Tier 1 compliance (no CRM collision, corporate UK Ltd subscriber). Meets Tier 2 fit (85/100) and evidence sufficiency (C_epistemic: 0.88, zero contradictions). Meets Tier 3 momentum (74/100). Ranked with H_priority of 32,450.00.",
  "scores": {
    "icp_fit": 85,
    "buying_momentum": 74,
    "epistemic_completeness_ratio": 0.88,
    "estimated_acv": 45000,
    "pursuit_cost": 750,
    "prioritization_heuristic_score": 32450.00
  },
  "evidence_provenance": {
    "fresh_signals_count": 6,
    "stale_signals_count": 1,
    "contradictions_detected": 0,
    "source_reliability_distribution": {
      "tier1_primary_filing": 2,
      "tier2_direct_job_post": 4,
      "tier3_engineering_blog": 1
    }
  },
  "compliance_audit": {
    "policy_version": "2026.2.2",
    "policy_last_reviewed_at": "2026-10-21T01:45:00Z",
    "jurisdiction": "GB",
    "channel": "email",
    "recipient_classification": "corporate_subscriber_ltd",
    "recipient_classification_confidence": 0.95,
    "lawful_basis": "legitimate_interest",
    "lia_status": "documented_and_approved",
    "decision_reason": "Verified UK Companies House registration as Limited Company (01234567); valid corporate subscriber under PECR Reg 22."
  },
  "next_immediate_action": "advance_to_stakeholder_mapping"
}
```
