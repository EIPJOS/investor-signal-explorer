# Investina

Investina is a production-oriented Next.js research dashboard for exploring famous investor portfolios, mock hedge fund 13F holdings, congressional stock trades, insider transactions, ownership signals, and related news.

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
- `data/repositories/investor-repository.ts` is the first repository facade. Supabase-backed functions should replace these mock exports without changing the page layer.
- `lib/data-sources/source-registry.ts` describes the public-source plan, normalized entities, cadence, and Phase 2 adapter paths.

This keeps route components independent from storage details and prepares the app for a Supabase adapter later.

## Main Routes

- `/` dashboard and global search
- `/investors` famous investor browser
- `/investors/[slug]` investor detail pages
- `/congress` congressional trade table
- `/congress/politicians/[slug]` congressional politician activity profile
- `/congress/issuers/[ticker]` congressional issuer activity profile
- `/congress/trades/[id]` congressional trade disclosure detail
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

## Supabase Schema

The database target lives in `supabase/schema.sql`, with setup notes in `supabase/README.md`.

The import commands are intentionally placeholders until credentials and data-source policies are finalized:

```bash
npm run import:sec13f
npm run import:form4
npm run import:house
npm run import:senate
```

They currently throw explicit "not implemented" errors so nobody accidentally runs unfinished ingestion.

## Product Originality

The functional category is public investor portfolio research, but the design, layout, wording, data model, source plan, and implementation are original to Investina. Do not copy another product's branding, visual structure, source code, or database.

The data methodology is documented in `docs/data-methodology.md`.

## Congressional Intelligence Direction

The Congress section now includes original mock-data views for:

- aggregate trade, politician, issuer, volume, and late-filing metrics
- politician activity cards
- issuer activity cards
- advanced filtering by party, chamber, state, transaction type, asset type, trade size, ticker, politician, company, and committee

These features are intended to support public disclosure research while keeping the design and implementation original.

## Dashboard Retention Modules

The home dashboard includes a dense portfolio update tape with updated dates, change counts, top tickers, and compact ownership stat panels. The layout also includes reserved sponsor slots for future monetization once traffic is stable.

## Data Accuracy Notes

The visible famous-investor mock holdings were corrected against public 13F summaries on June 24, 2026. Dataroma was used only as a manual checking reference where available. Live production data should come from SEC EDGAR and normalized records in our own database.

Investor detail pages now include an original tabbed portfolio workspace with holdings, activity, buys, sells, and historical top-holdings views.

## Stock SEO Pages

Stock detail pages include ownership, Congress, insider, signal, news, related-stock, data-freshness, and FAQ-style research sections. This makes each ticker page more useful as a landing page while keeping source-lag warnings visible.

## Disclaimer

This website is for educational and research purposes only. It is not investment advice. Public filings may be delayed, incomplete, or amended.
