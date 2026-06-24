import type {
  CongressMember,
  CongressTrade,
  Filing,
  Fund,
  Holding,
  Insider,
  InsiderTrade,
  Investor,
  NewsItem,
  Signal,
  Stock
} from "./types";

export const funds: Fund[] = [
  { id: "berkshire", name: "Berkshire Hathaway", manager: "Warren Buffett", strategy: "Quality value and durable cash flows" },
  { id: "pershing", name: "Pershing Square", manager: "Bill Ackman", strategy: "Concentrated activist ownership" },
  { id: "appaloosa", name: "Appaloosa", manager: "David Tepper", strategy: "Opportunistic equity and credit" },
  { id: "baupost", name: "Baupost Group", manager: "Seth Klarman", strategy: "Deep value and risk control" },
  { id: "duquesne", name: "Duquesne Family Office", manager: "Stanley Druckenmiller", strategy: "Macro-driven concentrated equity" }
];

export const investors: Investor[] = [
  {
    id: "warren-buffett",
    slug: "warren-buffett",
    name: "Warren Buffett",
    firm: "Berkshire Hathaway",
    style: "Long-term value",
    portfolioValue: 312400000000,
    holdingsCount: 41,
    lastFilingDate: "2026-05-15",
    topHolding: "AAPL",
    bio: "A concentrated public equity portfolio known for durable franchises, insurance float, and long holding periods.",
    fundId: "berkshire"
  },
  {
    id: "bill-ackman",
    slug: "bill-ackman",
    name: "Bill Ackman",
    firm: "Pershing Square",
    style: "Concentrated activist",
    portfolioValue: 10400000000,
    holdingsCount: 8,
    lastFilingDate: "2026-05-14",
    topHolding: "GOOGL",
    bio: "Pershing Square typically owns a small number of large positions in high-quality companies with identifiable catalysts.",
    fundId: "pershing"
  },
  {
    id: "david-tepper",
    slug: "david-tepper",
    name: "David Tepper",
    firm: "Appaloosa",
    style: "Opportunistic macro",
    portfolioValue: 6700000000,
    holdingsCount: 31,
    lastFilingDate: "2026-05-13",
    topHolding: "NVDA",
    bio: "Appaloosa blends macro views with tactical equity allocations across technology, energy, and cyclicals.",
    fundId: "appaloosa"
  },
  {
    id: "seth-klarman",
    slug: "seth-klarman",
    name: "Seth Klarman",
    firm: "Baupost",
    style: "Deep value",
    portfolioValue: 5200000000,
    holdingsCount: 24,
    lastFilingDate: "2026-05-15",
    topHolding: "CEG",
    bio: "Baupost is associated with margin-of-safety investing, special situations, and patient capital deployment.",
    fundId: "baupost"
  },
  {
    id: "stanley-druckenmiller",
    slug: "stanley-druckenmiller",
    name: "Stanley Druckenmiller",
    firm: "Duquesne Family Office",
    style: "Macro growth",
    portfolioValue: 3900000000,
    holdingsCount: 28,
    lastFilingDate: "2026-05-14",
    topHolding: "VST",
    bio: "Duquesne uses macro research to find asymmetric themes across power, AI infrastructure, and global liquidity cycles.",
    fundId: "duquesne"
  }
];

export const filings: Filing[] = investors.map((investor) => ({
  id: `${investor.slug}-2026q1`,
  investorSlug: investor.slug,
  form: "13F-HR",
  period: "2026 Q1",
  filedAt: investor.lastFilingDate,
  source: "Mock SEC 13F filing"
}));

