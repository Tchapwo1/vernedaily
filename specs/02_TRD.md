# 🛠️ Pillar 2: Technical Requirements Document (TRD) — Evidence-Led Account Intelligence & Pipeline Creation Engine

## 1. System Architecture & Component Diagram

The engine is structured as a modular, event-sourced intelligence pipeline operating on top of a deterministic 6-stage execution engine and tool abstraction layer:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 ACCOUNT INTELLIGENCE & PIPELINE RUNTIME                     │
│                                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌───────────────────┐  │
│  │ GTM Config Engine    │  │ Evidence Engine      │  │ Contact Policy    │  │
│  │ (gtm-config.yaml)    │  │ & Decay Tracker      │  │ (contact-policy)  │  │
│  └──────────┬───────────┘  └──────────┬───────────┘  └─────────┬─────────┘  │
│             │                         │                        │            │
│             ▼                         ▼                        ▼            │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                 OPPORTUNITY DECISION GATE & SCORER                    │  │
│  │     (Pursue / Research More / Monitor / Disqualify + Action Priority) │  │
│  └──────────────────────────────────┬────────────────────────────────────┘  │
│                                     │                                       │
│             ┌───────────────────────┼───────────────────────┐               │
│             ▼                       ▼                       ▼               │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │ Dynamic Stakeholder │  │ Progressive Qual    │  │ Adversarial Defense │  │
│  │ Graph Engine        │  │ & AE Dossier Synth  │  │ & Input Sanitizer   │  │
│  └──────────┬──────────┘  └──────────┬──────────┘  └──────────┬──────────┘  │
│             │                        │                        │             │
│             ▼                        ▼                        ▼             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                 SALES PLAY & DIAGNOSTIC DRAFT GENERATOR               │  │
│  │     (Hypothesis Testing · Role Framing · Human Approval Boundary)     │  │
│  └──────────────────────────────────┬────────────────────────────────────┘  │
└─────────────────────────────────────┼───────────────────────────────────────┘
                                      ▼
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

All integrations operate through platform-agnostic abstract contracts. The runtime dynamically inspects available capabilities:

### 1. CRM Connector (`crm_tool`)
- `get_account(domain: string)`: Retrieves lifecycle stage, owner, open opportunities, and recent activity.
- `check_suppression(domain: string, email: string)`: Returns boolean `is_suppressed` and reason (Opt-out, active customer, do-not-contact).
- `create_staged_opportunity(dossier: object)`: Writes a progressively qualified opportunity into the CRM upon meeting confirmation.

### 2. Messaging & Draft Connector (`mail_tool`)
- `create_draft(recipient: string, subject: string, body: string, thread_id?: string)`: Generates a reviewable draft in the user's connected mailbox.
- **Strict Execution Constraint**: The tool must never expose or invoke any `send_message`, `dispatch`, or autonomous firing methods.

### 3. Calendar & Scheduling Connector (`calendar_tool`)
- `check_ae_availability(ae_email: string, start_date: string, end_date: string)`: Finds open discovery windows.
- `create_tentative_hold(ae_email: string, prospect_email: string, timestamp: string)`: Holds a tentative slot pending qualification handoff.

### 4. Telephony & Calling Interface (`telephony_helper`)
- Generates localized cold calling battlecards with dynamic phone scripts, pattern-interrupt openers, and 20-second voicemails.

---

## 3. Security, Sandboxing & Network-Level Defense in Depth

Target company websites, job postings, and bios frequently contain adversarial prompt injections or formatting exploits intended to hijack LLM behavior. Security is enforced through defense in depth, operating at the network, parser, and prompt boundary layers.

