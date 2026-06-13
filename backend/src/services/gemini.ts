import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ override: true });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const EMBEDDING_MODEL = 'gemini-embedding-2';
export const EMBEDDING_DIMENSIONS = 768;

export async function generateEmbedding(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });
  const result = await model.embedContent({
    content: { role: 'user', parts: [{ text }] },
    taskType: 'RETRIEVAL_DOCUMENT',
    outputDimensionality: EMBEDDING_DIMENSIONS
  } as any);
  return result.embedding.values;
}

export async function generateAnswer(question: string, context: string, isDecisionQuery: boolean) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  let systemPrompt = `You are an Organizational Memory Investigator for MemoryGraph AI.
Use the provided context to answer the user's question accurately.
If the answer is not in the context, say "I don't have enough information in the organizational memory to answer that."

Return a structured JSON object with the following schema:
{
  "answer": "A clear, concise answer based on the context",
  "confidenceScore": 95,
  "sourcesUsed": ["List of source names inferred from context"],
  "contradictionsFound": "Any conflicting information found in the context, or null"
}`;

  if (isDecisionQuery) {
    systemPrompt += `
Since this is a decision-related query ("Why did we..."), also include a "decisionReplay" object in the JSON:
"decisionReplay": {
  "timeline": ["Proposal: ...", "Review: ...", "Approval: ..."],
  "stakeholders": ["Name 1", "Name 2"],
  "alternativesConsidered": ["Alt 1", "Alt 2"],
  "finalRationale": "The ultimate reason for the decision"
}`;
  }

  const prompt = `${systemPrompt}\n\nContext:\n${context}\n\nQuestion:\n${question}`;
  
  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  
  return JSON.parse(responseText || '{}');
}

export async function generateDocumentInsights(text: string) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `You are an expert Organizational Intelligence extractor. Analyze the following document and extract key insights.
Return a structured JSON object with the following arrays (use empty arrays if none found):
{
  "decisions": ["list of important decisions made"],
  "stakeholders": ["list of key people or roles mentioned"],
  "projects": ["list of projects or initiatives mentioned"],
  "risks": ["list of potential risks, issues, or vulnerabilities"],
  "contradictions": ["list of conflicting statements or policies found"]
}

Document Content:
${text.substring(0, 30000)} // truncate to avoid token limits on free tier
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return JSON.parse(responseText || '{"decisions":[], "stakeholders":[], "projects":[], "risks":[], "contradictions":[]}');
  } catch (error) {
    console.error('Insight generation failed:', error);
    return { decisions: [], stakeholders: [], projects: [], risks: [], contradictions: [] };
  }
}
