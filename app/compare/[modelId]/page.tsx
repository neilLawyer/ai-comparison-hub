import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, X } from "lucide-react";
import { getModelById, getModels } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ModelAvatar } from "@/components/shared/model-avatar";
import { StatBar } from "@/components/shared/stat-bar";
import { ModelRadarChart } from "@/components/models/radar-chart";
import { SCORE_CATEGORIES, SCORE_LABELS, averageScore } from "@/lib/score-labels";

type Props = { params: Promise<{ modelId: string }> };

export async function generateStaticParams() {
  return getModels().map((model) => ({ modelId: model.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { modelId } = await params;
  const model = getModelById(modelId);
  if (!model) return {};
  return {
    title: model.name,
    description: model.description,
  };
}

export default async function ModelDetailPage({ params }: Props) {
  const { modelId } = await params;
  const model = getModelById(modelId);
  if (!model) notFound();

  const avg = averageScore(model.scores);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/compare"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to all models
      </Link>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <ModelAvatar
            name={model.name}
            provider={model.provider}
            className="size-14 shrink-0 text-2xl"
          />
          <div>
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{model.name}</h1>
            <p className="text-muted-foreground">
              {model.provider} · released{" "}
              {new Date(model.releaseDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
              })}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {model.bestFor.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border/60 px-4 py-3">
          <span className="text-2xl font-semibold tabular-nums">{avg}</span>
          <span className="text-sm text-muted-foreground">avg score</span>
        </div>
      </div>

      <p className="mb-10 max-w-3xl text-lg text-muted-foreground">{model.description}</p>

      {model.isEstimated && (
        <p className="mb-8 text-xs text-muted-foreground">
          Scores and pricing below are directional estimates for evaluation purposes — verify current figures with the provider before purchasing decisions.
        </p>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Score breakdown</h2>
          <ModelRadarChart models={[model]} />
        </Card>

        <Card className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">All categories</h2>
          {SCORE_CATEGORIES.map((category) => (
            <StatBar
              key={category}
              label={SCORE_LABELS[category]}
              value={model.scores[category]}
            />
          ))}
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Pricing</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Input</dt>
              <dd className="font-medium tabular-nums">
                ${model.pricing.inputPerMTokens} / M tokens
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Output</dt>
              <dd className="font-medium tabular-nums">
                ${model.pricing.outputPerMTokens} / M tokens
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Subscription</dt>
              <dd className="font-medium">
                {model.pricing.subscriptionPrice != null
                  ? `$${model.pricing.subscriptionPrice}/mo`
                  : "API only"}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Free tier</dt>
              <dd className="font-medium">
                {model.pricing.hasFreeTier ? "Yes" : "No"}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Context window</dt>
              <dd className="font-medium tabular-nums">
                {model.contextWindow.toLocaleString()} tokens
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Honest pros &amp; cons</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-emerald-500">
                <Check className="size-4" />
                Strengths
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {model.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-destructive">
                <X className="size-4" />
                Weaknesses
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {model.weaknesses.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
