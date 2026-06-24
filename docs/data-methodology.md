# Data Methodology

Investina is designed as an original research product inspired by the general idea of public portfolio tracking, not by any specific site's design, layout, wording, code, or database.

## Reference Boundaries

Reference products in this category show useful user needs: recent trade feeds, politician profiles, issuer activity, disclosure delays, trade size ranges, and filtering by party, chamber, state, transaction type, sector, and issuer. Investina may support those research needs, but it should express them through its own navigation, visual system, data model, copy, and interaction design.

Do not reproduce another site's page composition, card styling, table presentation, branding, naming, copy, or proprietary data structure.

For current mock rows, Dataroma may be used only as a manual cross-check for public 13F summaries. Production data should come from public filings, SEC EDGAR, congressional disclosure sources, or a storage layer we control.

## Source Strategy

The product should rely on public records where possible:

- SEC Form 13F filings for quarterly institutional holdings.
- SEC EDGAR filing metadata for accession numbers, filing dates, form types, and document discovery.
- SEC Form 4 filings for insider transactions.
- House financial disclosures for representative transaction reports.
- Senate financial disclosures for senator transaction reports.

## Normalization Rules

Raw records should be preserved before normalization. Normalized records should map into the app domain:

- `Investor`, `Fund`, `Filing`, and `Holding` for 13F portfolios.
- `CongressMember` and `CongressTrade` for policymaker activity.
- `Insider` and `InsiderTrade` for Form 4 activity.
- `Stock`, `Signal`, and `NewsItem` for cross-source research views.

## Delay And Quality Labels

Every live-data version should expose:

- Filing date.
- Reporting period or transaction date.
- Disclosure delay where applicable.
- Whether the record is original, amended, estimated, or normalized.
- Source reference, such as accession number or disclosure document URL.

## Signal Rules

Initial signals should be explainable and rule-based:

- New hedge fund position.
- Large quarter-over-quarter portfolio increase.
- Congress purchase with late disclosure.
- Insider cluster buying.
- Filing-related news overlap.

Congress-specific signals can additionally use:

- Late disclosure.
- Repeated purchases by the same policymaker.
- Multiple politicians trading the same issuer.
- Committee-relevant issuer activity.

## Phase 2 Implementation

Add these files when live ingestion begins:

- `lib/sec/edgar-client.ts`
- `lib/sec/form13f-parser.ts`
- `lib/sec/form4-parser.ts`
- `lib/congress/house-disclosures.ts`
- `lib/congress/senate-disclosures.ts`
- `scripts/import-sec-13f.ts`
- `scripts/import-sec-form4.ts`
- `scripts/import-house-disclosures.ts`
- `scripts/import-senate-disclosures.ts`

Supabase should sit behind repository functions so the UI does not depend directly on the storage layer.

## Database Target

The initial relational schema is defined in `supabase/schema.sql`. It separates source metadata from normalized records so the product can show filing dates, delays, amendments, and source references instead of presenting imported data as more precise than it really is.

Import placeholders live in `scripts/`. They are intentionally non-networked until source access, rate limits, and Supabase credentials are reviewed.
