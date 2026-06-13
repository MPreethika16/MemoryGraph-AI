import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ActiveResponse {
  answer: string;
  confidenceScore: number;
  sourcesUsed: string[];
  contradictionsFound: string | null;
  decisionReplay?: any;
}

export interface DocumentInsights {
  decisions: string[];
  stakeholders: string[];
  projects: string[];
  risks: string[];
  contradictions: string[];
}

export interface LatestIngestion {
  filename: string;
  timestamp: string;
  insights: DocumentInsights;
}

interface MemoryGraphContextType {
  lastQuestion: string | null;
  setLastQuestion: (question: string | null) => void;
  activeResponse: ActiveResponse | null;
  setActiveResponse: (response: ActiveResponse | null) => void;
  decisionReplay: any | null;
  setDecisionReplay: (replay: any | null) => void;
  backendConnected: boolean;
  setBackendConnected: (connected: boolean) => void;
  latestIngestion: LatestIngestion | null;
  setLatestIngestion: (ingestion: LatestIngestion | null) => void;
}

const MemoryGraphContext = createContext<MemoryGraphContextType | undefined>(undefined);

export function MemoryGraphProvider({ children }: { children: ReactNode }) {
  const [lastQuestion, setLastQuestion] = useState<string | null>(null);
  const [activeResponse, setActiveResponse] = useState<ActiveResponse | null>(null);
  const [decisionReplay, setDecisionReplay] = useState<any | null>(null);
  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const [latestIngestion, setLatestIngestion] = useState<LatestIngestion | null>(null);

  return (
    <MemoryGraphContext.Provider 
      value={{ 
        lastQuestion, setLastQuestion, 
        activeResponse, setActiveResponse, 
        decisionReplay, setDecisionReplay,
        backendConnected, setBackendConnected,
        latestIngestion, setLatestIngestion
      }}
    >
      {children}
    </MemoryGraphContext.Provider>
  );
}

export function useMemoryGraph() {
  const context = useContext(MemoryGraphContext);
  if (context === undefined) {
    throw new Error('useMemoryGraph must be used within a MemoryGraphProvider');
  }
  return context;
}
