import React, { useRef, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { MetricCard } from '@/components/shared/MetricCard';
import { 
  FileText, Link as LinkIcon, MessageSquare, ShieldCheck, 
  Settings, ArrowRight, Network, FileSpreadsheet,
  AlertTriangle, Users, CheckCircle, Database, Search, Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { uploadDocument } from '@/lib/api';
import { useMemoryGraph } from '@/context/MemoryGraphContext';

export default function Library() {
  const { latestIngestion, setLatestIngestion } = useMemoryGraph();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [processedChunks, setProcessedChunks] = useState(0);
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadStatus('idle');
      setErrorMessage('');
      
      const response = await uploadDocument(file);
      
      setProcessedChunks(response.chunksProcessed || 0);
      setUploadStatus('success');

      if (response.insights) {
        setLatestIngestion({
          filename: file.name,
          timestamp: new Date().toISOString(),
          insights: response.insights
        });
      }
    } catch (err: any) {
      console.error(err);
      setUploadStatus('error');
      setErrorMessage(err.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

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
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Database className="w-5 h-5 text-muted-foreground" />
            Knowledge Intake Hub
          </h3>
          {isUploading && (
            <div className="flex items-center gap-2 text-sm text-primary font-medium animate-pulse">
              <Activity className="w-4 h-4" /> Processing Document...
            </div>
          )}
          {uploadStatus === 'success' && (
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
              <CheckCircle className="w-4 h-4" /> Ingestion Complete ({processedChunks} chunks)
            </div>
          )}
          {uploadStatus === 'error' && (
            <div className="flex items-center gap-2 text-sm text-destructive font-medium">
              <AlertTriangle className="w-4 h-4" /> {errorMessage}
            </div>
          )}
        </div>
        
        <input 
          type="file" 
          accept="application/pdf" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
        />

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {intakeMethods.map(method => (
            <button 
              key={method.id} 
              onClick={() => {
                if (method.title === 'PDF Documents') {
                  fileInputRef.current?.click();
                }
              }}
              disabled={isUploading}
              className={cn(
                "bg-card border transition-all rounded-xl p-5 text-left flex flex-col items-start gap-4 relative overflow-hidden",
                isUploading ? "opacity-50 cursor-not-allowed" : "hover:border-primary/50 hover:shadow-md"
              )}>
              {isUploading && method.title === 'PDF Documents' && (
                <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <div className={cn("p-3 rounded-lg relative z-10", method.bg)}>
                <method.icon className={cn("w-6 h-6", method.color)} />
              </div>
              <div className="relative z-10">
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
            
            {latestIngestion ? (
              <div className="bg-card border border-primary/20 rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="p-5 border-b flex items-start justify-between bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{latestIngestion.filename}</h4>
                      <p className="text-sm text-primary/70 mt-1">Just ingested • {new Date(latestIngestion.timestamp).toLocaleTimeString()}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-xs font-medium px-2 py-1 bg-background border rounded-md flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" /> {latestIngestion.insights.decisions?.length || 0} Decisions</span>
                        <span className="text-xs font-medium px-2 py-1 bg-background border rounded-md flex items-center gap-1"><Users className="w-3 h-3 text-amber-500" /> {latestIngestion.insights.stakeholders?.length || 0} Stakeholders</span>
                        <span className="text-xs font-medium px-2 py-1 bg-background border rounded-md flex items-center gap-1"><Network className="w-3 h-3 text-purple-500" /> {latestIngestion.insights.projects?.length || 0} Projects</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-500 animate-pulse">100%</div>
                    <div className="text-xs font-medium text-muted-foreground">Confidence</div>
                  </div>
                </div>

                {/* SECTION 4: AI Extraction Preview */}
                <div className="p-6 bg-card relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-primary to-purple-500"></div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">AI Extraction Results</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    
                    <div>
                      <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" /> Detected Decisions</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {latestIngestion.insights.decisions?.length ? latestIngestion.insights.decisions.map((d, i) => <li key={i}>{d}</li>) : <li>None detected</li>}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1"><Users className="w-3 h-3 text-amber-500" /> Detected People</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {latestIngestion.insights.stakeholders?.length ? latestIngestion.insights.stakeholders.map((s, i) => <li key={i}>{s}</li>) : <li>None detected</li>}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1"><Network className="w-3 h-3 text-purple-500" /> Detected Projects</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {latestIngestion.insights.projects?.length ? latestIngestion.insights.projects.map((p, i) => <li key={i}>{p}</li>) : <li>None detected</li>}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-500" /> Detected Risks</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {latestIngestion.insights.risks?.length ? latestIngestion.insights.risks.map((r, i) => <li key={i}>{r}</li>) : <li>None detected</li>}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-destructive" /> Contradictions</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {latestIngestion.insights.contradictions?.length ? latestIngestion.insights.contradictions.map((c, i) => <li key={i}>{c}</li>) : <li>None detected</li>}
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-dashed rounded-2xl shadow-sm overflow-hidden p-10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <Database className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">Awaiting Documents</h4>
                <p className="text-sm text-muted-foreground max-w-sm mt-2">
                  Upload a document above to ignite the Memory Graph. The AI will automatically extract decisions, stakeholders, and risks.
                </p>
              </div>
            )}
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
              <p className="text-sm font-medium text-blue-500 hover:underline cursor-pointer mb-4">
                {latestIngestion ? latestIngestion.filename : 'Architecture Review.pdf'}
              </p>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Discovered Decision</div>
                    <p className="font-bold text-foreground">
                      {latestIngestion?.insights.decisions?.[0] || 'GraphQL Migration'}
                    </p>
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
