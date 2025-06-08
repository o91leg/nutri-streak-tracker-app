
import React from 'react';
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
import { Line } from 'react-chartjs-2';
import { subDays, format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  // Generate mock data for 28 days
  const generateMockData = (baseValue: number, variance: number) => {
    const data = [];
    for (let i = 27; i >= 0; i--) {
      data.push(Math.floor(Math.random() * variance) + baseValue);
    }
    return data;
  };

  const labels = Array.from({ length: 28 }, (_, i) => 
    format(subDays(new Date(), 27 - i), 'dd.MM')
  );

  const caloriesData = generateMockData(1800, 600);
  const proteinsData = generateMockData(120, 60);
  const fatsData = generateMockData(60, 40);
  const carbsData = generateMockData(220, 80);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const createChartData = (data: number[], color: string, label: string) => ({
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 2,
        fill: true,
        tension: 0.3,
      },
    ],
  });

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-foreground pt-4">
          Статистика
        </h1>

        <div className="space-y-6">
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">Калории (28 дней)</h3>
            <Line data={createChartData(caloriesData, '#3b82f6', 'Калории')} options={chartOptions} />
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">Белки (28 дней)</h3>
            <Line data={createChartData(proteinsData, '#ef4444', 'Белки')} options={chartOptions} />
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">Жиры (28 дней)</h3>
            <Line data={createChartData(fatsData, '#f59e0b', 'Жиры')} options={chartOptions} />
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">Углеводы (28 дней)</h3>
            <Line data={createChartData(carbsData, '#10b981', 'Углеводы')} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
