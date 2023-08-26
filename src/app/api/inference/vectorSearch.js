import { openAIEmbedding } from '../openai';
import { supabase } from '../supabase';

export const filterSimilarVectors = async (documentId, message, matchCount) => {
  const { data: vectors, error } = await supabase().rpc('match_documents', {
    query_embedding: await openAIEmbedding.embedQuery(message),
    match_count: matchCount,
    filter_checksum: documentId
  });

  if (error) {
    return { error };
  }

  return {
    content: vectors
      .map((v) => {
        return v.chunk_content;
      })
      .join(' '),
    error: null
  };
};
