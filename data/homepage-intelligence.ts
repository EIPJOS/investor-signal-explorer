import type { PortfolioUpdate } from "@/data/types";

export const portfolioUpdates: PortfolioUpdate[] = [
  { id: "pu-1", investorName: "Warren Buffett", firm: "Berkshire Hathaway", slug: "warren-buffett", updatedAt: "2026-05-15", changeCount: 7, topTicker: "AAPL", summary: "Reduced Apple, added industrial exposure" },
  { id: "pu-2", investorName: "Seth Klarman", firm: "Baupost Group", slug: "seth-klarman", updatedAt: "2026-05-15", changeCount: 9, topTicker: "CEG", summary: "Opened Constellation Energy position" },
  { id: "pu-3", investorName: "Bill Ackman", firm: "Pershing Square", slug: "bill-ackman", updatedAt: "2026-05-14", changeCount: 4, topTicker: "GOOGL", summary: "Increased Alphabet and power exposure" },
  { id: "pu-4", investorName: "Stanley Druckenmiller", firm: "Duquesne Family Office", slug: "stanley-druckenmiller", updatedAt: "2026-05-14", changeCount: 8, topTicker: "VST", summary: "Raised Vistra, opened GE Vernova" },
  { id: "pu-5", investorName: "David Tepper", firm: "Appaloosa", slug: "david-tepper", updatedAt: "2026-05-13", changeCount: 11, topTicker: "NVDA", summary: "Increased AI infrastructure holdings" },
  { id: "pu-6", investorName: "Howard Marks", firm: "Oaktree Capital Management", updatedAt: "2026-05-12", changeCount: 13, topTicker: "HYG", summary: "Credit-sensitive equity changes" },
  { id: "pu-7", investorName: "Li Lu", firm: "Himalaya Capital", updatedAt: "2026-05-12", changeCount: 3, topTicker: "BAC", summary: "Concentrated financial holdings updated" },
  { id: "pu-8", investorName: "Mohnish Pabrai", firm: "Pabrai Investment Funds", updatedAt: "2026-05-11", changeCount: 5, topTicker: "COAL", summary: "Commodity-linked positions refreshed" },
  { id: "pu-9", investorName: "David Einhorn", firm: "Greenlight Capital", updatedAt: "2026-05-10", changeCount: 12, topTicker: "GRBK", summary: "Homebuilder and value basket changes" },
  { id: "pu-10", investorName: "Daniel Loeb", firm: "Third Point", updatedAt: "2026-05-10", changeCount: 14, topTicker: "AMZN", summary: "Consumer internet exposure changed" },
  { id: "pu-11", investorName: "Chris Hohn", firm: "TCI Fund Management", updatedAt: "2026-05-09", changeCount: 6, topTicker: "CP", summary: "Infrastructure and platform holdings updated" },
  { id: "pu-12", investorName: "Nelson Peltz", firm: "Trian Fund Management", updatedAt: "2026-05-09", changeCount: 4, topTicker: "DIS", summary: "Activist-oriented portfolio refreshed" },
  { id: "pu-13", investorName: "Chase Coleman", firm: "Tiger Global Management", updatedAt: "2026-05-08", changeCount: 18, topTicker: "META", summary: "Growth basket turnover remained active" },
  { id: "pu-14", investorName: "Bill Nygren", firm: "Oakmark Funds", updatedAt: "2026-05-08", changeCount: 10, topTicker: "C", summary: "Value portfolio changes posted" },
  { id: "pu-15", investorName: "Lee Ainslie", firm: "Maverick Capital", updatedAt: "2026-05-07", changeCount: 15, topTicker: "MSFT", summary: "Software and healthcare changes" },
  { id: "pu-16", investorName: "Bruce Berkowitz", firm: "Fairholme Capital", updatedAt: "2026-05-07", changeCount: 2, topTicker: "JOE", summary: "Concentrated real estate exposure updated" },
  { id: "pu-17", investorName: "Glenn Greenberg", firm: "Brave Warrior Advisors", updatedAt: "2026-05-06", changeCount: 5, topTicker: "GOOG", summary: "Quality compounder holdings refreshed" },
  { id: "pu-18", investorName: "Mason Hawkins", firm: "Southeastern Asset Management", updatedAt: "2026-05-06", changeCount: 7, topTicker: "LBRDA", summary: "Deep-value portfolio update posted" },
  { id: "pu-19", investorName: "Tom Gayner", firm: "Markel", updatedAt: "2026-05-05", changeCount: 12, topTicker: "BRK.B", summary: "Insurance investment portfolio refreshed" },
  { id: "pu-20", investorName: "Prem Watsa", firm: "Fairfax Financial", updatedAt: "2026-05-05", changeCount: 9, topTicker: "FFH", summary: "Financial and hedged equity updates" },
  { id: "pu-21", investorName: "John Armitage", firm: "Egerton Capital", updatedAt: "2026-05-04", changeCount: 8, topTicker: "MA", summary: "Global quality growth changes" },
  { id: "pu-22", investorName: "Andreas Halvorsen", firm: "Viking Global Investors", updatedAt: "2026-05-04", changeCount: 17, topTicker: "AMZN", summary: "Large-cap growth holdings updated" },
  { id: "pu-23", investorName: "Philippe Laffont", firm: "Coatue Management", updatedAt: "2026-05-03", changeCount: 16, topTicker: "NVDA", summary: "Technology exposure refreshed" },
  { id: "pu-24", investorName: "Stephen Mandel", firm: "Lone Pine Capital", updatedAt: "2026-05-03", changeCount: 11, topTicker: "META", summary: "Consumer platform basket changed" },
  { id: "pu-25", investorName: "Alex Roepers", firm: "Atlantic Investment Management", updatedAt: "2026-05-02", changeCount: 4, topTicker: "AIN", summary: "Industrial value positions refreshed" },
  { id: "pu-26", investorName: "Guy Spier", firm: "Aquamarine Capital", updatedAt: "2026-05-02", changeCount: 3, topTicker: "BRK.B", summary: "Patient capital portfolio updated" },
  { id: "pu-27", investorName: "Carl Icahn", firm: "Icahn Capital", updatedAt: "2026-05-01", changeCount: 6, topTicker: "IEP", summary: "Activist holdings refreshed" },
  { id: "pu-28", investorName: "Pat Dorsey", firm: "Dorsey Asset Management", updatedAt: "2026-05-01", changeCount: 5, topTicker: "AMT", summary: "Moat-oriented portfolio update" }
];

