import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Library, MessageSquare, History, Network, Lightbulb, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Knowledge Library', href: '/library', icon: Library },
  { name: 'Ask MemoryGraph', href: '/chat', icon: MessageSquare },
  { name: 'Decision Replay', href: '/decision-replay', icon: History },
  { name: 'Knowledge Graph', href: '/knowledge-graph', icon: Network },
  { name: 'Insights', href: '/insights', icon: Lightbulb },
];

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 border-r bg-card h-full min-h-screen">
      <div className="h-16 flex items-center px-6 border-b">
        <Box className="w-6 h-6 text-primary mr-2" />
        <span className="font-bold text-lg tracking-tight">MemoryGraph AI</span>
      </div>
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </div>
      <div className="p-4 border-t text-xs text-muted-foreground">
        MemoryGraph AI © 2026
      </div>
    </div>
  );
}
