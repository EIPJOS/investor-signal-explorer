import { congressMembers, congressTrades, stocks } from "@/data/mock-data";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function midpointFromRange(range: string) {
  const values = range.match(/\$?([\d,]+)/g)?.map((value) => Number(value.replace(/[$,]/g, ""))) ?? [];
  if (values.length < 2) return 0;
  return (values[0] + values[1]) / 2;
}

export function getCongressSummary() {
  const volume = congressTrades.reduce((sum, trade) => sum + midpointFromRange(trade.valueRange), 0);
  return {
    trades: congressTrades.length,
    politicians: new Set(congressTrades.map((trade) => trade.politician)).size,
    issuers: new Set(congressTrades.map((trade) => trade.ticker)).size,
    volume,
    lateDisclosures: congressTrades.filter((trade) => trade.daysDelayed > 30).length
  };
}

export function getPoliticianActivity() {
  return congressMembers
    .map((member) => {
      const trades = congressTrades.filter((trade) => trade.politician === member.name);
      const volume = trades.reduce((sum, trade) => sum + midpointFromRange(trade.valueRange), 0);
      return {
        ...member,
        slug: slugify(member.name),
        trades: trades.length,
        issuers: new Set(trades.map((trade) => trade.ticker)).size,
        volume,
        lateDisclosures: trades.filter((trade) => trade.daysDelayed > 30).length,
        lastTraded: trades.sort((a, b) => b.transactionDate.localeCompare(a.transactionDate))[0]?.transactionDate ?? "N/A"
      };
    })
    .filter((member) => member.trades > 0)
    .sort((a, b) => b.volume - a.volume);
}

export function getIssuerActivity() {
  return stocks
    .map((stock) => {
      const trades = congressTrades.filter((trade) => trade.ticker === stock.ticker);
      const volume = trades.reduce((sum, trade) => sum + midpointFromRange(trade.valueRange), 0);
      return {
        ...stock,
        trades: trades.length,
        politicians: new Set(trades.map((trade) => trade.politician)).size,
        volume,
        buys: trades.filter((trade) => trade.type === "Buy").length,
        sells: trades.filter((trade) => trade.type === "Sell").length,
        lateDisclosures: trades.filter((trade) => trade.daysDelayed > 30).length,
        lastTraded: trades.sort((a, b) => b.transactionDate.localeCompare(a.transactionDate))[0]?.transactionDate ?? "N/A"
      };
    })
    .filter((issuer) => issuer.trades > 0)
    .sort((a, b) => b.trades - a.trades);
}

export function getPoliticianBySlug(slug: string) {
  return getPoliticianActivity().find((member) => member.slug === slug);
}

export function getTradesByPoliticianSlug(slug: string) {
  const member = getPoliticianBySlug(slug);
  if (!member) return [];
  return congressTrades.filter((trade) => trade.politician === member.name);
}

export function getIssuerByTicker(ticker: string) {
  return getIssuerActivity().find((issuer) => issuer.ticker.toUpperCase() === ticker.toUpperCase());
}

export function getCongressTradesByTicker(ticker: string) {
  return congressTrades.filter((trade) => trade.ticker.toUpperCase() === ticker.toUpperCase());
}

export function getCongressTrade(id: string) {
  return congressTrades.find((trade) => trade.id === id);
}

export function estimateTradeValue(valueRange: string) {
  return midpointFromRange(valueRange);
}
