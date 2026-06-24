"use client";

import { Badge } from "@/components/ui/badge";
import { SortableTable } from "@/components/ui/sortable-table";
import { formatCurrency } from "@/data/mock-data";
import type { Holding } from "@/data/types";

export function HoldingsTable({ rows }: { rows: Holding[] }) {
  return (
    <SortableTable<Holding>
      rows={rows}
      columns={[
        { key: "ticker", header: "Ticker", accessor: (row) => row.ticker },
        { key: "company", header: "Company", accessor: (row) => row.company },
        { key: "shares", header: "Shares", accessor: (row) => row.shares.toLocaleString(), sortValue: (row) => row.shares, align: "right" },
        { key: "marketValue", header: "Market value", accessor: (row) => formatCurrency(row.marketValue), sortValue: (row) => row.marketValue, align: "right" },
        { key: "weight", header: "Weight", accessor: (row) => `${row.weight}%`, sortValue: (row) => row.weight, align: "right" },
        { key: "qoqChange", header: "QoQ change", accessor: (row) => `${row.qoqChange}%`, sortValue: (row) => row.qoqChange, align: "right" },
        { key: "status", header: "Status", accessor: (row) => <Badge tone={row.status === "New" ? "mint" : row.status === "Sold" ? "red" : "amber"}>{row.status}</Badge> }
      ]}
    />
  );
}
