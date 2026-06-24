"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeInfo,
  BarChart3,
  Building2,
  CandlestickChart,
  Gauge,
  Landmark,
  Menu,
  Newspaper,
  Search,
  ShieldCheck,
  Database,
  UserRoundCheck,
  X
} from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

const navigation = [
  { href: "/", label: "Dashboard", icon: Gauge },
  { href: "/investors", label: "Famous Investors", icon: Building2 },
  { href: "/congress", label: "Congress Trades", icon: Landmark },
  { href: "/insiders", label: "Insider Trades", icon: UserRoundCheck },
  { href: "/stocks/VST", label: "Stocks", icon: CandlestickChart },
  { href: "/signals", label: "Signals", icon: BarChart3 },
  { href: "/data-sources", label: "Data Sources", icon: Database },
  { href: "/about", label: "About", icon: BadgeInfo }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 border-r border-line bg-ink/95 px-5 py-6 backdrop-blur lg:block">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-mint text-ink">
            <ShieldCheck size={21} />
          </span>
          <span>
            <span className="block text-base font-semibold text-white">investina</span>
            <span className="block text-xs text-slate-400">research dashboard</span>
          </span>
        </Link>
        <nav className="mt-9 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("/")[1] ? `/${item.href.split("/")[1]}` : item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition",
                  active ? "bg-panelSoft text-white" : "text-slate-400 hover:bg-panel hover:text-white"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-6 left-5 right-5 rounded-md border border-line bg-panel p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Newspaper size={16} className="text-mint" />
            Mock research mode
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Mock data only. Public filings can be delayed, incomplete, or amended.
          </p>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-line bg-ink/88 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white">
            <ShieldCheck size={20} className="text-mint" />
            investina
          </Link>
          <button
            aria-label="Toggle navigation"
            className="rounded-md border border-line p-2 text-slate-200"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open ? (
          <nav className="mt-3 grid grid-cols-2 gap-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-md bg-panel px-3 py-2 text-sm text-slate-200"
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </header>

      <div className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <div className="flex w-full max-w-md items-center gap-3 rounded-md border border-line bg-panel px-3 py-2 text-slate-400">
              <Search size={17} />
              <span className="text-sm">Search tickers, investors, or policymakers</span>
            </div>
            <div className="rounded-md border border-line px-3 py-2 text-xs text-slate-400">
              Educational research, not investment advice
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
