import { Decision } from '../types';

export const mockDecisions: Decision[] = [
  {
    id: 'dec-1',
    title: 'Adopt Next.js for Frontend',
    description: 'We evaluated Vite and Next.js, and decided on Next.js due to its SSR capabilities.',
    status: 'superseded',
    date: '2024-01-10',
    decisionMakers: ['Alice Chen', 'Charlie Davis'],
  },
  {
    id: 'dec-2',
    title: 'Switch back to Vite for Dashboard',
    description: 'The dashboard does not need SEO, and Vite provides faster build times.',
    status: 'accepted',
    date: '2025-11-20',
    decisionMakers: ['Alice Chen', 'Bob Smith'],
  },
];
