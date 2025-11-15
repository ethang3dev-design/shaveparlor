// ----------- Cloudflare Worker (Functions) --------------
// This replaces Netlify and proxies to your Google Apps Script

export async function onRequest(context) {
  const GOOGLE_URL =
    "https://script.google.com/macros/s/AKfycbypSO_TIVome8l-jdIqOHjXLmfaf0Mi_8tQukNzIG9BrC8gH0sd3bcnqm4AaeSmQa7Y9A/exec";

  const request = context.request;
  const url = new URL(request.url);

  try {
    if (request.method === "GET") {
      const r = await fetch(GOOGLE_URL + "?action=list");
      const data = await r.json();

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (request.method === "POST") {
      const body = await request.json();

      const r = await fetch(GOOGLE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await r.json();

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return new Response("Method Not Allowed", { status: 405 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}
