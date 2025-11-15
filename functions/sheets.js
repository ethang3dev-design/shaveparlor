// ---------------- Cloudflare Pages Function: sheets.js ----------------
// This proxies requests from your site → Cloudflare → Google Apps Script
// so your GAS endpoint is hidden and CORS-safe.

export async function onRequest(context) {
  const GOOGLE_URL =
    "https://script.google.com/macros/s/AKfycbypSO_TIVome8l-jdIqOHjXLmfaf0Mi_8tQukNzIG9BrC8gH0sd3bcnqm4AaeSmQa7Y9A/exec";

  const request = context.request;

  // ----- Handle CORS preflight (OPTIONS) -----
  if (request.method === "OPTIONS") {
    return new Response("", {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    // ----- GET → LIST appointments -----
    if (request.method === "GET") {
      const googleRes = await fetch(`${GOOGLE_URL}?action=list`);
      const data = await googleRes.json();

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }

    // ----- POST → ADD appointment -----
    if (request.method === "POST") {
      const body = await request.json();

      const googleRes = await fetch(GOOGLE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await googleRes.json();

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }

    // ----- Everything else is blocked -----
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
