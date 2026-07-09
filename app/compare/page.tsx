import type { Metadata } from "next";
import { getModels } from "@/lib/data";
import { CompareClient } from "@/components/models/compare-client";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Compare AI Models",
  description:
    "Filter, sort, and compare AI models side-by-side across coding, reasoning, pricing, and more.",
};

export default function ComparePage() {
  const models = getModels();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Comparison hub"
        title={
          <>
            Side by side, <em className="text-primary">no spin.</em>
          </>
        }
        description="Filter by provider or price, then select up to 4 models for a detailed side-by-side breakdown."
      />
      <CompareClient models={models} />
    </div>
  );
}
