
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, BarChart3, Home, Database, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Calendar, label: 'Календарь', path: '/calendar' },
    { icon: BarChart3, label: 'Статистика', path: '/statistics' },
    { icon: Home, label: 'Главная', path: '/' },
    { icon: Database, label: 'Данные', path: '/data' },
    { icon: User, label: 'Профиль', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 glass-effect border-t border-border/60">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center px-3 py-2 rounded-xl apple-smooth apple-button min-w-[60px]",
                isActive 
                  ? "text-primary bg-primary/15 border border-primary/20" 
                  : "text-foreground/70 hover:text-foreground hover:bg-muted/40"
              )}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn(
                "text-xs mt-1 font-medium font-inter",
                isActive ? "font-semibold text-primary" : "text-foreground/70"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
