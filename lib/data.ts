import modelsData from "@/data/models.json";
import fieldsData from "@/data/fields.json";
import guidesData from "@/data/guides.json";
import timelineData from "@/data/timeline.json";
import quizQuestionsData from "@/data/quizQuestions.json";
import type {
  Model,
  Field,
  Guide,
  TimelineEvent,
  QuizQuestion,
} from "@/lib/types";

const models = modelsData as Model[];
const fields = fieldsData as Field[];
const guides = guidesData as Guide[];
const timeline = timelineData as TimelineEvent[];
const quizQuestions = quizQuestionsData as QuizQuestion[];

export function getModels(): Model[] {
  return models;
}

export function getModelById(id: string): Model | undefined {
  return models.find((model) => model.id === id);
}

export function getModelsByIds(ids: string[]): Model[] {
  return ids
    .map((id) => getModelById(id))
    .filter((model): model is Model => Boolean(model));
}

export function getFields(): Field[] {
  return fields;
}

export function getFieldBySlug(slug: string): Field | undefined {
  return fields.find((field) => field.slug === slug);
}

export function getGuides(): Guide[] {
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesByCategory(category: string): Guide[] {
  return guides.filter((guide) => guide.category === category);
}

export function getTimeline(): TimelineEvent[] {
  return [...timeline].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function getQuizQuestions(): QuizQuestion[] {
  return quizQuestions;
}
