import { congressMembers, congressTrades, stocks } from "@/data/mock-data";

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
        trades: trades.length,
        issuers: new Set(trades.map((trade) => trade.ticker)).size,
        volume,
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
        lastTraded: trades.sort((a, b) => b.transactionDate.localeCompare(a.transactionDate))[0]?.transactionDate ?? "N/A"
      };
    })
    .filter((issuer) => issuer.trades > 0)
    .sort((a, b) => b.trades - a.trades);
}
