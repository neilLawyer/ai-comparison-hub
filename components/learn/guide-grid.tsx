import { GuideCard } from "@/components/learn/guide-card";
import type { Guide } from "@/lib/types";

export function GuideGrid({ guides }: { guides: Guide[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <GuideCard key={guide.slug} guide={guide} />
      ))}
    </div>
  );
}
