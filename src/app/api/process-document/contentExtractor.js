import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { openAIEmbedding } from '../openai';

export const extractDocumentContent = async (file) => {
  const chunks = await new PDFLoader(file).loadAndSplit(
    new RecursiveCharacterTextSplitter({
      chunkSize: 5000,
      chunkOverlap: 100
    })
  );

  const textFromDocumentChunks = chunks.map((doc) => {
    return doc.pageContent.replace(/\n/g, ' ');
  });

  return {
    chunks: {
      content: textFromDocumentChunks,
      embeddings: await openAIEmbedding.embedDocuments(textFromDocumentChunks)
    }
  };
};
