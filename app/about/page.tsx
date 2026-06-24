import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, SectionHeader } from "@/components/ui/card";
import { MockWarning } from "@/components/ui/mock-warning";

export const metadata: Metadata = {
  title: "About",
  description: "About Investina and its educational research scope."
};

export default function AboutPage() {
  return (
    <main className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">About</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Investina</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          A public investing research interface for exploring famous investor portfolios, hedge fund 13F holdings,
          Congress stock trades, insider transactions, ownership signals, and related news.
        </p>
      </div>
      <MockWarning />

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <Badge tone="mint">Research dashboard</Badge>
          <h2 className="mt-4 text-lg font-semibold text-white">What Investina Is</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            A compact research workspace for comparing ownership, filings, disclosure delays, and cross-source signals around public companies.
          </p>
        </Card>
        <Card>
          <Badge tone="amber">Mock sample</Badge>
          <h2 className="mt-4 text-lg font-semibold text-white">What It Is Today</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            A Vercel-ready prototype using local sample data. Rows naming real people are not actual disclosures unless a future source link proves them.
          </p>
        </Card>
        <Card>
          <Badge tone="blue">Public records</Badge>
          <h2 className="mt-4 text-lg font-semibold text-white">What Comes Next</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            SEC 13F, Form 4, Schedule 13D/13G, House, Senate, and public news adapters with source metadata preserved on every record.
          </p>
        </Card>
      </section>

      <Card>
        <SectionHeader title="Original Product Direction" eyebrow="Design principles" />
        <p className="leading-7 text-slate-300">
          The product uses an original dashboard design with compact navigation, dense tables, slate panels, and reusable research modules.
          It is intentionally built around local mock data first so the application remains Vercel-ready without paid APIs.
        </p>
      </Card>
      <Card>
        <SectionHeader title="Future Data Plan" eyebrow="Phase 2" />
        <p className="leading-7 text-slate-300">
          Supabase and import jobs will be added after the mock data model settles. See the <Link className="text-mint" href="/data-sources">data sources page</Link> for the planned SEC and congressional source architecture.
        </p>
      </Card>
      <Card>
        <SectionHeader title="Research Boundaries" eyebrow="Important limitations" />
        <div className="grid gap-3 text-sm leading-6 text-slate-300 md:grid-cols-2">
          <p className="rounded-md bg-ink/60 p-4">13F filings are delayed portfolio snapshots and do not reveal real-time trades, short positions, or all asset classes.</p>
          <p className="rounded-md bg-ink/60 p-4">Congress disclosures can arrive weeks after the transaction and often require manual asset-name normalization.</p>
          <p className="rounded-md bg-ink/60 p-4">Insider Form 4 filings can be faster, but transaction codes and context still need careful interpretation.</p>
          <p className="rounded-md bg-ink/60 p-4">Signals should explain their source rule clearly before any scoring model or ranking layer is introduced.</p>
        </div>
      </Card>
    </main>
  );
}
