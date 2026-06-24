# Supabase Setup

This folder contains the Phase 2 database target for Investor Signal Explorer.

## Apply Schema

1. Create a Supabase project.
2. Open the SQL editor.
3. Review `schema.sql`.
4. Run the schema.

The schema is intentionally normalized around public filing records:

- `stocks`
- `funds`
- `investors`
- `filings`
- `holdings`
- `congress_members`
- `congress_trades`
- `insiders`
- `insider_trades`
- `signals`
- `news_items`

## Environment Variables

Do not commit these values.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Use the service role key only in trusted server-side import scripts.

## RLS Direction

The public app only needs read access to published normalized data. Import scripts should use privileged server-side credentials and should not run in the browser.
