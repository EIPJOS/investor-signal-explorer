import type { Metadata } from "next";
import { CongressTradesBrowser } from "@/components/congress/congress-trades-browser";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Congress Trades",
  description: "Filter mock House and Senate stock disclosures by politician, ticker, party, chamber, transaction type, and delay."
};

export default function CongressPage() {
  return (
    <main className="space-y-6">
      <div>
        <Badge tone="amber">Mock data clearly labeled</Badge>
        <h1 className="mt-3 text-3xl font-semibold text-white">Congress Trades</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Explore sample congressional stock disclosures with delay highlighting. This first version does not scrape House or Senate records.
        </p>
      </div>
      <CongressTradesBrowser />
    </main>
  );
}
