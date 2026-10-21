# 🗄️ Pillar 5: Data Schemas & State Contracts (SCHEMA) — Evidence-Led Account Intelligence & Pipeline Creation Engine

## 1. GTM Strategy Configuration (`gtm-config.yaml`) Schema

Defines product positioning, target economics, dynamic buyer roles, hard disqualifiers, and proof points:

```yaml
# yaml-language-server: $schema=./schemas/gtm-config.schema.json
version: "2.0.0"
company:
  name: "Acme Cloud"
  category: "Enterprise Cloud Reliability & Drift Automation"
  min_deal_floor_acv: 10000

economics:
  mid_market:
    min_acv: 15000
    target_acv: 35000
    avg_sales_cycle_days: 60
    min_engineers: 30
  enterprise:
    min_acv: 50000
    target_acv: 120000
    avg_sales_cycle_days: 120
    min_engineers: 100

disqualifiers:
  hard_stops:
    - "Fewer than 25 software engineers on LinkedIn"
    - "Primary cloud infrastructure is entirely legacy on-premises without public cloud"
    - "Active paying customer or existing open opportunity in CRM"
    - "Headquartered in sanctioned geographies"

stakeholder_profiles:
  champion:
    target_titles:
      - "Staff Platform Engineer"
      - "Lead Site Reliability Engineer"
      - "Principal DevOps Engineer"
    implication_focus: "On-call fatigue, manual cluster sync, deployment failures"
    trojan_asset: "1-Page Cross-Cluster Drift Remediation Architecture"
  
  economic_buyer:
    target_titles:
      - "VP of Infrastructure"
      - "VP of Engineering"
      - "Chief Technology Officer"
    implication_focus: "Cloud egress margin contraction, SOC 2 compliance delays, engineering velocity"
    trojan_asset: "Executive Peer Benchmark & Cost Optimization Case Study"

  technical_evaluator:
    target_titles:
      - "Director of Information Security"
      - "Chief Information Security Officer"
    implication_focus: "Policy audit drift, zero-trust RBAC violations, continuous compliance"

competitor_matrix:
  CompetitorLegacy:
    weakness: "Requires heavy agent daemons on every node, scaling costs exponentially"
    counter_proof: "Customer Y replaced CompetitorLegacy, cutting cluster overhead by 34%"
```

---

## 2. Evidence Assertion Schema (`Evidence_Assertion.schema.json`)

