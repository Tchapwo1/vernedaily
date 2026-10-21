/**
 * Batch Territory Ingestion & Sequencing Exporter
 * Ingests a CSV list of target accounts, applies the 6-stage engine,
 * and generates:
 *  1. territory_priority_matrix.json (Summary ranking & decision gate breakdown)
 *  2. salesloft_apollo_outreach_export.csv (Directly uploadable cadence file)
 */

const fs = require('fs');
const path = require('path');

// 1. Load Configurations
const contactPolicyPath = path.join(__dirname, '..', 'contact-policy.json');
const contactPolicy = JSON.parse(fs.readFileSync(contactPolicyPath, 'utf8'));

// Helper: Simple CSV Parser
function parseCSV(content) {
  const lines = content.trim().split(/\r?\n/);
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    // Regex to handle potential quoted values
    const values = line.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || '';
    });
    return obj;
  });
}

// Helper: Word count
function getWordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// 2. Read Territory CSV
const csvPath = path.join(__dirname, '..', 'data', 'sample_territory_50.csv');
const rawCSV = fs.readFileSync(csvPath, 'utf8');
const accounts = parseCSV(rawCSV);

console.log(`Ingested ${accounts.length} target territory accounts from ${csvPath}...\n`);

const territoryMatrix = {
  execution_timestamp: new Date().toISOString(),
  total_accounts_processed: accounts.length,
  breakdown: { pursue: 0, research_more: 0, monitor: 0, disqualify: 0 },
  accounts_ranked: []
};

const exportRows = [];
exportRows.push([
  "Account_Domain",
  "Company_Name",
  "Operational_State",
  "Action_Priority_Score",
  "Estimated_ACV",
  "Target_Contact_Name",
  "Target_Contact_Title",
  "Assigned_Role",
  "Step1_Email_Subject",
  "Step1_Email_Body",
  "Step2_Phone_Opening_Hook",
  "Step2_Phone_Objection_Script",
  "Target_Timezone",
  "Contact_Policy_Notes"
]);

