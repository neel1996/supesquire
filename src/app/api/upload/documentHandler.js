import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

import { openAIEmbedding } from '../openai';

export const extractDocumentContent = async (file) => {
  const chunks = await new PDFLoader(file).loadAndSplit(
    new CharacterTextSplitter({
      chunkSize: 5000,
      chunkOverlap: 100,
      lengthFunction: (str) => str.length,
      separator: ' '
    })
  );

  const store = await MemoryVectorStore.fromDocuments(chunks, openAIEmbedding);

  const splitDocs = chunks.map((doc) => {
    return (
      doc.pageContent
        .replace(/\n/g, ' ')
        .replace(/[\u{0080}-\u{FFFF}]/gu, '')
        // eslint-disable-next-line no-control-regex
        .replace(/[^\x00-\x7F]/g, '')
    );
  });

  return {
    content: splitDocs.join(''),
    chunks: {
      content: splitDocs,
      embeddings: await store.embeddings.embedDocuments(splitDocs)
    }
  };
};
