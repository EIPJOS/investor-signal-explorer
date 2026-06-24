export const sourceTimingRows = [
  {
    signal: "Hedge-fund portfolio snapshot",
    timing: "Quarterly, delayed",
    bestSource: "SEC Form 13F",
    note: "Useful for portfolio snapshots, not real-time trading."
  },
  {
    signal: "Activist stake or major ownership",
    timing: "Faster than 13F",
    bestSource: "SEC Schedule 13D / 13G",
    note: "Useful when ownership crosses beneficial-ownership thresholds."
  },
  {
    signal: "Insider purchase or sale",
    timing: "Usually within 2 business days",
    bestSource: "SEC Form 4",
    note: "Useful for officer, director, and 10% owner transactions."
  },
  {
    signal: "Congress transaction disclosure",
    timing: "Delayed, often weeks",
    bestSource: "House / Senate disclosures",
    note: "Useful for political trade monitoring, with disclosure-delay labels."
  },
  {
    signal: "Portfolio-company news",
    timing: "Near real time",
    bestSource: "Licensed or public news source",
    note: "Useful for context, but should be separated from filing-derived facts."
  }
];
