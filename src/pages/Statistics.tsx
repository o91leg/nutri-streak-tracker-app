
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
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#8E8E93',
          font: {
            family: 'Inter',
            size: 12,
            weight: '500',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(199, 199, 204, 0.3)',
          drawBorder: false,
        },
        ticks: {
          color: '#8E8E93',
          font: {
            family: 'Inter',
            size: 12,
            weight: '500',
          },
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
      line: {
        tension: 0.4,
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
        backgroundColor: `${color}15`,
        borderWidth: 3,
        fill: true,
        pointBackgroundColor: color,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  });

  const isCurrentWeek = format(currentWeek, 'yyyy-MM-dd') === format(startOfWeek(new Date(), { locale: ru }), 'yyyy-MM-dd');

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-foreground pt-6 font-inter">
          Статистика
        </h1>

        {/* Week Navigation */}
        <div className="apple-card-hover p-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousWeek}
              className="h-10 w-10 apple-button rounded-full border-0 bg-muted/50 hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="text-center">
              <div className="text-xl font-semibold text-foreground font-inter">
                {format(currentWeek, 'dd', { locale: ru })} - {format(endOfWeek(currentWeek, { locale: ru }), 'dd MMMM', { locale: ru })}
              </div>
              <div className="text-base text-muted-foreground font-medium">
                Неделя
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextWeek}
              className="h-10 w-10 apple-button rounded-full border-0 bg-muted/50 hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {!isCurrentWeek && (
            <Button
              variant="outline"
              size="sm"
              onClick={goToCurrentWeek}
              className="w-full apple-button rounded-xl border-0 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            >
              Текущая неделя
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <div className="apple-card-hover p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 font-inter">Калории</h3>
            <div className="h-48">
              <Line data={createChartData(caloriesData, '#007AFF', 'Калории')} options={chartOptions} />
            </div>
          </div>

          <div className="apple-card-hover p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 font-inter">Белки</h3>
            <div className="h-48">
              <Line data={createChartData(proteinsData, '#34C759', 'Белки')} options={chartOptions} />
            </div>
          </div>

          <div className="apple-card-hover p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 font-inter">Жиры</h3>
            <div className="h-48">
              <Line data={createChartData(fatsData, '#FF9500', 'Жиры')} options={chartOptions} />
            </div>
          </div>

          <div className="apple-card-hover p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 font-inter">Углеводы</h3>
            <div className="h-48">
              <Line data={createChartData(carbsData, '#AF52DE', 'Углеводы')} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
