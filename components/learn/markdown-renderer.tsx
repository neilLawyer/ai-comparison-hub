import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export function MarkdownRenderer({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-invert max-w-none",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3",
        "prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2",
        "prose-p:text-muted-foreground prose-li:text-muted-foreground",
        "prose-strong:text-foreground prose-a:text-primary",
        "prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground",
        className
      )}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
