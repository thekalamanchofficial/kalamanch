import { openai } from "~/server/openaiClient";
import { evaluationParameters, type EvaluationResult, type WritingType } from "../types/types";

export async function detectWritingType(content: string): Promise<WritingType> {
  const prompt = `Classify the following writing as one of: story, shayari, poem. Reply with one word only.\n\nText:\n${content}`;

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  const label: string | undefined = res?.choices?.[0]?.message.content?.toLowerCase().trim();

  if (["story", "shayari", "poem"].includes(label || "")) {
    return label as WritingType;
  }

  // Simple fallback heuristics
  if (content.split("\n").length < 5) return "shayari";
  if (content.length < 200) return "poem";
  return "story";
}

export async function evaluateByType(
  type: WritingType,
  content: string,
): Promise<EvaluationResult[]> {
  const params: string[] = evaluationParameters[type];
  const prompt = `You are a professional writing coach. Evaluate the following ${type} based on these parameters: ${params.join(", ")}. For each parameter:

                - Give a score out of 10 (only integer).
                - If the score is 10, briefly praise the strength.
                - If the score is less than 10, write a constructive and empathetic feedback (2–3 sentences) for each parameter. The feedback should be specific to the parameter explaining:
                - What specific issue reduced the score.
                - What could be improved to bring it closer to 10.
                - Advice like a seasoned writer mentoring another.

                Keep the tone encouraging and insightful, as if helping someone grow in their craft.

                Return ONLY in this format:
                Parameter: score/10 - feedback

                Parameters: ${params.join(", ")}

                Text to evaluate:
                """${content}"""`;

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  return parseEvaluation(res?.choices?.[0]?.message.content ?? "");
}

function parseEvaluation(text: string): EvaluationResult[] {
  const results: EvaluationResult[] = [];
  const lines: string[] = text.split("\n").filter(Boolean);

  for (const line of lines) {
    const regex = /^(.*?):\s*(\d{1,2})\/?10.*?-\s*(.*)$/i;
    const match: RegExpMatchArray | null = regex.exec(line);
    if (match) {
      results.push({
        parameter: match?.[1]?.trim().split(":")[1] ?? "", // to handle "Parameter:" prefix
        score: parseInt(match?.[2] ?? "0", 10),
        feedback: match?.[3]?.trim() ?? "",
      });
    }
  }

  return results;
}

export async function evaluateContent(
  content: string,
): Promise<{ type: WritingType; evaluations: EvaluationResult[] }> {
  const type: WritingType = await detectWritingType(content);
  const evaluations: EvaluationResult[] = await evaluateByType(type, content);
  return { type, evaluations };
}
