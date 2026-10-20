/**
 * Terminal Recording Simulator for TikTok / YouTube Shorts / X
 * Run: node marketing/simulate_demo.js
 * Record your screen using Screen Studio, OBS, or QuickTime!
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function typeCommand(text, speed = 40) {
  process.stdout.write('\x1b[32muser@workstation:~$ \x1b[0m');
  for (const char of text) {
    process.stdout.write(char);
    await delay(speed);
  }
  process.stdout.write('\n');
}

async function runDemo() {
  console.clear();
  await delay(1000);

  // SCENE 1: The Savage GitRoast Demo
  console.log('\x1b[1;33m[ SCENE 1: THE FORENSIC GIT ROAST ]\x1b[0m\n');
  await typeCommand('npx gitroast facebook/react', 50);
  await delay(400);

  console.log('\x1b[36m- Excavating commit history & issue debt for facebook/react...\x1b[0m');
  await delay(800);
  console.log('\x1b[32m✔ Forensic code roast complete!\x1b[0m\n');

  console.log(`
\x1b[31m╭──────────────────────────────────────────────────────────────────────────────╮
│                                                                              │
│   🔥 GITROAST FORENSIC CODE REPORT                                           │
│   Repository: facebook/react  [⭐ 234,512 | ⚠️ 1,420 issues]                 │
│                                                                              │
│   SURVIVAL SCORE:  82 / 100  [DIAGNOSIS: SURVIVABLE WITH TRAUMA]             │
│                                                                              │
│   🎙️ THE FORENSIC ROAST:                                                     │
│   1. Your issues tab has 1,420 tickets aging like fine milk in a hot         │
│      server room.                                                            │
│   2. 312 stale pull requests. Contributors are waiting for approval in        │
│      retirement homes.                                                       │
│   3. Recent commit: "update test". Shakespeare could never capture that       │
│      depth of human suffering.                                               │
│                                                                              │
│   🐦 TWEET YOUR SHAME: https://vernedaily.xyz/roast                          │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯\x1b[0m
`);

  await delay(3000);

  // SCENE 2: The Agent Arsenal Anti-Bloat Demo
  console.log('\n\x1b[1;33m[ SCENE 2: STOPPING AGENT BLOAT IN CURSOR ]\x1b[0m\n');
  await typeCommand('npx agent-arsenal add anti-bloat', 45);
  await delay(300);

  console.log('\x1b[36m- Installing 1 skill(s)...\x1b[0m');
  await delay(600);
  console.log('\x1b[32m✔ Installed 1 skill(s)\x1b[0m\n');

  console.log(`
\x1b[36m╭───────────────────────────────────────────────────────────────────────╮
│                                                                       │
│   ✔ SKILL(S) INSTALLED SUCCESSFULLY                                   │
│                                                                       │
│   Target Environment: Cursor (.cursor/skills/)                        │
│   Active Skill:       ✂️  anti-bloat — forces 60% less code           │
│                                                                       │
│   👉 How to trigger: "Apply the anti-bloat skill to this file."       │
│                                                                       │
╰───────────────────────────────────────────────────────────────────────╯\x1b[0m
`);

  await delay(2500);

  // SCENE 3: The Edge Playground Callout
  console.log('\x1b[1;32m' + '='.repeat(60));
  console.log('🚀 TRY LIVE IN YOUR BROWSER WITHOUT TERMINAL:');
  console.log('👉 https://vernedaily.xyz/roast');
  console.log('👉 https://vernedaily.xyz/arsenal');
  console.log('='.repeat(60) + '\x1b[0m\n');
}

runDemo();
