import React from 'react';
import { 
  MessageSquare, History, FileText, CheckCircle, AlertTriangle, 
  Users, Network, Send, Zap, ChevronRight, ShieldCheck, FileQuestion
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Chat() {
  const history = [
    { id: 1, title: 'GraphQL Migration', active: true },
    { id: 2, title: 'Remote Work Policy', active: false },
    { id: 3, title: 'Payment Gateway Decision', active: false },
    { id: 4, title: 'Billing Architecture', active: false },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 animate-in fade-in duration-500 pb-4">
      
      {/* LEFT PANEL: Conversation History */}
      <div className="w-64 flex flex-col bg-card border rounded-2xl shadow-sm overflow-hidden hidden lg:flex">
        <div className="p-4 border-b bg-muted/20 flex items-center gap-2">
          <History className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-semibold text-sm">Conversation History</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {history.map(item => (
            <button 
              key={item.id} 
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                item.active 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="truncate">{item.title}</span>
            </button>
          ))}
        </div>
        <div className="p-4 border-t">
          <button className="w-full py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" /> New Investigation
          </button>
        </div>
      </div>

      {/* CENTER PANEL: Chat Conversation */}
      <div className="flex-1 flex flex-col bg-card border rounded-2xl shadow-sm overflow-hidden relative">
        <div className="p-4 border-b bg-muted/20 flex items-center justify-between sticky top-0 z-10 backdrop-blur">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Organizational Memory Investigator
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* User Message */}
          <div className="flex justify-end">
            <div className="bg-primary text-primary-foreground px-5 py-3 rounded-2xl rounded-tr-sm max-w-xl text-sm font-medium shadow-sm">
              Why did we migrate to GraphQL? Who was involved in that decision?
            </div>
          </div>

          {/* AI Response */}
          <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 mt-1 border border-primary/30">
              M
            </div>
            <div className="flex-1 space-y-6">
              
              {/* 1. Direct Answer */}
              <div className="text-sm leading-relaxed text-foreground">
                <p className="mb-4">
                  Based on organizational records, the migration to GraphQL (approved October 14, 2025) was driven primarily by <strong>over-fetching issues on the mobile client</strong> and the need to <strong>improve developer velocity</strong> for frontend teams.
                </p>
                <p>
                  While the backend team raised concerns about N+1 query problems, the Architecture Committee evaluated dataloader implementations and approved Apollo Server as the gateway to mitigate these risks.
                </p>
              </div>

              {/* 2. Decision Replay / Timeline Preview */}
              <div className="bg-muted/30 border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-sm flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Decision: GraphQL Migration
                  </h4>
                  <p className="text-xs text-muted-foreground">Status: Approved • Impact: High</p>
                </div>
                <Link to="/decision-replay" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center gap-2 shrink-0">
                  <Network className="w-4 h-4" />
                  View Full Decision Replay
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 3. Supporting Sources */}
                <div className="border rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> Evidence Sources (12)
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-primary hover:underline cursor-pointer">Architecture Review.pdf</span>
                      <span className="text-xs bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded">High Trust</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-primary hover:underline cursor-pointer">Eng Sync Notes</span>
                      <span className="text-xs bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded">Med Trust</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-primary hover:underline cursor-pointer">#eng-architecture</span>
                      <span className="text-xs bg-blue-500/10 text-blue-600 px-1.5 py-0.5 rounded">Slack</span>
                    </li>
                  </ul>
                </div>

                {/* 4. Contradictions & Insights */}
                <div className="border border-destructive/20 bg-destructive/5 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-destructive mb-3 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Memory Insights
                  </h4>
                  <p className="text-sm text-foreground mb-2">
                    <strong>Contradicting Narratives Found:</strong>
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    RFC documents cite <em>mobile performance</em> as the primary reason, while internal Slack discussions heavily emphasize <em>developer productivity</em> as the driving force.
                  </p>
                </div>
              </div>

              {/* 5. Stakeholders */}
              <div className="bg-muted/10 border rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Key Stakeholders
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-background border px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">M</div>
                    Megha (Proposer)
                  </span>
                  <span className="bg-background border px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center text-[10px]">A</div>
                    Arjun (Approver)
                  </span>
                  <span className="bg-background border px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center text-[10px]">R</div>
                    Rahul (Reviewer)
                  </span>
                </div>
              </div>

              {/* 6. Follow-up Questions */}
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">Suggested follow-ups:</p>
                <div className="flex flex-wrap gap-2">
                  <button className="text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                    Show the REST vs GraphQL comparison matrix <ChevronRight className="w-3 h-3" />
                  </button>
                  <button className="text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                    What were the N+1 mitigation strategies? <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="h-4"></div>
        </div>

        <div className="p-4 border-t bg-muted/10">
          <div className="relative max-w-4xl mx-auto">
            <input 
              type="text" 
              className="w-full border-2 border-primary/20 rounded-xl pl-4 pr-12 py-3.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              placeholder="Ask a follow-up question or search the organizational memory..."
            />
            <button className="absolute right-2 top-2 bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">MemoryGraph AI can make mistakes. Verify critical claims.</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Memory Intelligence Context */}
      <div className="w-80 flex flex-col gap-4 hidden xl:flex">
        
        <div className="bg-card border rounded-2xl shadow-sm p-5">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Intelligence Context
          </h3>
          
          <div className="space-y-6">
            
            {/* Confidence Score */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold">Answer Confidence</span>
                <span className="text-sm font-bold text-emerald-500">92%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">High trust based on multiple correlating primary sources.</p>
            </div>

            {/* Knowledge Risk */}
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold">Knowledge Risk</span>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-xs font-medium text-amber-700 dark:text-amber-500">
                  High concentration risk. 80% of technical rationale is authored by a single stakeholder (Megha).
                </p>
              </div>
            </div>

            {/* Source Distribution */}
            <div className="pt-4 border-t">
              <span className="text-sm font-semibold block mb-3">Evidence Distribution</span>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5"><FileText className="w-3 h-3 text-blue-500"/> Docs</span>
                  <span className="font-medium">58%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5"><MessageSquare className="w-3 h-3 text-indigo-500"/> Slack</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5"><Users className="w-3 h-3 text-emerald-500"/> Meetings</span>
                  <span className="font-medium">17%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <button className="w-full text-xs font-semibold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors py-2 rounded-lg flex items-center justify-center gap-1">
                <FileQuestion className="w-3.5 h-3.5" /> Request Human Verification
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
