import { Badge } from "@/components/ui/badge";
import type { Signal } from "@/data/types";

function confidenceTone(confidence: Signal["confidence"]) {
  if (confidence === "High") return "mint";
  if (confidence === "Medium") return "blue";
  return "amber";
}

export function SignalCard({ signal }: { signal: Signal }) {
  return (
    <article className="rounded-md border border-line bg-panel/85 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge tone="slate">{signal.type}</Badge>
        <Badge tone={confidenceTone(signal.confidence)}>{signal.confidence}</Badge>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-semibold text-white">{signal.ticker}</h3>
        <time className="text-xs text-slate-500">{new Date(signal.timestamp).toLocaleString()}</time>
      </div>
      <p className="mt-1 text-sm text-mint">{signal.actor}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{signal.explanation}</p>
    </article>
  );
}
