
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

  // Day navigation
  const goToPreviousDay = () => {
    const newDate = subDays(selectedDate, 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = addDays(selectedDate, 1);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    const today = startOfDay(new Date());
    setSelectedDate(today);
  };

  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-high-contrast pt-6 font-inter">
          Календарь питания
        </h1>

        {/* Selected Day Navigation */}
        <div className="apple-card p-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousDay}
              className="h-10 w-10 apple-button rounded-full border-0 bg-muted/40 hover:bg-muted/60 text-foreground active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="text-center">
              <div className="text-2xl font-semibold text-high-contrast font-inter">
                {format(selectedDate, 'dd MMMM', { locale: ru })}
              </div>
              <div className="text-base text-medium-contrast font-medium">
                {format(selectedDate, 'EEEE', { locale: ru })}
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextDay}
              className="h-10 w-10 apple-button rounded-full border-0 bg-muted/40 hover:bg-muted/60 text-foreground active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {!isToday && (
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="w-full apple-button rounded-xl border-0 bg-primary text-primary-foreground hover:bg-primary/90 font-medium active:scale-95"
            >
              Сегодня
            </Button>
          )}
        </div>

        {/* Daily Nutrition Summary */}
        <div className="apple-card p-6">
          <h2 className="text-xl font-semibold text-high-contrast mb-6 font-inter">
            Питание на {format(selectedDate, 'dd.MM', { locale: ru })}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="apple-card p-4 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10">
              <div className="flex flex-col items-center text-center">
                <span className="text-sm text-medium-contrast font-medium mb-1">Калории</span>
                <span className="text-2xl font-bold text-primary">{currentDayData.calories}</span>
                <span className="text-xs text-medium-contrast">ккал</span>
              </div>
            </div>
            <div className="apple-card p-4 bg-gradient-to-br from-sf-green/15 to-sf-green/5 border border-sf-green/10">
              <div className="flex flex-col items-center text-center">
                <span className="text-sm text-medium-contrast font-medium mb-1">Белки</span>
                <span className="text-2xl font-bold text-sf-green">{currentDayData.proteins}</span>
                <span className="text-xs text-medium-contrast">г</span>
              </div>
            </div>
            <div className="apple-card p-4 bg-gradient-to-br from-sf-orange/15 to-sf-orange/5 border border-sf-orange/10">
              <div className="flex flex-col items-center text-center">
                <span className="text-sm text-medium-contrast font-medium mb-1">Жиры</span>
                <span className="text-2xl font-bold text-sf-orange">{currentDayData.fats}</span>
                <span className="text-xs text-medium-contrast">г</span>
              </div>
            </div>
            <div className="apple-card p-4 bg-gradient-to-br from-sf-purple/15 to-sf-purple/5 border border-sf-purple/10">
              <div className="flex flex-col items-center text-center">
                <span className="text-sm text-medium-contrast font-medium mb-1">Углеводы</span>
                <span className="text-2xl font-bold text-sf-purple">{currentDayData.carbohydrates}</span>
                <span className="text-xs text-medium-contrast">г</span>
              </div>
            </div>
          </div>
        </div>

        {/* Consumed Dishes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-high-contrast font-inter">
            Съедено {isToday ? 'сегодня' : format(selectedDate, 'dd.MM')}
          </h2>
          <div className="space-y-3">
            {mockDishes.map((dish, index) => (
              <div key={index} className="apple-card p-4 flex justify-between items-center">
                <span className="text-high-contrast font-medium">{dish.dish_name}</span>
                <div className="apple-card px-3 py-1 bg-muted/60 border border-muted-foreground/10">
                  <span className="text-sm font-semibold text-high-contrast">{dish.calories} ккал</span>
                </div>
              </div>
            ))}
            
            {mockDishes.length === 0 && (
              <div className="text-center text-medium-contrast py-12">
                <div className="text-lg font-medium">На этот день данных нет</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
