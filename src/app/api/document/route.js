import { NextResponse } from 'next/server';

export const POST = async (req) => {
  const body = await req.json();
  const supabase = globalThis.supabase;
  const qaDocuments = globalThis.qaDocuments;

  const inMemoryDocument = qaDocuments?.[body.documentId];
  if (inMemoryDocument) {
    console.info(
      'QA document found in memory: ',
      JSON.stringify(inMemoryDocument)
    );
    return NextResponse.json({ status: 200, ...inMemoryDocument });
  }

  const { data, error } = await supabase
    .from(process.env.SUPABASE_DOCUMENTS_TABLE)
    .select(
      `
        checksum,
        document_name,
        content,
        embedding
    `
    )
    .eq('checksum', body.documentId);

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  if (data.length) {
    return NextResponse.json({ status: 200, ...data[0] });
  }
};
