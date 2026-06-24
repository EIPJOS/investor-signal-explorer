"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, SectionHeader } from "@/components/ui/card";
import { SearchInput, SelectFilter } from "@/components/ui/filter-controls";
import { SortableTable } from "@/components/ui/sortable-table";
import { formatCurrency, insiderTrades } from "@/data/mock-data";
import type { InsiderTrade } from "@/data/types";

export function InsiderTradesBrowser() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Buy/Sell");
  const rows = useMemo(() => {
    return insiderTrades.filter((trade) => {
      const text = `${trade.executive} ${trade.title} ${trade.ticker} ${trade.company}`.toLowerCase();
      return text.includes(query.toLowerCase()) && (type === "Buy/Sell" || trade.type === type);
    });
  }, [query, type]);
  const clusters = insiderTrades.filter((trade) => trade.clusterId);
  const largestPurchases = insiderTrades.filter((trade) => trade.type === "Buy").sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-md border border-line bg-panel/70 p-4 md:grid-cols-[1fr_180px]">
        <SearchInput value={query} onChange={setQuery} placeholder="Ticker, executive, company, or title" />
        <SelectFilter label="Type" value={type} onChange={setType} options={["Buy/Sell", "Buy", "Sell"]} />
      </div>
      <SortableTable<InsiderTrade>
        rows={rows}
        columns={[
          { key: "executive", header: "Executive", accessor: (row) => row.executive },
          { key: "title", header: "Title", accessor: (row) => row.title },
          { key: "company", header: "Company", accessor: (row) => row.company },
          { key: "ticker", header: "Ticker", accessor: (row) => row.ticker },
          { key: "type", header: "Buy/Sell", accessor: (row) => <Badge tone={row.type === "Buy" ? "mint" : "red"}>{row.type}</Badge> },
          { key: "shares", header: "Shares", accessor: (row) => row.shares.toLocaleString(), sortValue: (row) => row.shares, align: "right" },
          { key: "value", header: "Value", accessor: (row) => formatCurrency(row.value), sortValue: (row) => row.value, align: "right" },
          { key: "filingDate", header: "Filing date", accessor: (row) => row.filingDate }
        ]}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <SectionHeader title="Cluster Buying" eyebrow="Form 4 pattern" />
          <div className="space-y-3">
            {clusters.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between rounded-md bg-ink/60 p-3 text-sm">
                <span className="text-slate-200">{trade.executive} bought {trade.ticker}</span>
                <Badge tone="mint">{formatCurrency(trade.value)}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Largest Insider Purchases" eyebrow="Mock ranking" />
          <div className="space-y-3">
            {largestPurchases.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between rounded-md bg-ink/60 p-3 text-sm">
                <span className="text-slate-200">{trade.ticker} - {trade.executive}</span>
                <Badge tone="blue">{formatCurrency(trade.value)}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
