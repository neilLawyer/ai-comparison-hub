"use client";

import * as React from "react";
import { X, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModelCard } from "@/components/models/model-card";
import { ModelAvatar } from "@/components/shared/model-avatar";
import { ModelRadarChart } from "@/components/models/radar-chart";
import { ComparisonTable } from "@/components/models/comparison-table";
import { averageScore } from "@/lib/score-labels";
import type { Model } from "@/lib/types";

const MAX_COMPARE = 4;

type SortKey = "score-desc" | "price-asc" | "name-asc";

export function CompareClient({ models }: { models: Model[] }) {
  const [query, setQuery] = React.useState("");
  const [provider, setProvider] = React.useState<string>("all");
  const [freeOnly, setFreeOnly] = React.useState(false);
  const [sort, setSort] = React.useState<SortKey>("score-desc");
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const providers = React.useMemo(
    () => Array.from(new Set(models.map((m) => m.provider))).sort(),
    [models]
  );

  const filtered = React.useMemo(() => {
    let result = models.filter((m) => {
      if (provider !== "all" && m.provider !== provider) return false;
      if (freeOnly && !m.pricing.hasFreeTier) return false;
      if (query && !m.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sort === "score-desc") return averageScore(b.scores) - averageScore(a.scores);
      if (sort === "price-asc") return a.pricing.inputPerMTokens - b.pricing.inputPerMTokens;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [models, provider, freeOnly, query, sort]);

  const selectedModels = selectedIds
    .map((id) => models.find((m) => m.id === id))
    .filter((m): m is Model => Boolean(m));

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < MAX_COMPARE
        ? [...prev, id]
        : prev
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search models…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="sm:max-w-xs"
        />
        <Select
          items={{ all: "All providers", ...Object.fromEntries(providers.map((p) => [p, p])) }}
          value={provider}
          onValueChange={(v) => setProvider(v ?? "all")}
        >
          <SelectTrigger className="sm:w-44">
            <SlidersHorizontal className="size-3.5 text-muted-foreground" />
            <SelectValue placeholder="Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All providers</SelectItem>
            {providers.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          items={{
            "score-desc": "Highest avg score",
            "price-asc": "Lowest input price",
            "name-asc": "Name (A–Z)",
          }}
          value={sort}
          onValueChange={(v) => setSort(v as SortKey)}
        >
          <SelectTrigger className="sm:w-52">
            <ArrowUpDown className="size-3.5 text-muted-foreground" />
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="score-desc">Highest avg score</SelectItem>
            <SelectItem value="price-asc">Lowest input price</SelectItem>
            <SelectItem value="name-asc">Name (A–Z)</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant={freeOnly ? "default" : "outline"}
          size="sm"
          onClick={() => setFreeOnly((v) => !v)}
        >
          Free tier only
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} model{filtered.length === 1 ? "" : "s"} · select up to{" "}
        {MAX_COMPARE} to compare side-by-side
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-24">
        {filtered.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            selected={selectedIds.includes(model.id)}
            onToggleSelect={toggleSelect}
            selectDisabled={selectedIds.length >= MAX_COMPARE}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-muted-foreground">
            No models match those filters.
          </p>
        )}
      </div>

      {selectedIds.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center -space-x-2">
              {selectedModels.map((m) => (
                <ModelAvatar
                  key={m.id}
                  name={m.name}
                  provider={m.provider}
                  className="size-8 border-2 border-background text-sm"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {selectedIds.length} selected
            </span>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>
                <X className="size-4" />
                Clear
              </Button>
              <Button
                size="sm"
                disabled={selectedIds.length < 2}
                onClick={() =>
                  document
                    .getElementById("comparison-section")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                Compare {selectedIds.length > 1 ? selectedIds.length : ""}
              </Button>
            </div>
          </div>
        </div>
      )}

      {selectedModels.length >= 2 && (
        <section id="comparison-section" className="scroll-mt-20 space-y-6 pb-24">
          <h2 className="text-xl font-semibold">Side-by-side comparison</h2>
          <ModelRadarChart models={selectedModels} />
          <ComparisonTable models={selectedModels} />
        </section>
      )}
    </div>
  );
}
