import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, SectionHeader } from "@/components/ui/card";
import { formatCurrency } from "@/data/mock-data";
import { getCongressSummary, getIssuerActivity, getPoliticianActivity } from "@/data/congress-analytics";

export function CongressIntelligence() {
  const summary = getCongressSummary();
  const politicians = getPoliticianActivity().slice(0, 4);
  const issuers = getIssuerActivity().slice(0, 5);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Card>
          <p className="text-sm text-slate-400">Trades</p>
          <p className="mt-2 text-2xl font-semibold text-white">{summary.trades}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-400">Politicians</p>
          <p className="mt-2 text-2xl font-semibold text-white">{summary.politicians}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-400">Issuers</p>
          <p className="mt-2 text-2xl font-semibold text-white">{summary.issuers}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-400">Est. value</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(summary.volume)}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-400">Late filings</p>
          <p className="mt-2 text-2xl font-semibold text-red-200">{summary.lateDisclosures}</p>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <SectionHeader title="Politician Activity" eyebrow="Mock disclosure leaderboard" />
          <div className="grid gap-3 md:grid-cols-2">
            {politicians.map((member) => (
              <Link key={member.id} href={`/congress/politicians/${member.slug}`} className="rounded-md border border-line bg-ink/55 p-4 transition hover:border-mint/60">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{member.name}</h3>
                    <p className="text-sm text-slate-400">{member.party} - {member.chamber} - {member.state}</p>
                  </div>
                  <Badge tone={member.party === "Democrat" ? "blue" : "red"}>{member.trades} trades</Badge>
                </div>
                <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div><dt className="text-slate-500">Issuers</dt><dd className="text-slate-200">{member.issuers}</dd></div>
                  <div><dt className="text-slate-500">Volume</dt><dd className="text-slate-200">{formatCurrency(member.volume)}</dd></div>
                  <div><dt className="text-slate-500">Last</dt><dd className="text-slate-200">{member.lastTraded}</dd></div>
                </dl>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Issuer Activity" eyebrow="Most traded mock tickers" />
          <div className="space-y-3">
            {issuers.map((issuer) => (
              <Link key={issuer.ticker} href={`/congress/issuers/${issuer.ticker}`} className="flex items-center justify-between rounded-md bg-ink/55 p-3 transition hover:bg-panelSoft">
                <div>
                  <p className="font-semibold text-white">{issuer.company}</p>
                  <p className="text-sm text-slate-400">{issuer.ticker} - {issuer.sector}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-slate-200">{issuer.trades} trades</p>
                  <p className="text-slate-500">{issuer.politicians} politicians</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
