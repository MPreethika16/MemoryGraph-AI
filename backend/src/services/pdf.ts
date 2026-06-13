import { PDFParse } from 'pdf-parse';

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  console.log('[PDF] Starting text extraction...');
  
  // Convert Node Buffer to Uint8Array for pdf-parse
  const data = new Uint8Array(buffer);
  
  const parser = new PDFParse({ data });
  const result = await parser.getText();
  
  console.log(`[PDF] Extraction complete. Extracted ${result.text.length} characters.`);
  return result.text;
}

export function chunkText(text: string, chunkSize = 1000, overlap = 200): string[] {
  // Hackathon-friendly simple character chunking
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunkSize));
    i += chunkSize - overlap;
  }
  return chunks;
}
