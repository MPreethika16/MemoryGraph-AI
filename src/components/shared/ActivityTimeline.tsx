import React from 'react';
import { cn } from '@/lib/utils';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function ActivityTimeline({ events, className }: ActivityTimelineProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {events.map((event, index) => (
        <div key={event.id} className="relative pl-6">
          {index !== events.length - 1 && (
            <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-border" />
          )}
          <div className="absolute left-0 top-1.5 w-6 h-6 bg-background rounded-full border flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium">{event.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-sm mt-2 text-muted-foreground">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
