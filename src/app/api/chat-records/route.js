import { NextResponse } from 'next/server';

const supabase = globalThis.supabase;

export const POST = async (req) => {
  const body = await req.json();

  const { data, error } = await supabase
    .from(process.env.SUPABASE_CHAT_RECORDS_TABLE)
    .select('message, actor, created_at')
    .eq('checksum', body.checksum)
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
};
