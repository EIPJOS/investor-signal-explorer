export type SourceCategory = "13F" | "EDGAR" | "Insider" | "Congress" | "News";
export type SourceStatus = "Mocked" | "Planned" | "Ready for Adapter";

export interface PublicDataSource {
  id: string;
  name: string;
  category: SourceCategory;
  status: SourceStatus;
  cadence: string;
  primaryRecords: string[];
  normalizedEntities: string[];
  notes: string;
  phaseTwoPath: string;
}

export const publicDataSources: PublicDataSource[] = [
  {
    id: "sec-13f",
    name: "SEC Form 13F",
    category: "13F",
    status: "Ready for Adapter",
    cadence: "Quarterly, with reporting delay",
    primaryRecords: ["Institutional investment manager", "Information table", "CUSIP", "Shares", "Value"],
    normalizedEntities: ["Investor", "Fund", "Filing", "Holding", "Stock"],
    notes: "Core source for famous investor portfolios and stock ownership overlap. It does not show short positions or all asset classes.",
    phaseTwoPath: "scripts/import-sec-13f.ts"
  },
  {
    id: "sec-edgar",
    name: "SEC EDGAR Company Submissions",
    category: "EDGAR",
    status: "Planned",
    cadence: "Continuous filing metadata",
    primaryRecords: ["CIK", "Accession number", "Form type", "Filing date", "Document URL"],
    normalizedEntities: ["Filing", "Stock", "NewsItem"],
    notes: "Used as the filing index and metadata layer for SEC-sourced holdings and insider filings.",
    phaseTwoPath: "lib/sec/edgar-client.ts"
  },
  {
    id: "sec-form-4",
    name: "SEC Form 4 Insider Filings",
    category: "Insider",
    status: "Ready for Adapter",
    cadence: "Event driven, typically near transaction date",
    primaryRecords: ["Reporting owner", "Issuer", "Transaction code", "Shares", "Price", "Filing date"],
    normalizedEntities: ["Insider", "InsiderTrade", "Signal", "Stock"],
    notes: "Powers insider buying, selling, largest purchases, and cluster buying signals.",
    phaseTwoPath: "scripts/import-sec-form4.ts"
  },
  {
    id: "house-disclosures",
    name: "House Financial Disclosures",
    category: "Congress",
    status: "Planned",
    cadence: "Periodic transaction reports",
    primaryRecords: ["Representative", "Asset", "Transaction type", "Transaction date", "Disclosure date", "Value range"],
    normalizedEntities: ["CongressMember", "CongressTrade", "Signal", "Stock"],
    notes: "Requires careful normalization because assets are often disclosed as names rather than clean tickers.",
    phaseTwoPath: "scripts/import-house-disclosures.ts"
  },
  {
    id: "senate-disclosures",
    name: "Senate Financial Disclosures",
    category: "Congress",
    status: "Planned",
    cadence: "Periodic transaction reports",
    primaryRecords: ["Senator", "Asset", "Transaction type", "Transaction date", "Disclosure date", "Value range"],
    normalizedEntities: ["CongressMember", "CongressTrade", "Signal", "Stock"],
    notes: "Used with House data to compare disclosure delays and policymaker activity by ticker.",
    phaseTwoPath: "scripts/import-senate-disclosures.ts"
  }
];

export const sourcePrinciples = [
  "Use public records and documented source endpoints before considering any third-party API.",
  "Store raw filing metadata separately from normalized research entities.",
  "Label reporting delays, amendments, and missing data directly in the product.",
  "Prefer source links and accession identifiers over opaque imported rows.",
  "Generate signals from explainable rules before adding any scoring model."
];
