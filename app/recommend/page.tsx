import type { Metadata } from "next";
import { getModels, getQuizQuestions } from "@/lib/data";
import { QuizWizard } from "@/components/quiz/quiz-wizard";

export const metadata: Metadata = {
  title: "Recommend",
  description: "Answer a few questions to find the best AI model for your use case and budget.",
};

export default function RecommendPage() {
  const models = getModels();
  const questions = getQuizQuestions();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Find your best-fit model
        </h1>
        <p className="mx-auto max-w-xl text-muted-foreground">
          {`Answer ${questions.length} quick questions and we'll recommend the model that fits your task, budget, and priorities.`}
        </p>
      </div>
      <QuizWizard questions={questions} models={models} />
    </div>
  );
}
