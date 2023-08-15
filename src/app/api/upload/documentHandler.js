import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

export const extractDocumentContent = async (file) => {
  const docContent = await new PDFLoader(file, {
    splitPages: false
  })
    .load()
    .then((doc) => {
      return doc.map((page) => {
        return page.pageContent
          .replace(/\n/g, ' ')
          .replace(/[\u{0080}-\u{FFFF}]/gu, '');
      });
    });

  const docString = docContent.join('');

  return docString;
};
