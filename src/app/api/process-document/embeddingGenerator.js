import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { openAIEmbedding } from '../openai';

export const generateEmbeddings = async (content) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 5000,
    chunkOverlap: 100
  });

  const chunks = await splitter.splitText(content.join(' '));

  return {
    content: chunks,
    embeddings: await openAIEmbedding.embedDocuments(chunks)
  };
};
