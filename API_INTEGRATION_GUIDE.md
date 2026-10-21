# Language-Agnostic Developer Integration Guide
### Using the Account Intelligence Engine Without `npm` or Node Dependencies
**Document Version:** 1.0.0  
**Target Audience:** Backend Developers (Python, Go, Rust, Ruby), DevOps Engineers, and System Integrators  
**Core Purpose:** How to inspect, query, and integrate the engine using standard REST APIs, cURL, Python, Go, Docker, or direct SQLite queries—with **zero npm package dependencies**.

---

## 1. Why We Do Not Require `npm`

You do not need to install `npm` packages, manage `node_modules`, or run JavaScript CLI tools to integrate with or evaluate this engine.

The platform is designed around **language-neutral contracts**:
1. **Zero-Install Interactive Web Cockpit**: Open [`website/cockpit.html`](file:///d:/Downloads/saas-abm-sdr-skill-package/website/cockpit.html) directly in any browser.
2. **Standard HTTP REST API**: Can be called via `cURL`, Python, Go, or Postman.
3. **Standard SQLite WAL Database**: Can be inspected directly with any SQLite viewer or native database driver.
4. **Flat File Interoperability**: Ingests and exports standard CSV and JSON.

---

## 2. Option A: Zero-Install Interactive Browser Cockpit

If you or a non-technical founder want to test the engine immediately without touching a terminal:

1. Double-click or open [`website/cockpit.html`](file:///d:/Downloads/saas-abm-sdr-skill-package/website/cockpit.html) in Chrome, Edge, Safari, or Firefox.
2. Browse the **Daily Action Queue** sorted by $H_{\text{priority}}$.
3. Inspect primary citations, quotes, and facts vs. inferences in the **Evidence Dossier**.
4. Test the **AE Discovery Handoff** and 1-click export to CSV.

---

## 3. Option B: Standard HTTP REST API (cURL)

The engine exposes a lightweight REST endpoint (compatible with Cloudflare Workers, FastAPI, or Express):

### Request: Evaluate an Account Domain
```bash
curl -X POST "https://api.vernedaily.xyz/v1/research" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "domain": "datadrive-logistics.com",
    "icp_criteria": {
      "min_engineers": 30,
      "cloud_stack": ["AWS", "Kubernetes"]
    }
  }'
```

### Response Payload:
```json
{
  "account_domain": "datadrive-logistics.com",
  "operational_state": "pursue",
  "priority_score_h": 25161,
  "scores": {
    "icp_fit": 88,
    "buying_momentum": 72,
    "epistemic_confidence": 0.90,
    "estimated_acv": 45000
  },
  "primary_evidence": [
    {
      "type": "verified_fact",
      "source_url": "https://greenhouse.io/datadrive/jobs/48291",
      "observed_date": "2026-10-07",
      "raw_quote": "Managing multi-cluster Kubernetes deployment synchronization across US and EU regions."
    }
  ],
  "diagnostic_draft": {
    "subject": "multi-cluster k8s sync",
    "body": "David — saw your Greenhouse listing for multi-cluster Kubernetes deployment sync across US and EU.\n\nTypically see engineering teams burning 12+ hours per week when cluster state drifts between regions.\n\nOpen to reviewing the 1-page architecture teardown showing how peers automated that sync?",
    "word_count": 46
  },
  "ae_discovery_brief": {
    "recommended_first_question": "David, are engineers currently firefighting sync failures across regions, or is state drift handled?",
    "traps_to_avoid": ["Do not assume budget is pre-allocated", "Do not claim automated rollback without human verification"]
  }
}
```

---

## 4. Option C: Python Integration (No npm)

Python developers can query the API using standard `requests` or query the local SQLite WAL ledger directly using Python's built-in `sqlite3` standard library.

### Python Script: Inspecting the SQLite Ledger Directly
```python
import sqlite3
import json

# Connect to the local SQLite database in WAL mode
conn = sqlite3.connect('ledger.db')
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

# Query the top 10 accounts in the Daily Action Queue
query = """
SELECT 
    domain, 
    company_name, 
    operational_state, 
    prioritization_heuristic_score, 
    icp_fit, 
    buying_momentum, 
    estimated_acv
FROM accounts
WHERE operational_state = 'pursue'
ORDER BY prioritization_heuristic_score DESC
LIMIT 10;
"""

cursor.execute(query)
rows = cursor.fetchall()

print("=== DAILY ACTION QUEUE (PYTHON) ===")
for idx, row in enumerate(rows, start=1):
    print(f"#{idx}: {row['company_name']} ({row['domain']}) -> Priority: £{row['prioritization_heuristic_score']:,.0f} (ACV: £{row['estimated_acv']:,.0f})")

conn.close()
```

---

## 5. Option D: Go Integration (No npm)

Go developers can consume the JSON payload with zero external dependencies using the standard library `net/http` and `encoding/json`:

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

type AccountRequest struct {
	Domain string `json:"domain"`
}

type AccountResponse struct {
	Domain           string  `json:"account_domain"`
	OperationalState string  `json:"operational_state"`
	PriorityScore    float64 `json:"priority_score_h"`
}

func main() {
	payload, _ := json.Marshal(AccountRequest{Domain: "datadrive-logistics.com"})
	resp, err := http.Post("https://api.vernedaily.xyz/v1/research", "application/json", bytes.NewBuffer(payload))
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	var result AccountResponse
	json.NewDecoder(resp.Body).Decode(&result)

	fmt.Printf("Account: %s | State: %s | Priority: £%.0f\n", result.Domain, result.OperationalState, result.PriorityScore)
}
```

---

## 6. Option E: Direct SQLite CLI (Universal Terminal Query)

Any developer with the standard `sqlite3` utility (pre-installed on macOS, Linux, and Windows) can query the database directly:

```bash
# Check accounts currently in Pursue sorted by priority
sqlite3 ledger.db "SELECT domain, operational_state, prioritization_heuristic_score FROM accounts WHERE operational_state = 'pursue' ORDER BY prioritization_heuristic_score DESC;"

# Check accounts halted in Research More with evidence gaps
sqlite3 ledger.db "SELECT domain, state_rationale FROM accounts WHERE operational_state = 'research_more';"
```

---

## 7. Option F: Docker (Zero Local Dependency Setup)

If you prefer containerized execution without installing anything on your host machine:

```bash
# Run the pre-built container exposing the web cockpit and API on port 8080
docker run -d -p 8080:8080 --name vernedaily ghcr.io/tchapwo1/vernedaily:latest

# Open http://localhost:8080 in your browser
```

---

### Summary of Access Methods

| Persona | Preferred Interface | Dependency Required |
| :--- | :--- | :--- |
| **Founder / Sales Leader** | [`website/cockpit.html`](file:///d:/Downloads/saas-abm-sdr-skill-package/website/cockpit.html) (Web Cockpit) | **None** (Any standard web browser) |
| **SDR / Account Executive** | Web Cockpit + CSV Export | **None** (Browser / Excel / Google Sheets) |
| **Python / Go Developer** | HTTP REST API / cURL / SQLite | **None** (Standard library HTTP or SQLite3) |
| **DevOps / SysAdmin** | Docker Container | Docker runtime only |
| **Node.js Developer** | CLI Runner | Node.js (Optional) |
