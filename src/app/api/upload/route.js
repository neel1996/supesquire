import { upload } from '@/app/api/upload/supabaseUpload';
import { NextResponse } from 'next/server';
import { extractDocumentContent } from './documentHandler';
import { loadQAChain } from 'langchain/chains';
import { Document } from 'langchain/document';
// import { embeddings } from './generateEmbeddings';

const supabase = globalThis.supabase;

export const POST = async (req) => {
  const form = await req.formData();
  const file = form.get('file');

  const docContent = await extractDocumentContent(file);

  return await upload(supabase, file)
    .then(async (res) => {
      const {
        data: documentData,
        error,
        count
      } = await supabase
        .from(process.env.SUPABASE_DOCUMENTS_TABLE)
        .select('checksum', {
          count: 'exact'
        })
        .eq('checksum', res.checksum);

      if (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
      }

      const newDocumentPayload = {
        fileName: file.name,
        checksum: res.checksum,
        docContent
      };

      if (count) {
        return NextResponse.json({ status: 200, ...documentData?.[0] });
      }

      return await insertNewDocument(newDocumentPayload);
    })
    .catch((error) => {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    });
};

const insertNewDocument = async ({ fileName, checksum, docContent }) => {
  // const embedding = await embeddings(docContent);

  const title = await documentTitle(docContent);
  const sanitizedTitle = title?.replace(/[^\x00-\x7F]\\u0000/g, '');
  const sanitizedContent = docContent?.replace(/[^\x00-\x7F]\\u0000/g, '');

  console.log({
    checksum: checksum,
    document_name: fileName,
    content: sanitizedContent,
    embedding: null,
    title: sanitizedTitle
  });

  const { error } = await supabase
    .from(process.env.SUPABASE_DOCUMENTS_TABLE)
    .insert({
      checksum: checksum,
      document_name: fileName,
      content: sanitizedContent,
      embedding: null,
      title: sanitizedTitle
    });

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  globalThis.qaDocuments = {
    ...globalThis.qaDocuments,
    [checksum]: {
      checksum,
      document_name: fileName,
      content: sanitizedContent,
      embedding: null,
      title: sanitizedTitle
    }
  };

  return NextResponse.json({ status: 200, checksum });
};

const documentTitle = async (content) => {
  const llm = globalThis.llm;

  const chain = loadQAChain(llm, {
    type: 'stuff',
    verbose: true
  });

  const { text } = await chain.call({
    input_documents: [
      new Document({
        pageContent: content
      })
    ],
    question:
      'What is the title of this document? Respond only the title and nothing else'
  });

  return text;
};
