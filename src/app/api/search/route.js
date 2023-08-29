import { NextResponse } from 'next/server';

import { search } from './search';

export const POST = async (req) => {
  const { query } = await req.json();

  const { data, error } = await search(query);

  if (error) {
    console.error(error);
    return NextResponse.error({ error }, { status: 500 });
  }

  return NextResponse.json({ result: data });
};
