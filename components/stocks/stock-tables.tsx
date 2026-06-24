"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MockWarning } from "@/components/ui/mock-warning";
import { holdingStatusTone } from "@/components/ui/status-tone";
import { SortableTable } from "@/components/ui/sortable-table";
import { formatCurrency, investors } from "@/data/mock-data";
import type { CongressTrade, Holding, InsiderTrade } from "@/data/types";

export function StockOwnershipTable({ rows }: { rows: Holding[] }) {
  return (
    <div className="space-y-4">
      <MockWarning compact />
      <SortableTable<Holding>
        rows={rows}
        columns={[
          {
            key: "investorSlug",
            header: "Investor",
            accessor: (row) => {
              const investor = investors.find((item) => item.slug === row.investorSlug);
              return investor ? <Link className="text-mint" href={`/investors/${investor.slug}`}>{investor.name}</Link> : row.investorSlug;
            }
          },
          { key: "company", header: "Company", accessor: (row) => row.company },
          { key: "shares", header: "Shares", accessor: (row) => row.shares.toLocaleString(), sortValue: (row) => row.shares, align: "right" },
          { key: "marketValue", header: "Market value", accessor: (row) => formatCurrency(row.marketValue), sortValue: (row) => row.marketValue, align: "right" },
          { key: "weight", header: "Weight", accessor: (row) => `${row.weight}%`, sortValue: (row) => row.weight, align: "right" },
          { key: "status", header: "Status", accessor: (row) => <Badge tone={holdingStatusTone(row.status)}>{row.status}</Badge> }
        ]}
      />
    </div>
  );
}

export function StockCongressTable({ rows }: { rows: CongressTrade[] }) {
  return (
    <div className="space-y-4">
      <MockWarning compact />
      <SortableTable<CongressTrade>
        rows={rows}
        emptyTitle="No Congress trades"
        emptyText="No mock Congress disclosures are attached to this ticker."
        columns={[
          { key: "politician", header: "Politician", accessor: (row) => row.politician },
          { key: "type", header: "Type", accessor: (row) => <Badge tone={row.type === "Buy" ? "mint" : "red"}>{row.type}</Badge> },
          { key: "transactionDate", header: "Transaction", accessor: (row) => row.transactionDate },
          { key: "daysDelayed", header: "Delay", accessor: (row) => row.daysDelayed, sortValue: (row) => row.daysDelayed, align: "right" }
        ]}
      />
    </div>
  );
}

export function StockInsiderTable({ rows }: { rows: InsiderTrade[] }) {
  return (
    <div className="space-y-4">
      <MockWarning compact />
      <SortableTable<InsiderTrade>
        rows={rows}
        emptyTitle="No insider trades"
        emptyText="No mock insider trades are attached to this ticker."
        columns={[
          { key: "executive", header: "Executive", accessor: (row) => row.executive },
          { key: "type", header: "Type", accessor: (row) => <Badge tone={row.type === "Buy" ? "mint" : "red"}>{row.type}</Badge> },
          { key: "shares", header: "Shares", accessor: (row) => row.shares.toLocaleString(), sortValue: (row) => row.shares, align: "right" },
          { key: "value", header: "Value", accessor: (row) => formatCurrency(row.value), sortValue: (row) => row.value, align: "right" }
        ]}
      />
    </div>
  );
}
