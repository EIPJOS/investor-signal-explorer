import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CongressDetailTradesTable } from "@/components/congress/congress-detail-tables";
import { Badge } from "@/components/ui/badge";
import { Card, SectionHeader } from "@/components/ui/card";
import { MockWarning } from "@/components/ui/mock-warning";
import {
  estimateTradeValue,
  getCongressTradesByTicker,
  getIssuerActivity,
  getIssuerByTicker,
  slugify
} from "@/data/congress-analytics";
import { formatCurrency } from "@/data/mock-data";

export function generateStaticParams() {
  return getIssuerActivity().map((issuer) => ({ ticker: issuer.ticker }));
}

export async function generateMetadata({ params }: { params: Promise<{ ticker: string }> }): Promise<Metadata> {
  const { ticker } = await params;
  const issuer = getIssuerByTicker(ticker);
  return {
    title: issuer ? `${issuer.ticker} Congress Issuer Activity` : "Congress Issuer",
    description: issuer ? `Mock congressional disclosure activity for ${issuer.company}.` : "Congress issuer activity"
  };
}

export default async function IssuerDetailPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const issuer = getIssuerByTicker(ticker);
  if (!issuer) notFound();
  const trades = getCongressTradesByTicker(ticker);
  const politicians = Array.from(new Set(trades.map((trade) => trade.politician))).map((name) => ({
    name,
    trades: trades.filter((trade) => trade.politician === name),
    volume: trades.filter((trade) => trade.politician === name).reduce((sum, trade) => sum + estimateTradeValue(trade.valueRange), 0)
  }));

  return (
    <main className="space-y-6">
      <MockWarning />
      <Card>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-semibold text-white">{issuer.ticker}</h1>
              <Badge tone="blue">{issuer.sector}</Badge>
            </div>
            <p className="mt-2 text-xl text-slate-200">{issuer.company}</p>
            <p className="mt-4 max-w-3xl text-slate-300">{issuer.summary}</p>
          </div>
          <Link href={`/stocks/${issuer.ticker}`} className="rounded-md border border-line px-3 py-2 text-sm text-slate-300 hover:bg-panelSoft">
            Open stock page
          </Link>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-5">
        <Card><p className="text-sm text-slate-400">Trades</p><p className="mt-2 text-2xl font-semibold text-white">{issuer.trades}</p></Card>
        <Card><p className="text-sm text-slate-400">Politicians</p><p className="mt-2 text-2xl font-semibold text-white">{issuer.politicians}</p></Card>
        <Card><p className="text-sm text-slate-400">Buys</p><p className="mt-2 text-2xl font-semibold text-mint">{issuer.buys}</p></Card>
        <Card><p className="text-sm text-slate-400">Sells</p><p className="mt-2 text-2xl font-semibold text-red-200">{issuer.sells}</p></Card>
        <Card><p className="text-sm text-slate-400">Est. volume</p><p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(issuer.volume)}</p></Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <SectionHeader title="Active Politicians" eyebrow="Issuer overlap" />
          <div className="space-y-3">
            {politicians.map((politician) => (
              <Link key={politician.name} href={`/congress/politicians/${slugify(politician.name)}`} className="flex items-center justify-between rounded-md bg-ink/60 p-3 hover:bg-panelSoft">
                <div>
                  <p className="font-semibold text-white">{politician.name}</p>
                  <p className="text-sm text-slate-400">{politician.trades.length} trades</p>
                </div>
                <Badge tone="blue">{formatCurrency(politician.volume)}</Badge>
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Issuer Read" eyebrow="Research context" />
          <p className="leading-7 text-slate-300">
            This view focuses on policymaker activity around one issuer. In the live-data version, asset names and ticker mappings should retain raw disclosure text so ambiguous assets can be reviewed.
          </p>
        </Card>
      </section>

      <Card>
        <SectionHeader title="Issuer Trade History" eyebrow="Sortable disclosures" />
        <CongressDetailTradesTable rows={trades} />
      </Card>
    </main>
  );
}
