import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">Signal not found</h1>
      <p className="mt-3 text-slate-300">
        The page you requested is not in the current mock research universe.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-mint px-4 py-2 text-sm font-semibold text-ink transition hover:bg-emerald-300"
      >
        Return to dashboard
      </Link>
    </main>
  );
}
