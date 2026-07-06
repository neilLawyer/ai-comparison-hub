import { cn } from "@/lib/utils";

const PROVIDER_GRADIENTS: Record<string, string> = {
  Anthropic: "from-orange-500/70 to-amber-600/70",
  OpenAI: "from-emerald-500/70 to-teal-600/70",
  Google: "from-blue-500/70 to-sky-600/70",
  xAI: "from-zinc-500/70 to-zinc-700/70",
  DeepSeek: "from-indigo-500/70 to-blue-600/70",
  Meta: "from-blue-600/70 to-indigo-700/70",
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
  const gradient = PROVIDER_GRADIENTS[provider] ?? "from-primary/60 to-primary/30";

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg bg-gradient-to-br font-semibold text-white",
        gradient,
        className
      )}
      aria-hidden
    >
      {initial}
    </div>
  );
}