export const stocks: Stock[] = [
  { ticker: "VST", company: "Vistra Corp.", sector: "Utilities", pricePlaceholder: "$205.40", marketCap: "$68B", summary: "Power generation exposure tied to grid demand and data center electrification." },
  { ticker: "CEG", company: "Constellation Energy", sector: "Utilities", pricePlaceholder: "$318.10", marketCap: "$98B", summary: "Nuclear and clean power operator watched by funds seeking AI power infrastructure exposure." },
  { ticker: "NVDA", company: "NVIDIA", sector: "Technology", pricePlaceholder: "$151.60", marketCap: "$3.7T", summary: "Accelerated computing leader with strong hedge fund and insider monitoring interest." },
  { ticker: "MSFT", company: "Microsoft", sector: "Technology", pricePlaceholder: "$492.25", marketCap: "$3.6T", summary: "Cloud, enterprise software, and AI platform bellwether owned by multiple high-profile funds." },
  { ticker: "GEV", company: "GE Vernova", sector: "Industrials", pricePlaceholder: "$515.80", marketCap: "$141B", summary: "Grid equipment and power systems company tied to electrification and infrastructure spending." },
  { ticker: "AAPL", company: "Apple", sector: "Technology", pricePlaceholder: "$201.35", marketCap: "$3.0T", summary: "Consumer technology franchise and long-running institutional ownership staple." },
  { ticker: "GOOGL", company: "Alphabet", sector: "Communication Services", pricePlaceholder: "$176.20", marketCap: "$2.1T", summary: "Search, cloud, and AI platform position followed by concentrated managers." }
];

export const holdings: Holding[] = [
  { investorSlug: "warren-buffett", ticker: "AAPL", company: "Apple", shares: 300000000, marketValue: 60405000000, weight: 19.3, qoqChange: -6.5, status: "Reduced", sector: "Technology" },
  { investorSlug: "warren-buffett", ticker: "MSFT", company: "Microsoft", shares: 3400000, marketValue: 1673650000, weight: 0.5, qoqChange: 100, status: "New", sector: "Technology" },
  { investorSlug: "warren-buffett", ticker: "GEV", company: "GE Vernova", shares: 2500000, marketValue: 1289500000, weight: 0.4, qoqChange: 38.4, status: "Increased", sector: "Industrials" },
  { investorSlug: "bill-ackman", ticker: "GOOGL", company: "Alphabet", shares: 9800000, marketValue: 1726760000, weight: 16.6, qoqChange: 12.2, status: "Increased", sector: "Communication Services" },
  { investorSlug: "bill-ackman", ticker: "MSFT", company: "Microsoft", shares: 2100000, marketValue: 1033725000, weight: 9.9, qoqChange: 0, status: "Increased", sector: "Technology" },
  { investorSlug: "bill-ackman", ticker: "VST", company: "Vistra", shares: 4100000, marketValue: 842140000, weight: 8.1, qoqChange: 100, status: "New", sector: "Utilities" },
  { investorSlug: "david-tepper", ticker: "NVDA", company: "NVIDIA", shares: 12400000, marketValue: 1879840000, weight: 28.1, qoqChange: 21.7, status: "Increased", sector: "Technology" },
  { investorSlug: "david-tepper", ticker: "CEG", company: "Constellation Energy", shares: 1800000, marketValue: 572580000, weight: 8.5, qoqChange: 44.1, status: "Increased", sector: "Utilities" },
  { investorSlug: "david-tepper", ticker: "MSFT", company: "Microsoft", shares: 1100000, marketValue: 541475000, weight: 8.1, qoqChange: -9.4, status: "Reduced", sector: "Technology" },
  { investorSlug: "seth-klarman", ticker: "CEG", company: "Constellation Energy", shares: 2100000, marketValue: 667_000_000, weight: 12.8, qoqChange: 100, status: "New", sector: "Utilities" },
  { investorSlug: "seth-klarman", ticker: "GEV", company: "GE Vernova", shares: 900000, marketValue: 464220000, weight: 8.9, qoqChange: 18.6, status: "Increased", sector: "Industrials" },
  { investorSlug: "seth-klarman", ticker: "AAPL", company: "Apple", shares: 1300000, marketValue: 261755000, weight: 5, qoqChange: -100, status: "Sold", sector: "Technology" },
  { investorSlug: "stanley-druckenmiller", ticker: "VST", company: "Vistra", shares: 5300000, marketValue: 1088620000, weight: 27.9, qoqChange: 67.3, status: "Increased", sector: "Utilities" },
  { investorSlug: "stanley-druckenmiller", ticker: "NVDA", company: "NVIDIA", shares: 2600000, marketValue: 394160000, weight: 10.1, qoqChange: -14.5, status: "Reduced", sector: "Technology" },
  { investorSlug: "stanley-druckenmiller", ticker: "GEV", company: "GE Vernova", shares: 660000, marketValue: 340428000, weight: 8.7, qoqChange: 100, status: "New", sector: "Industrials" }
];