The atomic evidence contract required for any material claim, trigger, or tech-stack assertion:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EvidenceAssertion",
  "type": "object",
  "required": [
    "assertion_id",
    "account_domain",
    "claim_text",
    "source_url",
    "source_type",
    "observed_timestamp",
    "raw_verbatim_quote",
    "epistemic_classification",
    "confidence_score",
    "decay_half_life_days"
  ],
  "properties": {
    "assertion_id": { "type": "string" },
    "account_domain": { "type": "string" },
    "claim_text": { "type": "string" },
    "source_url": { "type": "string", "format": "uri" },
    "source_type": {
      "type": "string",
      "enum": [
        "first_party_website",
        "job_posting",
        "sec_filing",
        "cloud_telemetry",
        "engineering_blog",
        "conference_presentation",
        "verified_press_release"
      ]
    },
    "publication_date": { "type": ["string", "null"], "format": "date" },
    "observed_timestamp": { "type": "string", "format": "date-time" },
    "raw_verbatim_quote": { "type": "string" },
    "normalized_claim": { 
      "type": "string",
      "description": "Standardized canonical claim for cross-signal contradiction detection"
    },
    "epistemic_classification": {
      "type": "string",
      "enum": ["verified_fact", "logical_inference", "working_hypothesis"]
    },
    "confidence_score": { "type": "number", "minimum": 0.0, "maximum": 1.0 },
    "decay_half_life_days": { "type": "integer", "enum": [45, 90, 120, 180] },
    "expiry_timestamp": { "type": "string", "format": "date-time" },
    "status": {
      "type": "string",
      "enum": ["active", "stale_pending_revalidation", "invalidated"]
    },
    "contradiction_status": {
      "type": "string",
      "enum": ["uncontested", "flagged_for_human_review"],
      "default": "uncontested"
    },
    "contradicting_evidence_id": { "type": ["string", "null"] }
  }
}
```

---

## 3. Persistent Account Ledger Schema (`Account_Ledger.json`)

The state contract governing account lifecycle, scoring, the 4-state decision gate, dynamic stakeholders, and contact policy compliance:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AccountLedger",
  "type": "object",
  "required": [
    "account_id",
    "domain",
    "operational_state",
    "scores",
    "stakeholder_graph",
    "contact_policy_state"
  ],
  "properties": {
    "account_id": { "type": "string" },
    "domain": { "type": "string" },
    "company_name": { "type": "string" },
    "operational_state": {
      "type": "string",
      "enum": ["pursue", "research_more", "monitor", "disqualify"],
      "description": "Uncertainty-aware decision gate status"
    },
    "state_rationale": { "type": "string" },
    "scores": {
      "type": "object",
      "required": ["icp_fit", "buying_momentum", "evidence_confidence", "action_priority_score"],
      "properties": {
        "icp_fit": { "type": "integer", "minimum": 0, "maximum": 100 },
        "buying_momentum": { "type": "integer", "minimum": 0, "maximum": 100 },
        "evidence_confidence": { "type": "number", "minimum": 0.0, "maximum": 1.0 },
        "action_priority_score": { "type": "number" },
        "estimated_acv": { "type": "number", "minimum": 10000 }
      }
    },
    "contact_policy_state": {
      "type": "object",
      "required": ["timezone", "jurisdiction", "touch_count_7d"],
      "properties": {
        "timezone": { "type": "string" },
        "jurisdiction": { "type": "string", "enum": ["US", "GB", "DE", "FR", "OTHER"] },
        "touch_count_7d": { "type": "integer" },
        "last_touch_timestamp": { "type": ["string", "null"], "format": "date-time" },
        "paused_until": { "type": ["string", "null"], "format": "date-time" },
        "pause_reason": { "type": ["string", "null"] }
      }
    },
    "stakeholder_graph": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["contact_id", "name", "current_title", "buying_role", "influence_level", "engagement_status"],
        "properties": {
          "contact_id": { "type": "string" },
          "name": { "type": "string" },
          "current_title": { "type": "string" },
          "buying_role": {
            "type": "string",
            "enum": ["champion", "economic_buyer", "technical_evaluator", "blocker", "end_user"]
          },
          "role_verification": { "type": "string", "enum": ["verified", "inferred"] },
          "influence_level": { "type": "string", "enum": ["high", "medium", "low"] },
          "decision_criteria": { "type": "array", "items": { "type": "string" } },
          "relationship_strength": { "type": "string", "enum": ["unknown", "cold", "engaged", "advocate"] },
          "engagement_status": {
            "type": "string",
            "enum": ["uncontacted", "in_flight", "ooo_active", "replied_positive", "opt_out"]
          },
          "email": { "type": ["string", "null"] },
          "linkedin_url": { "type": ["string", "null"] }
        }
      }
    },
    "evidence_assertions": {
      "type": "array",
      "items": { "type": "string", "description": "References to Assertion IDs" }
    },
    "touch_history": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["step", "channel", "timestamp", "target_contact_id", "outcome"],
        "properties": {
          "step": { "type": "integer" },
          "channel": { "type": "string", "enum": ["linkedin", "email", "phone"] },
          "timestamp": { "type": "string", "format": "date-time" },
          "target_contact_id": { "type": "string" },
          "draft_id": { "type": ["string", "null"] },
          "outcome": { "type": "string" }
        }
      }
    }
  }
}
```

---

## 5. Persistent Storage & Job Ledger DDL (`schema.sql` — SQLite WAL)

For operational pilots without premature cloud daemon complexity, the state is persisted in an embedded SQLite database configured with Write-Ahead Logging (`WAL`):

