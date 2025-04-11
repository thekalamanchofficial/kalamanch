export type EvaluationResult = {
  parameter: string;
  score: number; // 0–10
  feedback: string;
};

export type WritingType = "story" | "shayari" | "poem" | "script" | "commentary" | "article";

export const evaluationParameters: Record<WritingType, string[]> = {
  story: [
    "Structure",
    "Character Development",
    "Worldbuilding",
    "Emotional Impact",
    "Theme & Message",
    "Pacing",
    "Dialogue",
    "Originality",
    "Technical Quality",
  ],
  shayari: ["Bahr", "Radif", "Qafiya", "Matla and Maqta", "Emotional Depth", "Language Aesthetics"],
  poem: ["Rhyme", "Theme", "Imagery0", "Emotion", "Language & Word Choice", "Structure", "Impact"],
  script: [
    "Structure & Pacing",
    "Dialogue Quality",
    "Character Development",
    "Conflict & Stakes",
    "Scene Setting & Description",
    "Theme & Message",
    "Ending",
    "Originality",
  ],
  commentary: [
    "Clarity of Thought",
    "Depth of Analysis",
    " Relevance of Examples",
    "Structure & Flow",
    "Original Perspective",
    "Language & Expression",
    "Engagement & Impact",
  ],
  article: [
    "Clarity of Purpose",
    "Structure & Organization",
    "Depth of Content",
    "Factual Accuracy",
    "Language & Style",
    "Engagement",
    "Use of Supporting Evidence",
  ],
};
