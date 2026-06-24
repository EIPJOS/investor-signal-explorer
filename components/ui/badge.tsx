import { clsx } from "clsx";

const toneMap = {
  mint: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  amber: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  red: "border-red-400/30 bg-red-400/10 text-red-200",
  slate: "border-slate-500/40 bg-slate-500/10 text-slate-200",
  blue: "border-sky-400/30 bg-sky-400/10 text-sky-200"
};

export function Badge({
  children,
  tone = "slate"
}: Readonly<{ children: React.ReactNode; tone?: keyof typeof toneMap }>) {
  return (
    <span className={clsx("inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium", toneMap[tone])}>
      {children}
    </span>
  );
}
