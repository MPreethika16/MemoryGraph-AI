import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { MetricCard } from '@/components/shared/MetricCard';
import { ShieldAlert, Activity, TrendingDown, RefreshCcw } from 'lucide-react';

export default function Insights() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Knowledge Insights" 
        description="Knowledge Health, Contradictions, Confidence Trends, and Organizational Risks."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Health Score" value="78/100" icon={Activity} trend={{ value: "5", isPositive: false }} />
        <MetricCard title="Detected Contradictions" value="12" icon={ShieldAlert} trend={{ value: "2", isPositive: false }} />
        <MetricCard title="Confidence Gap" value="14%" icon={TrendingDown} trend={{ value: "1%", isPositive: true }} />
        <MetricCard title="Stale Documents" value="45" icon={RefreshCcw} trend={{ value: "10", isPositive: false }} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-card border rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-destructive flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5" /> 
            Active Contradictions
          </h3>
          <ul className="space-y-4">
            <li className="p-4 bg-destructive/10 rounded-lg text-sm">
              <p className="font-medium text-foreground">Auth Architecture Conflict</p>
              <p className="text-muted-foreground mt-1">Doc "Q3 Roadmap" states Okta, but ADR "Database Migration" implies custom auth.</p>
            </li>
            <li className="p-4 bg-destructive/10 rounded-lg text-sm">
              <p className="font-medium text-foreground">Stale Policy</p>
              <p className="text-muted-foreground mt-1">"Remote Work Guidelines" contradicts recent CEO announcement in Slack.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
