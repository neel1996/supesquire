import { loadQAChain } from 'langchain/chains';
import { Document } from 'langchain/document';
import { NextResponse } from 'next/server';
import SqlString from 'sqlstring';

import { llm } from '../openai';
import { supabase } from '../supabase';
import { extractDocumentContent } from './documentHandler';
import { upload } from './supabaseUpload';

export const POST = async (req) => {
  const form = await req.formData();
  const file = form.get('file');

  const { content, chunks } = await extractDocumentContent(file);

  return await upload(file)
    .then(async (res) => {
      const {
        data: documentData,
        error,
        count
      } = await supabase()
        .from(process.env.NEXT_PUBLIC_SUPABASE_DOCUMENTS_TABLE)
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
        docContent: content,
        chunks
      };

      if (count) {
        return NextResponse.json({ status: 200, ...documentData?.[0] });
      }

      return await saveDocument(newDocumentPayload);
    })
    .catch((error) => {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    });
};

const saveDocument = async ({ fileName, checksum, docContent, chunks }) => {
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
    .from(process.env.NEXT_PUBLIC_SUPABASE_DOCUMENTS_TABLE)
    .insert({
      checksum: checksum,
      document_name: fileName,
      content: SqlString.escape(docContent),
      title: title,
      uploaded_object_id: object[0].id
    });

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  const { error: saveChunksError } = await saveDocumentChunks(checksum, chunks);
  if (saveChunksError) {
    console.error(saveChunksError);

    await supabase()
      .from(process.env.NEXT_PUBLIC_SUPABASE_DOCUMENTS_TABLE)
      .delete({ count: 1 })
      .eq('checksum', checksum);

    return NextResponse.json({ error: saveChunksError }, { status: 500 });
  }

  return NextResponse.json(
    {
      checksum,
      title,
      fileName
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
        pageContent: content?.slice(0, 6000)
      })
    ],
    question:
      'What is the title of this document?\nRespond only the title and nothing else\nDo not include any quotations or a prefix in the title'
  });

  return text;
};

const saveDocumentChunks = async (checksum, chunks) => {
  const { content, embeddings } = chunks;

  let promises = [];
  for (let i = 0; i < content.length; i++) {
    promises.push(
      supabase()
        .from('document_chunks')
        .insert({
          document_checksum: checksum,
          chunk_number: i + 1,
          chunk_content: SqlString.escape(content[i]),
          chunk_embedding: embeddings[i]
        })
    );
  }

  // eslint-disable-next-line no-undef
  const { error } = await Promise.all(promises);
  if (error) {
    console.error(error);
    return { error };
  }

  return { error: null };
};

export const runtime = 'nodejs';
