"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BellRing,
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Plane,
  ReceiptText,
  Settings,
  UserRound,
  WalletCards,
} from "lucide-react";

import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { cn } from "../lib/utils";

const navItems = [
  { href: "/", label: "Home", key: "home" as const },
  {
    href: "/dashboard/bookings/my-bookings",
    label: "My Bookings",
    key: "bookings" as const,
  },
];

const walletItems = [
  { icon: WalletCards, label: "Main Balance", value: "Rs. 48,500" },
  { icon: CreditCard, label: "Credit Limit", value: "Rs. 1,20,000" },
  { icon: ReceiptText, label: "Last Settlement", value: "Today, 10:30 AM" },
];

const notifications = [
  {
    title: "Booking confirmed",
    detail: "DEL to DXB for 3 travellers has been ticketed.",
    time: "2 min ago",
  },
  {
    title: "Wallet updated",
    detail: "Rs. 25,000 credit received from Skyline Holidays.",
    time: "18 min ago",
  },
  {
    title: "Fare expiring",
    detail: "Dubai net fare hold will expire in 12 minutes.",
    time: "1 hr ago",
  },
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 md:inline-flex"
              >
                <WalletCards className="h-4 w-4" />
                Wallet
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 rounded-2xl border-white/60 bg-background/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl"
            >
              <DropdownMenuLabel className="px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Wallet Overview</p>
                    <p className="text-xs font-normal text-muted-foreground">
                      Track live balance and settlement status
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    Active
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {walletItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  className="rounded-xl px-3 py-3 focus:bg-accent/70"
                >
                  <div className="flex w-full items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer rounded-xl px-3 py-2.5 font-medium"
                onClick={() => router.push("/dashboard")}
              >
                Open wallet dashboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <BellRing className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[360px] rounded-2xl border-white/60 bg-background/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl"
            >
              <DropdownMenuLabel className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Notifications</p>
                    <p className="text-xs font-normal text-muted-foreground">
                      Latest booking and wallet alerts
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    {notifications.length} new
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((item) => (
                <DropdownMenuItem
                  key={item.title}
                  className="rounded-xl px-3 py-3 focus:bg-accent/70"
                >
                  <div className="flex w-full gap-3">
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <span className="text-[11px] text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-border/60 bg-background/80 pl-1 pr-3 py-1 text-left transition hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
                    SH
                  </AvatarFallback>
                </Avatar>
                <div className="hidden min-w-0 sm:block">
                  <p className="truncate text-xs font-semibold text-foreground">Sanjeet</p>
                  <p className="truncate text-[11px] text-muted-foreground">Agency Admin</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-72 rounded-2xl border-white/60 bg-background/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl"
            >
              <DropdownMenuLabel className="px-3 py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11">
                    <AvatarFallback className="bg-accent text-sm font-semibold text-accent-foreground">
                      SH
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Sanjeet Kunal</p>
                    <p className="text-xs font-normal text-muted-foreground">
                      skyline@agency.com
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer rounded-xl px-3 py-2.5"
                onClick={() => router.push("/dashboard")}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer rounded-xl px-3 py-2.5"
                onClick={() => router.push("/dashboard/profile")}
              >
                <UserRound className="h-4 w-4" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer rounded-xl px-3 py-2.5"
                onClick={() => router.push("/dashboard/settings")}
              >
                <Settings className="h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer rounded-xl px-3 py-2.5 text-destructive focus:text-destructive"
                onClick={() => router.push("/login")}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