### A. Network Egress Proxy & Hardened SSRF Defense
All outbound scraping and enrichment requests pass through a dedicated network proxy that inspects socket destinations **outside the LLM environment**:
1. **DNS Pre-Resolution & IP Pinning**: The proxy resolves the destination hostname via secure DNS and validates the resulting IP address *before* establishing an HTTP connection.
2. **Strict IP Denylist**: Outbound socket connections to the following CIDR blocks are immediately aborted with a `403 Forbidden` security exception:
   - AWS / Cloud Metadata: `169.254.169.254/32`
   - IPv4 Loopback: `127.0.0.0/8`
   - Private RFC-1918 subnets: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
   - Carrier-Grade NAT: `100.64.0.0/10`
   - IPv6 Loopback & Link-Local: `::1/128`, `fe80::/10`
3. **Redirect Hop Re-Validation**: Any HTTP 301/302 redirect is intercepted; the redirect target URL is resolved and independently audited against the IP denylist before following the hop.
4. **Protocol Whitelisting**: Outbound connections are restricted strictly to `http://` and `https://` on ports `80` and `443`. All other protocols (`file://`, `gopher://`, `ftp://`, internal ports) are rejected.

### B. Ingestion Sanitization & Prompt Injection Isolation
1. **HTML & Tag Stripping**: External web data is parsed through a pure-text tokenizer; `<script>`, `<style>`, `<iframe>`, `<object>`, hidden CSS divs, and HTML comments are completely purged before entering memory.
2. **Instruction Delimitation**: Extracted text is encapsulated inside strict `<UNTRUSTED_EXTERNAL_DATA>` delimiters. The system prompt instructs the model to treat content within this block strictly as literal string evidence, forbidding execution of any commands found within.
3. **Tool Privilege Separation**: The read-only research and scraping workers have zero tool access to mailbox APIs, CRM write tools, or file persistence.
4. **Canary Token Verification**: The agent checks outbound draft text against a session-specific canary token to guarantee system prompt instructions and internal reasoning are never leaked into prospect communications.

---

## 4. Storage Architecture & Job Ledger (Pragmatic SQLite WAL)

Rather than introducing distributed infrastructure (Redis, BullMQ, Postgres) prematurely during team pilots, the platform employs a robust embedded architecture with explicit host boundaries:

### A. Host Boundary & SQLite WAL Configuration
- **Host Boundary**: SQLite WAL is strictly certified for **single-host execution** (single server, VM, or container with local SSD storage). Network filesystems (NFS, SMB, CIFS) are strictly prohibited due to broken POSIX advisory locking and WAL shared memory (`.shm`) corruption risks.
- **Engine Configuration**: SQLite 3 with `PRAGMA journal_mode = WAL;`, `PRAGMA synchronous = NORMAL;`, and `PRAGMA foreign_keys = ON;`.
- **Concurrency & Busy Handling**: `PRAGMA busy_timeout = 5000;` combined with an application-level exponential backoff retry loop to handle transient writer locks. Concurrency is architecturally bounded to a single dedicated writer process or bounded worker pool (3–5 workers).

### B. Persistent Job Ledger & Atomic Lease Protocol
To prevent duplicate execution and worker deadlocks without an external broker:
1. **Atomic Lease Claiming**:
   Workers claim jobs atomically using a conditional update with a rolling lease window:
   ```sql
   UPDATE jobs 
   SET status = 'processing',
       locked_by = :worker_id,
       locked_at = datetime('now'),
       lease_expires_at = datetime('now', '+5 minutes'),
       attempt_count = attempt_count + 1
   WHERE job_id = (
       SELECT job_id FROM jobs 
       WHERE (status = 'pending' OR (status = 'processing' AND lease_expires_at < datetime('now')))
         AND attempt_count < max_attempts 
       ORDER BY created_at ASC 
       LIMIT 1
   )
   RETURNING *;
   ```
2. **Crash & Stale-Worker Recovery**: Any worker crash automatically releases its job once `lease_expires_at` lapses, allowing another worker to claim the retry without manual operator intervention.
3. **Idempotency Guarantee**: All account state transitions are keyed on `account_id` and committed in an atomic transaction; re-running an already-completed job produces identical deterministic ledger outputs.

---

