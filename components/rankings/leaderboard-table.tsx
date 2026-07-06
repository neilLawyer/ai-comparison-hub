"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModelAvatar } from "@/components/shared/model-avatar";
import { Badge } from "@/components/ui/badge";
import type { Model, ScoreCategory } from "@/lib/types";
import { averageScore } from "@/lib/score-labels";

export function LeaderboardTable({
  models,
  category,
}: {
  models: Model[];
  category: ScoreCategory | "overall";
}) {
  const ranked = [...models].sort((a, b) => {
    const scoreA = category === "overall" ? averageScore(a.scores) : a.scores[category];
    const scoreB = category === "overall" ? averageScore(b.scores) : b.scores[category];
    return scoreB - scoreA;
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-border/60">
      <Table>
        <TableHeader>
          <TableRow className="sticky top-0 bg-card hover:bg-card">
            <TableHead className="w-12">#</TableHead>
            <TableHead>Model</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead className="text-right">Input price</TableHead>
            <TableHead className="text-right">Free tier</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ranked.map((model, i) => {
            const score =
              category === "overall" ? averageScore(model.scores) : model.scores[category];
            return (
              <TableRow key={model.id}>
                <TableCell className="font-medium tabular-nums text-muted-foreground">
                  {i + 1}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/compare/${model.id}`}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <ModelAvatar
                      name={model.name}
                      provider={model.provider}
                      className="size-7 shrink-0 text-xs"
                    />
                    <div>
                      <div className="font-medium">{model.name}</div>
                      <div className="text-xs text-muted-foreground">{model.provider}</div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">{score}</TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  ${model.pricing.inputPerMTokens}/M
                </TableCell>
                <TableCell className="text-right">
                  {model.pricing.hasFreeTier ? (
                    <Badge variant="outline" className="font-normal text-emerald-500 border-emerald-500/30">
                      Yes
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
