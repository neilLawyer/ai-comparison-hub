import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav-links";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            <p className="font-display text-4xl tracking-tight sm:text-5xl">
              Comparison<em className="text-primary"> Hub</em>
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              The independent AI model index. Find the right model, use it
              well, stop overpaying.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-3 content-start">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-border/40 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} AI Comparison Hub</p>
          <p className="max-w-xl">
            Scores and pricing are directional estimates, refreshed
            periodically — verify current figures with providers before
            purchasing decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
