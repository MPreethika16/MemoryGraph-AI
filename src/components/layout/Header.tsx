import React from 'react';
import { Search, Bell, User, Moon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex flex-1 items-center gap-4">
        <nav aria-label="Breadcrumb" className="hidden md:block">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <span>Home</span>
            </li>
            {pathnames.map((value, index) => (
              <React.Fragment key={value}>
                <li>/</li>
                <li className="font-medium text-foreground capitalize">
                  {value.replace('-', ' ')}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>

      <div className="flex-1 flex justify-center max-w-lg">
        <div className="relative w-full max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring sm:text-sm transition-colors"
            placeholder="Search documents, decisions, people..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-xs text-muted-foreground border px-1.5 rounded bg-background">⌘K</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end space-x-4">
        <button className="text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
        </button>
        <button className="text-muted-foreground hover:text-foreground">
          <Moon className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium border border-primary/30">
          U
        </div>
      </div>
    </header>
  );
}
