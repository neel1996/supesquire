import { NextResponse } from 'next/server';

const supabase = globalThis.supabase;

export const GET = async () => {
  const { data: documents, error } = await supabase
    .from(process.env.SUPABASE_DOCUMENTS_TABLE)
    .select('checksum, document_name, title');

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(documents);
};
