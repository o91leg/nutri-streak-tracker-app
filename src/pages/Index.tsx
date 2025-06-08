
import React from 'react';
import { CircularProgress } from '@/components/CircularProgress';
import { ProgressBar } from '@/components/ProgressBar';
import { Flame } from 'lucide-react';

const Index = () => {
  // Mock data - will be replaced with Supabase data
  const username = "Oleg";
  const streak = 1;
  const todayCalories = 250;
  const targetCalories = 2000;
  const todayProteins = 15;
  const targetProteins = 150;
  const todayFats = 10;
  const targetFats = 67;
  const todayCarbs = 30;
  const targetCarbs = 250;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-4">
          <h1 className="text-2xl font-medium text-foreground">
            Добрый день, {username}!
          </h1>
          <div className="flex items-center justify-center mt-2 text-orange-500">
            <Flame className="w-5 h-5 mr-1" />
            <span className="text-sm">{streak} день подряд</span>
          </div>
        </div>

        {/* Circular Progress for Calories */}
        <div className="flex justify-center">
          <CircularProgress
            current={todayCalories}
            target={targetCalories}
            label="осталось"
            unit="ккал"
          />
        </div>

        {/* Macronutrients Progress Bars */}
        <div className="space-y-4">
          <ProgressBar
            label="Белки"
            current={todayProteins}
            target={targetProteins}
            unit="г"
            color="bg-blue-500"
          />
          <ProgressBar
            label="Жиры"
            current={todayFats}
            target={targetFats}
            unit="г"
            color="bg-yellow-500"
          />
          <ProgressBar
            label="Углеводы"
            current={todayCarbs}
            target={targetCarbs}
            unit="г"
            color="bg-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
