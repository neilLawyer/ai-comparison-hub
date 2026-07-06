import Link from "next/link";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { getModels } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ModelAvatar } from "@/components/shared/model-avatar";
import { FadeIn } from "@/components/shared/fade-in";
import { averageScore } from "@/lib/score-labels";

export default function Home() {
  const topModels = [...getModels()]
    .sort((a, b) => averageScore(b.scores) - averageScore(a.scores))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn className="mx-auto max-w-2xl space-y-6 text-center">
        <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" />
          Comparisons, rankings, and a personalized recommender
        </div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Find the right AI model. Use it well. Stop overpaying.
        </h1>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">
          A benchmark dashboard, a learning hub, and a quiz that tells you
          exactly which model fits your task and budget.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" render={<Link href="/recommend" />} nativeButton={false}>
            <Wand2 className="size-4" />
            Take the 1-minute quiz
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/compare" />} nativeButton={false}>
            Compare models
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-20 space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold">Top ranked right now</h2>
          <Link
            href="/rankings"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            Full rankings
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {topModels.map((model, i) => (
            <Link key={model.id} href={`/compare/${model.id}`}>
              <Card className="flex h-full flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center justify-between">
                  <ModelAvatar
                    name={model.name}
                    provider={model.provider}
                    className="size-10 shrink-0 text-lg"
                  />
                  <span className="text-xs font-semibold text-muted-foreground">
                    #{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{model.name}</h3>
                  <p className="text-sm text-muted-foreground">{model.provider}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3 text-sm">
                  <span className="font-semibold tabular-nums">
                    {averageScore(model.scores)}
                  </span>
                  <span className="text-muted-foreground">
                    ${model.pricing.inputPerMTokens}/M
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.15} className="mt-20">
        <Card className="flex flex-col items-center gap-4 border-primary/30 bg-primary/5 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-xl font-semibold">Not sure where to start?</h2>
            <p className="mt-1 text-muted-foreground">
              Answer 6 quick questions and we&apos;ll recommend the model that
              fits your task, budget, and priorities.
            </p>
          </div>
          <Button size="lg" render={<Link href="/recommend" />} nativeButton={false} className="shrink-0">
            Take the quiz
            <ArrowRight className="size-4" />
          </Button>
        </Card>
      </FadeIn>
    </div>
  );
}
