
import React from 'react';

interface CircularProgressProps {
  current: number;
  target: number;
  label: string;
  unit: string;
}

export const CircularProgress = ({ current, target, label, unit }: CircularProgressProps) => {
  const remaining = Math.max(0, target - current);
  const percentage = Math.min(100, (current / target) * 100);
  const strokeDasharray = 2 * Math.PI * 80; // radius = 80
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div className="relative w-48 h-48">
      <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-primary transition-all duration-300"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-foreground">{remaining}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">
          {current} / {target} {unit}
        </span>
      </div>
    </div>
  );
};
