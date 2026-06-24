"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SearchInput, SelectFilter } from "@/components/ui/filter-controls";
import { SortableTable } from "@/components/ui/sortable-table";
import { congressTrades } from "@/data/mock-data";
import type { CongressTrade } from "@/data/types";

export function CongressTradesBrowser() {
  const [query, setQuery] = useState("");
  const [party, setParty] = useState("All parties");
  const [chamber, setChamber] = useState("All chambers");
  const [type, setType] = useState("Buy/Sell");

  const rows = useMemo(() => {
    return congressTrades.filter((trade) => {
      const text = `${trade.politician} ${trade.ticker} ${trade.company}`.toLowerCase();
      return (
        text.includes(query.toLowerCase()) &&
        (party === "All parties" || trade.party === party) &&
        (chamber === "All chambers" || trade.chamber === chamber) &&
        (type === "Buy/Sell" || trade.type === type)
      );
    });
  }, [query, party, chamber, type]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-md border border-line bg-panel/70 p-4 md:grid-cols-[1fr_repeat(3,180px)]">
        <SearchInput value={query} onChange={setQuery} placeholder="Politician, ticker, or company" />
        <SelectFilter label="Party" value={party} onChange={setParty} options={["All parties", "Democrat", "Republican", "Independent"]} />
        <SelectFilter label="Chamber" value={chamber} onChange={setChamber} options={["All chambers", "House", "Senate"]} />
        <SelectFilter label="Type" value={type} onChange={setType} options={["Buy/Sell", "Buy", "Sell"]} />
      </div>
      <SortableTable<CongressTrade>
        rows={rows}
        columns={[
          { key: "politician", header: "Politician", accessor: (row) => row.politician },
          { key: "chamber", header: "Chamber", accessor: (row) => row.chamber },
          { key: "ticker", header: "Ticker", accessor: (row) => row.ticker },
          { key: "company", header: "Company", accessor: (row) => row.company },
          { key: "type", header: "Type", accessor: (row) => <Badge tone={row.type === "Buy" ? "mint" : "red"}>{row.type}</Badge> },
          { key: "transactionDate", header: "Transaction", accessor: (row) => row.transactionDate },
          { key: "disclosureDate", header: "Disclosure", accessor: (row) => row.disclosureDate },
          { key: "valueRange", header: "Value range", accessor: (row) => row.valueRange },
          {
            key: "daysDelayed",
            header: "Days delayed",
            accessor: (row) => <Badge tone={row.daysDelayed > 45 ? "red" : row.daysDelayed > 30 ? "amber" : "slate"}>{row.daysDelayed}</Badge>,
            sortValue: (row) => row.daysDelayed,
            align: "right"
          }
        ]}
      />
    </div>
  );
}
