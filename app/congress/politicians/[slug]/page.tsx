import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CongressDetailTradesTable } from "@/components/congress/congress-detail-tables";
import { Badge } from "@/components/ui/badge";
import { Card, SectionHeader } from "@/components/ui/card";
import {
  estimateTradeValue,
  getPoliticianActivity,
  getPoliticianBySlug,
  getTradesByPoliticianSlug
} from "@/data/congress-analytics";
import { formatCurrency } from "@/data/mock-data";

export function generateStaticParams() {
  return getPoliticianActivity().map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = getPoliticianBySlug(slug);
  return {
    title: member ? `${member.name} Congress Trading Profile` : "Congress Politician",
    description: member ? `Mock congressional trading profile for ${member.name}.` : "Congress politician profile"
  };
}

export default async function PoliticianDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getPoliticianBySlug(slug);
  if (!member) notFound();
  const trades = getTradesByPoliticianSlug(slug);
  const topIssuers = Array.from(new Set(trades.map((trade) => trade.ticker))).map((ticker) => ({
    ticker,
    trades: trades.filter((trade) => trade.ticker === ticker),
    volume: trades.filter((trade) => trade.ticker === ticker).reduce((sum, trade) => sum + estimateTradeValue(trade.valueRange), 0)
  }));

  return (
    <main className="space-y-6">
      <Card>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Badge tone={member.party === "Democrat" ? "blue" : "red"}>{member.party}</Badge>
            <h1 className="mt-4 text-3xl font-semibold text-white">{member.name}</h1>
            <p className="mt-3 text-slate-300">
              {member.chamber} member from {member.state}. Committee context: {member.committee ?? "Not specified"}.
            </p>
          </div>
          <Link href="/congress" className="rounded-md border border-line px-3 py-2 text-sm text-slate-300 hover:bg-panelSoft">
            Back to Congress
          </Link>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-slate-400">Trades</p><p className="mt-2 text-2xl font-semibold text-white">{member.trades}</p></Card>
        <Card><p className="text-sm text-slate-400">Issuers</p><p className="mt-2 text-2xl font-semibold text-white">{member.issuers}</p></Card>
        <Card><p className="text-sm text-slate-400">Est. volume</p><p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(member.volume)}</p></Card>
        <Card><p className="text-sm text-slate-400">Late disclosures</p><p className="mt-2 text-2xl font-semibold text-red-200">{member.lateDisclosures}</p></Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <SectionHeader title="Top Issuers" eyebrow="Mock disclosed activity" />
          <div className="space-y-3">
            {topIssuers.map((issuer) => (
              <Link key={issuer.ticker} href={`/congress/issuers/${issuer.ticker}`} className="flex items-center justify-between rounded-md bg-ink/60 p-3 hover:bg-panelSoft">
                <div>
                  <p className="font-semibold text-white">{issuer.ticker}</p>
                  <p className="text-sm text-slate-400">{issuer.trades.length} trades</p>
                </div>
                <Badge tone="blue">{formatCurrency(issuer.volume)}</Badge>
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Disclosure Profile" eyebrow="Delay context" />
          <p className="leading-7 text-slate-300">
            This profile highlights disclosed mock trades, estimated value ranges, owner labels, and reporting delays.
            Future live data should preserve original disclosure documents and amendment history for each row.
          </p>
        </Card>
      </section>

      <Card>
        <SectionHeader title="Trade History" eyebrow="Sortable disclosures" />
        <CongressDetailTradesTable rows={trades} />
      </Card>
    </main>
  );
}
