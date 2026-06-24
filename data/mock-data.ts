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
    portfolioValue: 263095705000,
    holdingsCount: 29,
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
    portfolioValue: 13700000000,
    holdingsCount: 11,
    lastFilingDate: "2026-05-15",
    topHolding: "BN",
    bio: "Pershing Square typically owns a small number of large positions in high-quality companies with identifiable catalysts.",
    fundId: "pershing"
  },
  {
    id: "david-tepper",
    slug: "david-tepper",
    name: "David Tepper",
    firm: "Appaloosa",
    style: "Opportunistic macro",
    portfolioValue: 5930000000,
    holdingsCount: 31,
    lastFilingDate: "2026-05-15",
    topHolding: "AMZN",
    bio: "Appaloosa blends macro views with tactical equity allocations across technology, energy, and cyclicals.",
    fundId: "appaloosa"
  },
  {
    id: "seth-klarman",
    slug: "seth-klarman",
    name: "Seth Klarman",
    firm: "Baupost",
    style: "Deep value",
    portfolioValue: 5120000000,
    holdingsCount: 22,
    lastFilingDate: "2026-05-15",
    topHolding: "AMZN",
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
    lastFilingDate: "2026-02-17",
    topHolding: "NTRA",
    bio: "Duquesne uses macro research to find asymmetric themes across power, AI infrastructure, and global liquidity cycles.",
    fundId: "duquesne"
  }
];

export const filings: Filing[] = investors.map((investor) => ({
  id: `${investor.slug}-2026q1`,
  investorSlug: investor.slug,
  form: "13F-HR",
  period: investor.slug === "stanley-druckenmiller" ? "2025 Q4" : "2026 Q1",
  filedAt: investor.lastFilingDate,
  source: investor.slug === "stanley-druckenmiller"
    ? "Mock-normalized public 13F summary; Dataroma manager page not available"
    : "Mock-normalized SEC 13F row set cross-checked against public summaries"
}));

