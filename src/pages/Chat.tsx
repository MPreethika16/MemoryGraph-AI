import React from 'react';
import { 
  MessageSquare, History, FileText, CheckCircle, AlertTriangle, 
  Users, Network, Send, Zap, ChevronRight, ShieldCheck, FileQuestion
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMemoryGraph } from '@/context/MemoryGraphContext';
import { askQuestion } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function Chat() {
  const { 
    lastQuestion, setLastQuestion, 
    activeResponse, setActiveResponse,
    setDecisionReplay
  } = useMemoryGraph();
  
  const [inputQuestion, setInputQuestion] = React.useState('');
  const [isAsking, setIsAsking] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

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
          
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> {error}
            </div>
          )}

          {lastQuestion && (
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground px-5 py-3 rounded-2xl rounded-tr-sm max-w-xl text-sm font-medium shadow-sm">
                {lastQuestion}
              </div>
            </div>
          )}

          {isAsking && (
            <div className="flex items-start gap-4 max-w-4xl">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 mt-1 border border-primary/30">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="flex-1 space-y-6 pt-2">
                <div className="w-1/2 h-4 bg-muted rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          )}

          {activeResponse && !isAsking && (
            <div className="flex items-start gap-4 max-w-4xl">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 mt-1 border border-primary/30">
                M
              </div>
              <div className="flex-1 space-y-6">
                
                {/* 1. Direct Answer */}
                <div className="text-sm leading-relaxed text-foreground">
                  <p className="mb-4">{activeResponse.answer}</p>
                </div>

                {/* 2. Decision Replay / Timeline Preview */}
                {activeResponse.decisionReplay && (
                  <div className="bg-muted/30 border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-sm flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        Decision Memory Reconstructed
                      </h4>
                      <p className="text-xs text-muted-foreground">Timeline and rationale generated from context.</p>
                    </div>
                    <button onClick={() => navigate('/decision-replay')} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center gap-2 shrink-0">
                      <Network className="w-4 h-4" />
                      View Full Decision Replay
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 3. Supporting Sources */}
                  {activeResponse.sourcesUsed && activeResponse.sourcesUsed.length > 0 && (
                    <div className="border rounded-xl p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> Evidence Sources ({activeResponse.sourcesUsed.length})
                      </h4>
                      <ul className="space-y-2">
                        {activeResponse.sourcesUsed.map((source: string, i: number) => (
                          <li key={i} className="flex justify-between items-center text-sm">
                            <span className="text-primary hover:underline cursor-pointer truncate">{source}</span>
                            <span className="text-xs bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded ml-2">High Trust</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 4. Contradictions & Insights */}
                  {activeResponse.contradictionsFound && activeResponse.contradictionsFound !== "null" && (
                    <div className="border border-destructive/20 bg-destructive/5 rounded-xl p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-destructive mb-3 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Memory Insights
                      </h4>
                      <p className="text-sm text-foreground mb-2">
                        <strong>Contradictions Found:</strong>
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {activeResponse.contradictionsFound}
                      </p>
                    </div>
                  )}
                </div>

                {/* 5. Stakeholders */}
                {activeResponse.decisionReplay && activeResponse.decisionReplay.stakeholders && (
                  <div className="bg-muted/10 border rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Key Stakeholders
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeResponse.decisionReplay.stakeholders.map((person: string, i: number) => (
                        <span key={i} className="bg-background border px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">{person.charAt(0)}</div>
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!lastQuestion && !isAsking && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
              <Zap className="w-12 h-12 text-muted" />
              <p>Ask a question to explore the organizational memory.</p>
            </div>
          )}

          <div className="h-4"></div>
        </div>

        <div className="p-4 border-t bg-muted/10">
          <form 
            className="relative max-w-4xl mx-auto"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!inputQuestion.trim() || isAsking) return;
              
              const q = inputQuestion.trim();
              setLastQuestion(q);
              setInputQuestion('');
              setIsAsking(true);
              setError('');
              
              try {
                const response = await askQuestion(q);
                setActiveResponse(response);
                if (response.decisionReplay) {
                  setDecisionReplay(response.decisionReplay);
                } else {
                  setDecisionReplay(null);
                }
              } catch (err: any) {
                console.error(err);
                setError(err.message || 'Failed to get answer');
              } finally {
                setIsAsking(false);
              }
            }}
          >
            <input 
              type="text" 
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              className="w-full border-2 border-primary/20 rounded-xl pl-4 pr-12 py-3.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              placeholder="Ask a follow-up question or search the organizational memory..."
              disabled={isAsking}
            />
            <button 
              type="submit"
              disabled={isAsking || !inputQuestion.trim()}
              className="absolute right-2 top-2 bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
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
                <span className="text-sm font-bold text-emerald-500">
                  {activeResponse?.confidenceScore || 0}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${activeResponse?.confidenceScore || 0}%` }}
                ></div>
              </div>
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
