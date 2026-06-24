import type { Metadata } from "next";
import { Card, SectionHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { publicDataSources, sourcePrinciples } from "@/lib/data-sources/source-registry";
import { sourceTimingRows } from "@/data/source-timing";

export const metadata: Metadata = {
  title: "Data Sources",
  description: "Future data source architecture for SEC 13F filings, EDGAR APIs, Form 4 insider filings, and congressional disclosures."
};

export default function DataSourcesPage() {
  return (
    <main className="space-y-6">
      <div>
        <Badge tone="blue">Original public-data architecture</Badge>
        <h1 className="mt-3 text-3xl font-semibold text-white">Data Sources</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          This version uses local mock data, but the product is shaped around public financial records and a clean normalization layer for future imports.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {publicDataSources.map((source) => (
          <Card key={source.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">{source.category}</p>
                <h2 className="mt-2 text-lg font-semibold text-white">{source.name}</h2>
              </div>
              <Badge tone={source.status === "Ready for Adapter" ? "mint" : source.status === "Planned" ? "amber" : "slate"}>
                {source.status}
              </Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{source.notes}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Cadence</dt>
                <dd className="text-slate-200">{source.cadence}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Normalized into</dt>
                <dd className="text-slate-200">{source.normalizedEntities.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Phase 2 path</dt>
                <dd className="font-mono text-xs text-mint">{source.phaseTwoPath}</dd>
              </div>
            </dl>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <SectionHeader title="Research Principles" eyebrow="How imports should behave" />
          <div className="space-y-3">
            {sourcePrinciples.map((principle) => (
              <div key={principle} className="rounded-md border border-line bg-ink/50 p-3 text-sm leading-6 text-slate-300">
                {principle}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Normalized Data Flow" eyebrow="Phase 2 pipeline" />
          <div className="grid gap-3 text-sm text-slate-300">
            <div className="rounded-md bg-ink/60 p-4">
              <span className="font-semibold text-white">1. Discover filings</span>
              <p className="mt-1">Find accession numbers, filing dates, form types, and document locations from public records.</p>
            </div>
            <div className="rounded-md bg-ink/60 p-4">
              <span className="font-semibold text-white">2. Preserve raw references</span>
              <p className="mt-1">Keep source identifiers and raw filing metadata so every normalized row can be traced.</p>
            </div>
            <div className="rounded-md bg-ink/60 p-4">
              <span className="font-semibold text-white">3. Normalize entities</span>
              <p className="mt-1">Map names, CIKs, tickers, CUSIPs, dates, and value ranges into the app interfaces.</p>
            </div>
            <div className="rounded-md bg-ink/60 p-4">
              <span className="font-semibold text-white">4. Generate explainable signals</span>
              <p className="mt-1">Create research cards only from transparent rules such as new position, large increase, late disclosure, or cluster buying.</p>
            </div>
          </div>
        </Card>
      </section>

      <Card>
        <SectionHeader title="Important Limitation" eyebrow="Signal timing" />
        <p className="mb-4 max-w-4xl text-sm leading-6 text-slate-300">
          A 13F is not real-time trading data. It can be filed up to 45 days after quarter end, so a May update can reflect holdings from March 31 rather than trades made in May. investina should combine slower portfolio snapshots with faster source types as the data layer matures.
        </p>
        <div className="overflow-x-auto rounded-md border border-line scrollbar-thin">
          <table className="min-w-full divide-y divide-line text-sm">
            <thead className="bg-ink/80">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-300">Signal</th>
                <th className="px-4 py-3 text-left font-medium text-slate-300">Typical timing</th>
                <th className="px-4 py-3 text-left font-medium text-slate-300">Best source</th>
                <th className="px-4 py-3 text-left font-medium text-slate-300">Why it matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-panel/70">
              {sourceTimingRows.map((row) => (
                <tr key={row.signal} className="hover:bg-panelSoft/60">
                  <td className="px-4 py-3 font-medium text-white">{row.signal}</td>
                  <td className="px-4 py-3 text-slate-300">{row.timing}</td>
                  <td className="px-4 py-3 text-mint">{row.bestSource}</td>
                  <td className="px-4 py-3 text-slate-400">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Disclaimer" eyebrow="Research use only" />
        <p className="text-slate-300">
          This website is for educational and research purposes only. It is not investment advice. Public filings may be delayed, incomplete, or amended.
        </p>
      </Card>
    </main>
  );
}
