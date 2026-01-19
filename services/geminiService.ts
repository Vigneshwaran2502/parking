
import { GoogleGenAI } from "@google/genai";

// Always use the API key directly from process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGreenAdvice = async (userProfile: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User Context: ${userProfile}\n\nAct as a sustainable urban mobility expert for Chennai. Provide a brief (max 3 sentences), encouraging, and context-aware tip for the user to increase their Green Score and reduce urban CO2. Keep it practical and local to Chennai.`,
    });
    return response.text || "Keep driving green! Every km saved counts toward a cleaner Chennai.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Consolidate your trips to Anna Nagar to save more CO2 today.";
  }
};

export const analyzeBookingImpact = async (bookingDetails: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this parking booking: ${JSON.stringify(bookingDetails)}. Calculate the qualitative environmental impact for a report. Focus on how this specific behavior helps Chennai's traffic. Format as a 2-sentence summary.`,
    });
    return response.text;
  } catch (error) {
    return "Your choice helps reduce traffic idling in T. Nagar, contributing to a cooler city.";
  }
};
