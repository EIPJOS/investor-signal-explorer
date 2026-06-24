"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SortableTable } from "@/components/ui/sortable-table";
import { slugify } from "@/data/congress-analytics";
import type { CongressTrade } from "@/data/types";

export function CongressDetailTradesTable({ rows }: { rows: CongressTrade[] }) {
  return (
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
        {
          key: "ticker",
          header: "Issuer",
          accessor: (row) => (
            <Link className="text-mint" href={`/congress/issuers/${row.ticker}`}>
              {row.ticker}
            </Link>
          )
        },
        { key: "company", header: "Company", accessor: (row) => row.company },
        { key: "type", header: "Type", accessor: (row) => <Badge tone={row.type === "Buy" ? "mint" : "red"}>{row.type}</Badge> },
        { key: "owner", header: "Owner", accessor: (row) => row.owner },
        { key: "valueRange", header: "Size", accessor: (row) => row.valueRange },
        { key: "transactionDate", header: "Traded", accessor: (row) => row.transactionDate },
        { key: "disclosureDate", header: "Disclosed", accessor: (row) => row.disclosureDate },
        {
          key: "daysDelayed",
          header: "Delay",
          accessor: (row) => <Badge tone={row.daysDelayed > 45 ? "red" : row.daysDelayed > 30 ? "amber" : "slate"}>{row.daysDelayed} days</Badge>,
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
  );
}