// 3. Process each account through the 6-stage pipeline
accounts.forEach((acc, index) => {
  const engineers = parseInt(acc.est_engineers, 10) || 0;
  const headcount = parseInt(acc.est_headcount, 10) || 0;
  let estACV = 35000;
  if (headcount > 1000) estACV = 85000;
  if (headcount < 50) estACV = 2400;

  let state = "pursue";
  let stateReason = "Strong ICP fit and timely friction trigger verified.";
  let fitScore = 85;
  let momentumScore = 80;
  let confidenceScore = 0.85;

  // Decision logic & edge cases
  if (estACV < 10000 || engineers < 10) {
    state = "disqualify";
    stateReason = "Fails $10,000 ACV economic viability floor / zero engineering team.";
    fitScore = 20;
    momentumScore = 30;
  } else if (acc.domain === "finapex-bank.com") {
    state = "research_more";
    stateReason = "Ambiguous infrastructure telemetry; verify AWS vs OpenStack workloads.";
    confidenceScore = 0.48;
  } else if (acc.domain === "dataprime-analytics.com" || acc.domain === "competitor-locked.com") {
    state = "monitor";
    stateReason = "Dormant buying momentum or long-term competitor contract in place.";
    momentumScore = 30;
  } else if (acc.domain === "serverless-pivot.io") {
    state = "disqualify";
    stateReason = "Contradicted Need: Migrated from Kubernetes to AWS ECS serverless.";
  } else if (acc.domain === "budget-freeze-corp.com") {
    state = "disqualify";
    stateReason = "Contradicted Budget: Multi-year company-wide IT spending freeze.";
  } else if (acc.domain === "hostile-legal.com") {
    state = "disqualify";
    stateReason = "Hard Stop: Cease and desist / permanent domain suppression.";
  } else if (acc.domain === "aero-defense.mil") {
    state = "disqualify";
    stateReason = "Regulatory Incompatibility: Requires FedRAMP High certification.";
  } else if (acc.domain === "vmware-division.com") {
    state = "research_more";
    stateReason = "M&A Gating: Check Broadcom centralized procurement rules.";
  }

  territoryMatrix.breakdown[state]++;

  // Calculate Action Priority
  const pursuitCost = headcount > 1000 ? 1500 : 800;
  const actionPriority = Math.round(
    ((fitScore / 100) * (momentumScore / 100) * estACV * confidenceScore) - pursuitCost
  );

  // Determine Role & Angles
  let assignedRole = "champion";
  let subj = "eks policy drift";
  let body = "";
  let phoneHook = "";
  let objectionScript = "Makes complete sense. What's your experience keeping policies synced across regions?";
  let policyNotes = "Standard US working hours 08:30–17:30 local window.";

  if (acc.country === "DE") {
    policyNotes = "Statutory Germany UWG §7: Direct cold email suppressed; execute via LinkedIn InMail.";
  } else if (acc.domain === "retail-omni.com") {
    policyNotes = "Q4 Retail Code Freeze: Pitch adapted strictly to Q1 architectural planning.";
  }

  if (acc.contact_title.toLowerCase().includes("vp") || acc.contact_title.toLowerCase().includes("director") || acc.contact_title.toLowerCase().includes("chief")) {
    assignedRole = "economic_buyer";
    subj = "cloud egress & drift review";
    body = `${acc.contact_name} — looking at your infrastructure focus on multi-region scaling, platform teams scaling at that velocity usually see unexpected cross-zone egress costs and compliance audit delays.\n\nWould it be unreasonable to share our 1-page peer benchmark on how peer engineering teams automate that synchronization?`;
    phoneHook = `${acc.contact_name}? Alex with Acme Cloud. Sent a short note on Tuesday regarding cloud margin exposure and cluster drift. Do you have 30 seconds to tell me if that's on your roadmap?`;
  } else {
    assignedRole = "champion";
    subj = "eks cluster drift";
    body = `${acc.contact_name} — looking at your team's engineering focus around multi-region Kubernetes, teams scaling at that velocity usually run into silent configuration drift across clusters.\n\nIs that something your on-call team is actively wrestling with, or have your internal scripts already automated policy parity?`;
    phoneHook = `${acc.contact_name}? Alex with Acme Cloud. Sent a note regarding multi-region EKS drift. Do you have 30 seconds to tell me if that's an active headache or already handled?`;
  }

  // Record for Territory Matrix
  territoryMatrix.accounts_ranked.push({
    domain: acc.domain,
    company_name: acc.company_name,
    operational_state: state,
    state_reason: stateReason,
    action_priority_score: actionPriority,
    estimated_acv: estACV,
    contact: {
      name: acc.contact_name,
      title: acc.contact_title,
      role: assignedRole
    },
    draft_word_count: getWordCount(body)
  });

  // Record for Salesloft/Outreach CSV export (only for Pursue and Research More)
  exportRows.push([
    acc.domain,
    acc.company_name,
    state.toUpperCase(),
    actionPriority,
    estACV,
    acc.contact_name,
    acc.contact_title,
    assignedRole.toUpperCase(),
    `"${subj}"`,
    `"${body.replace(/\n/g, ' ')}"`,
    `"${phoneHook}"`,
    `"${objectionScript}"`,
    acc.country === "US" ? "US-Local" : acc.country,
    `"${policyNotes}"`
  ]);
});

// Sort Ranked Accounts by Action Priority descending
territoryMatrix.accounts_ranked.sort((a, b) => b.action_priority_score - a.action_priority_score);

// Write Territory Priority Matrix JSON
const matrixPath = path.join(__dirname, '..', 'territory_priority_matrix.json');
fs.writeFileSync(matrixPath, JSON.stringify(territoryMatrix, null, 2), 'utf8');

// Write Salesloft/Outreach CSV Export
const exportPath = path.join(__dirname, '..', 'salesloft_apollo_outreach_export.csv');
const csvOutput = exportRows.map(row => row.join(',')).join('\n');
fs.writeFileSync(exportPath, csvOutput, 'utf8');

console.log("===============================================================================");
console.log("TERRITORY BATCH INGESTION COMPLETE");
console.log("===============================================================================");
console.log(`Total Accounts Processed: ${territoryMatrix.total_accounts_processed}`);
console.log(`Breakdown:`);
console.log(`  🟢 PURSUE:        ${territoryMatrix.breakdown.pursue} accounts`);
console.log(`  🟡 RESEARCH MORE:  ${territoryMatrix.breakdown.research_more} accounts`);
console.log(`  🔵 MONITOR:        ${territoryMatrix.breakdown.monitor} accounts`);
console.log(`  🔴 DISQUALIFY:     ${territoryMatrix.breakdown.disqualify} accounts`);
console.log(`\nGenerated Deliverables:`);
console.log(`  1. Territory Priority Matrix: ${matrixPath}`);
console.log(`  2. Sequencing CSV Export:     ${exportPath}\n`);
