"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MockWarning } from "@/components/ui/mock-warning";
import { SortableTable } from "@/components/ui/sortable-table";
import { holdingStatusTone } from "@/components/ui/status-tone";
import { formatCurrency } from "@/data/mock-data";
import type { Holding, PortfolioActivity, PortfolioHistorySnapshot } from "@/data/types";

type Tab = "Holdings" | "Activity" | "Buys" | "Sells" | "History";

const tabs: Tab[] = ["Holdings", "Activity", "Buys", "Sells", "History"];

function activityTone(activity: PortfolioActivity["activity"]) {
  if (activity === "Buy") return "mint";
  if (activity === "Add") return "blue";
  if (activity === "Reduce") return "rose";
  return "red";
}

function signedNumber(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toLocaleString()}`;
}

export function InvestorPortfolioWorkspace({
  holdings,
  activities,
  history
}: {
  holdings: Holding[];
  activities: PortfolioActivity[];
  history: PortfolioHistorySnapshot[];
}) {
  const [active, setActive] = useState<Tab>("Holdings");
  const filteredActivities = useMemo(() => {
    if (active === "Buys") return activities.filter((activity) => activity.activity === "Buy" || activity.activity === "Add");
    if (active === "Sells") return activities.filter((activity) => activity.activity === "Sell" || activity.activity === "Reduce");
    return activities;
  }, [active, activities]);

  return (
    <section className="rounded-md border border-line bg-panel/88 p-5 shadow-glow">
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">Portfolio workspace</p>
          <h2 className="text-xl font-semibold text-white">{active}</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-thin">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`shrink-0 rounded-md border px-3 py-2 text-sm transition ${
                active === tab
                  ? "border-mint/60 bg-mint/10 text-mint"
                  : "border-line bg-ink/70 text-slate-300 hover:bg-panelSoft hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <MockWarning compact />
      </div>

      {active === "Holdings" ? <HoldingsMode rows={holdings} /> : null}
      {active === "Activity" || active === "Buys" || active === "Sells" ? (
        <ActivityMode rows={filteredActivities} emptyLabel={active} />
      ) : null}
      {active === "History" ? <HistoryMode rows={history} /> : null}
    </section>
  );
}

function HoldingsMode({ rows }: { rows: Holding[] }) {
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
        { key: "status", header: "Status", accessor: (row) => <Badge tone={holdingStatusTone(row.status)}>{row.status}</Badge> }
      ]}
    />
  );
}

function ActivityMode({ rows, emptyLabel }: { rows: PortfolioActivity[]; emptyLabel: string }) {
  return (
    <SortableTable<PortfolioActivity>
      rows={rows}
      emptyTitle={`No ${emptyLabel.toLowerCase()} records`}
      emptyText="This mock filing period does not include matching activity rows."
      columns={[
        { key: "period", header: "Period", accessor: (row) => row.period },
        { key: "ticker", header: "Ticker", accessor: (row) => row.ticker },
        { key: "company", header: "Company", accessor: (row) => row.company },
        {
          key: "activity",
          header: "Activity",
          accessor: (row) => <Badge tone={activityTone(row.activity)}>{row.activity} {row.activityPercent.toFixed(2)}%</Badge>,
          sortValue: (row) => row.activityPercent
        },
        {
          key: "shareChange",
          header: "Share change",
          accessor: (row) => <span className={row.shareChange >= 0 ? "text-emerald-200" : "text-rose-200"}>{signedNumber(row.shareChange)}</span>,
          sortValue: (row) => row.shareChange,
          align: "right"
        },
        {
          key: "portfolioImpact",
          header: "% to portfolio",
          accessor: (row) => `${row.portfolioImpact.toFixed(2)}%`,
          sortValue: (row) => row.portfolioImpact,
          align: "right"
        }
      ]}
    />
  );
}

function HistoryMode({ rows }: { rows: PortfolioHistorySnapshot[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-line scrollbar-thin">
      <table className="min-w-full divide-y divide-line text-sm">
        <thead className="bg-ink/80">
          <tr>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-slate-300">Period</th>
            <th className="whitespace-nowrap px-4 py-3 text-right font-medium text-slate-300">Portfolio value</th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-slate-300">Top holdings history</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line bg-panel/70">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-panelSoft/60">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-white">{row.period}</td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-slate-200">{formatCurrency(row.portfolioValue)}</td>
              <td className="px-4 py-3">
                <div className="flex min-w-[48rem] flex-wrap gap-2">
                  {row.topHoldings.map((ticker, index) => (
                    <span key={`${row.id}-${ticker}-${index}`} className="rounded-md bg-ink/70 px-2 py-1 text-xs font-medium text-sky-200">
                      {ticker}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
