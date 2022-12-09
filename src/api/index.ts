const IEX_CLOUD_URL = 'https://api.iex.cloud/v1/data/core';
const IEX_CLOUD_API_KEY = import.meta.env.VITE_APP_IEX_API_PUBLIC_KEY;

const getStockQuote = async (symbol: string) => {
  const response = await fetch(
    `${IEX_CLOUD_URL}/quote/${symbol}?token=${IEX_CLOUD_API_KEY}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );
  const data = await response.json();
  if (!data.length) {
    throw new Error('Empty response from API');
  }
  return data;
};

const getHistroricalPrice = async (symbol: string) => {
  const response = await fetch(
    `${IEX_CLOUD_URL}/HISTORICAL_PRICES/${symbol}?range=1y&token=${IEX_CLOUD_API_KEY}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );
  const data = await response.json();
  if (!data.length) {
    throw new Error('Empty response from API');
  }
  return data;
};

export const STOCK_API = {
  getStockQuote,
  getHistroricalPrice,
};
