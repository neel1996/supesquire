import { Document } from 'langchain/document';
import { loadQAStuffChain } from 'langchain/chains';
import { llm } from '@/app/api/openai';

export const inference = async ({ documentData, question }) => {
  const { content } = documentData;

  const chain = loadQAStuffChain(llm, {
    verbose: true
  });

  const docs = [
    new Document({
      pageContent: content
    })
  ];

  const { text } = await chain.call({
    input_documents: docs,
    question
  });

  return text;
};
