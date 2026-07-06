import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModelAvatar } from "@/components/shared/model-avatar";
import type { QuizResult } from "@/lib/quiz-scoring";

export function RecommendationResult({ result }: { result: QuizResult }) {
  const { winner, runnerUp } = result;

  return (
    <div className="space-y-6">
      <Card className="space-y-5 border-primary/30 bg-primary/5 p-6 sm:p-8">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <Trophy className="size-4" />
          Your best match
        </div>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <ModelAvatar
            name={winner.name}
            provider={winner.provider}
            className="size-16 shrink-0 text-2xl"
          />
          <div>
            <h3 className="text-2xl font-semibold">{winner.name}</h3>
            <p className="text-muted-foreground">{winner.provider}</p>
          </div>
        </div>
        <p className="text-muted-foreground">{winner.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {winner.bestFor.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        <div>
          <p className="mb-1.5 text-sm font-medium">Why this one</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {winner.strengths.slice(0, 3).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between border-t border-border/60 pt-4 text-sm">
          <span className="text-muted-foreground">
            ${winner.pricing.inputPerMTokens}/M input ·{" "}
            {winner.pricing.subscriptionPrice != null
              ? `$${winner.pricing.subscriptionPrice}/mo subscription`
              : "API only, no first-party subscription"}
          </span>
          <Button
            render={<Link href={`/compare/${winner.id}`} />}
            nativeButton={false}
            size="sm"
          >
            View details
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Card>

      {runnerUp && (
        <Card className="flex items-center gap-4 p-5">
          <ModelAvatar
            name={runnerUp.name}
            provider={runnerUp.provider}
            className="size-10 shrink-0"
          />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Runner-up</p>
            <p className="font-medium">{runnerUp.name}</p>
          </div>
          <Button
            render={<Link href={`/compare/${runnerUp.id}`} />}
            nativeButton={false}
            variant="outline"
            size="sm"
          >
            View
          </Button>
        </Card>
      )}
    </div>
  );
}
