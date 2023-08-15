import { upload } from '@/app/api/upload/supabaseUpload';
import { NextResponse } from 'next/server';
import { extractDocumentContent } from './documentHandler';
import { createClient } from '@supabase/supabase-js';
// import { embeddings } from './generateEmbeddings';

const apiURL = process.env.SUPABASE_URL;
const apiKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(apiURL, apiKey);

globalThis.supabase = supabase;

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
        .eq('checksum', res.path);

      if (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
      }

      const newDocumentPayload = {
        fileName: file.name,
        checksum: res.path,
        docContent
      };

      if (count) {
        return NextResponse.json({ status: 200, ...documentData?.[0] });
      }

      await insertNewDocument(newDocumentPayload);

      return NextResponse.json({ status: 200, checksum: res.path });
    })
    .catch((error) => {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    });
};

const insertNewDocument = async ({ fileName, checksum, docContent }) => {
  // const embedding = await embeddings(docContent);
  const embedding = [];

  const { error } = await supabase
    .from(process.env.SUPABASE_DOCUMENTS_TABLE)
    .insert({
      checksum: checksum,
      document_name: fileName,
      content: docContent,
      embedding: null
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
      content: docContent,
      embedding: embedding
    }
  };
};
