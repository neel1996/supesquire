'use client';

import * as pdfjsLib from 'pdfjs-dist/webpack';

export const extractDocumentContent = async (file) => {
  let content = [];

  const fileData = await file.arrayBuffer();
  const pdf = pdfjsLib.getDocument(fileData);
  const doc = await pdf.promise.then((doc) => {
    return doc;
  });

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const text = await page.getTextContent();
    const pageContent = text.items.map((item) => {
      return item.str;
    });
    content.push(pageContent.join(' '));
  }

  return {
    content
  };
};
