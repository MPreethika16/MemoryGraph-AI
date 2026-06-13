import { Request, Response } from 'express';
import { extractTextFromPDF, chunkText } from '../services/pdf';
import { generateEmbedding } from '../services/openai';
import { createDocument, insertChunks } from '../services/supabase';

export const handleUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filename = req.file.originalname;
    console.log(`Processing file: ${filename}`);

    // 1. Extract Text
    const text = await extractTextFromPDF(req.file.buffer);
    
    // 2. Chunk Content
    const chunks = chunkText(text);
    console.log(`Extracted ${chunks.length} chunks from ${filename}`);

    // 3. Create Document Record
    const document = await createDocument(filename);

    // 4. Generate Embeddings & Prepare for Supabase
    const chunkRecords = [];
    for (const content of chunks) {
      // Process embeddings sequentially to avoid rate limits on free tiers
      const embedding = await generateEmbedding(content);
      chunkRecords.push({
        document_id: document.id,
        content,
        embedding
      });
    }

    // 5. Store Vectors
    await insertChunks(chunkRecords);

    res.status(200).json({ 
      message: 'Document successfully ingested into MemoryGraph',
      documentId: document.id,
      chunksProcessed: chunks.length
    });
  } catch (error: any) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
