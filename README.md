# Investor Signal Explorer

Investor Signal Explorer is a production-oriented Next.js research dashboard for exploring famous investor portfolios, mock hedge fund 13F holdings, congressional stock trades, insider transactions, ownership signals, and related news.

The first version uses local mock data only. It does not scrape live sources, require paid APIs, or store data in Supabase yet.

Live site: https://investina.vercel.app

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Recharts
- Local mock data
- Vercel-ready project structure

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For validation:

```bash
npm run typecheck
npm run build
```

## Mock Data Organization

All mock data lives in `data/`.

- `data/types.ts` defines the future-facing domain interfaces: `Investor`, `Fund`, `Filing`, `Holding`, `Stock`, `CongressMember`, `CongressTrade`, `Insider`, `InsiderTrade`, `Signal`, and `NewsItem`.
- `data/mock-data.ts` exports local records and query helpers such as `getInvestor`, `getStock`, `getStockHolders`, and `getStockSignals`.

This keeps route components independent from storage details and prepares the app for a Supabase adapter later.

## Main Routes

- `/` dashboard and global search
- `/investors` famous investor browser
- `/investors/[slug]` investor detail pages
- `/congress` congressional trade table
- `/insiders` insider trade table and cluster sections
- `/stocks/[ticker]` stock ownership pages for `VST`, `CEG`, `NVDA`, `MSFT`, and `GEV`
- `/signals` grouped signal browser
- `/data-sources` future source architecture and disclaimer
- `/about` product overview

## Phase 2 Integration Points

Supabase should be added in:

- `lib/supabase/client.ts` for browser-safe reads
- `lib/supabase/server.ts` for server components, route handlers, and import jobs
- `data/repositories/` for repository functions that replace direct mock imports

SEC and disclosure imports should be added in:

- `scripts/import-sec-13f.ts` for SEC Form 13F ingestion
- `scripts/import-sec-form4.ts` for SEC Form 4 insider filings
- `scripts/import-house-disclosures.ts` for House periodic transaction reports
- `scripts/import-senate-disclosures.ts` for Senate disclosure records
- `app/api/imports/*` only if protected on-demand import endpoints are needed

Do not implement real scraping until source terms, rate limits, normalization rules, and storage schema are finalized.

## Disclaimer

This website is for educational and research purposes only. It is not investment advice. Public filings may be delayed, incomplete, or amended.
