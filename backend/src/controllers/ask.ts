import { Request, Response } from 'express';
import { generateEmbedding, generateAnswer } from '../services/gemini';
import { searchSimilarChunks } from '../services/supabase';

export const handleAsk = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    console.log(`Processing question: "${question}"`);

    // 1. Generate query embedding
    const queryEmbedding = await generateEmbedding(question);

    // 2. Retrieve top chunks from Supabase
    // match_threshold: 0.5 (configurable), match_count: 5 chunks
    const similarChunks = await searchSimilarChunks(queryEmbedding, 0.5, 5);
    
    if (!similarChunks || similarChunks.length === 0) {
      return res.status(200).json({
        answer: "I couldn't find any relevant information in the organizational memory.",
        confidenceScore: 0,
        sourcesUsed: []
      });
    }

    // 3. Prepare context string
    const context = similarChunks.map((chunk: any) => chunk.content).join('\n\n---\n\n');

    // 4. Determine if it's a "decision" query
    const isDecisionQuery = question.toLowerCase().includes('why did we') || question.toLowerCase().includes('why was');

    // 5. Generate Answer via OpenAI
    const aiResponse = await generateAnswer(question, context, isDecisionQuery);

    res.status(200).json(aiResponse);
  } catch (error: any) {
    console.error('Ask Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
