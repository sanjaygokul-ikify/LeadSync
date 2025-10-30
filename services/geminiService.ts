import { GoogleGenAI } from "@google/genai";
import { Lead } from '../types';

// Let TypeScript know about the global config object from config.js
declare global {
  interface Window {
    APP_CONFIG?: {
      API_KEY: string;
    };
  }
}

const apiKey = window.APP_CONFIG?.API_KEY;
let ai: GoogleGenAI | null = null;

if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
  console.warn("API_KEY not set in config.js. Please get a key from Google AI Studio and add it to config.js. AI features will be disabled.");
} else {
  ai = new GoogleGenAI({ apiKey });
}

export const generateFollowUpEmail = async (lead: Lead): Promise<string> => {
  if (!ai) {
    return "AI Assistant is disabled. Please configure your API key in the `config.js` file.";
  }

  try {
    const lastNote = lead.notes[lead.notes.length - 1]?.content || 'Initial contact.';
    
    const prompt = `You are a helpful assistant for a car salesperson at HSR Motors.
    
    Generate a friendly and professional follow-up email draft for a potential customer.
    
    Customer Details:
    - Name: ${lead.name}
    - Interested in: ${lead.carOfInterest}
    - Last interaction summary: ${lastNote}
    
    The email should:
    1. Be concise and polite.
    2. Reference their interest in the specific car model.
    3. End with a clear call to action, such as suggesting a test drive or a call.
    4. Be signed off by the salesperson (use a placeholder like "[Your Name]").
    
    Do not include a subject line. Generate only the body of the email.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating email with Gemini API:", error);
    return "Failed to generate email. Please check that your API key is correct and that your network connection is stable.";
  }
};
