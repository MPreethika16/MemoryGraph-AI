import React, { useState, useCallback } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  NodeProps,
  Node,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Users, FileText, CheckCircle, FolderOpen, ShieldCheck, HelpCircle, AlertTriangle, ArrowRight, Activity, Network
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Custom Node Implementation ---
const nodeConfig = {
  decision: { icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
  person: { icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  document: { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  meeting: { icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  project: { icon: FolderOpen, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  policy: { icon: ShieldCheck, color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
};

function MemoryNode({ data, selected }: NodeProps) {
  const config = nodeConfig[data.type as keyof typeof nodeConfig] || { icon: HelpCircle, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border' };
  const Icon = config.icon;
  
  return (
    <div className={cn(
      "px-4 py-3 shadow-md rounded-xl border-2 bg-card min-w-[180px] transition-all cursor-pointer",
      selected ? "ring-2 ring-primary ring-offset-2 ring-offset-background border-primary scale-105" : "border-border hover:border-primary/50 hover:shadow-lg"
    )}>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex items-center gap-3">
        <div className={cn("p-2.5 rounded-lg", config.bg)}>
          <Icon className={cn("w-5 h-5", config.color)} />
        </div>
        <div>
          <div className="font-semibold text-sm leading-tight text-foreground">{data.label as string}</div>
          <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mt-0.5">{data.type as string}</div>
        </div>
      </div>
      {data.influence !== undefined && (
        <div className="mt-3 pt-2 border-t flex justify-between items-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Influence</span>
          <span className={cn("text-xs font-bold", (data.influence as number) > 80 ? 'text-primary' : 'text-foreground')}>
            {data.influence as number}
          </span>
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
}

const nodeTypes = {
  memoryNode: MemoryNode,
};

// --- Initial Data ---
const initialNodes: Node[] = [
  { id: '1', type: 'memoryNode', position: { x: 400, y: 300 }, data: { label: 'GraphQL Migration', type: 'decision', influence: 100, description: 'Migrated from REST to GraphQL for the main API.', evidenceCount: 15, trustScore: 92, lastUpdated: '2026-06-10', impactRisk: 'High', impactDetails: '15 downstream systems rely on this architecture choice.' } },
  { id: '2', type: 'memoryNode', position: { x: 200, y: 150 }, data: { label: 'Rahul', type: 'person', influence: 87, description: 'Engineering Lead for Payments.', evidenceCount: 4, trustScore: 98, lastUpdated: '2026-06-12', impactRisk: 'High', impactDetails: '7 connected decisions, 12 connected documents, 3 active projects.' } },
  { id: '3', type: 'memoryNode', position: { x: 600, y: 150 }, data: { label: 'Megha', type: 'person', influence: 92, description: 'Frontend Architect.', evidenceCount: 8, trustScore: 99, lastUpdated: '2026-06-08', impactRisk: 'Medium', impactDetails: 'Key architect for frontend patterns. 5 connected docs.' } },
  { id: '4', type: 'memoryNode', position: { x: 400, y: 100 }, data: { label: 'Arjun', type: 'person', influence: 75, description: 'CTO.', evidenceCount: 2, trustScore: 100, lastUpdated: '2026-05-30', impactRisk: 'Low', impactDetails: 'Approval node. Operations continue without daily input.' } },
  { id: '5', type: 'memoryNode', position: { x: 100, y: 350 }, data: { label: 'Architecture Review', type: 'document', influence: 91, description: 'Detailed ADR evaluating GraphQL vs REST.', evidenceCount: 1, trustScore: 98, lastUpdated: '2025-10-05', impactRisk: 'Medium', impactDetails: 'Contains primary rationale for 2 major decisions.' } },
  { id: '6', type: 'memoryNode', position: { x: 700, y: 350 }, data: { label: 'API Strategy Doc', type: 'document', influence: 68, description: 'High-level strategy for mobile APIs.', evidenceCount: 1, trustScore: 85, lastUpdated: '2025-08-20', impactRisk: 'Low', impactDetails: 'Deprecated by newer documentation.' } },
  { id: '7', type: 'memoryNode', position: { x: 200, y: 500 }, data: { label: 'Engineering Sync', type: 'meeting', influence: 45, description: 'Weekly engineering sync notes.', evidenceCount: 1, trustScore: 70, lastUpdated: '2025-09-15', impactRisk: 'Low', impactDetails: 'Routine meeting. Low historical preservation risk.' } },
  { id: '8', type: 'memoryNode', position: { x: 600, y: 500 }, data: { label: 'Arch. Review Board', type: 'meeting', influence: 82, description: 'Formal review meeting recording and transcription.', evidenceCount: 1, trustScore: 95, lastUpdated: '2025-10-10', impactRisk: 'Medium', impactDetails: 'Contains verbal approvals not documented elsewhere.' } },
  { id: '9', type: 'memoryNode', position: { x: 400, y: 550 }, data: { label: 'Payments Platform', type: 'project', influence: 55, description: 'Core payments infrastructure project.', evidenceCount: 24, trustScore: 88, lastUpdated: '2026-06-01', impactRisk: 'High', impactDetails: 'Revenue generating system. High risk if knowledge is lost.' } },
  { id: '10', type: 'memoryNode', position: { x: 850, y: 250 }, data: { label: 'API Governance', type: 'policy', influence: 88, description: 'Company-wide API standards and governance.', evidenceCount: 1, trustScore: 100, lastUpdated: '2024-01-15', impactRisk: 'High', impactDetails: 'Affects all engineering teams.' } },
];

const initialEdges: Edge[] = [
  { id: 'e2-1', source: '2', target: '1', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
  { id: 'e3-1', source: '3', target: '1', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
  { id: 'e4-1', source: '4', target: '1', animated: true, style: { stroke: 'hsl(var(--muted-foreground))' } },
  { id: 'e5-1', source: '5', target: '1', style: { stroke: 'hsl(var(--muted-foreground))' } },
  { id: 'e6-1', source: '6', target: '1', style: { stroke: 'hsl(var(--muted-foreground))' } },
  { id: 'e7-1', source: '7', target: '1', style: { stroke: 'hsl(var(--muted-foreground))' } },
  { id: 'e8-1', source: '8', target: '1', style: { stroke: 'hsl(var(--muted-foreground))' } },
  { id: 'e1-9', source: '1', target: '9', animated: true, style: { stroke: 'hsl(var(--muted-foreground))' } },
  { id: 'e10-1', source: '10', target: '1', style: { stroke: 'hsl(var(--muted-foreground))' }, label: 'Complies With', labelBgStyle: { fill: 'hsl(var(--background))' }, labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 600, fontSize: 10 } },
  { id: 'e3-5', source: '3', target: '5', style: { stroke: 'hsl(var(--muted-foreground))', strokeDasharray: '5,5' }, label: 'Authored', labelBgStyle: { fill: 'hsl(var(--background))' }, labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 600, fontSize: 10 } },
];

export default function KnowledgeGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
      <PageHeader 
        title="Knowledge Graph" 
        description="Explore the invisible network of people, decisions, and documents that power your organization."
      />

      <div className="flex-1 flex gap-6 overflow-hidden pb-4">
        {/* Main Graph Area */}
        <div className="flex-1 bg-card border rounded-2xl shadow-sm overflow-hidden relative">
          <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm border px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Network className="w-4 h-4 text-primary" />
            Graph Intelligence Active
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-muted/10"
          >
            <Background color="hsl(var(--muted-foreground))" gap={24} size={1} />
            <Controls className="bg-background border-border shadow-md" />
            <MiniMap className="bg-background border-border" maskColor="hsl(var(--muted)/0.5)" />
          </ReactFlow>
        </div>

        {/* Sidebar Details Panel */}
        {selectedNode && (
          <div className="w-80 bg-card border rounded-2xl shadow-sm overflow-y-auto animate-in slide-in-from-right-8 duration-300">
            <div className="p-6 border-b sticky top-0 bg-card/95 backdrop-blur z-10 flex justify-between items-start">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{selectedNode.data.type as string}</div>
                <h3 className="font-bold text-xl leading-tight">{selectedNode.data.label as string}</h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</h4>
                <p className="text-sm text-foreground">{selectedNode.data.description as string}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-lg border">
                  <div className="text-xs text-muted-foreground mb-1">Evidence</div>
                  <div className="font-bold text-lg">{selectedNode.data.evidenceCount as number}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg border">
                  <div className="text-xs text-muted-foreground mb-1">Trust Score</div>
                  <div className="font-bold text-lg text-primary">{selectedNode.data.trustScore as number}%</div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Metadata</h4>
                <div className="flex justify-between text-sm py-2 border-b">
                  <span className="text-muted-foreground">Influence Score</span>
                  <span className="font-medium">{selectedNode.data.influence as number}/100</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">{selectedNode.data.lastUpdated as string}</span>
                </div>
              </div>

              {/* Memory Impact View */}
              <div className="pt-6">
                <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-destructive flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    Memory Impact Risk
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    What happens if this node disappears?
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Risk Level:</span>
                    <span className={cn(
                      "text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                      selectedNode.data.impactRisk === 'High' ? 'bg-destructive/20 text-destructive' :
                      selectedNode.data.impactRisk === 'Medium' ? 'bg-amber-500/20 text-amber-600' :
                      'bg-muted text-muted-foreground'
                    )}>
                      {selectedNode.data.impactRisk as string}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed bg-background p-3 rounded border">
                    {selectedNode.data.impactDetails as string}
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
