import type { Metadata } from "next";
import { getModels } from "@/lib/data";
import { TokenEstimator } from "@/components/pricing/token-estimator";
import { TierAdvisor } from "@/components/pricing/tier-advisor";

export const metadata: Metadata = {
  title: "Pricing Tools",
  description: "Estimate token costs across models and get a verdict on free tier vs. subscription vs. API.",
};

export default function PricingToolsPage() {
  const models = getModels();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Pricing Tools</h1>
        <p className="max-w-2xl text-muted-foreground">
          Estimate what a prompt actually costs across models, and figure out
          whether you need a subscription at all.
        </p>
      </div>

      <section className="mb-12 space-y-4">
        <h2 className="text-xl font-semibold">Token cost estimator</h2>
        <TokenEstimator models={models} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Free tier vs. subscription vs. API</h2>
        <TierAdvisor />
      </section>
    </div>
  );
}
