-- Investor Signal Explorer Phase 2 schema.
-- Apply this in Supabase SQL editor after reviewing project-specific RLS needs.

create extension if not exists pgcrypto;

create table if not exists public.stocks (
  id uuid primary key default gen_random_uuid(),
  ticker text not null unique,
  company text not null,
  sector text,
  cik text,
  cusip text,
  exchange text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.funds (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  manager text not null,
  strategy text,
  cik text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.investors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  firm text not null,
  style text,
  bio text,
  fund_id uuid references public.funds(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.filings (
  id uuid primary key default gen_random_uuid(),
  fund_id uuid references public.funds(id) on delete cascade,
  investor_id uuid references public.investors(id) on delete set null,
  form_type text not null,
  accession_number text unique,
  period_end date,
  filed_at date not null,
  source_url text,
  source_status text not null default 'original',
  raw_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.holdings (
  id uuid primary key default gen_random_uuid(),
  filing_id uuid not null references public.filings(id) on delete cascade,
  fund_id uuid references public.funds(id) on delete cascade,
  investor_id uuid references public.investors(id) on delete set null,
  stock_id uuid references public.stocks(id) on delete set null,
  ticker text not null,
  company text not null,
  cusip text,
  shares numeric not null default 0,
  market_value numeric not null default 0,
  portfolio_weight numeric,
  qoq_change numeric,
  status text not null check (status in ('New', 'Increased', 'Reduced', 'Sold')),
  sector text,
  created_at timestamptz not null default now()
);

create table if not exists public.congress_members (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  party text not null,
  chamber text not null check (chamber in ('House', 'Senate')),
  state text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.congress_trades (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.congress_members(id) on delete set null,
  politician text not null,
  chamber text not null check (chamber in ('House', 'Senate')),
  party text not null,
  ticker text not null,
  company text not null,
  transaction_type text not null check (transaction_type in ('Buy', 'Sell')),
  transaction_date date not null,
  disclosure_date date not null,
  value_range text not null,
  days_delayed integer not null,
  source_url text,
  raw_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.insiders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  company text not null,
  ticker text not null,
  cik text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.insider_trades (
  id uuid primary key default gen_random_uuid(),
  insider_id uuid references public.insiders(id) on delete set null,
  executive text not null,
  title text,
  company text not null,
  ticker text not null,
  transaction_type text not null check (transaction_type in ('Buy', 'Sell')),
  shares numeric not null default 0,
  transaction_value numeric not null default 0,
  transaction_date date,
  filing_date date not null,
  accession_number text,
  cluster_id text,
  source_url text,
  raw_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.signals (
  id uuid primary key default gen_random_uuid(),
  signal_type text not null,
  actor text not null,
  ticker text not null,
  occurred_at timestamptz not null,
  explanation text not null,
  confidence text not null check (confidence in ('High', 'Medium', 'Watch')),
  source_refs jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.news_items (
  id uuid primary key default gen_random_uuid(),
  ticker text not null,
  headline text not null,
  source text not null,
  published_at date not null,
  summary text,
  source_url text,
  created_at timestamptz not null default now()
);

create index if not exists idx_holdings_ticker on public.holdings(ticker);
create index if not exists idx_holdings_investor on public.holdings(investor_id);
create index if not exists idx_filings_fund_date on public.filings(fund_id, filed_at desc);
create index if not exists idx_congress_trades_ticker_date on public.congress_trades(ticker, transaction_date desc);
create index if not exists idx_congress_trades_member_date on public.congress_trades(member_id, transaction_date desc);
create index if not exists idx_insider_trades_ticker_date on public.insider_trades(ticker, filing_date desc);
create index if not exists idx_signals_ticker_time on public.signals(ticker, occurred_at desc);
create index if not exists idx_news_items_ticker_date on public.news_items(ticker, published_at desc);
