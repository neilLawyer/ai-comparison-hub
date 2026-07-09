import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getModels, getModelById } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ModelAvatar } from "@/components/shared/model-avatar";
import { FadeIn } from "@/components/shared/fade-in";
import { averageScore } from "@/lib/score-labels";

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-[17px] font-normal text-primary hover:underline"
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export default function Home() {
  const models = [...getModels()].sort(
    (a, b) => averageScore(b.scores) - averageScore(a.scores)
  );
  const claude = getModelById("claude")!;
  const gpt = getModelById("gpt")!;

  const promptCostCents = ((1000 / 1_000_000) * claude.pricing.inputPerMTokens * 100).toFixed(1);

  return (
    <div>
      {/* Hero */}
      <section className="px-4 pt-20 pb-16 sm:px-6 sm:pt-28">
        <FadeIn className="mx-auto max-w-3xl space-y-5 text-center">
          <h1 className="text-5xl font-semibold tracking-tighter text-balance sm:text-6xl lg:text-7xl">
            Which AI should you use?
          </h1>
          <p className="mx-auto max-w-xl text-xl leading-relaxed text-muted-foreground">
            Six frontier models, scored honestly across eight categories.
            Compare them, learn them, and stop overpaying.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2">
            <Button
              size="lg"
              className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/90"
              render={<Link href="/recommend" />}
              nativeButton={false}
            >
              Take the quiz
            </Button>
            <TextLink href="/compare">Compare models</TextLink>
          </div>
        </FadeIn>

        {/* Product shot: the actual leaderboard */}
        <FadeIn delay={0.1} className="mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="flex items-baseline justify-between border-b px-6 py-4">
              <h2 className="font-medium">Overall ranking</h2>
              <span className="text-sm text-muted-foreground">
                Average of 8 categories
              </span>
            </div>
            <ol className="divide-y">
              {models.map((model, i) => {
                const avg = averageScore(model.scores);
                return (
                  <li key={model.id}>
                    <Link
                      href={`/compare/${model.id}`}
                      className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/50"
                    >
                      <span className="w-4 text-sm text-muted-foreground tabular-nums">
                        {i + 1}
                      </span>
                      <ModelAvatar
                        name={model.name}
                        provider={model.provider}
                        className="size-8 shrink-0 text-sm"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{model.name}</p>
                      </div>
                      <div className="hidden h-1.5 w-40 overflow-hidden rounded-full bg-muted sm:block">
                        <div
                          className="h-full rounded-full bg-foreground"
                          style={{ width: `${avg}%` }}
                        />
                      </div>
                      <span className="w-8 text-right font-semibold tabular-nums">
                        {avg}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Directional estimates, refreshed periodically.
          </p>
        </FadeIn>
      </section>

      {/* Tile grid */}
      <section className="bg-[#f5f5f7] px-4 py-16 dark:bg-[#0a0a0a] sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          <FadeIn className="flex flex-col rounded-2xl bg-background p-8 sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight">Compare.</h3>
            <p className="mt-1 text-muted-foreground">
              Up to four models, side by side.
            </p>
            <div className="my-8 space-y-4">
              {(["coding", "reasoning", "creativity"] as const).map((cat) => (
                <div key={cat} className="space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="capitalize">{cat}</span>
                    <span className="tabular-nums">
                      {claude.scores[cat]} · {gpt.scores[cat]}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-foreground"
                        style={{ width: `${claude.scores[cat]}%` }}
                      />
                    </div>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-foreground/40"
                        style={{ width: `${gpt.scores[cat]}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                {claude.name} vs. {gpt.name}
              </p>
            </div>
            <div className="mt-auto">
              <TextLink href="/compare">Open the comparison</TextLink>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} className="flex flex-col rounded-2xl bg-background p-8 sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight">Rankings.</h3>
            <p className="mt-1 text-muted-foreground">
              Tier lists and leaderboards, by category.
            </p>
            <div className="my-8 space-y-3">
              {models.slice(0, 3).map((m, i) => (
                <div key={m.id} className="flex items-center gap-3">
                  <span className="w-4 text-sm text-muted-foreground tabular-nums">
                    {i + 1}
                  </span>
                  <ModelAvatar
                    name={m.name}
                    provider={m.provider}
                    className="size-7 shrink-0 text-xs"
                  />
                  <span className="flex-1 truncate text-sm font-medium">
                    {m.name}
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    {averageScore(m.scores)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <TextLink href="/rankings">See all rankings</TextLink>
            </div>
          </FadeIn>

          <FadeIn className="flex flex-col rounded-2xl bg-background p-8 sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight">Pricing.</h3>
            <p className="mt-1 text-muted-foreground">
              What a prompt actually costs, per model.
            </p>
            <div className="my-8">
              <p className="text-5xl font-semibold tracking-tighter tabular-nums">
                {promptCostCents}¢
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                for 1,000 input tokens on {claude.name}. Paste your own prompt
                and see the real number on every model.
              </p>
            </div>
            <div className="mt-auto">
              <TextLink href="/pricing-tools">Run the numbers</TextLink>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} className="flex flex-col rounded-2xl bg-background p-8 sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight">Learn.</h3>
            <p className="mt-1 text-muted-foreground">
              Prompting, verification, and field playbooks.
            </p>
            <div className="my-8 rounded-xl bg-muted/60 p-4">
              <p className="text-xs font-medium text-muted-foreground">
                A better prompt
              </p>
              <p className="mt-1.5 text-sm leading-relaxed">
                &ldquo;Rewrite this email to be half as long. Keep the ask in
                the first sentence and the deadline in bold.&rdquo;
              </p>
            </div>
            <div className="mt-auto">
              <TextLink href="/learn">Start learning</TextLink>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Statement */}
      <section className="bg-black px-4 py-24 text-white sm:px-6 sm:py-32">
        <FadeIn className="mx-auto max-w-2xl space-y-5 text-center">
          <h2 className="text-4xl font-semibold tracking-tighter sm:text-5xl">
            Zero spin.
          </h2>
          <p className="text-lg leading-relaxed text-white/70">
            Every model page lists real weaknesses next to real strengths, and
            the same eight categories are applied to all six models. No
            sponsors, no affiliate rankings.
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-1 text-[17px] text-white hover:underline"
          >
            How we grade
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </FadeIn>
      </section>

      {/* Closing CTA */}
      <section className="px-4 py-24 sm:px-6 sm:py-28">
        <FadeIn className="mx-auto max-w-xl space-y-5 text-center">
          <h2 className="text-4xl font-semibold tracking-tighter sm:text-5xl">
            Ready when you are.
          </h2>
          <p className="text-lg text-muted-foreground">
            Six questions, one minute, one clear recommendation.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/90"
            render={<Link href="/recommend" />}
            nativeButton={false}
          >
            Take the quiz
          </Button>
        </FadeIn>
      </section>
    </div>
  );
}
