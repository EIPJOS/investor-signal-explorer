"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SearchInput, SelectFilter } from "@/components/ui/filter-controls";
import { SortableTable } from "@/components/ui/sortable-table";
import { congressTrades } from "@/data/mock-data";
import { slugify } from "@/data/congress-analytics";
import type { CongressTrade } from "@/data/types";

export function CongressTradesBrowser() {
  const [query, setQuery] = useState("");
  const [party, setParty] = useState("All parties");
  const [chamber, setChamber] = useState("All chambers");
  const [type, setType] = useState("Buy/Sell");
  const [state, setState] = useState("All states");
  const [assetType, setAssetType] = useState("All assets");
  const [size, setSize] = useState("All sizes");
  const states = ["All states", ...Array.from(new Set(congressTrades.map((trade) => trade.state))).sort()];
  const assetTypes = ["All assets", ...Array.from(new Set(congressTrades.map((trade) => trade.assetType))).sort()];
  const sizes = ["All sizes", ...Array.from(new Set(congressTrades.map((trade) => trade.valueRange)))];

  const rows = useMemo(() => {
    return congressTrades.filter((trade) => {
      const text = `${trade.politician} ${trade.ticker} ${trade.company} ${trade.committee} ${trade.state}`.toLowerCase();
      return (
        text.includes(query.toLowerCase()) &&
        (party === "All parties" || trade.party === party) &&
        (chamber === "All chambers" || trade.chamber === chamber) &&
        (type === "Buy/Sell" || trade.type === type) &&
        (state === "All states" || trade.state === state) &&
        (assetType === "All assets" || trade.assetType === assetType) &&
        (size === "All sizes" || trade.valueRange === size)
      );
    });
  }, [query, party, chamber, type, state, assetType, size]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-md border border-line bg-panel/70 p-4 md:grid-cols-2 xl:grid-cols-[1fr_repeat(6,150px)]">
        <SearchInput value={query} onChange={setQuery} placeholder="Politician, ticker, or company" />
        <SelectFilter label="Party" value={party} onChange={setParty} options={["All parties", "Democrat", "Republican", "Independent"]} />
        <SelectFilter label="Chamber" value={chamber} onChange={setChamber} options={["All chambers", "House", "Senate"]} />
        <SelectFilter label="Type" value={type} onChange={setType} options={["Buy/Sell", "Buy", "Sell"]} />
        <SelectFilter label="State" value={state} onChange={setState} options={states} />
        <SelectFilter label="Asset" value={assetType} onChange={setAssetType} options={assetTypes} />
        <SelectFilter label="Size" value={size} onChange={setSize} options={sizes} />
      </div>
      <SortableTable<CongressTrade>
        rows={rows}
        columns={[
          {
            key: "politician",
            header: "Politician",
            accessor: (row) => (
              <Link className="text-mint" href={`/congress/politicians/${slugify(row.politician)}`}>
                {row.politician}
              </Link>
            )
          },
          { key: "chamber", header: "Chamber", accessor: (row) => `${row.chamber} ${row.state}` },
          { key: "committee", header: "Committee", accessor: (row) => row.committee },
          {
            key: "ticker",
            header: "Ticker",
            accessor: (row) => (
              <Link className="text-mint" href={`/congress/issuers/${row.ticker}`}>
                {row.ticker}
              </Link>
            )
          },
          { key: "company", header: "Company", accessor: (row) => row.company },
          { key: "type", header: "Type", accessor: (row) => <Badge tone={row.type === "Buy" ? "mint" : "red"}>{row.type}</Badge> },
          { key: "owner", header: "Owner", accessor: (row) => row.owner },
          { key: "assetType", header: "Asset", accessor: (row) => row.assetType },
          { key: "transactionDate", header: "Transaction", accessor: (row) => row.transactionDate },
          { key: "disclosureDate", header: "Disclosure", accessor: (row) => row.disclosureDate },
          { key: "valueRange", header: "Value range", accessor: (row) => row.valueRange },
          { key: "price", header: "Price", accessor: (row) => row.price ?? "N/A", align: "right" },
          {
            key: "daysDelayed",
            header: "Days delayed",
            accessor: (row) => <Badge tone={row.daysDelayed > 45 ? "red" : row.daysDelayed > 30 ? "amber" : "slate"}>{row.daysDelayed}</Badge>,
            sortValue: (row) => row.daysDelayed,
            align: "right"
          },
          {
            key: "detail",
            header: "Detail",
            accessor: (row) => (
              <Link className="text-slate-300 hover:text-white" href={`/congress/trades/${row.id}`}>
                Open
              </Link>
            )
          }
        ]}
      />
    </div>
  );
}
