import { NextResponse } from 'next/server';

import { supabase } from '../../supabase';

export const DELETE = async (req) => {
  const id = req.nextUrl.searchParams.get('id');

  const { data, error } = await supabase()
    .from(process.env.NEXT_PUBLIC_SUPABASE_CHAT_RECORDS_TABLE)
    .delete({ count: 1 })
    .match({ id });

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
};
