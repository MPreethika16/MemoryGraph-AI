export type Document = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  tags: string[];
};

export type Decision = {
  id: string;
  title: string;
  description: string;
  status: 'proposed' | 'accepted' | 'rejected' | 'superseded';
  date: string;
  decisionMakers: string[];
};

export type KnowledgeNode = {
  id: string;
  label: string;
  type: 'person' | 'project' | 'document' | 'decision';
};

export type KnowledgeEdge = {
  source: string;
  target: string;
  relationship: string;
};

export type SourceCitation = {
  id: string;
  documentId: string;
  textSnippet: string;
};

export type ConfidenceScore = {
  score: number; // 0 to 1
  reasoning: string;
};
