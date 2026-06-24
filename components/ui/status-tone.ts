import type { HoldingStatus } from "@/data/types";

export function holdingStatusTone(status: HoldingStatus) {
  if (status === "New") return "mint";
  if (status === "Increased") return "blue";
  if (status === "Reduced") return "rose";
  return "red";
}
