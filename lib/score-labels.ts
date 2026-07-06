import type { ScoreCategory } from "@/lib/types";

export const SCORE_LABELS: Record<ScoreCategory, string> = {
  coding: "Coding",
  reasoning: "Reasoning",
  creativity: "Creativity",
  speed: "Speed",
  accuracy: "Accuracy",
  dataAnalysis: "Data Analysis",
  businessUse: "Business Use",
  educationUse: "Education Use",
};

export const SCORE_CATEGORIES = Object.keys(SCORE_LABELS) as ScoreCategory[];

export function averageScore(scores: Record<ScoreCategory, number>): number {
  const values = Object.values(scores);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}
