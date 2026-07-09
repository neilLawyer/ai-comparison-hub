import type { Metadata } from "next";
import { ShieldCheck, Scale, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SCORE_CATEGORIES, SCORE_LABELS } from "@/lib/score-labels";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "Our mission, how we grade models, and the methodology behind the scores.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="About"
        title={
          <>
            Opinionated, <em className="text-primary">on purpose.</em>
          </>
        }
        description="AI Comparison Hub helps you figure out exactly which AI model to use, how to use it well, and how to stop overpaying."
      />

      <section className="mb-10 space-y-3">
        <h2 className="font-display text-2xl tracking-tight">Our mission</h2>
        <p className="text-muted-foreground">
          There are dozens of capable AI models now, and picking one shouldn&apos;t
          require a research project. We combine a benchmark/comparison
          dashboard with a learning layer and a personalized recommender so you
          can make a confident choice in minutes, not hours.
        </p>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="font-display text-2xl tracking-tight">How we grade</h2>
        <p className="text-muted-foreground">
          Every model is scored 0–100 across eight categories:
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SCORE_CATEGORIES.map((c) => (
            <div
              key={c}
              className="rounded-lg border border-border/60 px-3 py-2 text-center text-sm"
            >
              {SCORE_LABELS[c]}
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="space-y-2 p-5">
          <ShieldCheck className="size-5 text-primary" />
          <h3 className="font-semibold">Honest, not hyped</h3>
          <p className="text-sm text-muted-foreground">
            Every model page lists real weaknesses, not just marketing strengths.
          </p>
        </Card>
        <Card className="space-y-2 p-5">
          <Scale className="size-5 text-primary" />
          <h3 className="font-semibold">Consistent scoring</h3>
          <p className="text-sm text-muted-foreground">
            The same eight categories are applied to every model so comparisons
            are apples-to-apples.
          </p>
        </Card>
        <Card className="space-y-2 p-5">
          <RefreshCw className="size-5 text-primary" />
          <h3 className="font-semibold">Refined over time</h3>
          <p className="text-sm text-muted-foreground">
            Scores and pricing here are directional estimates, refreshed
            periodically as models and prices change.
          </p>
        </Card>
      </section>
    </div>
  );
}
