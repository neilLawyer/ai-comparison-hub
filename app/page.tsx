import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getModels, getGuides, getFields, getTimeline } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ModelAvatar } from "@/components/shared/model-avatar";
import { FadeIn } from "@/components/shared/fade-in";
import { averageScore } from "@/lib/score-labels";

function Marquee({ items }: { items: string[] }) {
  const row = items.join("   ·   ");
  return (
    <div className="marquee-mask overflow-hidden border-y border-border/60 py-3">
      <div className="animate-marquee flex w-max whitespace-pre font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="pr-12">{row}</span>
        <span className="pr-12">{row}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const models = [...getModels()].sort(
    (a, b) => averageScore(b.scores) - averageScore(a.scores)
  );
  const top3 = models.slice(0, 3);
  const milestones = getTimeline().filter((e) => !e.isPrediction).length;
  const resources = getGuides().length + getFields().length;

  const tickerItems = models.map(
    (m) => `${m.name}  ${averageScore(m.scores)}`
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[82svh] items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-4xl space-y-8">
            <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              The independent AI model index
            </p>
            <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl">
              Every frontier model,{" "}
              <em className="text-primary">measured honestly.</em>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Side-by-side comparisons, tier lists, and a one-minute
              recommender — six models scored across eight categories, priced
              to the token.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Button
                size="lg"
                className="h-12 rounded-full px-7 text-base"
                render={<Link href="/recommend" />}
                nativeButton={false}
              >
                Find my model
              </Button>
              <Link
                href="/rankings"
                className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Browse the rankings
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Marquee items={tickerItems} />

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <FadeIn>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {[
              { value: String(models.length), label: "Models tracked" },
              { value: "8", label: "Scoring categories" },
              { value: String(resources), label: "Guides & playbooks" },
              { value: String(milestones), label: "Milestones charted" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border-l border-border/60 pl-6"
              >
                <dd className="font-display text-5xl tabular-nums sm:text-6xl">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </FadeIn>
      </section>

      {/* Leaderboard */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 flex items-end justify-between gap-4">
          <div className="space-y-3">
            <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.25em] text-primary">
              Leaderboard
            </p>
            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
              Today&apos;s top three.
            </h2>
          </div>
          <Link
            href="/rankings"
            className="group hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            All {models.length} models
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </FadeIn>
        <FadeIn delay={0.05}>
          <ol className="divide-y divide-border/60 border-y border-border/60">
            {top3.map((model, i) => (
              <li key={model.id}>
                <Link
                  href={`/compare/${model.id}`}
                  className="group flex items-center gap-6 py-8 transition-colors hover:bg-card/60 sm:gap-10 sm:px-6"
                >
                  <span className="font-mono text-sm text-muted-foreground tabular-nums">
                    0{i + 1}
                  </span>
                  <ModelAvatar
                    name={model.name}
                    provider={model.provider}
                    className="size-12 shrink-0 text-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl tracking-tight sm:text-3xl">
                      {model.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {model.provider} · ${model.pricing.inputPerMTokens}/M
                      input
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-3xl tabular-nums sm:text-4xl">
                      {averageScore(model.scores)}
                    </p>
                    <p className="text-xs text-muted-foreground">avg score</p>
                  </div>
                  <ArrowRight className="hidden size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground sm:block" />
                </Link>
              </li>
            ))}
          </ol>
        </FadeIn>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
          <FadeIn>
            <div className="lg:sticky lg:top-28 space-y-4">
              <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.25em] text-primary">
                What&apos;s inside
              </p>
              <h2 className="font-display text-4xl tracking-tight text-balance sm:text-5xl">
                Built to make you <em className="text-primary">decisive.</em>
              </h2>
              <p className="max-w-md text-muted-foreground leading-relaxed">
                Most model roundups are marketing in a table. This is the
                opposite: consistent scoring, real weaknesses listed next to
                strengths, and prices you can actually compare.
              </p>
            </div>
          </FadeIn>
          <div className="space-y-12">
            {[
              {
                n: "01",
                title: "Compare without the spin",
                body: "Radar charts and spec tables across coding, reasoning, writing, speed, and cost — up to four models side by side, weaknesses included.",
                href: "/compare",
                link: "Open the comparison hub",
              },
              {
                n: "02",
                title: "Learn to use it properly",
                body: "Prompt engineering, hallucination checks, and field playbooks for developers, writers, and analysts. The model matters less than how you drive it.",
                href: "/learn",
                link: "Visit the learning hub",
              },
              {
                n: "03",
                title: "Pay for exactly what you need",
                body: "Paste a prompt, see its real token cost on every model. Then find out whether you need the API, a subscription, or nothing at all.",
                href: "/pricing-tools",
                link: "Run the numbers",
              },
            ].map((f, i) => (
              <FadeIn key={f.n} delay={i * 0.05}>
                <div className="border-t border-border/60 pt-8">
                  <p className="font-mono text-sm text-muted-foreground">
                    {f.n}
                  </p>
                  <h3 className="mt-3 font-display text-3xl tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
                    {f.body}
                  </p>
                  <Link
                    href={f.href}
                    className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    {f.link}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-border/60 px-6 py-20 text-center sm:py-28">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse 70% 90% at 50% 110%, oklch(0.45 0.25 293 / 0.35), transparent 70%)",
              }}
            />
            <h2 className="font-display text-5xl tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Stop guessing.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
              Six questions. One minute. The right model for your work and
              budget.
            </p>
            <Button
              size="lg"
              className="mt-8 h-12 rounded-full px-8 text-base"
              render={<Link href="/recommend" />}
              nativeButton={false}
            >
              Take the quiz
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
