
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
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center px-3 py-1 rounded-lg transition-colors",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
