# VerneDaily Pilot Onboarding Pack & Baseline Audit
### Customer Intake Form, Target Ingestion & Operational Measurement Protocol
**Document Version:** 1.0.0  
**Pilot Type:** 30-Day Paid Strategic Account Intelligence Sprint (£1,500)  
**Target User:** Founder, Head of Sales, or SDR Pod Lead  
**Engine URL:** [vernedaily.xyz/cockpit](https://vernedaily.xyz/cockpit)

---

## 1. Executive Instructions & Welcome

Welcome to the **VerneDaily 30-Day Strategic Account Intelligence Sprint**.

The objective of this pilot is **not** to spam hundreds of unverified contacts with generic templates. The objective is to give your sales reps an audited, evidence-backed daily queue that answers three commercial questions:
1. **Which accounts are genuinely worth pursuing today?**
2. **What observable evidence proves they have a reason to buy right now?**
3. **What is the exact diagnostic conversation opener that earns a qualified meeting?**

To launch your pilot within 48 hours, complete the **three parts** of this onboarding pack:
* **Part 1:** Target Account List Ingestion (30–50 Named Accounts).
* **Part 2:** ICP Tech Stack & Hard Disqualification Questionnaire.
* **Part 3:** Day 1–3 Baseline Research Time Audit (To prove $\ge 40\%$ time saved).

---

## 2. Part 1: Target Account List Ingestion Specification

Please provide **30 to 50 named target accounts** matching your primary outbound focus. 

### CSV Column Specification

| Column Name | Required? | Format | Description / Example |
| :--- | :--- | :--- | :--- |
| `AccountName` | **YES** | String | Legal or common brand name (e.g. `Datadog`, `Stripe`) |
| `Domain` | **YES** | Domain | Primary root web domain (e.g. `datadoghq.com`, `stripe.com`) |
| `EstimatedACV` | **YES** | Number (GBP/USD) | Expected contract value (e.g. `35000` or `50000`) |
| `TargetBuyerRole` | Optional | String | Preferred title (e.g. `VP Engineering`, `Head of Infrastructure`) |
| `KnownContext` | Optional | String | Any prior CRM history, notes, or recent funding round |

### Starter CSV Template (Copy-Paste into a `.csv` file)

```csv
AccountName,Domain,EstimatedACV,TargetBuyerRole,KnownContext
HashiCorp,hashicorp.com,45000,VP Cloud Infrastructure,Multi-cloud state synchronization
Linear,linear.app,25000,Head of Engineering,Rapid scale; developer workflow tools
Monzo,monzo.com,60000,Director of Platform Reliability,UK banking compliance and cloud scale
Datadog,datadoghq.com,125000,SVP Cloud Operations,Multi-cloud K8s telemetry ingestion
PagerDuty,pagerduty.com,35000,Principal Security Engineer,Active platform security hiring
```

> **Submission Option:** Upload this CSV directly into the VerneDaily Cockpit or email it directly to `onboarding@vernedaily.xyz`.

---

## 3. Part 2: ICP Tech Stack & Disqualification Questionnaire

*Please complete these 6 questions so we can calibrate your engine filters:*

### 1. Commercial Thresholds
* **Target Annual Contract Value (ACV) Floor:**  
  `[ ] £15,000` · `[ ] £25,000` · `[ ] £50,000+`  *(Accounts below this floor are automatically disqualified)*
* **Target Organization Size:**  
  Minimum: `______` full-time engineers | Maximum: `______` employees

### 2. Technical Stack Signals (Must-Haves)
*Which technical platforms, tools, or architectures MUST a target account run for your product to deliver value?*  
* [ ] **Cloud Hyperscalers:** AWS `[ ]` · GCP `[ ]` · Azure `[ ]` · Multi-Cloud `[ ]`
* [ ] **Container / Infrastructure:** Kubernetes `[ ]` · Terraform `[ ]` · Docker `[ ]` · Envoy / Service Mesh `[ ]`
* [ ] **Data / Telemetry:** Snowflake `[ ]` · Datadog `[ ]` · Kafka `[ ]` · Postgres `[ ]`
* [ ] **Custom / Other:** `_____________________________________________________`

### 3. Buying Triggers & High-Momentum Signals
*What real-world event makes right now the ideal time to reach out?*  
* [ ] Active job postings for specific roles (e.g. Platform SRE, Head of SecOps)
* [ ] Public technical migration announcements (e.g. cloud egress reduction, multi-region expansion)
* [ ] Regulatory or security compliance deadlines (e.g. DORA, SOC2, PCI-DSS)
* [ ] Code freeze windows / peak holiday preparation (e.g. BFCM)

### 4. Hard Disqualifiers (Automatic Rejection Rules)
*Accounts exhibiting ANY of the following will be placed into immediate `DISQUALIFY` state:*  
1. Active existing customers or accounts in active late-stage negotiations.
2. Less than `[ 25 ]` total engineering headcount.
3. Legacy on-premise only architecture with zero public cloud adoption.
4. Accounts undergoing bankruptcy, acquisition freeze, or active intellectual property litigation.
5. Other specific domain exclusions: `_____________________________________________`

### 5. Primary Buyer Personas
* **Primary Champion:** `___________________________` (e.g. Lead Infrastructure SRE)
* **Economic Buyer:** `___________________________` (e.g. VP Engineering / CTO)

---

## 4. Part 3: Baseline Research Time Audit (Day 1–3)

To statistically prove the **$\ge 40\%$ reduction in sales research drag**, your participating reps must benchmark their current manual workflow across **5 representative target accounts** before using the engine.

### Step 1: The Manual Baseline Study (Day 1–2)
Have your SDR or founder research 5 un-researched target accounts using their existing manual process (LinkedIn Sales Navigator, company websites, Google, job boards) and draft outreach.

**Start a stopwatch for each account and record the results below:**

| Account Domain | Manual Minutes Spent (Timer) | Verified Facts Found (Count) | Inferences / Guesses Made (Count) | Outreach Word Count |
| :--- | :--- | :--- | :--- | :--- |
| *Example: company1.com* | *24 mins* | *1 citation* | *3 guesses* | *145 words* |
| 1. | | | | |
| 2. | | | | |
| 3. | | | | |
| 4. | | | | |
| 5. | | | | |
| **AVERAGE:** | **______ mins/acct** | **______ facts** | **______ guesses** | **______ words** |

### Step 2: The VerneDaily Cockpit Comparison (Day 3)
Run the exact same 5 accounts through the VerneDaily Cockpit or live analyzer.

**Record the engine-assisted metrics:**

| Account Domain | Cockpit Review Time (Timer) | Verified Facts Sourced | Hallucinations / Guesses | Outreach Word Count | Time Saved (%) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| *Example: company1.com* | *3.5 mins* | *2 exact quotes + URLs* | *0 (gated)* | *48 words* | *85% saved* |
| 1. | | | | | |
| 2. | | | | | |
| 3. | | | | | |
| 4. | | | | | |
| 5. | | | | | |
| **AVERAGE:** | **______ mins/acct** | **______ facts** | **______ guesses** | **______ words** | **______% SAVED** |

> **Success Benchmark:** A pass requires $\ge 40\%$ reduction in average prep time and 0 hallucinated facts in approved drafts.

---

## 5. Part 4: 30-Day Milestone Schedule

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          30-DAY PILOT MILESTONE ROADMAP                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [WEEK 1: DAY 1–7]   CALIBRATION & BASELINE AUDIT                           │
│  • Ingest customer 30-50 accounts CSV and calibrate ICP triggers.           │
│  • Conduct the 5-account manual baseline time study.                         │
│  • 45-min Rep Alignment Workshop: How to interpret H_priority and evidence. │
│                                                                             │
│  [WEEK 2: DAY 8–14]  DAILY ACTION QUEUE ACTIVATION                          │
│  • Reps receive their daily 10-account ranked queue in Cockpit.              │
│  • SDRs review, edit, and send high-context drafts (<75 words).              │
│  • Daily async check-ins: Flagging any inaccurate signals.                   │
│                                                                             │
│  [WEEK 3: DAY 15–21] FIRST DISCOVERY CALLS & AE HANDOFF                      │
│  • Inbound replies triaged; phone call pattern interrupts logged.            │
│  • First AE discovery briefings generated and handed to Account Execs.       │
│  • Mid-flight calibration: Adjusting momentum half-lives if needed.          │
│                                                                             │
│  [WEEK 4: DAY 22–30] ROI AUDIT & COMMERCIAL EXPANSION REVIEW                 │
│  • Final performance calculation against Week 1 baseline.                    │
│  • Tally: Research hours saved, reply rates, meetings held, AE acceptances.  │
│  • Executive presentation: Annual rollout proposal or clean walk-away.       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Pilot Sign-Off & Commercial Agreement

| Role | Name | Email | Signature / Date |
| :--- | :--- | :--- | :--- |
| **Client Commercial Lead:** | ________________________ | ________________________ | ________________________ |
| **Client Sales Participant:**| ________________________ | ________________________ | ________________________ |
| **VerneDaily Lead Engineer:**| ________________________ | team@vernedaily.xyz | ________________________ |

**Agreed Pilot Investment:** £1,500 GBP flat (Net 14 payment terms)  
**Deliverable Assurance:** If the engine does not prove a measurable reduction in median research time ($\ge 40\%$) during the Week 1 baseline audit, the pilot may be cancelled with immediate 100% refund.
