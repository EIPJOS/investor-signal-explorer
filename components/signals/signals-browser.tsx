"use client";

import { useMemo, useState } from "react";
import { SignalCard } from "@/components/signals/signal-card";
import { SearchInput, SelectFilter } from "@/components/ui/filter-controls";
import { signals } from "@/data/mock-data";

export function SignalsBrowser() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All signals");
  const [sort, setSort] = useState("Newest");
  const types = ["All signals", ...Array.from(new Set(signals.map((signal) => signal.type)))];

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
    </div>
  );
}
