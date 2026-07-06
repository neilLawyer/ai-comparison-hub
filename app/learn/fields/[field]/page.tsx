import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, AlertTriangle, ListChecks } from "lucide-react";
import { getFieldBySlug, getFields, getModelsByIds } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { ModelAvatar } from "@/components/shared/model-avatar";
import { MarkdownRenderer } from "@/components/learn/markdown-renderer";

type Props = { params: Promise<{ field: string }> };

export async function generateStaticParams() {
  return getFields().map((field) => ({ field: field.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { field: slug } = await params;
  const field = getFieldBySlug(slug);
  if (!field) return {};
  return {
    title: field.name,
    description: `How to pick and use AI models for ${field.name.toLowerCase()}.`,
  };
}

export default async function FieldPlaybookPage({ params }: Props) {
  const { field: slug } = await params;
  const field = getFieldBySlug(slug);
  if (!field) notFound();

  const recommendedModels = getModelsByIds(field.recommendedModels);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/learn"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Learn
      </Link>

      <h1 className="mb-3 text-3xl font-semibold tracking-tight">{field.name}</h1>

      <Card className="mb-8 space-y-2 p-5">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <ListChecks className="size-4 text-primary" />
          What matters most
        </div>
        <ul className="grid grid-cols-1 gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
          {field.criteria.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Card>

      <div className="mb-8 space-y-3">
        <h2 className="text-lg font-semibold">Recommended models</h2>
        <div className="flex flex-wrap gap-3">
          {recommendedModels.map((model) => (
            <Link
              key={model.id}
              href={`/compare/${model.id}`}
              className="flex items-center gap-2 rounded-full border border-border/60 py-1.5 pl-1.5 pr-4 text-sm transition-colors hover:border-primary/40"
            >
              <ModelAvatar name={model.name} provider={model.provider} className="size-7 text-xs" />
              {model.name}
            </Link>
          ))}
        </div>
      </div>

      <MarkdownRenderer content={field.playbook} />

      <Card className="mt-8 space-y-2 border-destructive/30 bg-destructive/5 p-5">
        <div className="flex items-center gap-1.5 text-sm font-medium text-destructive">
          <AlertTriangle className="size-4" />
          Red flags
        </div>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {field.redFlags.map((flag) => (
            <li key={flag}>{flag}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
