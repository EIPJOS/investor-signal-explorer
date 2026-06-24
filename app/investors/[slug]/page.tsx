import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorAllocationChart, TopHoldingsChart } from "@/components/charts/portfolio-charts";
import { HoldingsTable } from "@/components/investors/holdings-table";
import { SignalCard } from "@/components/signals/signal-card";
import { Badge } from "@/components/ui/badge";
import { Card, SectionHeader } from "@/components/ui/card";
import { holdingStatusTone } from "@/components/ui/status-tone";
import { filings, formatCurrency, getHoldingsByInvestor, getInvestor, signals } from "@/data/mock-data";

export function generateStaticParams() {
  return ["warren-buffett", "bill-ackman", "david-tepper", "seth-klarman", "stanley-druckenmiller"].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const investor = getInvestor(slug);
  return {
    title: investor ? `${investor.name}` : "Investor Detail",
    description: investor ? `Mock 13F holdings and ownership signals for ${investor.name}.` : "Investor detail"
  };
}

export default async function InvestorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const investor = getInvestor(slug);
  if (!investor) notFound();
  const investorHoldings = getHoldingsByInvestor(slug);
  const filing = filings.find((item) => item.investorSlug === slug);
  const relatedSignals = signals.filter((signal) => investorHoldings.some((holding) => holding.ticker === signal.ticker)).slice(0, 3);

  return (
    <main className="space-y-6">
      <Card>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Badge tone="mint">{investor.firm}</Badge>
            <h1 className="mt-4 text-3xl font-semibold text-white">{investor.name}</h1>
            <p className="mt-3 max-w-3xl text-slate-300">{investor.bio}</p>
          </div>
          <div className="rounded-md border border-line bg-ink/60 p-4 text-sm text-slate-300">
            <p>Data source: {filing?.source}</p>
            <p className="mt-1">Filing date: {filing?.filedAt}</p>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        <Card><p className="text-sm text-slate-400">Portfolio value</p><p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(investor.portfolioValue)}</p></Card>
        <Card><p className="text-sm text-slate-400">Holdings</p><p className="mt-2 text-2xl font-semibold text-white">{investor.holdingsCount}</p></Card>
        <Card><p className="text-sm text-slate-400">Top holding</p><p className="mt-2 text-2xl font-semibold text-white">{investor.topHolding}</p></Card>
      </section>

      <Card>
        <SectionHeader title="Holdings" eyebrow="Sortable table" />
        <HoldingsTable rows={investorHoldings} />
      </Card>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card><SectionHeader title="Top Holdings" eyebrow="Market value" /><TopHoldingsChart holdings={investorHoldings} /></Card>
        <Card><SectionHeader title="Sector Allocation" eyebrow="Portfolio weight" /><SectorAllocationChart holdings={investorHoldings} /></Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionHeader title="Recent Portfolio Changes" eyebrow="Quarter over quarter" />
          <div className="space-y-3">
            {investorHoldings.map((holding) => (
              <div key={holding.ticker} className="flex items-center justify-between rounded-md bg-ink/60 p-3 text-sm">
                <span className="text-slate-200">{holding.ticker} {holding.status.toLowerCase()}</span>
                <Badge tone={holdingStatusTone(holding.status)}>{holding.qoqChange}%</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Related Signals" eyebrow="Cross-source overlap" />
          <div className="space-y-3">
            {relatedSignals.map((signal) => <SignalCard key={signal.id} signal={signal} />)}
          </div>
        </Card>
      </section>
      <p className="text-sm text-slate-500">This mock filing view is for educational research. 13F filings may be delayed, incomplete, or amended.</p>
    </main>
  );
}
