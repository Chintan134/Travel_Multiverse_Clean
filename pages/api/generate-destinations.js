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
    const {
      planner,
      destination,
      companion,
      days,
      prompt,
      mode,
      flavor,
      detail,
    } = req.body || {};

    const effectiveDays = Number(days) || 3;
    const isMultiverse =
      String(flavor || "").toLowerCase() === "multiverse" &&
      String(mode || "").toLowerCase() !== "classic";

    const baseDescription =
      planner === "freeform"
        ? `The user described their trip in free-form as: "${prompt || ""}".`
        : `The user chose a structured planner:
- Destination: ${destination || "not specified"}
- Companion: ${companion || "not specified"}
- Days: ${effectiveDays}
${prompt ? `- Extra notes: ${prompt}` : ""}`;

    const creativeDescription = `
Creative mode settings:
- Overall mode: ${mode || "classic / not specified"}
- Creative flavor: ${flavor || "none"}
- Extra detail (mood, persona, or photo description): ${detail || "none"}
`.trim();

    const systemInstructions = `
You are an expert AI travel designer for a product called Travel Multiverse.
Your job is to interpret user inputs and generate a personalized, structured itinerary in valid JSON format only.
You will search deeply across destinations, themes, moods, and activities to create the most relevant and inspiring travel experience for the user.

You MUST respond with ONLY valid JSON, with no commentary, Markdown, or extra text.

JSON Format (always follow this structure):

{
  "itineraries": {
    "single": [
      {
        "title": "Day 1",
        "items": [
          "Activity 1",
          "Activity 2",
          "Activity 3"
        ]
      }
    ],
    "multiverse": {
      "realistic": [
        { "title": "Day 1", "items": ["..."] }
      ],
      "dream": [
        { "title": "Day 1", "items": ["..."] }
      ],
      "vibe": [
        { "title": "Day 1", "items": ["..."] }
      ]
    }
  }
}


Rules

-"single" must ALWAYS be present with at least one day.
-If the user is in multiverse mode (${isMultiverse}), populate all three variations under "multiverse":
-realistic → grounded, practical, achievable.
-dream → no limits, bold, premium, bucket-list level.
-vibe → cinematic and mood-driven; match the selected vibe, tone, or emotional style.
-Each day should include 3–5 concise, high-impact items.
-Language should be friendly, energetic, and inspiring, never cheesy.
-For vibe/mood selections, choose destinations and activities aligned with the user’s chosen mood.
-For photo uploads, infer visual themes and recommend epic locations or activities matching the aesthetic.
-Respect the number of days (${effectiveDays}) as closely as possible.
`.trim();

    const userInstructions = `
User context:

${baseDescription}

${creativeDescription}

Generate the itinerary JSON now.
`.trim();

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: systemInstructions },
        { role: "user", content: userInstructions },
      ],
    });

    let text = response.output[0]?.content?.[0]?.text || "{}";
let cleaned = text.trim();

// If the model ever wraps JSON in ``` ``` fences, strip everything outside braces
if (!cleaned.startsWith("{")) {
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }
}

let data;
try {
  data = JSON.parse(cleaned);
} catch (e) {
  console.error("JSON parse error from model:", cleaned, e.message);
  data = { itineraries: null };
}


    return res.status(200).json(data);
  } catch (error) {
    console.error("LLM error:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate itineraries from the model" });
  }
}
