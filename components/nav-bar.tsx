"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS } from "@/lib/nav-links";

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="flex size-7 items-center justify-center rounded-md bg-primary font-display text-lg italic leading-none text-primary-foreground">
        A
      </span>
      <span className="font-display text-xl tracking-tight">
        Comparison<em className="text-primary"> Hub</em>
      </span>
    </span>
  );
}

function NavItem({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm transition-colors hover:text-foreground",
        active ? "font-medium text-foreground" : "text-muted-foreground"
      )}
    >
      {label}
    </Link>
  );
}

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="AI Comparison Hub — home">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              active={pathname === link.href || pathname.startsWith(link.href + "/")}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            size="sm"
            className="hidden rounded-full px-4 md:inline-flex"
            render={<Link href="/recommend" />}
            nativeButton={false}
          >
            Find my model
          </Button>
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Wordmark />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4">
                {NAV_LINKS.map((link) => (
                  <NavItem
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    active={pathname === link.href || pathname.startsWith(link.href + "/")}
                  />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
