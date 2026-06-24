import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, SectionHeader } from "@/components/ui/card";
import { SignalCard } from "@/components/signals/signal-card";
import { StockCongressTable, StockInsiderTable, StockOwnershipTable } from "@/components/stocks/stock-tables";
import {
  congressTrades,
  getStock,
  getStockHolders,
  getStockSignals,
  insiderTrades,
  newsItems,
  stocks
} from "@/data/mock-data";

export function generateStaticParams() {
  return stocks.map((stock) => ({ ticker: stock.ticker }));
}

export async function generateMetadata({ params }: { params: Promise<{ ticker: string }> }): Promise<Metadata> {
  const { ticker } = await params;
  const stock = getStock(ticker);
  return {
    title: stock ? `${stock.ticker} ${stock.company}` : "Stock Detail",
    description: stock ? `Ownership signals, mock 13F holders, Congress trades, insider trades, and news for ${stock.company}.` : "Stock detail"
  };
}

export default async function StockDetailPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const stock = getStock(ticker);
  if (!stock) notFound();
  const holders = getStockHolders(stock.ticker);
  const stockCongressTrades = congressTrades.filter((trade) => trade.ticker === stock.ticker);
  const stockInsiderTrades = insiderTrades.filter((trade) => trade.ticker === stock.ticker);
  const stockSignals = getStockSignals(stock.ticker);
  const stockNews = newsItems.filter((news) => news.ticker === stock.ticker);
  const tabs = ["Overview", "Hedge Fund Ownership", "Congress Trades", "Insider Trades", "Signals", "News"];

  return (
    <main className="space-y-6">
      <Card>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-semibold text-white">{stock.ticker}</h1>
              <Badge tone="blue">{stock.sector}</Badge>
            </div>
            <p className="mt-2 text-xl text-slate-200">{stock.company}</p>
            <p className="mt-4 max-w-3xl leading-7 text-slate-300">{stock.summary}</p>
          </div>
          <dl className="grid min-w-56 grid-cols-2 gap-4 rounded-md border border-line bg-ink/60 p-4 text-sm">
            <div><dt className="text-slate-500">Price</dt><dd className="mt-1 font-semibold text-white">{stock.pricePlaceholder}</dd></div>
            <div><dt className="text-slate-500">Market cap</dt><dd className="mt-1 font-semibold text-white">{stock.marketCap}</dd></div>
          </dl>
        </div>
      </Card>

      <div className="flex gap-2 overflow-x-auto rounded-md border border-line bg-panel/70 p-2 scrollbar-thin">
        {tabs.map((tab) => (
          <a key={tab} href={`#${tab.toLowerCase().replaceAll(" ", "-")}`} className="shrink-0 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-panelSoft hover:text-white">
            {tab}
          </a>
        ))}
      </div>

      <section id="overview" className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-slate-400">Tracked holders</p><p className="mt-2 text-2xl font-semibold text-white">{holders.length}</p></Card>
        <Card><p className="text-sm text-slate-400">Congress trades</p><p className="mt-2 text-2xl font-semibold text-white">{stockCongressTrades.length}</p></Card>
        <Card><p className="text-sm text-slate-400">Insider trades</p><p className="mt-2 text-2xl font-semibold text-white">{stockInsiderTrades.length}</p></Card>
        <Card><p className="text-sm text-slate-400">Signals</p><p className="mt-2 text-2xl font-semibold text-white">{stockSignals.length}</p></Card>
      </section>

      <Card id="hedge-fund-ownership">
        <SectionHeader title="Who Owns This Stock?" eyebrow="Hedge fund ownership" />
        <StockOwnershipTable rows={holders} />
      </Card>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card id="congress-trades">
          <SectionHeader title="Congress Activity Summary" eyebrow="Mock disclosures" />
          <StockCongressTable rows={stockCongressTrades} />
        </Card>
        <Card id="insider-trades">
          <SectionHeader title="Insider Activity Summary" eyebrow="Form 4 mock data" />
          <StockInsiderTable rows={stockInsiderTrades} />
        </Card>
      </section>

      <section id="signals" className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionHeader title="Related Signals" eyebrow="Signal feed" />
          <div className="space-y-3">
            {stockSignals.length > 0 ? stockSignals.map((signal) => <SignalCard key={signal.id} signal={signal} />) : <p className="text-sm text-slate-400">No mock signals for this ticker yet.</p>}
          </div>
        </Card>
        <Card id="news">
          <SectionHeader title="News" eyebrow="Holding-related mock news" />
          <div className="space-y-3">
            {stockNews.length > 0 ? stockNews.map((news) => (
              <article key={news.id} className="rounded-md bg-ink/60 p-4">
                <h3 className="font-semibold text-white">{news.headline}</h3>
                <p className="mt-1 text-xs text-slate-500">{news.source} - {news.publishedAt}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{news.summary}</p>
              </article>
            )) : <p className="text-sm text-slate-400">No mock news for this ticker yet.</p>}
          </div>
        </Card>
      </section>
    </main>
  );
}
