# 🗄️ Pillar 5: Data Schemas & State Contracts (SCHEMA) — God Mode SaaS ABM SDR

## 1. GTM Strategy Configuration (`gtm-config.yaml`) Schema

Defines product positioning, economics, buyer personas, disqualifiers, and proof points:

```yaml
# yaml-language-server: $schema=./schemas/gtm-config.schema.json
version: "1.0.0"
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
    - "Less than 25 software engineers on LinkedIn"
    - "Primary cloud infrastructure is on-premise legacy without public cloud"
    - "Active paying customer or existing open opportunity in CRM"
    - "Headquartered in sanctioned geographies"

buying_committee:
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
    implication_focus: "Cloud egress margin contraction, SOC 2 compliance delays, headcount efficiency"
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

## 2. Persistent Account Ledger Schema (`Account_Ledger.json`)

The state contract for tracking account identity, multi-threaded buying committees, touch history across all 3 channels, and temporal calendar state:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AccountLedger",
  "type": "object",
  "required": ["account_id", "domain", "status", "tri_vector_score", "buying_committee", "cadence_state"],
  "properties": {
    "account_id": { "type": "string" },
    "domain": { "type": "string" },
    "company_name": { "type": "string" },
    "status": {
      "type": "string",
      "enum": ["discovered", "researching", "prospecting_active", "paused_holiday", "paused_ooo", "sqa_booked", "disqualified", "cooling_off"]
    },
    "tri_vector_score": {
      "type": "object",
      "required": ["icp_fit", "buying_priority", "confidence"],
      "properties": {
        "icp_fit": { "type": "integer", "minimum": 0, "maximum": 100 },
        "buying_priority": { "type": "integer", "minimum": 0, "maximum": 100 },
        "confidence": { "type": "number", "minimum": 0.0, "maximum": 1.0 }
      }
    },
    "temporal_state": {
      "type": "object",
      "properties": {
        "timezone": { "type": "string" },
        "country_code": { "type": "string" },
        "is_code_freeze": { "type": "boolean" },
        "paused_until": { "type": ["string", "null"], "format": "date-time" },
        "last_touch_timestamp": { "type": ["string", "null"], "format": "date-time" }
      }
    },
    "buying_committee": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["contact_id", "name", "title", "role_category", "contact_status"],
        "properties": {
          "contact_id": { "type": "string" },
          "name": { "type": "string" },
          "email": { "type": "string" },
          "phone": { "type": ["string", "null"] },
          "linkedin_url": { "type": "string" },
          "role_category": { 
            "type": "string",
            "enum": ["champion", "economic_buyer", "technical_evaluator", "user"]
          },
          "contact_status": {
            "type": "string",
            "enum": ["uncontacted", "engaged", "ooo", "replied_positive", "opt_out"]
          }
        }
      }
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

## 3. BANT AE Handoff Record (`BANT_Dossier.json`)

The structured verification payload generated when a meeting is confirmed:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "BANT_Dossier",
  "type": "object",
  "required": ["account_domain", "meeting_datetime", "budget_proof", "authority_attendees", "verified_need", "timeframe_months"],
  "properties": {
    "account_domain": { "type": "string" },
    "meeting_datetime": { "type": "string", "format": "date-time" },
    "estimated_acv": { "type": "number", "minimum": 10000 },
    "budget_proof": {
      "type": "object",
      "properties": {
        "metric": { "type": "string" },
        "observed_value": { "type": "string" },
        "confidence": { "type": "number" }
      }
    },
    "authority_attendees": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "title": { "type": "string" },
          "buying_role": { "type": "string" }
        }
      }
    },
    "verified_need": {
      "type": "object",
      "properties": {
        "core_friction": { "type": "string" },
        "quantified_implication": { "type": "string" },
        "source_citation": { "type": "string" }
      }
    },
    "timeframe_months": { "type": "number", "maximum": 6 },
    "compelling_event": { "type": "string" }
  }
}
```
