import type { Metadata } from "next";
import Link from "next/link";
import { Card, SectionHeader } from "@/components/ui/card";

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
    </main>
  );
}
