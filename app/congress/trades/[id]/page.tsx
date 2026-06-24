import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, SectionHeader } from "@/components/ui/card";
import { MockWarning } from "@/components/ui/mock-warning";
import { estimateTradeValue, getCongressTrade, slugify } from "@/data/congress-analytics";
import { congressTrades, formatCurrency } from "@/data/mock-data";

export function generateStaticParams() {
  return congressTrades.map((trade) => ({ id: trade.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const trade = getCongressTrade(id);
  return {
    title: trade ? `${trade.politician} ${trade.ticker} Trade` : "Congress Trade",
    description: trade ? `Mock ${trade.type.toLowerCase()} disclosure for ${trade.ticker} by ${trade.politician}.` : "Congress trade detail"
  };
}

export default async function TradeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trade = getCongressTrade(id);
  if (!trade) notFound();
  const estimatedValue = estimateTradeValue(trade.valueRange);

  return (
    <main className="space-y-6">
      <MockWarning />
      <Card>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Badge tone={trade.type === "Buy" ? "mint" : "red"}>{trade.type}</Badge>
            <h1 className="mt-4 text-3xl font-semibold text-white">{trade.politician} disclosed {trade.ticker}</h1>
            <p className="mt-3 text-slate-300">
              {trade.company} - {trade.assetType} - {trade.owner} owner label - {trade.valueRange}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/congress/politicians/${slugify(trade.politician)}`} className="rounded-md border border-line px-3 py-2 text-sm text-slate-300 hover:bg-panelSoft">
              Politician
            </Link>
            <Link href={`/congress/issuers/${trade.ticker}`} className="rounded-md border border-line px-3 py-2 text-sm text-slate-300 hover:bg-panelSoft">
              Issuer
            </Link>
            <Link href={`/stocks/${trade.ticker}`} className="rounded-md border border-line px-3 py-2 text-sm text-slate-300 hover:bg-panelSoft">
              Stock page
            </Link>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-slate-400">Estimated midpoint</p><p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(estimatedValue)}</p></Card>
        <Card><p className="text-sm text-slate-400">Traded</p><p className="mt-2 text-2xl font-semibold text-white">{trade.transactionDate}</p></Card>
        <Card><p className="text-sm text-slate-400">Disclosed</p><p className="mt-2 text-2xl font-semibold text-white">{trade.disclosureDate}</p></Card>
        <Card><p className="text-sm text-slate-400">Filed after</p><p className="mt-2 text-2xl font-semibold text-red-200">{trade.daysDelayed} days</p></Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionHeader title="Disclosure Details" eyebrow="Mock public record" />
          <dl className="grid gap-4 text-sm">
            <div><dt className="text-slate-500">Chamber</dt><dd className="text-slate-200">{trade.chamber}</dd></div>
            <div><dt className="text-slate-500">State</dt><dd className="text-slate-200">{trade.state}</dd></div>
            <div><dt className="text-slate-500">Party</dt><dd className="text-slate-200">{trade.party}</dd></div>
            <div><dt className="text-slate-500">Committee context</dt><dd className="text-slate-200">{trade.committee}</dd></div>
            <div><dt className="text-slate-500">Price placeholder</dt><dd className="text-slate-200">{trade.price ?? "N/A"}</dd></div>
          </dl>
        </Card>
        <Card>
          <SectionHeader title="Source Notes" eyebrow="Not investment advice" />
          <p className="leading-7 text-slate-300">
            This is mock data shaped like a public disclosure record. Live records should include a source URL, raw disclosure text, amendment status, and a normalized ticker mapping explanation.
          </p>
        </Card>
      </section>
    </main>
  );
}
