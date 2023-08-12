import { upload } from '@/app/api/upload/supabaseUpload';
import { NextResponse } from 'next/server';
import { extractDocumentContent } from './documentHandler';
import { createClient } from '@supabase/supabase-js';

const apiURL = process.env.SUPABASE_URL;
const apiKey = process.env.SUPABASE_API_KEY;
const supabaseClient = createClient(apiURL, apiKey);

export const POST = async (req) => {
  const form = await req.formData();
  const file = form.get('file');

  const docContent = await extractDocumentContent(file);

  return await upload(supabaseClient, file)
    .then((data) => {
      return NextResponse.json({ status: 200, ...data });
    })
    .catch((error) => {
      console.error(error);
      return NextResponse.json({ status: 500 }, { message: error });
    });
};
