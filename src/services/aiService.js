import { GEMINI_API_KEY } from "../../secret.js";

export const chatWithAI = async ({ message, joinedCourses = [], allCourses = [] }) => {
  // add joined courses to AI
  const joinedTitles = joinedCourses.map(c => c.title || c);

  const systemPrompt = `
You are a friendly AI learning assistant in an e-learning app.

Joined courses: ${joinedTitles.length ? joinedTitles.join(", ") : "none"}

Available courses:
${allCourses
    .map(
      c =>
        `- ${c.title} (Instructor: ${c.instructor}, Category: ${c.category}, Price: ${c.price})
  Description: ${c.description}`
    )
    .join("\n")}

Instructions:
1. Suggest 1-3 courses from Available Courses that the user hasn't joined yet.
2. If the user asks about a specific course, use the course's description, instructor, and category to answer.
3. Answer politely, concisely, and educationally.
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt },
                { text: message },
              ],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Gemini error:", res.status, text);
      throw new Error(`Gemini API error: ${res.status} - ${text}`);
    }

    const data = await res.json();

    // Gemini response structure
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no reply.";
    return reply;
  } catch (err) {
    console.error("chatWithAI error:", err);
    return "Sorry, something went wrong while trying to reply.";
  }
};
