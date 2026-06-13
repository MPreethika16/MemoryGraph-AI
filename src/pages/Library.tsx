import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { MetricCard } from '@/components/shared/MetricCard';
import { 
  FileText, Link as LinkIcon, MessageSquare, ShieldCheck, 
  Settings, ArrowRight, Network, FileSpreadsheet,
  AlertTriangle, Users, CheckCircle, Database, Search, Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Library() {
  const intakeMethods = [
    { id: 1, title: 'PDF Documents', icon: FileText, formats: '.pdf', color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 2, title: 'Word Documents', icon: FileText, formats: '.docx, .doc', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 3, title: 'Web URLs', icon: LinkIcon, formats: 'https://...', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 4, title: 'Slack Threads', icon: MessageSquare, formats: 'OAuth Integration', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { id: 5, title: 'Meeting Notes', icon: Users, formats: 'Zoom, Teams', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 6, title: 'Company Policies', icon: ShieldCheck, formats: 'Notion, Confluence', color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const pipelineSteps = [
    'Upload', 'Extract Content', 'Identify Entities', 'Detect Decisions', 'Generate Relationships', 'Build Memory Graph'
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <PageHeader 
        title="Memory Ingestion Center" 
        description="Convert scattered files, conversations, and meetings into structured organizational memory."
      />

      {/* SECTION 7: Memory Creation Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Documents Processed" value="1,284" icon={Database} />
        <MetricCard title="Decisions Extracted" value="432" icon={CheckCircle} />
        <MetricCard title="Stakeholders Identified" value="86" icon={Users} />
        <MetricCard title="Relationships Created" value="8,942" icon={Network} />
      </div>

      {/* SECTION 2: Memory Processing Pipeline */}
      <section className="bg-card border rounded-2xl shadow-sm p-8">
        <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-muted-foreground" />
          Memory Processing Pipeline
        </h3>
        <div className="flex flex-wrap items-center gap-2 md:gap-4 justify-between w-full">
          {pipelineSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center flex-1 text-center min-w-[120px]">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-3 border border-primary/20">
                  {idx + 1}
                </div>
                <span className="text-xs font-semibold text-foreground">{step}</span>
              </div>
              {idx < pipelineSteps.length - 1 && (
                <div className="text-muted-foreground/50 hidden md:block">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* SECTION 1: Knowledge Intake Hub */}
      <section>
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-muted-foreground" />
          Knowledge Intake Hub
        </h3>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {intakeMethods.map(method => (
            <button key={method.id} className="bg-card border hover:border-primary/50 hover:shadow-md transition-all rounded-xl p-5 text-left flex flex-col items-start gap-4">
              <div className={cn("p-3 rounded-lg", method.bg)}>
                <method.icon className={cn("w-6 h-6", method.color)} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">{method.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{method.formats}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* SECTION 3: Recently Ingested Knowledge */}
          <section>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Recently Ingested Knowledge
            </h3>
            
            <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b flex items-start justify-between bg-muted/10 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <FileText className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Architecture Review.pdf</h4>
                    <p className="text-sm text-muted-foreground mt-1">Ingested 10 minutes ago</p>
                    <div className="flex gap-3 mt-3">
                      <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-md flex items-center gap-1"><CheckCircle className="w-3 h-3" /> 3 Decisions</span>
                      <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-md flex items-center gap-1"><Users className="w-3 h-3" /> 4 Stakeholders</span>
                      <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-md flex items-center gap-1"><FileSpreadsheet className="w-3 h-3" /> 2 Projects</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-500">94%</div>
                  <div className="text-xs font-medium text-muted-foreground">Trust Score</div>
                </div>
              </div>

              {/* SECTION 4: AI Extraction Preview */}
              <div className="p-6 bg-card">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">AI Extraction Preview</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  
                  <div>
                    <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1"><Users className="w-3 h-3 text-amber-500" /> Detected People</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Megha (Frontend Architect)</li>
                      <li>Rahul (Engineering Lead)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1"><Network className="w-3 h-3 text-purple-500" /> Detected Projects</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Mobile App Rewrite</li>
                      <li>Payments V2</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-rose-500" /> Detected Policies</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>API Security Standards</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" /> Detected Decisions</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Adopt GraphQL</li>
                      <li>Deprecate REST v1</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-500" /> Detected Risks</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>N+1 Query Vulnerability</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-destructive" /> Contradictions</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>None detected</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* SECTION 5: Decision Discovery */}
          <section className="bg-primary/5 border border-primary/20 rounded-2xl shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Search className="w-24 h-24" />
            </div>
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2 text-primary relative z-10">
              <Search className="w-5 h-5" />
              Decision Discovery
            </h3>
            
            <div className="bg-card border rounded-xl p-4 shadow-sm relative z-10 mb-4">
              <div className="text-xs font-semibold text-muted-foreground mb-1">Source Document:</div>
              <p className="text-sm font-medium text-blue-500 hover:underline cursor-pointer mb-4">Architecture Review.pdf</p>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Discovered Decision</div>
                    <p className="font-bold text-foreground">GraphQL Migration</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">91%</div>
                    <div className="text-[10px] text-muted-foreground">Confidence</div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary/90 transition-colors relative z-10">
              Add to Decision Replay
            </button>
          </section>

          {/* SECTION 6: Knowledge Quality Analysis */}
          <section className="bg-card border rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-muted-foreground" />
              Knowledge Quality
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium">Duplicate Documents</span>
                </div>
                <span className="text-xs font-bold px-2 py-1 bg-background border rounded">14</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Missing Owners</span>
                </div>
                <span className="text-xs font-bold text-destructive px-2 py-1 bg-background border border-destructive/20 rounded">89</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-500">Outdated Docs (&gt;1yr)</span>
                </div>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-500 px-2 py-1 bg-background border border-amber-500/20 rounded">241</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Conflicting Sources</span>
                </div>
                <span className="text-xs font-bold text-destructive px-2 py-1 bg-background border border-destructive/20 rounded">5</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
