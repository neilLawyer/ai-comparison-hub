import type { Metadata } from "next";
import { getModels } from "@/lib/data";
import { CompareClient } from "@/components/models/compare-client";

export const metadata: Metadata = {
  title: "Compare AI Models",
  description:
    "Filter, sort, and compare AI models side-by-side across coding, reasoning, pricing, and more.",
};

export default function ComparePage() {
  const models = getModels();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Compare AI Models</h1>
        <p className="max-w-2xl text-muted-foreground">
          Filter by provider or price, then select up to 4 models for a detailed
          side-by-side breakdown.
        </p>
      </div>
      <CompareClient models={models} />
    </div>
  );
}
