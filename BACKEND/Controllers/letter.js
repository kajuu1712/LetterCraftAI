import Letter from "../Models/letter.js";
import generateContent from "../Config/generate.js";

export const generateLetter = async (req, res) => {
  try {
    const userId = req.user.id;

    const { type, tone, input } = req.body;

    // basic validation
    if (!type || !tone || !input || Object.keys(input).length === 0) {
      return res.status(400).json({ message: "type, tone and input are required" });
    }

    // build prompt
    const prompt = `
You are a professional letter writing assistant.
Only write professional letters based on the details provided.
If the input seems off-topic, harmful, or irrelevant to letter writing, politely refuse and ask for proper details instead.

---

Write a ${tone} ${type.replace(/_/g, " ")} using the details below:

${Object.entries(input).map(([k, v]) => `${k}: ${v}`).join("\n")}

Instructions:
- Keep it professional, structured, and impactful
- Return only the letter, no explanations or extra text
- Use proper letter formatting with greeting and sign-off
    `;

    // call Gemini
    const aiResponse = await generateContent(prompt);

    // save to DB
    const newLetter = await Letter.create({
      user: userId,
      type,
      tone,
      input,
      output: aiResponse
    });

    res.status(201).json({
      message: "Letter generated successfully",
      letter: newLetter
    });

  } catch (err) {
    res.status(500).json({
      message: "Error generating letter",
      error: err.message
    });
  }
};