export const stocks: Stock[] = [
  { ticker: "VST", company: "Vistra Corp.", sector: "Utilities", pricePlaceholder: "$205.40", marketCap: "$68B", summary: "Power generation exposure tied to grid demand and data center electrification." },
  { ticker: "CEG", company: "Constellation Energy", sector: "Utilities", pricePlaceholder: "$318.10", marketCap: "$98B", summary: "Nuclear and clean power operator watched by funds seeking AI power infrastructure exposure." },
  { ticker: "NVDA", company: "NVIDIA", sector: "Technology", pricePlaceholder: "$151.60", marketCap: "$3.7T", summary: "Accelerated computing leader with strong hedge fund and insider monitoring interest." },
  { ticker: "MSFT", company: "Microsoft", sector: "Technology", pricePlaceholder: "$492.25", marketCap: "$3.6T", summary: "Cloud, enterprise software, and AI platform bellwether owned by multiple high-profile funds." },
  { ticker: "GEV", company: "GE Vernova", sector: "Industrials", pricePlaceholder: "$515.80", marketCap: "$141B", summary: "Grid equipment and power systems company tied to electrification and infrastructure spending." },
  { ticker: "AAPL", company: "Apple", sector: "Technology", pricePlaceholder: "$201.35", marketCap: "$3.0T", summary: "Consumer technology franchise and long-running institutional ownership staple." },
  { ticker: "GOOGL", company: "Alphabet", sector: "Communication Services", pricePlaceholder: "$176.20", marketCap: "$2.1T", summary: "Search, cloud, and AI platform position followed by concentrated managers." },
  { ticker: "GOOG", company: "Alphabet Class C", sector: "Communication Services", pricePlaceholder: "$176.10", marketCap: "$2.1T", summary: "Alphabet Class C shares are a recurring large-cap technology holding across public 13F summaries." },
  { ticker: "AXP", company: "American Express", sector: "Financials", pricePlaceholder: "$302.48", marketCap: "$210B", summary: "Long-running Berkshire position and payments network compounder." },
  { ticker: "KO", company: "Coca-Cola", sector: "Consumer Staples", pricePlaceholder: "$76.05", marketCap: "$327B", summary: "Consumer staples franchise and one of Berkshire's longest-held public positions." },
  { ticker: "BAC", company: "Bank of America", sector: "Financials", pricePlaceholder: "$48.75", marketCap: "$370B", summary: "Large U.S. bank with significant institutional ownership and 13F visibility." },
  { ticker: "CVX", company: "Chevron", sector: "Energy", pricePlaceholder: "$206.90", marketCap: "$365B", summary: "Integrated energy company appearing in large institutional portfolios." },
  { ticker: "OXY", company: "Occidental Petroleum", sector: "Energy", pricePlaceholder: "$65.00", marketCap: "$61B", summary: "Energy producer with high-profile institutional ownership." },
  { ticker: "BN", company: "Brookfield", sector: "Financials", pricePlaceholder: "$40.47", marketCap: "$67B", summary: "Alternative asset manager and large Pershing Square holding in public summaries." },
  { ticker: "AMZN", company: "Amazon", sector: "Consumer Discretionary", pricePlaceholder: "$208.27", marketCap: "$2.2T", summary: "Mega-cap commerce and cloud platform widely held by institutional managers." },
  { ticker: "UBER", company: "Uber Technologies", sector: "Technology", pricePlaceholder: "$71.93", marketCap: "$150B", summary: "Mobility and delivery platform appearing in concentrated hedge fund portfolios." },
  { ticker: "QSR", company: "Restaurant Brands International", sector: "Consumer Discretionary", pricePlaceholder: "$73.90", marketCap: "$23B", summary: "Restaurant franchisor with activist and concentrated-manager ownership history." },
  { ticker: "META", company: "Meta Platforms", sector: "Communication Services", pricePlaceholder: "$572.13", marketCap: "$1.4T", summary: "Large-cap social platform and AI infrastructure investor." },
  { ticker: "MU", company: "Micron Technology", sector: "Technology", pricePlaceholder: "$82.10", marketCap: "$91B", summary: "Memory semiconductor company followed for AI and cyclical chip exposure." },
  { ticker: "TSM", company: "Taiwan Semiconductor", sector: "Technology", pricePlaceholder: "$337.95", marketCap: "$870B", summary: "Global foundry leader and frequent institutional technology holding." },
  { ticker: "WCC", company: "WESCO International", sector: "Industrials", pricePlaceholder: "$171.30", marketCap: "$8B", summary: "Industrial distribution company appearing in value-oriented 13F portfolios." },
  { ticker: "UNP", company: "Union Pacific", sector: "Industrials", pricePlaceholder: "$244.00", marketCap: "$146B", summary: "North American railroad with durable infrastructure characteristics." },
  { ticker: "ELV", company: "Elevance Health", sector: "Health Care", pricePlaceholder: "$349.00", marketCap: "$79B", summary: "Managed-care company appearing in value and quality portfolios." },
  { ticker: "NTRA", company: "Natera", sector: "Health Care", pricePlaceholder: "$164.00", marketCap: "$22B", summary: "Genetic testing company reported as a major Duquesne holding in public summaries." },
  { ticker: "TEVA", company: "Teva Pharmaceutical", sector: "Health Care", pricePlaceholder: "$21.50", marketCap: "$24B", summary: "Generic pharmaceutical company appearing in public Duquesne summaries." },
  { ticker: "EWZ", company: "iShares MSCI Brazil ETF", sector: "ETF", pricePlaceholder: "$29.00", marketCap: "N/A", summary: "Brazil equity ETF reported in public Duquesne filing summaries." },
  { ticker: "XLF", company: "Financial Select Sector SPDR Fund", sector: "ETF", pricePlaceholder: "$50.20", marketCap: "N/A", summary: "Financial-sector ETF used for broad U.S. financial exposure." },
  { ticker: "V", company: "Visa", sector: "Financials", pricePlaceholder: "$302.24", marketCap: "$590B", summary: "Payments network frequently appearing among widely owned quality stocks." },
  { ticker: "BRK.B", company: "Berkshire Hathaway Class B", sector: "Financials", pricePlaceholder: "$479.20", marketCap: "$1.0T", summary: "Berkshire Hathaway Class B shares are widely held by value-oriented managers." },
  { ticker: "BRK.A", company: "Berkshire Hathaway Class A", sector: "Financials", pricePlaceholder: "$718000.00", marketCap: "$1.0T", summary: "Berkshire Hathaway Class A shares appear in high-conviction ownership screens." },
  { ticker: "DIS", company: "Walt Disney", sector: "Communication Services", pricePlaceholder: "$112.00", marketCap: "$200B", summary: "Media and entertainment company appearing in superinvestor ownership screens." },
  { ticker: "CVNA", company: "Carvana", sector: "Consumer Discretionary", pricePlaceholder: "$210.00", marketCap: "$45B", summary: "Online auto retailer appearing in high-conviction ownership screens." },
  { ticker: "GPI", company: "Group 1 Automotive", sector: "Consumer Discretionary", pricePlaceholder: "$430.00", marketCap: "$6B", summary: "Automotive retailer appearing in concentrated ownership screens." },
  { ticker: "MOH", company: "Molina Healthcare", sector: "Health Care", pricePlaceholder: "$315.00", marketCap: "$18B", summary: "Managed-care company appearing in high-conviction ownership screens." },
  { ticker: "HCC", company: "Warrior Met Coal", sector: "Materials", pricePlaceholder: "$65.00", marketCap: "$3B", summary: "Metallurgical coal producer appearing in concentrated ownership screens." }
];

