import type { Metadata } from "next";
import { getModels } from "@/lib/data";
import { RankingsClient } from "@/components/rankings/rankings-client";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Rankings",
  description: "Tier lists, leaderboards, and quality-vs-cost rankings across AI models.",
};

export default function RankingsPage() {
  const models = getModels();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Rankings"
        title={
          <>
            The pecking order, <em className="text-primary">by category.</em>
          </>
        }
        description="Switch categories to see how models stack up on tier lists, a full leaderboard, and a quality-vs-cost view."
      />
      <RankingsClient models={models} />
    </div>
  );
}
