import { congressTrades, getStock, holdings, insiderTrades, newsItems, signals, stocks } from "@/data/mock-data";

export function getRelatedStocks(ticker: string) {
  const stock = getStock(ticker);
  if (!stock) return [];

  const sameSector = stocks.filter((item) => item.sector === stock.sector && item.ticker !== stock.ticker);
  const signalTickers = signals
    .filter((signal) => signal.ticker !== stock.ticker)
    .map((signal) => signal.ticker);
  const ownershipOverlap = holdings
    .filter((holding) => holding.ticker !== stock.ticker && holdings.some((peer) => peer.ticker === stock.ticker && peer.investorSlug === holding.investorSlug))
    .map((holding) => holding.ticker);

  return Array.from(new Set([...sameSector.map((item) => item.ticker), ...signalTickers, ...ownershipOverlap]))
    .map((symbol) => getStock(symbol))
    .filter((item): item is NonNullable<ReturnType<typeof getStock>> => Boolean(item))
    .slice(0, 6);
}

export function getTickerResearchQuestions(ticker: string) {
  const stock = getStock(ticker);
  const holders = holdings.filter((holding) => holding.ticker === ticker);
  const tickerSignals = signals.filter((signal) => signal.ticker === ticker);
  const congressCount = congressTrades.filter((trade) => trade.ticker === ticker).length;
  const insiderCount = insiderTrades.filter((trade) => trade.ticker === ticker).length;
  const newsCount = newsItems.filter((news) => news.ticker === ticker).length;
  const ownerNames = holders.map((holding) => holding.investorSlug).join(", ");

  if (!stock) return [];

  return [
    {
      question: `Which tracked superinvestors own ${ticker}?`,
      answer: holders.length
        ? `${ticker} appears in ${holders.length} tracked mock 13F portfolio${holders.length === 1 ? "" : "s"}: ${ownerNames}.`
        : `${ticker} does not currently appear in a tracked mock 13F portfolio.`
    },
    {
      question: `Why is ${ticker} being watched on Investina?`,
      answer: tickerSignals.length
        ? `${ticker} has ${tickerSignals.length} related signal${tickerSignals.length === 1 ? "" : "s"}, including ${tickerSignals[0].type.toLowerCase()} activity.`
        : `${ticker} is included in the research universe because it has ownership, Congress, insider, or contextual news coverage.`
    },
    {
      question: `Does ${ticker} have Congress or insider activity?`,
      answer: `${ticker} currently has ${congressCount} mock Congress disclosure${congressCount === 1 ? "" : "s"} and ${insiderCount} mock insider transaction${insiderCount === 1 ? "" : "s"} in this sample dataset.`
    },
    {
      question: `How fresh is ${ticker} data?`,
      answer: `13F ownership should be read as a delayed portfolio snapshot. Faster context may come from Form 4 insider filings, Schedule 13D or 13G beneficial ownership filings, Congress disclosures, and company news. This page includes ${newsCount} mock news item${newsCount === 1 ? "" : "s"}.`
    }
  ];
}
