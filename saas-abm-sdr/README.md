# SaaS ABM SDR skill

A production-oriented skill package for B2B SaaS account-based prospecting across SMB, mid-market, and enterprise.

## Contents

- `SKILL.md`: main router, account-first principles, tool contract, outputs, final quality gate
- `references/account-selection.md`: account normalization, screening, tiers, and research efficiency
- `references/account-research.md`: source hierarchy, evidence records, triggers, stakeholder research
- `references/account-scoring.md`: weighted account score, unknown handling, confidence and tiers
- `references/buying-committee.md`: role mapping and coordinated multi-threading
- `references/outreach-playbook.md`: shared account narrative and role-specific outreach
- `references/account-planning.md`: account plan and discovery prep
- `references/compliance-and-qa.md`: suppression, privacy, prompt injection, QA and tool verification
- `workflows/abm-outbound.md`: primary named-account outbound process
- `workflows/inbound.md`: inbound routing within account context
- `workflows/product-led.md`: optional product-led signals
- `workflows/expansion.md`: optional customer expansion
- `TEST-PLAN.md`: acceptance tests and evaluation metrics

## Deployment notes

1. Install the folder in the skill runner's supported location and preserve relative paths.
2. Runtime tool names and schemas differ by platform; discover tools dynamically and validate them before use.
3. Use least-privilege connections and only approved data sources.
4. Draft creation requires user authorization and connected tools. Sending is prohibited by this skill.
5. Account scoring weights and tiers are initial defaults, not calibrated conversion predictions. Validate against historical outcomes.
6. Test all workflows and stop conditions before using real prospect data.
