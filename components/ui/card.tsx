import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

export function Card({
  children,
  className,
  ...props
}: Readonly<ComponentPropsWithoutRef<"section">>) {
  return <section className={clsx("rounded-md border border-line bg-panel/88 p-5 shadow-glow", className)} {...props}>{children}</section>;
}

export function SectionHeader({
  eyebrow,
  title,
  action
}: Readonly<{ eyebrow?: string; title: string; action?: React.ReactNode }>) {
  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">{eyebrow}</p> : null}
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}