export const congressMembers: CongressMember[] = [
  { id: "nancy-pelosi", name: "Nancy Pelosi", party: "Democrat", chamber: "House", state: "CA" },
  { id: "dan-crenshaw", name: "Dan Crenshaw", party: "Republican", chamber: "House", state: "TX" },
  { id: "markwayne-mullin", name: "Markwayne Mullin", party: "Republican", chamber: "Senate", state: "OK" },
  { id: "shelley-capito", name: "Shelley Moore Capito", party: "Republican", chamber: "Senate", state: "WV" },
  { id: "debbie-wasserman-schultz", name: "Debbie Wasserman Schultz", party: "Democrat", chamber: "House", state: "FL" }
];

export const congressTrades: CongressTrade[] = [
  { id: "ct-1", politician: "Nancy Pelosi", chamber: "House", party: "Democrat", ticker: "NVDA", company: "NVIDIA", type: "Buy", transactionDate: "2026-04-12", disclosureDate: "2026-05-25", valueRange: "$500,001-$1,000,000", daysDelayed: 43, mock: true },
  { id: "ct-2", politician: "Dan Crenshaw", chamber: "House", party: "Republican", ticker: "VST", company: "Vistra", type: "Buy", transactionDate: "2026-04-28", disclosureDate: "2026-05-09", valueRange: "$15,001-$50,000", daysDelayed: 11, mock: true },
  { id: "ct-3", politician: "Markwayne Mullin", chamber: "Senate", party: "Republican", ticker: "GEV", company: "GE Vernova", type: "Buy", transactionDate: "2026-03-19", disclosureDate: "2026-05-11", valueRange: "$50,001-$100,000", daysDelayed: 53, mock: true },
  { id: "ct-4", politician: "Shelley Moore Capito", chamber: "Senate", party: "Republican", ticker: "MSFT", company: "Microsoft", type: "Sell", transactionDate: "2026-05-02", disclosureDate: "2026-05-20", valueRange: "$1,001-$15,000", daysDelayed: 18, mock: true },
  { id: "ct-5", politician: "Debbie Wasserman Schultz", chamber: "House", party: "Democrat", ticker: "CEG", company: "Constellation Energy", type: "Buy", transactionDate: "2026-04-06", disclosureDate: "2026-05-30", valueRange: "$15,001-$50,000", daysDelayed: 54, mock: true }
];

export const insiders: Insider[] = [
  { id: "ins-1", name: "James Burke", title: "Chief Financial Officer", company: "Vistra", ticker: "VST" },
  { id: "ins-2", name: "Maria Keller", title: "Director", company: "Constellation Energy", ticker: "CEG" },
  { id: "ins-3", name: "Evan Porter", title: "Chief Product Officer", company: "NVIDIA", ticker: "NVDA" },
  { id: "ins-4", name: "Alicia Reed", title: "Director", company: "GE Vernova", ticker: "GEV" },
  { id: "ins-5", name: "Thomas Nguyen", title: "Executive Vice President", company: "Microsoft", ticker: "MSFT" }
];

export const insiderTrades: InsiderTrade[] = [
  { id: "it-1", executive: "James Burke", title: "Chief Financial Officer", company: "Vistra", ticker: "VST", type: "Buy", shares: 8500, value: 1745900, filingDate: "2026-06-07", clusterId: "vst-june" },
  { id: "it-2", executive: "Nina Cross", title: "Director", company: "Vistra", ticker: "VST", type: "Buy", shares: 2100, value: 431340, filingDate: "2026-06-08", clusterId: "vst-june" },
  { id: "it-3", executive: "Maria Keller", title: "Director", company: "Constellation Energy", ticker: "CEG", type: "Buy", shares: 1200, value: 381720, filingDate: "2026-06-04" },
  { id: "it-4", executive: "Evan Porter", title: "Chief Product Officer", company: "NVIDIA", ticker: "NVDA", type: "Sell", shares: 35000, value: 5306000, filingDate: "2026-06-03" },
  { id: "it-5", executive: "Alicia Reed", title: "Director", company: "GE Vernova", ticker: "GEV", type: "Buy", shares: 1750, value: 902650, filingDate: "2026-06-12", clusterId: "gev-june" },
  { id: "it-6", executive: "Thomas Nguyen", title: "Executive Vice President", company: "Microsoft", ticker: "MSFT", type: "Sell", shares: 9000, value: 4430250, filingDate: "2026-06-10" }
];

