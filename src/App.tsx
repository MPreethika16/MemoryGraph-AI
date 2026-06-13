import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Library from '@/pages/Library';
import Chat from '@/pages/Chat';
import DecisionReplay from '@/pages/DecisionReplay';
import KnowledgeGraph from '@/pages/KnowledgeGraph';
import Insights from '@/pages/Insights';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/library" element={<Library />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/decision-replay" element={<DecisionReplay />} />
        <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
        <Route path="/insights" element={<Insights />} />
      </Route>
    </Routes>
  );
}
