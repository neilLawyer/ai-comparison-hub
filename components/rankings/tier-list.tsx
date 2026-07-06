import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModelAvatar } from "@/components/shared/model-avatar";
import { averageScore } from "@/lib/score-labels";
import type { Model, ScoreCategory } from "@/lib/types";

type Tier = "S" | "A" | "B" | "C";

const TIER_STYLES: Record<Tier, string> = {
  S: "bg-primary/15 border-primary/40 text-primary",
  A: "bg-sky-500/10 border-sky-500/30 text-sky-500",
  B: "bg-muted border-border text-muted-foreground",
  C: "bg-muted/50 border-border/60 text-muted-foreground",
};

function tierFor(score: number): Tier {
  if (score >= 92) return "S";
  if (score >= 82) return "A";
  if (score >= 72) return "B";
  return "C";
}

export function TierList({
  models,
  category,
}: {
  models: Model[];
  category: ScoreCategory | "overall";
}) {
  const tiers: Record<Tier, Model[]> = { S: [], A: [], B: [], C: [] };

  for (const model of models) {
    const score = category === "overall" ? averageScore(model.scores) : model.scores[category];
    tiers[tierFor(score)].push(model);
  }

  return (
    <div className="space-y-3">
      {(Object.keys(tiers) as Tier[]).map((tier) => (
        <div
          key={tier}
          className={cn(
            "flex items-center gap-4 rounded-lg border p-3",
            TIER_STYLES[tier]
          )}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-current/30 text-lg font-bold">
            {tier}
          </div>
          <div className="flex flex-1 flex-wrap gap-2">
            {tiers[tier].length === 0 && (
              <span className="text-sm text-muted-foreground">No models in this tier</span>
            )}
            {tiers[tier].map((model) => (
              <Link
                key={model.id}
                href={`/compare/${model.id}`}
                className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background py-1 pl-1 pr-3 text-sm text-foreground transition-colors hover:border-primary/40"
              >
                <ModelAvatar
                  name={model.name}
                  provider={model.provider}
                  className="size-5 text-[10px]"
                />
                {model.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
