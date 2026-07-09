import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getGuideBySlug, getGuides } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/components/learn/markdown-renderer";
import { PromptExampleBlock } from "@/components/learn/prompt-example-block";

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_LABELS: Record<string, string> = {
  "prompt-engineering": "Prompt Engineering",
  concepts: "Concepts",
  safety: "Safety",
  techniques: "Techniques",
};

export async function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.summary };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/learn"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Learn
      </Link>

      <div className="mb-8 space-y-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="secondary" className="font-normal">
            {CATEGORY_LABELS[guide.category] ?? guide.category}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {guide.difficulty}
          </Badge>
        </div>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{guide.title}</h1>
        <p className="text-lg text-muted-foreground">{guide.summary}</p>
      </div>

      <MarkdownRenderer content={guide.content} />

      {guide.slug === "good-vs-bad-prompts" && (
        <div className="mt-8">
          <PromptExampleBlock
            bad="Write about marketing."
            good="Write a 200-word LinkedIn post aimed at small e-commerce founders, explaining why abandoned-cart emails convert better than generic newsletters. Conversational tone, one concrete example, end with a question."
            note="The good version specifies audience, format, length, a constraint, and tone — the model no longer has to guess."
          />
        </div>
      )}
    </div>
  );
}
