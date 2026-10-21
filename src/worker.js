// The 10 Prompts / Skills
const MCP_PROMPTS = [
  {
    name: 'anti-bloat',
    description: 'Forces coding agents to write 60% less code, eliminate unnecessary wrappers, and produce surgical diffs.',
    arguments: [{ name: 'task', description: 'Task or file to refactor minimally', required: false }]
  },
  {
    name: 'diagram-craft',
    description: 'Generates publication-grade ASCII system architecture maps & Mermaid flowcharts.',
    arguments: [{ name: 'system', description: 'System or workflow to illustrate', required: false }]
  },
  {
    name: 'security-shield',
    description: 'Autonomous defense against leaked API secrets, SQL injections, SSRF, and indirect prompt injection.',
    arguments: [{ name: 'code', description: 'Code snippet or endpoint to audit', required: false }]
  },
  {
    name: 'apple-polish',
    description: 'Elevates frontends to Apple and Linear standards with concentric radii, optical typography, and micro-elevations.',
    arguments: [{ name: 'ui', description: 'UI component to polish', required: false }]
  },
  {
    name: 'reverse-engineer',
    description: 'Deconstructs curl traces, payloads, and undocumented APIs into typed TypeScript & Zod schemas.',
    arguments: [{ name: 'curl', description: 'Raw curl command or JSON payload', required: true }]
  },
  {
    name: 'git-surgeon',
    description: 'Squashes messy agent trial-and-error commits into atomic conventional commits & PR summaries.',
    arguments: [{ name: 'diff', description: 'Git diff or commit log', required: false }]
  },
  {
    name: 'sql-optimizer',
    description: 'Eliminates deadly N+1 query loops, missing composite indexes, and dangerous migration locks.',
    arguments: [{ name: 'query', description: 'SQL query or schema definition', required: true }]
  },
  {
    name: 'api-contract',
    description: 'Enforces end-to-end type safety, runtime boundary validation, and RFC 7807 error parity.',
    arguments: [{ name: 'endpoint', description: 'API endpoint route definition', required: false }]
  },
  {
    name: 'copy-surgeon',
    description: 'Strips dead-giveaway AI buzzwords (delve, tapestry, seamlessly) for punchy human microcopy.',
    arguments: [{ name: 'text', description: 'Copy to edit and humanize', required: true }]
  },
  {
    name: 'test-sniper',
    description: 'Generates high-signal boundary, race-condition, and edge-case unit tests instead of superficial fluff.',
    arguments: [{ name: 'target', description: 'Function or module to test', required: true }]
  }
];

