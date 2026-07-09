import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "mb-12 space-y-4",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-4xl tracking-tight text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
}
