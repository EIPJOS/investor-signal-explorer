"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Bar, BarChart, XAxis, YAxis } from "recharts";
import type { Holding } from "@/data/types";

const colors = ["#45d19b", "#60a5fa", "#f7bf4f", "#ff6f7f", "#a78bfa", "#22d3ee"];

export function TopHoldingsChart({ holdings }: { holdings: Holding[] }) {
  const data = holdings
    .filter((holding) => holding.status !== "Sold")
    .sort((a, b) => b.marketValue - a.marketValue)
    .slice(0, 6)
    .map((holding) => ({ ticker: holding.ticker, value: Number((holding.marketValue / 1_000_000).toFixed(1)) }));

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -12, right: 12, top: 8 }}>
          <XAxis dataKey="ticker" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} unit="M" />
          <Tooltip
            cursor={{ fill: "rgba(69, 209, 155, 0.08)" }}
            contentStyle={{ background: "#0b1829", border: "1px solid #23364f", borderRadius: 6, color: "#e6edf7" }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#45d19b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SectorAllocationChart({ holdings }: { holdings: Holding[] }) {
  const sectorMap = holdings.reduce<Record<string, number>>((acc, holding) => {
    if (holding.status === "Sold") return acc;
    acc[holding.sector] = (acc[holding.sector] ?? 0) + holding.weight;
    return acc;
  }, {});
  const data = Object.entries(sectorMap).map(([name, value]) => ({ name, value: Number(value.toFixed(1)) }));

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={96} paddingAngle={3}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{ background: "#0b1829", border: "1px solid #23364f", borderRadius: 6, color: "#e6edf7" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
