"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { EmptyState } from "./empty-state";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
  align?: "left" | "right";
};

export function SortableTable<T>({
  rows,
  columns,
  emptyTitle = "No records",
  emptyText = "Try changing your filters."
}: {
  rows: T[];
  columns: Column<T>[];
  emptyTitle?: string;
  emptyText?: string;
}) {
  const [sortKey, setSortKey] = useState<string>(String(columns[0]?.key ?? ""));
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const activeColumn = columns.find((column) => String(column.key) === sortKey);

  const sortedRows = useMemo(() => {
    if (!activeColumn) return rows;
    return [...rows].sort((a, b) => {
      const aValue = activeColumn.sortValue?.(a) ?? String(activeColumn.accessor(a));
      const bValue = activeColumn.sortValue?.(b) ?? String(activeColumn.accessor(b));
      const comparison =
        typeof aValue === "number" && typeof bValue === "number"
          ? aValue - bValue
          : String(aValue).localeCompare(String(bValue));
      return direction === "asc" ? comparison : -comparison;
    });
  }, [activeColumn, direction, rows]);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setDirection((value) => (value === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setDirection("asc");
  }

  if (rows.length === 0) {
    return <EmptyState title={emptyTitle} text={emptyText} />;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-line scrollbar-thin">
      <table className="min-w-full divide-y divide-line text-sm">
        <thead className="bg-ink/80">
          <tr>
            {columns.map((column) => {
              const key = String(column.key);
              const active = key === sortKey;
              return (
                <th
                  key={key}
                  scope="col"
                  className={clsx(
                    "whitespace-nowrap px-4 py-3 font-medium text-slate-300",
                    column.align === "right" ? "text-right" : "text-left"
                  )}
                >
                  <button
                    className={`inline-flex items-center gap-1 ${column.align === "right" ? "justify-end" : ""}`}
                    onClick={() => toggleSort(key)}
                  >
                    {column.header}
                    {active ? direction === "asc" ? <ArrowUp size={13} /> : <ArrowDown size={13} /> : <ChevronsUpDown size={13} />}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-line bg-panel/70">
          {sortedRows.map((row, index) => (
            <tr key={index} className="hover:bg-panelSoft/60">
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={clsx(
                    "whitespace-nowrap px-4 py-3 text-slate-200",
                    column.align === "right" ? "text-right" : "text-left"
                  )}
                >
                  {column.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
