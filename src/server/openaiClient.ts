// server/openaiClient.ts
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.KALAMANCH_OPEN_API_KEY, // Ensure this is set in your .env file
});
