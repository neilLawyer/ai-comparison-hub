"use client";

import * as React from "react";
import { countTokens } from "gpt-tokenizer";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ModelAvatar } from "@/components/shared/model-avatar";
import type { Model } from "@/lib/types";

function formatCost(cost: number) {
  if (cost < 0.01) return `$${cost.toFixed(5)}`;
  return `$${cost.toFixed(4)}`;
}

export function TokenEstimator({ models }: { models: Model[] }) {
  const [text, setText] = React.useState(
    "Paste a prompt, document, or conversation here to see roughly how many tokens it costs across models."
  );
  const [outputTokens, setOutputTokens] = React.useState(500);

  const inputTokens = React.useMemo(() => {
    if (!text.trim()) return 0;
    try {
      return countTokens(text);
    } catch {
      return Math.round(text.length / 4);
    }
  }, [text]);

  const ranked = [...models].sort(
    (a, b) => a.pricing.inputPerMTokens - b.pricing.inputPerMTokens
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="token-input">Your text</Label>
          <Textarea
            id="token-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="resize-none"
          />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground tabular-nums">{inputTokens}</span> input
            tokens (~{Math.round(text.length / 4)} by the 4-chars-per-token rule of thumb)
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="output-tokens">Expected response length (tokens)</Label>
          <Input
            id="output-tokens"
            type="number"
            min={0}
            value={outputTokens}
            onChange={(e) => setOutputTokens(Math.max(0, Number(e.target.value) || 0))}
            className="max-w-40"
          />
        </div>
      </div>

      <Card className="divide-y divide-border/60 p-0">
        {ranked.map((model) => {
          const inputCost = (inputTokens / 1_000_000) * model.pricing.inputPerMTokens;
          const outputCost = (outputTokens / 1_000_000) * model.pricing.outputPerMTokens;
          const total = inputCost + outputCost;
          return (
            <div key={model.id} className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <ModelAvatar
                  name={model.name}
                  provider={model.provider}
                  className="size-8 shrink-0 text-sm"
                />
                <div className="min-w-0">
                  <p className="truncate font-medium">{model.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ${model.pricing.inputPerMTokens}/M in · ${model.pricing.outputPerMTokens}/M out
                  </p>
                </div>
              </div>
              <span className="shrink-0 font-semibold tabular-nums">{formatCost(total)}</span>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