export const ownershipStats = {
  mostOwned: [
    { ticker: "GOOGL", company: "Alphabet", count: 34 },
    { ticker: "MSFT", company: "Microsoft", count: 31 },
    { ticker: "NVDA", company: "NVIDIA", count: 28 },
    { ticker: "AMZN", company: "Amazon", count: 26 },
    { ticker: "META", company: "Meta Platforms", count: 24 },
    { ticker: "AAPL", company: "Apple", count: 23 },
    { ticker: "BRK.B", company: "Berkshire Hathaway", count: 21 },
    { ticker: "VST", company: "Vistra", count: 17 },
    { ticker: "CEG", company: "Constellation Energy", count: 15 },
    { ticker: "GEV", company: "GE Vernova", count: 13 }
  ],
  highConviction: [
    { ticker: "VST", company: "Vistra", maxWeight: 27.9, owners: 2 },
    { ticker: "NVDA", company: "NVIDIA", maxWeight: 28.1, owners: 2 },
    { ticker: "CEG", company: "Constellation Energy", maxWeight: 12.8, owners: 2 },
    { ticker: "GOOGL", company: "Alphabet", maxWeight: 16.6, owners: 1 },
    { ticker: "MSFT", company: "Microsoft", maxWeight: 9.9, owners: 3 },
    { ticker: "GEV", company: "GE Vernova", maxWeight: 8.9, owners: 3 },
    { ticker: "AAPL", company: "Apple", maxWeight: 19.3, owners: 2 }
  ]
};
