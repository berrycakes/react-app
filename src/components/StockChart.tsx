import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type timeData = {
  close: number;
  symbol: string;
  priceDate: string;
};

const StockChart = ({ data, change }: { data: timeData[]; change: number }) => {
  console.log(change);
  const dataObject = {
    labels: data.map(daily => daily.priceDate),
    datasets: [
      {
        data: data.map(daily => daily.close),
        borderColor: change > 0 ? 'mediumaquamarine' : 'lightpink',
      },
    ],
  };
  if (!data.length) return null;

  return (
    <Line
      fallbackContent={<h5>no data to show</h5>}
      data={dataObject}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '12-month Historical Prices in USD',
          },
          legend: {
            display: false,
          },
        },
        layout: {
          padding: 16,
        },
        scales: {
          x: {
            reverse: true,
            grid: {
              display: false,
            },
          },
        },
        elements: {
          point: {
            hoverRadius: 4,
            hitRadius: 4,
            radius: 0,
          },
        },
      }}
    />
  );
};

export default StockChart;
