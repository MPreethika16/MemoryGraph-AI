import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { MetricCard } from '@/components/shared/MetricCard';
import { ActivityTimeline } from '@/components/shared/ActivityTimeline';
import { Activity, ShieldAlert, CheckCircle, Network, TrendingUp, AlertTriangle, AlertCircle, Lightbulb, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const risks = [
    { id: 1, title: 'Payment Architecture document not updated in 420 days', severity: 'High' },
    { id: 2, title: 'Remote Work policy has conflicting versions', severity: 'High' },
    { id: 3, title: 'Billing System knowledge concentrated in 1 employee', severity: 'Medium' },
    { id: 4, title: '3 critical decisions missing rationale', severity: 'Low' },
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'Medium': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'Low': return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
      default: return null;
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-destructive/10 border-destructive/20';
      case 'Medium': return 'bg-amber-500/10 border-amber-500/20';
      case 'Low': return 'bg-muted/30 border-border';
      default: return 'bg-muted border-border';
    }
  };

  const decisionHighlights = [
    {
      id: 'd1',
      title: 'GraphQL Migration',
      description: 'Timeline: Proposal → Review → Approval → Rollout',
      date: '2026-06-10T10:00:00Z'
    },
    {
      id: 'd2',
      title: 'Payment Gateway Selection',
      description: 'Timeline: Research → Evaluation → Approval',
      date: '2026-06-05T14:30:00Z'
    }
  ];

  const trustTrends = [
    { label: 'HR Policies', score: 95, color: 'bg-emerald-500' },
    { label: 'Engineering Docs', score: 88, color: 'bg-emerald-400' },
    { label: 'Legacy Systems', score: 52, color: 'bg-amber-500' }
  ];

  const insights = [
    "Remote work documentation contains conflicting information across 2 sources.",
    "Billing migration rationale appears only in Slack discussions and not in official documents.",
    "Knowledge health improved by 12% this month."
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader 
        title="Organizational Memory Intelligence" 
        description="Monitor knowledge health, decision coverage, and organizational risks in real-time."
      />

      {/* SECTION 1: Executive Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Knowledge Health Score" 
          value="78%" 
          icon={Activity} 
          trend={{ value: "5%", isPositive: true }} 
          description="Overall fidelity and freshness"
        />
        <MetricCard 
          title="Decision Coverage" 
          value="84%" 
          icon={CheckCircle} 
          trend={{ value: "2%", isPositive: true }} 
          description="Decisions mapped to rationale"
        />
        <MetricCard 
          title="Knowledge Confidence" 
          value="91%" 
          icon={TrendingUp} 
          trend={{ value: "4%", isPositive: true }} 
          description="AI answer certainty index"
        />
        <MetricCard 
          title="Active Contradictions" 
          value="5" 
          icon={ShieldAlert} 
          trend={{ value: "2", isPositive: false }} 
          description="Conflicts across knowledge base"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* SECTION 2: Knowledge Risks */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-muted-foreground" />
              High-Priority Knowledge Risks
            </h3>
            <div className="grid gap-3">
              {risks.map(risk => (
                <div key={risk.id} className={cn("flex items-center gap-4 p-4 border rounded-lg", getSeverityBg(risk.severity))}>
                  {getSeverityIcon(risk.severity)}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{risk.title}</p>
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider opacity-70">
                    {risk.severity}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: MemoryGraph Insights */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              AI-Generated Insights
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {insights.map((insight, idx) => (
                <div key={idx} className="p-5 bg-card border rounded-xl shadow-sm flex flex-col justify-between">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{insight}"
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-primary">
                    <Network className="w-3 h-3" /> MemoryGraph AI
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: Decision Replay Highlights */}
          <section className="p-6 bg-card border rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Network className="w-5 h-5 text-muted-foreground" />
              Decision Replay Highlights
            </h3>
            <ActivityTimeline events={decisionHighlights} />
          </section>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* SECTION 4: Knowledge Ownership Risk */}
          <section className="p-6 bg-card border rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              Knowledge Concentration
            </h3>
            <p className="text-sm text-muted-foreground mb-6">What happens if this person leaves tomorrow?</p>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">Payments: Rahul</span>
                  <span className="text-destructive font-bold">87%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-destructive" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">Infra: Arjun</span>
                  <span className="text-amber-500 font-bold">75%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">Frontend: Megha</span>
                  <span className="text-emerald-500 font-bold">61%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '61%' }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: Knowledge Trust Center */}
          <section className="p-6 bg-card border rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-muted-foreground" />
              Answer Confidence Trends
            </h3>
            
            <div className="space-y-6">
              {trustTrends.map((trend, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-foreground">{trend.label}</span>
                    <span className="font-medium text-muted-foreground">{trend.score}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-1000", trend.color)} style={{ width: `${trend.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
