"use client";

import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { getTierVerdict, type TierAdvisorAnswers } from "@/lib/tier-advisor";

const QUESTIONS: {
  key: keyof TierAdvisorAnswers;
  question: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "frequency",
    question: "How often do you use AI tools?",
    options: [
      { value: "rare", label: "Rarely or occasionally" },
      { value: "weekly", label: "A few times a week" },
      { value: "daily", label: "Daily, multiple times a day" },
    ],
  },
  {
    key: "usage",
    question: "What are you mostly doing?",
    options: [
      { value: "casual", label: "Quick questions and casual chat" },
      { value: "regular", label: "Regular work tasks (writing, research, coding help)" },
      { value: "product", label: "Building a product or integrating AI into a workflow" },
    ],
  },
  {
    key: "limits",
    question: "Do you hit usage limits or need advanced features?",
    options: [
      { value: "never", label: "Never" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Yes, frequently" },
    ],
  },
];

export function TierAdvisor() {
  const [answers, setAnswers] = React.useState<Partial<TierAdvisorAnswers>>({});
  const [showResult, setShowResult] = React.useState(false);

  const allAnswered = QUESTIONS.every((q) => answers[q.key] != null);

  if (showResult && allAnswered) {
    const verdict = getTierVerdict(answers as TierAdvisorAnswers);
    return (
      <Card className="space-y-3 border-primary/30 bg-primary/5 p-6">
        <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
          <Sparkles className="size-4" />
          Verdict
        </div>
        <h3 className="text-xl font-semibold">{verdict.title}</h3>
        <p className="text-muted-foreground">{verdict.reason}</p>
        <Button variant="outline" size="sm" onClick={() => setShowResult(false)}>
          Change my answers
        </Button>
      </Card>
    );
  }

  return (
    <Card className="space-y-6 p-6">
      {QUESTIONS.map((q) => (
        <div key={q.key} className="space-y-3">
          <p className="font-medium">{q.question}</p>
          <RadioGroup
            value={answers[q.key] ?? ""}
            onValueChange={(v) => setAnswers((prev) => ({ ...prev, [q.key]: v }))}
            className="gap-2"
          >
            {q.options.map((opt) => (
              <Label
                key={opt.value}
                htmlFor={`${q.key}-${opt.value}`}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 p-3 text-sm font-normal transition-colors has-[button[data-state=checked]]:border-primary has-[button[data-state=checked]]:bg-primary/5"
              >
                <RadioGroupItem value={opt.value} id={`${q.key}-${opt.value}`} />
                {opt.label}
              </Label>
            ))}
          </RadioGroup>
        </div>
      ))}
      <Button disabled={!allAnswered} onClick={() => setShowResult(true)}>
        See my verdict
      </Button>
    </Card>
  );
}
