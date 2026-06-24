import {
  congressTrades,
  filings,
  getHoldingsByInvestor,
  getInvestor,
  getStock,
  getStockHolders,
  getStockSignals,
  holdings,
  insiderTrades,
  investors,
  newsItems,
  signals,
  stocks
} from "@/data/mock-data";

export const investorRepository = {
  listInvestors: () => investors,
  getInvestor,
  getHoldingsByInvestor,
  listFilings: () => filings,
  listHoldings: () => holdings
};

export const stockRepository = {
  listStocks: () => stocks,
  getStock,
  getStockHolders,
  getStockSignals
};

export const disclosureRepository = {
  listCongressTrades: () => congressTrades,
  listInsiderTrades: () => insiderTrades,
  listSignals: () => signals,
  listNews: () => newsItems
};
