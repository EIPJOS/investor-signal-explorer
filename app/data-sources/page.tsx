import type { Metadata } from "next";
import { Card, SectionHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Data Sources",
  description: "Future data source architecture for SEC 13F filings, EDGAR APIs, Form 4 insider filings, and congressional disclosures."
};

const sources = [
  { title: "SEC Form 13F filings", text: "Quarterly institutional holdings filed by investment managers that meet SEC reporting thresholds." },
  { title: "SEC EDGAR API", text: "Company submissions, filing metadata, accession numbers, and future import scheduling." },
  { title: "SEC Form 4 insider filings", text: "Officer, director, and beneficial owner transaction filings for insider activity monitoring." },
  { title: "House financial disclosures", text: "Periodic transaction reports published for members of the U.S. House of Representatives." },
  { title: "Senate financial disclosures", text: "Senate transaction disclosures for policymakers and related reporting delay analysis." }
];

export default function DataSourcesPage() {
  return (
    <main className="space-y-6">
      <div>
        <Badge tone="blue">Phase 2 architecture</Badge>
        <h1 className="mt-3 text-3xl font-semibold text-white">Data Sources</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          This version uses local mock data only. The source plan below shows where live SEC and congressional data will enter the system later.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sources.map((source) => (
          <Card key={source.title}>
            <h2 className="text-lg font-semibold text-white">{source.title}</h2>
            <p className="mt-3 leading-7 text-slate-300">{source.text}</p>
          </Card>
        ))}
      </div>
      <Card>
        <SectionHeader title="Disclaimer" eyebrow="Research use only" />
        <p className="text-slate-300">
          This website is for educational and research purposes only. It is not investment advice. Public filings may be delayed, incomplete, or amended.
        </p>
      </Card>
    </main>
  );
}
