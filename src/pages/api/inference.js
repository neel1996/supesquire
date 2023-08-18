import { Document } from 'langchain/document';
import { loadQAStuffChain } from 'langchain/chains';
import { llm, openAIEmbedding } from '@/app/api/openai';

export const inference = async ({ documentId, question, supabase }) => {
  const { content, error } = await filterSimilarVectors(
    supabase,
    documentId,
    question
  );

  if (error) {
    console.error({ error });
    return {
      error
    };
  }

  const chain = loadQAStuffChain(llm, {
    verbose: true
  });

  const docs = [
    new Document({
      pageContent: content
    })
  ];

  const { text, aiError } = await chain
    .call({
      input_documents: docs,
      question
    })
    .catch((error) => {
      console.error({ error });
      return { aiError: error };
    });

  return { answer: text, error: aiError };
};

const filterSimilarVectors = async (supabase, documentId, message) => {
  const { data: vectors, error } = await supabase.rpc('match_documents', {
    query_embedding: await openAIEmbedding.embedQuery(message),
    match_count: 5,
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
