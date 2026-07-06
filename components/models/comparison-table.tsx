"use client";

import { useTheme } from "next-themes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModelAvatar } from "@/components/shared/model-avatar";
import { StatBar } from "@/components/shared/stat-bar";
import { SCORE_CATEGORIES, SCORE_LABELS } from "@/lib/score-labels";
import { getModelColor } from "@/lib/chart-colors";
import type { Model } from "@/lib/types";

function formatContext(tokens: number) {
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(tokens % 1_000_000 === 0 ? 0 : 1)}M tokens`;
  return `${Math.round(tokens / 1000)}K tokens`;
}

export function ComparisonTable({ models }: { models: Model[] }) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="overflow-x-auto rounded-lg border border-border/60">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-40 bg-card">Model</TableHead>
            {models.map((model) => (
              <TableHead key={model.id} className="min-w-48 bg-card">
                <div className="flex items-center gap-2 py-1">
                  <ModelAvatar
                    name={model.name}
                    provider={model.provider}
                    className="size-8 shrink-0 text-sm"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{model.name}</div>
                    <div className="text-xs font-normal text-muted-foreground">
                      {model.provider}
                    </div>
                  </div>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {SCORE_CATEGORIES.map((category) => (
            <TableRow key={category}>
              <TableCell className="font-medium text-muted-foreground">
                {SCORE_LABELS[category]}
              </TableCell>
              {models.map((model) => (
                <TableCell key={model.id}>
                  <StatBar
                    label=""
                    value={model.scores[category]}
                    color={getModelColor(model.id, resolvedTheme)}
                    className="max-w-32"
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-medium text-muted-foreground">Input price</TableCell>
            {models.map((model) => (
              <TableCell key={model.id} className="tabular-nums">
                ${model.pricing.inputPerMTokens} / M tokens
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-muted-foreground">Output price</TableCell>
            {models.map((model) => (
              <TableCell key={model.id} className="tabular-nums">
                ${model.pricing.outputPerMTokens} / M tokens
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-muted-foreground">Subscription</TableCell>
            {models.map((model) => (
              <TableCell key={model.id}>
                {model.pricing.subscriptionPrice != null
                  ? `$${model.pricing.subscriptionPrice}/mo`
                  : "API only"}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-muted-foreground">Free tier</TableCell>
            {models.map((model) => (
              <TableCell key={model.id}>
                {model.pricing.hasFreeTier ? "Yes" : "No"}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-muted-foreground">Context window</TableCell>
            {models.map((model) => (
              <TableCell key={model.id}>{formatContext(model.contextWindow)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="align-top font-medium text-muted-foreground">
              Strengths
            </TableCell>
            {models.map((model) => (
              <TableCell key={model.id} className="align-top">
                <ul className="list-disc space-y-1 pl-4 text-xs">
                  {model.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="align-top font-medium text-muted-foreground">
              Weaknesses
            </TableCell>
            {models.map((model) => (
              <TableCell key={model.id} className="align-top">
                <ul className="list-disc space-y-1 pl-4 text-xs">
                  {model.weaknesses.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
