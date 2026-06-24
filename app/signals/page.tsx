import type { Metadata } from "next";
import { SignalsBrowser } from "@/components/signals/signals-browser";
import { MockWarning } from "@/components/ui/mock-warning";

export const metadata: Metadata = {
  title: "Signals",
  description: "Browse grouped market signals including hedge fund positions, Congress purchases, insider cluster buying, and related news."
};

export default function SignalsPage() {
  return (
    <main className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">Ownership intelligence</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Signals</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Sort and filter mock signals grouped by new hedge fund positions, large increases, Congress purchases, insider cluster buying, and holding-related news.
        </p>
      </div>
      <MockWarning />
      <SignalsBrowser />
    </main>
  );
}
