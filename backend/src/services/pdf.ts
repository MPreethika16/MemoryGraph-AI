const pdfParse = require('pdf-parse');

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data.text;
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
