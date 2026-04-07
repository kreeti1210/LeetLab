import { Agent, run } from "@openai/agents";
import { checkInputGuardrail } from "../ai/guard.js";

// 🔥 Create agent once (outside function)
const codingAgent = new Agent({
  name: "LeetLab Assistant",
  model: "gpt-4.1-mini",
  instructions: `
You are an AI coding assistant for a LeetCode-style platform.

        STRICT RULES:
        - DO NOT provide full code solutions
        - DO NOT give exact answers
        - DO NOT return copy-paste code

        YOU MUST:
        - Explain approach step-by-step
        - Give hints and intuition
        - Suggest data structures (HashMap, Two Pointers, etc.)
        - Help users think, not solve for them

        If user asks for full code:
        → Politely refuse and guide instead

        Tone:
        - Friendly
        - Encouraging
        - Mentor-like
        `,
});

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 🔥 Step 1 — Guardrail
    const isUnsafe = await checkInputGuardrail(message);

    if (isUnsafe) {
      return res.status(200).json({
        reply:
          "I can’t provide full solutions, but I can guide you step-by-step. What part are you stuck on?",
      });
    }

    // 🔥 Step 2 — (Optional: user context later)
    const response = await run(codingAgent, message);

    // 🔥 Step 3 — Extract response
    const reply =
      response?.output?.[0]?.content?.[0]?.text ||
      response?.finalOutput ||
      "No response";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat controller error:", error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
