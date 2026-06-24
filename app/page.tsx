import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Clock, Landmark, ShieldAlert, TrendingUp, UserRoundCheck } from "lucide-react";
import { AdSlot } from "@/components/dashboard/ad-slot";
import { GlobalSearch } from "@/components/dashboard/global-search";
import { PortfolioUpdateTape } from "@/components/dashboard/portfolio-update-tape";
import { SignalCard } from "@/components/signals/signal-card";
import { Badge } from "@/components/ui/badge";
import { Card, SectionHeader } from "@/components/ui/card";
import { formatCurrency, investors, signals, stocks } from "@/data/mock-data";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Explore famous investor portfolios, 13F changes, Congress trades, insider buying, and ownership signals."
};

const marketCards = [
  { title: "New 13F positions", value: "12", note: "Across tracked funds", icon: ShieldAlert },
  { title: "Largest hedge fund increases", value: "+67%", note: "Duquesne in VST", icon: TrendingUp },
  { title: "Recent Congress purchases", value: "4", note: "Mock disclosures this month", icon: Landmark },
  { title: "Recent insider buying", value: "$3.5M", note: "Open-market purchases", icon: UserRoundCheck }
];

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div>
          <Badge tone="mint">Public research dashboard</Badge>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Investina
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Track superinvestors, insiders, and political trades in one research dashboard.
            Explore mock 13F portfolios, congressional trades, insider transactions, ownership changes, and related news in one workspace.
          </p>
          <div className="mt-7 max-w-2xl">
            <GlobalSearch />
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
            <Clock size={16} className="text-amberSignal" />
            Data can have reporting delays and may be amended after initial disclosure.
          </p>
        </div>
        <Card>
          <SectionHeader title="Latest Signals Feed" eyebrow="Live mock stream" />
          <div className="space-y-3">
            {signals.slice(0, 3).map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {marketCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">{item.title}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
                </div>
                <span className="rounded-md bg-mint/10 p-2 text-mint">
                  <Icon size={20} />
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-400">{item.note}</p>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1fr_11rem]">
        <PortfolioUpdateTape />
        <div className="hidden space-y-4 2xl:block">
          <AdSlot label="Future ad slot — disabled" />
          <AdSlot label="Future sponsor slot — disabled" />
          <AdSlot label="Future research promo — disabled" />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <SectionHeader title="Featured Investors" eyebrow="Famous portfolios" action={<Link className="text-sm text-mint" href="/investors">View all</Link>} />
          <div className="grid gap-3 md:grid-cols-2">
            {investors.slice(0, 4).map((investor) => (
              <Link key={investor.slug} href={`/investors/${investor.slug}`} className="rounded-md border border-line bg-ink/55 p-4 transition hover:border-mint/60">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{investor.name}</h3>
                    <p className="text-sm text-slate-400">{investor.firm}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-500" />
                </div>
                <p className="mt-3 text-sm text-slate-300">{formatCurrency(investor.portfolioValue)} portfolio</p>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Trending Stocks" eyebrow="Ownership activity" />
          <div className="space-y-3">
            {stocks.slice(0, 5).map((stock) => (
              <Link key={stock.ticker} href={`/stocks/${stock.ticker}`} className="flex items-center justify-between rounded-md bg-ink/55 p-3 transition hover:bg-panelSoft">
                <div>
                  <p className="font-semibold text-white">{stock.ticker}</p>
                  <p className="text-sm text-slate-400">{stock.company}</p>
                </div>
                <Badge tone="blue">{stock.sector}</Badge>
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}
