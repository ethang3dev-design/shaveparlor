// --------- Netlify Function: sheets.js ---------
// Communicates with your Google Apps Script Web App backend
// MUST be placed in /netlify/functions/sheets.js

export async function handler(event, context) {
  // ---- Your Google Apps Script Web App URL ----
  const GOOGLE_URL =
    "https://script.google.com/macros/s/AKfycbypSO_TIVome8l-jdIqOHjXLmfaf0Mi_8tQukNzIG9BrC8gH0sd3bcnqm4AaeSmQa7Y9A/exec";

  try {
    // ---- Handle LIST appointments (GET) ----
    if (event.httpMethod === "GET") {
      const response = await fetch(`${GOOGLE_URL}?action=list`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify(data),
      };
    }

    // ---- Handle ADD appointment (POST) ----
    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body);

      const response = await fetch(GOOGLE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify(data),
      };
    }

    // ---- Unsupported method ----
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Method Not Allowed",
    };
  } catch (err) {
    // ---- Error handler ----
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: String(err) }),
    };
  }
}
