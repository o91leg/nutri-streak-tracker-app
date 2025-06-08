
import React from 'react';
import { format, subDays, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';

const Calendar = () => {
  // Mock data - will be replaced with Supabase data
  const generateMockData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      data.push({
        date: startOfDay(date),
        calories: Math.floor(Math.random() * 500) + 1500,
        proteins: Math.floor(Math.random() * 50) + 100,
        fats: Math.floor(Math.random() * 30) + 50,
        carbohydrates: Math.floor(Math.random() * 100) + 200,
      });
    }
    return data;
  };

  const weekData = generateMockData();
  
  const mockDishes = [
    { dish_name: 'Овсяная каша', calories: 320, date: new Date() },
    { dish_name: 'Куриная грудка', calories: 250, date: new Date() },
    { dish_name: 'Греческий салат', calories: 180, date: new Date() },
    { dish_name: 'Банан', calories: 95, date: new Date() },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-foreground pt-4">
          Календарь питания
        </h1>

        {/* Timeline */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Неделя</h2>
          <div className="space-y-3">
            {weekData.map((day, index) => (
              <div key={index} className="bg-card rounded-lg p-4 border border-border">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-foreground">
                    {format(day.date, 'dd MMMM', { locale: ru })}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {format(day.date, 'EEEE', { locale: ru })}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Калории:</span>
                    <span className="text-foreground">{day.calories} ккал</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Белки:</span>
                    <span className="text-foreground">{day.proteins} г</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Жиры:</span>
                    <span className="text-foreground">{day.fats} г</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Углеводы:</span>
                    <span className="text-foreground">{day.carbohydrates} г</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consumed Dishes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Сегодня съедено</h2>
          <div className="space-y-2">
            {mockDishes.map((dish, index) => (
              <div key={index} className="bg-card rounded-lg p-3 border border-border flex justify-between items-center">
                <span className="text-foreground">{dish.dish_name}</span>
                <span className="text-sm text-muted-foreground">{dish.calories} ккал</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
