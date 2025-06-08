
import React, { useState } from 'react';
import { format, addDays, subDays, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));

  // Mock data generator
  const generateMockDataForDate = (date: Date) => {
    // Use date as seed for consistent data
    const seed = date.getTime();
    const random = (min: number, max: number) => {
      const x = Math.sin(seed) * 10000;
      return Math.floor((x - Math.floor(x)) * (max - min) + min);
    };
    
    return {
      date: startOfDay(date),
      calories: random(1500, 2500),
      proteins: random(80, 150),
      fats: random(40, 80),
      carbohydrates: random(150, 300),
    };
  };

  const mockDishes = [
    { dish_name: 'Овсяная каша с ягодами', calories: 320, date: selectedDate },
    { dish_name: 'Куриная грудка гриль', calories: 250, date: selectedDate },
    { dish_name: 'Греческий салат', calories: 180, date: selectedDate },
    { dish_name: 'Банан', calories: 95, date: selectedDate },
    { dish_name: 'Орехи миндаль', calories: 160, date: selectedDate },
  ];

  const currentDayData = generateMockDataForDate(selectedDate);

  const goToPreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };

  const goToNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const goToToday = () => {
    setSelectedDate(startOfDay(new Date()));
  };

  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-foreground pt-4">
          Календарь питания
        </h1>

        {/* Date Navigation */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousDay}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {format(selectedDate, 'dd MMMM', { locale: ru })}
              </div>
              <div className="text-sm text-muted-foreground">
                {format(selectedDate, 'EEEE', { locale: ru })}
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextDay}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {!isToday && (
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="w-full"
            >
              Сегодня
            </Button>
          )}
        </div>

        {/* Daily Nutrition Summary */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Питание на {format(selectedDate, 'dd.MM', { locale: ru })}
          </h2>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-muted-foreground">Калории:</span>
              <span className="text-foreground font-medium">{currentDayData.calories} ккал</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-muted-foreground">Белки:</span>
              <span className="text-foreground font-medium">{currentDayData.proteins} г</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-muted-foreground">Жиры:</span>
              <span className="text-foreground font-medium">{currentDayData.fats} г</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-muted-foreground">Углеводы:</span>
              <span className="text-foreground font-medium">{currentDayData.carbohydrates} г</span>
            </div>
          </div>
        </div>

        {/* Consumed Dishes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Съедено {isToday ? 'сегодня' : format(selectedDate, 'dd.MM')}
          </h2>
          <div className="space-y-2">
            {mockDishes.map((dish, index) => (
              <div key={index} className="bg-card rounded-lg p-3 border border-border flex justify-between items-center">
                <span className="text-foreground">{dish.dish_name}</span>
                <span className="text-sm text-muted-foreground">{dish.calories} ккал</span>
              </div>
            ))}
            
            {mockDishes.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                На этот день данных нет
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
