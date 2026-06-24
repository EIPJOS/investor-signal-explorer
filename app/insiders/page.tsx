import type { Metadata } from "next";
import { InsiderTradesBrowser } from "@/components/insiders/insider-trades-browser";

export const metadata: Metadata = {
  title: "Insider Trades",
  description: "Search mock Form 4 insider transactions, cluster buying, and largest insider purchases."
};

export default function InsidersPage() {
  return (
    <main className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">Form 4 activity</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Insider Trades</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Filter executive transactions and inspect mock cluster buying patterns designed for future SEC Form 4 imports.
        </p>
      </div>
      <InsiderTradesBrowser />
    </main>
  );
}
