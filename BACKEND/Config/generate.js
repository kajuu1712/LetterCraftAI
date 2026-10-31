import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gpt-6.1-terra",      //gemini-3-flash-preview"
      contents: prompt
    });

    return response.text;
  } catch (err) {
    throw new Error("Gemini API error: " + err.message);
  }
};

export default generateContent;