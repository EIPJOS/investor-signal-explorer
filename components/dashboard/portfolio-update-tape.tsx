import Link from "next/link";
import { CalendarDays, CircleDot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, SectionHeader } from "@/components/ui/card";
import { ownershipStats, portfolioUpdates } from "@/data/homepage-intelligence";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}

export function PortfolioUpdateTape() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <Card>
        <SectionHeader title="Portfolio Update Tape" eyebrow="Latest 13F-style refreshes" />
        <div className="grid max-h-[44rem] gap-x-6 overflow-y-auto pr-1 scrollbar-thin md:grid-cols-2">
          {portfolioUpdates.map((update) => {
            const content = (
              <div className="flex min-h-14 items-start gap-3 border-b border-line/70 py-2.5">
                <CircleDot size={10} className="mt-1.5 shrink-0 text-mint" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="truncate text-sm font-medium text-white">
                      {update.investorName} <span className="font-normal text-slate-500">· {update.firm}</span>
                    </p>
                    <span className="shrink-0 text-xs text-slate-400">{formatDate(update.updatedAt)}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <Badge tone="slate">{update.topTicker}</Badge>
                    <span>{update.changeCount} changes</span>
                    <span>{update.summary}</span>
                  </div>
                </div>
              </div>
            );

            return update.slug ? (
              <Link key={update.id} href={`/investors/${update.slug}`} className="block hover:bg-panelSoft/40">
                {content}
              </Link>
            ) : (
              <div key={update.id}>{content}</div>
            );
          })}
        </div>
      </Card>

      <div className="space-y-6">
        <Card>
          <SectionHeader title="Ownership Pulse" eyebrow="Mock portfolio stats" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                <CalendarDays size={16} className="text-mint" />
                Most Owned
              </div>
              <div className="space-y-2">
                {ownershipStats.mostOwned.map((stock, index) => (
                  <Link key={stock.ticker} href={`/stocks/${stock.ticker}`} className="flex items-center justify-between rounded-md bg-ink/55 px-3 py-2 text-sm hover:bg-panelSoft">
                    <span className="text-slate-300">{index + 1}. <span className="font-medium text-white">{stock.ticker}</span> · {stock.company}</span>
                    <span className="text-slate-500">{stock.count}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 text-sm font-semibold text-white">High Conviction</div>
              <div className="space-y-2">
                {ownershipStats.highConviction.map((stock) => (
                  <Link key={stock.ticker} href={`/stocks/${stock.ticker}`} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-md bg-ink/55 px-3 py-2 text-sm hover:bg-panelSoft">
                    <span className="text-white">{stock.ticker}</span>
                    <span className="text-slate-400">{stock.maxWeight.toFixed(1)}%</span>
                    <span className="text-slate-500">{stock.owners} owners</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
