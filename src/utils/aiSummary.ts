// src/utils/aiSummary.ts
// Utility to create an AI-generated summary for a vehicle

import { AzureOpenAI } from "openai";

const endpoint = "https://aif-it-talents.cognitiveservices.azure.com/";
const modelName = "gpt-4.1-nano";
const deployment = "gpt-4.1-nano";
const apiKey = import.meta.env.AZURE_OPENAI_API_KEY;
const apiVersion = "2024-04-01-preview";
const options = { endpoint, apiKey, deployment, apiVersion };

export async function getAISummary(vehicleData: object): Promise<string> {
  const client = new AzureOpenAI(options);

  const userPrompt = `Fasse die folgenden Fahrzeugdaten als ansprechenden, informativen Fließtext für ein Autoportal auf Deutsch zusammen. Hebe Besonderheiten und Highlights hervor.\n\n${JSON.stringify(vehicleData, null, 2)}`;

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "Du bist ein wirklich hilfreicher Assistent für ein Autoportal. Fasse Fahrzeugdaten als attraktiven, informativen Fließtext auf Deutsch zusammen. Vermeide Bilder und Links, schreibe nicht mehr als 3 Absätze und nutze viele Emojis." },
      { role: "user", content: userPrompt }
    ],
    max_completion_tokens: 800,
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    model: modelName
  });

  // Azure OpenAI SDK does not return .error or .status, so just check for choices
  if (!response.choices || response.choices.length === 0) {
    throw new Error("No AI summary returned from OpenAI API.");
  }
  return response.choices[0].message.content || "";
}
