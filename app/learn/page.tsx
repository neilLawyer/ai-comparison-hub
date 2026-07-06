import type { Metadata } from "next";
import Link from "next/link";
import { getGuides, getFields } from "@/lib/data";
import { GuideGrid } from "@/components/learn/guide-grid";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Learn",
  description: "Prompt engineering, core concepts, safety, and field-specific playbooks for using AI well.",
};

export default function LearnPage() {
  const guides = getGuides();
  const fields = getFields();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Learn</h1>
        <p className="max-w-2xl text-muted-foreground">
          Guides on prompting, core concepts, and safety — plus field-specific
          playbooks for getting the most out of AI in your work.
        </p>
      </div>

      <section className="mb-12 space-y-4">
        <h2 className="text-xl font-semibold">Guides</h2>
        <GuideGrid guides={guides} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Field playbooks</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((field) => (
            <Link key={field.slug} href={`/learn/fields/${field.slug}`}>
              <Card className="flex h-full flex-col gap-2 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
                <h3 className="font-semibold hover:text-primary">{field.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {field.criteria.slice(0, 2).join(" · ")}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
