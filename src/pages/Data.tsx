
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';

const Data = () => {
  // Mock data - will be replaced with Supabase data
  const userMetrics = {
    weight: 75,
    height: 180,
    activity_level: 'Умеренная',
    goal: 'Поддержание веса',
  };

  const weightHistory = [
    { weight: 75.2, date: new Date() },
    { weight: 75.5, date: subDays(new Date(), 1) },
    { weight: 75.1, date: subDays(new Date(), 2) },
    { weight: 75.8, date: subDays(new Date(), 3) },
    { weight: 75.3, date: subDays(new Date(), 4) },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-foreground pt-4">
          Мои данные
        </h1>

        {/* User Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Основные показатели</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Вес:</span>
              <span className="font-medium text-foreground">{userMetrics.weight} кг</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Рост:</span>
              <span className="font-medium text-foreground">{userMetrics.height} см</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Активность:</span>
              <span className="font-medium text-foreground">{userMetrics.activity_level}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Цель:</span>
              <span className="font-medium text-foreground">{userMetrics.goal}</span>
            </div>
          </CardContent>
        </Card>

        {/* Weight History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">История веса</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {weightHistory.map((entry, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                  <span className="text-sm text-muted-foreground">
                    {format(entry.date, 'dd MMMM yyyy', { locale: ru })}
                  </span>
                  <span className="font-medium text-foreground">{entry.weight} кг</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* BMI Calculation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Индекс массы тела</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className="text-3xl font-bold text-foreground">
                {((userMetrics.weight / (userMetrics.height / 100)) ** 2).toFixed(1)}
              </span>
              <p className="text-sm text-muted-foreground mt-1">Нормальный вес</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Data;
