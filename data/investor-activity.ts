import type { Holding, PortfolioActivity, PortfolioHistorySnapshot } from "@/data/types";
import { getHoldingsByInvestor } from "@/data/mock-data";

const berkshireActivity: PortfolioActivity[] = [
  { id: "brk-q1-2026-googl", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "GOOGL", company: "Alphabet", activity: "Add", activityPercent: 203.99, shareChange: 36403656, portfolioImpact: 3.98 },
  { id: "brk-q1-2026-nyt", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "NYT", company: "New York Times Class A", activity: "Add", activityPercent: 199, shareChange: 10080791, portfolioImpact: 0.32 },
  { id: "brk-q1-2026-len", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "LEN", company: "Lennar", activity: "Add", activityPercent: 43.24, shareChange: 3048692, portfolioImpact: 0.1 },
  { id: "brk-q1-2026-lenb", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "LEN.B", company: "Lennar Class B", activity: "Add", activityPercent: 31.34, shareChange: 56723, portfolioImpact: 0 },
  { id: "brk-q1-2026-dal", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "DAL", company: "Delta Air Lines", activity: "Buy", activityPercent: 100, shareChange: 39809456, portfolioImpact: 1.01 },
  { id: "brk-q1-2026-goog", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "GOOG", company: "Alphabet Class C", activity: "Buy", activityPercent: 100, shareChange: 3585215, portfolioImpact: 0.39 },
  { id: "brk-q1-2026-m", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "M", company: "Macy's", activity: "Buy", activityPercent: 100, shareChange: 3038355, portfolioImpact: 0.02 },
  { id: "brk-q1-2026-bac", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "BAC", company: "Bank of America", activity: "Reduce", activityPercent: 0.71, shareChange: -3671769, portfolioImpact: 0.07 },
  { id: "brk-q1-2026-llyvk", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "LLYVK", company: "Liberty Media Corp. Series C Live", activity: "Reduce", activityPercent: 3.03, shareChange: -330518, portfolioImpact: 0.01 },
  { id: "brk-q1-2026-dva", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "DVA", company: "DaVita HealthCare Partners", activity: "Reduce", activityPercent: 5.22, shareChange: -1658480, portfolioImpact: 0.1 },
  { id: "brk-q1-2026-cvx", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "CVX", company: "Chevron", activity: "Reduce", activityPercent: 35.17, shareChange: -45780506, portfolioImpact: 3.6 },
  { id: "brk-q1-2026-nue", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "NUE", company: "Nucor", activity: "Reduce", activityPercent: 39.03, shareChange: -2500674, portfolioImpact: 0.16 },
  { id: "brk-q1-2026-stz", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "STZ", company: "Constellation Brands", activity: "Reduce", activityPercent: 95.13, shareChange: -12367110, portfolioImpact: 0.78 },
  { id: "brk-q1-2026-v", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "V", company: "Visa", activity: "Sell", activityPercent: 100, shareChange: -8297460, portfolioImpact: 1.06 },
  { id: "brk-q1-2026-ma", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "MA", company: "Mastercard", activity: "Sell", activityPercent: 100, shareChange: -3986648, portfolioImpact: 0.83 },
  { id: "brk-q1-2026-unh", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "UNH", company: "UnitedHealth Group", activity: "Sell", activityPercent: 100, shareChange: -5039564, portfolioImpact: 0.61 },
  { id: "brk-q1-2026-amzn", investorSlug: "warren-buffett", period: "Q1 2026", ticker: "AMZN", company: "Amazon", activity: "Sell", activityPercent: 100, shareChange: -2276000, portfolioImpact: 0.19 }
];

