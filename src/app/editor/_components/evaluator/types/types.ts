export type EvaluationResult = {
  parameter: string;
  score: number; // 0–10
  feedback: string;
};

export type WritingType =
  | "Story"
  | "Short story"
  | "Shayari"
  | "Poem"
  | "Script"
  | "Commentary"
  | "Article";

export const evaluationParameters: Record<WritingType, string[]> = {
  Story: [
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
  "Short story": [
    "Structure & flow",
    "Character Depth",
    "Narrative hook",
    "Emotional Impact",
    "Theme & Message",
    "Pacing",
    "Originality",
    "Ending Effectiveness",
  ],
  Shayari: ["Bahr", "Radif", "Qafiya", "Matla and Maqta", "Emotional Depth", "Language Aesthetics"],
  Poem: ["Rhyme", "Theme", "Imagery0", "Emotion", "Language & Word Choice", "Structure", "Impact"],
  Script: [
    "Structure & Pacing",
    "Dialogue Quality",
    "Character Development",
    "Conflict & Stakes",
    "Scene Setting & Description",
    "Theme & Message",
    "Ending",
    "Originality",
  ],
  Commentary: [
    "Clarity of Thought",
    "Depth of Analysis",
    " Relevance of Examples",
    "Structure & Flow",
    "Original Perspective",
    "Language & Expression",
    "Engagement & Impact",
  ],
  Article: [
    "Clarity of Purpose",
    "Structure & Organization",
    "Depth of Content",
    "Factual Accuracy",
    "Language & Style",
    "Engagement",
    "Use of Supporting Evidence",
  ],
};
