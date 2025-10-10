import { OPENAI_API_KEY } from "../../secret.js";

export const chatWithAI = async ({ message, joinedCourses = [], allCourses = [] }) => {
  // add joined courses to AI
  const joinedTitles = joinedCourses.map(c => c.title || c);

  const systemPrompt = `
You are a friendly AI learning assistant in an e-learning app.

Joined courses: ${joinedTitles.length ? joinedTitles.join(", ") : "none"}

Available courses:
${allCourses.map(c => `- ${c.title} (Instructor: ${c.instructor}, Category: ${c.category}, Price: ${c.price})\n  Description: ${c.description}`).join("\n")}

Instructions:
1. Suggest 1-3 courses from Available Courses that the user hasn't joined yet.
2. If the user asks about a specific course, use the course's description, instructor, and category to answer.
3. Answer politely, concisely, and educationally.
`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("OpenAI error:", res.status, text);
      throw new Error(`OpenAI API error: ${res.status} - ${text}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "Sorry, no reply.";
  } catch (err) {
    console.error("chatWithAI error:", err);
    return "Sorry, something went wrong while trying to reply.";
  }
};
