import type { Model, QuizQuestion } from "@/lib/types";

export type QuizAnswers = Record<string, number>; // questionId -> option index

export type QuizResult = {
  ranked: { model: Model; score: number }[];
  winner: Model;
  runnerUp: Model | null;
};

export function scoreQuiz(
  answers: QuizAnswers,
  questions: QuizQuestion[],
  models: Model[]
): QuizResult {
  const totals: Record<string, number> = Object.fromEntries(
    models.map((m) => [m.id, 0])
  );

  for (const question of questions) {
    const optionIndex = answers[question.id];
    const option = question.options[optionIndex];
    if (!option) continue;
    for (const [modelId, weight] of Object.entries(option.weights)) {
      if (modelId in totals) totals[modelId] += weight;
    }
  }

  const ranked = models
    .map((model) => ({ model, score: totals[model.id] ?? 0 }))
    .sort((a, b) => b.score - a.score);

  return {
    ranked,
    winner: ranked[0].model,
    runnerUp: ranked[1]?.model ?? null,
  };
}
