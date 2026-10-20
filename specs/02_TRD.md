# 🛠️ Pillar 2: Technical Requirements Document (TRD) — God Mode SaaS ABM SDR

## 1. System Architecture & Component Diagram

The God Mode SaaS ABM SDR is structured as a modular, event-sourced agentic engine operating on top of a deterministic state machine and tool abstraction layer:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          GOD MODE AGENT RUNTIME                             │
│                                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌───────────────────┐  │
│  │ GTM Config Engine    │  │ Tri-Vector Scorer    │  │ Calendar & OOO    │  │
│  │ (gtm-config.yaml)    │  │ (Fit/Priority/Conf)  │  │ Holiday Engine    │  │
│  └──────────┬───────────┘  └──────────┬───────────┘  └─────────┬─────────┘  │
│             │                         │                        │            │
│             ▼                         ▼                        ▼            │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                  OMNICHANNEL CADENCE ORCHESTRATOR                     │  │
│  │         (28-Day Tri-Touch: LinkedIn, Consultative Email, Phone)       │  │
│  └──────────────────────────────────┬────────────────────────────────────┘  │
│                                     │                                       │
│             ┌───────────────────────┼───────────────────────┐               │
│             ▼                       ▼                       ▼               │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │ SPIN Message Engine │  │ BANT Gatekeeper     │  │ Adversarial Defense │  │
│  │ (Pre-Computed SPIN) │  │ & AE Dossier Synth  │  │ & Input Sanitizer   │  │
│  └──────────┬──────────┘  └──────────┬──────────┘  └──────────┬──────────┘  │
└─────────────┼────────────────────────┼────────────────────────┼─────────────┘
              ▼                        ▼                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PLATFORM-NEUTRAL TOOL CONTRACTS                       │
│                                                                             │
│  • CRM Interface: Read accounts, owners, opportunities, suppression flags.  │
│  • Mailbox Interface: Generate drafts (Gmail/Outlook); no autonomous sends. │
│  • Calendar Interface: Check AE availability, hold slots, verify bookings. │
│  • LinkedIn Interface: Draft connection notes, InMails, interaction steps.  │
│  • Telephony Interface: Generate 15-second hooks, voicemails, battlecards.  │
│  • Enrichment / Web: Scrape job boards, SEC filings, tech stack signals.    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Tool-Use Contract & Platform Independence

All tool integrations operate through platform-agnostic abstract contracts. Tool discovery dynamically inspects available runtime capabilities:

### 1. CRM Connector (`crm_tool`)
- `get_account(domain: string)`: Retrieves lifecycle stage, owner, open opportunities, and recent activity.
- `check_suppression(domain: string, email: string)`: Returns boolean `is_suppressed` and reason (Opt-out, active customer, do-not-contact).
- `create_sqa_opportunity(bant_dossier: object)`: Writes a verified BANT deal stage into the CRM upon meeting confirmation.

### 2. Messaging & Draft Connector (`mail_tool`)
- `create_draft(recipient: string, subject: string, body: string, thread_id?: string)`: Generates a draft in the user's connected mailbox.
- **Strict Constraint**: The tool must never expose or invoke any `send_message` or `dispatch` method.

### 3. Calendar & Scheduling Connector (`calendar_tool`)
- `check_ae_availability(ae_email: string, start_date: string, end_date: string)`: Finds open 30-minute discovery windows.
- `create_tentative_hold(ae_email: string, prospect_email: string, timestamp: string)`: Holds slot pending BANT confirmation.

### 4. Telephony & Calling Interface (`telephony_helper`)
- Generates localized cold calling battlecards with dynamic phone scripts, pattern-interrupt openers, and 20-second voicemails.

---

## 3. Security, Sandboxing & Prompt Injection Defense

Target company websites, job descriptions, and executive bios often contain adversarial prompt injections (e.g., hidden HTML instructions intended to hijack LLM behavior).

### Ingestion Sanitation Protocol
1. **HTML & Tag Stripping**: All external web data is parsed through a pure-text extractor; script tags, styling, hidden divs, and comments are deleted.
2. **Instruction Isolation**: Scraped content is encapsulated inside explicit `<UNTRUSTED_EXTERNAL_DATA>` delimiters.
3. **Canary Token Verification**: The agent checks outbound draft text against a session canary token to guarantee system prompt instructions are not leaked into email drafts.

---

## 4. Calendar, Seasonality & OOO State Logic

1. **Geo-Location Resolver**: Maps target contact's office location to regional ISO 3166-2 calendar rules.
2. **Holiday Throttling**:
   - Compares current execution date against `Holiday_Calendar.json` (UK Bank Holidays, US Federal Holidays, German Feiertage).
   - If target date is within a holiday or school half-term week, outbound frequency is automatically throttled or postponed to the next valid business day.
3. **OOO Parsing Engine**:
   - Detects Out-Of-Office auto-replies via subject lines (`Auto-Reply:`, `Out of office:`) and body tokens.
   - Extracts return date with regex and natural language date parser; updates `Account_Ledger.json`.
   - Extracts mentioned replacement contacts and creates new Buying Committee nodes.

---

## 5. Non-Functional Requirements & Performance Budgets
- **Response Word Count Ceiling**: Maximum 75 words per email draft (verified by regex word counter).
- **Readability Grade Level**: Must pass Flesch-Kincaid Grade Level $\le 5.0$.
- **Research Freshness**: All buying signals and triggers must have an observation date within the preceding 60 days.
- **Account Concurrency Limit**: Maximum 1 touchpoint per target account every 4 business days to prevent cross-contact fatigue.
