import type { Metadata } from "next";
import { getModels } from "@/lib/data";
import { TokenEstimator } from "@/components/pricing/token-estimator";
import { TierAdvisor } from "@/components/pricing/tier-advisor";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Pricing Tools",
  description: "Estimate token costs across models and get a verdict on free tier vs. subscription vs. API.",
};

export default function PricingToolsPage() {
  const models = getModels();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Pricing tools"
        title={
          <>
            Know the cost <em className="text-primary">before you commit.</em>
          </>
        }
        description="Estimate what a prompt actually costs across models, and figure out whether you need a subscription at all."
      />

      <section className="mb-12 space-y-4">
        <h2 className="font-display text-2xl tracking-tight">Token cost estimator</h2>
        <TokenEstimator models={models} />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl tracking-tight">Free tier vs. subscription vs. API</h2>
        <TierAdvisor />
      </section>
    </div>
  );
}
