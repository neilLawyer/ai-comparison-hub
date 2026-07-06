import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav-links";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold">AI Comparison Hub</p>
          <p className="text-sm text-muted-foreground">
            Find the right model, use it well, stop overpaying.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
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
      <div className="mx-auto max-w-7xl px-4 pb-8 text-xs text-muted-foreground sm:px-6 lg:px-8">
        Scores and pricing are directional estimates for evaluation purposes, refreshed periodically — verify current figures with providers before purchasing decisions.
      </div>
    </footer>
  );
}
