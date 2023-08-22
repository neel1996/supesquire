import { NextResponse } from 'next/server';

import { supabase } from '../supabase';

export const GET = async () => {
  const { data: documents, error } = await supabase()
    .from(process.env.NEXT_PUBLIC_SUPABASE_DOCUMENTS_TABLE)
    .select('checksum, document_name, title, content');

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(documents);
};
