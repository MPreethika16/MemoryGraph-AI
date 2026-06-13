import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { MetricCard } from '@/components/shared/MetricCard';
import { ActivityTimeline } from '@/components/shared/ActivityTimeline';
import { Activity, ShieldAlert, CheckCircle, Network, TrendingUp, AlertTriangle, AlertCircle, Lightbulb, Users, FileText, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemoryGraph } from '@/context/MemoryGraphContext';

export default function Dashboard() {
  const { latestIngestion } = useMemoryGraph();
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

  const activeStakeholders = latestIngestion?.insights?.stakeholders?.length 
    ? latestIngestion.insights.stakeholders.map((name, idx) => ({
        name,
        score: Math.max(20, 95 - (idx * 15)) // Descending scores: 95, 80, 65, 50...
      }))
    : [
        { name: 'Rahul (Payments)', score: 87 },
        { name: 'Arjun (Infra)', score: 75 },
        { name: 'Megha (Frontend)', score: 61 }
      ];

  const getRiskDetails = (score: number) => {
    if (score >= 80) return { label: 'HIGH RISK', colorClass: 'text-destructive', bgClass: 'bg-destructive' };
    if (score >= 60) return { label: 'MEDIUM RISK', colorClass: 'text-amber-500', bgClass: 'bg-amber-500' };
    return { label: 'LOW RISK', colorClass: 'text-emerald-500', bgClass: 'bg-emerald-500' };
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader 
        title="Organizational Memory Intelligence" 
        description="Monitor knowledge health, decision coverage, and organizational risks in real-time."
      />

      {/* SECTION 0: Latest Memory Created Hero */}
      {latestIngestion && (
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 shadow-sm relative overflow-hidden animate-in slide-in-from-top-4 fade-in duration-700">
          <div className="absolute -right-10 -top-10 opacity-5">
            <Network className="w-64 h-64" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-md animate-pulse">New Memory Created</span>
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <FileText className="w-4 h-4" /> {latestIngestion.filename}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mt-2">
                Primary Decision: {latestIngestion.insights.decisions?.[0] || 'Undiscovered'}
              </h2>
              <div className="flex gap-4 mt-4">
                <div className="flex -space-x-2">
                  {latestIngestion.insights.stakeholders?.slice(0, 3).map((s, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-bold text-secondary-foreground" title={s}>
                      {s.charAt(0).toUpperCase()}
                    </div>
                  ))}
                  {latestIngestion.insights.stakeholders?.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-bold text-muted-foreground">
                      +{latestIngestion.insights.stakeholders.length - 3}
                    </div>
                  )}
                </div>
                {latestIngestion.insights.stakeholders?.length === 0 && (
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" /> No stakeholders identified
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-right bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-primary/10">
              <div className="text-4xl font-black text-emerald-500">92%</div>
              <div className="text-sm font-semibold text-muted-foreground mt-1 uppercase tracking-wider">AI Confidence Score</div>
            </div>
          </div>
        </div>
      )}


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

          {/* SECTION 2: AI Discovery Panel (Dynamic) */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              AI Discovery Panel
            </h3>
            
            {latestIngestion ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-5 bg-card border border-emerald-500/20 rounded-xl shadow-sm flex flex-col">
                  <div className="flex items-center gap-2 text-emerald-500 font-semibold text-sm mb-3">
                    <CheckCircle className="w-4 h-4" /> Decisions Detected
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {latestIngestion.insights.decisions.length ? latestIngestion.insights.decisions.map((d, i) => (
                      <span key={i} className="px-2 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs rounded-md border border-emerald-500/20">{d}</span>
                    )) : <span className="text-xs text-muted-foreground">None</span>}
                  </div>
                </div>

                <div className="p-5 bg-card border border-amber-500/20 rounded-xl shadow-sm flex flex-col">
                  <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm mb-3">
                    <Users className="w-4 h-4" /> Stakeholders Detected
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {latestIngestion.insights.stakeholders.length ? latestIngestion.insights.stakeholders.map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs rounded-md border border-amber-500/20">{s}</span>
                    )) : <span className="text-xs text-muted-foreground">None</span>}
                  </div>
                </div>

                <div className="p-5 bg-card border border-purple-500/20 rounded-xl shadow-sm flex flex-col">
                  <div className="flex items-center gap-2 text-purple-500 font-semibold text-sm mb-3">
                    <Network className="w-4 h-4" /> Projects Detected
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {latestIngestion.insights.projects.length ? latestIngestion.insights.projects.map((p, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs rounded-md border border-purple-500/20">{p}</span>
                    )) : <span className="text-xs text-muted-foreground">None</span>}
                  </div>
                </div>

                <div className="p-5 bg-card border border-destructive/20 rounded-xl shadow-sm flex flex-col sm:col-span-2 lg:col-span-3">
                  <div className="flex items-center gap-2 text-destructive font-semibold text-sm mb-3">
                    <AlertTriangle className="w-4 h-4" /> Critical Risks & Contradictions
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground mb-2">Risks</h4>
                      <div className="flex flex-col gap-2">
                        {latestIngestion.insights.risks.length ? latestIngestion.insights.risks.map((r, i) => (
                          <div key={i} className="text-xs bg-destructive/10 text-destructive p-2 rounded-md border border-destructive/20 flex gap-2">
                            <ShieldAlert className="w-3 h-3 shrink-0 mt-0.5" /> {r}
                          </div>
                        )) : <span className="text-xs text-muted-foreground">No critical risks detected.</span>}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground mb-2">Contradictions</h4>
                      <div className="flex flex-col gap-2">
                        {latestIngestion.insights.contradictions.length ? latestIngestion.insights.contradictions.map((c, i) => (
                          <div key={i} className="text-xs bg-orange-500/10 text-orange-600 dark:text-orange-400 p-2 rounded-md border border-orange-500/20 flex gap-2">
                            <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" /> {c}
                          </div>
                        )) : <span className="text-xs text-muted-foreground">No contradictions found.</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-dashed rounded-2xl shadow-sm overflow-hidden p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <Database className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">Waiting for Ingestion</h4>
                <p className="text-sm text-muted-foreground max-w-sm mt-2">
                  Upload a document in the Memory Library to see the AI Discovery Panel come to life.
                </p>
              </div>
            )}
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
            
            <div className="space-y-6">
              {activeStakeholders.map((stakeholder, idx) => {
                const risk = getRiskDetails(stakeholder.score);
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-end mb-1.5">
                      <div>
                        <span className="font-medium text-sm text-foreground block">{stakeholder.name}</span>
                        <span className={cn("text-[10px] font-bold uppercase tracking-wider", risk.colorClass)}>
                          {risk.label}
                        </span>
                      </div>
                      <span className={cn("font-bold text-sm", risk.colorClass)}>{stakeholder.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full transition-all duration-1000", risk.bgClass)} style={{ width: `${stakeholder.score}%` }}></div>
                    </div>
                  </div>
                );
              })}
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