```sql
-- Pragmatic SQLite WAL Schema for SDR Pods
PRAGMA journal_mode = WAL;
PRAGMA busy_timeout = 5000;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;

-- 1. Accounts Table
CREATE TABLE IF NOT EXISTS accounts (
  account_id TEXT PRIMARY KEY,
  domain TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  operational_state TEXT NOT NULL CHECK(operational_state IN ('pursue', 'research_more', 'monitor', 'disqualify')),
  state_precedence_tier INTEGER NOT NULL CHECK(state_precedence_tier BETWEEN 1 AND 4),
  suppression_scope TEXT NOT NULL DEFAULT 'none' CHECK(suppression_scope IN ('none', 'account_permanent', 'account_temporary_hold', 'contact_level', 'channel_specific')),
  state_rationale TEXT NOT NULL,
  icp_fit INTEGER NOT NULL CHECK(icp_fit BETWEEN 0 AND 100),
  buying_momentum INTEGER NOT NULL CHECK(buying_momentum BETWEEN 0 AND 100),
  epistemic_confidence REAL NOT NULL CHECK(epistemic_confidence BETWEEN 0.0 AND 1.0),
  prioritization_heuristic_score REAL NOT NULL,
  estimated_acv REAL NOT NULL CHECK(estimated_acv >= 10000),
  pursuit_cost REAL NOT NULL DEFAULT 500 CHECK(pursuit_cost >= 0),
  timezone TEXT NOT NULL DEFAULT 'UTC',
  jurisdiction TEXT NOT NULL CHECK(jurisdiction IN ('US', 'GB', 'DE', 'FR', 'OTHER')),
  touch_count_7d INTEGER NOT NULL DEFAULT 0 CHECK(touch_count_7d >= 0),
  last_touch_at TEXT,
  paused_until TEXT,
  pause_reason TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Evidence Assertions Table (Deep Provenance)
CREATE TABLE IF NOT EXISTS evidence_assertions (
  assertion_id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(account_id) ON DELETE CASCADE,
  claim_text TEXT NOT NULL,
  normalized_claim TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_type TEXT NOT NULL,
  source_published_at TEXT,
  retrieved_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_verified_at TEXT NOT NULL DEFAULT (datetime('now')),
  next_revalidation_at TEXT NOT NULL,
  source_reliability TEXT NOT NULL CHECK(source_reliability IN ('tier1_primary_filing', 'tier2_direct_job_post', 'tier3_engineering_blog', 'tier4_unverified_third_party')),
  raw_verbatim_quote TEXT NOT NULL,
  epistemic_classification TEXT NOT NULL CHECK(epistemic_classification IN ('verified_fact', 'logical_inference', 'working_hypothesis')),
  confidence_score REAL NOT NULL CHECK(confidence_score BETWEEN 0.0 AND 1.0),
  decay_half_life_days INTEGER NOT NULL CHECK(decay_half_life_days IN (45, 90, 120, 180)),
  expiry_timestamp TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('active', 'stale_pending_revalidation', 'invalidated')),
  contradiction_status TEXT NOT NULL DEFAULT 'uncontested' CHECK(contradiction_status IN ('uncontested', 'flagged_for_human_review')),
  resolution_history TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3. Evidence Contradictions Table (Many-to-Many Cross-Evidence Tracking)
CREATE TABLE IF NOT EXISTS evidence_contradictions (
  contradiction_id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(account_id) ON DELETE CASCADE,
  assertion_id_a TEXT NOT NULL REFERENCES evidence_assertions(assertion_id),
  assertion_id_b TEXT NOT NULL REFERENCES evidence_assertions(assertion_id),
  status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open', 'resolved_falsified_a', 'resolved_falsified_b', 'resolved_nuanced')),
  resolution_notes TEXT,
  resolved_at TEXT,
  resolved_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 4. Persistent Job Ledger Table (Atomic Claims & Lease Protocol)
CREATE TABLE IF NOT EXISTS jobs (
  job_id TEXT PRIMARY KEY,
  account_domain TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'completed', 'failed')),
  attempt_count INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  locked_by TEXT,
  locked_at TEXT,
  lease_expires_at TEXT,
  completed_at TEXT,
  error_log TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 5. Statutory Compliance Audit Table (Auditable & Versioned Governance)
CREATE TABLE IF NOT EXISTS compliance_audits (
  audit_id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(account_id) ON DELETE CASCADE,
  policy_version TEXT NOT NULL,
  policy_last_reviewed_at TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  channel TEXT NOT NULL CHECK(channel IN ('email', 'linkedin_direct', 'phone')),
  recipient_classification TEXT NOT NULL CHECK(recipient_classification IN ('corporate_subscriber_ltd', 'individual_sole_trader', 'unknown_pending_review', 'exempt')),
  recipient_classification_confidence REAL NOT NULL CHECK(recipient_classification_confidence BETWEEN 0.0 AND 1.0),
  lawful_basis TEXT NOT NULL CHECK(lawful_basis IN ('legitimate_interest', 'consent', 'contract')),
  consent_or_exception_evidence TEXT NOT NULL,
  decision_reason TEXT NOT NULL,
  opt_out_link_included BOOLEAN NOT NULL DEFAULT 1,
  audit_timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_accounts_domain ON accounts(domain);
CREATE INDEX IF NOT EXISTS idx_accounts_state ON accounts(operational_state);
CREATE INDEX IF NOT EXISTS idx_evidence_account ON evidence_assertions(account_id);
CREATE INDEX IF NOT EXISTS idx_contradictions_account ON evidence_contradictions(account_id);
CREATE INDEX IF NOT EXISTS idx_jobs_claim ON jobs(status, lease_expires_at, attempt_count);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status, locked_at);
```

