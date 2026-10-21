import { evaluateDynamicAccount } from './enrichment/connector.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API Route: Dynamic Live Account Research
    if (url.pathname === '/api/research' && request.method === 'POST') {
      try {
        const body = await request.json();
        const domain = (body.domain || '').trim();

        if (!domain) {
          return new Response(JSON.stringify({ error: 'Please provide a target company domain (e.g. linear.app).' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        }

        // Run dynamic 6-stage enrichment & evaluation engine
        const evaluation = await evaluateDynamicAccount(domain, env);

        return new Response(JSON.stringify(evaluation), {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    // API Route: Email Capture / Subscription
    if (url.pathname === '/api/subscribe' && request.method === 'POST') {
      try {
        const body = await request.json();
        const email = (body.email || '').trim().toLowerCase();
        const source = (body.source || 'edge-playground').trim();

        // Basic RFC 5322 regex check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          return new Response(JSON.stringify({ error: 'Please provide a valid email address.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        }

        // Store into Cloudflare KV
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
        return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Rewrite /cockpit to /cockpit.html for clean URL routing
    if (url.pathname === '/cockpit') {
      const cockpitUrl = new URL('/cockpit.html', request.url);
      return env.ASSETS ? env.ASSETS.fetch(new Request(cockpitUrl, request)) : new Response('Not found', { status: 404 });
    }

    // Fallback: serve static assets from website directory
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Asset not found', { status: 404 });
  },
};
