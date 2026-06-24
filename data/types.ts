export type HoldingStatus = "New" | "Increased" | "Reduced" | "Sold";
export type TransactionType = "Buy" | "Sell";
export type Confidence = "High" | "Medium" | "Watch";

export interface Fund {
  id: string;
  name: string;
  manager: string;
  strategy: string;
}

export interface Investor {
  id: string;
  slug: string;
  name: string;
  firm: string;
  style: string;
  portfolioValue: number;
  holdingsCount: number;
  lastFilingDate: string;
  topHolding: string;
  bio: string;
  fundId: string;
}

export interface Filing {
  id: string;
  investorSlug: string;
  form: "13F-HR";
  period: string;
  filedAt: string;
  source: string;
}

export interface Holding {
  investorSlug: string;
  ticker: string;
  company: string;
  shares: number;
  marketValue: number;
  weight: number;
  qoqChange: number;
  status: HoldingStatus;
  sector: string;
}

export interface Stock {
  ticker: string;
  company: string;
  sector: string;
  pricePlaceholder: string;
  marketCap: string;
  summary: string;
}

export interface CongressMember {
  id: string;
  name: string;
  party: "Democrat" | "Republican" | "Independent";
  chamber: "House" | "Senate";
  state: string;
}

export interface CongressTrade {
  id: string;
  politician: string;
  chamber: "House" | "Senate";
  party: "Democrat" | "Republican" | "Independent";
  ticker: string;
  company: string;
  type: TransactionType;
  transactionDate: string;
  disclosureDate: string;
  valueRange: string;
  daysDelayed: number;
  mock: boolean;
}

export interface Insider {
  id: string;
  name: string;
  title: string;
  company: string;
  ticker: string;
}

export interface InsiderTrade {
  id: string;
  executive: string;
  title: string;
  company: string;
  ticker: string;
  type: TransactionType;
  shares: number;
  value: number;
  filingDate: string;
  clusterId?: string;
}

export interface Signal {
  id: string;
  type:
    | "New Hedge Fund Position"
    | "Large Portfolio Increase"
    | "Congress Purchase"
    | "Insider Cluster Buying"
    | "Breaking News Related to a Holding";
  actor: string;
  ticker: string;
  timestamp: string;
  explanation: string;
  confidence: Confidence;
}

export interface NewsItem {
  id: string;
  ticker: string;
  headline: string;
  source: string;
  publishedAt: string;
  summary: string;
}
