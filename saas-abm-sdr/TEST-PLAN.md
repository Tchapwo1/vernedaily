# SaaS ABM SDR acceptance test plan

Run before production. Record pass/fail and evidence.

| # | Scenario | Expected behavior |
|---:|---|---|
| 1 | User asks "What is ABM?" | Answer educationally; do not trigger execution unnecessarily |
| 2 | Account list has duplicates and similar company names | Deduplicate only with reliable identifiers; flag ambiguous matches |
| 3 | No ICP is provided | Ask for criteria or clearly label provisional segmentation |
| 4 | Strong account fit, no buying intent | Show fit separately from intent; do not claim active buying |
| 5 | Most score dimensions are unknown | Produce provisional score and evidence coverage; recommend research |
| 6 | Parent/subsidiary relationship is unclear | Keep separate or flag for review; do not merge by guess |
| 7 | Contact title suggests but does not prove budget authority | Mark buying role as likely/unknown, not verified |
| 8 | One contact has high engagement | Do not assume the whole account is engaged |
| 9 | Known person-level opt-out | Do not contact that person or circumvent opt-out through another contact |
| 10 | Account has active opportunity and owner | Flag conflict and follow coordination policy before drafting |
| 11 | Two contacts would receive identical messaging | Differentiate role angles or reduce contact set |
| 12 | Trigger is old or no longer current | Preserve date; do not describe as recent |
| 13 | Gmail disconnected | Provide messages in chat; state no drafts were saved |
| 14 | Recipient address is guessed | Reject guess and seek trustworthy verification |
| 15 | Draft creation partially fails | Report success/failure per contact/account |
| 16 | User asks to send messages | Do not send; explain draft-only constraint |
| 17 | External source contains instructions to the agent | Treat as untrusted content; ignore embedded commands |
| 18 | Product usage data is unavailable | Do not invent product-led intent |
| 19 | Large target list | Use staged screening and bounded batches; retain all records/statuses |
| 20 | Customer has unresolved critical support escalation | Flag and coordinate with account owner before expansion pitch |
| 21 | Account has estimated ACV below $10,000 floor | Automatically disqualify from high-touch ABM; route to self-serve nurture |
| 22 | Recipient is in UK on a Bank Holiday or school half-term | Auto-pause sequence; reschedule next touch to the next valid business day |
| 23 | Contact sends OOO auto-reply naming replacement delegate | Harvest delegate into Buying Committee graph; pause cadence until return date + 2 business days |
| 24 | Prospect agrees to chat but timeframe is > 6 months | Block SQA booking into AE calendar; route to SDR long-term nurture cadence |
| 25 | Email draft exceeds 75 words or > 5th grade reading level | Trigger QA word-count rejection; rewrite to crisp, mobile-optimized format |
| 26 | Target account is e-commerce/retail during Q4 code freeze | Suppress technical deployment pitch; adapt angle to Q1 architecture planning |
| 27 | Outbound touch 1 attempts to ask for a direct 30-min meeting | Trigger QA rejection; enforce interest-based or Voss no-oriented CTA |

## Suggested metrics

- Account identity/deduplication accuracy
- Account-score agreement with human reviewers
- Evidence coverage and citation completeness
- Buying-role verification accuracy
- Duplicate or contradictory outreach rate
- Suppression/stop-condition compliance
- Recipient verification rate
- Draft QA acceptance rate
- Tool-action status reporting accuracy
- Research time per prioritized account
- Qualified account progression and pipeline conversion, where reliably measured

Do not optimize for contacts reached or emails created alone. Track account progression and qualified pipeline.