---

## 4. Progressive Qualification Dossier Schema (`Progressive_Qualification_Dossier.schema.json`)

The structured deliverable replacing rigid BANT with evidence-based qualification states and recommended discovery validation questions:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ProgressiveQualificationDossier",
  "type": "object",
  "required": [
    "account_domain",
    "qualification_timestamp",
    "estimated_acv",
    "decision_gate_state",
    "qualification_dimensions",
    "recommended_ae_discovery_plan"
  ],
  "properties": {
    "account_domain": { "type": "string" },
    "qualification_timestamp": { "type": "string", "format": "date-time" },
    "estimated_acv": { "type": "number", "minimum": 10000 },
    "decision_gate_state": { "type": "string", "enum": ["pursue"] },
    "qualification_dimensions": {
      "type": "object",
      "required": ["budget", "authority", "need", "timeframe"],
      "properties": {
        "budget": {
          "type": "object",
          "required": ["status", "evidence_ids", "details", "validation_question"],
          "properties": {
            "status": { "type": "string", "enum": ["verified", "inferred", "unknown", "contradicted"] },
            "evidence_ids": { "type": "array", "items": { "type": "string" } },
            "details": { "type": "string" },
            "validation_question": { "type": "string" }
          }
        },
        "authority": {
          "type": "object",
          "required": ["status", "mapped_stakeholders", "missing_coverage", "validation_question"],
          "properties": {
            "status": { "type": "string", "enum": ["verified", "inferred", "unknown", "contradicted"] },
            "mapped_stakeholders": { "type": "array", "items": { "type": "string" } },
            "missing_coverage": { "type": "array", "items": { "type": "string" } },
            "validation_question": { "type": "string" }
          }
        },
        "need": {
          "type": "object",
          "required": ["status", "core_friction_hypothesis", "quantified_implication", "evidence_ids", "validation_question"],
          "properties": {
            "status": { "type": "string", "enum": ["verified", "inferred", "unknown", "contradicted"] },
            "core_friction_hypothesis": { "type": "string" },
            "quantified_implication": { "type": "string" },
            "evidence_ids": { "type": "array", "items": { "type": "string" } },
            "validation_question": { "type": "string" }
          }
        },
        "timeframe": {
          "type": "object",
          "required": ["status", "target_milestone", "evidence_ids", "validation_question"],
          "properties": {
            "status": { "type": "string", "enum": ["verified", "inferred", "unknown", "contradicted"] },
            "target_milestone": { "type": "string" },
            "compelling_event": { "type": ["string", "null"] },
            "evidence_ids": { "type": "array", "items": { "type": "string" } },
            "validation_question": { "type": "string" }
          }
        }
      }
    },
    "recommended_ae_discovery_plan": {
      "type": "object",
      "required": ["primary_diagnostic_angle", "recommended_first_question", "traps_to_avoid"],
      "properties": {
        "primary_diagnostic_angle": { "type": "string" },
        "recommended_first_question": { "type": "string" },
        "traps_to_avoid": { "type": "array", "items": { "type": "string" } }
      }
    }
  }
}
```

---

## 5. Persistent Storage & Job Ledger DDL (`schema.sql` — SQLite WAL)

For operational pilots without premature cloud daemon complexity, the state is persisted in an embedded SQLite database configured with Write-Ahead Logging (`WAL`):

```sql
-- Pragmatic SQLite WAL Schema for SDR Pods
PRAGMA journal_mode = WAL;
PRAGMA busy_timeout = 5000;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;

