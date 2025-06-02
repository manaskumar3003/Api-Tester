const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: "Enter API KEY" });

async function logAiAdvice(apiResponse) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You're an expert API consultant embedded in an API testing platform. A user just made the following API request:

- Method: {{method}}
- URL: {{url}}
- Headers: {{headers (as JSON)}}
- Body: {{body (as JSON, optional)}}
- Response Status: {{status}}
- Response Time: {{time}} ms
- Response Body: {{responseBody (truncated if too large)}}

Give the user:
1. A quick interpretation of what this API call is doing.
2. Any useful tip, warning, or insight (e.g., about security, efficiency, REST conventions).
3. A clever or advanced testing suggestion, if applicable.
Keep it short, professional, and relevant.
please don't use * tags or markdown formatting.
\n\n${JSON.stringify(apiResponse)}`,
    });
    // Return the advice string
    return response.text;
  } catch (err) {
    console.error("AI Error:", err.message);
    return "AI advice unavailable.";
  }
}

module.exports = { logAiAdvice };