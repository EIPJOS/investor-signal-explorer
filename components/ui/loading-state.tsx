export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="rounded-md border border-line bg-panel px-5 py-4 text-sm text-slate-300">
        <span className="mr-3 inline-block h-2 w-2 animate-pulse rounded-full bg-mint" />
        {label}
      </div>
    </div>
  );
}