## 5. Contact Policy, Timezone & Statutory Compliance Engine

1. **Geo-Location & Timezone Resolver**: Maps target contact's office location to regional ISO 3166-2 calendar rules and local timezone offsets.
2. **Contact Policy Enforcement (`contact-policy.json` v2026.2.2)**:
   - **Audit Trail & Fail-Closed Default**: Every contact decision logs `policy_version`, `policy_last_reviewed_at`, `recipient_classification_confidence`, `channel`, and `decision_reason`. Any contact with an unverified legal classification defaults to **fail-closed suppression pending human review**.
   - **Multi-Tiered Suppression Scoping**:
     - *Account-Level Permanent*: Hard disqualification (sanctions, sub-$10k ACV, hostile cease-and-desist). Suppresses entire domain across all channels and reps.
     - *Account-Level Temporary Hold*: Active CRM deal or restructuring freeze. Halts cadence until deal closes; domain is not permanently disqualified.
     - *Contact-Level Opt-Out*: Individual contact opt-out suppresses *only that individual email/LinkedIn profile*; the remaining stakeholders at the company remain addressable.
     - *Channel-Specific Restriction*: Statutory constraint (e.g. UK individual sole trader cold email, German UWG §7 electronic direct marketing). Suppresses the restricted channel while preserving lawful alternative touchpoints.
   - **Jurisdiction Rules**:
     - **Germany (UWG §7 & BGH Case Law)**: Direct unsolicited commercial electronic outreach (cold email and direct LinkedIn InMails) is strictly prohibited without prior express consent (*ausdrückliche Einwilligung*). Unsolicited outreach is suppressed.
     - **United Kingdom (PECR Reg 22/23 & UK GDPR)**: Enforces corporate subscriber verification (Ltd, Plc, LLP allowed; sole traders and traditional partnerships suppressed without prior consent). Mandates documented Legitimate Interests Assessment (LIA) and prominent 1-click opt-out.
     - **United States (CAN-SPAM)**: Accurate non-deceptive headers, physical postal address, and functional opt-out honored within 10 days.
3. **OOO Parsing Engine**:
   - Detects Out-Of-Office auto-replies via subject lines (`Auto-Reply:`, `Out of office:`) and body tokens.
   - Extracts return date with regex and natural language date parser; reschedules follow-up to return date + 1 business day.
   - Extracts mentioned replacement contacts and enters them as provisional stakeholders pending verification.

---

## 6. Non-Functional Requirements & Performance Budgets
- **Response Word Count Ceiling**: Maximum 75 words per email draft (verified by word counter).
- **Readability Grade Level**: Must pass Flesch-Kincaid Grade Level $\le 5.0$.
- **Signal Decay Half-Lives**: 
  - Job Postings: 45 days.
  - Executive Moves: 90 days.
  - Telemetry: 120 days.
  - Financial/SEC Filings: 180 days.
  - Stale signals automatically drop priority and require re-verification.
- **Account Concurrency Limit**: Maximum 2 touches per day across the entire buying group to prevent spam flags.

---

## 6. Deliverability, Catch-All & Secondary Domain Infrastructure

1. **Secondary Domain Isolation**:
   - Outbound campaigns are strictly prohibited from utilizing the primary corporate domain (`acme.com`).
   - Outbound is routed through dedicated secondary domains (e.g. `get-acme.com`, `acme-platform.io`) with separate Google Workspace/M365 tenancies.
   - Enforces 100% strict DMARC (`p=reject`), SPF, and DKIM cryptographic alignment.
2. **Catch-All Email Verification Pipeline**:
   - Detects mail exchangers that accept all incoming SMTP handshakes.
   - Requires secondary verification (e.g. historical deliverability log, MX handshake latency profiling) before scheduling draft creation.
3. **LinkedIn Weekly Budget Controls**:
   - Hard cap of 15 connection requests per day (75 per week) per SDR profile to safeguard account health and prevent platform restrictions.
