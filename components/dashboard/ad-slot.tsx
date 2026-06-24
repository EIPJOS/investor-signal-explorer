export function AdSlot({ label = "Sponsor" }: { label?: string }) {
  return (
    <aside className="flex min-h-28 items-center justify-center rounded-md border border-dashed border-line bg-ink/35 px-4 py-6 text-center text-xs uppercase tracking-[0.18em] text-slate-600">
      {label}
    </aside>
  );
}
