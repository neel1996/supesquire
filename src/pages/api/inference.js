import { Document } from 'langchain/document';
import { loadQAStuffChain } from 'langchain/chains';
import { llm, openAIEmbedding } from '@/app/api/openai';
import { PromptTemplate } from 'langchain/prompts';

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

  // Overriding the default prompt used by QAChain with the below
  // This is tailored for limiting the response length and for enhancing the message format
  const prompt = new PromptTemplate({
    template:
      "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. If the question asks to list something, then list it as bullet points with a newline character. The answer should be within 900 characters and should not exceed it. If the answer includes multiple sentences, then separate it with a newline character.\n\n{context}\n\nQuestion: {question}\nHelpful Answer:",
    inputVariables: ['context', 'question']
  });

  const chain = loadQAStuffChain(llm, {
    verbose: true,
    prompt
  });

  const docs = [
    new Document({
      pageContent: content.slice(0, 6000)
    })
  ];

  const { text, aiError } = await chain
    .call({
      input_documents: docs,
      question: question
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
