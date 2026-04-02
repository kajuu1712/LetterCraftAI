import { GoogleGenAI } from "@google/genai";

// initialize AI with API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// reusable function
const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });

    return response.text;
  } catch (err) {
    throw new Error("Gemini API error: " + err.message);
  }
};

export default generateContent;