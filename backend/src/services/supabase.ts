import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function createDocument(filename: string) {
  const { data, error } = await supabase
    .from('documents')
    .insert([{ filename }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function insertChunks(chunks: { document_id: string; content: string; embedding: number[] }[]) {
  const { error } = await supabase.from('document_chunks').insert(chunks);
  if (error) throw error;
}

export async function searchSimilarChunks(query_embedding: number[], match_threshold = 0.5, match_count = 5) {
  const { data, error } = await supabase.rpc('match_document_chunks', {
    query_embedding,
    match_threshold,
    match_count,
  });

  if (error) throw error;
  return data;
}
