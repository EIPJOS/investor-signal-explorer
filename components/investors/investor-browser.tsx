"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { SearchInput, SelectFilter } from "@/components/ui/filter-controls";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, investors } from "@/data/mock-data";

export function InvestorBrowser() {
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState("All styles");
  const styles = ["All styles", ...Array.from(new Set(investors.map((investor) => investor.style)))];
  const filtered = useMemo(() => {
    return investors.filter((investor) => {
      const matchesQuery = `${investor.name} ${investor.firm} ${investor.topHolding}`.toLowerCase().includes(query.toLowerCase());
      const matchesStyle = style === "All styles" || investor.style === style;
      return matchesQuery && matchesStyle;
    });
  }, [query, style]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-md border border-line bg-panel/70 p-4 md:flex-row">
        <SearchInput value={query} onChange={setQuery} placeholder="Search investors, firms, or top holdings" />
        <SelectFilter label="Style" value={style} onChange={setStyle} options={styles} />
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="No investors found" text="Try a broader search or reset the style filter." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((investor) => (
            <Link key={investor.slug} href={`/investors/${investor.slug}`}>
              <Card className="h-full transition hover:border-mint/60">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{investor.name}</h2>
                    <p className="text-sm text-slate-400">{investor.firm}</p>
                  </div>
                  <span className="rounded-md bg-mint/10 px-2 py-1 text-xs font-medium text-mint">{investor.topHolding}</span>
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-slate-500">Style</dt>
                    <dd className="font-medium text-slate-100">{investor.style}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Portfolio</dt>
                    <dd className="font-medium text-slate-100">{formatCurrency(investor.portfolioValue)}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Holdings</dt>
                    <dd className="font-medium text-slate-100">{investor.holdingsCount}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Last filing</dt>
                    <dd className="font-medium text-slate-100">{investor.lastFilingDate}</dd>
                  </div>
                </dl>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