export const holdings: Holding[] = [
  { investorSlug: "warren-buffett", ticker: "AAPL", company: "Apple", shares: 227917808, marketValue: 57843261000, weight: 21.99, qoqChange: 0, status: "Reduced", sector: "Technology" },
  { investorSlug: "warren-buffett", ticker: "AXP", company: "American Express", shares: 151610700, marketValue: 45859204000, weight: 17.43, qoqChange: 0, status: "Increased", sector: "Financials" },
  { investorSlug: "warren-buffett", ticker: "KO", company: "Coca-Cola", shares: 400000000, marketValue: 30420000000, weight: 11.56, qoqChange: 0, status: "Increased", sector: "Consumer Staples" },
  { investorSlug: "warren-buffett", ticker: "BAC", company: "Bank of America", shares: 513624165, marketValue: 25039178000, weight: 9.52, qoqChange: -0.71, status: "Reduced", sector: "Financials" },
  { investorSlug: "warren-buffett", ticker: "CVX", company: "Chevron", shares: 84375856, marketValue: 17457365000, weight: 6.64, qoqChange: -35.17, status: "Reduced", sector: "Energy" },
  { investorSlug: "warren-buffett", ticker: "OXY", company: "Occidental Petroleum", shares: 264941431, marketValue: 17221193000, weight: 6.55, qoqChange: 0, status: "Increased", sector: "Energy" },
  { investorSlug: "warren-buffett", ticker: "GOOGL", company: "Alphabet", shares: 54249798, marketValue: 15600072000, weight: 5.93, qoqChange: 203.99, status: "Increased", sector: "Communication Services" },
  { investorSlug: "bill-ackman", ticker: "BN", company: "Brookfield", shares: 5966500, marketValue: 2413940000, weight: 17.62, qoqChange: 0, status: "Increased", sector: "Financials" },
  { investorSlug: "bill-ackman", ticker: "AMZN", company: "Amazon", shares: 11439000, marketValue: 2382930000, weight: 17.39, qoqChange: 0, status: "Increased", sector: "Consumer Discretionary" },
  { investorSlug: "bill-ackman", ticker: "UBER", company: "Uber Technologies", shares: 29930000, marketValue: 2152270000, weight: 15.71, qoqChange: 0, status: "Increased", sector: "Technology" },
  { investorSlug: "bill-ackman", ticker: "MSFT", company: "Microsoft", shares: 5645000, marketValue: 2090620000, weight: 15.26, qoqChange: 100, status: "New", sector: "Technology" },
  { investorSlug: "bill-ackman", ticker: "QSR", company: "Restaurant Brands International", shares: 22620000, marketValue: 1671400000, weight: 12.2, qoqChange: 0, status: "Increased", sector: "Consumer Discretionary" },
  { investorSlug: "bill-ackman", ticker: "META", company: "Meta Platforms", shares: 2660000, marketValue: 1520700000, weight: 11.1, qoqChange: 0, status: "Increased", sector: "Communication Services" },
  { investorSlug: "david-tepper", ticker: "AMZN", company: "Amazon", shares: 4319000, marketValue: 899100000, weight: 15.16, qoqChange: 0, status: "Increased", sector: "Consumer Discretionary" },
  { investorSlug: "david-tepper", ticker: "MU", company: "Micron Technology", shares: 6849000, marketValue: 562200000, weight: 9.48, qoqChange: 0, status: "Increased", sector: "Technology" },
  { investorSlug: "david-tepper", ticker: "GOOG", company: "Alphabet Class C", shares: 1733000, marketValue: 496900000, weight: 8.38, qoqChange: 0, status: "Increased", sector: "Communication Services" },
  { investorSlug: "david-tepper", ticker: "UBER", company: "Uber Technologies", shares: 6290000, marketValue: 452500000, weight: 7.63, qoqChange: 0, status: "Increased", sector: "Technology" },
  { investorSlug: "david-tepper", ticker: "TSM", company: "Taiwan Semiconductor", shares: 1264000, marketValue: 427200000, weight: 7.2, qoqChange: 0, status: "Increased", sector: "Technology" },
  { investorSlug: "seth-klarman", ticker: "AMZN", company: "Amazon", shares: 3123000, marketValue: 650200000, weight: 12.7, qoqChange: 0, status: "Increased", sector: "Consumer Discretionary" },
  { investorSlug: "seth-klarman", ticker: "QSR", company: "Restaurant Brands International", shares: 8081000, marketValue: 597500000, weight: 11.67, qoqChange: 0, status: "Increased", sector: "Consumer Discretionary" },
  { investorSlug: "seth-klarman", ticker: "WCC", company: "WESCO International", shares: 2861000, marketValue: 490200000, weight: 9.57, qoqChange: 0, status: "Increased", sector: "Industrials" },
  { investorSlug: "seth-klarman", ticker: "UNP", company: "Union Pacific", shares: 1817000, marketValue: 443400000, weight: 8.66, qoqChange: 0, status: "Increased", sector: "Industrials" },
  { investorSlug: "seth-klarman", ticker: "ELV", company: "Elevance Health", shares: 1206000, marketValue: 421000000, weight: 8.22, qoqChange: 0, status: "Increased", sector: "Health Care" },
  { investorSlug: "stanley-druckenmiller", ticker: "NTRA", company: "Natera", shares: 1100000, marketValue: 180000000, weight: 15.4, qoqChange: 0, status: "Increased", sector: "Health Care" },
  { investorSlug: "stanley-druckenmiller", ticker: "TEVA", company: "Teva Pharmaceutical", shares: 8200000, marketValue: 176000000, weight: 15.1, qoqChange: 0, status: "Increased", sector: "Health Care" },
  { investorSlug: "stanley-druckenmiller", ticker: "EWZ", company: "iShares MSCI Brazil ETF", shares: 3600000, marketValue: 104000000, weight: 8.9, qoqChange: 100, status: "New", sector: "ETF" },
  { investorSlug: "stanley-druckenmiller", ticker: "XLF", company: "Financial Select Sector SPDR Fund", shares: 5500000, marketValue: 276000000, weight: 23.6, qoqChange: 100, status: "New", sector: "ETF" },
  { investorSlug: "stanley-druckenmiller", ticker: "AMZN", company: "Amazon", shares: 738000, marketValue: 153700000, weight: 13.2, qoqChange: 68.9, status: "Increased", sector: "Consumer Discretionary" },
  { investorSlug: "stanley-druckenmiller", ticker: "GOOGL", company: "Alphabet", shares: 385000, marketValue: 110700000, weight: 9.5, qoqChange: 277.5, status: "Increased", sector: "Communication Services" }
];

