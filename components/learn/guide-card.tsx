import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Guide } from "@/lib/types";

const DIFFICULTY_STYLES: Record<Guide["difficulty"], string> = {
  beginner: "text-emerald-500 border-emerald-500/30",
  intermediate: "text-sky-500 border-sky-500/30",
  advanced: "text-amber-500 border-amber-500/30",
};

const CATEGORY_LABELS: Record<Guide["category"], string> = {
  "prompt-engineering": "Prompt Engineering",
  concepts: "Concepts",
  safety: "Safety",
  techniques: "Techniques",
};

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link href={`/learn/${guide.slug}`}>
      <Card className="group flex h-full flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="secondary" className="font-normal">
            {CATEGORY_LABELS[guide.category]}
          </Badge>
          <Badge variant="outline" className={`font-normal ${DIFFICULTY_STYLES[guide.difficulty]}`}>
            {guide.difficulty}
          </Badge>
        </div>
        <h3 className="font-semibold leading-tight group-hover:text-primary">
          {guide.title}
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{guide.summary}</p>
      </Card>
    </Link>
  );
}