const berkshireHistory: PortfolioHistorySnapshot[] = [
  { id: "brk-2026-q1", investorSlug: "warren-buffett", period: "2026 Q1", portfolioValue: 263100000000, topHoldings: ["AAPL", "AXP", "KO", "BAC", "CVX", "OXY", "GOOGL", "CB", "MCO", "KHC", "DVA", "KR", "SIRI", "DAL", "VRSN", "COF", "NYT", "ALLY", "GOOG", "LLYVK"] },
  { id: "brk-2025-q4", investorSlug: "warren-buffett", period: "2025 Q4", portfolioValue: 274200000000, topHoldings: ["AAPL", "AXP", "BAC", "KO", "CVX", "MCO", "OXY", "CB", "KHC", "GOOGL", "DVA", "KR", "V", "SIRI", "MA", "VRSN", "STZ", "COF", "UNH", "DPZ"] },
  { id: "brk-2025-q3", investorSlug: "warren-buffett", period: "2025 Q3", portfolioValue: 267300000000, topHoldings: ["AAPL", "AXP", "BAC", "KO", "CVX", "OXY", "MCO", "CB", "KHC", "GOOGL", "DVA", "KR", "SIRI", "V", "VRSN", "MA", "AMZN", "STZ", "UNH", "COF"] },
  { id: "brk-2025-q2", investorSlug: "warren-buffett", period: "2025 Q2", portfolioValue: 257500000000, topHoldings: ["AAPL", "AXP", "BAC", "KO", "CVX", "MCO", "OXY", "KHC", "CB", "DVA", "VRSN", "KR", "V", "SIRI", "MA", "STZ", "AMZN", "UNH", "COF", "AON"] },
  { id: "brk-2025-q1", investorSlug: "warren-buffett", period: "2025 Q1", portfolioValue: 259800000000, topHoldings: ["AAPL", "AXP", "KO", "BAC", "CVX", "OXY", "MCO", "KHC", "CB", "DVA", "VRSN", "KR", "V", "SIRI", "STZ", "MA", "AMZN", "AON", "COF", "DPZ"] },
  { id: "brk-2024-q4", investorSlug: "warren-buffett", period: "2024 Q4", portfolioValue: 267200000000, topHoldings: ["AAPL", "AXP", "BAC", "KO", "CVX", "OXY", "MCO", "KHC", "CB", "DVA", "KR", "VRSN", "SIRI", "V", "AMZN", "MA", "AON", "COF", "STZ", "ALLY"] },
  { id: "brk-2024-q3", investorSlug: "warren-buffett", period: "2024 Q3", portfolioValue: 266400000000, topHoldings: ["AAPL", "AXP", "BAC", "KO", "CVX", "OXY", "MCO", "KHC", "CB", "DVA", "C", "KR", "SIRI", "VRSN", "V", "AMZN", "MA", "AON", "COF", "NU"] },
  { id: "brk-2024-q2", investorSlug: "warren-buffett", period: "2024 Q2", portfolioValue: 280000000000, topHoldings: ["AAPL", "BAC", "AXP", "KO", "CVX", "OXY", "KHC", "MCO", "CB", "DVA", "C", "KR", "VRSN", "V", "AMZN", "MA", "LSXMK", "NU", "COF", "AON"] }
];

function fallbackActivities(slug: string): PortfolioActivity[] {
  return getHoldingsByInvestor(slug).map((holding, index) => ({
    id: `${slug}-activity-${holding.ticker}`,
    investorSlug: slug,
    period: "Latest filing",
    ticker: holding.ticker,
    company: holding.company,
    activity: activityFromHolding(holding),
    activityPercent: Math.abs(holding.qoqChange),
    shareChange: shareChangeFromHolding(holding),
    portfolioImpact: Math.abs(holding.weight)
  }));
}

function activityFromHolding(holding: Holding): PortfolioActivity["activity"] {
  if (holding.status === "New") return "Buy";
  if (holding.status === "Sold") return "Sell";
  if (holding.status === "Reduced") return "Reduce";
  return "Add";
}

function shareChangeFromHolding(holding: Holding) {
  if (holding.status === "New") return holding.shares;
  if (holding.status === "Sold") return -holding.shares;
  if (holding.status === "Reduced") return -Math.round(holding.shares * Math.max(Math.abs(holding.qoqChange), 1) / 100);
  return Math.round(holding.shares * Math.max(Math.abs(holding.qoqChange), 1) / 100);
}

function fallbackHistory(slug: string): PortfolioHistorySnapshot[] {
  const holdings = getHoldingsByInvestor(slug).map((holding) => holding.ticker);
  return [
    { id: `${slug}-latest`, investorSlug: slug, period: "Latest", portfolioValue: getHoldingsByInvestor(slug).reduce((sum, holding) => sum + holding.marketValue, 0), topHoldings: holdings },
    { id: `${slug}-prior`, investorSlug: slug, period: "Prior", portfolioValue: getHoldingsByInvestor(slug).reduce((sum, holding) => sum + holding.marketValue * 0.94, 0), topHoldings: holdings.slice().reverse() }
  ];
}

export function getInvestorActivities(slug: string) {
  return slug === "warren-buffett" ? berkshireActivity : fallbackActivities(slug);
}

export function getInvestorHistory(slug: string) {
  return slug === "warren-buffett" ? berkshireHistory : fallbackHistory(slug);
}
