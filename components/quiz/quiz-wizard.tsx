"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RecommendationResult } from "@/components/quiz/recommendation-result";
import { scoreQuiz, type QuizAnswers } from "@/lib/quiz-scoring";
import type { Model, QuizQuestion } from "@/lib/types";

export function QuizWizard({
  questions,
  models,
}: {
  questions: QuizQuestion[];
  models: Model[];
}) {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<QuizAnswers>({});
  const [done, setDone] = React.useState(false);

  const question = questions[step];
  const progress = done ? 100 : Math.round((step / questions.length) * 100);

  function selectOption(optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  }

  function next() {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  }

  function back() {
    if (done) {
      setDone(false);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  if (done) {
    const result = scoreQuiz(answers, questions, models);
    return (
      <div className="space-y-6">
        <RecommendationResult result={result} />
        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={back}>
            <ArrowLeft className="size-4" />
            Change my answers
          </Button>
          <Button variant="ghost" onClick={restart}>
            Start over
          </Button>
        </div>
      </div>
    );
  }

  const selected = answers[question.id];

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="space-y-2">
        <Progress value={progress} />
        <p className="text-sm text-muted-foreground">
          Question {step + 1} of {questions.length}
        </p>
      </div>

      <div className="space-y-5">
        <h2 className="text-xl font-semibold">{question.question}</h2>
        <RadioGroup
          value={selected != null ? String(selected) : ""}
          onValueChange={(v) => selectOption(Number(v))}
          className="gap-3"
        >
          {question.options.map((option, i) => (
            <Label
              key={option.label}
              htmlFor={`${question.id}-${i}`}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 p-4 text-sm font-normal transition-colors has-[button[data-state=checked]]:border-primary has-[button[data-state=checked]]:bg-primary/5"
            >
              <RadioGroupItem value={String(i)} id={`${question.id}-${i}`} />
              {option.label}
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={back} disabled={step === 0}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button onClick={next} disabled={selected == null}>
          {step === questions.length - 1 ? "See my result" : "Next"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
