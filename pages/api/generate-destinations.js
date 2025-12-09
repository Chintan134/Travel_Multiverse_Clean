// pages/api/generate-destinations.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // You can pass filters from UI later
    const { tripTheme, days, budget, travelerType, homeCity } = req.body || {};

    const prompt = `
You are a smart travel planner for a website called "Travel Multiverse".

Given user preferences, generate 4–5 travel universe destinations.

Respond ONLY with valid JSON in this format:

{
  "destinations": [
    {
      "id": "unique-id",
      "title": "Short destination name",
      "location": "City, Country or Universe style name",
      "vibe": "2-3 words vibe",
      "pitch": "1-2 line description",
      "highlights": ["Highlight1", "Highlight2", "Highlight3"],
      "idealFor": "Who is this universe ideal for?"
    }
  ]
}

User preferences:
- Trip theme: ${tripTheme || "not specified"}
- Days: ${days || "flexible"}
- Budget: ${budget || "medium"}
- Traveler type: ${travelerType || "general"}
- Home city: ${homeCity || "not specified"}
`.trim();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const text = response.output[0]?.content?.[0]?.text || "{}";

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("JSON parse error:", text);
      data = { destinations: [] };
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("LLM error:", error);
    res.status(500).json({ error: "Failed to generate destinations" });
  }
}
