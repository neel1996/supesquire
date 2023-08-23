import { NextResponse } from 'next/server';

import { supabase } from '../../supabase';

export const DELETE = async (_, { params: { id } }) => {
  const { error } = await supabase()
    .from(process.env.NEXT_PUBLIC_SUPABASE_DOCUMENTS_TABLE)
    .delete()
    .eq('checksum', id?.toString());

  if (error) {
    console.error({ error });
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({});
};
