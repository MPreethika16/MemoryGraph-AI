import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}

export async function generateAnswer(question: string, context: string, isDecisionQuery: boolean) {
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

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Context:\n${context}\n\nQuestion:\n${question}` }
    ],
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}
