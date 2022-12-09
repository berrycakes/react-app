import React from 'react';

export type Stock = {
  change: number;
  changePercent: number;
  close: number | null;
  companyName: string;
  currency: string;
  high: number | null;
  latestPrice: number;
  low: number | null;
  marketCap: number;
  open: number | null;
  previousClose: number;
  primaryExchange: string;
  symbol: string;
  week52High: number;
  week52Low: number;
  ytdChange: number;
};

const format = (value: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
};

const Stock = ({ data }: { data: Stock }) => {
  const {
    companyName,
    symbol,
    changePercent,
    latestPrice,
    currency,
    marketCap,
    change,
    previousClose,
    week52High,
    week52Low,
    ytdChange,
    primaryExchange,
  } = data;
  if (!data.symbol) return null;
  return (
    <div className="p-6 m-6 rounded-lg shadow-lg bg-white min-w-full">
      <div className="flex flex-row items-start justify-between">
        <h4 className="text-blue-500 text-2xl font-medium mb-2">
          {companyName}
        </h4>
        <h6 className="font-bold text-gray-400 ">{symbol}</h6>
      </div>
      <div className="flex flex-row items-center justify-between">
        <h4 className="text-gray-600 text-2xl font-medium mb-2">
          {format(latestPrice, currency)}
        </h4>
        <div
          className={`flex flex-col items-end ${
            change > 0 ? 'text-emerald-500' : 'text-red-400'
          }`}
        >
          <h6 className="font-bold">{format(change, currency)}</h6>
          <p className="text-sm">({changePercent}%)</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-sm text-gray-400">Primary Exchange</p>
        <p>{primaryExchange}</p>
        <p className="font-bold text-sm text-gray-400">Market Cap</p>
        <p>{format(marketCap, currency)}</p>
        <p className="font-bold text-sm text-gray-400">Previous Close</p>
        <p>{format(previousClose, currency)}</p>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="font-bold text-sm text-gray-400">52-Week High</p>
          <p>{format(week52High, currency)}</p>
          <p className="font-bold text-sm text-gray-400">52-Week Low</p>
          <p>{format(week52Low, currency)}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-bold text-sm text-gray-400">Year-to-date Change</p>
          <p className={change > 0 ? 'text-emerald-500' : 'text-red-400'}>
            {ytdChange.toFixed(4)} %
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stock;
