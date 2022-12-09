import React, { useEffect, useState } from 'react';
import { useGetHistorical, useGetStockQuote } from '../hooks';
import Stock, { Stock as StockType } from './Stock';
import StockChart from './StockChart';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const Home = () => {
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 500);
  const { data: quote } = useGetStockQuote(debouncedSearchTerm);
  const { data: historical } = useGetHistorical(debouncedSearchTerm);

  return (
    <section className="w-screen h-screen">
      <div className="grid max-w-screen max-h-screen px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="lg:flex lg:col-span-12">
          <h1 className="text-4xl font-bold">Stocks App</h1>
        </div>
        <div className="lg:col-span-12 flex flex-col justify-center items-center mb-4">
          <input
            type="text"
            id="query"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="min-w-[200px] max-w-[500px] block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
            placeholder="Search using stock ticker"
          />
          {debouncedSearchTerm && !quote?.[0].symbol ? (
            <p className="w-1/3 text-center mt-2 font-light text-red-400 text-sm">
              Cannot find matching stock for {debouncedSearchTerm}
            </p>
          ) : debouncedSearchTerm ? null : (
            <p className="w-1/3 text-center mt-2 font-light text-sm">
              For example, if you want to search for Apple's stock price, <br />{' '}
              you would type "AAPL".
            </p>
          )}
        </div>
        <div className="lg:col-span-4 flex items-center justify-center px-8">
          {quote && !quote.isLoading ? <Stock data={quote[0]} /> : null}
        </div>
        <div className="lg:col-span-8 flex items-center justify-center overflow-auto">
          {historical && !historical.isLoading ? (
            <StockChart data={historical} change={quote.change} />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Home;
