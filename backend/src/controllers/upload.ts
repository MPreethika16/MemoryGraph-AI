import { Request, Response } from 'express';
import { extractTextFromPDF, chunkText } from '../services/pdf';
import { generateEmbedding, EMBEDDING_MODEL, generateDocumentInsights } from '../services/gemini';
import { createDocument, insertChunks } from '../services/supabase';

export const handleUpload = async (req: Request, res: Response) => {
  console.log(`[Request] URL: ${req.url}`);
  console.log(`[Request] Method: ${req.method}`);
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filename = req.file.originalname;
    console.log(`[Upload] Uploaded filename: ${filename}`);

    // 1. Extract Text
    const text = await extractTextFromPDF(req.file.buffer);
    console.log(`[Upload] PDF parsed successfully for: ${filename}`);
    
    // 2. Chunk Content
    const chunks = chunkText(text);
    console.log(`[Upload] Created ${chunks.length} chunks from ${filename}`);

    // 3. Create Document Record
    console.log(`[Supabase] Attempting to insert document: ${filename}`);
    const document = await createDocument(filename);
    console.log(`[Supabase] Document inserted with ID: ${document.id}`);

    // 4. Generate Embeddings & Prepare for Supabase
    const chunkRecords = [];
    for (let i = 0; i < chunks.length; i++) {
      const content = chunks[i];
      // Process embeddings sequentially to avoid rate limits on free tiers
      console.log(`[Gemini] Generating embedding for chunk ${i + 1}/${chunks.length}`);
      const embedding = await generateEmbedding(content);
      console.log(`[Gemini] Embedding generated successfully for chunk ${i + 1}`);
      chunkRecords.push({
        document_id: document.id,
        content,
        embedding
      });
    }

    // 5. Store Vectors
    console.log(`[Supabase] Attempting to insert ${chunkRecords.length} chunks`);
    await insertChunks(chunkRecords);
    console.log(`[Supabase] ${chunks.length} chunks inserted successfully for document: ${document.id}`);

    // 6. Generate Document Insights for Dashboard
    console.log(`[Gemini] Generating organizational insights for document...`);
    const insights = await generateDocumentInsights(text);
    console.log(`[Gemini] Insights generated successfully.`);

    res.status(200).json({ 
      message: 'Document successfully ingested into MemoryGraph',
      documentId: document.id,
      chunksProcessed: chunks.length,
      embeddingModel: EMBEDDING_MODEL,
      insights
    });
  } catch (error: any) {
    console.error(`[Upload ERROR]: ${error.message}`);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
