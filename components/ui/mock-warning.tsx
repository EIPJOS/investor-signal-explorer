import { Badge } from "@/components/ui/badge";

export function MockWarning({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 rounded-md border border-amber-400/25 bg-amber-400/10 ${compact ? "px-3 py-2" : "p-3"}`}>
      <Badge tone="amber">Mock sample — not an actual disclosure</Badge>
      {!compact ? <p className="text-sm text-amber-100/80">Real people and public companies are shown with sample data until live filings are connected.</p> : null}
    </div>
  );
}
