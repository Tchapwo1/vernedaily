# Consultative Omnichannel Outreach Playbook (SPIN + Voss)

## Core Objective

Execute coordinated, consultative, multi-threaded outreach across the buying committee for complex B2B SaaS deals ($\ge \$10,000$ ACV). Elevate conversations from transactional vendor pitching into strategic business problem diagnosis using Neil Rackham's SPIN Selling and Chris Voss's tactical empathy.

---

## The Pre-Computed SPIN Architecture

Cold outreach must never ask lazy Situation questions. Situation research is conducted autonomously prior to writing. Messaging is structured as:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PRE-COMPUTED SPIN MESSAGE FRAMEWORK                   │
│                                                                             │
│  1. [S] SITUATION (Pre-Researched Fact)                                     │
│     Ground the message in an undeniable, dated, observable business fact.   │
│     "Noticed your team manages 40+ EKS clusters across US-East..."          │
│                                                                             │
│  2. [P] LATENT PROBLEM (The Unseen Friction)                                │
│     Connect that situation to an operational breakdown.                     │
│     "...at that scale, keeping IAM policies in sync usually leads to drift."│
│                                                                             │
│  3. [I] QUANTIFIED IMPLICATION (The Loss-Aversion Lever)                    │
│     Highlight the commercial, financial, or regulatory cost (2x-2.5x impact)│
│     "...which typically delays SOC 2 audits by 6 weeks and pulls Senior SREs│
│     into 15+ hours of manual firefighting per sprint."                      │
│                                                                             │
│  4. [N] NEED-PAYOFF / VOSS CTA (Frictionless Autonomy)                      │
│     Low-pressure, interest-based, or no-oriented question.                  │
│     "Would it be completely unreasonable to share the 1-page architecture   │
│     teardown FinTech X used to automate that sync?"                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Omnichannel Execution Specifications

### Channel 1: Consultative Email Standards
* **Word Count Ceiling**: Strictly **under 75 words** (excluding signature). Verified by word-count gate.
* **Readability**: Flesch-Kincaid Grade Level $\le 5.0$ (short sentences, simple vocabulary, high cognitive ease).
* **Subject Lines**: 2 to 4 words, lowercase, internal-sounding (e.g., *`eks cluster drift`*, *`q1 egress review`*, *`soc 2 policy sync`*). Zero spam tokens, zero emojis, zero fake "Re:".
* **Mobile Layout**: Formatted for 3.2-second scanning on mobile screens without vertical scrolling.

### Channel 2: LinkedIn Social Selling Standards
* **Soft Signal (Day 1)**: View prospect profile; like/comment on a technical post with a thoughtful peer observation.
* **Connection Request (Day 7)**: Strict limit of **< 200 characters**. Must reference the specific technical observation without pitching:
  > *"Marcus — noticed your team's work scaling EKS clusters across US-East. Put together a quick teardown on how peers eliminate cross-zone drift. Glad to connect."*
* **InMail / Direct Message (Post-Connection)**: Brief, conversational, delivering the Trojan Horse asset directly into chat.

### Channel 3: Telephony & Cold Call Battlecards
* **15-Second Pattern-Interrupt Opener**:
  > *"Marcus? Alex with Acme Cloud. I know you weren't expecting my call. I sent a 2-line note on Tuesday regarding cross-zone egress across your EKS clusters. Do you have 30 seconds to tell me if I'm completely off base?"*
* **20-Second Voss Voicemail Script**:
  > *"Marcus — Alex with Acme. Left a short question in your inbox regarding cross-cluster configuration drift. No need to call me back; just reply to that email if it makes sense to share the architecture teardown. Thanks."*
* **Real-Time Objection Matrix**: Tactical empathy and calibrated labeling to turn resistance into dialogue.

---

## Committee-Specific Implication Angles

| Buying Committee Role | Primary Problem Focus | Quantified Implication (Loss Frame) | Trojan Horse Asset |
| :--- | :--- | :--- | :--- |
| **Champion (Lead SRE / Platform Lead)** | Configuration drift, manual policy sync | On-call burnout, sprint velocity delays, broken CI/CD pipelines | 1-Page Cross-Cluster Drift Remediation Architecture Teardown |
| **Economic Buyer (VP Eng / CTO)** | Cross-zone cloud egress, margin contraction | $15k–$40k/quarter unmonitored margin leakage, budget reallocations | Executive Peer Benchmark: Eliminating Cloud Egress Margin Contraction |
| **Technical Evaluator (CISO / InfoSec)** | RBAC/IAM audit drift, compliance gaps | SOC 2 Type II audit delays, enterprise customer deal blockers | Automated Zero-Trust RBAC Policy Enforcement Specification |

---

## Asymmetric Value & Trojan Horse Assets

Never ask an executive for a 30-minute demo on Touch 1. Deliver value first with zero friction:
* An unsolicited architecture diagram or code benchmark.
* A peer industry benchmark comparing cloud egress ratios.
* A 1-page regulatory checklist for upcoming compliance mandates.

## Voss No-Oriented Closing Sequence (Day 28)

When earlier touches receive no reply, execute the autonomy-preserving break-up touch:
> **Subject:** `policy sync`  
> *"Marcus — have you completely given up on automating multi-cluster policy sync before the Q1 budget cycle?"*
