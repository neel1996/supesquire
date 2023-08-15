import { OpenAI } from 'langchain/llms/openai';
import { Document } from 'langchain/document';
import { loadQAStuffChain } from 'langchain/chains';

export const inference = async ({ documentData, question }) => {
  const { content } = documentData;

  const llm =
    globalThis.llm ||
    new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY
    });

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
