import type { Metadata } from "next";
import { getTimeline } from "@/lib/data";
import { TimelineView } from "@/components/timeline/timeline-view";

export const metadata: Metadata = {
  title: "Timeline",
  description: "A history of major AI model milestones, plus a few labeled predictions for what's next.",
};

export default function TimelinePage() {
  const events = getTimeline();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">AI Timeline</h1>
        <p className="max-w-2xl text-muted-foreground">
          From AlexNet to today&apos;s frontier models — plus a few clearly
          labeled predictions for what&apos;s next.
        </p>
      </div>
      <TimelineView events={events} />
    </div>
  );
}