export const congressMembers: CongressMember[] = [
  { id: "nancy-pelosi", name: "Nancy Pelosi", party: "Democrat", chamber: "House", state: "CA", committee: "Former leadership" },
  { id: "dan-crenshaw", name: "Dan Crenshaw", party: "Republican", chamber: "House", state: "TX", committee: "Energy and Commerce" },
  { id: "markwayne-mullin", name: "Markwayne Mullin", party: "Republican", chamber: "Senate", state: "OK", committee: "Armed Services" },
  { id: "shelley-capito", name: "Shelley Moore Capito", party: "Republican", chamber: "Senate", state: "WV", committee: "Appropriations" },
  { id: "debbie-wasserman-schultz", name: "Debbie Wasserman Schultz", party: "Democrat", chamber: "House", state: "FL", committee: "Appropriations" },
  { id: "sheldon-whitehouse", name: "Sheldon Whitehouse", party: "Democrat", chamber: "Senate", state: "RI", committee: "Budget" },
  { id: "virginia-foxx", name: "Virginia Foxx", party: "Republican", chamber: "House", state: "NC", committee: "Education and Workforce" }
];

export const congressTrades: CongressTrade[] = [
  { id: "ct-1", politician: "Nancy Pelosi", chamber: "House", party: "Democrat", state: "CA", committee: "Former leadership", ticker: "NVDA", company: "NVIDIA", type: "Buy", owner: "Spouse", assetType: "Option", transactionDate: "2026-04-12", disclosureDate: "2026-05-25", valueRange: "$500,001-$1,000,000", daysDelayed: 43, price: "$151.60", mock: true },
  { id: "ct-2", politician: "Dan Crenshaw", chamber: "House", party: "Republican", state: "TX", committee: "Energy and Commerce", ticker: "VST", company: "Vistra", type: "Buy", owner: "Self", assetType: "Stock", transactionDate: "2026-04-28", disclosureDate: "2026-05-09", valueRange: "$15,001-$50,000", daysDelayed: 11, price: "$205.40", mock: true },
  { id: "ct-3", politician: "Markwayne Mullin", chamber: "Senate", party: "Republican", state: "OK", committee: "Armed Services", ticker: "GEV", company: "GE Vernova", type: "Buy", owner: "Joint", assetType: "Stock", transactionDate: "2026-03-19", disclosureDate: "2026-05-11", valueRange: "$50,001-$100,000", daysDelayed: 53, price: "$515.80", mock: true },
  { id: "ct-4", politician: "Shelley Moore Capito", chamber: "Senate", party: "Republican", state: "WV", committee: "Appropriations", ticker: "MSFT", company: "Microsoft", type: "Sell", owner: "Undisclosed", assetType: "Stock", transactionDate: "2026-05-02", disclosureDate: "2026-05-20", valueRange: "$1,001-$15,000", daysDelayed: 18, price: "$492.25", mock: true },
  { id: "ct-5", politician: "Debbie Wasserman Schultz", chamber: "House", party: "Democrat", state: "FL", committee: "Appropriations", ticker: "CEG", company: "Constellation Energy", type: "Buy", owner: "Self", assetType: "Stock", transactionDate: "2026-04-06", disclosureDate: "2026-05-30", valueRange: "$15,001-$50,000", daysDelayed: 54, price: "$318.10", mock: true },
  { id: "ct-6", politician: "Sheldon Whitehouse", chamber: "Senate", party: "Democrat", state: "RI", committee: "Budget", ticker: "NVDA", company: "NVIDIA", type: "Sell", owner: "Self", assetType: "Stock", transactionDate: "2026-05-08", disclosureDate: "2026-06-02", valueRange: "$100,001-$250,000", daysDelayed: 25, price: "$151.60", mock: true },
  { id: "ct-7", politician: "Virginia Foxx", chamber: "House", party: "Republican", state: "NC", committee: "Education and Workforce", ticker: "GEV", company: "GE Vernova", type: "Buy", owner: "Undisclosed", assetType: "Stock", transactionDate: "2026-05-15", disclosureDate: "2026-06-02", valueRange: "$15,001-$50,000", daysDelayed: 18, price: "$515.80", mock: true },
  { id: "ct-8", politician: "Nancy Pelosi", chamber: "House", party: "Democrat", state: "CA", committee: "Former leadership", ticker: "MSFT", company: "Microsoft", type: "Buy", owner: "Spouse", assetType: "Option", transactionDate: "2026-04-17", disclosureDate: "2026-05-28", valueRange: "$250,001-$500,000", daysDelayed: 41, price: "$492.25", mock: true }
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
