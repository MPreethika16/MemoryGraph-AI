import { KnowledgeNode, KnowledgeEdge } from '../types';

export const mockNodes: KnowledgeNode[] = [
  { id: 'n1', label: 'Alice Chen', type: 'person' },
  { id: 'n2', label: 'MemoryGraph', type: 'project' },
  { id: 'n3', label: 'Architecture Decision', type: 'document' },
  { id: 'n4', label: 'Use Vite', type: 'decision' },
];

export const mockEdges: KnowledgeEdge[] = [
  { source: 'n1', target: 'n2', relationship: 'leads' },
  { source: 'n1', target: 'n3', relationship: 'authored' },
  { source: 'n3', target: 'n4', relationship: 'contains' },
  { source: 'n4', target: 'n2', relationship: 'impacts' },
];
