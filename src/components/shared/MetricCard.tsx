import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
}

export function MetricCard({ title, value, icon: Icon, trend, description, className }: MetricCardProps) {
  return (
    <div className={cn("p-6 bg-card text-card-foreground rounded-xl border shadow-sm flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight">{value}</span>
      </div>
      {trend && (
        <p className={cn("text-xs mt-2 font-medium", trend.isPositive ? "text-emerald-600" : "text-destructive")}>
          {trend.isPositive ? "+" : "-"}{trend.value}
          <span className="text-muted-foreground font-normal ml-1">from last month</span>
        </p>
      )}
      {description && (
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      )}
    </div>
  );
}
