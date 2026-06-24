import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { slugify } from "@/data/congress-analytics";
import { investors } from "@/data/mock-data";
import type { Signal } from "@/data/types";

function confidenceTone(confidence: Signal["confidence"]) {
  if (confidence === "High") return "mint";
  if (confidence === "Medium") return "blue";
  return "amber";
}

function actorHref(signal: Signal) {
  const investor = investors.find((item) => item.name === signal.actor);
  if (investor) return `/investors/${investor.slug}`;
  if (signal.type === "Congress Purchase") return `/congress/politicians/${slugify(signal.actor)}`;
  if (signal.type === "Insider Cluster Buying") return "/insiders";
  if (signal.type === "Breaking News Related to a Holding") return `/stocks/${signal.ticker}#news`;
  return null;
}

export function SignalCard({ signal }: { signal: Signal }) {
  const relatedActorHref = actorHref(signal);

  return (
    <article className="rounded-md border border-line bg-panel/85 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge tone="slate">{signal.type}</Badge>
        <Badge tone={confidenceTone(signal.confidence)}>{signal.confidence}</Badge>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <Link href={`/stocks/${signal.ticker}`} className="font-semibold text-white hover:text-mint">
          {signal.ticker}
        </Link>
        <time className="text-xs text-slate-500">{new Date(signal.timestamp).toLocaleString()}</time>
      </div>
      {relatedActorHref ? (
        <Link href={relatedActorHref} className="mt-1 inline-block text-sm text-mint hover:text-mintSoft">
          {signal.actor}
        </Link>
      ) : (
        <p className="mt-1 text-sm text-mint">{signal.actor}</p>
      )}
      <p className="mt-3 text-sm leading-6 text-slate-300">{signal.explanation}</p>
    </article>
  );
}
