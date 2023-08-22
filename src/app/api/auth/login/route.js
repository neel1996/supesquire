import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export const POST = async (req) => {
  const requestURL = new URL(req.url);
  const formData = await req.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  const supabase = createRouteHandlerClient(
    { cookies },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY
    }
  );

  const { error } = await supabase.auth
    .signInWithPassword({
      email,
      password
    })
    .catch((error) => {
      error;
    });

  if (error) {
    console.error({ error });
    return NextResponse.json({ error }, { status: 401 });
  }

  return NextResponse.redirect(requestURL.origin, {
    status: 301
  });
};
