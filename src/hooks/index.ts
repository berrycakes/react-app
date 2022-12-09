import { useQuery } from '@tanstack/react-query';
import { STOCK_API } from '../api';

const QUOTE_CACHE_KEY = 'quote';
const SEARCH_CACHE_KEY = 'search';
const HISTORICAL_CACHE_KEY = 'historical';

export const useGetStockQuote = (symbol: string) => {
  return useQuery(
    [QUOTE_CACHE_KEY, symbol],
    () => STOCK_API.getStockQuote(symbol),
    {
      cacheTime: 60000,
      enabled: !!symbol,
    },
  );
};

export const useGetHistorical = (symbol: string) => {
  return useQuery(
    [HISTORICAL_CACHE_KEY, symbol],
    () => STOCK_API.getHistroricalPrice(symbol),
    {
      cacheTime: 60000,
      enabled: !!symbol,
    },
  );
};