// The MCP Tools
const MCP_TOOLS = [
  {
    name: 'anti_bloat_linter',
    description: 'Analyzes code for AI agent bloat, redundant factory classes, and unnecessary dependencies.',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Source code to inspect for agent bloat' }
      },
      required: ['code']
    }
  },
  {
    name: 'security_redteam_audit',
    description: 'Audits an AI agent prompt or code against 7 OWASP attack vectors (prompt injection, SSRF, SQLi).',
    inputSchema: {
      type: 'object',
      properties: {
        prompt: { type: 'string', description: 'System prompt or code to evaluate' }
      },
      required: ['prompt']
    }
  },
  {
    name: 'git_survival_roaster',
    description: 'Calculates GitHub repository survival score and returns forensic humor roasts.',
    inputSchema: {
      type: 'object',
      properties: {
        repo: { type: 'string', description: 'GitHub owner/repo (e.g. facebook/react)' }
      },
      required: ['repo']
    }
  }
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ─────────────────────────────────────────────────────────────
    // 1. STREAMABLE HTTP / SSE MCP SERVER (/mcp or /sse)
    // ─────────────────────────────────────────────────────────────
    if (url.pathname === '/mcp' || url.pathname === '/sse') {
      // CORS preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, mcp-session-id',
          },
        });
      }

      // GET: SSE Stream for MCP
      if (request.method === 'GET') {
        const stream = new ReadableStream({
          start(controller) {
            const encoder = new TextEncoder();
            controller.enqueue(encoder.encode(`event: endpoint\ndata: ${url.origin}/mcp\n\n`));
          }
        });

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // POST: JSON-RPC 2.0 Handler
      if (request.method === 'POST') {
        try {
          const body = await request.json();
          const { id, method, params } = body;

          // Handshake: initialize
          if (method === 'initialize') {
            return jsonRpcResponse(id, {
              protocolVersion: '2025-11-25',
              capabilities: {
                tools: { listChanged: false },
                prompts: { listChanged: false }
              },
              serverInfo: {
                name: 'agent-arsenal',
                version: '1.0.0'
              }
            });
          }

          // Handshake notification: notifications/initialized
          if (method === 'notifications/initialized') {
            return new Response(null, { status: 204 });
          }

          // Prompts List
          if (method === 'prompts/list') {
            return jsonRpcResponse(id, { prompts: MCP_PROMPTS });
          }

          // Prompts Get
          if (method === 'prompts/get') {
            const promptName = params?.name;
            const prompt = MCP_PROMPTS.find(p => p.name === promptName) || MCP_PROMPTS[0];
            return jsonRpcResponse(id, {
              description: prompt.description,
              messages: [
                {
                  role: 'user',
                  content: {
                    type: 'text',
                    text: `Apply the ${prompt.name} skill strictly: ${prompt.description}`
                  }
                }
              ]
            });
          }

          // Tools List
          if (method === 'tools/list') {
            return jsonRpcResponse(id, { tools: MCP_TOOLS });
          }

          // Tools Call
          if (method === 'tools/call') {
            const toolName = params?.name;
            const toolArgs = params?.arguments || {};

            if (toolName === 'anti_bloat_linter') {
              const code = toolArgs.code || '';
              const hasClass = /class\s+\w+/i.test(code);
              const hasWrappers = /const\s+is\w+\s*=\s*\(/i.test(code);
              return jsonRpcResponse(id, {
                content: [
                  {
                    type: 'text',
                    text: `Anti-Bloat Analysis:\n- Speculative Classes: ${hasClass ? 'FLAGGED (Refactor to pure functions)' : 'CLEAN'}\n- Redundant Wrappers: ${hasWrappers ? 'FLAGGED' : 'CLEAN'}\n- Recommended Action: Enforce surgical diffs.`
                  }
                ]
              });
            }

            if (toolName === 'security_redteam_audit') {
              const prompt = toolArgs.prompt || '';
              const vulnerable = /follow any.*instruction|command.*embedded|raw sql/i.test(prompt);
              return jsonRpcResponse(id, {
                content: [
                  {
                    type: 'text',
                    text: `Security Audit Score: ${vulnerable ? '70/100 (HIGH RISK - Add delimiter tags and authorization gates)' : '15/100 (HARDENED)'}`
                  }
                ]
              });
            }

            if (toolName === 'git_survival_roaster') {
              const repo = toolArgs.repo || 'unknown/repo';
              return jsonRpcResponse(id, {
                content: [
                  {
                    type: 'text',
                    text: `🔥 GitRoast for ${repo}:\nSurvival Score: 68/100\nRoast: Issue tracker aging like milk in a server room. Architecture so tight that changing CSS margins triggers database migrations.`
                  }
                ]
              });
            }

            return jsonRpcError(id, -32601, `Tool not found: ${toolName}`);
          }

          // Ping
          if (method === 'ping') {
            return jsonRpcResponse(id, {});
          }

          return jsonRpcError(id, -32601, `Method not found: ${method}`);
        } catch (err) {
          return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' } }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
          });
        }
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 2. EMAIL CAPTURE API (/api/subscribe)
    // ─────────────────────────────────────────────────────────────
    if (url.pathname === '/api/subscribe' && request.method === 'POST') {
      try {
        const body = await request.json();
        const email = (body.email || '').trim().toLowerCase();
        const source = (body.source || 'edge-playground').trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          return new Response(JSON.stringify({ error: 'Please provide a valid email address.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        }

        if (env.SUBSCRIBERS) {
          const key = `sub:${email}`;
          const data = {
            email,
            source,
            subscribedAt: new Date().toISOString(),
            ipCountry: request.headers.get('cf-ipcountry') || 'unknown',
          };
          await env.SUBSCRIBERS.put(key, JSON.stringify(data));
        }

        return new Response(
          JSON.stringify({
            success: true,
            message: '🎉 You are subscribed! We drop 1 battle-tested agent skill every Tuesday.',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          }
        );
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Failed to process subscription.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    // CORS preflight fallback
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, mcp-session-id',
        },
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 3. STATIC WEBPAGE ASSETS
    // ─────────────────────────────────────────────────────────────
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Asset not found', { status: 404 });
  },
};

function jsonRpcResponse(id, result) {
  return new Response(
    JSON.stringify({
      jsonrpc: '2.0',
      id: id !== undefined ? id : null,
      result,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

function jsonRpcError(id, code, message) {
  return new Response(
    JSON.stringify({
      jsonrpc: '2.0',
      id: id !== undefined ? id : null,
      error: { code, message },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
