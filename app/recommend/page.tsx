import type { Metadata } from "next";
import { getModels, getQuizQuestions } from "@/lib/data";
import { QuizWizard } from "@/components/quiz/quiz-wizard";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Recommend",
  description: "Answer a few questions to find the best AI model for your use case and budget.",
};

export default function RecommendPage() {
  const models = getModels();
  const questions = getQuizQuestions();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <PageHeader
        align="center"
        eyebrow="Recommender"
        title={
          <>
            Your model, <em className="text-primary">in one minute.</em>
          </>
        }
        description={`Answer ${questions.length} quick questions and we'll recommend the model that fits your task, budget, and priorities.`}
      />
      <QuizWizard questions={questions} models={models} />
    </div>
  );
}
