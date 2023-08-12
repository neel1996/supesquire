import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

export const extractDocumentContent = async (file) => {
  const docContent = await new PDFLoader(file).load().then((doc) => {
    return doc.map((page) => {
      return page.pageContent;
    });
  });

  const docString = docContent.join('\n');

  return docString;
};