-- 1. Accounts Table
CREATE TABLE IF NOT EXISTS accounts (
  account_id TEXT PRIMARY KEY,
  domain TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  operational_state TEXT NOT NULL CHECK(operational_state IN ('pursue', 'research_more', 'monitor', 'disqualify')),
  state_precedence_tier INTEGER NOT NULL CHECK(state_precedence_tier BETWEEN 1 AND 4),
  suppression_scope TEXT NOT NULL DEFAULT 'none' CHECK(suppression_scope IN ('none', 'account_permanent', 'account_temporary_hold', 'contact_level', 'channel_specific')),
  state_rationale TEXT NOT NULL,
  icp_fit INTEGER NOT NULL CHECK(icp_fit BETWEEN 0 AND 100),
  buying_momentum INTEGER NOT NULL CHECK(buying_momentum BETWEEN 0 AND 100),
  epistemic_confidence REAL NOT NULL CHECK(epistemic_confidence BETWEEN 0.0 AND 1.0),
  prioritization_heuristic_score REAL NOT NULL,
  estimated_acv REAL NOT NULL CHECK(estimated_acv >= 10000),
  pursuit_cost REAL NOT NULL DEFAULT 500 CHECK(pursuit_cost >= 0),
  timezone TEXT NOT NULL DEFAULT 'UTC',
  jurisdiction TEXT NOT NULL CHECK(jurisdiction IN ('US', 'GB', 'DE', 'FR', 'OTHER')),
  touch_count_7d INTEGER NOT NULL DEFAULT 0 CHECK(touch_count_7d >= 0),
  last_touch_at TEXT,
  paused_until TEXT,
  pause_reason TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Evidence Assertions Table (Deep Provenance)
CREATE TABLE IF NOT EXISTS evidence_assertions (
  assertion_id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(account_id) ON DELETE CASCADE,
  claim_text TEXT NOT NULL,
  normalized_claim TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_type TEXT NOT NULL,
  source_published_at TEXT,
  retrieved_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_verified_at TEXT NOT NULL DEFAULT (datetime('now')),
  next_revalidation_at TEXT NOT NULL,
  source_reliability TEXT NOT NULL CHECK(source_reliability IN ('tier1_primary_filing', 'tier2_direct_job_post', 'tier3_engineering_blog', 'tier4_unverified_third_party')),
  raw_verbatim_quote TEXT NOT NULL,
  epistemic_classification TEXT NOT NULL CHECK(epistemic_classification IN ('verified_fact', 'logical_inference', 'working_hypothesis')),
  confidence_score REAL NOT NULL CHECK(confidence_score BETWEEN 0.0 AND 1.0),
  decay_half_life_days INTEGER NOT NULL CHECK(decay_half_life_days IN (45, 90, 120, 180)),
  expiry_timestamp TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('active', 'stale_pending_revalidation', 'invalidated')),
  contradiction_status TEXT NOT NULL DEFAULT 'uncontested' CHECK(contradiction_status IN ('uncontested', 'flagged_for_human_review')),
  resolution_history TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3. Evidence Contradictions Table (Many-to-Many Cross-Evidence Tracking)
CREATE TABLE IF NOT EXISTS evidence_contradictions (
  contradiction_id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(account_id) ON DELETE CASCADE,
  assertion_id_a TEXT NOT NULL REFERENCES evidence_assertions(assertion_id),
  assertion_id_b TEXT NOT NULL REFERENCES evidence_assertions(assertion_id),
  status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open', 'resolved_falsified_a', 'resolved_falsified_b', 'resolved_nuanced')),
  resolution_notes TEXT,
  resolved_at TEXT,
  resolved_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 4. Persistent Job Ledger Table (Atomic Claims & Lease Protocol)
CREATE TABLE IF NOT EXISTS jobs (
  job_id TEXT PRIMARY KEY,
  account_domain TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'completed', 'failed')),
  attempt_count INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  locked_by TEXT,
  locked_at TEXT,
  lease_expires_at TEXT,
  completed_at TEXT,
  error_log TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 5. Statutory Compliance Audit Table (Auditable & Versioned Governance)
CREATE TABLE IF NOT EXISTS compliance_audits (
  audit_id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(account_id) ON DELETE CASCADE,
  policy_version TEXT NOT NULL,
  policy_last_reviewed_at TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  channel TEXT NOT NULL CHECK(channel IN ('email', 'linkedin_direct', 'phone')),
  recipient_classification TEXT NOT NULL CHECK(recipient_classification IN ('corporate_subscriber_ltd', 'individual_sole_trader', 'unknown_pending_review', 'exempt')),
  recipient_classification_confidence REAL NOT NULL CHECK(recipient_classification_confidence BETWEEN 0.0 AND 1.0),
  lawful_basis TEXT NOT NULL CHECK(lawful_basis IN ('legitimate_interest', 'consent', 'contract')),
  consent_or_exception_evidence TEXT NOT NULL,
  decision_reason TEXT NOT NULL,
  opt_out_link_included BOOLEAN NOT NULL DEFAULT 1,
  audit_timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_accounts_domain ON accounts(domain);
CREATE INDEX IF NOT EXISTS idx_accounts_state ON accounts(operational_state);
CREATE INDEX IF NOT EXISTS idx_evidence_account ON evidence_assertions(account_id);
CREATE INDEX IF NOT EXISTS idx_contradictions_account ON evidence_contradictions(account_id);
CREATE INDEX IF NOT EXISTS idx_jobs_claim ON jobs(status, lease_expires_at, attempt_count);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status, locked_at);
```
