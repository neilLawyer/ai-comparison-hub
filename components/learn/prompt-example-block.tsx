import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

export function PromptExampleBlock({
  bad,
  good,
  note,
}: {
  bad: string;
  good: string;
  note?: string;
}) {
  return (
    <div className="not-prose space-y-3">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="space-y-2 border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-1.5 text-sm font-medium text-destructive">
            <X className="size-4" />
            Bad prompt
          </div>
          <p className="text-sm text-muted-foreground">{bad}</p>
        </Card>
        <Card className="space-y-2 border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-500">
            <Check className="size-4" />
            Good prompt
          </div>
          <p className="text-sm text-muted-foreground">{good}</p>
        </Card>
      </div>
      {note && <p className="text-sm text-muted-foreground">{note}</p>}
    </div>
  );
}
