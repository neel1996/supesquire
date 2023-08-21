import { Document } from 'langchain/document';
import { loadQAStuffChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import { filterSimilarVectors } from './vectorSearch';
import { llm } from '../openai';

export const infer = async ({ documentId, question }) => {
  const { content, error } = await filterSimilarVectors(documentId, question);

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
      "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. If the question asks to list something, then list it as bullet points with a newline character. If the answer includes multiple sentences, then separate it with a newline character.\n\n{context}\n\nQuestion: {question}\nHelpful Answer:",
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