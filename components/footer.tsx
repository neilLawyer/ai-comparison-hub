import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav-links";

export function Footer() {
  return (
    <footer className="mt-24 bg-[#f5f5f7] text-xs dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <p className="border-b pb-4 leading-relaxed text-muted-foreground">
          Scores and pricing are directional estimates, refreshed periodically.
          Verify current figures with providers before making purchasing
          decisions.
        </p>
        <div className="flex flex-col gap-3 pt-4 md:flex-row md:items-center md:justify-between">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} AI Comparison Hub
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