export const signals: Signal[] = [
  { id: "sig-1", type: "New Hedge Fund Position", actor: "Bill Ackman", ticker: "VST", timestamp: "2026-06-23T14:20:00Z", explanation: "Pershing Square opened a new mock position in Vistra as power demand signals accelerated.", confidence: "High" },
  { id: "sig-2", type: "Large Portfolio Increase", actor: "Stanley Druckenmiller", ticker: "VST", timestamp: "2026-06-22T18:05:00Z", explanation: "Duquesne increased Vistra by more than 60% quarter over quarter in the mock portfolio set.", confidence: "High" },
  { id: "sig-3", type: "Congress Purchase", actor: "Nancy Pelosi", ticker: "NVDA", timestamp: "2026-06-21T10:10:00Z", explanation: "A mock House disclosure recorded a large purchase with more than 30 days between trade and disclosure.", confidence: "Watch" },
  { id: "sig-4", type: "Insider Cluster Buying", actor: "Vistra executives", ticker: "VST", timestamp: "2026-06-20T12:30:00Z", explanation: "Two mock insiders reported open-market buys within a 48-hour window.", confidence: "Medium" },
  { id: "sig-5", type: "Breaking News Related to a Holding", actor: "Energy infrastructure desk", ticker: "GEV", timestamp: "2026-06-19T09:45:00Z", explanation: "Grid equipment demand news overlapped with new positions from multiple mock fund managers.", confidence: "Medium" },
  { id: "sig-6", type: "New Hedge Fund Position", actor: "Seth Klarman", ticker: "CEG", timestamp: "2026-06-18T16:15:00Z", explanation: "Baupost initiated a mock Constellation Energy position tied to power reliability themes.", confidence: "High" }
];

export const newsItems: NewsItem[] = [
  { id: "news-1", ticker: "VST", headline: "Power producers draw investor attention as data center load forecasts rise", source: "Mock Market Wire", publishedAt: "2026-06-21", summary: "Analysts pointed to grid reliability and long-term power purchase agreements as catalysts." },
  { id: "news-2", ticker: "CEG", headline: "Nuclear generation names remain in focus after clean power contract updates", source: "Mock Energy Desk", publishedAt: "2026-06-20", summary: "Investors watched contract duration, capacity pricing, and hyperscale demand." },
  { id: "news-3", ticker: "NVDA", headline: "AI infrastructure spending keeps semiconductor ownership signals elevated", source: "Mock Tech Brief", publishedAt: "2026-06-18", summary: "Fund flows and insider sales remained active around the large-cap AI complex." },
  { id: "news-4", ticker: "GEV", headline: "Grid equipment backlog becomes a recurring institutional ownership theme", source: "Mock Industrial Review", publishedAt: "2026-06-17", summary: "The electrification cycle continued to appear in mock fund commentary and related signals." }
];

export function formatCurrency(value: number) {
  if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(1)}T`;
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  return `$${value.toLocaleString()}`;
}

export function getInvestor(slug: string) {
  return investors.find((investor) => investor.slug === slug);
}

export function getHoldingsByInvestor(slug: string) {
  return holdings.filter((holding) => holding.investorSlug === slug);
}

export function getStock(ticker: string) {
  return stocks.find((stock) => stock.ticker.toUpperCase() === ticker.toUpperCase());
}

export function getStockSignals(ticker: string) {
  return signals.filter((signal) => signal.ticker.toUpperCase() === ticker.toUpperCase());
}

export function getStockHolders(ticker: string) {
  return holdings.filter((holding) => holding.ticker.toUpperCase() === ticker.toUpperCase());
}
