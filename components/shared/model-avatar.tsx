import { cn } from "@/lib/utils";

const PROVIDER_COLORS: Record<string, string> = {
  Anthropic: "text-orange-700 dark:text-orange-400",
  OpenAI: "text-emerald-700 dark:text-emerald-400",
  Google: "text-blue-700 dark:text-blue-400",
  xAI: "text-zinc-700 dark:text-zinc-300",
  DeepSeek: "text-indigo-700 dark:text-indigo-400",
  Meta: "text-sky-700 dark:text-sky-400",
};

export function ModelAvatar({
  name,
  provider,
  className,
}: {
  name: string;
  provider: string;
  className?: string;
}) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = PROVIDER_COLORS[provider] ?? "text-foreground";

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border bg-muted/50 font-semibold",
        color,
        className
      )}
      aria-hidden
    >
      {initial}
    </div>
  );
}
