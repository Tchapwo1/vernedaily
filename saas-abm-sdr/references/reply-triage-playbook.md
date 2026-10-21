# Inbound Reply-Triage & Recovery Playbook
### The Field Guide to Turning Messy Prospect Responses into Qualified AE Meetings

In enterprise B2B sales, prospects rarely reply with structured qualification details. 95% of real-world responses fall into four non-committal or defensive archetypes. This playbook governs how the engine parses incoming text and drafts immediate consultative recovery responses.

---

## The 4 Real-World Prospect Reply Archetypes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       REAL-WORLD REPLY TRIAGE MATRIX                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [ARCHETYPE 1] "Send me info / 1-pager" ──► The Micro-Asset Trojan Horse   │
│  [ARCHETYPE 2] "Not interested / Bad timing" ──► The Chris Voss Label       │
│  [ARCHETYPE 3] "Talk to Dave in Platform" ──► The Warm Permission Forward   │
│  [ARCHETYPE 4] "We use Datadog / Terraform" ──► Unconsidered Blind Spot     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Archetype 1: "Send me info" / "Send over a 1-pager"
* **Prospect Psychology**: A polite, low-friction stall. They want to end the thread without saying a hard "no."
* **Fatal Mistake**: Sending a 15-page generic marketing deck, then emailing 2 days later: *"Did you get a chance to read it?"* (100% ghost rate).
* **The Battle-Tested Recovery Play (The Micro-Asset Trojan Horse)**:
  1. Acknowledge and deliver a highly visual, 1-page peer architectural teardown immediately.
  2. Pair the delivery with a single, low-friction diagnostic question that tests their operational setup.

#### Draft Template:
> *"Marcus — attached the 1-page teardown on how FinTech X automated policy sync across multi-region EKS clusters.*
>
> *Page 1 shows their cluster drift detection logic without adding sidecar agents.*
>
> *Curious: when your team adds a new region, does your team currently audit IAM drift manually, or do you have internal scripts handling policy parity?"*

---

### Archetype 2: "Not interested" / "Bad timing" / "No budget"
* **Prospect Psychology**: Automatic defense reflex. They assume you are pitching an expensive, disruptive tool they don't need right now.
* **Fatal Mistake**: Aggressively pitching features, arguing with them, or sending a generic: *"Understood! Can I check back in 6 months?"*
* **The Battle-Tested Recovery Play (The Chris Voss Diagnostic Label)**:
  1. Validate their timing and remove all sales pressure.
  2. Use a Voss-style label that tests whether the problem is genuinely solved or just paused.

#### Draft Template:
> *"Totally fair, Marcus. Sounds like multi-cluster policy synchronization is either already well-scripted internally, or just not a priority with everything else on the Q4 roadmap.*
>
> *If you've already built automated drift remediation in-house, zero need to reply. But if it's something your on-call team revisits ahead of H1 planning, would it be a bad idea to compare notes then?"*

---

### Archetype 3: "Talk to Dave" / "Speak with our Platform Team"
* **Prospect Psychology**: The executive or engineer is deflecting the vendor to a subordinate or peer, but giving you the golden ticket: an internal referral.
* **Fatal Mistake**: Emailing Dave cold and saying: *"Your boss told me to reach out."* (Creates resentment and makes the boss look unsupportive).
* **The Battle-Tested Recovery Play (The Warm Permission Forward)**:
  1. Secure explicit permission to mention their name.
  2. Ingest Dave into the dynamic stakeholder graph as a verified contact.
  3. Frame the reach-out to Dave as a collaborative recommendation from his colleague.

#### Draft Template (To the original prospect):
> *"Thanks for pointing me in the right direction, Sarah.*
>
> *Should I mention to Dave that you suggested we connect, or would it be cleaner if I reach out directly referencing your multi-region EKS focus?"*

#### Draft Template (To Dave, once approved):
> *"Dave — Sarah Lin suggested I reach out regarding your team's multi-region cluster configuration.*
>
> *We put together a 1-page visual on how peer SRE teams automate IAM and policy drift across EKS clusters without adding extra node agents. Thought it might offer helpful perspective.*
>
> *Is policy drift across regions something your team is currently tackling, or do your internal Terraform scripts have it handled?"*

---

### Archetype 4: "We already use [Competitor / In-House Terraform]"
* **Prospect Psychology**: They feel defensive about the time and budget they already invested in their existing tooling (e.g. Datadog, Terraform, CloudWatch).
* **Fatal Mistake**: Trashing their existing vendor (*"Datadog doesn't do drift remediation well!"*). This attacks the prospect's intelligence and prior buying decisions.
* **The Battle-Tested Recovery Play (The Unconsidered Blind Spot Hook)**:
  1. Praises and validates their choice of existing vendor.
  2. Highlights the exact technical boundary where the vendor stops and configuration drift begins.

#### Draft Template:
> *"Makes complete sense, Marcus. Datadog and Terraform are the gold standard for telemetry and initial cluster provisioning—most teams we work with rely on them daily.*
>
> *Where platform teams usually run into friction isn't initial provisioning; it's day-2 operational drift when policies change out-of-band across multiple regions.*
>
> *Are your Terraform state files automatically remediating live drift across all 4 regions, or does that still require manual SRE intervention during on-call fire drills?"*

---

## 3. Ghost Recovery Protocol (When a Prospect Says "Yes" Then Vanishes)

When a prospect replies positively (*"Sounds interesting, let's chat next week"*), but then fails to click the calendar link or respond to follow-ups:

* **Day +2 (Frictionless 2-Slot Choice)**:
  > *"Marcus — following up on our note. To save calendar back-and-forth: would Thursday at 2:00 PM EST or Friday at 10:30 AM EST work for a quick 15-minute diagnostic compare?"*
* **Day +5 (The Voss "Walk-Away" Reset)**:
  > *"Marcus — reaching out one last time. Have you completely given up on comparing notes around multi-cluster policy drift for this quarter? If so, no worries at all—I'll close the loop here."*
  *(Industry benchmark: Generates a 38% recovery reply rate within 24 hours).*
