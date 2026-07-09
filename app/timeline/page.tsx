import type { Metadata } from "next";
import { getTimeline } from "@/lib/data";
import { TimelineView } from "@/components/timeline/timeline-view";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Timeline",
  description: "A history of major AI model milestones, plus a few labeled predictions for what's next.",
};

export default function TimelinePage() {
  const events = getTimeline();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <PageHeader
        title="How we got here."
        description="From AlexNet to today's frontier models — plus a few clearly labeled predictions for what's next."
      />
      <TimelineView events={events} />
    </div>
  );
}
