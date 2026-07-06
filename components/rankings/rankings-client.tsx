"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardTable } from "@/components/rankings/leaderboard-table";
import { TierList } from "@/components/rankings/tier-list";
import { ParetoScatter } from "@/components/rankings/pareto-scatter";
import { SCORE_CATEGORIES, SCORE_LABELS } from "@/lib/score-labels";
import type { Model, ScoreCategory } from "@/lib/types";

export function RankingsClient({ models }: { models: Model[] }) {
  const [category, setCategory] = React.useState<ScoreCategory | "overall">("overall");

  return (
    <div className="space-y-10">
      <Tabs value={category} onValueChange={(v) => setCategory(v as ScoreCategory | "overall")}>
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          <TabsTrigger
            value="overall"
            className="rounded-full border border-border/60 data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Overall
          </TabsTrigger>
          {SCORE_CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="rounded-full border border-border/60 data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              {SCORE_LABELS[cat]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tier list</h2>
        <TierList models={models} category={category} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Leaderboard</h2>
        <LeaderboardTable models={models} category={category} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Quality vs. cost</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Models on the highlighted frontier aren&apos;t beaten on both quality and
          price by any other model in this view.
        </p>
        <ParetoScatter models={models} category={category} />
      </section>
    </div>
  );
}
