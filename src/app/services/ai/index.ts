import OpenAI from "openai";
import {
  GENERATE_PILL_PROMPT,
  GENERATE_RANDOM_HTML_PAGE_PROMPT,
} from "./prompts";

const openai = new OpenAI({
  apiKey: process.env.VERCEL_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateDailyPill(): Promise<string | null> {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: GENERATE_PILL_PROMPT,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

export async function generateRandomHTML(): Promise<string | null> {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: GENERATE_RANDOM_HTML_PAGE_PROMPT,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}
