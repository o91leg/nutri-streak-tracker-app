
import React from 'react';

interface ProgressBarProps {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

export const ProgressBar = ({ label, current, target, unit, color }: ProgressBarProps) => {
  const percentage = Math.min(100, (current / target) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">
          {current} / {target} {unit}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
