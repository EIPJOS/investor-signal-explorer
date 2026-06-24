"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, SectionHeader } from "@/components/ui/card";
import { SearchInput, SelectFilter } from "@/components/ui/filter-controls";
import { MockWarning } from "@/components/ui/mock-warning";
import { SortableTable } from "@/components/ui/sortable-table";
import { formatCurrency, insiderTrades } from "@/data/mock-data";
import type { InsiderTrade } from "@/data/types";

export function InsiderTradesBrowser() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Buy/Sell");
  const latestFiling = insiderTrades.map((trade) => trade.filingDate).sort((a, b) => b.localeCompare(a))[0] ?? "N/A";
  const buys = insiderTrades.filter((trade) => trade.type === "Buy");
  const sells = insiderTrades.filter((trade) => trade.type === "Sell");
  const totalBuyValue = buys.reduce((sum, trade) => sum + trade.value, 0);
  const clusterIds = Array.from(new Set(insiderTrades.map((trade) => trade.clusterId).filter((clusterId): clusterId is string => Boolean(clusterId)))).filter(
    (clusterId) => insiderTrades.filter((trade) => trade.clusterId === clusterId).length > 1
  );
  const rows = useMemo(() => {
    return insiderTrades.filter((trade) => {
      const text = `${trade.executive} ${trade.title} ${trade.ticker} ${trade.company}`.toLowerCase();
      return text.includes(query.toLowerCase()) && (type === "Buy/Sell" || trade.type === type);
    });
  }, [query, type]);
  const clusters = clusterIds.map((clusterId) => {
    const trades = insiderTrades.filter((trade) => trade.clusterId === clusterId);
    return {
      id: clusterId,
      ticker: trades[0]?.ticker ?? "N/A",
      executives: trades.map((trade) => trade.executive),
      value: trades.reduce((sum, trade) => sum + trade.value, 0),
      latestFiling: trades.map((trade) => trade.filingDate).sort((a, b) => b.localeCompare(a))[0] ?? "N/A"
    };
  });
  const largestPurchases = insiderTrades.filter((trade) => trade.type === "Buy").sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-slate-400">Mock transactions</p><p className="mt-2 text-2xl font-semibold text-white">{insiderTrades.length}</p></Card>
        <Card><p className="text-sm text-slate-400">Buys / sells</p><p className="mt-2 text-2xl font-semibold text-white">{buys.length} / {sells.length}</p></Card>
        <Card><p className="text-sm text-slate-400">Cluster groups</p><p className="mt-2 text-2xl font-semibold text-mint">{clusters.length}</p></Card>
        <Card><p className="text-sm text-slate-400">Buy value</p><p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(totalBuyValue)}</p><p className="mt-2 text-xs text-slate-500">Latest filing {latestFiling}</p></Card>
      </section>
      <div className="grid gap-3 rounded-md border border-line bg-panel/70 p-4 md:grid-cols-[1fr_180px]">
        <SearchInput value={query} onChange={setQuery} placeholder="Ticker, executive, company, or title" />
        <SelectFilter label="Type" value={type} onChange={setType} options={["Buy/Sell", "Buy", "Sell"]} />
      </div>
      <MockWarning compact />
      <SortableTable<InsiderTrade>
        rows={rows}
        columns={[
          { key: "executive", header: "Executive", accessor: (row) => row.executive },
          { key: "title", header: "Title", accessor: (row) => row.title },
          { key: "company", header: "Company", accessor: (row) => row.company },
          {
            key: "ticker",
            header: "Ticker",
            accessor: (row) => (
              <Link className="text-mint" href={`/stocks/${row.ticker}`}>
                {row.ticker}
              </Link>
            )
          },
          { key: "type", header: "Buy/Sell", accessor: (row) => <Badge tone={row.type === "Buy" ? "mint" : "red"}>{row.type}</Badge> },
          { key: "shares", header: "Shares", accessor: (row) => row.shares.toLocaleString(), sortValue: (row) => row.shares, align: "right" },
          { key: "value", header: "Value", accessor: (row) => formatCurrency(row.value), sortValue: (row) => row.value, align: "right" },
          { key: "filingDate", header: "Filing date", accessor: (row) => row.filingDate, sortValue: (row) => row.filingDate }
        ]}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <SectionHeader title="Cluster Buying" eyebrow="Form 4 pattern" />
          <div className="space-y-3">
            {clusters.map((cluster) => (
              <Link key={cluster.id} href={`/stocks/${cluster.ticker}`} className="flex items-center justify-between gap-3 rounded-md bg-ink/60 p-3 text-sm transition hover:bg-panelSoft">
                <span className="text-slate-200">
                  {cluster.ticker} - {cluster.executives.length} insiders - latest {cluster.latestFiling}
                </span>
                <Badge tone="mint">{formatCurrency(cluster.value)}</Badge>
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Largest Insider Purchases" eyebrow="Mock ranking" />
          <div className="space-y-3">
            {largestPurchases.map((trade) => (
              <Link key={trade.id} href={`/stocks/${trade.ticker}`} className="flex items-center justify-between gap-3 rounded-md bg-ink/60 p-3 text-sm transition hover:bg-panelSoft">
                <span className="text-slate-200">{trade.ticker} - {trade.executive}</span>
                <Badge tone="blue">{formatCurrency(trade.value)}</Badge>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
