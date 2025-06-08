
import React, { useState } from 'react';
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
import { subWeeks, addWeeks, startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { locale: ru }));

  // Generate mock data for week
  const generateMockDataForWeek = (weekStart: Date, baseValue: number, variance: number) => {
    const weekDays = eachDayOfInterval({
      start: weekStart,
      end: endOfWeek(weekStart, { locale: ru })
    });
    
    return weekDays.map(day => {
      const seed = day.getTime();
      const x = Math.sin(seed) * 10000;
      return Math.floor((x - Math.floor(x)) * variance) + baseValue;
    });
  };

  // Week navigation
  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(startOfWeek(new Date(), { locale: ru }));
  };

  const weekDays = eachDayOfInterval({
    start: currentWeek,
    end: endOfWeek(currentWeek, { locale: ru })
  });

  const labels = weekDays.map(day => format(day, 'EEE', { locale: ru }));

  const caloriesData = generateMockDataForWeek(currentWeek, 1800, 600);
  const proteinsData = generateMockDataForWeek(currentWeek, 120, 60);
  const fatsData = generateMockDataForWeek(currentWeek, 60, 40);
  const carbsData = generateMockDataForWeek(currentWeek, 220, 80);

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

  const isCurrentWeek = format(currentWeek, 'yyyy-MM-dd') === format(startOfWeek(new Date(), { locale: ru }), 'yyyy-MM-dd');

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-foreground pt-4">
          Статистика
        </h1>

        {/* Week Navigation */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousWeek}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {format(currentWeek, 'dd', { locale: ru })} - {format(endOfWeek(currentWeek, { locale: ru }), 'dd MMMM', { locale: ru })}
              </div>
              <div className="text-sm text-muted-foreground">
                Неделя
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextWeek}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {!isCurrentWeek && (
            <Button
              variant="outline"
              size="sm"
              onClick={goToCurrentWeek}
              className="w-full"
            >
              Текущая неделя
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">Калории (неделя)</h3>
            <Line data={createChartData(caloriesData, '#3b82f6', 'Калории')} options={chartOptions} />
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">Белки (неделя)</h3>
            <Line data={createChartData(proteinsData, '#ef4444', 'Белки')} options={chartOptions} />
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">Жиры (неделя)</h3>
            <Line data={createChartData(fatsData, '#f59e0b', 'Жиры')} options={chartOptions} />
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">Углеводы (неделя)</h3>
            <Line data={createChartData(carbsData, '#10b981', 'Углеводы')} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
