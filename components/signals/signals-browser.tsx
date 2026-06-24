"use client";

import { useMemo, useState } from "react";
import { SignalCard } from "@/components/signals/signal-card";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput, SelectFilter } from "@/components/ui/filter-controls";
import { signals } from "@/data/mock-data";

export function SignalsBrowser() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All signals");
  const [sort, setSort] = useState("Newest");
  const types = ["All signals", ...Array.from(new Set(signals.map((signal) => signal.type)))];
  const latestSignal = signals.map((signal) => signal.timestamp).sort((a, b) => b.localeCompare(a))[0] ?? "N/A";
  const highConfidence = signals.filter((signal) => signal.confidence === "High").length;
  const watchedTickers = new Set(signals.map((signal) => signal.ticker)).size;
  const sourceTypes = new Set(signals.map((signal) => signal.type)).size;

  const rows = useMemo(() => {
    const filtered = signals.filter((signal) => {
      const text = `${signal.type} ${signal.actor} ${signal.ticker} ${signal.explanation}`.toLowerCase();
      return text.includes(query.toLowerCase()) && (type === "All signals" || signal.type === type);
    });
    return filtered.sort((a, b) => {
      const diff = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      return sort === "Newest" ? -diff : diff;
    });
  }, [query, sort, type]);

  return (
    <div className="space-y-5">
      <section className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-slate-400">Mock signals</p><p className="mt-2 text-2xl font-semibold text-white">{signals.length}</p></Card>
        <Card><p className="text-sm text-slate-400">Watched tickers</p><p className="mt-2 text-2xl font-semibold text-white">{watchedTickers}</p></Card>
        <Card><p className="text-sm text-slate-400">High confidence</p><p className="mt-2 text-2xl font-semibold text-mint">{highConfidence}</p></Card>
        <Card><p className="text-sm text-slate-400">Source groups</p><p className="mt-2 text-2xl font-semibold text-white">{sourceTypes}</p><p className="mt-2 text-xs text-slate-500">Latest {new Date(latestSignal).toLocaleDateString()}</p></Card>
      </section>
      <div className="grid gap-3 rounded-md border border-line bg-panel/70 p-4 md:grid-cols-[1fr_260px_160px]">
        <SearchInput value={query} onChange={setQuery} placeholder="Search signals by ticker, actor, or explanation" />
        <SelectFilter label="Signal type" value={type} onChange={setType} options={types} />
        <SelectFilter label="Sort" value={sort} onChange={setSort} options={["Newest", "Oldest"]} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>
      {rows.length === 0 ? <EmptyState title="No matching signals" text="Adjust the signal type or search term to expand the mock signal set." /> : null}
    </div>
  );
}
