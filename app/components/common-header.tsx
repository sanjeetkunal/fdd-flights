"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BellRing, Building2, LayoutDashboard, LogOut, Plane } from "lucide-react";

import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const navItems = [
  { href: "/", label: "Home", key: "home" as const },
  { href: "/fixed-departure", label: "Fixed Departures", key: "fixed-departure" as const },
  { href: "#", label: "Series Fares", key: "series" as const },
  { href: "/bookings", label: "Bookings", key: "bookings" as const },
  { href: "#", label: "Wallet", key: "wallet" as const },
];
export function CommonHeader() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl shadow-sm"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            <Plane className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight">Skyportal</p>
            <p className="text-[11px] text-muted-foreground">Agent Console</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href !== "#" && pathname.startsWith(item.href);

            return (
              <Button
                key={item.label}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={cn("text-sm font-medium", isActive && "shadow-sm")}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <BellRing className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="hidden cursor-pointer items-center gap-2 text-sm font-medium md:inline-flex"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => router.push("/login")}
            className="hidden cursor-pointer items-center gap-2 text-sm font-medium sm:inline-flex"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
          <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium sm:flex">
            <Building2 className="h-3.5 w-3.5 text-primary" />
            Skyline Holidays Pvt Ltd
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
            SH
          </div>
        </div>
      </div>
    </header>
  );
}
