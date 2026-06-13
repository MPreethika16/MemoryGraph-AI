import { Document } from '../types';

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    title: 'Q3 Product Roadmap',
    content: 'The product roadmap for Q3 focuses on AI integrations...',
    createdAt: '2026-06-01T10:00:00Z',
    author: 'Alice Chen',
    tags: ['roadmap', 'q3', 'product'],
  },
  {
    id: 'doc-2',
    title: 'Architecture Decision Record: Database Migration',
    content: 'We are moving from MongoDB to PostgreSQL for better relational integrity...',
    createdAt: '2026-05-15T14:30:00Z',
    author: 'Bob Smith',
    tags: ['architecture', 'database', 'adr'],
  },
];
