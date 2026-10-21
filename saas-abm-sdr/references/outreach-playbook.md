# Consultative Omnichannel Outreach Playbook (SPIN + Voss)

## Core Objective

Execute coordinated, consultative, multi-threaded outreach across the dynamic buying group for complex B2B SaaS deals ($\ge \$10,000$ ACV). Elevate conversations from transactional vendor pitching into strategic business problem diagnosis using Neil Rackham's SPIN Selling, Chris Voss's tactical empathy, and diagnostic epistemic humility.

---

## 1. Hypothesis Cushioning & Epistemic Humility

Presumptive copy (*"Noticed you have configuration drift across 4 EKS clusters..."*) sounds like invasive algorithmic surveillance and triggers instant defensiveness. 

All diagnostic outreach must apply **Hypothesis Cushioning**:
* **Acknowledge Public Context**: Anchor on a verified public talk, engineering job spec, or cloud telemetry.
* **Observe the Architectural Pattern**: Frame the operational challenge as a common industry trade-off, not a proven indictment of their team.
* **Invite Collaborative Correction**: Ask a diagnostic question that gives them an easy out if they've already solved it internally.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HYPOTHESIS CUSHIONING: BEFORE VS. AFTER                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ❌ PRESUMPTUOUS (Creepy Surveillance):                                     │
│  "Marcus — noticed your team is scaling 4 clusters and suffering from      │
│  configuration drift pulling SREs into 15+ hours of on-call firefighting." │
│                                                                             │
│  ✅ CUSHIONED (Peer Diagnostic Respect):                                    │
│  "Marcus — looking at your team's engineering focus around multi-region     │
│  EKS on Greenhouse, teams scaling at that velocity usually run into silent  │
│  configuration drift across clusters.                                       │
│                                                                             │
│  Is that something your on-call team is actively wrestling with, or have    │
│  your internal scripts already automated policy parity?"                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Omnichannel Execution Specifications

### Channel 1: Consultative Email Standards
* **Word Count Ceiling**: Strictly **under 75 words** (excluding signature). Verified by word-count gate.
* **Readability**: Flesch-Kincaid Grade Level $\le 5.0$ (short sentences, simple vocabulary, high cognitive ease).
* **Subject Lines**: 2 to 4 words, lowercase, internal-sounding (e.g., *`eks policy drift`*, *`q1 egress review`*, *`soc 2 policy sync`*). Zero spam tokens, zero emojis, zero fake "Re:".
* **Mobile Layout**: Formatted for 3.2-second scanning on mobile screens without vertical scrolling.

### Channel 2: LinkedIn Social Selling Standards
* **Rate Limit Budget**: Maximum 15 connection requests per day (75/week) per SDR to protect profile longevity.
* **Soft Signal (Day 1)**: View prospect profile; like/comment on a technical post with a thoughtful peer observation.
* **Connection Request (Day 7)**: Strict limit of **< 200 characters**. Must reference the specific technical observation without pitching:
  > *"Marcus — saw your team's engineering focus around multi-region EKS. Put together a quick visual on how peers eliminate cross-zone drift. Glad to connect."*
* **InMail / Direct Message (Post-Connection)**: Brief, conversational, delivering the Trojan Horse asset directly into chat.

### Channel 3: Real-World Cold Call Defense Scripts

#### A. The 15-Second Pattern-Interrupt Opener
> *"Marcus? Alex with Acme Cloud. I know you weren't expecting my call. I sent a short note on Tuesday regarding multi-region drift across your EKS clusters. Do you have 30 seconds to tell me if that's an active headache, or if you already have it solved?"*

#### B. The "How Did You Get My Mobile Number?" Voss De-Escalation
*(Occurs on 40% of direct mobile dials; handles defensiveness with radical transparency).*
> **Prospect**: *"Who is this? How did you get my personal cell phone number?"*  
> **Rep**: *"Completely fair question, Marcus. When our engineering team noticed your team scaling multi-region EKS on Greenhouse, our research desk matched your public corporate directory listing.  
> Did I catch you in the middle of an active deployment fire drill, or do you have 30 seconds?"*

#### C. The Gatekeeper / Executive Assistant Pivot
*(Bypasses dial trees and transforms assistants into internal routing allies).*
> **Gatekeeper**: *"What is this in reference to? He doesn't take unsolicited vendor calls."*  
> **Rep**: *"Completely understood. I sent Marcus a 1-page architectural diagram regarding their multi-region cluster configuration. I didn't want to clutter his calendar if he's not the right person.  
> Do you manage his engineering review schedule, or is there a better time to catch him directly between sprint meetings?"*

#### D. The 10-Second Voicemail "Internal Forward" Trick
> *"Marcus — Alex with Acme Cloud. Left a short question in your inbox with the subject line 'eks policy drift'. No need to call me back; just reply to that email if it makes sense to share the architecture breakdown. Thanks."*

---

## 3. Pre-Call Show-Rate & Multi-Attendee Locking Engine

Bridging the gap between a booked meeting and a qualified held conversation:

### The Pre-Call Show-Rate Sequence (T-24h & T-1h)
1. **T-24h Executive Value Agenda (Email)**:
   > **Subject:** `prep for tomorrow: cloudscale + acme`  
   > *"Marcus — looking forward to our chat tomorrow at 2:00 PM EST.  
   > To keep this strictly high-value and avoid a generic slide deck, here are the 3 points we prepared to review:  
   > 1. Peer benchmarks on multi-region EKS policy synchronization.  
   > 2. How FinTech X eliminated $14k/mo in redundant egress without adding node agents.  
   > 3. Direct Q&A on your internal tooling setup.  
   > See you on the Zoom link tomorrow."*
2. **T-1h Calendar Ping**:
   Calendar event updated with confirmed meeting link and 1-line note.

### Executive Bring-Along Protocol (Engaging the Economic Buyer)
To prevent the Champion from showing up alone:
> *"Marcus — since cluster synchronization typically impacts both on-call engineering velocity and cloud infrastructure margins, Sarah Lin (VP Infrastructure) is welcome to join for the first 10 minutes.  
> Would you like me to send her a direct calendar invite, or forward the meeting link?"*

---

## 4. Committee-Specific Implication Angles

| Buying Group Role | Primary Problem Focus | Quantified Implication (Loss Frame) | Trojan Horse Asset |
| :--- | :--- | :--- | :--- |
| **Champion (Lead SRE / Platform Lead)** | Configuration drift, manual policy sync | On-call burnout, sprint velocity delays, broken CI/CD pipelines | 1-Page Cross-Cluster Drift Remediation Architecture Teardown |
| **Economic Buyer (VP Eng / CTO)** | Cross-zone cloud egress, margin contraction | $15k–$40k/quarter unmonitored margin leakage, budget reallocations | Executive Peer Benchmark: Eliminating Cloud Egress Margin Contraction |
| **Technical Evaluator (CISO / InfoSec)** | RBAC/IAM audit drift, compliance gaps | SOC 2 Type II audit delays, enterprise customer deal blockers | Automated Zero-Trust RBAC Policy Enforcement Specification |
