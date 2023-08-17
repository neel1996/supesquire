import { upload } from './supabaseUpload';
import { NextResponse } from 'next/server';
import { extractDocumentContent } from './documentHandler';
import { loadQAChain } from 'langchain/chains';
import { Document } from 'langchain/document';
import { supabase } from '../supabase';
import { llm } from '../openai';

export const POST = async (req) => {
  const form = await req.formData();
  const file = form.get('file');

  const docContent = await extractDocumentContent(file);

  return await upload(file)
    .then(async (res) => {
      const {
        data: documentData,
        error,
        count
      } = await supabase()
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
        // eslint-disable-next-line no-control-regex
        docContent: docContent?.replace(/[^\x00-\x7F]/g, '')
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
  const title = await documentTitle(docContent);

  const { data: object, error: objectError } = await supabase()
    .schema('storage')
    .from('objects')
    .select('id')
    .eq('name', `${checksum}.pdf`);

  if (objectError || object?.length === 0) {
    console.error("Couldn't find object in storage.objects: ", objectError);
    return NextResponse.json({ error: objectError }, { status: 500 });
  }

  const { error } = await supabase()
    .from(process.env.SUPABASE_DOCUMENTS_TABLE)
    .insert({
      checksum: checksum,
      document_name: fileName,
      content: docContent,
      embedding: null,
      title: title,
      uploaded_object_id: object[0].id
    });

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(
    {
      checksum,
      title,
      fileName,
      content: docContent
    },
    {
      status: 200
    }
  );
};

const documentTitle = async (content) => {
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
