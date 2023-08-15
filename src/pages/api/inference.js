import { OpenAI } from 'langchain/llms/openai';
import { Document } from 'langchain/document';
import { loadQAChain } from 'langchain/chains';

export const inference = async ({ documentData, question }) => {
  const { content } = documentData;

  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  const chain = loadQAChain(llm, {
    type: 'map_reduce',
    verbose: true,
    returnIntermediateSteps: true
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
