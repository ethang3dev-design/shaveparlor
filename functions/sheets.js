export async function handler(event, context) {
  const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbypSO_TIVome8l-jdIqOHjXLmfaf0Mi_8tQukNzIG9BrC8gH0sd3bcnqm4AaeSmQa7Y9A/exec";

  try {
    // ----- GET (list appointments) -----
    if (event.httpMethod === "GET") {
      const r = await fetch(GOOGLE_URL + "?action=list");
      const data = await r.json();

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify(data)
      };
    }

    // ----- POST (add appointment) -----
    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body);

      const r = await fetch(GOOGLE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await r.json();

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify(data)
      };
    }

    // ----- NON SUPPORTED METHOD -----
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }
  catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: String(err) })
    };
  }
}
