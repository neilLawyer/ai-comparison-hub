export type ScoreCategory =
  | "coding"
  | "reasoning"
  | "creativity"
  | "speed"
  | "accuracy"
  | "dataAnalysis"
  | "businessUse"
  | "educationUse";

export type Model = {
  id: string;
  name: string;
  provider: string;
  logoUrl: string;
  description: string;
  releaseDate: string;
  modality: string[];
  scores: Record<ScoreCategory, number>;
  pricing: {
    inputPerMTokens: number;
    outputPerMTokens: number;
    hasFreeTier: boolean;
    subscriptionPrice: number | null;
  };
  contextWindow: number;
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
  isEstimated?: boolean;
};

export type Field = {
  slug: string;
  name: string;
  icon: string;
  criteria: string[];
  recommendedModels: string[];
  playbook: string;
  redFlags: string[];
};

export type GuideCategory =
  | "prompt-engineering"
  | "concepts"
  | "safety"
  | "techniques";

export type GuideDifficulty = "beginner" | "intermediate" | "advanced";

export type Guide = {
  slug: string;
  title: string;
  category: GuideCategory;
  summary: string;
  content: string;
  difficulty: GuideDifficulty;
};

export type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  category: string;
  isPrediction: boolean;
};

export type QuizOption = {
  label: string;
  weights: Record<string, number>;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};
