import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

export const extractDocumentContent = async (file) => {
  const docContent = await new PDFLoader(file).load().then((doc) => {
    return doc.map((page) => {
      return page.pageContent.replace(/\n/g, ' ').replace(/\u0000/g, '');
    });
  });

  const docString = docContent.join('');

  return docString;
};
