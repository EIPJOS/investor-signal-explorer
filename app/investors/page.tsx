import type { Metadata } from "next";
import { InvestorBrowser } from "@/components/investors/investor-browser";

export const metadata: Metadata = {
  title: "Famous Investors",
  description: "Search mock 13F profiles for Warren Buffett, Bill Ackman, David Tepper, Seth Klarman, and Stanley Druckenmiller."
};

export default function InvestorsPage() {
  return (
    <main className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">13F portfolio research</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Famous Investors</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Search managers, compare filing dates, and inspect mock public-equity holdings built for future SEC 13F ingestion.
        </p>
      </div>
      <InvestorBrowser />
    </main>
  );
}
