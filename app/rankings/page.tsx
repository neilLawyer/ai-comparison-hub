import type { Metadata } from "next";
import { getModels } from "@/lib/data";
import { RankingsClient } from "@/components/rankings/rankings-client";

export const metadata: Metadata = {
  title: "Rankings",
  description: "Tier lists, leaderboards, and quality-vs-cost rankings across AI models.",
};

export default function RankingsPage() {
  const models = getModels();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Rankings</h1>
        <p className="max-w-2xl text-muted-foreground">
          Switch categories to see how models stack up on tier lists, a full
          leaderboard, and a quality-vs-cost view.
        </p>
      </div>
      <RankingsClient models={models} />
    </div>
  );
}
