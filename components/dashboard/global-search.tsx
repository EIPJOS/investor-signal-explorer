"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { congressMembers, investors, stocks } from "@/data/mock-data";
import { slugify } from "@/data/congress-analytics";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return [
      ...stocks.map((stock) => ({ label: `${stock.ticker} - ${stock.company}`, href: `/stocks/${stock.ticker}`, type: "Stock" })),
      ...investors.map((investor) => ({ label: `${investor.name} - ${investor.firm}`, href: `/investors/${investor.slug}`, type: "Investor" })),
      ...congressMembers.map((member) => ({ label: `${member.name} - ${member.chamber}`, href: `/congress/politicians/${slugify(member.name)}`, type: "Policymaker" }))
    ]
      .filter((item) => item.label.toLowerCase().includes(normalizedQuery))
      .slice(0, 6);
  }, [normalizedQuery]);

  return (
    <div className="relative">
      <label className="flex items-center gap-3 rounded-md border border-line bg-ink/80 px-4 py-3 text-slate-400">
        <Search size={18} />
        <input
          type="search"
          aria-label="Search ticker, investor, or politician"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search ticker, investor, or politician"
          className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-500"
        />
      </label>
      {results.length > 0 ? (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-md border border-line bg-panel shadow-glow">
          {results.map((result) => (
            <Link key={`${result.type}-${result.label}`} href={result.href} className="flex items-center justify-between px-4 py-3 text-sm hover:bg-panelSoft">
              <span className="text-white">{result.label}</span>
              <span className="text-xs text-slate-400">{result.type}</span>
            </Link>
          ))}
        </div>
      ) : null}
      {normalizedQuery && results.length === 0 ? (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-md border border-line bg-panel px-4 py-3 text-sm text-slate-400 shadow-glow">
          No matching stock, investor, or politician.
        </div>
      ) : null}
    </div>
  );
}
