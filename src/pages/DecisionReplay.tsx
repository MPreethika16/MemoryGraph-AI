import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { 
  Search, CheckCircle, TrendingUp, Users, FileText, MessageSquare, 
  AlertTriangle, ShieldCheck, FileQuestion, ArrowRight, XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DecisionReplay() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <PageHeader 
        title="Decision Replay" 
        description="Reconstruct the organizational memory and rationale behind key decisions."
      />

      {/* SECTION 1: Decision Search */}
      <div className="relative max-w-3xl mx-auto mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="block w-full pl-14 pr-4 py-4 text-lg border-2 border-primary/20 rounded-xl leading-5 bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm transition-all"
          placeholder="e.g. Why did we migrate to GraphQL?"
          defaultValue="Why did we migrate to GraphQL?"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">↵ Enter</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Main Column */}
        <div className="lg:col-span-8 space-y-8">

          {/* SECTION 2: Decision Summary Card */}
          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold tracking-tight">GraphQL Migration</h2>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-full text-xs font-semibold uppercase tracking-wide flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Approved
                  </span>
                </div>
                <p className="text-muted-foreground">Decided on October 14, 2025</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">92%</div>
                <div className="text-sm font-medium text-muted-foreground mt-1">Confidence Score</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Business Impact</p>
                <p className="font-medium text-foreground">High</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Documents</p>
                <p className="font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> 7</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Meetings</p>
                <p className="font-medium flex items-center gap-2"><Users className="w-4 h-4 text-amber-500" /> 3</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Slack Threads</p>
                <p className="font-medium flex items-center gap-2"><MessageSquare className="w-4 h-4 text-blue-500" /> 2</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">TL;DR Rationale</h4>
              <p className="text-muted-foreground leading-relaxed">
                Migrated from REST to GraphQL to solve over-fetching issues on the mobile client and improve developer velocity for frontend teams. Performance concerns were heavily debated but resolved via query complexity limiting.
              </p>
            </div>
          </div>

          {/* SECTION 3: Decision Timeline */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-muted-foreground" />
              Decision Timeline
            </h3>
            
            <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-[1.1rem] before:w-0.5 before:-translate-x-px before:bg-border md:before:mx-auto md:before:translate-x-0">
              
              {/* Proposal */}
              <div className="relative">
                <div className="absolute -left-10 w-5 h-5 rounded-full bg-primary ring-4 ring-background z-10"></div>
                <div className="bg-card border rounded-xl p-5 shadow-sm ml-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase text-primary tracking-wider">Proposal</span>
                    <span className="text-xs text-muted-foreground">Sep 01, 2025</span>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Initial RFC Published</h4>
                  <p className="text-sm text-muted-foreground mb-3">Megha proposed moving to GraphQL to fix mobile performance degradation caused by multiple REST roundtrips.</p>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs"><FileText className="w-3 h-3" /> RFC-42</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs"><Users className="w-3 h-3" /> Megha</span>
                  </div>
                </div>
              </div>

              {/* Discussion */}
              <div className="relative">
                <div className="absolute -left-10 w-5 h-5 rounded-full bg-amber-500 ring-4 ring-background z-10"></div>
                <div className="bg-card border rounded-xl p-5 shadow-sm ml-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase text-amber-500 tracking-wider">Discussion</span>
                    <span className="text-xs text-muted-foreground">Sep 15, 2025</span>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Engineering All-Hands Debate</h4>
                  <p className="text-sm text-muted-foreground mb-3">Backend team raised concerns about N+1 query problems and caching difficulties compared to standard REST endpoints.</p>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs"><MessageSquare className="w-3 h-3" /> #eng-architecture</span>
                  </div>
                </div>
              </div>

              {/* Review */}
              <div className="relative">
                <div className="absolute -left-10 w-5 h-5 rounded-full bg-blue-500 ring-4 ring-background z-10"></div>
                <div className="bg-card border rounded-xl p-5 shadow-sm ml-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase text-blue-500 tracking-wider">Review</span>
                    <span className="text-xs text-muted-foreground">Oct 05, 2025</span>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Architecture Committee Review</h4>
                  <p className="text-sm text-muted-foreground mb-3">Evaluated dataloader implementations to mitigate N+1. Approved Apollo Server as the gateway.</p>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs"><FileText className="w-3 h-3" /> Architecture Notes</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs"><Users className="w-3 h-3" /> Arjun, Rahul</span>
                  </div>
                </div>
              </div>

              {/* Approval */}
              <div className="relative">
                <div className="absolute -left-10 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-background z-10"></div>
                <div className="bg-card border rounded-xl p-5 shadow-sm ml-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase text-emerald-500 tracking-wider">Approval</span>
                    <span className="text-xs text-muted-foreground">Oct 14, 2025</span>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Final CTO Sign-off</h4>
                  <p className="text-sm text-muted-foreground mb-3">Decision officially approved for Q1 roadmap implementation.</p>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 4: Alternatives Considered */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <FileQuestion className="w-6 h-6 text-muted-foreground" />
              Alternatives Considered
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-lg">Option A: REST API Improvements</h4>
                  <span className="bg-destructive/10 text-destructive px-2 py-1 rounded text-xs font-bold uppercase">Rejected</span>
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1 block">Pros</span>
                    <p className="text-sm text-muted-foreground">No new infrastructure, relies on existing knowledge.</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-destructive uppercase tracking-wider mb-1 block">Cons</span>
                    <p className="text-sm text-muted-foreground">Doesn't solve the core over-fetching issue on mobile.</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Reason Rejected</span>
                  <p className="text-sm">Maintenance burden of creating bespoke BFF (Backend-for-Frontend) endpoints was too high.</p>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-lg text-primary">Option B: GraphQL</h4>
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold uppercase">Selected</span>
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1 block">Pros</span>
                    <p className="text-sm text-foreground">Exact data fetching, unified graph, excellent developer tooling.</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-destructive uppercase tracking-wider mb-1 block">Cons</span>
                    <p className="text-sm text-foreground">Caching complexity, steep learning curve.</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-primary/20">
                  <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider mb-1 block">Reason Selected</span>
                  <p className="text-sm font-medium">Long-term velocity gains outweighed short-term infrastructure costs.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">

          {/* SECTION 7: Knowledge Confidence Analysis */}
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Confidence Analysis
            </h3>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">92%</span>
              <span className="text-sm font-medium text-emerald-500">High Trust</span>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Signals</h4>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                <p className="text-sm text-foreground">Multiple independent sources correlate</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                <p className="text-sm text-foreground">Official architecture document present</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                <p className="text-sm text-foreground">Leadership approval notes detected</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />
                <p className="text-sm text-muted-foreground">Missing implementation retrospective</p>
              </div>
            </div>
          </div>

          {/* SECTION 8: Potential Contradictions */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Potential Contradictions
            </h3>
            <div className="space-y-4">
              <div className="bg-background p-3 rounded border text-sm">
                <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">Source A (RFC)</span>
                "Performance concerns on mobile were the primary driver."
              </div>
              <div className="flex justify-center">
                <XCircle className="w-5 h-5 text-destructive/50" />
              </div>
              <div className="bg-background p-3 rounded border text-sm">
                <span className="text-xs font-bold text-muted-foreground uppercase block mb-1">Source B (Slack)</span>
                "Developer productivity was the main reason we pushed this."
              </div>
              <p className="text-xs text-destructive font-medium mt-2">
                Flag: Potential Narrative Conflict in historical records.
              </p>
            </div>
          </div>

          {/* SECTION 5: Stakeholders */}
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              Key Stakeholders
            </h3>
            <div className="space-y-4">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">M</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Megha</p>
                  <p className="text-xs text-muted-foreground">Frontend Architect</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium bg-muted px-2 py-0.5 rounded">Inf: High</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 font-bold">R</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Rahul</p>
                  <p className="text-xs text-muted-foreground">Engineering Lead</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium bg-muted px-2 py-0.5 rounded">Inf: Med</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 font-bold">A</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Arjun</p>
                  <p className="text-xs text-muted-foreground">CTO</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium bg-muted px-2 py-0.5 rounded">Inf: High</div>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 6: Evidence Sources */}
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              Evidence Sources
            </h3>
            <div className="space-y-3">
              <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border">
                <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Architecture Review.pdf</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Oct 05, 2025 • Trust: 98%</p>
                </div>
              </a>
              <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border">
                <Users className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Engineering Meeting Notes</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Sep 15, 2025 • Trust: 85%</p>
                </div>
              </a>
              <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border">
                <MessageSquare className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Slack Discussion Thread</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Sep 01, 2025 • Trust: 70%</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
