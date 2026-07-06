"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ModelAvatar } from "@/components/shared/model-avatar";
import { averageScore } from "@/lib/score-labels";
import { cn } from "@/lib/utils";
import type { Model } from "@/lib/types";

export function ModelCard({
  model,
  selected,
  onToggleSelect,
  selectDisabled,
}: {
  model: Model;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  selectDisabled?: boolean;
}) {
  const avg = averageScore(model.scores);

  return (
    <Card
      className={cn(
        "group relative flex flex-col gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5",
        selected && "ring-2 ring-primary"
      )}
    >
      {onToggleSelect && (
        <label
          className="absolute top-4 right-4 z-10 flex size-6 cursor-pointer items-center justify-center"
          title={selected ? "Remove from comparison" : "Add to comparison"}
        >
          <Checkbox
            checked={!!selected}
            disabled={selectDisabled && !selected}
            onCheckedChange={() => onToggleSelect(model.id)}
            aria-label={`Select ${model.name} for comparison`}
          />
        </label>
      )}

      <Link href={`/compare/${model.id}`} className="flex items-start gap-3">
        <ModelAvatar name={model.name} provider={model.provider} className="size-11 shrink-0 text-lg" />
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-tight group-hover:text-primary">
            {model.name}
          </h3>
          <p className="text-sm text-muted-foreground">{model.provider}</p>
        </div>
      </Link>

      <p className="line-clamp-2 text-sm text-muted-foreground">{model.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {model.bestFor.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="secondary" className="font-normal">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3">
        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-semibold tabular-nums">{avg}</span>
          <span className="text-muted-foreground">avg score</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium">
          {model.pricing.hasFreeTier && (
            <Badge variant="outline" className="gap-1 font-normal text-emerald-500 border-emerald-500/30">
              <Check className="size-3" />
              Free tier
            </Badge>
          )}
          <span className="tabular-nums">${model.pricing.inputPerMTokens}/M</span>
        </div>
      </div>
    </Card>
  );
}
